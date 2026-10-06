"""Local, deterministic maintenance simulator. No cloud or Kubernetes mutations."""
from __future__ import annotations

import argparse
from dataclasses import asdict, dataclass
import json
from pathlib import Path
from typing import Protocol


@dataclass(frozen=True)
class Metrics:
    error_rate: float = 0.001
    p95_ms: float = 180
    checkout_success: float = 0.999
    ready: bool = True
    pending_pods: int = 0
    available: bool = True


@dataclass(frozen=True)
class Policy:
    max_error_rate: float = 0.01
    max_error_increase: float = 0.005
    max_latency_ratio: float = 1.2
    min_checkout_success: float = 0.99
    min_headroom: float = 0.30
    observation_samples: int = 3
    max_hold_rounds: int = 2


@dataclass
class Node:
    name: str
    zone: str
    image: str = "image-v1"


class Executor(Protocol):
    def replace(self, nodes: list[Node]) -> None: ...


class SimulatedExecutor:
    def replace(self, nodes: list[Node]) -> None:
        for node in nodes:
            node.image = "image-v2"


class SampleCheckout:
    """Shared sample application behavior for the controller and HTTP service."""
    def __init__(self, fault: str = "healthy"):
        self.fault = fault

    def metrics(self, changed: int) -> Metrics:
        if changed:
            if self.fault == "errors":
                return Metrics(error_rate=0.047)
            if self.fault == "latency":
                return Metrics(p95_ms=2400)
            if self.fault == "checkout":
                return Metrics(checkout_success=0.942)
            if self.fault == "telemetry":
                return Metrics(available=False)
        return Metrics()


SCENARIOS = ("healthy", "pdb", "capacity", "replicas", "errors", "latency", "checkout", "telemetry")


def health_gate(current: Metrics, baseline: Metrics, policy: Policy) -> tuple[str, list[str]]:
    if not current.available:
        return "HOLD", ["Monitoring unavailable; no evidence to authorize progression"]
    reasons = []
    if not current.ready or current.pending_pods:
        reasons.append("Infrastructure or workload readiness failed")
    if current.error_rate > policy.max_error_rate:
        reasons.append("HTTP error rate exceeds absolute limit")
    if current.error_rate - baseline.error_rate > policy.max_error_increase:
        reasons.append("HTTP error rate exceeds baseline delta")
    if current.p95_ms > baseline.p95_ms * policy.max_latency_ratio:
        reasons.append("P95 latency exceeds baseline tolerance")
    if current.checkout_success < policy.min_checkout_success:
        reasons.append("Checkout success below business SLI threshold")
    return ("ABORT", reasons) if reasons else ("CONTINUE", ["All health gates passed"])


class Controller:
    def __init__(self, scenario: str = "healthy", node_count: int = 10,
                 executor: Executor | None = None, policy: Policy | None = None):
        if scenario not in SCENARIOS or node_count < 2:
            raise ValueError("Use a known scenario and at least two nodes")
        self.scenario = scenario
        self.nodes = [Node(f"node-{i+1:02}", f"zone-{i % 3 + 1}") for i in range(node_count)]
        self.executor = executor or SimulatedExecutor()
        self.policy = policy or Policy()
        if self.policy.observation_samples < 1 or self.policy.max_hold_rounds < 0:
            raise ValueError("Invalid observation policy")
        self.app = SampleCheckout(scenario)
        self.events: list[dict] = []
        self.state = "NEW"
        self.changed = 0

    def emit(self, state: str, **data) -> None:
        self.state = state
        self.events.append({"sequence": len(self.events) + 1, "state": state, **data})

    def report(self) -> dict:
        return {"mode": "simulation", "scenario": self.scenario, "state": self.state,
                "changed_nodes": self.changed, "total_nodes": len(self.nodes),
                "policy": asdict(self.policy), "nodes": [asdict(n) for n in self.nodes],
                "events": self.events}

    def run(self) -> dict:
        if self.state != "NEW":
            raise RuntimeError("A controller instance represents exactly one run")
        self.emit("DISCOVER", nodes=len(self.nodes), workload="checkout",
                  dependencies=["node pool", "checkout replicas", "payment dependency", "checkout SLI"])
        # Simplified simulation: one checkout replica per node, minAvailable=N-1.
        disruptions_allowed = 0 if self.scenario == "pdb" else 1
        headroom = 0.10 if self.scenario == "capacity" else 0.40
        replicas = 1 if self.scenario == "replicas" else len(self.nodes)
        baseline = self.app.metrics(0)
        reasons = []
        if disruptions_allowed < 1:
            reasons.append("Pod disruption budget permits no evictions")
        if headroom < self.policy.min_headroom:
            reasons.append("Insufficient CPU/memory headroom")
        if replicas < 2:
            reasons.append("Checkout has insufficient replicas")
        decision, gate_reasons = health_gate(baseline, baseline, self.policy)
        if decision != "CONTINUE":
            reasons.extend(gate_reasons)
        self.emit("PREFLIGHT", baseline=asdict(baseline), reasons=reasons,
                  disruptions_allowed=disruptions_allowed, headroom=headroom)
        if reasons:
            self.emit("BLOCKED", reasons=reasons)
            return self.report()
        # Serial replacement keeps simulated concurrent disruption within the PDB.
        for node in self.nodes:
            self.emit("CANARY" if self.changed == 0 else "EXECUTE_NEXT", cohort=[node.name])
            try:
                self.executor.replace([node])
            except Exception as exc:
                self.emit("ABORT", reasons=[f"Executor failed: {type(exc).__name__}"],
                          recovery="Inspect executor outcome; actual target state may be unknown")
                return self.report()
            self.changed += 1
            holds = 0
            while True:
                decision = "CONTINUE"
                reasons = []
                for sample in range(self.policy.observation_samples):
                    metrics = self.app.metrics(self.changed)
                    self.emit("OBSERVE", sample=sample + 1, metrics=asdict(metrics))
                    decision, reasons = health_gate(metrics, baseline, self.policy)
                    if decision != "CONTINUE":
                        break
                self.emit("EVALUATE", decision=decision, reasons=reasons)
                if decision == "ABORT":
                    self.emit("ABORT", reasons=reasons,
                              recovery="Operator review required; changed images are retained, no rollback claimed")
                    return self.report()
                if decision == "HOLD":
                    self.emit("HOLD", reasons=reasons, round=holds + 1)
                    if holds >= self.policy.max_hold_rounds:
                        self.emit("ABORT", reasons=["Telemetry hold budget exhausted"],
                                  recovery="Restore monitoring and review changed nodes before a new run")
                        return self.report()
                    holds += 1
                    continue
                self.emit("CONTINUE", verified_nodes=self.changed)
                break
        self.emit("COMPLETE", reasons=["Every replacement passed its observation window"])
        return self.report()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--scenario", choices=SCENARIOS, default="healthy")
    parser.add_argument("--nodes", type=int, default=10)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    if args.nodes < 2:
        parser.error("--nodes must be at least 2")
    report = Controller(args.scenario, args.nodes).run()
    for event in report["events"]:
        details = event.get("reasons", event.get("cohort", []))
        print(f"{event['sequence']:03} {event['state']:<13} {'; '.join(details)}")
    print(f"\n{report['state']}: {report['changed_nodes']}/{report['total_nodes']} nodes changed (simulation)")
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    return 0 if report["state"] == "COMPLETE" else 2


if __name__ == "__main__":
    raise SystemExit(main())

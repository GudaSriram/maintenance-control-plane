"use strict";
const $ = id => document.getElementById(id);
const descriptions = {
  checkout: "Infrastructure stays ready, but checkout success drops. The controller stops after the canary.",
  healthy: "All health gates pass. Each node is replaced and verified before the next one changes.",
  errors: "The canary causes HTTP errors to increase beyond both absolute and baseline-relative limits.",
  latency: "P95 latency jumps from 180 ms to 2,400 ms. The controller protects the remaining fleet.",
  telemetry: "Missing monitoring data triggers HOLD. Exhausting the observation retry budget ends the run.",
  pdb: "The disruption budget permits no evictions. Preflight blocks maintenance before any node changes.",
  capacity: "Only 10% capacity headroom is available against a 30% minimum. No change is allowed.",
  replicas: "The checkout workload has only one replica. Preflight blocks the maintenance operation."
};
let reports, report, cursor = 0, timer = null, changed = new Set(), verified = new Set(), currentNode = null;
const finished = () => cursor >= report.events.length;
function pause() { clearInterval(timer); timer = null; $("play").textContent = finished() ? "Replay demo" : cursor ? "Resume" : "Run demo"; }
function reset() {
  if (timer) clearInterval(timer);
  timer = null; report = reports[$("scenario").value]; cursor = 0; changed = new Set(); verified = new Set(); currentNode = null;
  $("play").textContent = "Run demo"; $("step").disabled = false;
  $("scenario-description").textContent = descriptions[report.scenario];
  $("status").className = "status"; $("status").textContent = "READY";
  $("decision-title").textContent = "A small change. A clear decision.";
  $("reason").textContent = "Run the demo to see if application health allows maintenance to proceed.";
  $("trail").replaceChildren(); const empty = document.createElement("li"); empty.className = "empty"; empty.textContent = "Start a scenario to reveal its audit trail."; $("trail").append(empty);
  renderMetrics(null); renderNodes();
}
function renderNodes(terminal = false) {
  $("nodes").replaceChildren();
  for (const node of report.nodes) {
    const state = verified.has(node.name) ? "good" : changed.has(node.name) ? (terminal ? "bad" : "active") : currentNode === node.name ? "active" : "";
    const div = document.createElement("div"); div.className = `node ${state}`;
    const icon = document.createElement("div"); icon.className = "node-icon"; icon.setAttribute("aria-hidden", "true");
    const name = document.createElement("b"); name.textContent = node.name;
    const detail = document.createElement("small"); detail.textContent = verified.has(node.name) ? "Verified · v2" : changed.has(node.name) ? "Changed · v2" : currentNode === node.name ? "Updating" : "Pending · v1";
    div.append(icon, name, detail); $("nodes").append(div);
  }
  $("changed").replaceChildren(document.createTextNode(String(changed.size))); const total = document.createElement("span"); total.textContent = ` / ${report.total_nodes}`; $("changed").append(total);
  $("verified").textContent = `${verified.size} verified by health gates`;
  $("progress-fill").style.width = `${changed.size / report.total_nodes * 100}%`;
  document.querySelector(".progress").setAttribute("aria-valuenow", String(changed.size));
}
function renderMetrics(m) {
  const available = m && m.available;
  const values = available ? [m.ready ? "Ready" : "Not ready", `${(m.error_rate * 100).toFixed(1)}%`, `${m.p95_ms.toLocaleString()} ms`, `${(m.checkout_success * 100).toFixed(1)}%`] : ["—", "—", "—", "—"];
  const bad = available ? [!m.ready || m.pending_pods > 0, m.error_rate > report.policy.max_error_rate || m.error_rate - .001 > report.policy.max_error_increase, m.p95_ms > 180 * report.policy.max_latency_ratio, m.checkout_success < report.policy.min_checkout_success] : [];
  ["readiness", "error-rate", "latency", "checkout"].forEach((id, i) => { $(id).textContent = values[i]; $(id).className = !available ? "unknown" : bad[i] ? "bad" : ""; });
}
function detail(event) {
  if (event.reasons?.length) return event.reasons.join("; ");
  if (event.cohort) return `Replace ${event.cohort.join(", ")} with image-v2`;
  if (event.state === "DISCOVER") return `Discovered ${event.nodes} nodes serving checkout`;
  if (event.state === "PREFLIGHT") return `Ready: ${event.disruptions_allowed} disruption allowed; ${event.headroom * 100}% headroom`;
  if (event.state === "OBSERVE") return event.metrics.available ? `Sample ${event.sample}: errors ${(event.metrics.error_rate * 100).toFixed(1)}%, P95 ${event.metrics.p95_ms} ms, checkout ${(event.metrics.checkout_success * 100).toFixed(1)}%` : "Monitoring unavailable";
  if (event.state === "CONTINUE") return `${event.verified_nodes} node(s) verified; safe to continue`;
  return event.state;
}
function step() {
  if (finished()) return;
  const event = report.events[cursor++];
  if (event.cohort) currentNode = event.cohort[0];
  if (event.state === "OBSERVE") { changed.add(currentNode); renderMetrics(event.metrics); }
  if (event.baseline) renderMetrics(event.baseline);
  if (event.state === "CONTINUE") verified.add(currentNode);
  const bad = ["ABORT", "BLOCKED"].includes(event.state), good = ["COMPLETE", "CONTINUE"].includes(event.state);
  $("status").textContent = event.state;
  $("status").className = `status ${bad ? "bad" : good ? "good" : event.state === "HOLD" ? "hold" : ""}`;
  const titles = {ABORT:"Maintenance stopped. Fleet protected.", BLOCKED:"Blocked before the first change.", COMPLETE:"Every node changed. Every gate passed.", HOLD:"No telemetry. No further changes.", EVALUATE:"Application health decides what is next.", CANARY:"Start with one canary node.", OBSERVE:"Watch the service, not just the node.", CONTINUE:"Health verified. Safe to proceed.", DISCOVER:"Understand the affected environment.", PREFLIGHT:"Check readiness before taking action.", EXECUTE_NEXT:"Proceed with the next node."};
  $("decision-title").textContent = titles[event.state]; $("reason").textContent = detail(event);
  if (cursor === 1) $("trail").replaceChildren();
  const row = document.createElement("li"), seq = document.createElement("span"), state = document.createElement("b"), evidence = document.createElement("span");
  seq.textContent = String(event.sequence).padStart(2,"0"); state.textContent = event.state; evidence.textContent = detail(event); row.append(seq,state,evidence); $("trail").append(row); $("trail").scrollTop = $("trail").scrollHeight;
  renderNodes(bad);
  if (finished()) { pause(); $("step").disabled = true; }
}
$("play").addEventListener("click", () => {
  if (timer) { pause(); return; }
  if (finished()) reset();
  step();
  if (!finished()) { $("play").textContent = "Pause"; timer = setInterval(step, Number($("speed").value)); }
});
$("step").addEventListener("click", () => { pause(); step(); });
$("reset").addEventListener("click", reset); $("scenario").addEventListener("change", reset);
$("speed").addEventListener("change", () => { if (timer) { clearInterval(timer); timer = setInterval(step, Number($("speed").value)); } });
$("download").addEventListener("click", () => {
  const url = URL.createObjectURL(new Blob([JSON.stringify(report, null, 2)], {type:"application/json"}));
  const link = document.createElement("a"); link.href = url; link.download = `maintenance-${report.scenario}.json`; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
});
fetch("scenarios.json").then(response => { if (!response.ok) throw new Error("Scenario data unavailable"); return response.json(); }).then(data => {
  reports = data; ["scenario", "play", "step", "reset", "download"].forEach(id => $(id).disabled = false); reset();
}).catch(() => { $("scenario-description").textContent = "Could not load scenario data. Refresh the page or serve the docs folder through a local HTTP server."; });

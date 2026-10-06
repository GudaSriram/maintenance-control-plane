import unittest
from control_plane import Controller, Metrics, Policy, health_gate


class ControllerTests(unittest.TestCase):
    def test_healthy_completes_every_node(self):
        result = Controller().run()
        self.assertEqual(result["state"], "COMPLETE")
        self.assertEqual(result["changed_nodes"], 10)
        self.assertTrue(all(n["image"] == "image-v2" for n in result["nodes"]))
        self.assertEqual(sum(e["state"] == "OBSERVE" for e in result["events"]), 30)

    def test_preflight_never_calls_executor(self):
        class Forbidden:
            def replace(self, nodes):
                raise AssertionError("Must not execute")
        for scenario in ("pdb", "capacity", "replicas"):
            with self.subTest(scenario=scenario):
                result = Controller(scenario, executor=Forbidden()).run()
                self.assertEqual(result["state"], "BLOCKED")
                self.assertEqual(result["changed_nodes"], 0)

    def test_degradation_stops_after_canary(self):
        for scenario in ("errors", "latency", "checkout", "telemetry"):
            with self.subTest(scenario=scenario):
                result = Controller(scenario).run()
                self.assertEqual(result["state"], "ABORT")
                self.assertEqual(result["changed_nodes"], 1)
                self.assertFalse(any(e["state"] == "EXECUTE_NEXT" for e in result["events"]))
                if scenario == "telemetry":
                    self.assertTrue(any(e["state"] == "HOLD" for e in result["events"]))

    def test_business_failure_with_ready_infrastructure(self):
        decision, reasons = health_gate(Metrics(checkout_success=0.94), Metrics(), Policy())
        self.assertEqual(decision, "ABORT")
        self.assertIn("business SLI", reasons[0])

    def test_executor_failure_stops(self):
        class Broken:
            def replace(self, nodes):
                raise RuntimeError("failure")
        result = Controller(executor=Broken()).run()
        self.assertEqual(result["state"], "ABORT")
        self.assertEqual(result["changed_nodes"], 0)

    def test_no_replay(self):
        controller = Controller()
        controller.run()
        with self.assertRaises(RuntimeError):
            controller.run()

    def test_invalid_inputs(self):
        for kwargs in ({"node_count": 1}, {"scenario": "unknown"},
                       {"policy": Policy(observation_samples=0)}):
            with self.assertRaises(ValueError):
                Controller(**kwargs)


if __name__ == "__main__":
    unittest.main()

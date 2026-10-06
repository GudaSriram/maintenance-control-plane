"""Export deterministic controller evidence for the static GitHub Pages demo."""
import json
from pathlib import Path
from control_plane import Controller, SCENARIOS


def build():
    target = Path(__file__).parent / "docs" / "scenarios.json"
    reports = {scenario: Controller(scenario).run() for scenario in SCENARIOS}
    target.write_text(json.dumps(reports, indent=2) + "\n", encoding="utf-8")
    print(f"Exported {len(reports)} scenarios to {target}")


if __name__ == "__main__":
    build()

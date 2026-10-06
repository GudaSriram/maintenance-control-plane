"""Loopback-only checkout demo. Faults selected at startup, never production traffic."""
import argparse
from dataclasses import asdict
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import time
from control_plane import SampleCheckout


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--fault", choices=["healthy", "errors", "latency", "checkout", "telemetry"], default="healthy")
    parser.add_argument("--port", type=int, default=8080)
    args = parser.parse_args()
    app = SampleCheckout(args.fault)

    class Handler(BaseHTTPRequestHandler):
        def do_GET(self):
            status = 200
            if self.path == "/healthz":
                body = {"ready": True, "note": "Infrastructure readiness can stay green during business failures"}
            elif self.path == "/metrics":
                status = 503 if args.fault == "telemetry" else 200
                body = asdict(app.metrics(1))
            elif self.path == "/checkout":
                if args.fault == "latency":
                    time.sleep(2.4)
                status = 503 if args.fault in ("errors", "checkout") else 200
                body = {"success": status == 200, "simulated": True}
            else:
                status, body = 404, {"routes": ["/healthz", "/metrics", "/checkout"]}
            data = json.dumps(body).encode()
            self.send_response(status)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)

    print(f"Sample checkout at http://127.0.0.1:{args.port} (fault={args.fault})", flush=True)
    HTTPServer(("127.0.0.1", args.port), Handler).serve_forever()


if __name__ == "__main__":
    main()

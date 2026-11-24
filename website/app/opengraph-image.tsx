export const dynamic = "force-static";
import { ImageResponse } from "next/og";
export const alt = "SteadyOps — Swap the model. Keep the behaviour.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#0b203b",
        color: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 75,
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontSize: 30 }}>
        SteadyOps / AI AGENT MAINTENANCE
      </div>
      <div
        style={{
          fontSize: 54,
          lineHeight: 1.1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        Swap the model.
        <span style={{ color: "#87b0fa" }}>Keep the behaviour.</span>
      </div>
      <div style={{ fontSize: 24, color: "#b5c7e0" }}>
        Model Migration Check · from $1,500
      </div>
    </div>,
    size,
  );
}

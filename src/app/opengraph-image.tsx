import { ImageResponse } from "next/og";
export const alt = "Inland Digital Group — Websites with a point of view";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#181d22",
        color: "#f4f1e9",
        padding: 70,
      }}
    >
      <span style={{ fontSize: 26 }}>INLAND DIGITAL GROUP / SOUTHERN CALIFORNIA</span>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 88, letterSpacing: -5 }}>
        <span>Websites with</span>
        <span style={{ color: "#ff795b" }}>a point of view.</span>
      </div>
      <span style={{ fontSize: 23 }}>
        Distinctive design. Thoughtful development. Digital growth.
      </span>
    </div>,
    size,
  );
}

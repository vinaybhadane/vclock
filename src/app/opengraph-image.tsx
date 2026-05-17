import { ImageResponse } from "next/og";

export const alt =
  "vClock online clock, timer, stopwatch, alarm, and world clock tools";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f8fafc",
          color: "#0f172a",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "64px",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "2px solid #d9e2ec",
            borderRadius: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            height: "100%",
            justifyContent: "space-between",
            padding: "56px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ color: "#0ea5e9", fontSize: 34, fontWeight: 700 }}>
              vClock
            </div>
            <div style={{ color: "#5b6472", fontSize: 28 }}>Time tools</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ fontSize: 86, fontWeight: 800, lineHeight: 1 }}>
              Live Clock
            </div>
            <div style={{ color: "#334155", fontSize: 42, lineHeight: 1.25 }}>
              Online clock, timer, stopwatch, alarm, and world clock in one
              fast web app.
            </div>
          </div>
          <div style={{ display: "flex", gap: "18px" }}>
            {["Clock", "Timer", "Stopwatch", "Alarm", "World Clock"].map(
              (label) => (
                <div
                  key={label}
                  style={{
                    background: "#e0f2fe",
                    borderRadius: "999px",
                    color: "#075985",
                    fontSize: 26,
                    fontWeight: 700,
                    padding: "14px 22px",
                  }}
                >
                  {label}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    ),
    size,
  );
}

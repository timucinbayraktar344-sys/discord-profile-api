
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const name = searchParams.get("name") || "Discord User";
  const avatar = searchParams.get("avatar") || "";
  const level = Math.max(0, Number(searchParams.get("level") || 1));
  const xp = Math.max(0, Number(searchParams.get("xp") || 0));
  const next = Math.max(1, Number(searchParams.get("next") || 100));
  const progress = Math.min(100, Math.round((xp / next) * 100));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "38px",
          background: "linear-gradient(135deg, #090d20, #17143b, #24104a)",
          color: "white",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            padding: "28px",
            borderRadius: "24px",
            border: "2px solid #5147a8",
            background: "#10132c",
            alignItems: "center",
          }}
        >
          {avatar.startsWith("https://") && (
            <img
              src={avatar}
              width="150"
              height="150"
              style={{
                borderRadius: "75px",
                border: "4px solid #8b5cf6",
              }}
            />
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "30px",
              flex: 1,
            }}
          >
            <div style={{ fontSize: 18, color: "#a5b4fc" }}>
              PLAYER PROFILE
            </div>

            <div
              style={{
                fontSize: 38,
                fontWeight: 700,
                marginTop: "8px",
              }}
            >
              {name.slice(0, 32)}
            </div>

            <div
              style={{
                display: "flex",
                marginTop: "20px",
                gap: "36px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "#a5b4fc", fontSize: 16 }}>
                  LEVEL
                </span>
                <span style={{ fontSize: 34, fontWeight: 700 }}>
                  {level}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "#a5b4fc", fontSize: 16 }}>
                  EXPERIENCE
                </span>
                <span style={{ fontSize: 28, fontWeight: 700 }}>
                  {xp} / {next} XP
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                height: "16px",
                width: "100%",
                background: "#30304f",
                borderRadius: "12px",
                marginTop: "20px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  height: "16px",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #6366f1, #d946ef)",
                  borderRadius: "12px",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                color: "#c4b5fd",
                fontSize: 16,
                marginTop: "8px",
              }}
            >
              {progress}% COMPLETE
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1000, height: 360 }
  );
}

import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const name = (searchParams.get("name") || "Discord User").slice(0, 32);
  const avatar = searchParams.get("avatar") || "";
  const level = Math.max(0, Number(searchParams.get("level") || 1));
  const xp = Math.max(0, Number(searchParams.get("xp") || 0));
  const next = Math.max(1, Number(searchParams.get("next") || 100));
  const progress = Math.min(100, Math.round((xp / next) * 100));

  const emojis = {
    logo: "https://cdn.discordapp.com/emojis/1363193225183105105.png?v=1&size=48&quality=lossless",
    seth: "https://cdn.discordapp.com/emojis/1221471567410630786.png?v=1&size=48&quality=lossless",
    yeth: "https://cdn.discordapp.com/emojis/1221471619520925727.png?v=1&size=48&quality=lossless",
    sethBanka: "https://cdn.discordapp.com/emojis/1328369378562932796.png?v=1&size=48&quality=lossless",
    xp: "https://cdn.discordapp.com/emojis/1355997317332734033.png?v=1&size=48&quality=lossless",
    level: "https://cdn.discordapp.com/emojis/1560926678723596379.png?v=1&size=48&quality=lossless",
  };

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "24px",
          background: "#2b2d31",
          color: "#ffffff",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            border: "1px solid #41434a",
            borderRadius: "20px",
            padding: "24px",
            alignItems: "center",
          }}
        >
          {/* SOL TARAF: Avatar ve Level/XP */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "43%",
              height: "100%",
              justifyContent: "center",
              paddingRight: "24px",
            }}
          >
            {avatar.startsWith("https://") && (
              <img
                src={avatar}
                width="104"
                height="104"
                style={{
                  borderRadius: "52px",
                  border: "3px solid #836fff",
                  objectFit: "cover",
                }}
              />
            )}

            <div
              style={{
                display: "flex",
                fontSize: 24,
                fontWeight: 700,
                marginTop: "10px",
                maxWidth: "350px",
              }}
            >
              {name}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "7px",
                marginTop: "24px",
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              <img src={emojis.level} width="22" height="22" />
              <span>Level: {level}</span>
              <span style={{ marginLeft: "4px" }}>|</span>
              <img src={emojis.xp} width="22" height="22" />
              <span>XP: {xp} / {next}</span>
            </div>

            <div
              style={{
                display: "flex",
                width: "100%",
                height: "10px",
                background: "#484a53",
                borderRadius: "8px",
                overflow: "hidden",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: `${progress}%`,
                  height: "10px",
                  background: "#836fff",
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>

          {/* SAĞ TARAF: Seth logosu ve emojili liste */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              height: "100%",
              justifyContent: "center",
              paddingLeft: "28px",
              borderLeft: "1px solid #41434a",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                marginBottom: "26px",
              }}
            >
              <img
                src={emojis.logo}
                width="46"
                height="46"
                style={{ objectFit: "contain" }}
              />

              <div
                style={{
                  display: "flex",
                  fontSize: 38,
                  fontWeight: 800,
                  color: "#836fff",
                }}
              >
                Seth
              </div>
            </div>

            {[
              { label: "Seth", src: emojis.seth },
              { label: "Yeth", src: emojis.yeth },
              { label: "SethBanka", src: emojis.sethBanka },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "10px 16px",
                  marginBottom: "10px",
                  borderRadius: "12px",
                  background: "#36383e",
                  fontSize: 23,
                  fontWeight: 600,
                }}
              >
                <img
                  src={item.src}
                  width="32"
                  height="32"
                  style={{ objectFit: "contain" }}
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1000, height: 360 }
  );
}

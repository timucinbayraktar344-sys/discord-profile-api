
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const name = (searchParams.get("name") || "Discord User").slice(0, 32);
  const avatar = searchParams.get("avatar") || "";

  const level = Math.max(0, Number(searchParams.get("level") || 1));
  const xp = Math.max(0, Number(searchParams.get("xp") || 0));
  const next = Math.max(1, Number(searchParams.get("next") || 100));

  const seth = searchParams.get("seth") || "0";
  const yeth = searchParams.get("yeth") || "0";
  const sethBanka = searchParams.get("sethbanka") || "0";

  const ranked = searchParams.get("ranked") || "Unranked";
  const point = searchParams.get("point") || "0";

  // Premium değerleri Unix timestamp (saniye)
  const premiumEnd = Number(searchParams.get("premium") || 0);
  const premiumStart = Number(searchParams.get("premiumstart") || 0);
  const now = Math.floor(Date.now() / 1000);

  const premiumActive = premiumEnd > now;
  const remaining = Math.max(0, premiumEnd - now);
  const totalDuration = premiumEnd - premiumStart;

  const premiumProgress =
    premiumActive && totalDuration > 0
      ? Math.max(0, Math.min(100, (remaining / totalDuration) * 100))
      : 0;

  const formatDuration = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (days > 0) return `${days} gün ${hours} saat`;
    if (hours > 0) return `${hours} saat ${minutes} dakika`;
    return `${minutes} dakika`;
  };

  const premiumText = premiumActive
    ? `${remaining <= 3600 ? "⚠️ " : ""}${formatDuration(remaining)}`
    : "";

  const progress = Math.min(100, Math.max(0, Math.round((xp / next) * 100)));

  const barColor =
    level >= 100 ? "#facc15" :
    level >= 50 ? "#f97316" :
    level >= 25 ? "#ef4444" :
    level >= 10 ? "#3b82f6" :
    "#836fff";

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
      <div style={{
        display: "flex", width: "100%", height: "100%",
        padding: "20px", background: "#2b2d31",
        color: "#ffffff", fontFamily: "Arial",
      }}>
        <div style={{
          display: "flex", width: "100%", height: "100%",
          border: "1px solid #41434a", borderRadius: "22px",
          padding: "22px", alignItems: "center",
        }}>
          {/* SOL: Büyütülmüş avatar ve kullanıcı bilgileri */}
          <div style={{
            display: "flex", flexDirection: "column",
            width: "44%", height: "100%",
            justifyContent: "center", paddingRight: "18px",
          }}>
            {avatar.startsWith("https://") && (
              <img src={avatar} width="170" height="170" style={{
                borderRadius: "85px", border: "5px solid #836fff",
                objectFit: "cover",
              }} />
            )}

            <div style={{
              display: "flex", fontSize: 29, fontWeight: 700,
              marginTop: "10px", maxWidth: "370px",
            }}>
              {name}
            </div>

            {/* Ranked / Point başlıkları büyütüldü */}
            <div style={{
              display: "flex", alignItems: "center", gap: "10px",
              marginTop: "12px", fontSize: 23, fontWeight: 700,
            }}>
              <span>Ranked</span>
              <span style={{ color: "#836fff" }}>&gt;</span>
              <span>Point</span>
            </div>

            <div style={{
              display: "flex", fontSize: 22, color: "#d1d5db",
              marginTop: "5px", fontWeight: 600,
            }}>
              {ranked} • {point}
            </div>

            {/* Premium yalnızca aktifken görünür */}
            {premiumActive && (
              <div style={{
                display: "flex", flexDirection: "column",
                marginTop: "14px", width: "100%",
              }}>
                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between", gap: "6px",
                  fontSize: 17, fontWeight: 700,
                }}>
                  <span style={{ color: premiumWarningColor(remaining) }}>
                    {remaining <= 3600 ? "⚠️ Premium" : "Premium"}
                  </span>
                  <span style={{ fontSize: 15 }}>{formatDuration(remaining)}</span>
                </div>

                <div style={{
                  display: "flex", width: "100%", height: "12px",
                  background: "#484a53", borderRadius: "8px",
                  overflow: "hidden", marginTop: "7px",
                }}>
                  <div style={{
                    display: "flex", width: `${premiumProgress}%`,
                    height: "12px",
                    background: remaining <= 3600 ? "#f59e0b" : "#a855f7",
                    borderRadius: "8px",
                  }} />
                </div>
              </div>
            )}
          </div>

          {/* SAĞ: Seth ve özel emoji listesi */}
          <div style={{
            display: "flex", flexDirection: "column", flex: 1,
            height: "100%", justifyContent: "center",
            paddingLeft: "22px", borderLeft: "1px solid #41434a",
          }}>
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "center", gap: "12px",
              marginBottom: "15px",
            }}>
              <img src={emojis.logo} width="48" height="48" style={{ objectFit: "contain" }} />
              <div style={{
                display: "flex", fontSize: 38, fontWeight: 800, color: "#836fff",
              }}>Seth</div>
            </div>

            {[
              { label: "Seth", src: emojis.seth, value: seth },
              { label: "Yeth", src: emojis.yeth, value: yeth },
              { label: "SethBanka", src: emojis.sethBanka, value: sethBanka },
            ].map((item) => (
              <div key={item.label} style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "8px 12px", marginBottom: "7px",
                borderRadius: "10px", background: "#36383e",
                fontSize: 18, fontWeight: 600,
              }}>
                <img src={item.src} width="30" height="30" style={{ objectFit: "contain" }} />
                <span>{item.label}:</span>
                <span>{item.value}</span>
              </div>
            ))}

            {/* Level ve XP */}
            <div style={{
              display: "flex", flexDirection: "column",
              marginTop: "auto", paddingTop: "8px",
            }}>
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", fontSize: 16,
                fontWeight: 600, gap: "8px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <img src={emojis.level} width="22" height="22" />
                  <span>Level {level}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <img src={emojis.xp} width="22" height="22" />
                  <span>{xp} / {next} XP</span>
                </div>
              </div>

              <div style={{
                display: "flex", width: "100%", height: "10px",
                background: "#484a53", borderRadius: "8px",
                overflow: "hidden", marginTop: "8px",
              }}>
                <div style={{
                  display: "flex", width: `${progress}%`,
                  height: "10px", background: barColor,
                  borderRadius: "8px",
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1000, height: 400 }
  );
}

function premiumWarningColor(remaining: number) {
  return remaining <= 3600 ? "#f59e0b" : "#c4b5fd";
}

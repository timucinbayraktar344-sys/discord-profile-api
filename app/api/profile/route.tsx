
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
  const popularity = searchParams.get("popularity") || "0";

  const ranked = searchParams.get("ranked") || "Unranked";
  const point = searchParams.get("point") || "0";

  // Premium timestamp değerleri saniye cinsindendir.
  const premiumEnd = Number(searchParams.get("premium") || 0);
  const premiumStart = Number(searchParams.get("premiumstart") || 0);
  const now = Math.floor(Date.now() / 1000);

  const premiumActive = premiumEnd > now;
  const remaining = Math.max(0, premiumEnd - now);
  const totalDuration = premiumEnd - premiumStart;

  const premiumProgress =
    premiumActive && totalDuration > 0
      ? Math.max(
          0,
          Math.min(100, (remaining / totalDuration) * 100)
        )
      : 0;

  const formatDuration = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (days > 0) return `${days} gün ${hours} saat`;
    if (hours > 0) return `${hours} saat ${minutes} dakika`;
    return `${minutes} dakika`;
  };

  const progress = Math.min(
    100,
    Math.max(0, Math.round((xp / next) * 100))
  );

  const barColor =
    level >= 100 ? "#facc15" :
    level >= 50 ? "#f97316" :
    level >= 25 ? "#ef4444" :
    level >= 10 ? "#3b82f6" :
    "#836FFF";

  const emojis = {
    logo: "https://cdn.discordapp.com/emojis/1363193225183105105.png?v=1&size=48&quality=lossless",
    seth: "https://cdn.discordapp.com/emojis/1221471567410630786.png?v=1&size=48&quality=lossless",
    yeth: "https://cdn.discordapp.com/emojis/1221471619520925727.png?v=1&size=48&quality=lossless",
    sethBanka: "https://cdn.discordapp.com/emojis/1328369378562932796.png?v=1&size=48&quality=lossless",
    xp: "https://cdn.discordapp.com/emojis/1355997317332734033.png?v=1&size=48&quality=lossless",
    level: "https://cdn.discordapp.com/emojis/1560926678723596379.png?v=1&size=48&quality=lossless",

    // İstediğin yeni emojiler
    premium: "https://cdn.discordapp.com/emojis/1221870403153166436.png?v=1&size=48&quality=lossless",
    popularity: "https://cdn.discordapp.com/emojis/1221807792134946856.png?v=1&size=48&quality=lossless",
  };

  const cardStyle = {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    padding: "8px 11px",
    marginBottom: "7px",
    borderRadius: "11px",
    background: "rgba(54, 50, 72, 0.92)",
    border: "1px solid #514477",
    fontSize: "17px",
    fontWeight: 600,
    minHeight: "40px",
  } as const;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "15px",
          background: "#17151f",
          color: "#ffffff",
          fontFamily: "Arial",
          position: "relative",
        }}
      >
        {/* Banner dış çerçevesi */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            border: "3px solid #836FFF",
            borderRadius: "22px",
            padding: "18px",
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, #242033 0%, #17151f 55%, #211b35 100%)",
          }}
        >
          {/* Büyük, şeffaf arka plan yazısı */}
          <div
            style={{
              display: "flex",
              position: "absolute",
              left: "205px",
              top: "105px",
              width: "740px",
              height: "150px",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "100px",
              fontWeight: 900,
              color: "#FFFFFF",
              opacity: 0.075,
              whiteSpace: "nowrap",
            }}
          >
            (S) SETH
          </div>

          {/* SOL: Avatar ve kullanıcı bilgileri */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "43%",
              height: "100%",
              paddingRight: "16px",
              borderRight: "1px solid #514477",
              position: "relative",
            }}
          >
            {/* Avatar ve isim yan yana */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                minHeight: "135px",
              }}
            >
              {avatar.startsWith("https://") && (
                <img
                  src={avatar}
                  width="128"
                  height="128"
                  style={{
                    borderRadius: "64px",
                    border: "4px solid #836FFF",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: "25px",
                    fontWeight: 800,
                    overflow: "hidden",
                    color: "#FFFFFF",
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: "13px",
                    color: "#B9ACFF",
                    marginTop: "5px",
                  }}
                >
                  SETH PROFILE
                </div>
              </div>
            </div>

            {/* Ranked ve Point eş tasarımlı kutular */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  padding: "9px",
                  borderRadius: "11px",
                  background: "rgba(54, 50, 72, 0.92)",
                  border: "1px solid #836FFF",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#C4B5FD",
                  }}
                >
                  Ranked
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: "17px",
                    fontWeight: 700,
                    marginTop: "5px",
                    overflow: "hidden",
                  }}
                >
                  {ranked}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  padding: "9px",
                  borderRadius: "11px",
                  background: "rgba(54, 50, 72, 0.92)",
                  border: "1px solid #836FFF",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#C4B5FD",
                  }}
                >
                  Point
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: "17px",
                    fontWeight: 700,
                    marginTop: "5px",
                  }}
                >
                  {point}
                </div>
              </div>
            </div>

            {/* Premium sadece aktifken görünür */}
            {premiumActive && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "13px",
                  padding: "10px",
                  borderRadius: "11px",
                  background: "rgba(54, 50, 72, 0.92)",
                  border: "1px solid #836FFF",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "5px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "16px",
                      fontWeight: 800,
                      color: remaining <= 3600 ? "#FBBF24" : "#C4B5FD",
                    }}
                  >
                    <img
                      src={emojis.premium}
                      width="24"
                      height="24"
                    />
                    <span>
                      {remaining <= 3600 ? "Premium ⚠️" : "Premium"}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    {formatDuration(remaining)}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "10px",
                    background: "#484456",
                    borderRadius: "8px",
                    overflow: "hidden",
                    marginTop: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: `${premiumProgress}%`,
                      height: "10px",
                      background: remaining <= 3600 ? "#F59E0B" : "#A855F7",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* SAĞ: Seth başlığı, ekonomi ve XP */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              height: "100%",
              paddingLeft: "18px",
              position: "relative",
            }}
          >
            {/* Seth başlığı */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "12px",
              }}
            >
              <img
                src={emojis.logo}
                width="40"
                height="40"
                style={{ objectFit: "contain" }}
              />
              <div
                style={{
                  display: "flex",
                  fontSize: "35px",
                  fontWeight: 900,
                  color: "#A99AFF",
                }}
              >
                Seth
              </div>
            </div>

            {/* Ekonomi kutuları */}
            {[
              { label: "Seth", src: emojis.seth, value: seth },
              { label: "Yeth", src: emojis.yeth, value: yeth },
              { label: "SethBanka", src: emojis.sethBanka, value: sethBanka },
              {
                label: "Popülerlik",
                src: emojis.popularity,
                value: popularity,
              },
            ].map((item) => (
              <div key={item.label} style={cardStyle}>
                <img
                  src={item.src}
                  width="27"
                  height="27"
                  style={{ objectFit: "contain" }}
                />
                <span style={{ color: "#C4B5FD" }}>
                  {item.label}:
                </span>
                <span
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "flex-end",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}

            {/* Level ve XP */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "auto",
                paddingTop: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "15px",
                  fontWeight: 700,
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <img src={emojis.level} width="21" height="21" />
                  <span>Level {level}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <img src={emojis.xp} width="21" height="21" />
                  <span>{xp} / {next} XP</span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "10px",
                  background: "#484456",
                  borderRadius: "8px",
                  overflow: "hidden",
                  marginTop: "7px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: `${progress}%`,
                    height: "10px",
                    background: barColor,
                    borderRadius: "8px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1000, height: 400 }
  );
}

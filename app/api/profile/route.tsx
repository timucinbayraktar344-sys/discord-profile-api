
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const name = (searchParams.get("name") || "Discord User").slice(0, 32);
  const avatar = searchParams.get("avatar") || "";
  const bio = (
    searchParams.get("bio") || "Henüz biyografi eklenmedi"
  ).slice(0, 90);

  const parseNumber = (value: string | null, fallback = 0) => {
    const parsed = Number((value || "").replace(/,/g, ""));
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const formatNumber = (value: number) =>
    new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(value);

  const level = Math.max(0, parseNumber(searchParams.get("level"), 1));
  const xp = Math.max(0, parseNumber(searchParams.get("xp")));
  const next = Math.max(1, parseNumber(searchParams.get("next"), 100));

  const seth = formatNumber(parseNumber(searchParams.get("seth")));
  const yeth = formatNumber(parseNumber(searchParams.get("yeth")));
  const sethBanka = formatNumber(parseNumber(searchParams.get("sethbanka")));
  const popularity = formatNumber(parseNumber(searchParams.get("popularity")));

  const ranked = searchParams.get("ranked") || "Unranked";
  const point = formatNumber(parseNumber(searchParams.get("point")));

  const premiumEnd = parseNumber(searchParams.get("premium"));
  const premiumStart = parseNumber(searchParams.get("premiumstart"));
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
    fontSize: "17px",
    fontWeight: 600,
    minHeight: "40px",
    boxSizing: "border-box",
    minWidth: 0,
  } as const;

  const progressTrackStyle = {
    display: "flex",
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    height: "10px",
    background: "#484456",
    borderRadius: "8px",
    overflow: "hidden",
    marginTop: "8px",
  } as const;

  const economyCards = [
    {
      label: "Seth",
      src: emojis.seth,
      value: seth,
      color: "#836FFF",
    },
    {
      label: "Yeth",
      src: emojis.yeth,
      value: yeth,
      color: "#35C9FF",
    },
    {
      label: "SethBanka",
      src: emojis.sethBanka,
      value: sethBanka,
      color: "#FFFFFF",
    },
    {
      label: "Popülerlik",
      src: emojis.popularity,
      value: popularity,
      color: "#FF9F43",
    },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "15px",
          boxSizing: "border-box",
          background: "#17151f",
          color: "#ffffff",
          fontFamily: "Arial",
        }}
      >
        {/* Dış çerçeve: Premium aktifken gökkuşağı */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            padding: premiumActive ? "4px" : "3px",
            boxSizing: "border-box",
            borderRadius: "22px",
            background: premiumActive
              ? "linear-gradient(120deg, #ff3b7a, #ff9f43, #ffe66d, #39e58c, #35c9ff, #8b5cf6, #ff3b7a)"
              : "#836FFF",
          }}
        >
          {/* İç çerçeve */}
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              borderRadius: "18px",
              padding: "18px",
              overflow: "hidden",
              background: "linear-gradient(135deg, rgba(36, 32, 51, 0.58) 0%, rgba(23, 21, 31, 0.48) 55%, rgba(33, 27, 53, 0.58) 100%)",
            }}
          >
            {/* SOL: Profil bilgileri */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "43%",
                height: "100%",
                minWidth: 0,
                paddingRight: "16px",
                borderRight: "1px solid rgba(196, 181, 253, 0.35)",
              }}
            >
              {/* Avatar, kullanıcı adı ve biyografi */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  minHeight: "115px",
                  boxSizing: "border-box",
                }}
              >
                {avatar.startsWith("https://") && (
                  <img
                    src={avatar}
                    width="108"
                    height="108"
                    style={{
                      borderRadius: "54px",
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
                      fontSize: "24px",
                      fontWeight: 800,
                      lineHeight: 1.15,
                      maxWidth: "100%",
                      overflow: "hidden",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {name}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      fontSize: "14px",
                      color: "#C4B5FD",
                      marginTop: "5px",
                      lineHeight: 1.5,
                      overflow: "hidden",
                      overflowWrap: "anywhere",
                      wordBreak: "break-word",
                      maxHeight: "126px",
                    }}
                  >
                    {bio}
                  </div>
                </div>
              </div>

              {/* Ranked ve Point */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginTop: "10px",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    minWidth: 0,
                    padding: "9px",
                    borderRadius: "11px",
                    background: "rgba(131, 111, 255, 0.16)",
                    border: "1px solid rgba(131, 111, 255, 0.65)",
                    boxSizing: "border-box",
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
                      overflowWrap: "anywhere",
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
                    minWidth: 0,
                    padding: "9px",
                    borderRadius: "11px",
                    background: "rgba(131, 111, 255, 0.16)",
                    border: "1px solid rgba(131, 111, 255, 0.65)",
                    boxSizing: "border-box",
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
                      overflow: "hidden",
                    }}
                  >
                    {point}
                  </div>
                </div>
              </div>

              {/* Premium */}
              {premiumActive && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "10px",
                    padding: "10px",
                    borderRadius: "11px",
                    background: "rgba(168, 85, 247, 0.18)",
                    border: "1px solid rgba(192, 132, 252, 0.75)",
                    boxSizing: "border-box",
                    width: "100%",
                    minWidth: 0,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "5px",
                      minWidth: 0,
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
                        minWidth: 0,
                      }}
                    >
                      <img src={emojis.premium} width="24" height="24" />
                      <span>
                        {remaining <= 3600 ? "Premium ⚠️" : "Premium"}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        fontSize: "13px",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {formatDuration(remaining)}
                    </div>
                  </div>

                  <div style={progressTrackStyle}>
                    <div
                      style={{
                        display: "flex",
                        width: `${premiumProgress}%`,
                        maxWidth: "100%",
                        minWidth: 0,
                        boxSizing: "border-box",
                        height: "10px",
                        background: remaining <= 3600 ? "#F59E0B" : "#A855F7",
                        borderRadius: "8px",
                        flexShrink: 0,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Level ve XP: biraz aşağı alındı */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "18px",
                  padding: "10px",
                  boxSizing: "border-box",
                  width: "100%",
                  minWidth: 0,
                  borderRadius: "11px",
                  background: "rgba(131, 111, 255, 0.16)",
                  border: "1px solid rgba(131, 111, 255, 0.65)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "6px",
                    fontSize: "14px",
                    fontWeight: 700,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      minWidth: 0,
                    }}
                  >
                    <img src={emojis.level} width="22" height="22" />
                    <span>Level {formatNumber(level)}</span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      minWidth: 0,
                    }}
                  >
                    <img src={emojis.xp} width="22" height="22" />
                    <span>
                      {formatNumber(xp)} / {formatNumber(next)} XP
                    </span>
                  </div>
                </div>

                <div style={progressTrackStyle}>
                  <div
                    style={{
                      display: "flex",
                      width: `${progress}%`,
                      maxWidth: "100%",
                      minWidth: 0,
                      boxSizing: "border-box",
                      height: "10px",
                      background: barColor,
                      borderRadius: "8px",
                      flexShrink: 0,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* SAĞ: Seth ve renkli ekonomi kutuları */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                minWidth: 0,
                height: "100%",
                paddingLeft: "18px",
              }}
            >
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

              {economyCards.map((item) => (
                <div
                  key={item.label}
                  style={{
                    ...cardStyle,
                    background: `${item.color}22`,
                    border: `1px solid ${item.color}99`,
                  }}
                >
                  <img
                    src={item.src}
                    width="27"
                    height="27"
                    style={{ objectFit: "contain", flexShrink: 0 }}
                  />
                  <span
                    style={{
                      color: item.color === "#FFFFFF" ? "#FFFFFF" : item.color,
                      flexShrink: 0,
                    }}
                  >
                    {item.label}:
                  </span>
                  <span
                    style={{
                      display: "flex",
                      flex: 1,
                      minWidth: 0,
                      justifyContent: "flex-end",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1000, height: 460 }
  );
}

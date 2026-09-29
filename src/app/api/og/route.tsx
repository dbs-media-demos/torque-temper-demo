import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";

// Fonts and the background photo are read once at module scope. URLs relative to this file
// are traced into the deployment bundle.
const [cond, wide, mono, photo] = await Promise.all([
  readFile(new URL("../../../assets/fonts/Archivo-Cond-800.ttf", import.meta.url)),
  readFile(new URL("../../../assets/fonts/Archivo-Wide-800.ttf", import.meta.url)),
  readFile(new URL("../../../assets/fonts/JetBrainsMono-500.ttf", import.meta.url)),
  readFile(new URL("../../../assets/og-bg.jpg", import.meta.url)),
]);
const bg = `data:image/jpeg;base64,${photo.toString("base64")}`;

/** Branded 1200×630 share image: /api/og?title=…&eyebrow=… */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? "The honest shop in East Dallas.").slice(0, 110);
  const eyebrow = (searchParams.get("eyebrow") ?? "Auto repair · East Dallas").slice(0, 60);
  const size = title.length > 60 ? 64 : title.length > 36 ? 80 : 100;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", backgroundColor: "#0e0f11", fontFamily: "Cond" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bg} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, width: 1200, height: 630, objectFit: "cover", opacity: 0.55 }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", backgroundImage: "linear-gradient(90deg, rgba(14,15,17,0.96) 0%, rgba(14,15,17,0.7) 55%, rgba(14,15,17,0.2) 100%)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", padding: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <svg width="58" height="58" viewBox="0 0 64 64">
              <polygon points="32,4.5 55.8,18.25 55.8,45.75 32,59.5 8.2,45.75 8.2,18.25" fill="none" stroke="#efece6" strokeWidth="4.2" />
              <circle cx="32" cy="32" r="10.5" fill="none" stroke="#efece6" strokeWidth="4.2" />
              <line x1="45" y1="5" x2="19" y2="59" stroke="#ff5b1f" strokeWidth="6" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontFamily: "Wide", fontSize: 30, color: "#efece6", letterSpacing: 0.5 }}>
                TORQUE <span style={{ color: "#ff5b1f", margin: "0 10px" }}>&amp;</span> TEMPER
              </div>
              <div style={{ display: "flex", fontFamily: "Mono", fontSize: 15, color: "#b9b5ad", letterSpacing: 4, marginTop: 6 }}>AUTO WORKS · EAST DALLAS · EST. 2009</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 900 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Mono", fontSize: 20, color: "#ff5b1f", letterSpacing: 4, textTransform: "uppercase" }}>
              <div style={{ width: 22, height: 5, background: "#ff5b1f", transform: "rotate(-60deg)" }} />
              {eyebrow}
            </div>
            <div style={{ display: "flex", fontSize: size, lineHeight: 0.92, color: "#efece6", textTransform: "uppercase" }}>{title}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontFamily: "Mono", fontSize: 20, color: "#efece6", letterSpacing: 2 }}>
            <div style={{ display: "flex" }}>(214) 555-0147</div>
            <div style={{ display: "flex", color: "#b9b5ad" }}>4.9 / 5 · 612 REVIEWS · 24/24 WARRANTY</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Cond", data: cond, weight: 800, style: "normal" },
        { name: "Wide", data: wide, weight: 800, style: "normal" },
        { name: "Mono", data: mono, weight: 500, style: "normal" },
      ],
      headers: { "Cache-Control": "public, max-age=31536000, immutable" },
    },
  );
}

# Torque & Temper Auto Works (DBS Media demo)

- Niche: Auto repair shop         (matches dbs-media.com industry id: auto-repair)
- Market / city: US – Dallas, TX (East Dallas; Lakewood, Lake Highlands, Garland, Mesquite)
- Languages: en
- Live URL: https://torque-temper-demo.vercel.app
- Repo: local only for now (git on `main`; push to the demos GitHub org once it's confirmed)
- Folder: DBS Media Portfolio/Demo Websites/auto-repair
- Stack: Next.js 16.3.6, React 19.2.8, Tailwind v4, GSAP 3 (ScrollTrigger, SplitText), Lenis
- Palette: #0E0F11 asphalt, #1B1D20 graphite, #8A8781 concrete, #EFECE6 chalk, #FF5B1F signal (+ #A8340A signal ink); heat-tint micro-accent #D9B25F → #B46A3C → #6B4C8A → #2F5D9B
- Fonts: Archivo (variable, width axis 62–125), Hanken Grotesk, JetBrains Mono
- Pages: 26 routes. Home, Services + 8 service pages, What's that noise? (symptom finder), Book, Contact, Fleet, About, Inside the shop (gallery), Reviews, Specials, FAQ, Areas + 4 area pages (Lakewood, Lake Highlands, Garland, Mesquite), Privacy, 404. Plus sitemap.xml, robots.txt, manifest, /api/og.
- Signature features:
  - Lift-bay hero: graded cinematic film loop; on desktop, scrolling "takes a photo": the frame shrinks into a viewfinder, a shutter flash fires and a "photo sent" text appears.
  - "Photos before any work": a customer text thread (photo, estimate, approve) that plays out as you scroll.
  - X-ray car diagram: blueprint line-work that draws itself and separates into an exploded view; 8 systems with hover/tap highlight, "watch for" symptoms, from-price and links.
  - "What's that noise?" scan-tool console: live waveform per symptom, typed diagnosis, likely-cause bars, typical price/time, one-tap "Book this diagnosis" (pre-fills booking).
  - Work-order booking: 5 steps (vehicle → services → drop-off → date/time → details), torque-gauge progress, live ticket, "Booked" stamp.
  - Also: odometer counters, variable-width stretching headlines, garage-door page transitions, cursor-follow service rows, pinned "day in the bays" film strip, before/after rotor slider, live "Open now" badge, East Dallas area map.
- Lighthouse (mobile, home): P 79 / A 100 / BP 100 / SEO 69*
  - Mobile inner: /services/brakes 84, /book 88 (A/BP 100). Desktop: 99 / 100 / 100 / 69*.
  - *SEO is 69 only because the demo is intentionally noindexed (robots meta + robots.txt). With `NEXT_PUBLIC_NOINDEX=false` the only failing audit goes away.
  - Real paint on a warm cache is ~0.3 s; the mobile score is held back by simulated latency and hydration of the animation layer.

## Notes
- Fictional business: 6120 Anvil Row, Dallas, TX 75218 (invented street), phone (214) 555-0147, hello@torqueandtemper.com. Name checked against Dallas businesses.
- Forms validate and show success states but send nothing.
- "Concept site by DBS Media ↗" pill (dismissible) + footer credit.
- Texas inspection copy reflects the 2025 change (no safety inspection for most passenger cars; Dallas County emissions test still required). The $18.50 emissions fee should be double-checked before reuse for a real client.
- Photos: Unsplash; video/frames: Pexels (cottonbro studio). Full list in `public/images/SOURCES.md`.
- Vercel project `torque-temper-demo` (team Dimitrije's projects). `vercel.json` pins the Next.js framework preset.

## Portfolio copy
EN title: Torque & Temper Auto Works
EN one-liner (≤ 120 chars): An East Dallas auto shop site that texts you photos before any work, with a symptom finder and 60-second booking.
EN summary (2–3 sentences): A concept site for an honest, family-owned auto repair shop in East Dallas. A cinematic workshop hero, an X-ray car diagram and a "What's that noise?" symptom finder turn a stressed driver's warning light into a booked appointment. Upfront prices, local area pages and full AutoRepair SEO make it the obvious choice in the city.
SR title: Torque & Temper Auto Works
SR one-liner: Sajt auto servisa iz Dalasa: fotografije kvara pre svakog posla, pretraga simptoma i zakazivanje za 60 sekundi.
SR summary: Koncept sajt za porodični auto servis u istočnom Dalasu. Filmski hero iz radionice, „rendgenski" prikaz automobila i alat „Šta je to lupanje?" pretvaraju upaljenu lampicu na tabli u zakazan termin. Jasne cene, stranice za kvartove i kompletan lokalni SEO čine ga očiglednim izborom u gradu.

## Screenshots
handoff/desktop-home.png, handoff/desktop-feature.png, handoff/mobile-home.png, handoff/scroll.mp4

# Capability catalog: what to use when a site needs more than a brochure

Sites vary: a gym landing page needs nothing here, a shop needs half of it. Use this table to pick a tool by need instead of improvising per site. Stack stays Next.js + Tailwind on Vercel (`05-technical-standards.md`); every row must work with it.

## How to use

1. Start at the top of the ladder: does the need disappear with a link-out (`tel:`, `wa.me`, a booking page, a hosted form)? Then use the link-out. Ponytail: no backend you do not need.
2. Need a real feature: take the **Default** below. Deviate only with a one-line reason in the project `CLAUDE.md`.
3. Need not listed: research (official docs, pricing page, EU/GDPR position, Romanian availability), propose 1-2 options with cost and trade-offs, wait for approval, then add a row here marked **[unverified]** and update it after the first real use.
4. Never put secrets in the repo: `.env.local` and Vercel environment variables only; commit `.env.example`.
5. Anything that costs money, stores visitor data or needs a client account is the client's decision. Say what it costs and who owns the account.

Status tags: **[verified]** = used or checked in a project; **[unverified]** = general knowledge, confirm docs, pricing and Romanian availability before proposing. Everything below is **[unverified]** unless marked, because no project beyond Raf Gym has exercised it yet.

## Catalog

| Need | Default | Alternatives | Notes |
|---|---|---|---|
| Contact / quote form | Next.js Server Action or Route Handler + e-mail API + Turnstile spam check | Hosted form (Formspree, Web3Forms) when no code is wanted | Real endpoint only (`05`: no fake forms). Privacy notice + consent checkbox text from the client's lawyer (`10`) |
| Transactional e-mail | Resend | Brevo, Postmark | Verify the client's domain (SPF, DKIM) or mail lands in spam |
| Content the client edits often | Git-based CMS (Keystatic) | Sanity, Payload (self-hosted inside Next), Decap | Default for small sites: no CMS, edit `content/site.ts` (`08`). Add a CMS only if the client will edit weekly without a developer |
| Blog / news | MDX files in the repo | Same CMS as above | Sitemap, RSS, per-post metadata; Romanian slugs without diacritics |
| Booking / appointments | Link out to a hosted scheduler (Cal.com, Calendly) | Embed after consent; custom booking only if the client pays for it | Clinics and salons: confirmation by phone is often what they already do |
| Table reservation | `tel:` + WhatsApp prefilled message | Hosted reservation widget the venue already uses | Embeds load third-party resources: see `10` section 3 |
| Showcase shop (no checkout) | Product grid from config + "Comandă pe WhatsApp" | | Cheapest honest version of a shop; `niches/retail-boutique.md` |
| Small shop with card payments | Stripe Checkout / Payment Links | Netopia or euplatesc via their own docs | Provider choice in `10` section 5; legal pages in `10` section 4 |
| Larger catalog / inventory | Shopify (storefront or buy buttons) | Medusa, Saleor, WooCommerce if the client already runs WordPress | Big decision: owner cost, themes vs headless. Propose, do not default |
| Invoicing automation | Client's SmartBill or Oblio account via API | FGO | Only with the client's own tokens; `10` section 5 |
| Shipping / AWB | Client's own courier account, manual at first | FAN Courier API, Sameday, aggregators | `10` section 5 |
| Newsletter | Brevo | MailerLite, Mailchimp | Double opt-in, unsubscribe link, privacy text |
| Analytics | None by default | Plausible or Umami (no cookies), Vercel Web Analytics, GA4 (needs consent banner) | Say what it measures and who reads it before adding |
| Cookie consent | None needed if no non-essential cookies | `vanilla-cookieconsent`, Klaro | Equal-prominence "Refuz" (`10` section 3). Do not use a paid consent SaaS unless the client already has one |
| Site search | Pagefind (static index) | Algolia | Only for sites with many pages |
| Maps | Static map image + "Deschide în Google Maps" link | OpenStreetMap/Leaflet; Google embed behind click-to-load | Default avoids tracking and layout shift |
| Multilingual | `next-intl` | Route groups per locale | Romanian default; only add English if the client has English-speaking customers (`hreflang`) |
| Accounts / member area | Auth.js | Clerk | Large scope: treat as a separate quote |
| Database | Postgres via Vercel marketplace (Neon/Supabase) | Cloudflare D1 | Only when data cannot live in files |
| Client image uploads | Vercel Blob or Cloudflare R2 | Cloudinary | Resize and compress server-side |
| Reviews | Quoted verbatim from the Google export, client-approved (`06`) | Google Places API live | Live API has cost and terms; do not show a rating computed from a partial export |
| Chat widget | WhatsApp link | | Avoid widgets: weight, tracking, layout shift |
| Uptime / monitoring | Vercel deployment status + UptimeRobot free tier | | Note it in the handover |
| Domain (.ro) | Registered by the client at an accredited registrar | | The client owns the domain and DNS login |
| Hosting | Vercel (current default, `07`) | Cloudflare Pages/Workers | Check Vercel's terms for commercial client sites; the free Hobby plan is meant for non-commercial use, so client sites probably belong on a paid team. **[unverified, read the current terms]** Raf Gym uses team `renovox` (`RESOURCES.md`) |

## Adding a row (template)

`| Need | Default | Alternatives | Notes (cost, GDPR/EU position, Romanian availability, source, date checked) |`

After the first real project that uses a row: change its status to **[verified]**, record what went wrong, and add the lesson to a case-study file.

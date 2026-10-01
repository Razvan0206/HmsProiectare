# Romania: language, legal basics, local services

Most clients are Romanian. Read this before any copy, footer, form, shop or payment work. Guidance, not legal advice: the client confirms legal wording with their accountant or lawyer.

Evidence tags: **[verified]** = checked against a source this session (date and source named); **[unverified]** = general knowledge, check before relying on it. Facts below were gathered on 2026-10-01; laws and provider prices change, re-check anything a client will rely on.

## 1. Language and formats

- `<html lang="ro">`; add `hreflang` only when an English version exists.
- Diacritics: comma-below `ș` (U+0219) and `ț` (U+021B), not cedilla `ş` `ţ`. Load the font's `latin-ext` subset and render a test line with `ă â î ș ț` before approving a font pairing.
- Formats **[verified in Node 24]**: `new Intl.NumberFormat("ro-RO", { style: "currency", currency: "RON" })` gives `1.234,50 RON`; `new Intl.DateTimeFormat("ro-RO", { dateStyle: "short", timeZone: "Europe/Bucharest" })` gives `01.10.2026`. Use `Intl`, do not hand-format. Show "lei" in prose if the client prefers it.
- Phone: `+40 7xx xxx xxx` for display, `tel:+407xxxxxxxx` for the link, `wa.me/407xxxxxxxx` for WhatsApp (no leading 0, no plus).
- Tone: ask the client, formal ("dumneavoastră") or informal ("tu"). Gyms, cafés, creatives often use "tu"; clinics, law, accounting, B2B use formal. Never mix on one site.
- Copy rules stay in `06-content-media-ethics.md`.

## 2. Mandatory business identification (any commercial site)

Law 365/2002 art. 5 (e-commerce) **[verified, legislatie.just.ro / legeaz.net via search, 2026-10-01]**: the provider must make these permanently and easily accessible (a footer block satisfies it):

- name or business name; registered address;
- phone and e-mail (a way to contact directly and effectively);
- trade register number and tax code (CUI);
- authorization authority, if the activity needs an authorization;
- professional title, state where granted and professional body, for regulated professions;
- prices, stating VAT included or not; whether delivery cost is included.

Ask for these in the intake (`00-START-HERE.md`). Missing = visible placeholder, not invented.

## 3. Cookies and GDPR

- Law 506/2004 (ePrivacy) requires prior consent before storing or reading non-essential data on the visitor's device **[verified]**. Essential-only sites (no analytics, no tracking embeds) need no banner but still need a privacy/cookie notice if they collect any data.
- Draft Legislative Proposal 256/2026 would require "accept all" and "refuse all" at the first layer with equal prominence, ban pre-ticked boxes and misleading wording, require withdrawal as easy as consent, and apply 120 days after entry into force. Status on the source date: under parliamentary review, **not adopted** **[verified, Mondaq, 2026-10-01]**. Build to it anyway: it is the GDPR standard and costs nothing extra.
- Fines for cookie violations are reported at RON 5,000 to 100,000 and enforcement has increased in 2025-2026 **[secondary sources, unverified]**.
- Default stack choice: no analytics or third-party embeds unless the client needs them. If yes: privacy-friendly analytics (see `11-capability-catalog.md`), consent before anything non-essential loads, and a "change my choice" link in the footer.
- Google Maps iframes, YouTube embeds, social widgets load third-party resources: use a click-to-load placeholder or a static map image with a link, and mention them in the privacy notice.
- Pages to ship when relevant: Politica de confidențialitate (always when a form, analytics or embed exists), Politica de cookie-uri, Termeni și condiții (shops, bookings, paid services). The client's lawyer or a reputable generator supplies the legal text; you build the pages and keep them linked in the footer.
- Data controller contact (name, e-mail) must appear in the privacy notice: ask the client.

## 4. Online shops and distance sales

Applies only when the site sells to consumers.

- **Right of withdrawal**: 14 days from receiving the goods, no reason needed (OUG 34/2014, transposing Directive 2011/83/EU). If the merchant did not inform the consumer about the right, the period extends to 12 months. The consumer pays return shipping only if properly informed **[verified via search summaries, 2026-10-01]**. Put withdrawal conditions and a model withdrawal form on the site.
- **Pre-contract information** (identity, total price with taxes and delivery, payment and delivery terms, withdrawal right, complaint handling) must be shown before the order. The final order button must state a payment obligation, in Romanian: "Comandă cu obligație de plată" **[unverified wording and article, confirm in OUG 34/2014]**.
- **SAL badge (alternative dispute resolution)**: mandatory in the footer of online shops. ANPC Order 449/2022, as modified: SAL icon 250 x 50 px, linked to the SAL platform, downloadable free from anpc.ro **[verified, financialintelligence.ro article dated 2026-04-17]**.
- **SOL (EU ODR platform) was shut down on 20 July 2025** under Regulation (EU) 2024/3228. Do not add the SOL badge or link to the old platform; remove it from older sites **[verified, same source]**. Many Romanian templates and plugins still ship it.
- Prices in RON with VAT stated; delivery cost shown before checkout; returns page; contact page with the section 2 data.
- Invoicing and e-Factura obligations belong to the client's accountant and invoicing software, not to the website. Ask who issues invoices before designing checkout.

## 5. Local services (check current terms on the provider's site before quoting a client)

Figures marked "April 2026" come from a provider comparison published by a Romanian agency (pronetdesign.ro, data April 2026) and are **secondary sources**; confirm on the provider's own pricing page.

### Payments

| Provider | Facts | Notes |
|---|---|---|
| Stripe | Generally available in Romania. 1.5% + RON 1.00 for EEA cards, 2.5% + RON 1.00 non-EEA; no monthly fee; about 7 days to first payout, then daily; no BNPL or instalments in Romania (April 2026) | Best developer experience and Next.js integration (Checkout, webhooks). Good default for simple shops and paid bookings |
| Netopia Payments | Local processor; fee quoted per merchant; next-working-day settlement with their business card; Visa, Mastercard, Apple Pay, Google Pay, BNPL, instalments, SMS (April 2026) | Needs a merchant contract; plan weeks, not days. Choose when the client wants instalments or a Romanian bank-style contract |
| euplatesc | From 1.2% per transaction; Banca Transilvania's payment arm; instalments with BT, Apple Pay, Google Pay (April 2026) | Fits clients who bank with BT |
| PayU Romania | Fees on request, by volume and risk (April 2026) | Quote-based |

Rule: a payment integration is a client-contract decision. Present Stripe vs a local processor with the facts above, let the client choose, and never put real keys in the repo (`.env.local`, Vercel env vars only).

### Invoicing software with an API

- **SmartBill**: API with account e-mail plus API token generated in the control panel.
- **Oblio**: API with account e-mail plus client secret.
- **FGO**: third common option.
Integrate only when the client needs automatic invoices on orders, and only through the client's own account tokens **[verified at overview level; read each provider's API docs before building]**.

### Couriers

- **FAN Courier**: public API documentation (PDF v2.0, September 2025) covering authentication, AWB generation, courier orders and reports.
- **Sameday**: shipping plugin exists for WooCommerce; developer contact via the provider's software team.
- **Cargus**: API available **[unverified, confirm with the provider]**.
- Aggregators that create AWBs for several couriers (Fluxsales, CurieRO, Base.com) exist; for a Next.js shop, start by linking checkout to the client's own courier account and add automation only if order volume justifies it.

## 6. Checklist: Romanian site before launch

- [ ] `lang="ro"`, diacritics render in every font weight used.
- [ ] Footer has the section 2 identification block, privacy and cookie links.
- [ ] No non-essential script or embed loads before consent (or none is used).
- [ ] Shop only: withdrawal info and form, "Comandă cu obligație de plată" button, SAL badge, no SOL badge, prices with VAT in RON.
- [ ] Phone, WhatsApp and e-mail links tested on a phone.
- [ ] Client approved legal text (accountant or lawyer), in writing.
- [ ] Re-check section 3 and 4 sources if more than six months have passed since 2026-10-01.

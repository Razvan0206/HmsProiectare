# Delivery: demo, client message, launch

## Message first, call second

A business owner is often busy; a cold call lands badly and leaves nothing written. Send a WhatsApp message with the link and a short screen recording, then call after they have seen it. If you already know the owner personally, call directly; call also if there is no answer to the message in 2-3 days (say you already sent something).

## Before sending

- Open the production URL from a phone on mobile data, logged out of Vercel. A 404, a 302 to a login or a blocked deploy means do not send yet.
- First visit (intro plays) and second visit (no intro) both look right.
- Film 20-30 s of the phone screen: hero, one scroll, pricing, map. Animations are the best argument; screenshots do not carry them.
- Placeholders and temporary photos are fine in a demo, but must be visibly marked ("Poză temporară") so the client sees what still comes from them.
- Site is `noindex`; do not post the link publicly.

## WhatsApp message (adapt; Romanian)

```text
Bună ziua, sunt <Nume>. Am făcut un demo de site pentru <afacere>, pornit de la programul și abonamentele/meniul/serviciile voastre.
E un prim draft: pozele sunt temporare, iar textele le completăm împreună.
Linkul: <link>. Vi-l las și într-un video scurt, dacă se vede mai ușor pe telefon.
Dacă vă place direcția, ne vedem 10 minute să vedem ce ați schimba. Ce zi vă convine?
```

Rules: who you are in one sentence; why you write (you built something for them); link + video; one easy question at the end; no price in the first message.

## Call outline (5-10 minutes)

1. Ask what they noticed first. 2. Walk the three things that matter for their goal (call, book, find us). 3. List what you need from them (photos, phone, texts, authorizations). 4. Agree next step and date. Write the feedback into the project CLAUDE.md.

## Launch checklist

- [ ] Remove `robots: { index: false }`; add `app/sitemap.ts`, `app/robots.ts`; canonical uses the final domain.
- [ ] Grep finds no `Aici vor veni`, `TODO client`, placeholder names.
- [ ] Real photos replace all temporary ones; delete `content/placeholder-photos.ts` and unused `remotePatterns`.
- [ ] Phone, WhatsApp, e-mail, hours, prices confirmed by the client in writing.
- [ ] Reviews: client approved names, or section disabled.
- [ ] Video compressed (< 2 MB) with poster.
- [ ] Privacy/cookies page if any form, analytics or tracking embed exists; footer has the company identification block; run the checklist in `10-romania-legal-local.md` section 6.
- [ ] Shop only: withdrawal info and form, order button "Comandă cu obligație de plată", SAL badge present, no SOL badge.
- [ ] Domain connected; HTTPS works; www/non-www redirect decided.
- [ ] Open Graph image shows the real logo and photo; test a link preview.
- [ ] Re-run `site-audit`: budgets met, anchors fine at 390 and 1280 px.
- [ ] Google Business Profile links to the site; NAP (name, address, phone) matches everywhere.
- [ ] Lessons written back into this hub.

## Handover and maintenance

Give the client: how to change text/prices/hours (`content/site.ts` or a simple instruction sheet), who to call, how photos are replaced, what costs money (domain, hosting tier), and what is NOT included. Keep a changelog in the project CLAUDE.md. Review the site quarterly: hours, prices, photos, reviews.

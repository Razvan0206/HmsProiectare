# Niche guidelines

One file per business niche. A niche file tells a fresh Claude instance: who visits, the one conversion goal, section order, what to collect from the client, visual direction (derived, never fixed), copy, SEO schema, compliance, anti-patterns and a definition of done.

| File | Niche | Maturity |
|---|---|---|
| `gym-fitness.md` | Gyms, studios, boxing/MMA, CrossFit | **Used** (Raf Gym) |
| `restaurant-cafe.md` | Restaurants, cafés, bars, bakeries | Draft |
| `beauty-salon-barber.md` | Hair, barber, nails, beauty, spa | Draft |
| `dental-medical-clinic.md` | Dental and medical clinics, therapists | Draft |
| `auto-service-detailing.md` | Car repair, tires, detailing, car wash | Draft |
| `real-estate-agency.md` | Agencies and independent agents | Draft |
| `trades-local-services.md` | Plumbers, electricians, HVAC, builders, cleaners | Draft |
| `legal-accounting-consulting.md` | Lawyers, accountants, consultants | Draft |
| `hotel-guesthouse.md` | Guesthouses, B&Bs, small hotels, apartments | Draft |
| `retail-boutique.md` | Shops, boutiques, small catalogs | Draft |
| `education-courses.md` | Schools, language/dance/music courses, training | Draft |
| `photography-creative.md` | Photographers, videographers, studios, designers | Draft |

## Rules

- Draft = written from general web-design practice and Raf Gym lessons; **unverified** until a real client project confirms it. After each project: update the file, change its status, add what was measured.
- Never fix a palette in a niche file. Describe color behavior; derive the colors from the client's materials.
- If the niche is missing: copy `_TEMPLATE.md`, fill it from this project, mark unverified claims, then add a row here.
- Regulated niches (medical, legal, financial): guidance only; tell the client to check wording with a professional.
- Legal and local-service facts shared by all niches live in `../10-romania-legal-local.md`; do not copy them into niche files, link to them and keep only niche-specific rules (allergens, medical advertising, listing data, etc.).
- Tools a niche needs (booking, shop, CMS) are chosen from `../11-capability-catalog.md`; list the chosen default in the niche file's tools section.
- Add references only after you opened them; list what to take and what not to take.

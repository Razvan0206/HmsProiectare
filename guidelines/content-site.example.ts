// Neutral template of the config-first content file (content/site.ts) used in Raf Gym.
// Copy to content/site.ts, replace every value, delete sections the niche does not need.
// Rules: components hold no client text; `null` = not provided yet (UI shows a placeholder);
// `enabled: false` hides a section; a photo `src` starting with "http" is temporary and gets a watermark.
import { ph } from "./placeholder-photos"; // delete this import and file at launch

export type PhotoData = { src: string; alt: string; temp?: boolean };
export type Hours = { label: string; days: number[]; open: number; close: number }; // days: 0 = Sunday ... 6 = Saturday

const venue = "<building or landmark>";
const street = "<street and number>";
const zip = "<postal code>";
const city = "<city>";
const address = `${venue}, ${street}, ${zip} ${city}`;
const mapsQuery = encodeURIComponent(`<Business name> ${address}`);

export const site = {
  name: "<Business name>",
  logo: { src: "/logo.png", width: 0, height: 0 }, // real pixel size of the extracted logo
  tagline: "<short tagline from the client's own materials>",
  venue, street, zip, city, address,
  phone: null as string | null,     // display format, e.g. "+40 7xx xxx xxx"
  whatsapp: null as string | null,  // digits only with country code
  email: null as string | null,
  mapsHref: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  mapsEmbed: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
  socials: [{ label: "Instagram", href: "<url>" }, { label: "Facebook", href: "<url>" }],
  nav: [{ label: "Servicii", href: "#servicii" }, { label: "Program", href: "#program" }],
  hours: [{ label: "Luni - Vineri", days: [1, 2, 3, 4, 5], open: 9, close: 18 }] as Hours[],

  hero: {
    background: { src: "/hero.jpg", alt: "<what the photo shows>" } as PhotoData,
    video: null as string | null, // "/reel.mp4" (<= 2 MB, 540p, no audio) + poster
    videoPoster: "/poster.jpg",
    videoFallback: { src: "/hero.jpg", alt: "<alt>" } as PhotoData,
    titleTop: "<headline line 1>",
    titleAccent: "<headline line 2>",
    subtitle: "<one sentence, about 20 words or fewer>",
  },

  marquee: ["<service>", "<service>"], // one marquee per page, max
  about: { title: "Despre <Business>", text: ["Aici vor veni informații despre povestea afacerii."], photo: ph.about as PhotoData },
  services: { title: "<section title>", items: [{ title: "<service>", text: "<one or two sentences>", photo: ph.svc_a as PhotoData }] },
  schedule: { enabled: false, title: "Orar", items: [] as { day: number; time: string; name: string; trainer?: string }[], placeholder: "Aici va veni orarul." },
  gallery: { title: "Galerie", note: "Aici vor veni fotografiile clientului.", photos: [] as PhotoData[] },
  pricing: {
    title: "Prețuri",
    footnote: "<conditions exactly as the client states>",
    groups: [{ title: "<group>", plans: [{ name: "<plan>", price: 0, note: "<condition>" }] }],
  },
  trainers: { enabled: false, title: "Echipa", items: [] as { name: string; role: string; bio: string; photo: PhotoData }[] },
  // Real Google reviews only, quoted verbatim, with the client's approval for names.
  reviews: {
    enabled: false,
    title: "Ce spun clienții",
    sourceLabel: "Recenzie Google",
    allHref: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
    allLabel: "Vezi toate recenziile pe Google",
    items: [] as { name: string; meta: string; date: string; text: string }[], // date: YYYY-MM-DD
  },
  location: { title: "Când și unde" },
  contact: { title: "<closing headline>" },
};

export const allPlans = site.pricing.groups.flatMap((g) => g.plans);

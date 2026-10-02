// ALL client content lives here. Components hold no client text.
// `null` = not provided yet (UI shows a visible placeholder). Facts come from hms-proiectare.ro,
// the client's Facebook "About" text and the user's message (2026-10-01). Open items: grep "Aici vor veni".
import images from "./project-images.json";

export type Photo = { src: string; w: number; h: number };
export type CategoryId = "locuinte" | "interioare" | "comercial" | "public";
export type Media = "foto" | "randare" | "mixt";
export type Project = {
  slug: string;
  title: string;
  category: CategoryId;
  location: string;
  media: Media; // what the images are: photos of the built work, 3D renders, or both
  images: Photo[]; // first = cover
  inProgress?: boolean; // old site marks it "in desfasurare"
};

const digits = "40747328650";
const street = "Strada Mihai Eminescu nr. 1";
const zip = "310086";
const city = "Arad";

export const site = {
  name: "HMS Proiectare",
  legalName: "HMS Proiectare SRL",
  tagline: "Arhitectură, design, inginerie, consultanță și construcții",
  street,
  zip,
  city,
  address: `${street}, ${zip} ${city}`,
  phone: "0747 328 650", // non-breaking spaces so the number never wraps
  phoneHref: `tel:+${digits}`,
  whatsappHref: `https://wa.me/${digits}`, // TODO client: confirm this number is on WhatsApp
  email: "office@hms-proiectare.ro",
  facebook: "https://www.facebook.com/HMSarchitecture/",
  mapsHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`HMS Proiectare ${street}, ${city}`)}`,
  hours: null as string | null, // TODO client
  hoursPlaceholder: "Aici va veni programul de lucru.",
  legal: null as string | null, // TODO client: CUI, Reg. Com.
  legalPlaceholder: "Aici vor veni CUI și numărul din Registrul Comerțului.",

  nav: [
    { label: "Servicii", href: "/#servicii" },
    { label: "Proces", href: "/#proces" },
    { label: "Proiecte", href: "/#proiecte" },
    { label: "Despre", href: "/#despre" },
    { label: "Contact", href: "/#contact" },
  ],

  hero: {
    titleLines: ["Proiectăm și construim,", "de la concept la finalizare"],
    subtitle: "Arhitecți, ingineri și constructori lucrează împreună la case, clădiri de birouri, hale și amenajări interioare, la Arad și în țară.",
    cta: "Sună la 0747 328 650",
    ctaSecondary: "Vezi proiectele",
    image: { src: "/hero.webp", w: 1920, h: 1080 } as Photo,
    imageAlt: "Casa H din Arad: fațadă cu ferestre arcuite și acoperiș din țiglă, grădină cu flori",
    caption: "Casa H · Arad · fotografie",
  },

  // Real numbers from the old site's portfolio (scraped 2026-10-01) and the client's own text (ISO).
  stats: [
    { value: 288, label: "proiecte în portofoliu" },
    { value: 120, label: "marcate finalizate" },
    { value: 2, label: "certificări ISO: 9001 și 14001" },
  ],

  services: {
    title: "Ce facem",
    intro: "Aceeași echipă preia lucrarea de la prima schiță până la urmărirea șantierului.",
    items: [
      {
        title: "Concept de arhitectură și design interior",
        text: "Imagini 3D, plan de situație, planurile tuturor nivelurilor, fațade, secțiuni și detalii de execuție. Pentru interioare: releveul spațiilor, propuneri de mobilare, simulări 3D fotorealiste, alegerea finisajelor, a mobilierului și a corpurilor de iluminat.",
        tags: ["Randări 3D", "Planuri", "Fațade", "Interioare"],
      },
      {
        title: "Documentații tehnice",
        text: "Documentația pentru autorizare, pentru organizarea execuției și proiectul tehnic, plus studii de fezabilitate, releveu și planuri urbanistice zonale.",
        tags: ["DTAC", "DTOE", "PT", "SF", "RLV", "PUZ"],
      },
      {
        title: "Management de proiect și urmărire șantier",
        text: "Proiectul se împarte pe faze, iar fazele se supraveghează după cerințele și bugetul beneficiarului. Pe șantier, execuția se verifică față de proiectul tehnic.",
        tags: ["Faze", "Buget", "Supraveghere"],
      },
      {
        title: "Consultanță",
        text: "Consultanță în arhitectură, design și construcții, la achiziția de terenuri și imobile și în arhitectură sustenabilă, cu strategii pentru dezvoltare durabilă.",
        tags: ["Terenuri", "Imobile", "Sustenabilitate"],
      },
      {
        title: "Construcții, renovări și extinderi",
        text: "Execuția lucrărilor pentru clădiri civile și private: case, clădiri rezidențiale, comerciale și industriale.",
        tags: ["Construcții noi", "Renovări", "Extinderi"],
      },
    ],
  },

  process: {
    title: "De la schiță la șantier",
    // Order and wording come from the old site's "Expertiză" page and the Facebook text; client to confirm.
    steps: [
      { title: "Concept", text: "Imagini 3D, plan de situație, planuri, fațade. La interioare: propuneri de mobilare și alegerea finisajelor." },
      { title: "Documentații", text: "DTAC pentru autorizare, DTOE pentru organizarea execuției, proiect tehnic și, la nevoie, studiu de fezabilitate." },
      { title: "Execuție", text: "Construcția, renovarea sau extinderea clădirii, realizată de echipa de constructori." },
      { title: "Urmărire șantier", text: "Execuția se verifică față de proiectul tehnic: fundații, stâlpi, centuri, grinzi, planșee." },
    ],
    note: "Management de proiect pe tot parcursul: proiectul se împarte pe faze, iar fazele se supraveghează după cerințele și bugetul beneficiarului.",
  },

  projects: {
    title: "Proiecte",
    intro: "O selecție din cele 288 de proiecte din portofoliul HMS. Fiecare cartonaș arată dacă imaginile sunt fotografii sau randări.",
    mediaLabels: { foto: "Fotografii", randare: "Randări 3D", mixt: "Randări și foto" } as Record<Media, string>,
    open: "Vezi proiectul",
    gallery: { open: "Mărește imaginea", close: "Închide", prev: "Imaginea anterioară", next: "Imaginea următoare" },
    prev: "Proiectul anterior",
    next: "Următorul proiect",
    all: "Toate",
    allProjects: "Toate proiectele",
    categories: [
      { id: "locuinte", label: "Locuințe" },
      { id: "interioare", label: "Design interior" },
      { id: "comercial", label: "Comercial și industrial" },
      { id: "public", label: "Public" },
    ] as { id: CategoryId; label: string }[],
    detailPlaceholder: "Aici vor veni detalii despre proiect: suprafață, anul execuției, etapele lucrării.",
  },

  about: {
    title: "Despre HMS Proiectare",
    text: [
      "HMS Proiectare SRL este o companie de proiectare și construcții din România, activă în sectorul civil și privat. Oferă servicii complete, de la case și clădiri rezidențiale până la clădiri comerciale și industriale.",
      "Echipa reunește arhitecți, ingineri și constructori care lucrează împreună și adaptează fiecare proiect nevoilor beneficiarului, de la concept până la finalizare.",
    ],
    credentialsTitle: "Certificări și asigurare",
    credentials: [
      { label: "ISO 9001", text: "Management al calității" },
      { label: "ISO 14001", text: "Management de mediu" },
      { label: "Aliantz", text: "Asigurare" }, // TODO client: confirm insurer name spelling (Allianz?)
    ],
    credentialsNote: "Aici vor veni copiile certificatelor și ale poliței de asigurare.",
    teamNote: "Aici vor veni numele și rolurile membrilor echipei.",
  },

  contact: {
    title: "Spuneți-ne ce doriți să construiți",
    text: "Un telefon sau un e-mail ajunge pentru prima discuție. Ne ajută să știm tipul clădirii, locul și termenul dorit.",
    phoneLabel: "Telefon",
    emailLabel: "E-mail",
    addressLabel: "Birou",
    hoursLabel: "Program",
    socialLabel: "Online",
    mapsLabel: "Deschide în Google Maps",
    whatsappLabel: "Scrie pe WhatsApp",
    facebookLabel: "Facebook",
  },
};

const p = (slug: string, title: string, category: CategoryId, location: string, media: Media): Project => ({
  slug, title, category, location, media, images: (images as Record<string, Photo[]>)[slug],
});

export const projects: Project[] = [
  { ...p("casa-h", "Casa H", "locuinte", "Arad", "foto"), inProgress: true },
  p("hai-extrusion", "Fabrică de extrudare a profilelor din aluminiu, HAI Extrusion", "comercial", "Arad", "randare"),
  p("casa-giarmata", "Casa Giarmata", "locuinte", "Giarmata, Timiș", "foto"),
  p("penthouse-bourgeois", "Amenajare penthouse, Bourgeois Residence", "interioare", "Arad", "randare"),
  p("casa-g", "Casa G", "locuinte", "Arad", "randare"),
  p("birouri-oradea", "Clădire de birouri", "comercial", "Oradea", "randare"),
  p("scena-covasant", "Scenă pentru evenimente culturale", "public", "Covăsânț, județul Arad", "foto"),
  p("picasso-lounge", "Recosmetizare Caffe Lounge Picasso", "interioare", "Arad", "mixt"),
  p("casa-p", "Casa P", "locuinte", "Arad", "randare"),
  p("bloc-penthouse", "Bloc de locuințe cu penthouse", "locuinte", "Timișoara", "foto"),
  p("hala-dumbravita", "Hală industrială cu birouri, showroom și depozitare", "comercial", "Dumbrăvița, Timiș", "foto"),
  p("waterhouse", "Amenajare clădire de birouri, Waterhouse", "interioare", "Arad", "foto"),
  p("duplex-p-1e", "Duplex P+1E", "locuinte", "Vladimirescu, Arad", "randare"),
  p("piata-agroalimentara", "Piață agroalimentară, Design & Build", "public", "județul Arad", "randare"),
  p("bloc-anl", "Bloc de locuințe ANL", "locuinte", "Arad", "randare"),
];

export const categoryLabel = (id: CategoryId) => site.projects.categories.find((c) => c.id === id)!.label;

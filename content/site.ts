// ALL client content lives here. Components hold no client text.
// `null` = not provided yet (UI shows a visible placeholder). Facts come from hms-proiectare.ro,
// the client's Facebook "About" text and the user's message (2026-10-01). Open items: grep "Aici vor veni".
import images from "./project-images.json";

export type Photo = { src: string; w: number; h: number };
export type CategoryId = "locuinte" | "interioare" | "comercial" | "public";
export type Project = {
  slug: string;
  title: string;
  category: CategoryId;
  location: string;
  kind: string; // what the images are: render or photo
  images: Photo[]; // first = cover
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
  phone: "0747 328 650",
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
    { label: "Proiecte", href: "/#proiecte" },
    { label: "Despre", href: "/#despre" },
    { label: "Contact", href: "/#contact" },
  ],

  hero: {
    title: "Arhitectură, proiectare și construcții, de la concept la finalizare",
    subtitle: "Arhitecți, ingineri și constructori lucrează împreună la case, clădiri de birouri, hale și amenajări interioare, la Arad și în țară.",
    cta: "Sună la 0747 328 650",
    ctaSecondary: "Vezi proiectele",
    image: { src: "/hero.webp", w: 1024, h: 576 } as Photo,
    imageAlt: "Casa G, randare 3D: terasa din lemn și foișorul în amurg",
    caption: "Casa G · Arad · randare 3D",
    status: "Certificată ISO 9001 și ISO 14001",
  },

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

  projects: {
    title: "Proiecte",
    intro: "O selecție din cele 288 de proiecte din portofoliul HMS, dintre care 120 sunt marcate finalizate pe site-ul actual.",
    all: "Toate",
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

const p = (slug: string, title: string, category: CategoryId, location: string, kind: string): Project => ({
  slug, title, category, location, kind, images: (images as Record<string, Photo[]>)[slug],
});

export const projects: Project[] = [
  p("casa-g", "Casa G", "locuinte", "Arad", "randări 3D"),
  p("hai-extrusion", "Fabrică de extrudare a profilelor din aluminiu, HAI Extrusion", "comercial", "Arad", "randări 3D"),
  p("penthouse-bourgeois", "Amenajare penthouse, Bourgeois Residence", "interioare", "Arad", "randări 3D"),
  p("casa-p", "Casa P", "locuinte", "Arad", "randări 3D"),
  p("birouri-oradea", "Clădire de birouri", "comercial", "Oradea", "randări 3D"),
  p("picasso-lounge", "Recosmetizare Caffe Lounge Picasso", "interioare", "Arad", "randări 3D și fotografii"),
  p("bloc-penthouse", "Bloc de locuințe cu penthouse", "locuinte", "Timișoara", "fotografii"),
  p("hala-dumbravita", "Hală industrială cu birouri, showroom și depozitare", "comercial", "Dumbrăvița, Timiș", "fotografii de șantier"),
  p("duplex-p-1e", "Duplex P+1E", "locuinte", "Vladimirescu, Arad", "randări 3D"),
  p("waterhouse", "Amenajare clădire de birouri, Waterhouse", "interioare", "Arad", "fotografii"),
  p("piata-agroalimentara", "Piață agroalimentară, Design & Build", "public", "județul Arad", "randări 3D"),
  p("bloc-anl", "Bloc de locuințe ANL", "locuinte", "Arad", "modele 3D"),
];

export const categoryLabel = (id: CategoryId) => site.projects.categories.find((c) => c.id === id)!.label;

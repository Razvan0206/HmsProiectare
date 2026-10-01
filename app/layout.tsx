import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/content/site";
import { ActionBar } from "@/components/ActionBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin", "latin-ext"], variable: "--font-archivo", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-plex-mono", display: "swap" });

const title = `${site.name} | Arhitectură, design și construcții în Arad`;
const description =
  "HMS Proiectare: arhitectură, proiectare, consultanță și construcții pentru case, clădiri comerciale și industriale. Birou în Arad.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  title: { default: title, template: `%s | ${site.name}` },
  description,
  robots: { index: false, follow: false }, // demo: remove at launch (see guidelines/08)
  openGraph: { title, description, locale: "ro_RO", type: "website", siteName: site.name },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = { themeColor: "#0f0f0e" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  description,
  telephone: "+40747328650",
  email: site.email,
  address: { "@type": "PostalAddress", streetAddress: site.street, postalCode: site.zip, addressLocality: site.city, addressCountry: "RO" },
  sameAs: [site.facebook],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ro" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>
        <a href="#main" className="tone-brand sr-only z-50 px-4 py-3 font-semibold focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Sari la conținut
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ActionBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}

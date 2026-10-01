import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categoryLabel, projects, site } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/proiecte/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: `${p.title}, ${p.location}: ${categoryLabel(p.category).toLowerCase()}, proiect HMS Proiectare.`,
    openGraph: { images: [p.images[0].src] },
  };
}

export default async function ProjectPage(props: PageProps<"/proiecte/[slug]">) {
  const { slug } = await props.params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const prev = projects[(i + projects.length - 1) % projects.length];
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      <section className="px-5 pb-10 pt-10 md:px-8 md:pt-14">
        <div className="mx-auto max-w-7xl">
          <Link href="/#proiecte" className="link label inline-block py-2">
            ← Toate proiectele
          </Link>
          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="rule" aria-hidden />
              <h1 className="display mt-6 text-[clamp(2rem,4.6vw,3.75rem)]">{p.title}</h1>
            </div>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 lg:col-span-4">
              <dt className="label text-muted">Tip</dt>
              <dd>{categoryLabel(p.category)}</dd>
              <dt className="label text-muted">Locație</dt>
              <dd>{p.location}</dd>
              <dt className="label text-muted">Imagini</dt>
              <dd>{p.kind}</dd>
              <dt className="label text-muted">Stare</dt>
              <dd>Finalizat</dd>
            </dl>
          </div>
          <p className="mt-8 max-w-[58ch] text-muted">
            <span className="rule mb-3" aria-hidden />
            {site.projects.detailPlaceholder}
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8 md:pb-28" aria-label="Galerie">
        <ul className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2">
          {p.images.map((im, n) => (
            <li key={im.src} className={`reveal bg-ink ${n === 0 ? "md:col-span-2" : ""}`}>
              <Image
                src={im.src}
                width={im.w}
                height={im.h}
                alt={`${p.title}, ${p.location}: ${p.kind}, imaginea ${n + 1} din ${p.images.length}`}
                sizes={n === 0 ? "(min-width: 1280px) 1200px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                priority={n === 0}
                className="h-auto w-full"
              />
            </li>
          ))}
        </ul>
      </section>

      <nav aria-label="Proiecte" className="tone-paper-2 px-5 py-10 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2">
          <Link href={`/proiecte/${prev.slug}`} className="group block">
            <span className="label text-muted">← Proiectul anterior</span>
            <span className="display mt-1 block text-lg">{prev.title}</span>
          </Link>
          <Link href={`/proiecte/${next.slug}`} className="group block sm:text-right">
            <span className="label text-muted">Următorul proiect →</span>
            <span className="display mt-1 block text-lg">{next.title}</span>
          </Link>
        </div>
      </nav>

      <section className="tone-brand px-5 py-14 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="display text-2xl md:text-3xl">Aveți un proiect asemănător?</p>
          <div className="flex flex-wrap gap-3">
            <a href={site.phoneHref} className="btn btn-ink">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="btn btn-line">
              {site.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

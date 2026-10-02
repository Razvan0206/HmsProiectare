import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
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
  const pr = site.projects;

  return (
    <>
      <section className="px-5 pb-10 pt-10 md:px-8 md:pt-14">
        <div className="mx-auto max-w-7xl">
          <Link href="/#proiecte" className="link label inline-block py-2" transitionTypes={["nav-back"]}>
            ← {pr.allProjects}
          </Link>
          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="rule" aria-hidden />
              <h1 className="display mt-6 text-[clamp(2rem,4.6vw,3.75rem)]">
                <span className="line">
                  <span style={{ "--i": 0 } as CSSProperties}>{p.title}</span>
                </span>
              </h1>
            </div>
            <dl className="hero-in grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 lg:col-span-4" style={{ "--d": "300ms" } as CSSProperties}>
              <dt className="label text-muted">Tip</dt>
              <dd>{categoryLabel(p.category)}</dd>
              <dt className="label text-muted">Locație</dt>
              <dd>{p.location}</dd>
              <dt className="label text-muted">Imagini</dt>
              <dd>{pr.mediaLabels[p.media]}</dd>
              <dt className="label text-muted">Stare</dt>
              <dd>{p.inProgress ? "În desfășurare" : "Finalizat"}</dd>
            </dl>
          </div>
          <p className="mt-8 max-w-[58ch] text-muted">
            <span className="rule mb-3" aria-hidden />
            {pr.detailPlaceholder}
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8 md:pb-28" aria-label="Galerie">
        <Gallery slug={p.slug} label={`${p.title}, ${p.location}`} images={p.images} texts={pr.gallery} />
      </section>

      <nav aria-label="Proiecte" className="tone-ink px-5 py-12 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2">
          <Link href={`/proiecte/${prev.slug}`} className="group block" transitionTypes={["nav-back"]}>
            <span className="proj-bar mb-4" aria-hidden />
            <span className="label text-muted-on-ink">← {pr.prev}</span>
            <span className="display mt-2 block text-xl md:text-2xl">{prev.title}</span>
          </Link>
          <Link href={`/proiecte/${next.slug}`} className="group block sm:text-right" transitionTypes={["nav-forward"]}>
            <span className="proj-bar mb-4 sm:ml-auto" aria-hidden />
            <span className="label text-muted-on-ink">{pr.next} →</span>
            <span className="display mt-2 block text-xl md:text-2xl">{next.title}</span>
          </Link>
        </div>
      </nav>

      <section className="tone-brand px-5 py-14 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="display text-2xl md:text-3xl">Aveți un proiect asemănător?</p>
          <a href={site.phoneHref} className="btn btn-ink">
            {site.phone}
          </a>
        </div>
      </section>
    </>
  );
}

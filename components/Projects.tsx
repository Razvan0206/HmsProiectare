import Image from "next/image";
import Link from "next/link";
import { categoryLabel, projects, site } from "@/content/site";

// Asymmetric 12-col rhythm on large screens; repeats every 5 cards.
const span = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];
const ratio = ["aspect-[4/3] lg:aspect-auto lg:h-[26rem]", "aspect-[4/3] lg:aspect-auto lg:h-[26rem]", "aspect-[4/3]", "aspect-[4/3]", "aspect-[4/3]"];

export function Projects() {
  const p = site.projects;
  return (
    <section id="proiecte" className="tone-paper-2 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <span className="rule" aria-hidden />
            <h2 className="display mt-6 text-[clamp(1.875rem,3.6vw,3rem)]">{p.title}</h2>
          </div>
          <p className="max-w-[48ch] text-muted lg:col-span-6">{p.intro}</p>
        </div>

        <fieldset className="filters relative mt-10 flex flex-wrap gap-2 border-0 p-0">
          <legend className="sr-only">Filtrează proiectele după tip</legend>
          <label>
            <input type="radio" name="f" id="f-toate" defaultChecked />
            {p.all}
          </label>
          {p.categories.map((c) => (
            <label key={c.id}>
              <input type="radio" name="f" id={`f-${c.id}`} />
              {c.label}
            </label>
          ))}
        </fieldset>

        <ul className="proj-grid mt-8 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-12">
          {projects.map((pr, i) => (
            <li key={pr.slug} data-cat={pr.category} className={`proj reveal ${span[i % 5]}`}>
              <Link href={`/proiecte/${pr.slug}`} className="group block">
                <div className={`proj-media overflow-hidden bg-ink ${ratio[i % 5]}`}>
                  <Image
                    src={pr.images[0].src}
                    width={pr.images[0].w}
                    height={pr.images[0].h}
                    alt={`${pr.title}, ${pr.location}: ${pr.kind}`}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="size-full object-cover"
                  />
                </div>
                <span className="proj-bar mt-4" aria-hidden />
                <h3 className="display mt-3 text-lg md:text-xl">
                  {pr.title}
                </h3>
                <p className="label mt-2 text-muted">
                  {categoryLabel(pr.category)} · {pr.location}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

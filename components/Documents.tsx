import { site } from "@/content/site";

// Static glossary of the documents the firm prepares (moved here from the removed marquee).
export function Documents() {
  const d = site.documents;
  return (
    <section id="documentatii" className="tone-brand px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <span className="rule bg-ink" aria-hidden />
        <h2 className="display mt-6 text-[clamp(1.875rem,3.6vw,3rem)]">{d.title}</h2>
        <p className="mt-4 max-w-[48ch]">{d.intro}</p>
        <dl className="mt-12 grid grid-cols-2 gap-[2px] border-2 border-ink bg-ink md:grid-cols-3 lg:grid-cols-6">
          {d.items.map((it) => (
            <div key={it.abbr} className="doc reveal flex flex-col-reverse justify-end gap-3 p-5 md:p-6">
              <dt className="max-w-[22ch] text-sm leading-snug md:text-base">{it.name}</dt>
              <dd className="display text-[clamp(2rem,4vw,3.25rem)]">{it.abbr}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

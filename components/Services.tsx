import { site } from "@/content/site";

export function Services() {
  const s = site.services;
  return (
    <section id="servicii" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <span className="rule" aria-hidden />
            <h2 className="display mt-6 text-[clamp(1.875rem,3.6vw,3rem)]">{s.title}</h2>
            <p className="mt-5 max-w-[34ch] text-muted">{s.intro}</p>
          </div>
        </div>
        <ol className="lg:col-span-8">
          {s.items.map((it) => (
            <li key={it.title} className="reveal grid gap-4 border-t-2 border-ink py-8 md:grid-cols-[1fr_1.4fr] md:gap-10">
              <h3 className="display text-xl md:text-2xl">
                {it.title}
              </h3>
              <div>
                <p className="max-w-[60ch]">{it.text}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Livrabile">
                  {it.tags.map((t) => (
                    <li key={t} className="label bg-paper-2 px-2.5 py-1.5">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

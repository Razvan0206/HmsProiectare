import { site } from "@/content/site";

export function About() {
  const a = site.about;
  return (
    <section id="despre" className="tone-ink px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <span className="rule" aria-hidden />
          <h2 className="display mt-6 text-[clamp(1.875rem,3.6vw,3rem)]">{a.title}</h2>
          <div className="mt-6 grid max-w-[58ch] gap-4 text-lg text-muted-on-ink">
            {a.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          <p className="mt-8 max-w-[58ch] text-muted-on-ink">
            <span className="rule mb-3" aria-hidden />
            {a.teamNote}
          </p>
        </div>
        <div className="lg:col-span-6">
          <h3 className="label text-muted-on-ink">{a.credentialsTitle}</h3>
          <ul className="mt-4 grid border-t-2 border-white/20">
            {a.credentials.map((c) => (
              <li key={c.label} className="flex items-baseline justify-between gap-6 border-b-2 border-white/20 py-5">
                <span className="display text-3xl md:text-4xl">
                  {c.label}
                </span>
                <span className="label text-right text-muted-on-ink">{c.text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-on-ink">{a.credentialsNote}</p>
        </div>
      </div>
    </section>
  );
}

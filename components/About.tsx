import { site } from "@/content/site";

export function About() {
  const a = site.about;
  return (
    <section id="despre" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <span className="rule" aria-hidden />
          <h2 className="display mt-6 text-[clamp(1.875rem,3.6vw,3rem)]">{a.title}</h2>
          <div className="mt-6 grid max-w-[58ch] gap-4 text-lg">
            {a.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          <p className="mt-8 max-w-[58ch] text-muted">
            <span className="rule mb-3" aria-hidden />
            {a.teamNote}
          </p>
        </div>
        <div className="lg:col-span-6">
          <h3 className="label text-muted">{a.credentialsTitle}</h3>
          <ul className="mt-4 grid">
            {a.credentials.map((c) => (
              <li key={c.label} className="row reveal flex items-baseline justify-between gap-6 py-6">
                <span className="display text-3xl md:text-5xl">{c.label}</span>
                <span className="label text-right text-muted">{c.text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">{a.credentialsNote}</p>
        </div>
      </div>
    </section>
  );
}

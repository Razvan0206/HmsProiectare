import Image from "next/image";
import { site } from "@/content/site";

export function Hero() {
  const h = site.hero;
  return (
    <section className="tone-ink relative isolate overflow-hidden">
      <div className="hero-media absolute inset-0 -z-20" aria-hidden={false}>
        <div className="hero-par absolute inset-x-0 -top-[10%] -bottom-[10%]">
          <Image src={h.image.src} alt={h.imageAlt} fill priority quality={72} sizes="100vw" className="hero-img object-cover object-[36%_50%] md:object-[62%_50%]" />
        </div>
      </div>
      <div className="hero-shade absolute inset-0 -z-10" aria-hidden />
      <div className="relative mx-auto flex min-h-[min(46rem,calc(100svh-4.5rem))] max-w-7xl flex-col px-5 pb-8 pt-16 md:px-8 md:pt-20">
        <div className="my-auto max-w-4xl py-10">
          <span className="rule hero-in" aria-hidden />
          <h1 className="display mt-6 text-[clamp(2.25rem,5vw,4.5rem)]">
            {h.titleLines.map((l, i) => (
              <span key={l} className="line">
                <span style={{ "--i": i } as React.CSSProperties}>{l}</span>
              </span>
            ))}
          </h1>
          <p className="hero-in mt-6 max-w-[40ch] text-lg text-paper/85" style={{ "--d": "700ms" } as React.CSSProperties}>
            {h.subtitle}
          </p>
          <div className="hero-in mt-8 flex flex-wrap gap-3" style={{ "--d": "820ms" } as React.CSSProperties}>
            <a href={site.phoneHref} className="btn btn-brand">
              {h.cta}
            </a>
            <a href="#proiecte" className="btn btn-line">
              {h.ctaSecondary}
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4 text-paper/80">
          <span className="dim" aria-hidden />
          <span className="label hero-in" style={{ "--d": "1400ms" } as React.CSSProperties}>
            {h.caption}
          </span>
        </div>
      </div>
    </section>
  );
}

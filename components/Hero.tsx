import Image from "next/image";
import { site } from "@/content/site";

export function Hero() {
  const h = site.hero;
  return (
    <section className="tone-ink relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-12 md:px-8 lg:min-h-[min(46rem,calc(100dvh-4.5rem))] lg:grid-cols-12 lg:gap-12 lg:py-16">
        <div className="hero-in lg:col-span-5">
          <span className="rule" aria-hidden />
          <h1 className="display mt-6 text-[clamp(2.25rem,4.6vw,3.875rem)]">{h.title}</h1>
          <p className="mt-6 max-w-[34ch] text-lg text-muted-on-ink">{h.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.phoneHref} className="btn btn-brand">
              {h.cta}
            </a>
            <a href="#proiecte" className="btn btn-line">
              {h.ctaSecondary}
            </a>
          </div>
          <p className="label mt-8 text-muted-on-ink">{h.status}</p>
        </div>
        <figure className="hero-in lg:col-span-7" style={{ animationDelay: "0.12s" }}>
          <Image
            src={h.image.src}
            width={h.image.w}
            height={h.image.h}
            alt={h.imageAlt}
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="aspect-[16/10] w-full object-cover"
          />
          <figcaption className="label mt-3 flex items-center gap-3 text-muted-on-ink">
            <span className="h-px flex-1 bg-white/25" aria-hidden />
            {h.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

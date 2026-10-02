import { site } from "@/content/site";
import { Counter } from "./Counter";

export function Stats() {
  return (
    <section aria-label="Portofoliu în cifre" className="tone-ink border-t border-white/10 px-5 py-12 md:px-8 md:py-16">
      <dl className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-white/15">
        {site.stats.map((s) => (
          <div key={s.label} className="reveal flex flex-col-reverse justify-end px-3 first:pl-0 md:px-8 md:first:pl-0">
            <dt className="mt-2 max-w-[22ch] text-sm text-muted-on-ink md:text-base">{s.label}</dt>
            <dd className="display text-[clamp(2.25rem,7vw,5.5rem)] text-brand">
              <Counter to={s.value} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

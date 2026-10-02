import type { CSSProperties } from "react";
import { site } from "@/content/site";

// Four steps on a line that draws itself while the section scrolls into view (CSS scroll timeline).
export function Process() {
  const p = site.process;
  return (
    <section id="proces" className="tone-ink px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <span className="rule" aria-hidden />
        <h2 className="display mt-6 text-[clamp(1.875rem,3.6vw,3rem)]">{p.title}</h2>
        <div className="tl mt-14">
          <span className="tl-line" aria-hidden />
          <span className="tl-fill" aria-hidden />
          <ol className="relative grid gap-12 md:grid-cols-4 md:gap-8">
            {p.steps.map((st, i) => (
              <li key={st.title} className="grid grid-cols-[1.5rem_1fr] gap-x-5 md:block">
                <span className="node" style={{ "--i": i } as CSSProperties} aria-hidden />
                <div className="md:mt-8">
                  <h3 className="display text-2xl">{st.title}</h3>
                  <p className="mt-3 max-w-[34ch] text-muted-on-ink">{st.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-14 max-w-[60ch] text-paper/85">{p.note}</p>
      </div>
    </section>
  );
}

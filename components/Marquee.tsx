import { site } from "@/content/site";

// The page's only marquee. No-JS pause: a checkbox styled as a button (see .mq in globals.css).
export function Marquee() {
  const m = site.marquee;
  const set = (hidden: boolean) => (
    <ul className="mq-set" aria-hidden={hidden || undefined}>
      {m.items.map((w) => (
        <li key={w} className="flex items-center gap-10">
          <span className="mq-word display">{w}</span>
          <span className="mq-sep" aria-hidden />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label={m.label} className="mq tone-brand py-6 md:py-8">
      <input id="mq-pause" type="checkbox" className="sr-only" />
      <label htmlFor="mq-pause" className="mq-toggle">
        <span className="sr-only">{m.pause}</span>
        <svg className="ico-pause" width="16" height="16" viewBox="0 0 16 16" aria-hidden fill="currentColor">
          <rect x="2" y="1" width="4" height="14" />
          <rect x="10" y="1" width="4" height="14" />
        </svg>
        <svg className="ico-play" width="16" height="16" viewBox="0 0 16 16" aria-hidden fill="currentColor">
          <path d="M3 1v14l11-7z" />
        </svg>
      </label>
      <div className="mq-track">
        {set(false)}
        {set(true)}
      </div>
    </section>
  );
}

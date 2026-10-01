import { site } from "@/content/site";

// Mobile-only sticky contact bar: the primary action stays one tap away.
export function ActionBar() {
  return (
    <div
      className="tone-brand fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-ink/20 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a href={site.phoneHref} className="flex min-h-14 items-center justify-center font-semibold">
        Sună
      </a>
      <a href={`mailto:${site.email}`} className="flex min-h-14 items-center justify-center border-l border-ink/20 font-semibold">
        E-mail
      </a>
    </div>
  );
}

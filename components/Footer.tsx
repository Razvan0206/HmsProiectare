import { site } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="tone-paper-2 overflow-hidden px-5 pb-28 pt-16 md:px-8 md:pb-12">
      <div className="mx-auto max-w-7xl">
        <Logo className="logo-view h-auto w-full max-w-xs md:max-w-xl" />
        <p translate="no" className="mt-5 max-w-xs text-sm font-light uppercase tracking-[0.28em] text-ink md:max-w-xl md:text-xl">
          {site.wordmark}
        </p>
        <div className="mt-10 flex flex-col gap-4 border-t border-ink/20 pt-6 text-sm text-muted md:flex-row md:items-end md:justify-between">
          <p>
            <strong translate="no" className="block text-ink">{site.legalName}</strong>
            {site.address}
            <br />
            {site.legal ?? site.legalPlaceholder}
          </p>
          <p>
            © {new Date().getFullYear()} {site.legalName}. Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
}

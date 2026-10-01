import { site } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="tone-ink px-5 pb-28 pt-12 md:px-8 md:pb-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="flex items-start gap-4">
          <Logo className="h-10" bars="#3a3a37" />
          <p className="text-sm text-muted-on-ink">
            <strong className="block text-paper">{site.legalName}</strong>
            {site.address}
            <br />
            {site.legal ?? site.legalPlaceholder}
          </p>
        </div>
        <p className="text-sm text-muted-on-ink">
          © {new Date().getFullYear()} {site.legalName}. Toate drepturile rezervate.
        </p>
      </div>
    </footer>
  );
}

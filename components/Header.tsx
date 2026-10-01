import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="tone-ink sticky top-0 z-40 border-b border-white/10">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <Link href="/" className="flex min-h-11 items-center gap-3" aria-label={`${site.name}, prima pagină`}>
          <Logo className="h-9" bars="#3a3a37" />
          <span className="display hidden text-lg sm:block">
            HMS <span className="font-normal text-muted-on-ink">Proiectare</span>
          </span>
        </Link>
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8 font-medium">
            {site.nav.map((i) => (
              <li key={i.href}>
                <a href={i.href} className="link py-2">
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href={site.phoneHref} className="btn btn-brand hidden lg:inline-flex">
            {site.phone}
          </a>
          <MobileMenu items={site.nav} />
        </div>
      </div>
    </header>
  );
}

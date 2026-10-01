"use client";

import { useRef } from "react";

export function MobileMenu({ items }: { items: { label: string; href: string }[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        aria-label="Deschide meniul"
        className="flex size-12 flex-col items-center justify-center gap-[0.3125rem]"
      >
        <span className="h-[3px] w-6 bg-current" />
        <span className="h-[3px] w-6 bg-current" />
        <span className="ml-3 h-[3px] w-4 self-start bg-brand" />
      </button>
      <dialog
        ref={ref}
        aria-label="Meniu"
        onClick={(e) => e.target === ref.current && ref.current?.close()}
        className="tone-ink fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overscroll-contain p-6 backdrop:bg-black/60"
      >
        <form method="dialog" className="flex justify-end">
          <button aria-label="Închide meniul" className="flex size-12 items-center justify-center text-3xl leading-none">
            ×
          </button>
        </form>
        <nav aria-label="Meniu mobil">
          <ul className="mt-6 grid gap-2">
            {items.map((i) => (
              <li key={i.href}>
                <a
                  href={i.href}
                  onClick={() => ref.current?.close()}
                  className="display block border-t-2 border-white/15 py-4 text-3xl"
                >
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </dialog>
    </div>
  );
}

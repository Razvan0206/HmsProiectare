"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ViewTransition } from "react";
import type { Photo } from "@/content/site";

type Props = { slug: string; label: string; images: Photo[]; texts: { open: string; close: string; prev: string; next: string } };

// Gallery grid + native <dialog> lightbox. Keyboard (arrows, Escape) and swipe work; image swaps are instant on purpose.
export function Gallery({ slug, label, images, texts }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(0);
  const touchX = useRef<number | null>(null);
  const go = (d: number) => setI((x) => (x + d + images.length) % images.length);
  const alt = (n: number) => `${label}, imaginea ${n + 1} din ${images.length}`;

  return (
    <>
      <ul className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2">
        {images.map((im, n) => {
          const img = (
            <Image
              src={im.src}
              width={im.w}
              height={im.h}
              alt={alt(n)}
              sizes={n === 0 ? "(min-width: 1280px) 1200px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
              priority={n === 0}
              className="h-auto w-full"
            />
          );
          return (
            <li key={im.src} className={`wipe bg-ink ${n === 0 ? "md:col-span-2" : ""}`}>
              <button
                type="button"
                className="shot"
                aria-label={`${texts.open}: ${alt(n)}`}
                onClick={() => {
                  setI(n);
                  dialog.current?.showModal();
                }}
              >
                {n === 0 ? (
                  <ViewTransition name={`proj-${slug}`} share="proj-morph" default="none">
                    {img}
                  </ViewTransition>
                ) : (
                  img
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialog}
        aria-label={label}
        className="lightbox"
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        onPointerDown={(e) => (touchX.current = e.clientX)}
        onPointerUp={(e) => {
          if (touchX.current === null) return;
          const dx = e.clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
        }}
      >
        <div className="flex h-full flex-col" style={{ touchAction: "pan-y" }}>
          <div className="flex items-center justify-between px-4 py-3 md:px-8">
            <p className="label text-muted-on-ink" aria-live="polite">
              {i + 1} / {images.length}
            </p>
            <form method="dialog">
              <button className="btn btn-line">
                {texts.close}
              </button>
            </form>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 md:px-20">
            <Image
              key={i}
              src={images[i].src}
              width={images[i].w}
              height={images[i].h}
              alt={alt(i)}
              sizes="100vw"
              className="w-full object-contain"
              style={{ height: "calc(100dvh - 9rem)" }}
            />
            <button type="button" onClick={() => go(-1)} aria-label={texts.prev} className="btn btn-brand absolute left-2 top-1/2 -translate-y-1/2 px-3 md:left-6">
              ←
            </button>
            <button type="button" onClick={() => go(1)} aria-label={texts.next} className="btn btn-brand absolute right-2 top-1/2 -translate-y-1/2 px-3 md:right-6">
              →
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

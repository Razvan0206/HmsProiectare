import type { CSSProperties } from "react";

// HM bar logo rebuilt as vector, geometry measured on the 2344x1153 logo the client supplied (assets/logo-facebook.jpg): 2-unit gaps, 6-unit bars, 72x38 units.
// `animate` lets the bars grow in once (CSS in globals.css); bars are listed left to right so --i is the order.
const orange: [number, number, number, number][] = [[0, 0, 6, 38], [34, 0, 6, 38], [8, 16, 24, 6], [42, 0, 30, 6], [50, 8, 6, 30], [66, 6, 6, 32]];
const dark: [number, number, number, number][] = [[8, 0, 24, 6], [8, 8, 24, 6], [8, 24, 24, 6], [8, 32, 24, 6], [42, 8, 6, 30], [58, 8, 6, 30]];

export function Logo({ className = "h-9 w-auto", bars = "#0f0f0e", animate = false }: { className?: string; bars?: string; animate?: boolean }) {
  const bar = (fill: string, [x, y, w, h]: number[]) => (
    <rect key={`${fill}${x}${y}`} className="lb" style={{ "--i": Math.round(x / 8) } as CSSProperties} x={x} y={y} width={w} height={h} fill={fill} />
  );
  return (
    <svg viewBox="0 0 72 38" className={`${animate ? "logo-anim" : ""} ${className}`} role="img" aria-label="HMS Proiectare" xmlns="http://www.w3.org/2000/svg">
      {orange.map((r) => bar("#fe9703", r))}
      {dark.map((r) => bar(bars, r))}
    </svg>
  );
}

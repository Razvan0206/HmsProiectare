// HM bar logo rebuilt as vector from the 76x40 raster on the old site (orange #fe9703 sampled).
export function Logo({ className = "h-9", bars = "#0f0f0e" }: { className?: string; bars?: string }) {
  return (
    <svg viewBox="0 0 74 38" className={`w-auto ${className}`} role="img" aria-label="HMS Proiectare" xmlns="http://www.w3.org/2000/svg">
      <g fill="#fe9703">
        <rect x="0" y="0" width="6" height="38" />
        <rect x="34" y="0" width="6" height="38" />
        <rect x="8" y="16" width="24" height="6" />
        <rect x="42" y="0" width="32" height="6" />
        <rect x="51" y="6" width="6" height="32" />
        <rect x="68" y="6" width="6" height="32" />
      </g>
      <g fill={bars}>
        <rect x="8" y="0" width="24" height="6" />
        <rect x="8" y="8" width="24" height="6" />
        <rect x="8" y="24" width="24" height="6" />
        <rect x="8" y="32" width="24" height="6" />
        <rect x="42" y="6" width="7" height="32" />
        <rect x="59" y="6" width="7" height="32" />
      </g>
    </svg>
  );
}

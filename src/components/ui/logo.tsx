import * as React from "react";

interface LogoProps {
  className?: string;
  variant?: "default" | "light" | "dark";
  size?: "sm" | "md" | "lg";
}

/**
 * Posh Aluminium logo — exact match to original brand asset.
 * "Posh" in vibrant red (#E31837) script/cursive font.
 * "Aluminium" in dark gray (#333333) clean sans-serif, smaller, underneath.
 * Stacked vertically, no icon.
 */
export function Logo({
  className,
  variant = "default",
  size = "md",
}: LogoProps) {
  const isLight = variant === "light";
  const poshColor = "#E31837";
  const aluminiumColor = isLight ? "rgba(255,255,255,0.8)" : "#333333";

  const dims = {
    sm: { posh: 30, aluminium: 10, gap: 1 },
    md: { posh: 38, aluminium: 12, gap: 2 },
    lg: { posh: 52, aluminium: 15, gap: 3 },
  }[size];

  return (
    <div
      className={`inline-flex flex-col items-center leading-none ${className ?? ""}`}
      style={{ gap: `${dims.gap}px` }}
      role="img"
      aria-label="Posh Aluminium"
    >
      <span
        style={{
          fontFamily: "var(--font-pacifico), 'Brush Script MT', cursive",
          fontSize: `${dims.posh}px`,
          color: poshColor,
          lineHeight: 0.9,
          fontWeight: 400,
        }}
      >
        Posh
      </span>
      <span
        style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: `${dims.aluminium}px`,
          color: aluminiumColor,
          lineHeight: 1,
          fontWeight: 600,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          paddingLeft: "0.3em",
        }}
      >
        Aluminium
      </span>
    </div>
  );
}

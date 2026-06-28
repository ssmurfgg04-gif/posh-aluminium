import * as React from "react";

interface LogoProps {
  className?: string;
  variant?: "default" | "light" | "dark";
  size?: "sm" | "md" | "lg";
}

/**
 * Posh Aluminium — logo matching the original brand asset.
 * "Posh" in scarlet red (#D62828) Pacifico script font.
 * "Aluminium" in black sans-serif, uppercase, tracked.
 * Stacked, centered, no icon.
 */
export function Logo({
  className,
  variant = "default",
  size = "md",
}: LogoProps) {
  const isLight = variant === "light";
  const poshColor = "#D62828";
  const aluminiumColor = isLight
    ? "rgba(255,255,255,0.78)"
    : "#000000";

  const dims = {
    sm: { posh: 32, aluminium: 11, gap: 2 },
    md: { posh: 42, aluminium: 13, gap: 3 },
    lg: { posh: 58, aluminium: 17, gap: 4 },
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
          lineHeight: 0.95,
          fontWeight: 400,
          letterSpacing: "0.5px",
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
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          paddingLeft: "0.32em",
        }}
      >
        Aluminium
      </span>
    </div>
  );
}

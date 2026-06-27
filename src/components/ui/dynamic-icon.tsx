"use client";

import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

const ICON_MAP = Icons as unknown as Record<string, React.ComponentType<LucideProps>>;
const FALLBACK = Icons.Building2;

interface DynamicIconProps extends LucideProps {
  name: string;
}

/**
 * Render a lucide-react icon by name.
 * Defined at module scope so the React Compiler doesn't treat it as
 * a component created during render.
 */
export function DynamicIcon({ name, ...rest }: DynamicIconProps) {
  const Cmp = ICON_MAP[name] ?? FALLBACK;
  return <Cmp {...rest} />;
}

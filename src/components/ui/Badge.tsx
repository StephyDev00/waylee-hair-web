import { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-wine/30 bg-wine/5 px-3 py-1 text-xs tracking-wide uppercase text-wine">
      {children}
    </span>
  );
}

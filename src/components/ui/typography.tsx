import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function H1({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h1 className={cn("text-h1 font-display uppercase tracking-tighter", className)}>
      {children}
    </h1>
  );
}

export function Metadata({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("text-micro font-mono text-silver/60 tracking-widest", className)}>
      {children}
    </div>
  );
}

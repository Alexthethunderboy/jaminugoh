import { cn } from "@/lib/utils";
import React, { ReactNode, ComponentPropsWithoutRef, forwardRef } from "react";

export const H1 = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<"h1">>(
  ({ children, className, ...props }, ref) => {
    return (
      <h1 
        ref={ref}
        className={cn("text-h1 font-display uppercase tracking-tighter", className)}
        {...props}
      >
        {children}
      </h1>
    );
  }
);

H1.displayName = "H1";

export const Metadata = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ children, className, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn("text-micro font-mono text-silver/60 tracking-widest", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Metadata.displayName = "Metadata";

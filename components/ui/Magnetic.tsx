"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import { ReactNode } from "react";

export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useMagnetic();

  return (
    <div ref={ref} className="inline-block">
      {children}
    </div>
  );
}

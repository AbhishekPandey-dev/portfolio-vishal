import { cn } from "@/lib/utils";

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-block font-label uppercase tracking-[0.3em] text-[12px] text-white/40 mb-8", className)}>
      {children}
    </span>
  );
}

import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "font-body text-xs font-semibold uppercase tracking-eyebrow text-white-100/50",
        className
      )}
    >
      {children}
    </p>
  );
}

import { cn } from "@/lib/utils";
import { SectionDivider } from "./SectionDivider";

interface SectionShellProps {
  label?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  divider?: boolean;
  id?: string;
}

export function SectionShell({
  label,
  title,
  description,
  children,
  className,
  divider = true,
  id,
}: SectionShellProps) {
  return (
    <>
      {divider && <SectionDivider />}
      <section id={id} className={cn("relative bg-black-950 py-section-mobile lg:py-section noise-overlay", className)}>
        <div className="mx-auto max-w-container px-6 lg:px-8">
          {(label || title) && (
            <header className="mb-16 lg:mb-20 max-w-3xl">
              {label && (
                <p className="font-body text-xs font-semibold uppercase tracking-eyebrow text-white-300 mb-4">
                  {label}
                </p>
              )}
              {title && (
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-display text-white-100 mb-6 leading-[1.1]">
                  {title}
                </h2>
              )}
              {description && (
                <p className="font-body text-lg text-white-300 leading-relaxed">{description}</p>
              )}
            </header>
          )}
          {children}
        </div>
      </section>
    </>
  );
}

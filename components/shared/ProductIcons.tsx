export function CrmIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="8" width="40" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 16h40" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 26h16M22 30h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AccountingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="8" y="4" width="32" height="40" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 14h16M16 22h16M16 30h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 30l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PosIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="6" y="12" width="36" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="6" width="20" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="28" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 36h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function InventoryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M4 16l20-10 20 10-20 10L4 16z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 24l20 10 20-10M4 32l20 10 20-10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function HrIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 40c0-8 6-12 14-12s14 4 14 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M34 20h8M38 16v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ProjectIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="6" y="10" width="36" height="30" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 18h36M14 26h8M14 32h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 26l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ManufacturingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M8 36V20l8-8h8l8 8v16" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 36h40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="24" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function BiIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="6" y="28" width="8" height="14" stroke="currentColor" strokeWidth="1.5" />
      <rect x="20" y="18" width="8" height="24" stroke="currentColor" strokeWidth="1.5" />
      <rect x="34" y="8" width="8" height="34" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 42h40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function EcommerceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M8 12h6l4 20h16l4-14H14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="20" cy="38" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="34" cy="38" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function PayrollIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="6" y="12" width="36" height="26" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="25" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 25h4M24 23v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 18h36" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function HealthcareIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="6" y="10" width="36" height="32" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 20h36" stroke="currentColor" strokeWidth="1.5" />
      <path d="M24 26v10M19 31h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="15" r="2" fill="currentColor" />
    </svg>
  );
}

const iconMap = {
  crm: CrmIcon,
  accounting: AccountingIcon,
  pos: PosIcon,
  inventory: InventoryIcon,
  payroll: PayrollIcon,
  hr: HrIcon,
  project: ProjectIcon,
  manufacturing: ManufacturingIcon,
  bi: BiIcon,
  ecommerce: EcommerceIcon,
  healthcare: HealthcareIcon,
};

export function ProductIcon({ name, className }: { name: keyof typeof iconMap; className?: string }) {
  const Icon = iconMap[name];
  return <Icon className={className} />;
}

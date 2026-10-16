import { cn } from "@/lib/utils";

/** Marca provisória até recebermos a logo oficial. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
        <path
          d="M12 1.5 13.9 10.1 22.5 12 13.9 13.9 12 22.5 10.1 13.9 1.5 12 10.1 10.1Z"
          fill="currentColor"
        />
        <circle cx="12" cy="12" r="2.2" className="fill-star" />
      </svg>
      <span className="font-display text-[0.95rem] font-semibold tracking-[0.18em] uppercase">
        Antares <span className="text-muted-foreground">Leases</span>
      </span>
    </span>
  );
}

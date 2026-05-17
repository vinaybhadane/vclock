import { cn } from "@/lib/utils";

export function AdSlot({
  label = "Advertisement",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <aside
      aria-label={label}
      className={cn(
        "flex min-h-24 items-center justify-center rounded-lg border border-dashed border-border bg-muted/60 p-4 text-xs uppercase tracking-wide text-muted-foreground",
        className,
      )}
    >
      {label}
    </aside>
  );
}


import { AdsenseUnit } from "@/components/adsense-unit";

export function ToolLayout({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <section className="soft-surface py-10 sm:py-14">
      <div className="page-shell grid gap-8 lg:grid-cols-[1fr_280px]">
        <div>
          <div className="mb-7 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wide text-accent">vClock utility</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal sm:text-5xl">{title}</h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{description}</p>
          </div>
          <AdsenseUnit className="mb-6 min-h-24 sm:min-h-28 lg:hidden" label="Mobile top advertisement" />
          {children}
          <AdsenseUnit className="mt-8 min-h-32 sm:min-h-40" label="In-content advertisement" />
          <AdsenseUnit className="mt-6 min-h-24 sm:min-h-32 lg:hidden" label="Mobile bottom advertisement" />
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-24 grid gap-4">
            <AdsenseUnit className="min-h-72" label="Sidebar advertisement" />
            <AdsenseUnit className="min-h-56" label="Desktop sponsored space" />
          </div>
        </div>
      </div>
    </section>
  );
}

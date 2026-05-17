import { AdSlot } from "@/components/ad-slot";
import { Card, CardContent } from "@/components/ui/card";

export function InfoPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="soft-surface py-12">
      <div className="page-shell grid gap-8 lg:grid-cols-[1fr_280px]">
        <Card>
          <CardContent className="prose prose-slate max-w-none p-6 text-muted-foreground dark:prose-invert sm:p-8">
            <h1 className="mb-5 text-3xl font-semibold text-foreground">{title}</h1>
            <div className="grid gap-4 leading-7">{children}</div>
          </CardContent>
        </Card>
        <AdSlot className="hidden min-h-72 lg:flex" label="Sidebar advertisement" />
      </div>
    </section>
  );
}


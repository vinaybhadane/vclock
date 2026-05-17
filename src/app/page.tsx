import Link from "next/link";
import { AlarmClock, Clock3, Globe2, Timer, TimerReset } from "lucide-react";
import { AdSlot } from "@/components/ad-slot";
import { LiveClock } from "@/components/live-clock";
import { Card, CardContent } from "@/components/ui/card";

const tools = [
  { href: "/clock", title: "Live Clock", desc: "Current local time with date, day, timezone, and 12/24 hour mode.", icon: Clock3 },
  { href: "/world-clock", title: "World Clock", desc: "Compare live times across major countries, cities, and UTC offsets.", icon: Globe2 },
  { href: "/timer", title: "Online Timer", desc: "Fast countdown timer with presets, notifications, sound, and fullscreen mode.", icon: Timer },
  { href: "/stopwatch", title: "Stopwatch", desc: "Precise stopwatch with lap tracking and keyboard controls.", icon: TimerReset },
  { href: "/alarm-clock", title: "Alarm Clock", desc: "Set multiple browser alarms with labels, sounds, snooze, and persistence.", icon: AlarmClock },
];

export default function Home() {
  return (
    <section className="soft-surface py-12 sm:py-16">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-accent">Fast time tools</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal sm:text-6xl">
            Live Clock
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Check the current time now with a fast digital clock, date, day, timezone, and
            fullscreen mode.
          </p>
        </div>
        <div className="mt-8">
          <LiveClock />
        </div>
        <AdSlot className="my-8" label="In-content advertisement" />
        <h2 className="mb-4 text-2xl font-semibold">More time tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link href={tool.href} key={tool.href}>
              <Card className="h-full transition-transform hover:-translate-y-0.5">
                <CardContent className="grid gap-4 p-5">
                  <tool.icon className="text-accent" size={24} />
                  <div>
                    <h2 className="text-xl font-semibold">{tool.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{tool.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

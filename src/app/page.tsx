import Link from "next/link";
import { AlarmClock, Clock3, Globe2, Timer, TimerReset } from "lucide-react";
import { AdsenseUnit } from "@/components/adsense-unit";
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
        <AdsenseUnit className="my-8 min-h-28 sm:min-h-36" label="Homepage top advertisement" />
        <h2 className="mb-4 text-2xl font-semibold">More time tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link href={tool.href} key={tool.href}>
              <Card className="h-full transition-transform hover:-translate-y-0.5">
                <CardContent className="grid gap-4 p-5">
                  <tool.icon className="text-accent" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold">{tool.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{tool.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <section className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-2xl font-semibold">Online clock tools for every routine</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              vClock brings the essentials of timekeeping into one fast web app:
              a live digital clock, world clock comparisons, a countdown timer,
              a precise stopwatch, and browser alarms. It is built for quick
              checks during work, study, travel planning, workouts, cooking, and
              meetings across time zones.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <article>
              <h3 className="font-semibold">Current time at a glance</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                The live clock shows your local time with the date, weekday,
                timezone, and a fullscreen display for desks, classrooms, and
                shared screens.
              </p>
            </article>
            <article>
              <h3 className="font-semibold">Timers and alarms that stay simple</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Start countdowns from common presets, save browser alarms with
                labels, and keep focus on the task instead of configuring a
                heavy scheduling app.
              </p>
            </article>
            <article>
              <h3 className="font-semibold">World clocks for planning</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Compare cities and countries before calls, releases, trips, or
                events so it is clear what time it is for every participant.
              </p>
            </article>
          </div>
        </section>
        <AdsenseUnit className="mt-8 min-h-28 sm:min-h-36" label="Homepage bottom advertisement" />
      </div>
    </section>
  );
}

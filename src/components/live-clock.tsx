"use client";

import { CalendarDays, Globe2 } from "lucide-react";
import { useSyncExternalStore, useState } from "react";
import { FullscreenButton } from "@/components/fullscreen-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNow } from "@/lib/client-state";

export function LiveClock() {
  const nowMs = useNow();
  const [hour12, setHour12] = useState(true);
  const timezone = useSyncExternalStore(
    () => () => undefined,
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    () => "",
  );
  const now = new Date(nowMs);
  const ready = nowMs > 0 && timezone.length > 0;

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12,
  }).format(now);

  return (
    <Card id="live-clock" className="overflow-hidden">
      <CardContent className="grid min-h-[420px] place-items-center p-6 text-center sm:p-10">
        <div className="w-full">
          <div className="mb-6 flex items-center justify-center gap-3">
            <Button
              aria-pressed={hour12}
              onClick={() => setHour12(true)}
              variant={hour12 ? "default" : "outline"}
            >
              12h
            </Button>
            <Button
              aria-pressed={!hour12}
              onClick={() => setHour12(false)}
              variant={!hour12 ? "default" : "outline"}
            >
              24h
            </Button>
            <FullscreenButton targetId="live-clock" />
          </div>
          <div className="clock-digits text-[clamp(3.25rem,14vw,9.5rem)] font-semibold leading-none">
            {ready ? time : "--:--:--"}
          </div>
          <div className="mt-8 grid gap-3 text-muted-foreground sm:grid-cols-3">
            <p className="flex items-center justify-center gap-2">
              <CalendarDays size={18} />
              {ready ? new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now) : "Loading date"}
            </p>
            <p>{ready ? new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(now) : "Loading day"}</p>
            <p className="flex items-center justify-center gap-2">
              <Globe2 size={18} />
              {ready ? timezone : "Detecting timezone"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

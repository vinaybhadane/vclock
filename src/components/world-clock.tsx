"use client";

import { Moon, Plus, Search, Sun, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNow } from "@/lib/client-state";
import { getHourInZone, getOffsetLabel, timezones } from "@/lib/timezones";

const defaults = ["Asia/Kolkata", "America/New_York", "Europe/London", "Asia/Dubai", "Asia/Tokyo"];

export function WorldClock() {
  const nowMs = useNow();
  const now = new Date(nowMs);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(defaults);

  const results = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return timezones.filter((zone) =>
      [zone.city, zone.country, zone.region, zone.timezone].some((value) =>
        value.toLowerCase().includes(normalized),
      ),
    );
  }, [query]);

  return (
    <div className="grid gap-5">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <input
          aria-label="Search city or country"
          className="h-12 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-base"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search cities, countries, or time zones"
          value={query}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {results.slice(0, 8).map((zone) => (
          <Button
            key={`${zone.city}-${zone.timezone}`}
            onClick={() =>
              setSelected((items) =>
                items.includes(zone.timezone) ? items : [...items, zone.timezone],
              )
            }
            size="sm"
            variant="outline"
          >
            <Plus size={15} />
            {zone.city}
          </Button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {selected.map((timezone) => {
          const zone = timezones.find((item) => item.timezone === timezone) ?? timezones[0];
          const hour = getHourInZone(timezone, now);
          const isDay = hour >= 6 && hour < 18;
          return (
            <Card key={timezone}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{zone.city}</h2>
                    <p className="text-sm text-muted-foreground">{zone.country}</p>
                  </div>
                  <Button
                    aria-label={`Remove ${zone.city}`}
                    onClick={() => setSelected((items) => items.filter((item) => item !== timezone))}
                    size="icon"
                    variant="ghost"
                  >
                    <X size={16} />
                  </Button>
                </div>
                <p className="clock-digits mt-7 text-4xl font-semibold">
                  {new Intl.DateTimeFormat("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: timezone,
                  }).format(now)}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
                  <span>{getOffsetLabel(timezone, now)}</span>
                  <span>{timezone}</span>
                  <span className="flex items-center gap-1">
                    {isDay ? <Sun size={16} /> : <Moon size={16} />}
                    {isDay ? "Day" : "Night"}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

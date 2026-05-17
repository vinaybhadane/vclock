"use client";

import { Bell, Music, Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useHydrated } from "@/lib/client-state";

type Alarm = {
  id: string;
  time: string;
  label: string;
  sound: "soft" | "bright";
  enabled: boolean;
};

const storageKey = "vclock-alarms";

function play(sound: Alarm["sound"]) {
  const context = new AudioContext();
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.connect(gain);
  gain.connect(context.destination);
  osc.frequency.value = sound === "soft" ? 523 : 988;
  gain.gain.setValueAtTime(0.001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.2, context.currentTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1.2);
  osc.start();
  osc.stop(context.currentTime + 1.3);
}

export function AlarmClock() {
  const hydrated = useHydrated();
  const [alarms, setAlarms] = useState<Alarm[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(storageKey);
    return stored ? (JSON.parse(stored) as Alarm[]) : [];
  });
  const [time, setTime] = useState("07:00");
  const [label, setLabel] = useState("Wake up");
  const [sound, setSound] = useState<Alarm["sound"]>("soft");
  const [editing, setEditing] = useState<string | null>(null);
  const currentMinute = useMemo(() => new Date().toTimeString().slice(0, 5), []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(alarms));
  }, [alarms]);

  useEffect(() => {
    const fired = new Set<string>();
    const id = window.setInterval(() => {
      const minute = new Date().toTimeString().slice(0, 5);
      alarms.forEach((alarm) => {
        const key = `${alarm.id}-${minute}`;
        if (alarm.enabled && alarm.time === minute && !fired.has(key)) {
          fired.add(key);
          play(alarm.sound);
          if (Notification.permission === "granted") {
            new Notification(alarm.label || "vClock alarm", { body: `Alarm time: ${alarm.time}` });
          }
        }
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [alarms]);

  function saveAlarm() {
    const next: Alarm = {
      id: editing ?? crypto.randomUUID(),
      time,
      label,
      sound,
      enabled: true,
    };
    setAlarms((items) => (editing ? items.map((item) => (item.id === editing ? next : item)) : [...items, next]));
    setEditing(null);
    setLabel("Wake up");
  }

  return (
    <div className="grid gap-5">
      <Card>
        <CardContent className="grid gap-4 p-5 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-end">
          <label className="grid gap-2 text-sm font-medium">
            Time
            <input
              className="h-11 rounded-lg border border-border bg-background px-3"
              onChange={(event) => setTime(event.target.value)}
              type="time"
              value={time}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Label
            <input
              className="h-11 rounded-lg border border-border bg-background px-3"
              onChange={(event) => setLabel(event.target.value)}
              value={label}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Sound
            <select
              className="h-11 rounded-lg border border-border bg-background px-3"
              onChange={(event) => setSound(event.target.value as Alarm["sound"])}
              value={sound}
            >
              <option value="soft">Soft</option>
              <option value="bright">Bright</option>
            </select>
          </label>
          <Button onClick={saveAlarm}>
            <Plus size={18} />
            {editing ? "Update" : "Add"}
          </Button>
        </CardContent>
      </Card>
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => Notification.requestPermission?.()} variant="outline">
          <Bell size={18} />
          Enable notifications
        </Button>
        <Button onClick={() => play(sound)} variant="outline">
          <Music size={18} />
          Test sound
        </Button>
      </div>
      <div className="grid gap-3">
        {hydrated && alarms.length ? (
          alarms.map((alarm) => (
            <Card key={alarm.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
                <div>
                  <p className="clock-digits text-3xl font-semibold">{alarm.time}</p>
                  <p className="text-sm text-muted-foreground">
                    {alarm.label} • {alarm.sound} sound
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() =>
                      setAlarms((items) =>
                        items.map((item) =>
                          item.id === alarm.id ? { ...item, enabled: !item.enabled } : item,
                        ),
                      )
                    }
                    variant={alarm.enabled ? "default" : "outline"}
                  >
                    {alarm.enabled ? "On" : "Off"}
                  </Button>
                  <Button
                    aria-label={`Edit ${alarm.label}`}
                    onClick={() => {
                      setEditing(alarm.id);
                      setTime(alarm.time);
                      setLabel(alarm.label);
                      setSound(alarm.sound);
                    }}
                    size="icon"
                    variant="outline"
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    aria-label={`Delete ${alarm.label}`}
                    onClick={() => setAlarms((items) => items.filter((item) => item.id !== alarm.id))}
                    size="icon"
                    variant="ghost"
                  >
                    <Trash2 size={16} />
                  </Button>
                  <Button
                    onClick={() => {
                      const date = new Date();
                      date.setMinutes(date.getMinutes() + 5);
                      setAlarms((items) =>
                        items.map((item) =>
                          item.id === alarm.id
                            ? { ...item, time: date.toTimeString().slice(0, 5), enabled: true }
                            : item,
                        ),
                      );
                    }}
                    variant="secondary"
                  >
                    Snooze
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-5 text-sm text-muted-foreground">
              {hydrated
                ? `No alarms yet. Add your first browser alarm above. Current local minute: ${currentMinute}.`
                : "Loading saved alarms."}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FullscreenButton } from "@/components/fullscreen-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const presets = [
  ["5 minutes", 300],
  ["10 minutes", 600],
  ["25 minute Pomodoro", 1500],
  ["1 hour study", 3600],
] as const;

function tone() {
  const context = new AudioContext();
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.connect(gain);
  gain.connect(context.destination);
  osc.frequency.value = 880;
  gain.gain.setValueAtTime(0.001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.18, context.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.8);
  osc.start();
  osc.stop(context.currentTime + 0.9);
}

export function OnlineTimer() {
  const [total, setTotal] = useState(300);
  const [remaining, setRemaining] = useState(300);
  const [running, setRunning] = useState(false);
  const endRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    endRef.current = Date.now() + remaining * 1000;
    const id = window.setInterval(() => {
      const next = Math.max(0, Math.ceil((endRef.current - Date.now()) / 1000));
      setRemaining(next);
      if (next === 0) {
        setRunning(false);
        tone();
        if (Notification.permission === "granted") {
          new Notification("vClock timer finished", { body: "Your countdown is complete." });
        }
      }
    }, 250);
    return () => window.clearInterval(id);
  }, [running, remaining]);

  const progress = total ? ((total - remaining) / total) * 100 : 0;
  const display = useMemo(() => {
    const h = Math.floor(remaining / 3600);
    const m = Math.floor((remaining % 3600) / 60);
    const s = remaining % 60;
    return [h, m, s].map((value) => String(value).padStart(2, "0")).join(":");
  }, [remaining]);

  function setPreset(seconds: number) {
    setRunning(false);
    setTotal(seconds);
    setRemaining(seconds);
  }

  return (
    <Card id="timer-panel">
      <CardContent className="grid gap-7 p-5 sm:p-8">
        <div className="flex flex-wrap gap-2">
          {presets.map(([label, seconds]) => (
            <Button key={label} onClick={() => setPreset(seconds)} variant="outline">
              {label}
            </Button>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {["Hours", "Minutes", "Seconds"].map((label, index) => (
            <label className="grid gap-2 text-sm font-medium" key={label}>
              {label}
              <input
                className="h-11 rounded-lg border border-border bg-background px-3"
                min={0}
                onChange={(event) => {
                  const values = [
                    Math.floor(total / 3600),
                    Math.floor((total % 3600) / 60),
                    total % 60,
                  ];
                  values[index] = Number(event.target.value);
                  setPreset(values[0] * 3600 + values[1] * 60 + values[2]);
                }}
                type="number"
                value={
                  index === 0
                    ? Math.floor(total / 3600)
                    : index === 1
                      ? Math.floor((total % 3600) / 60)
                      : total % 60
                }
              />
            </label>
          ))}
        </div>
        <div className="grid place-items-center">
          <div
            aria-label={`${Math.round(progress)} percent complete`}
            className="grid aspect-square w-full max-w-sm place-items-center rounded-full"
            style={{
              background: `conic-gradient(var(--accent) ${progress}%, var(--muted) 0)`,
            }}
          >
            <div className="grid h-[82%] w-[82%] place-items-center rounded-full bg-card">
              <span className="clock-digits text-5xl font-semibold sm:text-6xl">{display}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={() => Notification.requestPermission?.()} variant="outline">
            Enable notifications
          </Button>
          <Button disabled={remaining === 0} onClick={() => setRunning((value) => !value)}>
            {running ? <Pause size={18} /> : <Play size={18} />}
            {running ? "Pause" : "Start"}
          </Button>
          <Button onClick={() => setPreset(total)} variant="secondary">
            <RotateCcw size={18} />
            Reset
          </Button>
          <FullscreenButton targetId="timer-panel" />
        </div>
      </CardContent>
    </Card>
  );
}


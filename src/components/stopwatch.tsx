"use client";

import { Pause, Play, RotateCcw, TimerReset } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FullscreenButton } from "@/components/fullscreen-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function formatMs(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;
}

export function Stopwatch() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const startedAt = useRef(0);
  const base = useRef(0);

  useEffect(() => {
    if (!running) return;
    startedAt.current = performance.now();
    const id = window.setInterval(() => {
      setElapsed(base.current + performance.now() - startedAt.current);
    }, 16);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        toggle();
      }
      if (event.key.toLowerCase() === "l") setLaps((items) => [elapsed, ...items]);
      if (event.key.toLowerCase() === "r") reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function toggle() {
    setRunning((value) => {
      if (value) base.current = elapsed;
      return !value;
    });
  }

  function reset() {
    setRunning(false);
    base.current = 0;
    setElapsed(0);
    setLaps([]);
  }

  const display = useMemo(() => formatMs(elapsed), [elapsed]);

  return (
    <Card id="stopwatch-panel">
      <CardContent className="grid gap-7 p-5 text-center sm:p-8">
        <p className="clock-digits text-[clamp(4rem,18vw,9rem)] font-semibold leading-none">
          {display}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={toggle}>
            {running ? <Pause size={18} /> : <Play size={18} />}
            {running ? "Pause" : "Start"}
          </Button>
          <Button onClick={() => setLaps((items) => [elapsed, ...items])} variant="outline">
            <TimerReset size={18} />
            Lap
          </Button>
          <Button onClick={reset} variant="secondary">
            <RotateCcw size={18} />
            Reset
          </Button>
          <FullscreenButton targetId="stopwatch-panel" />
        </div>
        <p className="text-sm text-muted-foreground">Keyboard: Space start/pause, L lap, R reset.</p>
        {laps.length ? (
          <div className="mx-auto grid w-full max-w-xl gap-2 text-left">
            {laps.map((lap, index) => (
              <div
                className="flex items-center justify-between rounded-lg bg-muted px-4 py-3"
                key={`${lap}-${index}`}
              >
                <span>Lap {laps.length - index}</span>
                <span className="clock-digits font-medium">{formatMs(lap)}</span>
              </div>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}


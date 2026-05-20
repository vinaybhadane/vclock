"use client";

import dynamic from "next/dynamic";

export const DynamicLiveClock = dynamic(
  () => import("./live-clock").then((m) => m.LiveClock),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[420px] rounded-xl border border-border bg-card flex items-center justify-center p-6 text-center sm:p-10">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-48 rounded bg-muted mb-6"></div>
          <div className="h-24 w-80 sm:w-96 rounded bg-muted mb-8"></div>
          <div className="h-6 w-72 sm:w-96 rounded bg-muted"></div>
        </div>
      </div>
    ),
  }
);

export const DynamicOnlineTimer = dynamic(
  () => import("./online-timer").then((m) => m.OnlineTimer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[400px] rounded-xl border border-border bg-card p-5 sm:p-8 animate-pulse">
        <div className="flex gap-2 flex-wrap mb-6">
          <div className="h-10 w-28 bg-muted rounded"></div>
          <div className="h-10 w-28 bg-muted rounded"></div>
          <div className="h-10 w-44 bg-muted rounded"></div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 mb-8">
          <div className="h-20 bg-muted rounded"></div>
          <div className="h-20 bg-muted rounded"></div>
          <div className="h-20 bg-muted rounded"></div>
        </div>
        <div className="flex justify-center mb-8">
          <div className="h-64 w-64 rounded-full border-[10px] border-muted flex items-center justify-center">
            <div className="h-12 w-32 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    ),
  }
);

export const DynamicStopwatch = dynamic(
  () => import("./stopwatch").then((m) => m.Stopwatch),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[300px] rounded-xl border border-border bg-card p-5 sm:p-8 text-center animate-pulse flex flex-col items-center justify-center">
        <div className="h-24 w-80 sm:w-96 rounded bg-muted mb-8"></div>
        <div className="flex gap-3 justify-center mb-6">
          <div className="h-10 w-24 bg-muted rounded"></div>
          <div className="h-10 w-24 bg-muted rounded"></div>
          <div className="h-10 w-24 bg-muted rounded"></div>
        </div>
        <div className="h-4 w-64 bg-muted rounded"></div>
      </div>
    ),
  }
);

export const DynamicWorldClock = dynamic(
  () => import("./world-clock").then((m) => m.WorldClock),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse grid gap-5">
        <div className="h-12 w-full rounded-lg bg-card border border-border"></div>
        <div className="flex gap-2">
          <div className="h-8 w-20 rounded bg-muted"></div>
          <div className="h-8 w-20 rounded bg-muted"></div>
          <div className="h-8 w-20 rounded bg-muted"></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-44 rounded-xl border border-border bg-card p-5">
              <div className="h-6 w-32 rounded bg-muted mb-2"></div>
              <div className="h-4 w-24 rounded bg-muted mb-8"></div>
              <div className="h-10 w-44 rounded bg-muted"></div>
            </div>
          ))}
        </div>
      </div>
    ),
  }
);

export const DynamicAlarmClock = dynamic(
  () => import("./alarm-clock").then((m) => m.AlarmClock),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[350px] animate-pulse grid gap-5">
        <div className="h-28 rounded-xl border border-border bg-card p-5"></div>
        <div className="flex gap-3">
          <div className="h-10 w-48 bg-muted rounded"></div>
          <div className="h-10 w-28 bg-muted rounded"></div>
        </div>
        <div className="h-24 rounded-xl border border-border bg-card p-5"></div>
      </div>
    ),
  }
);

export const DynamicLifeClockTool = dynamic(
  () => import("./life-clock-tool").then((m) => m.LifeClockTool),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[400px] animate-pulse bg-card border border-border rounded-xl p-6 sm:p-10 flex flex-col justify-center gap-5">
        <div className="h-8 w-48 bg-muted rounded"></div>
        <div className="h-4 w-72 bg-muted rounded"></div>
        <div className="h-11 w-full bg-muted rounded mt-4"></div>
      </div>
    ),
  }
);

export const DynamicWishClockTool = dynamic(
  () => import("./wish-clock-tool").then((m) => m.WishClockTool),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[300px] animate-pulse bg-card border border-border rounded-xl p-6 sm:p-10 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="h-7 w-32 bg-muted rounded"></div>
          <div className="h-9 w-24 bg-muted rounded"></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="h-32 bg-muted rounded"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    ),
  }
);

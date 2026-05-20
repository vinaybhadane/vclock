"use client";

import { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, HelpCircle, RefreshCw } from "lucide-react";

interface LifeClockData {
  name: string;
  birthdate: string;
  targetDate: string;
  created: string;
}

const quotes = [
  "You still have countless moments waiting.",
  "Make today meaningful.",
  "Your journey is unique and special.",
  "Cherish the present moment.",
  "Every second is a fresh beginning.",
  "Focus on what truly matters.",
  "Time is a gift. Unbox it wisely.",
  "Live with intention, not just routine.",
];

function getCountdown(targetMs: number) {
  let diff = targetMs - Date.now();
  if (diff < 0) diff = 0;

  const sec = 1000;
  const min = sec * 60;
  const hr = min * 60;
  const day = hr * 24;
  const year = day * 365.25;
  const month = year / 12;

  const years = Math.floor(diff / year);
  diff %= year;

  const months = Math.floor(diff / month);
  diff %= month;

  const days = Math.floor(diff / day);
  diff %= day;

  const hours = Math.floor(diff / hr);
  diff %= hr;

  const minutes = Math.floor(diff / min);
  diff %= min;

  const seconds = Math.floor(diff / sec);

  return { years, months, days, hours, minutes, seconds };
}

function getTimeLived(birthdateStr: string) {
  const birthTime = new Date(birthdateStr).getTime();
  let diff = Date.now() - birthTime;
  if (diff < 0) diff = 0;

  const day = 1000 * 60 * 60 * 24;
  const year = day * 365.25;
  const month = year / 12;

  const years = Math.floor(diff / year);
  diff %= year;

  const months = Math.floor(diff / month);
  diff %= month;

  const days = Math.floor(diff / day);

  return { years, months, days };
}

function CountdownDisplay({ targetDateStr }: { targetDateStr: string }) {
  const targetMs = useMemo(() => new Date(targetDateStr).getTime(), [targetDateStr]);
  const [countdown, setCountdown] = useState(() => getCountdown(targetMs));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(targetMs));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetMs]);

  const units = [
    { label: "Years", val: countdown.years },
    { label: "Months", val: countdown.months },
    { label: "Days", val: countdown.days },
    { label: "Hours", val: countdown.hours },
    { label: "Minutes", val: countdown.minutes },
    { label: "Seconds", val: countdown.seconds },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 text-center">
      {units.map((unit) => (
        <div key={unit.label} className="rounded-lg border border-border bg-card p-3 shadow-sm transition-transform hover:-translate-y-0.5">
          <div className="clock-digits text-2xl font-bold sm:text-4xl text-foreground">
            {String(unit.val).padStart(2, "0")}
          </div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export function LifeClockTool() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<LifeClockData | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [birthdateInput, setBirthdateInput] = useState("");
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("lifeClockData");
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch {
        localStorage.removeItem("lifeClockData");
      }
    }
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setLoading(false);
  }, []);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !birthdateInput) return;

    const birthDate = new Date(birthdateInput);
    const ageMs = Date.now() - birthDate.getTime();
    const ageYears = ageMs / (1000 * 60 * 60 * 24 * 365.25);

    const minRemaining = 0.5; // 6 months
    const maxRemaining = Math.max(5, 80 - ageYears);
    const remainingYears = minRemaining + Math.random() * (maxRemaining - minRemaining);

    const targetTime = Date.now() + remainingYears * 365.25 * 24 * 60 * 60 * 1000;
    const targetDate = new Date(targetTime).toISOString();

    const newData: LifeClockData = {
      name: nameInput.trim(),
      birthdate: birthdateInput,
      targetDate: targetDate,
      created: new Date().toISOString(),
    };

    localStorage.setItem("lifeClockData", JSON.stringify(newData));
    setData(newData);
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const handleReset = () => {
    localStorage.removeItem("lifeClockData");
    setData(null);
    setNameInput("");
    setBirthdateInput("");
    setShowConfirmReset(false);
  };

  const dashboardInfo = useMemo(() => {
    if (!data) return null;
    const birthMs = new Date(data.birthdate).getTime();
    const targetMs = new Date(data.targetDate).getTime();
    const nowMs = Date.now();

    const lived = getTimeLived(data.birthdate);
    const totalMs = targetMs - birthMs;
    const elapsedMs = nowMs - birthMs;
    const progress = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));

    return { lived, progress };
  }, [data]);

  if (loading) {
    return (
      <div className="w-full min-h-[350px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <Card className="max-w-xl mx-auto border border-border bg-card">
        <CardContent className="p-6 sm:p-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">Start My Journey Timer</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Enter your details to create your personalized journey visualization countdown.
            </p>
          </div>
          <form onSubmit={handleStart} className="grid gap-5">
            <div className="grid gap-2">
              <label htmlFor="fullname" className="text-sm font-medium flex items-center gap-1.5">
                <User size={16} className="text-muted-foreground" />
                Full Name
              </label>
              <input
                id="fullname"
                type="text"
                required
                placeholder="Enter your name"
                className="h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="birthdate" className="text-sm font-medium flex items-center gap-1.5">
                <Calendar size={16} className="text-muted-foreground" />
                Birth Date
              </label>
              <input
                id="birthdate"
                type="date"
                required
                className="h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                value={birthdateInput}
                onChange={(e) => setBirthdateInput(e.target.value)}
              />
            </div>
            <div className="rounded-lg bg-muted/60 border border-border p-4 text-xs text-muted-foreground leading-relaxed flex gap-2">
              <HelpCircle size={18} className="shrink-0 text-muted-foreground" />
              <p>
                <strong>Disclaimer:</strong> This feature is created for entertainment and motivation purposes only and does not predict real life events.
              </p>
            </div>
            <Button type="submit" className="h-11 w-full bg-primary text-primary-foreground font-semibold hover:bg-primary/95">
              Start My Journey Timer
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 max-w-3xl mx-auto">
      <Card className="border border-border bg-card overflow-hidden">
        <CardContent className="p-6 sm:p-10 grid gap-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-medium text-accent">Journey Timeline</div>
              <h2 className="text-3xl font-bold text-foreground mt-1">Welcome back, {data.name}</h2>
            </div>
            <Button
              onClick={() => setShowConfirmReset(true)}
              variant="outline"
              size="sm"
              className="gap-1 text-xs shrink-0"
              aria-label="Reset journey timer"
            >
              <RefreshCw size={12} />
              Reset
            </Button>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3 text-center sm:text-left">
              Mystery Journey Timer
            </div>
            <CountdownDisplay targetDateStr={data.targetDate} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-muted/30 p-5">
              <div className="text-sm font-medium text-muted-foreground">Time Lived</div>
              {dashboardInfo && (
                <div className="mt-3 text-xl font-bold text-foreground sm:text-2xl">
                  {dashboardInfo.lived.years} Years {dashboardInfo.lived.months} Months {dashboardInfo.lived.days} Days
                </div>
              )}
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-5">
              <div className="text-sm font-medium text-muted-foreground">Journey Completed</div>
              {dashboardInfo && (
                <div className="mt-2 grid gap-2">
                  <div className="text-2xl font-black text-foreground">
                    {dashboardInfo.progress.toFixed(6)}%
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-500 ease-out"
                      style={{ width: `${dashboardInfo.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-center italic text-lg font-medium text-foreground py-2 border-t border-border mt-4">
            "{quote}"
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <Card className="max-w-md w-full border border-border shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground">Reset Journey</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Are you sure you want to reset your journey timer? This action will permanently erase your current timeline and target date.
              </p>
              <div className="flex justify-end gap-3 mt-6">
                <Button onClick={() => setShowConfirmReset(false)} variant="outline">
                  Cancel
                </Button>
                <Button onClick={handleReset} className="bg-red-600 hover:bg-red-500 text-white font-semibold cursor-pointer">
                  Reset Journey
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit2, ChevronLeft, Calendar, Tag, CheckSquare, Sparkles } from "lucide-react";

interface Wish {
  id: string;
  wish: string;
  category: string;
  createdDate: string;
  targetDate: string;
}

const categories = [
  "Career",
  "Education",
  "Health",
  "Travel",
  "Money",
  "Relationship",
  "Personal",
  "Custom",
];

const motivationalMessages = [
  "Small progress still moves you forward.",
  "Consistency beats intensity.",
  "Every day counts.",
  "You are closer than you were yesterday.",
  "Believe you can and you're halfway there.",
  "Success is the sum of small efforts repeated.",
  "Your goals are worth the hustle.",
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

function WishCountdown({ targetDateStr }: { targetDateStr: string }) {
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
    <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6 text-center">
      {units.map((unit) => (
        <div key={unit.label} className="rounded-lg border border-border bg-card p-2.5 shadow-sm">
          <div className="clock-digits text-xl font-bold sm:text-3xl text-foreground">
            {String(unit.val).padStart(2, "0")}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export function WishClockTool() {
  const [loading, setLoading] = useState(true);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [selectedWishId, setSelectedWishId] = useState<string | null>(null);

  // Form states
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [wishInput, setWishInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("Career");
  const [targetDateInput, setTargetDateInput] = useState("");

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [activeQuote, setActiveQuote] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("wishClockWishes");
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch {
        localStorage.removeItem("wishClockWishes");
      }
    }
    setActiveQuote(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
    setLoading(false);
  }, []);

  const saveWishes = (items: Wish[]) => {
    localStorage.setItem("wishClockWishes", JSON.stringify(items));
    setWishes(items);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishInput.trim()) return;

    let targetDate = "";
    if (targetDateInput) {
      targetDate = new Date(targetDateInput).toISOString();
    } else {
      let durationYears = 1;
      switch (categoryInput) {
        case "Career": durationYears = 1 + Math.random() * 4; break;
        case "Education": durationYears = 0.5 + Math.random() * 3.5; break;
        case "Health": durationYears = 0.5 + Math.random() * 1.5; break;
        case "Money": durationYears = 1 + Math.random() * 4; break;
        case "Travel": durationYears = 0.5 + Math.random() * 1.5; break;
        case "Relationship": durationYears = 1 + Math.random() * 2; break;
        case "Personal": durationYears = 0.5 + Math.random() * 2.5; break;
        default: durationYears = 0.5 + Math.random() * 2.5; break;
      }
      const targetTime = Date.now() + durationYears * 365.25 * 24 * 60 * 60 * 1000;
      targetDate = new Date(targetTime).toISOString();
    }

    const newWish: Wish = {
      id: crypto.randomUUID(),
      wish: wishInput.trim(),
      category: categoryInput,
      createdDate: new Date().toISOString(),
      targetDate: targetDate,
    };

    const updated = [...wishes, newWish];
    saveWishes(updated);
    setIsAdding(false);
    setSelectedWishId(newWish.id);
    resetForm();
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishInput.trim() || !selectedWishId) return;

    const updated = wishes.map((item) => {
      if (item.id === selectedWishId) {
        return {
          ...item,
          wish: wishInput.trim(),
          category: categoryInput,
          targetDate: targetDateInput ? new Date(targetDateInput).toISOString() : item.targetDate,
        };
      }
      return item;
    });

    saveWishes(updated);
    setIsEditing(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    const updated = wishes.filter((item) => item.id !== id);
    saveWishes(updated);
    if (selectedWishId === id) {
      setSelectedWishId(null);
    }
    setConfirmDeleteId(null);
  };

  const resetForm = () => {
    setWishInput("");
    setCategoryInput("Career");
    setTargetDateInput("");
  };

  const sortedWishes = useMemo(() => {
    return [...wishes].sort(
      (a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
    );
  }, [wishes]);

  const selectedWish = useMemo(() => {
    return wishes.find((item) => item.id === selectedWishId) || null;
  }, [wishes, selectedWishId]);

  const wishProgress = useMemo(() => {
    if (!selectedWish) return null;
    const start = new Date(selectedWish.createdDate).getTime();
    const end = new Date(selectedWish.targetDate).getTime();
    const now = Date.now();
    const total = end - start;
    const elapsed = now - start;
    const progress = Math.min(100, Math.max(0, (elapsed / total) * 100));

    return {
      progress,
      is25: progress >= 25,
      is50: progress >= 50,
      is75: progress >= 75,
      is100: progress >= 100,
    };
  }, [selectedWish]);

  const triggerEdit = () => {
    if (!selectedWish) return;
    setWishInput(selectedWish.wish);
    setCategoryInput(selectedWish.category);
    // Format to yyyy-MM-dd
    const d = new Date(selectedWish.targetDate);
    const dateStr = d.toISOString().split("T")[0];
    setTargetDateInput(dateStr);
    setIsEditing(true);
  };

  if (loading) {
    return (
      <div className="w-full min-h-[350px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Dashboard Detail View
  if (selectedWish && !isEditing) {
    return (
      <div className="grid gap-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setSelectedWishId(null);
              setActiveQuote(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
            }}
            variant="ghost"
            size="sm"
            className="gap-1 text-xs"
          >
            <ChevronLeft size={16} />
            Back to wishes
          </Button>
        </div>

        <Card className="border border-border bg-card overflow-hidden">
          <CardContent className="p-6 sm:p-10 grid gap-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent border border-accent/10">
                  <Tag size={10} />
                  {selectedWish.category}
                </span>
                <h2 className="text-2xl font-bold text-foreground mt-2">{selectedWish.wish}</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={triggerEdit} variant="outline" size="icon" aria-label="Edit wish">
                  <Edit2 size={14} />
                </Button>
                <Button
                  onClick={() => setConfirmDeleteId(selectedWish.id)}
                  variant="outline"
                  size="icon"
                  className="text-destructive hover:bg-destructive/10"
                  aria-label="Delete wish"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                Time Remaining
              </div>
              <WishCountdown targetDateStr={selectedWish.targetDate} />
            </div>

            {wishProgress && (
              <div className="grid gap-6 border-t border-border pt-6">
                <div>
                  <div className="flex items-center justify-between text-sm font-medium mb-2">
                    <span className="text-muted-foreground">Journey Progress</span>
                    <span className="text-foreground">{wishProgress.progress.toFixed(2)}%</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-500 ease-out"
                      style={{ width: `${wishProgress.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Milestones Achieved
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {[
                      { label: "Milestone 1: 25% completed", done: wishProgress.is25 },
                      { label: "Milestone 2: 50% completed", done: wishProgress.is50 },
                      { label: "Milestone 3: 75% completed", done: wishProgress.is75 },
                      { label: "Milestone 4: 100% completed", done: wishProgress.is100 },
                    ].map((m, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-3 rounded-lg border p-3 text-sm transition-colors ${
                          m.done
                            ? "bg-accent/5 border-accent/20 text-foreground"
                            : "bg-muted/20 border-border text-muted-foreground"
                        }`}
                      >
                        <CheckSquare
                          size={18}
                          className={m.done ? "text-accent" : "text-muted-foreground"}
                        />
                        <span>{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="text-center italic text-lg font-medium text-foreground py-2 border-t border-border mt-2">
              "{activeQuote}"
            </div>
          </CardContent>
        </Card>

        {/* Delete Confirmation Overlay */}
        {confirmDeleteId === selectedWish.id && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
            <Card className="max-w-md w-full border border-border shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">Delete Wish</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Are you sure you want to delete this wish countdown? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3 mt-6">
                  <Button onClick={() => setConfirmDeleteId(null)} variant="outline">
                    Cancel
                  </Button>
                  <Button onClick={() => handleDelete(selectedWish.id)} className="bg-red-600 hover:bg-red-500 text-white font-semibold cursor-pointer">
                    Delete Wish
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }

  // Create / Edit Form View
  if (isAdding || isEditing) {
    return (
      <Card className="max-w-xl mx-auto border border-border bg-card">
        <CardContent className="p-6 sm:p-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {isEditing ? "Edit Wish Complete Clock" : "Start Wish Journey"}
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              {isEditing
                ? "Modify your dream details or target target date below."
                : "Type in your wish, pick a category, and start tracking your success journey."}
            </p>
          </div>
          <form onSubmit={isEditing ? handleUpdate : handleCreate} className="grid gap-5">
            <div className="grid gap-2">
              <label htmlFor="wish" className="text-sm font-medium flex items-center gap-1.5">
                <Sparkles size={16} className="text-muted-foreground" />
                My Wish / Goal
              </label>
              <input
                id="wish"
                type="text"
                required
                placeholder="e.g., Become a software engineer"
                className="h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                value={wishInput}
                onChange={(e) => setWishInput(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="category" className="text-sm font-medium flex items-center gap-1.5">
                <Tag size={16} className="text-muted-foreground" />
                Category
              </label>
              <select
                id="category"
                className="h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="targetdate" className="text-sm font-medium flex items-center gap-1.5">
                <Calendar size={16} className="text-muted-foreground" />
                Target Complete Date (Optional)
              </label>
              <input
                id="targetdate"
                type="date"
                className="h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                value={targetDateInput}
                onChange={(e) => setTargetDateInput(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                If left blank, a smart duration will be generated based on the selected category.
              </p>
            </div>
            <div className="flex gap-3 mt-2">
              <Button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setIsEditing(false);
                  resetForm();
                }}
                variant="outline"
                className="w-full h-11"
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full h-11 bg-primary text-primary-foreground font-semibold hover:bg-primary/95">
                {isEditing ? "Save Changes" : "Start Wish Journey"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  // Dashboard List View
  return (
    <div className="grid gap-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-foreground">My Wish Clocks</h2>
        <Button onClick={() => setIsAdding(true)} className="gap-1.5" size="sm">
          <Plus size={16} />
          Add Wish
        </Button>
      </div>

      {sortedWishes.length === 0 ? (
        <Card className="border border-dashed border-border bg-muted/10 p-10 text-center">
          <CardContent className="grid gap-4 place-items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Sparkles size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">No wishes active</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                Create a wish complete clock to set customized goal targets, track milestone complete percentages, and keep motivated.
              </p>
            </div>
            <Button onClick={() => setIsAdding(true)} className="mt-2">
              Create My First Wish
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {sortedWishes.map((item) => {
            const timeDiff = new Date(item.targetDate).getTime() - Date.now();
            const daysLeft = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));

            return (
              <Card
                key={item.id}
                onClick={() => setSelectedWishId(item.id)}
                className="border border-border bg-card transition-all hover:border-accent/40 cursor-pointer overflow-hidden group"
              >
                <CardContent className="p-5 flex flex-col justify-between h-full gap-5">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent border border-accent/5">
                        {item.category}
                      </span>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmDeleteId(item.id);
                        }}
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive shrink-0 transition-opacity"
                        aria-label={`Delete ${item.wish}`}
                      >
                        <Trash2 size={13} />
                      </Button>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground line-clamp-2 mt-1">
                      {item.wish}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/60 pt-3">
                    <span>
                      Target: {new Date(item.targetDate).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="font-semibold text-foreground shrink-0">
                      {daysLeft} days left
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Overlay */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <Card className="max-w-md w-full border border-border shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground">Delete Wish</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Are you sure you want to delete this wish countdown? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3 mt-6">
                <Button onClick={() => setConfirmDeleteId(null)} variant="outline">
                  Cancel
                </Button>
                <Button onClick={() => handleDelete(confirmDeleteId)} className="bg-red-600 hover:bg-red-500 text-white font-semibold cursor-pointer">
                  Delete Wish
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

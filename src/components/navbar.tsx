"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlarmClock, Clock3, Menu, Timer, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/clock", label: "Clock" },
  { href: "/world-clock", label: "World Clock" },
  { href: "/timer", label: "Timer" },
  { href: "/stopwatch", label: "Stopwatch" },
  { href: "/alarm-clock", label: "Alarm" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/88 backdrop-blur-xl">
      <nav className="page-shell flex h-16 items-center justify-between gap-3">
        <Link aria-label="vClock home" className="flex items-center gap-2 font-semibold" href="/">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Clock3 aria-hidden="true" size={19} />
          </span>
          <span className="text-lg">vClock</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              className={cn(
                "rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                pathname === item.href && "bg-muted text-foreground",
              )}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            aria-label={open ? "Close navigation" : "Open navigation"}
            className="md:hidden"
            onClick={() => setOpen((value) => !value)}
            size="icon"
            variant="ghost"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </Button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background md:hidden">
          <div className="page-shell grid gap-1 py-3">
            {nav.map((item) => (
              <Link
                className="rounded-lg px-3 py-3 text-sm hover:bg-muted"
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 text-muted-foreground">
              <AlarmClock size={16} />
              <Timer size={16} />
              <Clock3 size={16} />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}


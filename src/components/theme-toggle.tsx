"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Laptop;

  return (
    <Button
      aria-label={`Theme: ${theme}. Switch theme`}
      onClick={() => setTheme(next)}
      size="icon"
      variant="ghost"
    >
      <Icon aria-hidden="true" size={18} />
    </Button>
  );
}


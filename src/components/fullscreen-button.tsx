"use client";

import { Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FullscreenButton({ targetId }: { targetId: string }) {
  return (
    <Button
      aria-label="Enter fullscreen"
      onClick={() => document.getElementById(targetId)?.requestFullscreen?.()}
      size="icon"
      variant="outline"
    >
      <Maximize2 aria-hidden="true" size={18} />
    </Button>
  );
}


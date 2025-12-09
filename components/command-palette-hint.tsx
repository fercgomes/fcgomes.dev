"use client";

import { Command } from "lucide-react";
import { usePostHogTracking } from "@/lib/posthog";

export function CommandPaletteHint() {
  const { track } = usePostHogTracking();
  
  const handleClick = () => {
    track('command_palette_opened');
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <button
      onClick={handleClick}
      className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-muted-foreground border border-border rounded-md hover:bg-accent transition-colors"
      title="Open command palette (⌘K)"
      aria-label="Open command palette"
    >
      <Command className="h-3 w-3" />
      <span>⌘K</span>
    </button>
  );
}


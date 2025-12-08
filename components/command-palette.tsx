"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Command, Search, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

type CommandItem = {
  id: string;
  label: string;
  action: () => void;
  icon?: React.ReactNode;
  shortcut?: string;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const commands: CommandItem[] = [
    {
      id: "experience",
      label: "Go to Experience",
      action: () => {
        document.getElementById("experience-heading")?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      },
      shortcut: "E",
    },
    {
      id: "projects",
      label: "Go to Projects",
      action: () => {
        document.getElementById("projects-heading")?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      },
      shortcut: "P",
    },
    {
      id: "journey",
      label: "Go to Journey",
      action: () => {
        document.getElementById("journey-heading")?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      },
      shortcut: "J",
    },
    {
      id: "skills",
      label: "Go to Skills",
      action: () => {
        document.getElementById("skills-heading")?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      },
      shortcut: "S",
    },
    {
      id: "email",
      label: "Send Email",
      action: () => {
        window.location.href = "mailto:fernando@fokvs.com.br";
        setOpen(false);
      },
      shortcut: "M",
    },
    {
      id: "linkedin",
      label: "Open LinkedIn",
      action: () => {
        window.open("https://www.linkedin.com/in/fercgomes/", "_blank");
        setOpen(false);
      },
      shortcut: "L",
    },
    {
      id: "resume",
      label: "Download Resume",
      action: () => {
        const link = document.createElement("a");
        link.href = "/media/resumee.pdf";
        link.download = "Fernando_Gomes_Resume.pdf";
        link.click();
        setOpen(false);
      },
      shortcut: "R",
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleCommand = (command: CommandItem) => {
    command.action();
    setSearch("");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-2xl p-0 gap-0 overflow-hidden"
        >
          <DialogTitle className="sr-only">Command Palette</DialogTitle>
          <div className="flex items-center border-b px-4 py-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search commands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex h-10 w-full rounded-md bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
              autoFocus
            />
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <Command className="h-3 w-3" />K
            </kbd>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {filteredCommands.length > 0 ? (
              <div className="p-2">
                {filteredCommands.map((command) => (
                  <button
                    key={command.id}
                    onClick={() => handleCommand(command)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {command.icon}
                      <span>{command.label}</span>
                    </div>
                    {command.shortcut && (
                      <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 hidden sm:flex">
                        {command.shortcut}
                      </kbd>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No commands found.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}


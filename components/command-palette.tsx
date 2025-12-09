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
import { useTranslations } from "next-intl";
import { usePostHogTracking } from "@/lib/posthog";
import { useRouter as useI18nRouter } from "@/i18n/routing";
import { getSubstackUrl } from "@/lib/substack";

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
  const i18nRouter = useI18nRouter();
  const t = useTranslations("commandPalette");
  const { track } = usePostHogTracking();

  const commands: CommandItem[] = [
    {
      id: "experience",
      label: t("commands.experience"),
      action: () => {
        track("section_viewed", {
          section: "experience",
          method: "command_palette",
        });
        document
          .getElementById("experience-heading")
          ?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      },
      shortcut: "E",
    },
    {
      id: "projects",
      label: t("commands.projects"),
      action: () => {
        track("section_viewed", {
          section: "projects",
          method: "command_palette",
        });
        document
          .getElementById("projects-heading")
          ?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      },
      shortcut: "P",
    },
    {
      id: "journey",
      label: t("commands.journey"),
      action: () => {
        track("section_viewed", {
          section: "journey",
          method: "command_palette",
        });
        document
          .getElementById("journey-heading")
          ?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      },
      shortcut: "J",
    },
    {
      id: "skills",
      label: t("commands.skills"),
      action: () => {
        track("section_viewed", {
          section: "skills",
          method: "command_palette",
        });
        document
          .getElementById("skills-heading")
          ?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      },
      shortcut: "S",
    },
    {
      id: "email",
      label: t("commands.email"),
      action: () => {
        track("email_clicked", { source: "command_palette" });
        window.location.href = "mailto:fernando@fokvs.com.br";
        setOpen(false);
      },
      shortcut: "M",
    },
    {
      id: "linkedin",
      label: t("commands.linkedin"),
      action: () => {
        track("external_link_clicked", {
          platform: "linkedin",
          source: "command_palette",
        });
        window.open("https://www.linkedin.com/in/fercgomes/", "_blank");
        setOpen(false);
      },
      shortcut: "L",
    },
    {
      id: "resume",
      label: t("commands.resume"),
      action: () => {
        track("resume_downloaded", { source: "command_palette" });
        const link = document.createElement("a");
        link.href = "/media/resumee.pdf";
        link.download = "Fernando_Gomes_Resume.pdf";
        link.click();
        setOpen(false);
      },
      shortcut: "R",
    },
    {
      id: "blog",
      label: t("commands.blog"),
      action: () => {
        const substackUrl = getSubstackUrl("command_palette");
        track("navigation_clicked", {
          destination: substackUrl,
          source: "command_palette",
        });
        track("external_link_clicked", {
          platform: "substack",
          destination: substackUrl,
          source: "command_palette",
        });
        window.open(substackUrl, "_blank", "noopener,noreferrer");
        setOpen(false);
      },
      shortcut: "B",
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => {
          if (!open) {
            track("command_palette_opened");
          }
          return !open;
        });
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [track]);

  const handleCommand = (command: CommandItem) => {
    track("command_palette_command_executed", { command: command.id });
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
          <DialogTitle className="sr-only">{t("title")}</DialogTitle>
          <div className="flex items-center border-b px-4 py-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("placeholder")}
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
                {t("noCommands")}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

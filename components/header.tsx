"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Mail,
  Linkedin,
  ExternalLink,
  Download,
  Github,
  MoreHorizontal,
} from "lucide-react";
import { CommandPaletteHint } from "@/components/command-palette-hint";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Header() {
  const t = useTranslations("header");
  const tCommon = useTranslations("common");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <header className="mb-12 md:mb-20 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3 md:gap-6">
        <div
          className={`relative h-16 w-16 shrink-0 md:h-24 md:w-24 avatar-container ${
            isLoaded ? "animate-coin-flip" : ""
          }`}
        >
          <Image
            src="/media/images/fernando.jpeg"
            alt="Fernando Gomes"
            fill
            className="rounded-full object-cover border-2 border-chart-2/30 shadow-lg transition-all duration-300 hover:border-chart-2 hover:shadow-xl"
            sizes="(max-width: 768px) 80px, 96px"
            priority
          />
        </div>
        <div>
          <h1 className="bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-4xl">
            {t("name")}
          </h1>
          <p
            className="mt-1 md:mt-2 text-base md:text-lg text-muted-foreground"
            aria-label={t("jobTitle")}
          >
            {t("title")}
          </p>
        </div>
      </div>

      {/* Actions with hierarchy */}
      <div className="flex items-center gap-2 md:gap-3 flex-wrap">
        {/* Primary actions - always visible */}
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            asChild
            className="bg-chart-2 hover:bg-chart-2/90 text-white border-0 transition-all duration-300"
          >
            <a
              href="mailto:fernando@fokvs.com.br"
              aria-label={tCommon("sendEmailTo")}
            >
              <Mail className="h-4 w-4 sm:mr-2" aria-hidden="true" />
              <span className="hidden sm:inline">{tCommon("email")}</span>
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-chart-2/30 hover:border-chart-2 hover:bg-chart-2/10 transition-all duration-300"
          >
            <a
              href="/media/resumee.pdf"
              download="Fernando_Gomes_Resume.pdf"
              aria-label={tCommon("downloadResumeFor")}
            >
              <Download className="h-4 w-4 sm:mr-2" aria-hidden="true" />
              <span className="hidden sm:inline">{tCommon("resume")}</span>
            </a>
          </Button>
        </div>

        {/* Utility actions */}
        <div className="flex items-center gap-2 border-l border-border/50 pl-2 md:pl-3">
          <LanguageSwitcher />
          <CommandPaletteHint />
        </div>

        {/* Secondary actions - dropdown menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-chart-2/30 hover:border-chart-2 hover:bg-chart-2/10 transition-all duration-300"
              aria-label="More links"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More links</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <a
                href="https://www.linkedin.com/in/fercgomes/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center cursor-pointer"
                aria-label={tCommon("visitLinkedIn")}
              >
                <Linkedin className="mr-2 h-4 w-4" />
                {tCommon("linkedin")}
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href="https://github.com/fercgomes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center cursor-pointer"
                aria-label={tCommon("visitGitHub")}
              >
                <Github className="mr-2 h-4 w-4" />
                {tCommon("github")}
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a
                href="https://fokvs.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center cursor-pointer"
                aria-label={tCommon("visitFokvs")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                {tCommon("fokvs")}
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

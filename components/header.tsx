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
  FileText,
  BookOpen,
  BadgeCheck,
  Sparkles,
  Share2,
  PenTool,
} from "lucide-react";
import { CommandPaletteHint } from "@/components/command-palette-hint";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ShareModal, useShareModal } from "@/components/share-modal";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePostHogTracking } from "@/lib/posthog";
import { Link, usePathname } from "@/i18n/routing";
import { getSubstackUrl } from "@/lib/substack";

export function Header() {
  const t = useTranslations("header");
  const tCommon = useTranslations("common");
  const [isLoaded, setIsLoaded] = useState(false);
  const { track } = usePostHogTracking();
  const pathname = usePathname();
  const {
    open: shareOpen,
    setOpen: setShareOpen,
    openShare,
  } = useShareModal("header-share");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <header className="mb-6 md:mb-10 flex flex-col gap-3">
      {/* Row 1: avatar + title + actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 md:gap-5">
          <Link
            href="/"
            className="flex items-center gap-3 md:gap-5 group"
            onClick={() =>
              track("navigation_clicked", {
                destination: "/",
                source: "header",
              })
            }
          >
            <div
              className={`relative h-16 w-16 shrink-0 md:h-20 md:w-20 avatar-container ${
                isLoaded ? "animate-coin-flip" : ""
              }`}
            >
              <Image
                src="/media/images/fernando.jpeg"
                alt="Fernando Gomes"
                fill
                className="rounded-full object-cover border-2 border-chart-2/30 shadow-lg transition-all duration-300 group-hover:border-chart-2 hover:border-chart-2 hover:shadow-xl"
                sizes="(max-width: 768px) 80px, 96px"
                priority
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-4xl leading-tight">
                {t("name")}
              </h1>
              <p
                className="text-base md:text-lg text-muted-foreground"
                aria-label={t("jobTitle")}
              >
                {t("title")}
              </p>
            </div>
          </Link>
        </div>

        <div className="flex flex-col items-start gap-3 md:items-end">
          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
            <Button
              variant="default"
              size="sm"
              asChild
              className="bg-chart-2 hover:bg-chart-2/90 text-white border-0 transition-all duration-300"
            >
              <a
                href="mailto:fernando@fokvs.com.br"
                aria-label={tCommon("sendEmailTo")}
                onClick={() => track("email_clicked", { source: "header" })}
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
                onClick={() => track("resume_downloaded", { source: "header" })}
              >
                <Download className="h-4 w-4 sm:mr-2" aria-hidden="true" />
                <span className="hidden sm:inline">{tCommon("resume")}</span>
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={openShare}
              className="border-chart-2/30 hover:border-chart-2 hover:bg-chart-2/10 transition-all duration-300"
              aria-label={tCommon("share")}
              title={tCommon("share")}
            >
              <Share2 className="h-4 w-4 sm:mr-2" aria-hidden="true" />
              <span className="hidden sm:inline">{tCommon("share")}</span>
            </Button>
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
                    onClick={() =>
                      track("external_link_clicked", {
                        platform: "linkedin",
                        source: "header",
                      })
                    }
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
                    onClick={() =>
                      track("external_link_clicked", {
                        platform: "github",
                        source: "header",
                      })
                    }
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
                    onClick={() =>
                      track("external_link_clicked", {
                        platform: "fokvs",
                        source: "header",
                      })
                    }
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {tCommon("fokvs")}
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <CommandPaletteHint />
          </div>
        </div>
      </div>

      {/* Row 2: navigation */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {[
          {
            href: "/projects",
            label: t("nav.projects"),
            icon: <FileText className="h-4 w-4" />,
            isBlog: false,
            external: false,
          },
          {
            href: "/journey",
            label: t("nav.journey"),
            icon: <BookOpen className="h-4 w-4" />,
            isBlog: false,
            external: false,
          },
          {
            href: "/skills",
            label: t("nav.skills"),
            icon: <BadgeCheck className="h-4 w-4" />,
            isBlog: false,
            external: false,
          },
          {
            href: "/beyond-code",
            label: t("nav.beyond"),
            icon: <Sparkles className="h-4 w-4" />,
            isBlog: false,
            external: false,
          },
          {
            href: getSubstackUrl("header"),
            label: t("nav.blog"),
            icon: <PenTool className="h-4 w-4" />,
            isBlog: true,
            external: true,
          },
        ].map((link) => (
          <div className="flex" key={link.href} title={link.label}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  track("navigation_clicked", {
                    destination: link.href,
                    source: "header",
                  });
                  track("external_link_clicked", {
                    platform: "substack",
                    destination: link.href,
                    source: "header",
                  });
                }}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors ${
                  link.isBlog
                    ? "border-chart-2/20 bg-chart-2/5 text-muted-foreground hover:border-chart-2/40 hover:text-chart-2 font-semibold"
                    : "border-transparent hover:border-chart-2/60 hover:bg-chart-2/10 hover:text-foreground"
                }`}
              >
                {link.icon}
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                onClick={() =>
                  track("navigation_clicked", {
                    destination: link.href,
                    source: "header",
                  })
                }
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors ${
                  pathname.startsWith(link.href)
                    ? "border-chart-2/60 bg-chart-2/10 text-foreground"
                    : "border-transparent hover:border-chart-2/60 hover:bg-chart-2/10 hover:text-foreground"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            )}
          </div>
        ))}
      </div>

      <ShareModal
        open={shareOpen}
        onOpenChange={setShareOpen}
        utmContent="header-share"
      />
    </header>
  );
}

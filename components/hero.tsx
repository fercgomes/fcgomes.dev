"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  CheckCircle2,
  ArrowUpRight,
  Mail,
  Download,
  Share2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { usePostHogTracking } from "@/lib/posthog";
import { ShareModal, useShareModal } from "@/components/share-modal";
import { getSubstackUrl } from "@/lib/substack";

export function Hero() {
  const t = useTranslations("hero");
  const tShare = useTranslations("share");
  const { track } = usePostHogTracking();
  const {
    open: shareOpen,
    setOpen: setShareOpen,
    openShare,
  } = useShareModal("cta-hero");

  const sellingPoints = ["0", "1", "2"] as const;
  const recruiterPoints = ["0", "1"] as const;
  const founderPoints = ["0", "1"] as const;

  return (
    <section className="mb-10 md:mb-16">
      <div className="mb-3 flex items-center gap-2 text-muted-foreground">
        <MapPin className="h-4 w-4 text-chart-2" />
        <span className="text-sm">{t("location")}</span>
      </div>

      <div className="space-y-4">
        <h2 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl text-foreground">
          {t.rich("headline", {
            highlight: (chunks) => (
              <span className="gradient-gold font-display italic font-semibold whitespace-nowrap">
                {chunks}
              </span>
            ),
          })}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg lg:text-xl max-w-3xl">
          {t.rich("bio", {
            fokvs: (chunks) => (
              <span className="font-semibold text-chart-2">{chunks}</span>
            ),
          })}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge className="bg-chart-2/15 text-chart-2 border-chart-2/40 font-semibold text-sm px-3 py-1 hover:bg-chart-2/25 transition-all duration-300">
          {t("badges.foundingEngineer")}
        </Badge>
        <Badge className="bg-chart-2/15 text-chart-2 border-chart-2/40 font-semibold text-sm px-3 py-1 hover:bg-chart-2/25 transition-all duration-300">
          {t("badges.cto")}
        </Badge>
        <Badge className="bg-chart-2/15 text-chart-2 border-chart-2/40 font-semibold text-sm px-3 py-1 hover:bg-chart-2/25 transition-all duration-300">
          {t("badges.fullStack")}
        </Badge>
        <Badge className="bg-chart-2/15 text-chart-2 border-chart-2/40 font-semibold text-sm px-3 py-1 hover:bg-chart-2/25 transition-all duration-300">
          {t("badges.infrastructure")}
        </Badge>
        <Badge className="bg-chart-2/15 text-chart-2 border-chart-2/40 font-semibold text-sm px-3 py-1 hover:bg-chart-2/25 transition-all duration-300">
          {t("badges.aiMl")}
        </Badge>
      </div>

      <ul className="mt-4 space-y-2">
        {sellingPoints.map((key) => (
          <li
            key={key}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-chart-2" />
            <span>{t(`sellingPoints.${key}`)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <Card className="border-chart-2/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-foreground">
              {t("audience.recruiters.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-2 text-sm text-muted-foreground">
              {recruiterPoints.map((key) => (
                <li key={key} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-chart-2" />
                  <span>{t(`audience.recruiters.points.${key}`)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="border-chart-2/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-foreground">
              {t("audience.founders.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-2 text-sm text-muted-foreground">
              {founderPoints.map((key) => (
                <li key={key} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-chart-2" />
                  <span>{t(`audience.founders.points.${key}`)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button
          className="bg-chart-2 text-white hover:bg-chart-2/90"
          asChild
          onClick={() => track("resume_downloaded", { source: "hero" })}
        >
          <a href="/media/resumee.pdf" download="Fernando_Gomes_Resume.pdf">
            <Download className="mr-2 h-4 w-4" />
            {t("cta.resume")}
          </a>
        </Button>
        <Button
          variant="outline"
          className="border-chart-2/40 text-foreground hover:border-chart-2 hover:bg-chart-2/10"
          asChild
          onClick={() => track("email_clicked", { source: "hero" })}
        >
          <a href="mailto:fernando@fokvs.com.br">
            <Mail className="mr-2 h-4 w-4" />
            {t("cta.email")}
          </a>
        </Button>
        <Button
          variant="ghost"
          className="text-foreground hover:text-foreground hover:bg-muted"
          asChild
          onClick={() =>
            track("navigation_clicked", {
              destination: "projects",
              source: "hero",
            })
          }
        >
          <Link href="/projects" className="inline-flex items-center">
            {t("cta.projects")}
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="text-foreground hover:text-foreground hover:bg-muted"
          asChild
          onClick={() =>
            track("navigation_clicked", {
              destination: "journey",
              source: "hero",
            })
          }
        >
          <Link href="/journey" className="inline-flex items-center">
            {t("cta.journey")}
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="text-foreground hover:text-foreground hover:bg-muted"
          asChild
          onClick={() => {
            const substackUrl = getSubstackUrl("hero");
            track("navigation_clicked", {
              destination: substackUrl,
              source: "hero",
            });
            track("external_link_clicked", {
              platform: "substack",
              destination: substackUrl,
              source: "hero",
            });
          }}
        >
          <a
            href={getSubstackUrl("hero")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
          >
            {t("cta.blog")}
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>

      <div className="mt-4 flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">{tShare("referCta")}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={openShare}
          className="border-chart-2/40 hover:border-chart-2 hover:bg-chart-2/10"
        >
          <Share2 className="mr-2 h-4 w-4" />
          {tShare("referButton")}
        </Button>
      </div>

      <ShareModal
        open={shareOpen}
        onOpenChange={setShareOpen}
        utmContent="cta-hero"
      />
    </section>
  );
}

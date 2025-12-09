"use client";

import { Badge } from "@/components/ui/badge";
import { MapPin, Music, Activity } from "lucide-react";
import { useTranslations } from 'next-intl';
import { usePostHogTracking } from "@/lib/posthog";

export function Hero() {
  const t = useTranslations('hero');
  const { track } = usePostHogTracking();
  
  return (
    <section className="mb-16 md:mb-32">
      <div className="mb-8 flex items-center gap-2 text-muted-foreground">
        <MapPin className="h-4 w-4 text-chart-2" />
        <span>{t('location')}</span>
      </div>
      <div className="mb-6 md:mb-8 text-lg leading-relaxed text-muted-foreground md:text-2xl">
        {t.rich('bio', {
          fokvs: (chunks) => <span className="font-semibold text-chart-2">{chunks}</span>
        })}
      </div>
      <div className="flex flex-wrap gap-2 md:gap-3">
        <Badge className="bg-chart-2/15 text-chart-2 border-chart-2/40 font-semibold text-sm px-4 py-1.5 hover:bg-chart-2/25 transition-all duration-300">{t('badges.foundingEngineer')}</Badge>
        <Badge className="bg-chart-2/15 text-chart-2 border-chart-2/40 font-semibold text-sm px-4 py-1.5 hover:bg-chart-2/25 transition-all duration-300">{t('badges.cto')}</Badge>
        <Badge className="bg-chart-2/15 text-chart-2 border-chart-2/40 font-semibold text-sm px-4 py-1.5 hover:bg-chart-2/25 transition-all duration-300">{t('badges.fullStack')}</Badge>
        <Badge className="bg-chart-2/15 text-chart-2 border-chart-2/40 font-semibold text-sm px-4 py-1.5 hover:bg-chart-2/25 transition-all duration-300">{t('badges.infrastructure')}</Badge>
        <Badge className="bg-chart-2/15 text-chart-2 border-chart-2/40 font-semibold text-sm px-4 py-1.5 hover:bg-chart-2/25 transition-all duration-300">{t('badges.aiMl')}</Badge>
      </div>
      <button
        onClick={() => {
          track('personal_interests_clicked');
          track('section_viewed', { section: 'personal', method: 'hero_link' });
          document.getElementById("personal-heading")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="mt-8 flex items-center gap-4 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
        aria-label={t('personalInterests.scrollToInterests')}
      >
        <div className="flex items-center gap-1.5">
          <Music className="h-3.5 w-3.5 text-chart-2/70 group-hover:text-chart-2 transition-colors" />
          <span>{t('personalInterests.musician')}</span>
        </div>
        <span className="text-border">•</span>
        <div className="flex items-center gap-1.5">
          <Activity className="h-3.5 w-3.5 text-chart-2/70 group-hover:text-chart-2 transition-colors" />
          <span>{t('personalInterests.marathonRunner')}</span>
        </div>
      </button>
    </section>
  );
}


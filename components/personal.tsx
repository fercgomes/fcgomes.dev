"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Activity } from "lucide-react";
import { useTranslations } from 'next-intl';

export function Personal() {
  const t = useTranslations('personal');
  
  return (
    <section className="mb-16 md:mb-32" aria-labelledby="personal-heading">
      <h2
        id="personal-heading"
        className="mb-8 md:mb-12 bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-4xl text-center"
      >
        {t('title')}
      </h2>
      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        <Card className="border-l-4 border-l-chart-2 shadow-md transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-chart-2/10 p-2">
                <Music className="h-5 w-5 text-chart-2" />
              </div>
              <CardTitle className="text-xl">{t('music.title')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('music.description')}
            </p>
            <div className="pt-2 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                {t.rich('music.rockBand', {
                  strong: (chunks) => <strong className="text-foreground">{chunks}</strong>
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-chart-2 shadow-md transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-chart-2/10 p-2">
                <Activity className="h-5 w-5 text-chart-2" />
              </div>
              <CardTitle className="text-xl">{t('running.title')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('running.description')}
            </p>
            <div className="pt-2 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                {t.rich('running.marathons', {
                  strong: (chunks) => <strong className="text-foreground">{chunks}</strong>
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}


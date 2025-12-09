"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from 'next-intl';

export function Education() {
  const t = useTranslations('education');
  
  return (
    <section className="mb-16 md:mb-32" aria-labelledby="education-heading">
      <h2
        id="education-heading"
        className="mb-8 md:mb-12 bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-4xl"
      >
        {t('title')}
      </h2>

      <Card className="border-l-4 border-l-chart-2 shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardHeader>
          <CardTitle>{t('degree')}</CardTitle>
          <p className="text-muted-foreground">
            {t('university')}
          </p>
          <Badge className="mt-2 w-fit bg-chart-2/10 text-chart-2 border-chart-2/30">
            {t('period')}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {t('description')}
          </p>
          <p className="text-sm text-muted-foreground">
            {t.rich('background', {
              strong: (chunks) => <strong className="text-foreground">{chunks}</strong>
            })}
          </p>
        </CardContent>
      </Card>

      <div className="mt-6 space-y-4">
        <div>
          <h3 className="mb-3 font-semibold">{t('research.title')}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>{t('research.scientificInitiation')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>{t('research.entrepreneurialInitiation')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>{t('research.tcc')}</span>
            </li>
          </ul>
        </div>

        <Separator />

        <div>
          <h3 className="mb-3 font-semibold">{t('otherExperiences.title')}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>{t('otherExperiences.2012')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>{t('otherExperiences.2013')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>{t('otherExperiences.2015')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>{t('otherExperiences.entrepreneurshipMarathon')}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

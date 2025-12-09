"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from 'next-intl';

export function Experience() {
  const t = useTranslations('experience');
  
  return (
    <section className="mb-16 md:mb-32" aria-labelledby="experience-heading">
      <h2
        id="experience-heading"
        className="mb-8 md:mb-12 bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-4xl"
      >
        {t('title')}
      </h2>

      <Card className="mb-6 border-l-4 border-l-chart-2 shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardHeader>
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <div>
              <CardTitle className="text-xl">{t('role')}</CardTitle>
              <p className="text-muted-foreground">{t('company')}</p>
            </div>
            <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/30">
              {t('period')}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                {t.rich('points.0', {
                  cost: (chunks) => <strong className="text-foreground">{chunks}</strong>
                })}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>{t('points.1')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                {t.rich('points.2', {
                  from: (chunks) => <strong className="text-foreground">{chunks}</strong>,
                  to: (chunks) => <strong className="text-foreground">{chunks}</strong>,
                })}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                {t.rich('points.3', {
                  students: (chunks) => <strong className="text-foreground">{chunks}</strong>,
                  scans: (chunks) => <strong className="text-foreground">{chunks}</strong>,
                })}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>{t('points.4')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                {t.rich('points.5', {
                  materials: (chunks) => <strong className="text-foreground">{chunks}</strong>,
                })}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                {t.rich('points.6', {
                  fromSubs: (chunks) => <strong className="text-foreground">{chunks}</strong>,
                  toSubs: (chunks) => <strong className="text-foreground">{chunks}</strong>,
                  fromChurn: (chunks) => <strong className="text-foreground">{chunks}</strong>,
                  toChurn: (chunks) => <strong className="text-foreground">{chunks}</strong>,
                })}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                {t.rich('points.7', {
                  downtime: (chunks) => <strong className="text-foreground">{chunks}</strong>,
                })}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>{t('points.8')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>{t('points.9')}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}

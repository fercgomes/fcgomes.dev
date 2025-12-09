"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from 'next-intl';

// Helper function to parse XML tags in strings and convert to JSX
function parseRichText(text: string, tagMap: Record<string, (chunks: React.ReactNode) => React.ReactNode>): React.ReactNode {
  // If no tags, return as-is
  if (!text.includes('<')) {
    return text;
  }
  
  const parts: React.ReactNode[] = [];
  const tagRegex = /<(\w+)>(.*?)<\/\1>/g;
  let match;
  let lastIndex = 0;
  let partIndex = 0;

  while ((match = tagRegex.exec(text)) !== null) {
    // Add text before the tag
    if (match.index > lastIndex) {
      const textBefore = text.substring(lastIndex, match.index);
      if (textBefore) {
        parts.push(<React.Fragment key={`text-${partIndex++}`}>{textBefore}</React.Fragment>);
      }
    }
    
    // Add the transformed tag content
    const tagName = match[1];
    const tagContent = match[2];
    if (tagMap[tagName]) {
      parts.push(
        <React.Fragment key={`tag-${partIndex++}`}>
          {tagMap[tagName](tagContent)}
        </React.Fragment>
      );
    } else {
      parts.push(<React.Fragment key={`content-${partIndex++}`}>{tagContent}</React.Fragment>);
    }
    
    lastIndex = tagRegex.lastIndex;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    if (remainingText) {
      parts.push(<React.Fragment key={`text-${partIndex++}`}>{remainingText}</React.Fragment>);
    }
  }
  
  return parts.length > 0 ? <>{parts}</> : text;
}

export function Journey() {
  const t = useTranslations('journey');
  
  return (
    <section className="mb-16 md:mb-32" aria-labelledby="journey-heading">
      <h2
        id="journey-heading"
        className="mb-8 md:mb-12 bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-4xl"
      >
        {t('title')}
      </h2>
      <p className="mb-6 text-sm md:text-base text-muted-foreground">
        {t('context')}
      </p>

      <Card className="border-l-4 border-l-chart-2 shadow-lg mb-4 md:mb-6 transition-all duration-300 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">{t('startingPoint.title')}</CardTitle>
          <Badge className="mt-2 w-fit bg-chart-2/10 text-chart-2 border-chart-2/30">
            {t('startingPoint.period')}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t('startingPoint.intro')}
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {(t.raw('startingPoint.points') as string[]).map((point: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
                <span>
                  {parseRichText(point, {
                    count: (chunks) => <strong className="text-foreground">{chunks}</strong>
                  })}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            {t('startingPoint.conclusion')}
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-2 shadow-lg mb-4 md:mb-6 transition-all duration-300 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">{t('firstMigration.title')}</CardTitle>
          <Badge className="mt-2 w-fit bg-chart-2/10 text-chart-2 border-chart-2/30">
            {t('firstMigration.period')}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t('firstMigration.intro')}
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {(t.raw('firstMigration.points') as string[]).map((point: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
                <span>
                  {parseRichText(point, {
                    count: (chunks) => <strong className="text-foreground">{chunks}</strong>
                  })}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            {t('firstMigration.conclusion')}
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-2 shadow-lg mb-4 md:mb-6 transition-all duration-300 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">{t('awsMigration.title')}</CardTitle>
          <Badge className="mt-2 w-fit bg-chart-2/10 text-chart-2 border-chart-2/30">
            {t('awsMigration.period')}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t('awsMigration.intro')}
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {(t.raw('awsMigration.points') as string[]).map((point: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
                <span>
                  {parseRichText(point, {
                    count: (chunks) => <strong className="text-foreground">{chunks}</strong>
                  })}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            {t('awsMigration.conclusion')}
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-2 shadow-lg mb-4 md:mb-6 transition-all duration-300 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">{t('monetization.title')}</CardTitle>
          <Badge className="mt-2 w-fit bg-chart-2/10 text-chart-2 border-chart-2/30">
            {t('monetization.period')}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t('monetization.intro')}
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {(t.raw('monetization.points') as string[]).map((point: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
                <span>
                  {parseRichText(point, {
                    count: (chunks) => <strong className="text-foreground">{chunks}</strong>
                  })}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-2 shadow-lg mb-4 md:mb-6 transition-all duration-300 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">{t('ambassadorProgram.title')}</CardTitle>
          <Badge className="mt-2 w-fit bg-chart-2/10 text-chart-2 border-chart-2/30">
            {t('ambassadorProgram.period')}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t('ambassadorProgram.intro')}
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {(t.raw('ambassadorProgram.points') as string[]).map((point: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
                <span>
                  {parseRichText(point, {
                    count: (chunks) => <strong className="text-foreground">{chunks}</strong>
                  })}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-2 shadow-lg mb-4 md:mb-6 transition-all duration-300 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">{t('teamBuilding.title')}</CardTitle>
          <Badge className="mt-2 w-fit bg-chart-2/10 text-chart-2 border-chart-2/30">
            {t('teamBuilding.period')}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t('teamBuilding.intro')}
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {(t.raw('teamBuilding.points') as string[]).map((point: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
                <span>
                  {parseRichText(point, {
                    count: (chunks) => <strong className="text-foreground">{chunks}</strong>
                  })}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            {t('teamBuilding.conclusion')}
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-2 shadow-lg mb-4 md:mb-6 transition-all duration-300 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">{t('directSales.title')}</CardTitle>
          <Badge className="mt-2 w-fit bg-chart-2/10 text-chart-2 border-chart-2/30">
            {t('directSales.period')}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t('directSales.intro')}
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {(t.raw('directSales.points') as string[]).map((point: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
                <span>
                  {parseRichText(point, {
                    count: (chunks) => <strong className="text-foreground">{chunks}</strong>
                  })}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            {t('directSales.conclusion')}
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-2 shadow-lg mb-4 md:mb-6 transition-all duration-300 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">{t('technicalEvolution.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="mb-3 font-semibold text-sm">{t('technicalEvolution.earlyDecisions.title')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {(t.raw('technicalEvolution.earlyDecisions.points') as string[]).map((point: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
                  <span>
                    {parseRichText(point, {
                      count: (chunks) => <strong className="text-foreground">{chunks}</strong>
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="mb-3 font-semibold text-sm">{t('technicalEvolution.architectureDebt.title')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {(t.raw('technicalEvolution.architectureDebt.points') as string[]).map((point: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
                  <span>
                    {parseRichText(point, {
                      count: (chunks) => <strong className="text-foreground">{chunks}</strong>
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}


"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from 'next-intl';

export function Skills() {
  const t = useTranslations('skills');
  
  const languages = [
    { name: t('languages.english.name'), level: t('languages.english.level'), color: "chart-2", flag: "🇺🇸" },
    {
      name: t('languages.swedish.name'),
      level: t('languages.swedish.level'),
      color: "chart-2",
      flag: "🇸🇪",
    },
    {
      name: t('languages.french.name'),
      level: t('languages.french.level'),
      color: "chart-2",
      flag: "🇫🇷",
    },
    {
      name: t('languages.spanish.name'),
      level: t('languages.spanish.level'),
      color: "chart-2",
      flag: "🇪🇸",
    },
  ];

  const certifications = t.raw('certifications.items') as string[];

  const skillsByCategory = {
    [t('categories.Backend')]: [
      "TypeScript/Node",
      "NestJS",
      "Fastify",
      "Python",
      "Postgres",
      "Redis",
      "KnexJS",
      "Bull Queues",
    ],
    [t('categories.Frontend')]: [
      "React",
      "Next.js",
      "Flutter",
      "Dart",
      "Tailwind CSS",
      "DaisyUI",
      "shadcn/ui",
    ],
    [t('categories.Architecture')]: [
      "Distributed systems",
      "Modular services",
      "Event-driven design",
      "DDD (Domain-Driven Design)",
      "Caching strategies",
      "Async pipelines",
      "Microservices",
      "Monolith to microservices",
    ],
    [t('categories.Infrastructure')]: [
      "AWS (ECS/Fargate, RDS, VPC, S3, CloudFront, ElastiCache)",
      "Terraform",
      "Docker",
      "CI/CD (Codemagic)",
      "Fly.io",
      "Vercel",
      "Bastion hosts",
      "Private subnets",
    ],
    [t('categories.AI/ML')]: [
      "LLM integrations (OpenAI, Gemini)",
      "OCR (Gemini, custom pipelines)",
      "Embeddings (OpenAI, custom)",
      "pgvector",
      "AWS Bedrock",
      "Model evaluation",
      "Streaming LLM responses",
    ],
    [t('categories.Payments')]: [
      "PIX orchestration",
      "Multi-gateway routing",
      "Payment attribution",
      "Entitlements management",
      "Subscription systems",
      "RevenueCat integration",
      "Superwall paywalls",
    ],
    [t('categories.Data')]: [
      "PostgreSQL",
      "Redis",
      "S3 data lakes",
      "AWS Glue",
      "Athena queries",
      "Parquet files",
      "Data pipelines",
    ],
    [t('categories.Tools')]: [
      "Linear (project management)",
      "Retool (backoffice)",
      "n8n (automations)",
      "Posthog (analytics)",
      "Mixpanel (analytics)",
      "Firebase Crashlytics",
      "CloudWatch",
    ],
    [t('categories.Leadership')]: [
      "Technical direction",
      "Mentoring",
      "Hiring & onboarding",
      "Roadmap ownership",
      "Product alignment",
      "User research (30+ interviews)",
      "Usability testing (15+ tests)",
      "Process definition",
    ],
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<
      string,
      {
        border: string;
        text: string;
        bg: string;
        hover: string;
        dot: string;
        badgeBorder: string;
      }
    > = {
      "chart-1": {
        border: "border-l-chart-1",
        text: "text-chart-1",
        bg: "bg-chart-1/10",
        hover: "hover:bg-chart-1/20",
        dot: "bg-chart-1",
        badgeBorder: "border-chart-1/30",
      },
      "chart-2": {
        border: "border-l-chart-2",
        text: "text-chart-2",
        bg: "bg-chart-2/10",
        hover: "hover:bg-chart-2/20",
        dot: "bg-chart-2",
        badgeBorder: "border-chart-2/30",
      },
    };
    return colorMap[color] || colorMap["chart-2"];
  };

  const techColors = ["chart-1", "chart-2"];

  return (
    <section className="mb-16 md:mb-32" aria-labelledby="skills-heading">
      <h2
        id="skills-heading"
        className="mb-8 md:mb-12 bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-4xl"
      >
        {t('title')}
      </h2>

      <div className="space-y-6">
        {Object.entries(skillsByCategory).map(([category, skills]) => {
          const categoryColors = getColorClasses("chart-2");
          return (
            <Card
              key={category}
              className={`border-l-4 ${categoryColors.border} shadow-md transition-all duration-300 hover:shadow-lg`}
            >
              <CardHeader>
                <CardTitle className={`${categoryColors.text}`}>
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {skills.map((skill) => {
                    const skillColorsMap = getColorClasses("chart-2");
                    return (
                      <Badge
                        key={skill}
                        className={`${skillColorsMap.bg} ${skillColorsMap.text} ${skillColorsMap.badgeBorder} ${skillColorsMap.hover}`}
                      >
                        {skill}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}

        <Card className="border-l-4 border-l-chart-2 shadow-md transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-chart-2">{t('languages.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {languages.map((lang) => {
                const langColors = getColorClasses("chart-2");
                return (
                  <div
                    key={lang.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span
                      className={`font-medium ${langColors.text} flex items-center gap-2`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                    <span className="text-muted-foreground">{lang.level}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-chart-2 shadow-md transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-chart-2">{t('certifications.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {certifications.map((cert, idx) => {
                const certColors = getColorClasses("chart-2");
                return (
                  <li key={cert} className="flex items-start gap-2">
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${certColors.dot}`}
                    />
                    <span>{cert}</span>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

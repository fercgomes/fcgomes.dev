"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import {
  Server,
  Layout,
  Cloud,
  Database,
  Brain,
  CreditCard,
  Wrench,
  Sparkles,
  Share2,
} from "lucide-react";
import { ShareModal, useShareModal } from "@/components/share-modal";
import { usePostHogTracking } from "@/lib/posthog";

type ScopeKey =
  | "backend"
  | "frontend"
  | "infra"
  | "data"
  | "ai"
  | "payments"
  | "tools"
  | "leadership";

const scopeConfig: Record<
  ScopeKey,
  { label: string; icon: React.ReactNode }
> = {
  backend: { label: "Backend", icon: <Server className="h-4 w-4" /> },
  frontend: { label: "Frontend", icon: <Layout className="h-4 w-4" /> },
  infra: { label: "Infra", icon: <Cloud className="h-4 w-4" /> },
  data: { label: "Data", icon: <Database className="h-4 w-4" /> },
  ai: { label: "AI/ML", icon: <Brain className="h-4 w-4" /> },
  payments: { label: "Payments", icon: <CreditCard className="h-4 w-4" /> },
  tools: { label: "Tools", icon: <Wrench className="h-4 w-4" /> },
  leadership: { label: "Leadership", icon: <Sparkles className="h-4 w-4" /> },
};

const scopeTone: Record<
  ScopeKey,
  {
    chipBg: string;
    chipText: string;
    chipBorder: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    badgeHover: string;
    badgeActiveBg: string;
    badgeActiveBorder: string;
  }
> = {
  backend: {
    chipBg: "bg-emerald-100",
    chipText: "text-emerald-800",
    chipBorder: "border-emerald-200",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-800",
    badgeBorder: "border-emerald-200",
    badgeHover: "hover:bg-emerald-200 hover:border-emerald-300",
    badgeActiveBg: "bg-emerald-200",
    badgeActiveBorder: "border-emerald-300",
  },
  frontend: {
    chipBg: "bg-blue-100",
    chipText: "text-blue-800",
    chipBorder: "border-blue-200",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800",
    badgeBorder: "border-blue-200",
    badgeHover: "hover:bg-blue-200 hover:border-blue-300",
    badgeActiveBg: "bg-blue-200",
    badgeActiveBorder: "border-blue-300",
  },
  infra: {
    chipBg: "bg-amber-100",
    chipText: "text-amber-800",
    chipBorder: "border-amber-200",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800",
    badgeBorder: "border-amber-200",
    badgeHover: "hover:bg-amber-200 hover:border-amber-300",
    badgeActiveBg: "bg-amber-200",
    badgeActiveBorder: "border-amber-300",
  },
  data: {
    chipBg: "bg-violet-100",
    chipText: "text-violet-800",
    chipBorder: "border-violet-200",
    badgeBg: "bg-violet-100",
    badgeText: "text-violet-800",
    badgeBorder: "border-violet-200",
    badgeHover: "hover:bg-violet-200 hover:border-violet-300",
    badgeActiveBg: "bg-violet-200",
    badgeActiveBorder: "border-violet-300",
  },
  ai: {
    chipBg: "bg-cyan-100",
    chipText: "text-cyan-800",
    chipBorder: "border-cyan-200",
    badgeBg: "bg-cyan-100",
    badgeText: "text-cyan-800",
    badgeBorder: "border-cyan-200",
    badgeHover: "hover:bg-cyan-200 hover:border-cyan-300",
    badgeActiveBg: "bg-cyan-200",
    badgeActiveBorder: "border-cyan-300",
  },
  payments: {
    chipBg: "bg-rose-100",
    chipText: "text-rose-800",
    chipBorder: "border-rose-200",
    badgeBg: "bg-rose-100",
    badgeText: "text-rose-800",
    badgeBorder: "border-rose-200",
    badgeHover: "hover:bg-rose-200 hover:border-rose-300",
    badgeActiveBg: "bg-rose-200",
    badgeActiveBorder: "border-rose-300",
  },
  tools: {
    chipBg: "bg-slate-100",
    chipText: "text-slate-800",
    chipBorder: "border-slate-200",
    badgeBg: "bg-slate-100",
    badgeText: "text-slate-800",
    badgeBorder: "border-slate-200",
    badgeHover: "hover:bg-slate-200 hover:border-slate-300",
    badgeActiveBg: "bg-slate-200",
    badgeActiveBorder: "border-slate-300",
  },
  leadership: {
    chipBg: "bg-indigo-100",
    chipText: "text-indigo-800",
    chipBorder: "border-indigo-200",
    badgeBg: "bg-indigo-100",
    badgeText: "text-indigo-800",
    badgeBorder: "border-indigo-200",
    badgeHover: "hover:bg-indigo-200 hover:border-indigo-300",
    badgeActiveBg: "bg-indigo-200",
    badgeActiveBorder: "border-indigo-300",
  },
};

type Skill = { name: string; scope: ScopeKey };

export function Skills() {
  const t = useTranslations("skills");
  const tShare = useTranslations("share");
  const searchParams = useSearchParams();
  const highlight = searchParams.get("skill")?.toLowerCase();
  const { open: shareOpen, setOpen: setShareOpen, openShare } = useShareModal("cta-skills");
  const { track } = usePostHogTracking();

  const skills: Skill[] = useMemo(
    () => [
      // Backend / Core Eng
      { name: "TypeScript/Node", scope: "backend" },
      { name: "NestJS", scope: "backend" },
      { name: "Fastify", scope: "backend" },
      { name: "Python", scope: "backend" },
      { name: "Java", scope: "backend" },
      { name: "Express.js", scope: "backend" },
      { name: "Flask", scope: "backend" },
      { name: "Django", scope: "backend" },
      { name: "Node.js", scope: "backend" },
      { name: "KnexJS", scope: "backend" },
      { name: "Bull Queues", scope: "backend" },
      { name: "OAuth", scope: "backend" },
      { name: "JWT", scope: "backend" },
      { name: "Swagger / OpenAPI", scope: "backend" },
      { name: "REST APIs", scope: "backend" },
      { name: "Socket.io", scope: "backend" },
      { name: "WebSockets", scope: "backend" },
      { name: "End-to-end Testing", scope: "backend" },
      { name: "Integration Testing", scope: "backend" },
      { name: "Jest", scope: "backend" },
      { name: "Problem Solving", scope: "backend" },
      { name: "Systems Design", scope: "backend" },
      { name: "Software Architecture", scope: "backend" },
      { name: "Software Development", scope: "backend" },
      { name: "Application Programming Interfaces (API)", scope: "backend" },
      { name: "Optimizing Performance", scope: "backend" },
      { name: "Stress Test", scope: "backend" },
      { name: "Scalability", scope: "backend" },
      { name: "Distributed systems", scope: "backend" },
      { name: "DDD", scope: "backend" },
      { name: "Event-driven", scope: "backend" },
      { name: "Caching strategies", scope: "backend" },
      { name: "Async pipelines", scope: "backend" },
      { name: "Microservices", scope: "backend" },
      { name: "Monolith to microservices", scope: "backend" },

      // Frontend / Mobile
      { name: "React", scope: "frontend" },
      { name: "Next.js", scope: "frontend" },
      { name: "React Native", scope: "frontend" },
      { name: "Flutter", scope: "frontend" },
      { name: "Dart", scope: "frontend" },
      { name: "Tailwind CSS", scope: "frontend" },
      { name: "shadcn/ui", scope: "frontend" },
      { name: "Localization (l10n)", scope: "frontend" },
      { name: "Internationalization (i18n)", scope: "frontend" },
      { name: "Mobile Applications", scope: "frontend" },

      // Infra / DevOps / Cloud
      { name: "AWS (ECS, RDS, VPC, S3, CloudFront, ElastiCache)", scope: "infra" },
      { name: "Amazon EC2", scope: "infra" },
      { name: "AWS Lambda", scope: "infra" },
      { name: "Amazon CloudWatch", scope: "infra" },
      { name: "Amazon Route 53", scope: "infra" },
      { name: "AWS Glue", scope: "infra" },
      { name: "Amazon Athena", scope: "infra" },
      { name: "Amazon S3", scope: "infra" },
      { name: "Amazon CloudFront", scope: "infra" },
      { name: "Amazon VPC", scope: "infra" },
      { name: "Amazon ElastiCache", scope: "infra" },
      { name: "Amazon RDS", scope: "infra" },
      { name: "Amazon ECS", scope: "infra" },
      { name: "AWS CloudFormation", scope: "infra" },
      { name: "Terraform", scope: "infra" },
      { name: "Docker", scope: "infra" },
      { name: "Docker Products", scope: "infra" },
      { name: "CI/CD (Codemagic)", scope: "infra" },
      { name: "Fly.io", scope: "infra" },
      { name: "Vercel", scope: "infra" },
      { name: "Cloudflare", scope: "infra" },
      { name: "Private Clouds", scope: "infra" },
      { name: "Bastion hosts", scope: "infra" },
      { name: "Private subnets", scope: "infra" },
      { name: "DevOps", scope: "infra" },
      { name: "Continuous Integration and Continuous Delivery (CI/CD)", scope: "infra" },
      { name: "Administração de sistemas Linux", scope: "infra" },
      { name: "Linux", scope: "infra" },

      // AI/ML
      { name: "LLM integrations (OpenAI, Gemini)", scope: "ai" },
      { name: "OCR pipelines", scope: "ai" },
      { name: "Embeddings (OpenAI, custom)", scope: "ai" },
      { name: "AWS Bedrock", scope: "ai" },
      { name: "Streaming LLM responses", scope: "ai" },
      { name: "Prompt Engineering", scope: "ai" },
      { name: "LLMOps", scope: "ai" },
      { name: "Large Language Models (LLM)", scope: "ai" },

      // Data
      { name: "pgvector", scope: "data" },
      { name: "S3 data lakes", scope: "data" },
      { name: "AWS Glue", scope: "data" },
      { name: "Athena queries", scope: "data" },
      { name: "Parquet", scope: "data" },
      { name: "Data pipelines", scope: "data" },
      { name: "Data Engineering", scope: "data" },
      { name: "Relational Databases", scope: "data" },
      { name: "Data Modeling", scope: "data" },
      { name: "PostgreSQL", scope: "data" },
      { name: "Redis", scope: "data" },
      { name: "SQL", scope: "data" },
      { name: "MinION Object Storage Suite", scope: "data" },

      // Payments
      { name: "PIX orchestration", scope: "payments" },
      { name: "Multi-gateway routing", scope: "payments" },
      { name: "Payment attribution", scope: "payments" },
      { name: "Entitlements management", scope: "payments" },
      { name: "Subscription systems", scope: "payments" },
      { name: "RevenueCat", scope: "payments" },
      { name: "Superwall", scope: "payments" },
      { name: "Mobile Payments", scope: "payments" },
      { name: "Emerging Payments", scope: "payments" },
      { name: "Payments", scope: "payments" },

      // Tools / Observability / Product
      { name: "Linear", scope: "tools" },
      { name: "Retool", scope: "tools" },
      { name: "n8n", scope: "tools" },
      { name: "PostHog", scope: "tools" },
      { name: "Mixpanel", scope: "tools" },
      { name: "Firebase", scope: "tools" },
      { name: "Firebase Crashlytics", scope: "tools" },
      { name: "Sentry", scope: "tools" },
      { name: "Grafana", scope: "tools" },
      { name: "Software Observability", scope: "tools" },
      { name: "Technology Roadmapping", scope: "tools" },
      { name: "Product Launch", scope: "tools" },
      { name: "Product Development", scope: "tools" },
      { name: "Git", scope: "tools" },
      { name: "CloudWatch", scope: "tools" },

      // Leadership
      { name: "Technical direction", scope: "leadership" },
      { name: "Technical Leadership", scope: "leadership" },
      { name: "Cross-functional Team Leadership", scope: "leadership" },
      { name: "Mentoring", scope: "leadership" },
      { name: "Hiring", scope: "leadership" },
      { name: "Hiring & onboarding", scope: "leadership" },
      { name: "Roadmap ownership", scope: "leadership" },
      { name: "Product alignment", scope: "leadership" },
      { name: "User research", scope: "leadership" },
      { name: "Usability testing", scope: "leadership" },
      { name: "Process definition", scope: "leadership" },
      { name: "Agile Project Management", scope: "leadership" },
      { name: "Metodologias Agile", scope: "leadership" },
      { name: "Kanban", scope: "leadership" },
    ],
    []
  );

  const grouped = useMemo(() => {
    const byScope: Record<ScopeKey, Skill[]> = {
      backend: [],
      frontend: [],
      infra: [],
      data: [],
      ai: [],
      payments: [],
      tools: [],
      leadership: [],
    };
    skills.forEach((skill) => byScope[skill.scope].push(skill));
    return byScope;
  }, [skills]);

  const languages = [
    { name: t("languages.english.name"), level: t("languages.english.level") },
    { name: t("languages.swedish.name"), level: t("languages.swedish.level") },
    { name: t("languages.french.name"), level: t("languages.french.level") },
    { name: t("languages.spanish.name"), level: t("languages.spanish.level") },
  ];

  const certifications = t.raw("certifications.items") as string[];

  return (
    <section className="mb-16 md:mb-32" aria-labelledby="skills-heading">
      <h2
        id="skills-heading"
        className="mb-4 md:mb-6 bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-4xl"
      >
        {t("title")}
      </h2>

      <div className="mb-8 md:mb-12 flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
        <p className="flex-1 text-sm text-muted-foreground">
          {tShare("skillsCta")}
        </p>
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

      <ShareModal open={shareOpen} onOpenChange={setShareOpen} utmContent="cta-skills" />

      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(grouped).map(([scope, scopeSkills]) => {
          const conf = scopeConfig[scope as ScopeKey];
          const tone = scopeTone[scope as ScopeKey];

          return (
            <Card key={scope} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full ${tone.chipBg} ${tone.chipText} ${tone.chipBorder}`}>
                  {conf.icon}
                </div>
                <CardTitle className="flex items-center gap-2">
                  {conf.label}
                  <span className="text-xs font-medium text-muted-foreground">
                    {scopeSkills.length} skills
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {scopeSkills.map((skill) => {
                    const active = highlight && skill.name.toLowerCase() === highlight;
                    return (
                      <Link
                        key={skill.name}
                        href={`/skills?skill=${encodeURIComponent(skill.name)}`}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                          active
                            ? `${tone.badgeActiveBg} ${tone.badgeActiveBorder} ${tone.badgeText}`
                            : `${tone.badgeBg} ${tone.badgeBorder} ${tone.badgeText} ${tone.badgeHover}`
                        }`}
                        title={skill.name}
                onClick={() =>
                  track("skill_badge_clicked", {
                    skill: skill.name,
                    scope: skill.scope,
                    source: "skills_page",
                  })
                }
                      >
                        {skill.name}
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Separator className="my-8" />

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-chart-2">{t("languages.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {languages.map((lang) => (
                <div key={lang.name} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{lang.name}</span>
                  <span className="text-muted-foreground">{lang.level}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-chart-2">{t("certifications.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {certifications.map((cert) => (
                <li key={cert} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

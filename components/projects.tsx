"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ImageLightbox } from "@/components/image-lightbox";
import { useTranslations } from 'next-intl';

type ProjectDescription = {
  overview?: string;
  features?: string[];
  highlights?: string[];
  metrics?: string[];
};

export function Projects() {
  const t = useTranslations('projects');
  
  const projectKeys = [
    "fokvs-core-api",
    "fokvs-checkout",
    "fokvs-app",
    "fokvs-web",
    "infrastructure",
    "ai-question-scan",
    "document-embeddings-pipeline",
    "anyfunnel",
    "fokvs-discord-bot",
    "fokvs-voice-bot",
    "n8n-automations",
    "fokvs-handbook",
  ];
  
  const projects = projectKeys.map((key) => {
    const projectData = t.raw(`items.${key}`) as {
      overview: string;
      features: string[];
      highlights: string[];
    };
    
    return {
      name: key,
      description: projectData,
      tech: getTechForProject(key),
      color: "chart-2",
      images: getImagesForProject(key),
    };
  });
  
  function getTechForProject(key: string): string[] {
    const techMap: Record<string, string[]> = {
      "fokvs-core-api": ["NestJS", "TypeScript", "Postgres", "Jest", "Docker", "Redis", "Bull"],
      "fokvs-checkout": ["React", "Fastify", "TypeScript", "Terraform", "DDD", "Inversify"],
      "fokvs-app": ["Flutter", "Dart", "Firebase", "Codemagic"],
      "fokvs-web": ["Next.js", "TypeScript", "Tailwind", "Vercel"],
      "infrastructure": ["AWS", "Terraform", "ECS", "RDS", "CloudFront", "VPC"],
      "ai-question-scan": ["Flutter", "OpenAI", "LLM", "OCR", "Mobile"],
      "document-embeddings-pipeline": ["Python", "Gemini", "OpenAI", "pgvector", "Bedrock", "S3"],
      "anyfunnel": ["Python", "FastAPI", "AWS", "S3", "Athena", "React Flow"],
      "fokvs-discord-bot": ["Discord.js", "OpenAI", "Node.js"],
      "fokvs-voice-bot": ["Discord.js", "GPT-Realtime", "Voice"],
      "n8n-automations": ["n8n", "Automation", "Email", "WhatsApp"],
      "fokvs-handbook": ["Astro", "TypeScript", "Terraform", "Cloudflare"],
    };
    return techMap[key] || [];
  }
  
  function getImagesForProject(key: string): string[] {
    const imageMap: Record<string, string[]> = {
      "fokvs-checkout": [
        "/media/images/checkout_dashboard_01.png",
        "/media/images/checkout_dashboard_02.png",
      ],
      "anyfunnel": ["/media/images/anyfunnel.png"],
      "fokvs-handbook": [
        "/media/images/handbook.png",
        "/media/images/zero_trust.png",
      ],
    };
    return imageMap[key] || [];
  }

  const getColorClasses = (color: string) => {
    const colorMap: Record<
      string,
      {
        border: string;
        text: string;
        bg: string;
        hover: string;
        badgeBorder: string;
      }
    > = {
      "chart-1": {
        border: "border-l-chart-1",
        text: "text-chart-1",
        bg: "bg-chart-1/10",
        hover: "hover:bg-chart-1/20",
        badgeBorder: "border-chart-1/30",
      },
      "chart-2": {
        border: "border-l-chart-2",
        text: "text-chart-2",
        bg: "bg-chart-2/10",
        hover: "hover:bg-chart-2/20",
        badgeBorder: "border-chart-2/30",
      },
    };
    return colorMap[color] || colorMap["chart-2"];
  };

  const techColors = ["chart-1", "chart-2"];

  return (
    <section className="mb-16 md:mb-32" aria-labelledby="projects-heading">
      <h2
        id="projects-heading"
        className="mb-8 md:mb-12 bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-4xl"
      >
        {t('title')}
      </h2>
      <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:gap-8">
        {projects.map((project) => {
          const colors = getColorClasses(project.color);
          const desc = project.description as ProjectDescription;
          return (
            <Card
              key={project.name}
              className={`border-l-4 ${colors.border} shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden`}
            >
              <CardHeader>
                <CardTitle className={`text-lg font-mono ${colors.text}`}>
                  {project.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {desc.overview && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {desc.overview}
                  </p>
                )}

                {desc.features && desc.features.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
                      {t('features')}
                    </h4>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {desc.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {desc.highlights && desc.highlights.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
                      {t('highlights')}
                    </h4>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {desc.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.images && project.images.length > 0 && (
                  <div className="space-y-2">
                    <Separator />
                    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                      {project.images.map((image, idx) => (
                        <ImageLightbox
                          key={idx}
                          src={image}
                          alt={`${project.name} screenshot ${idx + 1}`}
                          title={project.name}
                          description={`Screenshot ${idx + 1} of ${project.name}`}
                        >
                          <div className="relative w-full aspect-video bg-muted rounded-md overflow-hidden border border-border">
                            <Image
                              src={image}
                              alt={`${project.name} screenshot ${idx + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 50vw"
                              loading="lazy"
                            />
                          </div>
                        </ImageLightbox>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tech.map((tech) => {
                    const techColorsMap = getColorClasses("chart-2");
                    return (
                      <Badge
                        key={tech}
                        className={`${techColorsMap.bg} ${techColorsMap.text} ${techColorsMap.badgeBorder} text-xs ${techColorsMap.hover}`}
                      >
                        {tech}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

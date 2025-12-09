"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ImageLightbox } from "@/components/image-lightbox";
import { useTranslations } from 'next-intl';
import { usePostHogTracking } from "@/lib/posthog";
import { useEffect, useRef, useMemo, useState } from 'react';
import { Link } from "@/i18n/routing";
import { FeaturedMediaCarousel } from "./featured-media-carousel";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { ShareModal, useShareModal } from "@/components/share-modal";

type ProjectDescription = {
  overview?: string;
  features?: string[];
  highlights?: string[];
  metrics?: string[];
};

type RepoMeta = {
  id: string;
  owner: string;
  name: string;
  url: string;
  vibecoded?: boolean;
  category: "personal" | "course";
};

type RepoData = {
  id: string;
  fullName: string;
  description?: string;
  stars?: number;
  forks?: number;
  updatedAt?: string;
  url: string;
  vibecoded?: boolean;
  category: "personal" | "course";
  isLoaded: boolean;
};

export function Projects() {
  const t = useTranslations('projects');
  const tShare = useTranslations('share');
  const { track } = usePostHogTracking();
  const projectRefs = useRef<Map<string, boolean>>(new Map());
  const [githubRepos, setGithubRepos] = useState<Record<string, RepoData>>({});
  const [reposLoaded, setReposLoaded] = useState(false);
  const [reposError, setReposError] = useState(false);
  const { open: shareOpen, setOpen: setShareOpen, openShare } = useShareModal("cta-projects");

  const repoList: RepoMeta[] = [
    { id: "unisim", owner: "fercgomes", name: "unisim", url: "https://github.com/fercgomes/unisim", vibecoded: true, category: "personal" },
    { id: "finirig", owner: "fercgomes", name: "finirig", url: "https://github.com/fercgomes/finirig", vibecoded: true, category: "personal" },
    { id: "Punkchain", owner: "fercgomes", name: "Punkchain", url: "https://github.com/fercgomes/Punkchain", vibecoded: false, category: "personal" },
    { id: "putrefactos", owner: "fercgomes", name: "putrefactos", url: "https://github.com/fercgomes/putrefactos", vibecoded: false, category: "personal" },
    { id: "churrosfm", owner: "fercgomes", name: "churrosfm", url: "https://github.com/fercgomes/churrosfm", vibecoded: true, category: "course" },
  ];

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const results = await Promise.all(
          repoList.map(async (repo) => {
            try {
              const res = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.name}`);
              if (!res.ok) throw new Error("Failed");
              const data = await res.json();
              return {
                id: repo.id,
                fullName: data.full_name ?? `${repo.owner}/${repo.name}`,
                description: data.description ?? "",
                stars: data.stargazers_count ?? 0,
                forks: data.forks_count ?? 0,
                updatedAt: data.updated_at ?? "",
                url: repo.url,
                vibecoded: repo.vibecoded,
                category: repo.category,
                isLoaded: true,
              } as RepoData;
            } catch {
              return {
                id: repo.id,
                fullName: `${repo.owner}/${repo.name}`,
                description: "",
                url: repo.url,
                vibecoded: repo.vibecoded,
                category: repo.category,
                isLoaded: false,
              } as RepoData;
            }
          })
        );
        const map: Record<string, RepoData> = {};
        results.forEach((r) => {
          map[r.id] = r;
        });
        setGithubRepos(map);
        setReposLoaded(true);
      } catch {
        setReposError(true);
      }
    };
    fetchRepos();
  }, []);
  
  const categories = useMemo(
    () => [
      {
        key: "work",
        title: t("categories.work"),
        description: t("categories.workDesc"),
        items: [
          "fokvs-core-api",
          "fokvs-checkout",
          "fokvs-app",
          "fokvs-web",
          "infrastructure",
          "ai-question-scan",
          "document-embeddings-pipeline",
          "anyfunnel",
          "n8n-automations",
          "fokvs-handbook",
          "fokvs-discord-bot",
          "fokvs-voice-bot",
        ],
      },
      {
        key: "personal",
        title: t("categories.personal"),
        description: t("categories.personalDesc"),
        items: ["unisim", "finirig", "Punkchain", "putrefactos"],
      },
      {
        key: "course",
        title: t("categories.course"),
        description: t("categories.courseDesc"),
        items: ["churrosfm"],
      },
    ],
    [t]
  );

  const projectLookup = (key: string) => {
    if (githubRepos[key]) {
      const repo = githubRepos[key];
      return {
        name: repo.fullName,
        description: {
          overview: repo.description || t("github.noDescription"),
        },
        tech: [],
        color: "chart-2",
        images: [],
        repoStats: repo,
      };
    }

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
  };
  
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
      "unisim": ["/media/images/unisim.png"],
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
        className="mb-4 md:mb-6 bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-4xl"
      >
        {t('title')}
      </h2>
      <p className="text-sm md:text-base text-muted-foreground mb-6">
        {t('subtitle')}
      </p>

      <div className="mb-10 flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
        <p className="flex-1 text-sm text-muted-foreground">
          {tShare("projectsCta")}
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

      <FeaturedMediaCarousel />
      
      <ShareModal open={shareOpen} onOpenChange={setShareOpen} utmContent="cta-projects" />

      <div className="flex flex-wrap gap-2 mb-8 text-sm">
        {[
          { href: "#work", label: t("categories.work") },
          { href: "#personal", label: t("categories.personal") },
          { href: "#course", label: t("categories.course") },
        ].map((toc) => (
          <a
            key={toc.href}
            href={toc.href}
            className="inline-flex items-center gap-2 rounded-full border border-chart-2/40 bg-chart-2/5 px-3 py-1.5 text-chart-2 hover:border-chart-2/70 hover:bg-chart-2/10 transition-colors"
            onClick={() =>
              track("projects_toc_clicked", {
                target: toc.href.replace("#", ""),
              })
            }
          >
            {toc.label}
          </a>
        ))}
      </div>

      <div className="space-y-10">
        {categories.map((category) => {
          const projects = category.items
            .map((key) => projectLookup(key))
            .filter(Boolean);

          return (
            <div
              key={category.key}
              id={category.key}
              className="space-y-4 rounded-2xl border border-border/50 bg-muted/20 p-4 md:p-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                {category.description && (
                  <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                )}
                {category.key === "personal" && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("personalDisclaimer")}
                  </p>
                )}
              </div>

              {projects.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  {t("noProjects")}
                </p>
              ) : (
                <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:gap-8">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.name}
                      project={project}
                      colors={getColorClasses(project.color)}
                      desc={project.description as ProjectDescription}
                      t={t}
                      track={track}
                      projectRefs={projectRefs}
                      getColorClasses={getColorClasses}
                      repoStats={"repoStats" in project ? project.repoStats : undefined}
                    />
                  ))}
                </div>
              )}

              <div className="flex justify-end">
                <a
                  href="#projects-heading"
                  className="text-sm text-chart-2 hover:text-chart-2/80 transition-colors"
                  onClick={() =>
                    track("back_to_top_clicked", {
                      section: "projects",
                      target: "projects-heading",
                    })
                  }
                >
                  {t("backToTop")}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  colors,
  desc,
  t,
  track,
  projectRefs,
  getColorClasses,
  repoStats,
}: {
  project: { name: string; images?: string[]; tech: string[] };
  colors: { border: string; text: string; bg: string; hover: string; badgeBorder: string };
  desc: ProjectDescription;
  t: ReturnType<typeof useTranslations<'projects'>>;
  track: ReturnType<typeof usePostHogTracking>['track'];
  projectRefs: React.MutableRefObject<Map<string, boolean>>;
  getColorClasses: (color: string) => { border: string; text: string; bg: string; hover: string; badgeBorder: string };
  repoStats?: RepoData;
}) {
  const projectRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!projectRef.current || projectRefs.current.get(project.name)) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !projectRefs.current.get(project.name)) {
            projectRefs.current.set(project.name, true);
            track('project_viewed', {
              project_name: project.name,
              has_images: (project.images?.length || 0) > 0,
            });
          }
        });
      },
      { threshold: 0.5 }
    );
    
    observer.observe(projectRef.current);
    return () => observer.disconnect();
  }, [project.name, track, projectRefs, project.images]);
  
  return (
    <Card
      ref={projectRef}
      className={`h-full flex flex-col border-l-4 ${colors.border} shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden`}
    >
      <CardHeader className="space-y-3">
        <CardTitle className={`text-lg font-mono ${colors.text}`}>
          {project.name}
        </CardTitle>
        {repoStats && (
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/40 text-[11px]">
              {t("github.repoBadge")}
            </Badge>
            {repoStats.vibecoded && (
              <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/40 text-[11px]">
                {t("github.vibecoded")}
              </Badge>
            )}
            <span>★ {repoStats.stars ?? "–"}</span>
            <span>⑂ {repoStats.forks ?? "–"}</span>
            {repoStats.updatedAt && (
              <span>
                {t("github.updated", {
                  date: repoStats.updatedAt
                    ? new Date(repoStats.updatedAt).toLocaleDateString()
                    : "",
                })}
              </span>
            )}
            <a
              href={repoStats.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-chart-2 hover:text-chart-2/80 font-semibold"
              onClick={() =>
                track("external_link_clicked", {
                  platform: "github",
                  destination: repoStats.id,
                  source: "projects_github",
                })
              }
            >
              {t("github.viewRepo")}
            </a>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
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
                  imageId={`${project.name}-screenshot-${idx + 1}`}
                  section="projects"
                  projectName={project.name}
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

        {repoStats && (
          <div className="pt-3 border-t border-border/60 text-xs text-muted-foreground flex flex-wrap items-center gap-3">
            <span>★ {repoStats.stars ?? "–"}</span>
            <span>⑂ {repoStats.forks ?? "–"}</span>
            {repoStats.updatedAt && (
              <span>
                {t("github.updated", {
                  date: repoStats.updatedAt
                    ? new Date(repoStats.updatedAt).toLocaleDateString()
                    : "",
                })}
              </span>
            )}
            <a
              href={repoStats.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-chart-2 hover:text-chart-2/80 font-semibold"
              onClick={() =>
                track("external_link_clicked", {
                  platform: "github",
                  destination: repoStats.id,
                  source: "projects_github",
                })
              }
            >
              {t("github.viewRepo")}
            </a>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tech.map((tech) => {
            const techColorsMap = getColorClasses("chart-2");
            return (
              <Link
                key={tech}
                href={`/skills?skill=${encodeURIComponent(tech)}`}
                className={`${techColorsMap.bg} ${techColorsMap.text} ${techColorsMap.badgeBorder} text-xs ${techColorsMap.hover} inline-flex items-center gap-1.5 rounded-full border px-2 py-1 transition-colors`}
                onClick={() =>
                  track("skill_badge_clicked", {
                    skill: tech,
                    source: "projects_tech_badge",
                  })
                }
              >
                {tech}
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

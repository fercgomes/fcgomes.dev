import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ImageLightbox } from "@/components/image-lightbox";

type ProjectDescription = {
  overview?: string;
  features?: string[];
  highlights?: string[];
  metrics?: string[];
};

export function Projects() {
  const projects = [
    {
      name: "fokvs-core-api",
      description: {
        overview: "REST API in NestJS, TypeScript, Postgres. Core application logic powering the entire Fokvs platform.",
        features: [
          "Users, enrollments, materials, flashcards, and scan management",
          "Ambassador program with transactional ledger system",
          "LLM streaming for real-time AI responses",
          "Async processing with Bull Queues for background jobs",
        ],
        highlights: ["90%+ test coverage with Jest", "Dockerized for consistent deployments", "Redis for caching and queue management"],
      },
      tech: ["NestJS", "TypeScript", "Postgres", "Jest", "Docker", "Redis", "Bull"],
      color: "chart-2",
      images: [],
    },
    {
      name: "fokvs-checkout",
      description: {
        overview: "Payment gateway-agnostic checkout system with comprehensive analytics and monitoring. Built with Domain-Driven Design principles.",
        features: [
          "Multi-gateway integration: Asaas, Pagarme, MercadoPago, AbacatePay",
          "RevenueCat and Superwall integration for subscription management",
          "Real-time analytics dashboard with conversion funnels",
          "Meta Marketing API integration for attribution",
        ],
        highlights: [
          "95%+ test coverage (unit + E2E)",
          "React + Vite frontend with Fastify backend",
          "Inversify DI for clean architecture",
          "Fully managed with Terraform",
        ],
      },
      tech: ["React", "Fastify", "TypeScript", "Terraform", "DDD", "Inversify"],
      color: "chart-2",
      images: [
        "/media/images/checkout_dashboard_01.png",
        "/media/images/checkout_dashboard_02.png",
      ],
    },
    {
      name: "fokvs-app",
      description: {
        overview: "Mobile app in Flutter delivering the complete Fokvs learning experience to students.",
        features: [
          "AI Question Scan: scan exercises for step-by-step LLM solutions",
          "Flashcards with Spaced Repetition System (SRS)",
          "Material sharing and discovery",
          "Ambassador dashboard for program participants",
        ],
        highlights: [
          "CI/CD pipeline on Codemagic",
          "Firebase Crashlytics for error monitoring",
          "Processed 30K+ question scans by 13K+ users",
        ],
      },
      tech: ["Flutter", "Dart", "Firebase", "Codemagic"],
      color: "chart-2",
      images: [],
    },
    {
      name: "fokvs-web",
      description: {
        overview: "Next.js web platform optimized for SEO and user acquisition.",
        features: [
          "Server-side rendering for better SEO performance",
          "TypeScript + Tailwind CSS + DaisyUI for modern UI",
          "Responsive design for all devices",
        ],
        highlights: [
          "Deployed on Vercel for optimal performance",
          "Previously hosted on Fly.io before migration",
          "Focused on organic growth and discoverability",
        ],
      },
      tech: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
      color: "chart-2",
      images: [],
    },
    {
      name: "Infrastructure",
      description: {
        overview: "Production-grade AWS infrastructure designed for scale, security, and reliability.",
        features: [
          "ECS Fargate with Docker containers and autoscaling",
          "RDS Postgres with automated backups",
          "ElastiCache Redis for caching and session management",
          "CloudFront CDN for global edge caching",
        ],
        highlights: [
          "Private subnets with bastion hosts for secure access",
          "Fully observable with CloudWatch dashboards",
          "100% Infrastructure as Code with Terraform",
          "Zero-downtime migration from Fly.io",
        ],
      },
      tech: ["AWS", "Terraform", "ECS", "RDS", "CloudFront", "VPC"],
      color: "chart-2",
      images: [],
    },
    {
      name: "AI Question Scan",
      description: {
        overview: "Mobile feature enabling students to scan exercises and receive instant step-by-step LLM solutions.",
        features: [
          "Real-time image processing and OCR",
          "OpenAI GPT integration for solution generation",
          "Step-by-step explanations tailored to student level",
        ],
        highlights: [
          "Processed 30K+ scans by 13K+ users",
          "Initial version optimized for direct image processing",
          "Key driver for subscription growth",
        ],
      },
      tech: ["Flutter", "OpenAI", "LLM", "OCR", "Mobile"],
      color: "chart-2",
      images: [],
    },
    {
      name: "Document Embeddings Pipeline",
      description: {
        overview: "OCR + embedding system powering intelligent search and recommendations across 18K+ documents.",
        features: [
          "Dual approach: Gemini OCR + OpenAI embeddings + pgvector",
          "Alternative: AWS Bedrock + S3 vectors variant",
          "Semantic search and document retrieval",
          "Personalized content recommendations",
        ],
        highlights: [
          "Processes 18K+ educational documents",
          "Vector similarity search with pgvector",
          "Powers discovery and recommendation features",
        ],
      },
      tech: ["Python", "Gemini", "OpenAI", "pgvector", "Bedrock", "S3"],
      color: "chart-2",
      images: [],
    },
    {
      name: "anyfunnel",
      description: {
        overview: "Data lake project aggregating all Fokvs data for comprehensive sales funnel analysis and ROI path visualization.",
        features: [
          "Parquet files in S3 with AWS Glue Catalog",
          "Athena queries for ad-hoc analytics",
          "AI chat interface for natural language querying",
          "React Flow for interactive funnel visualizations",
        ],
        highlights: [
          "Meta Marketing API integration for attribution",
          "Python FastAPI backend with dashboard",
          "ROI path analysis and conversion optimization",
          "Real-time data pipeline processing",
        ],
      },
      tech: ["Python", "FastAPI", "AWS", "S3", "Athena", "React Flow"],
      color: "chart-2",
      images: ["/media/images/anyfunnel.png"],
    },
    {
      name: "fokvs-discord-bot",
      description: {
        overview: "Conversational Discord bot for the Fokvs community, providing tutoring and document access.",
        features: [
          "AI-powered tutoring using OpenAI",
          "Real-time document fetching from Fokvs sharing system",
          "Integration with Fokvs API for live data access",
        ],
        highlights: [
          "Active community engagement tool",
          "Seamless document sharing workflow",
        ],
      },
      tech: ["Discord.js", "OpenAI", "Node.js"],
      color: "chart-2",
      images: [],
    },
    {
      name: "fokvs-voice-bot",
      description: {
        overview: "Experimental Discord bot for voice-based learning assistance using real-time AI voice interaction.",
        features: [
          "Voice chat integration with Discord",
          "GPT-Realtime for natural voice conversations",
          "Real-time tutoring in voice channels",
        ],
        highlights: [
          "Experimental feature for voice-based learning",
          "Innovative approach to student engagement",
        ],
      },
      tech: ["Discord.js", "GPT-Realtime", "Voice"],
      color: "chart-2",
      images: [],
    },
    {
      name: "n8n Automations",
      description: {
        overview: "Workflow automation system for user engagement and operational efficiency.",
        features: [
          "Email campaigns for onboarding and engagement",
          "Push notifications for mobile app",
          "WhatsApp messaging for ambassador communications",
        ],
        highlights: [
          "Automated user onboarding flows",
          "Engagement campaigns and retention",
          "Ambassador program communications",
        ],
      },
      tech: ["n8n", "Automation", "Email", "WhatsApp"],
      color: "chart-2",
      images: [],
    },
    {
      name: "fokvs-handbook",
      description: {
        overview: "Internal employee handbook and process documentation platform. Comprehensive guide for development processes, quality principles, and tool usage.",
        features: [
          "Development process documentation with examples and checklists",
          "PRD templates and guidelines",
          "Quality principles and best practices",
          "Tool usage and combinations",
        ],
        highlights: [
          "Built with Astro for fast static generation",
          "Cloudflare Zero Trust for secure employee access",
          "Fully managed with Terraform",
          "Living documentation that evolves with the team",
        ],
      },
      tech: ["Astro", "TypeScript", "Terraform", "Cloudflare"],
      color: "chart-2",
      images: [
        "/media/images/handbook.png",
        "/media/images/zero_trust.png",
      ],
    },
  ];

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
    <section className="mb-20" aria-labelledby="projects-heading">
      <h2
        id="projects-heading"
        className="mb-8 bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-2xl font-bold tracking-tight text-transparent"
      >
        Projects
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => {
          const colors = getColorClasses(project.color);
          const desc = project.description as ProjectDescription;
          return (
            <Card
              key={project.name}
              className={`border-l-4 ${colors.border} shadow-md hover:shadow-lg transition-shadow overflow-hidden`}
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
                      Features
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
                      Highlights
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
                    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(project.images.length, 2)}, 1fr)` }}>
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
                              sizes="(max-width: 768px) 100vw, 50vw"
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

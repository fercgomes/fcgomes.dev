import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Projects() {
  const projects = [
    {
      name: "Payments Orchestration Engine",
      description: "Multi-gateway checkout with PIX, retries, idempotency, attribution, entitlements, and admin dashboard.",
      tech: ["Fastify", "TypeScript", "DDD", "Terraform", "React"],
      color: "chart-2",
    },
    {
      name: "AI Question Scan",
      description: "Mobile feature where students scan exercises and receive step-by-step LLM solutions; processed 30K+ scans.",
      tech: ["Flutter", "OpenAI", "LLM", "OCR", "Mobile"],
      color: "chart-2",
    },
    {
      name: "Document Embeddings Pipeline",
      description: "OCR + embedding system (Gemini + OpenAI + pgvector; Bedrock variant) powering search and recommendations across 18K+ documents.",
      tech: ["Python", "Gemini", "OpenAI", "pgvector", "Bedrock", "S3"],
      color: "chart-2",
    },
    {
      name: "Growth Funnel Analytics",
      description: "Ads → Checkout attribution using Meta API; improved signal quality and reporting accuracy to achieve 6× ROAS.",
      tech: ["Python", "FastAPI", "Meta API", "Athena", "S3", "React Flow"],
      color: "chart-2",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { border: string; text: string; bg: string; hover: string; badgeBorder: string }> = {
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
      <h2 id="projects-heading" className="mb-8 bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-2xl font-bold tracking-tight text-transparent">Projects</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => {
          const colors = getColorClasses(project.color);
          return (
            <Card key={project.name} className={`border-l-4 ${colors.border} shadow-md hover:shadow-lg transition-shadow`}>
              <CardHeader>
                <CardTitle className={`text-lg font-mono ${colors.text}`}>{project.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => {
                    const techColorsMap = getColorClasses("chart-2");
                    return (
                      <Badge key={tech} className={`${techColorsMap.bg} ${techColorsMap.text} ${techColorsMap.badgeBorder} text-xs ${techColorsMap.hover}`}>
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

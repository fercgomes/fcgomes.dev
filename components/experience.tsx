import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function Experience() {
  return (
    <section className="mb-32" aria-labelledby="experience-heading">
      <h2
        id="experience-heading"
        className="mb-12 bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl"
      >
        Experience
      </h2>

      <Card className="mb-6 border-l-4 border-l-chart-2 shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardHeader>
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <div>
              <CardTitle className="text-xl">Founding Engineer & CTO</CardTitle>
              <p className="text-muted-foreground">Fokvs (EdTech SaaS)</p>
            </div>
            <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/30">
              2023 - Present
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                Rebuilt the platform from a fragmented prototype into a unified
                NestJS + Postgres system, cutting infra cost{" "}
                <strong className="text-foreground">85%</strong> and enabling
                rapid product iteration.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                Owned backend, infra, mobile, web, AI, analytics, and growth —
                effectively a full-stack engineering org of one.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                Scaled product from{" "}
                <strong className="text-foreground">1K → 100K+ users</strong>;
                implemented reliability, observability, and performance
                foundations.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                Shipped AI features (Question Scan, Flashcards) used by{" "}
                <strong className="text-foreground">20K+ students</strong>;
                built OCR + LLM pipelines and moderation workflows; processed{" "}
                <strong className="text-foreground">30K+ scans</strong>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                Designed and built the payments engine (PIX + gateways) with
                retries, idempotency, attribution, and entitlements.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                Built document-processing pipeline for{" "}
                <strong className="text-foreground">18K+ materials</strong>{" "}
                (Gemini OCR + OpenAI embeddings + pgvector); created Bedrock +
                S3 vector variant powering search, retrieval, and
                recommendations.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                Grew subscriptions{" "}
                <strong className="text-foreground">0 → 300+</strong> and
                reduced churn{" "}
                <strong className="text-foreground">50% → 10%</strong> by
                instrumenting analytics, funnels, and experiments.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                Led AWS migration (ECS, RDS, Redis, CloudFront, VPC/Terraform)
                with <strong className="text-foreground">zero downtime</strong>;
                improved reliability and reduced overhead.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                Built data lake (S3 + Glue + Athena) supporting attribution,
                funnels, A/B tests, and internal reporting.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                Hired and mentored engineering team; set direction for
                architecture, QA, CI/CD, and product-engineering processes.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}

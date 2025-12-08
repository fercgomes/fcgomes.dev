import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function Journey() {
  return (
    <section className="mb-16 md:mb-32" aria-labelledby="journey-heading">
      <h2
        id="journey-heading"
        className="mb-8 md:mb-12 bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-4xl"
      >
        The Journey
      </h2>

      <Card className="border-l-4 border-l-chart-2 shadow-lg mb-4 md:mb-6 transition-all duration-300 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">Starting Point: The Monstrous Stack</CardTitle>
          <Badge className="mt-2 w-fit bg-chart-2/10 text-chart-2 border-chart-2/30">
            May 2023
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            When I joined as CTO in May 2023, I inherited a complex infrastructure that didn't match the scale or needs of the business:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">7 microservices in Python</strong> running on AWS Lambda
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">A separate API in Java</strong>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">3 different databases:</strong> Neo4j, MySQL, and DynamoDB
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">Flutter app</strong> and <strong className="text-foreground">React web platform</strong>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">R$600/month AWS costs</strong> for a handful of users with no monetization
              </span>
            </li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            There was no logical reasoning behind these choices—it was built incrementally based on what was known at the time, without considering scalability or cost efficiency.
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-2 shadow-lg mb-4 md:mb-6 transition-all duration-300 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">The First Migration: Simplification</CardTitle>
          <Badge className="mt-2 w-fit bg-chart-2/10 text-chart-2 border-chart-2/30">
            2023
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            My first major decision as CTO was to simplify the infrastructure. With no monetization and low usage, the complex setup wasn't justified. I proposed and executed:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">Single unified API in NestJS</strong>, built from scratch
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">PostgreSQL</strong> as the single source of truth
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">Rewrote the web platform in Next.js</strong> for better SEO
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">Hosted entirely on Fly.io</strong> for managed, affordable infrastructure
              </span>
            </li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            I wrote all the code for the new API and handled the migration. This foundation enabled rapid product iteration and set us up for growth.
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-2 shadow-lg mb-4 md:mb-6 transition-all duration-300 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">Migration Back to AWS</CardTitle>
          <Badge className="mt-2 w-fit bg-chart-2/10 text-chart-2 border-chart-2/30">
            2024
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            As the product scaled and usage grew, we needed more control and scalability than the managed platform could provide. I orchestrated a complete migration back to AWS:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">ECS Fargate deployment:</strong> Dockerized containers with autoscaling capabilities for handling traffic spikes
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">Production-grade infrastructure:</strong> RDS Postgres, ElastiCache Redis, CloudFront CDN, private subnets with bastion hosts
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">100% Infrastructure as Code:</strong> Entire infrastructure managed with Terraform for reproducibility and version control
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">Zero-downtime migration:</strong> Carefully planned and executed migration with no service interruption, maintaining 100% uptime during the transition
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">Scalability and control:</strong> Infrastructure designed to support 100K+ users with full control over scaling, monitoring, and cost management
              </span>
            </li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            This migration provided the foundation needed to scale efficiently while maintaining cost control and operational excellence.
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-2 shadow-lg mb-4 md:mb-6 transition-all duration-300 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">Monetization Experiments</CardTitle>
          <Badge className="mt-2 w-fit bg-chart-2/10 text-chart-2 border-chart-2/30">
            2023-2024
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Finding sustainable monetization was challenging. Most materials were old exams, creating copyright concerns. We tried multiple approaches:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">B2B partnerships:</strong> Banner ads and job board integrations. Revenue grew from R$200 to R$650/month, but required manual, labor-intensive distribution through university groups.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">B2C credit sales:</strong> Users could buy credits to access materials. Some sales, but not scalable.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">First subscription model:</strong> Unlimited access subscription. Only 3 subscribers—didn't scale.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">AI Question Scan + new subscription:</strong> This was the breakthrough. Launched alongside the new subscription model, it drove consistent subscriber growth.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-2 shadow-lg mb-4 md:mb-6 transition-all duration-300 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">The Ambassador Program</CardTitle>
          <Badge className="mt-2 w-fit bg-chart-2/10 text-chart-2 border-chart-2/30">
            2023 - Present
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Through user interactions, we discovered that the main incentive for sharing materials was the pure instinct to help classmates—almost like a status symbol. The ambassador program leveraged this natural behavior:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">Personal onboarding:</strong> Initially, we did calls with every applicant to understand our target audience better
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">Compensation model:</strong> Rewarded in money for material uploads (milestones) and views. Ambassadors had a dashboard with balance that could be withdrawn once minimum threshold reached
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">National expansion:</strong> When videos went viral, ambassadors came from all over Brazil. We grew in top federal universities, exactly our target. Currently: 600 active ambassadors, 4K waitlist
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">Technical challenge:</strong> Built event-driven system with transactional ledger. Later refactored to support two concurrent program versions during migration, slowly migrating users between versions
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-2 shadow-lg mb-4 md:mb-6 transition-all duration-300 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">Building the Team & Establishing Processes</CardTitle>
          <Badge className="mt-2 w-fit bg-chart-2/10 text-chart-2 border-chart-2/30">
            2024
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            As the product grew, I took on the responsibility of scaling the product team and establishing clear processes:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">Hiring and onboarding:</strong> Recruited and onboarded new product team members, creating comprehensive onboarding materials and processes
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">Development process documentation:</strong> Established clear development workflows, from planning to deployment, with practical examples and checklists
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">Internal handbook:</strong> Created a living documentation system covering processes, PRD templates, quality principles, and tool usage guidelines
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">Quality standards:</strong> Defined coding standards, testing requirements, and review processes to ensure consistency across the team
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">Mentoring and knowledge sharing:</strong> Conducted regular knowledge transfer sessions and mentored team members on technical best practices and architecture decisions
              </span>
            </li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            These processes enabled the team to scale effectively while maintaining high quality standards and alignment on technical direction.
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-2 shadow-lg mb-4 md:mb-6 transition-all duration-300 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">Direct Sales with Landing Pages</CardTitle>
          <Badge className="mt-2 w-fit bg-chart-2/10 text-chart-2 border-chart-2/30">
            2025
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We created the checkout system specifically to enable a direct sales model for subscriptions. This approach fundamentally changed how we acquired and converted users:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">Meta ads campaigns:</strong> Multiple campaigns driving traffic to various landing pages across different platforms
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">Distributed landing pages:</strong> Landing pages scattered across Framer and Lovable, each redirecting to the unified checkout system
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">Complete attribution tracking:</strong> All variants tracked end-to-end, enabling precise measurement of campaign performance and conversion rates
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">Simplified sales funnel:</strong> Users buy before using, making attribution trivial and revenue scaling predictable
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">Predictable revenue scaling:</strong> The simplified funnel and clear attribution enabled data-driven optimization and reliable revenue growth
              </span>
            </li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            This direct sales model transformed our acquisition strategy, making it easier to measure ROI, optimize campaigns, and scale revenue predictably.
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-2 shadow-lg mb-4 md:mb-6 transition-all duration-300 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">Technical Evolution & Challenges</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="mb-3 font-semibold text-sm">Early Technical Decisions</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
                <span>
                  <strong className="text-foreground">PDF thumbnails:</strong> Initially stored binary thumbnails in Postgres columns using GraphicsMagick. Worked well initially, but as materials grew, migrated to S3 with URL fields. Maintained API compatibility by redirecting to S3 URLs
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
                <span>
                  <strong className="text-foreground">Reactions system:</strong> Started with simple like/dislike in a reactions table with COUNT queries. As Instagram had, this became slow. Denormalized with like_count fields updated via triggers. Later evolved to 1-5 star rating system
                </span>
              </li>
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="mb-3 font-semibold text-sm">Architecture Debt & Improvements</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
                <span>
                  <strong className="text-foreground">Growing complexity:</strong> As features expanded, services became large, tightly coupled. Business logic was mixed with infrastructure. KnexJS queries became massive, making business logic testing nearly impossible
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
                <span>
                  <strong className="text-foreground">Developer experience improvements:</strong> Improved rebuild times, hot reload, environment replicability. Created seed system from anonymized production data, downloaded sample static materials and alternated between them in Minio to save space—no S3 dependency for dev
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
                <span>
                  <strong className="text-foreground">Future refactoring:</strong> Backend still needs major refactoring. Ideal would be closer to DDD architecture to properly separate concerns
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}


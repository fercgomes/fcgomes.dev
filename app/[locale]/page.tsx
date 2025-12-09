import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Metrics } from "@/components/metrics";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
import { CommandPalette } from "@/components/command-palette";
import { ScrollTracker } from "@/components/scroll-tracker";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fernando Gomes",
  jobTitle: "Founding Engineer & CTO",
  url: "https://fcgomes.dev",
  email: "fernando@fokvs.com.br",
  telephone: "+55-51-98632-6533",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Porto Alegre",
    addressRegion: "RS",
    addressCountry: "BR",
  },
  sameAs: [
    "https://www.linkedin.com/in/fercgomes/",
    "https://github.com/fercgomes",
    "https://fokvs.com.br",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "UFRGS - Federal University of Rio Grande do Sul",
  },
  knowsAbout: [
    "Software Engineering",
    "TypeScript",
    "Node.js",
    "NestJS",
    "AWS",
    "Infrastructure",
    "AI/ML",
    "Payments",
    "Technical Leadership",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Fokvs",
    url: "https://fokvs.com.br",
  },
};

export default async function Home() {
  const t = await getTranslations("footer");
  const tLanding = await getTranslations("landing");
  const tProjects = await getTranslations("projects");
  const tJourney = await getTranslations("journey");

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-background">
        <ScrollTracker />
        <CommandPalette />
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12">
          <Header />
          <Separator className="mb-6 md:mb-10" />
          <Hero />
          <Metrics />
          <Experience />
          <Education />
          <section className="mt-12 md:mt-20 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Card className="border-chart-2/30 hover:border-chart-2 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl">{tProjects("title")}</CardTitle>
                <CardDescription>{tLanding("projectsTeaser")}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {tLanding("projectsSummary")}
                </p>
              </CardContent>
              <CardAction className="px-6 pb-6">
                <Link
                  href="/projects"
                  className="text-sm font-semibold text-chart-2 hover:text-chart-2/80 inline-flex items-center"
                >
                  {tLanding("viewProjects")}
                </Link>
              </CardAction>
            </Card>
            <Card className="border-chart-2/30 hover:border-chart-2 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl">{tJourney("title")}</CardTitle>
                <CardDescription>{tLanding("journeyTeaser")}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {tLanding("journeySummary")}
                </p>
              </CardContent>
              <CardAction className="px-6 pb-6">
                <Link
                  href="/journey"
                  className="text-sm font-semibold text-chart-2 hover:text-chart-2/80 inline-flex items-center"
                >
                  {tLanding("viewJourney")}
                </Link>
              </CardAction>
            </Card>
            <Card className="border-chart-2/30 hover:border-chart-2 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl">{tLanding("skillsTitle")}</CardTitle>
                <CardDescription>{tLanding("skillsTeaser")}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {tLanding("skillsSummary")}
                </p>
              </CardContent>
              <CardAction className="px-6 pb-6">
                <Link
                  href="/skills"
                  className="text-sm font-semibold text-chart-2 hover:text-chart-2/80 inline-flex items-center"
                >
                  {tLanding("viewSkills")}
                </Link>
              </CardAction>
            </Card>
            <Card className="border-chart-2/30 hover:border-chart-2 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl">{tLanding("beyondTitle")}</CardTitle>
                <CardDescription>{tLanding("beyondTeaser")}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {tLanding("beyondSummary")}
                </p>
              </CardContent>
              <CardAction className="px-6 pb-6">
                <Link
                  href="/beyond-code"
                  className="text-sm font-semibold text-chart-2 hover:text-chart-2/80 inline-flex items-center"
                >
                  {tLanding("viewBeyond")}
                </Link>
              </CardAction>
            </Card>
          </section>
          <footer className="mt-16 md:mt-32 pt-8 md:pt-12 pb-6 md:pb-8 border-t border-border/50">
            <p className="text-center text-sm text-muted-foreground">
              {t("copyright", { year: new Date().getFullYear() })}
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}

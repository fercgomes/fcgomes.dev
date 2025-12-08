import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Metrics } from "@/components/metrics";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Journey } from "@/components/journey";
import { Education } from "@/components/education";
import { Skills } from "@/components/skills";
import { Personal } from "@/components/personal";
import { MediaShowcase } from "@/components/media-showcase";
import { CommandPalette } from "@/components/command-palette";
import { Separator } from "@/components/ui/separator";
import { ScrollAnimate } from "@/components/scroll-animate";

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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-background">
        <CommandPalette />
        <div className="mx-auto max-w-5xl px-6 py-12 md:px-8 md:py-20">
          <ScrollAnimate direction="down" delay={0}>
            <Header />
          </ScrollAnimate>
          <ScrollAnimate direction="fade" delay={0.1}>
            <Separator className="mb-20" />
          </ScrollAnimate>
          <ScrollAnimate direction="up" delay={0.2}>
            <Hero />
          </ScrollAnimate>
          <Metrics />
          <ScrollAnimate direction="up" delay={0}>
            <Experience />
          </ScrollAnimate>
          <ScrollAnimate direction="up" delay={0}>
            <Projects />
          </ScrollAnimate>
          <ScrollAnimate direction="up" delay={0}>
            <MediaShowcase />
          </ScrollAnimate>
          <ScrollAnimate direction="up" delay={0}>
            <Journey />
          </ScrollAnimate>
          <ScrollAnimate direction="up" delay={0}>
            <Education />
          </ScrollAnimate>
          <ScrollAnimate direction="up" delay={0}>
            <Skills />
          </ScrollAnimate>
          <ScrollAnimate direction="up" delay={0}>
            <Personal />
          </ScrollAnimate>
          <ScrollAnimate direction="fade" delay={0}>
            <footer className="mt-32 pt-12 pb-8 border-t border-border/50">
              <p className="text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Fernando Gomes. Built with Next.js,
                TypeScript, and Tailwind CSS.
              </p>
            </footer>
          </ScrollAnimate>
        </div>
      </main>
    </>
  );
}

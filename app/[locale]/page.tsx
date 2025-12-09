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
import { getTranslations } from 'next-intl/server';

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
  const t = await getTranslations('footer');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-background">
        <CommandPalette />
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-20">
          <Header />
          <Separator className="mb-12 md:mb-20" />
          <Hero />
          <Metrics />
          <Experience />
          <Projects />
          <MediaShowcase />
          <Journey />
          <Education />
          <Skills />
          <Personal />
          <footer className="mt-16 md:mt-32 pt-8 md:pt-12 pb-6 md:pb-8 border-t border-border/50">
            <p className="text-center text-sm text-muted-foreground">
              {t('copyright', { year: new Date().getFullYear() })}
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}

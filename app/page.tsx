import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Education } from "@/components/education";
import { Skills } from "@/components/skills";
import { Separator } from "@/components/ui/separator";

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
        <div className="mx-auto max-w-5xl px-6 py-12 md:px-8 md:py-20">
          <Header />
          <Separator className="mb-16" />
          <Hero />
          <Experience />
          <Projects />
          <Education />
          <Skills />
          <footer className="mt-20 pb-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Fernando Gomes. Built with Next.js, TypeScript, and Tailwind CSS.</p>
          </footer>
        </div>
      </main>
    </>
  );
}

import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Education } from "@/components/education";
import { Skills } from "@/components/skills";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
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
    </div>
  );
}

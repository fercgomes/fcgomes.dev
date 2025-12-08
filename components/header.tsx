import { Button } from "@/components/ui/button";
import { Mail, Linkedin, ExternalLink, Download, Github } from "lucide-react";
import { CommandPaletteHint } from "@/components/command-palette-hint";

export function Header() {
  return (
    <header className="mb-20 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
          Fernando Gomes
        </h1>
        <p
          className="mt-2 text-lg text-muted-foreground"
          aria-label="Job title"
        >
          Founding Engineer & CTO
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <CommandPaletteHint />
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-chart-2/30 hover:border-chart-2 hover:bg-chart-2/10 transition-all duration-300"
        >
          <a
            href="mailto:fernando@fokvs.com.br"
            aria-label="Send email to Fernando Gomes"
          >
            <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
            Email
          </a>
        </Button>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-chart-2/30 hover:border-chart-2 hover:bg-chart-2/10 transition-all duration-300"
        >
          <a
            href="https://www.linkedin.com/in/fercgomes/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Fernando Gomes LinkedIn profile"
          >
            <Linkedin className="mr-2 h-4 w-4" aria-hidden="true" />
            LinkedIn
          </a>
        </Button>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-chart-2/30 hover:border-chart-2 hover:bg-chart-2/10 transition-all duration-300"
        >
          <a
            href="https://github.com/fercgomes"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Fernando Gomes GitHub profile"
          >
            <Github className="mr-2 h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
        </Button>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-chart-2/30 hover:border-chart-2 hover:bg-chart-2/10 transition-all duration-300"
        >
          <a
            href="https://fokvs.com.br"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Fokvs website"
          >
            <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
            Fokvs
          </a>
        </Button>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-chart-2/30 hover:border-chart-2 hover:bg-chart-2/10 transition-all duration-300"
        >
          <a
            href="/media/resumee.pdf"
            download="Fernando_Gomes_Resume.pdf"
            aria-label="Download Fernando Gomes resume"
          >
            <Download className="mr-2 h-4 w-4" aria-hidden="true" />
            Resume
          </a>
        </Button>
      </div>
    </header>
  );
}

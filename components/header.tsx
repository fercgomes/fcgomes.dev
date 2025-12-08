import { Button } from "@/components/ui/button";
import { Mail, Linkedin, ExternalLink } from "lucide-react";

export function Header() {
  return (
    <header className="mb-16 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-chart-2/30 hover:border-chart-2 hover:bg-chart-2/10"
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
          className="border-chart-2/30 hover:border-chart-2 hover:bg-chart-2/10"
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
          className="border-chart-2/30 hover:border-chart-2 hover:bg-chart-2/10"
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
      </div>
    </header>
  );
}

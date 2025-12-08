"use client";

import { Badge } from "@/components/ui/badge";
import { MapPin, Music, Activity } from "lucide-react";

export function Hero() {
  return (
    <section className="mb-32">
      <div className="mb-8 flex items-center gap-2 text-muted-foreground">
        <MapPin className="h-4 w-4 text-chart-2" />
        <span>Porto Alegre, RS (Brazil)</span>
      </div>
      <p className="mb-8 text-xl leading-relaxed text-muted-foreground md:text-2xl">
        Founding engineer and CTO who takes products from prototype to scale — architecture, backend, infra, mobile, web, AI, payments, analytics, and growth. Built and operated the entire <span className="font-semibold text-chart-2">Fokvs</span> engineering stack while scaling the product to 100K+ users and meaningful subscription revenue.
      </p>
      <div className="flex flex-wrap gap-3">
        <Badge className="bg-chart-2/15 text-chart-2 border-chart-2/40 font-semibold text-sm px-4 py-1.5 hover:bg-chart-2/25 transition-all duration-300">Founding Engineer</Badge>
        <Badge className="bg-chart-2/15 text-chart-2 border-chart-2/40 font-semibold text-sm px-4 py-1.5 hover:bg-chart-2/25 transition-all duration-300">CTO</Badge>
        <Badge className="bg-chart-2/15 text-chart-2 border-chart-2/40 font-semibold text-sm px-4 py-1.5 hover:bg-chart-2/25 transition-all duration-300">Full-Stack</Badge>
        <Badge className="bg-chart-2/15 text-chart-2 border-chart-2/40 font-semibold text-sm px-4 py-1.5 hover:bg-chart-2/25 transition-all duration-300">Infrastructure</Badge>
        <Badge className="bg-chart-2/15 text-chart-2 border-chart-2/40 font-semibold text-sm px-4 py-1.5 hover:bg-chart-2/25 transition-all duration-300">AI/ML</Badge>
      </div>
      <button
        onClick={() => {
          document.getElementById("personal-heading")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="mt-8 flex items-center gap-4 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
        aria-label="Scroll to personal interests section"
      >
        <div className="flex items-center gap-1.5">
          <Music className="h-3.5 w-3.5 text-chart-2/70 group-hover:text-chart-2 transition-colors" />
          <span>Musician</span>
        </div>
        <span className="text-border">•</span>
        <div className="flex items-center gap-1.5">
          <Activity className="h-3.5 w-3.5 text-chart-2/70 group-hover:text-chart-2 transition-colors" />
          <span>Marathon Runner</span>
        </div>
      </button>
    </section>
  );
}


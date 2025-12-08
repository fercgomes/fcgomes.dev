import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

export function Hero() {
  return (
    <section className="mb-20">
      <div className="mb-8 flex items-center gap-2 text-muted-foreground">
        <MapPin className="h-4 w-4 text-chart-2" />
        <span>Porto Alegre, RS (Brazil)</span>
      </div>
      <p className="mb-8 text-xl leading-relaxed text-muted-foreground md:text-2xl">
        Founding engineer and CTO who takes products from prototype to scale — architecture, backend, infra, mobile, web, AI, payments, analytics, and growth. Built and operated the entire <span className="font-semibold text-chart-2">Fokvs</span> engineering stack while scaling the product to 100K+ users and meaningful subscription revenue.
      </p>
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/30 font-medium hover:bg-chart-2/20">Founding Engineer</Badge>
        <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/30 font-medium hover:bg-chart-2/20">CTO</Badge>
        <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/30 font-medium hover:bg-chart-2/20">Full-Stack</Badge>
        <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/30 font-medium hover:bg-chart-2/20">Infrastructure</Badge>
        <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/30 font-medium hover:bg-chart-2/20">AI/ML</Badge>
      </div>
    </section>
  );
}


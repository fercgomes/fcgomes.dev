import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Activity } from "lucide-react";

export function Personal() {
  return (
    <section className="mb-16 md:mb-32" aria-labelledby="personal-heading">
      <h2
        id="personal-heading"
        className="mb-8 md:mb-12 bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-4xl text-center"
      >
        Beyond Code
      </h2>
      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        <Card className="border-l-4 border-l-chart-2 shadow-md transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-chart-2/10 p-2">
                <Music className="h-5 w-5 text-chart-2" />
              </div>
              <CardTitle className="text-xl">Music</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              I've been a musician since I was 4 years old. Started playing guitar at 11, and over the years I've learned to play drums, bass, keyboards, flute, and harmonica. Music has always been a core part of who I am.
            </p>
            <div className="pt-2 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Rock band:</strong> Used to play in a rock band, and we released 2 songs on Spotify. The experience of creating, recording, and releasing music taught me a lot about collaboration, iteration, and bringing creative ideas to life.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-chart-2 shadow-md transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-chart-2/10 p-2">
                <Activity className="h-5 w-5 text-chart-2" />
              </div>
              <CardTitle className="text-xl">Running</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              I've been a marathon runner for 9 years. Running has taught me discipline, patience, and the importance of consistent progress over time—lessons that translate directly to building products and leading teams.
            </p>
            <div className="pt-2 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">6 marathons completed</strong> with a personal best of <strong className="text-foreground">2:50:22</strong>. The mental resilience and long-term thinking required for marathon training mirror the approach needed to build and scale products.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}


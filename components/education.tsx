import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function Education() {
  return (
    <section className="mb-20">
      <h2 className="mb-8 bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
        Education & Background
      </h2>

      <Card className="border-l-4 border-l-chart-2 shadow-lg">
        <CardHeader>
          <CardTitle>Computer Science</CardTitle>
          <p className="text-muted-foreground">
            UFRGS - Federal University of Rio Grande do Sul
          </p>
          <Badge className="mt-2 w-fit bg-chart-2/10 text-chart-2 border-chart-2/30">
            2017 - 2024
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Full graduation in Computer Science. Focused on entrepreneurship and
            full-stack development throughout the program.
          </p>
        </CardContent>
      </Card>

      <div className="mt-6 space-y-4">
        <div>
          <h3 className="mb-3 font-semibold">Research Experience</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">
                  Scientific Initiation:
                </strong>{" "}
                Parallel and distributed processing group. Parallel algorithms
                for heterogeneous architectures using StarPU library for CPU/GPU
                parallel processing
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">
                  Entrepreneurial Initiation:
                </strong>{" "}
                Development of pharmacy delivery application
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">
                  TCC (Final Project):
                </strong>{" "}
                Business Process Management (BPM) research on LLM efficiency for
                generating BPMN business process descriptions compared to
                traditional NLP methods
              </span>
            </li>
          </ul>
        </div>

        <Separator />

        <div>
          <h3 className="mb-3 font-semibold">Other Experiences</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">2013:</strong> Rotary Youth
                Exchange Program - One year living in Sweden as exchange student
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">2015:</strong> Two semesters
                of Biology at UFRGS before switching to Computer Science
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
              <span>
                <strong className="text-foreground">
                  Entrepreneurship Marathon (SEDETEC UFRGS):
                </strong>
                Decoreba project - Duolingo for college entrance exams. 2nd
                place. Developed entire app, web, and backend (never launched)
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

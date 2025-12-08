import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function Skills() {
  const languages = [
    { name: "English", level: "Fluent", color: "chart-2", flag: "🇺🇸" },
    { name: "Swedish", level: "Near fluent (lived in Sweden 2013)", color: "chart-2", flag: "🇸🇪" },
    { name: "French", level: "A2 (2 years of classes)", color: "chart-2", flag: "🇫🇷" },
    { name: "Spanish", level: "Good understanding, limited speaking", color: "chart-2", flag: "🇪🇸" },
  ];

  const certifications = [
    "R3 Corda - Build Blockchain / DLT apps (Udemy, Mar 2022)",
    "Build a Blockchain and a Cryptocurrency from Scratch (Udemy, Feb 2022)",
    "The Complete Elixir and Phoenix Bootcamp (Udemy, Aug 2021)",
    "Become a Product Manager | Learn the Skills & Get the Job (Udemy, Jul 2021)",
    "Ethereum and Solidity: The Complete Developer's Guide (Udemy, Jun 2021)",
    "Blockchain A-Z™: Learn How To Build Your First Blockchain (Udemy, Sep 2020)",
    "AWS Cloud Practitioner Essentials (Second Edition) (Apr 2020)",
    "NodeJS - The Complete Guide (incl. MVC, REST APIs, GraphQL) (Udemy, Apr 2020)",
    "React - The Complete Guide (incl Hooks, React Router, Redux) (Udemy, Apr 2020)",
    "Python and Django Full Stack Web Developer Bootcamp (Udemy, Mar 2020)",
  ];

  const skillsByCategory = {
    "Backend": ["TypeScript/Node", "NestJS", "Fastify", "Python", "Postgres", "Redis"],
    "Architecture": ["Distributed systems", "Modular services", "Event-driven design", "Caching", "Async pipelines"],
    "Infrastructure": ["AWS (ECS/Fargate, RDS, VPC, S3, CloudFront)", "Terraform", "Docker", "CI/CD"],
    "AI/ML": ["LLM integrations", "OCR", "Embeddings", "pgvector", "Bedrock", "Evaluation"],
    "Payments": ["PIX orchestration", "Multi-gateway routing", "Attribution", "Entitlements", "Subscription systems"],
    "Leadership": ["Technical direction", "Mentoring", "Hiring", "Roadmap ownership", "Product alignment"],
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { border: string; text: string; bg: string; hover: string; dot: string; badgeBorder: string }> = {
      "chart-1": {
        border: "border-l-chart-1",
        text: "text-chart-1",
        bg: "bg-chart-1/10",
        hover: "hover:bg-chart-1/20",
        dot: "bg-chart-1",
        badgeBorder: "border-chart-1/30",
      },
      "chart-2": {
        border: "border-l-chart-2",
        text: "text-chart-2",
        bg: "bg-chart-2/10",
        hover: "hover:bg-chart-2/20",
        dot: "bg-chart-2",
        badgeBorder: "border-chart-2/30",
      },
    };
    return colorMap[color] || colorMap["chart-2"];
  };

  const techColors = ["chart-1", "chart-2"];

  return (
    <section className="mb-20" aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="mb-8 bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-2xl font-bold tracking-tight text-transparent">Skills & Certifications</h2>
      
      <div className="space-y-6">
        {Object.entries(skillsByCategory).map(([category, skills]) => {
          const categoryColors = getColorClasses("chart-2");
          return (
            <Card key={category} className={`border-l-4 ${categoryColors.border} shadow-md`}>
              <CardHeader>
                <CardTitle className={`${categoryColors.text}`}>{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => {
                    const skillColorsMap = getColorClasses("chart-2");
                    return (
                      <Badge key={skill} className={`${skillColorsMap.bg} ${skillColorsMap.text} ${skillColorsMap.badgeBorder} ${skillColorsMap.hover}`}>
                        {skill}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}

        <Card className="border-l-4 border-l-chart-2 shadow-md">
          <CardHeader>
            <CardTitle className="text-chart-2">Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {languages.map((lang) => {
                const langColors = getColorClasses("chart-2");
                return (
                  <div key={lang.name} className="flex items-center justify-between text-sm">
                    <span className={`font-medium ${langColors.text} flex items-center gap-2`}>
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                    <span className="text-muted-foreground">{lang.level}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-chart-2 shadow-md">
          <CardHeader>
            <CardTitle className="text-chart-2">Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {certifications.map((cert) => {
                const certColors = getColorClasses("chart-2");
                return (
                  <li key={cert} className="flex items-start gap-2">
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${certColors.dot}`} />
                    <span>{cert}</span>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

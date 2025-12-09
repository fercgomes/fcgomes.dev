import { Header } from "@/components/header";
import { Skills } from "@/components/skills";
import { CommandPalette } from "@/components/command-palette";
import { ScrollTracker } from "@/components/scroll-tracker";
import { Separator } from "@/components/ui/separator";
import { getTranslations } from "next-intl/server";

export default async function SkillsPage() {
  const t = await getTranslations("footer");

  return (
    <main className="min-h-screen bg-background">
      <ScrollTracker />
      <CommandPalette />
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12">
        <Header />
        <Separator className="mb-6 md:mb-10" />
        <Skills />
        <footer className="mt-16 md:mt-32 pt-8 md:pt-12 pb-6 md:pb-8 border-t border-border/50">
          <p className="text-center text-sm text-muted-foreground">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </footer>
      </div>
    </main>
  );
}


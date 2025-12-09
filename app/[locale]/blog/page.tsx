import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";
import { SubstackButton } from "@/components/substack-button";

// Force static generation
export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("blog");

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/blog`,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://fcgomes.dev/${locale}/blog`,
      type: "website",
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("blog");

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12">
        <Header />
        <Separator className="mb-6 md:mb-10" />

        <div className="flex flex-col items-center justify-center text-center space-y-6 py-16">
          <h1 className="bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-5xl">
            {t("title")}
          </h1>
          <p className="text-base text-muted-foreground md:text-lg max-w-2xl">
            {t("description")}
          </p>
          <SubstackButton
            source="blog_page"
            className="bg-chart-2 text-white hover:bg-chart-2/90"
          />
        </div>
      </div>
    </main>
  );
}

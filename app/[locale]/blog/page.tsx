import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAllPosts } from "@/lib/blog";
import { Link } from "@/i18n/routing";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Tag, Sparkles, Globe, PenTool } from "lucide-react";

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
  const allPosts = getAllPosts();

  // Filter posts by current locale, but also show posts in other languages
  // The layout will be localized, but posts can be in any language
  const posts = allPosts;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12">
        <Header />
        <Separator className="mb-6 md:mb-10" />

        <div className="mb-8 md:mb-12">
          <h1 className="mb-4 bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-5xl">
            {t("title")}
          </h1>
          <p className="mb-4 text-base text-muted-foreground md:text-lg">
            {t("description")}
          </p>
          <div className="rounded-lg border border-chart-2/20 bg-chart-2/5 px-4 py-3 text-sm text-muted-foreground">
            <p>{t("aiDisclaimer")}</p>
          </div>
        </div>

        {posts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">{t("noPosts")}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block h-full"
              >
                <Card className="group flex h-full flex-col border-chart-2/30 transition-all duration-300 hover:border-chart-2 hover:shadow-lg">
                  <CardHeader className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <Badge
                        variant="outline"
                        className="border-chart-2/30 text-chart-2"
                      >
                        <Globe className="mr-1 h-3 w-3" />
                        {post.lang.toUpperCase()}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          post.aiGenerated
                            ? "border-purple-500/50 bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold"
                            : "border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-400 font-semibold"
                        }
                      >
                        {post.aiGenerated ? (
                          <>
                            <Sparkles className="mr-1 h-3 w-3" />
                            {t("aiGenerated")}
                          </>
                        ) : (
                          <>
                            <PenTool className="mr-1 h-3 w-3" />
                            {t("notAiGenerated")}
                          </>
                        )}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString(locale, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <CardTitle className="mb-2 line-clamp-2 text-xl group-hover:text-chart-2 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto pt-0">
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      {post.readingTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readingTime} {t("minRead")}
                        </span>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          <span className="line-clamp-1">
                            {post.tags.slice(0, 2).join(", ")}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

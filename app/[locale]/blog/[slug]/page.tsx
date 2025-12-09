import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Tag,
  ArrowLeft,
  Sparkles,
  Globe,
  PenTool,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import mdxComponents from "@/components/mdx-components";
import { BlogShareButton } from "@/components/blog-share-button";
import { routing } from "@/i18n/routing";

interface BlogPostPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

// Force static generation
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getAllPosts();
  const params: { slug: string; locale: string }[] = [];

  // Generate params for all locales and all posts
  for (const locale of routing.locales) {
    for (const post of posts) {
      params.push({
        slug: post.slug,
        locale,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const publishedTime = new Date(post.date).toISOString();
  const modifiedTime = publishedTime; // You can update this if you track modifications

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `https://fcgomes.dev/blog/${slug}`,
      languages: {
        [post.lang]: `https://fcgomes.dev/${post.lang}/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime,
      modifiedTime,
      authors: [post.author],
      tags: post.tags,
      url: `https://fcgomes.dev/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@fercgomes",
    },
    other: {
      "article:published_time": publishedTime,
      "article:modified_time": modifiedTime,
      "article:author": post.author,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const t = await getTranslations("blog");

  if (!post) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: "https://fcgomes.dev/media/images/fernando.jpeg",
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://fcgomes.dev",
    },
    publisher: {
      "@type": "Person",
      name: "Fernando Gomes",
      url: "https://fcgomes.dev",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://fcgomes.dev/blog/${slug}`,
    },
    inLanguage: post.lang,
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12">
          <Header />
          <Separator className="mb-6 md:mb-10" />

          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToBlog")}
          </Link>

          <article lang={post.lang} className="max-w-none">
            <header className="mb-8">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
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
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString(post.lang, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                {post.readingTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readingTime} {t("minRead")}
                  </span>
                )}
              </div>

              <h1 className="mb-2 bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-5xl">
                {post.title}
              </h1>
              {post.description && (
                <p className="mb-4 text-lg text-muted-foreground md:text-xl">
                  {post.description}
                </p>
              )}

              <div className="mb-4 flex items-center gap-3">
                <BlogShareButton
                  postTitle={post.title}
                  postSlug={post.slug}
                  utmContent={`blog-${post.slug}`}
                />
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="border-chart-2/30"
                    >
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            <div className="blog-content">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>

            <footer className="mt-12 border-t border-border pt-8">
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-semibold text-foreground">{post.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("writtenBy")} {post.author}
                  </p>
                </div>
              </div>
            </footer>
          </article>
        </div>
      </main>
    </>
  );
}

import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const routes: MetadataRoute.Sitemap = [];

  // Add main pages for each locale
  routing.locales.forEach((locale) => {
    routes.push({
      url: `https://fcgomes.dev/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    });

    routes.push({
      url: `https://fcgomes.dev/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    routes.push({
      url: `https://fcgomes.dev/${locale}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });

    routes.push({
      url: `https://fcgomes.dev/${locale}/journey`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });

    routes.push({
      url: `https://fcgomes.dev/${locale}/skills`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });

    routes.push({
      url: `https://fcgomes.dev/${locale}/beyond-code`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  // Add blog posts
  posts.forEach((post) => {
    routes.push({
      url: `https://fcgomes.dev/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          [post.lang]: `https://fcgomes.dev/${post.lang}/blog/${post.slug}`,
        },
      },
    });
  });

  return routes;
}

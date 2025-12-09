import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
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

  return routes;
}

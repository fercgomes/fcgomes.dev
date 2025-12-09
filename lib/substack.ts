/**
 * Get Substack URL with UTM parameters
 * @param source - The source of the link (e.g., "header", "hero", "blog_page", "command_palette")
 */
export function getSubstackUrl(source: string): string {
  const baseUrl = "https://substack.com/@fcgomes";
  const params = new URLSearchParams({
    utm_source: "fcgomes.dev",
    utm_medium: "website",
    utm_campaign: "blog",
    utm_content: source,
  });
  return `${baseUrl}?${params.toString()}`;
}

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  lang: string; // Specific language for this post
  author: string;
  tags?: string[];
  readingTime?: number;
  content: string;
  aiGenerated?: boolean; // Whether the post was AI-generated
}

function getPostsDirectory(): string {
  // Use process.cwd() only at build time
  if (typeof process === "undefined" || !process.cwd) {
    throw new Error("Cannot determine posts directory");
  }
  return path.join(process.cwd(), "content", "blog");
}

export function getAllPosts(): BlogPost[] {
  try {
    const postsDirectory = getPostsDirectory();
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
          slug,
          title: data.title || "",
          description: data.description || "",
          date: data.date || "",
          lang: data.lang || "en", // Default to 'en' if not specified
          author: data.author || "Fernando Gomes",
          tags: data.tags || [],
          readingTime: calculateReadingTime(content),
          content,
          aiGenerated: data.aiGenerated || false,
        } as BlogPost;
      });

    // Sort posts by date in descending order
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    // Return empty array if there's any error (e.g., during runtime)
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const postsDirectory = getPostsDirectory();
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      lang: data.lang || "en",
      author: data.author || "Fernando Gomes",
      tags: data.tags || [],
      readingTime: calculateReadingTime(content),
      content,
      aiGenerated: data.aiGenerated || false,
    } as BlogPost;
  } catch (error) {
    console.error("Error reading blog post:", error);
    return null;
  }
}

export function getPostsByLang(lang: string): BlogPost[] {
  return getAllPosts().filter((post) => post.lang === lang);
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

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

const postsDirectory = path.join(process.cwd(), "content", "blog");

export function getAllPosts(): BlogPost[] {
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
}

export function getPostBySlug(slug: string): BlogPost | null {
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
}

export function getPostsByLang(lang: string): BlogPost[] {
  return getAllPosts().filter((post) => post.lang === lang);
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

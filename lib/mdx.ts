import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export async function getAllPosts(): Promise<BlogPost[]> {
  // Create directory if it doesn't exist
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(BLOG_DIR, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled",
        excerpt: data.excerpt || "",
        content,
        date: data.date || new Date().toISOString(),
        readingTime: readingTime(content).text,
        tags: data.tags || [],
        image: data.image,
        featured: data.featured || false,
        author: {
          name: data.author?.name || "Chirag Talpada",
          avatar: data.author?.avatar,
        },
      } as BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || "Untitled",
    excerpt: data.excerpt || "",
    content,
    date: data.date || new Date().toISOString(),
    readingTime: readingTime(content).text,
    tags: data.tags || [],
    image: data.image,
    featured: data.featured || false,
    author: {
      name: data.author?.name || "Chirag Talpada",
      avatar: data.author?.avatar,
    },
  };
}

export async function getAllSlugs(): Promise<string[]> {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

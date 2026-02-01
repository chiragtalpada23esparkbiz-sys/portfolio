"use client";

import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types";

interface BlogPreviewProps {
  posts: BlogPost[];
}

const categoryStyles: Record<string, { bg: string; text: string }> = {
  tutorial: { bg: "bg-zinc-800", text: "text-zinc-300" },
  "ai-ml": { bg: "bg-zinc-800", text: "text-zinc-300" },
  "best-practices": { bg: "bg-zinc-800", text: "text-zinc-300" },
  technical: { bg: "bg-zinc-800", text: "text-zinc-300" },
  career: { bg: "bg-zinc-800", text: "text-zinc-300" },
  "Next.js": { bg: "bg-zinc-800", text: "text-zinc-300" },
  React: { bg: "bg-zinc-800", text: "text-zinc-300" },
  "Web Development": { bg: "bg-zinc-800", text: "text-zinc-300" },
  TypeScript: { bg: "bg-zinc-800", text: "text-zinc-300" },
  default: { bg: "bg-zinc-800", text: "text-zinc-300" },
};

function getCategoryStyle(category: string) {
  const lowerCategory = category.toLowerCase();
  return categoryStyles[lowerCategory] || categoryStyles[category] || categoryStyles.default;
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  if (posts.length === 0) {
    return (
      <Section id="blog" className="py-20 md:py-28">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-muted-foreground text-lg">
            Thoughts, tutorials, and insights
          </p>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            Blog posts coming soon! Stay tuned.
          </p>
          <Button variant="outline" asChild>
            <Link href="/blog">Visit Blog</Link>
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section id="blog" className="py-20 md:py-28">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Latest Blog Posts
        </h2>
        <p className="text-muted-foreground text-lg">
          Thoughts, tutorials, and insights
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {posts.slice(0, 6).map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <Button variant="outline" size="lg" asChild>
          <Link href="/blog">
            View All Posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}

function BlogPostCard({ post }: { post: BlogPost }) {
  const category = post.tags[0] || "tutorial";
  const style = getCategoryStyle(category);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="rounded-xl border bg-card p-6 hover:shadow-md transition-shadow">
      {/* Category Badge and Meta */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <Badge className={`${style.bg} ${style.text} border-0 text-xs font-normal`}>
          {category.toLowerCase()}
        </Badge>
        <span className="text-muted-foreground text-sm">
          {formatDate(post.date)} • {post.readingTime}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-lg mb-3 line-clamp-2">{post.title}</h3>

      {/* Excerpt */}
      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
        {post.excerpt}
      </p>

      {/* Hashtags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.slice(0, 3).map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-muted text-muted-foreground text-xs font-normal"
          >
            #{tag.replace(/\s+/g, "")}
          </Badge>
        ))}
      </div>

      {/* Read More Link */}
      <Link
        href={`/blog/${post.slug}`}
        className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
      >
        Read More
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

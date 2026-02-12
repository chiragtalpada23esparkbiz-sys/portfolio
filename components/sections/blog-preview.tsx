"use client";

import Link from "next/link";
import Script from "next/script";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types";

interface BlogPreviewProps {
  posts: BlogPost[];
  baseUrl: string;
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
  return (
    categoryStyles[lowerCategory] ||
    categoryStyles[category] ||
    categoryStyles.default
  );
}

// Generate JSON-LD for blog posts
function generateBlogJsonLd(posts: BlogPost[], baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Chirag Talpada's Blog",
    description:
      "Technical articles, tutorials, and insights on full-stack development, React, Next.js, and AI-powered solutions.",
    url: `${baseUrl}/blog`,
    author: {
      "@type": "Person",
      name: "Chirag Talpada",
      jobTitle: "Full-Stack Developer",
      url: baseUrl,
    },
    blogPost: posts.slice(0, 6).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: "Chirag Talpada",
        url: baseUrl,
      },
      keywords: post.tags.join(", "),
      url: `${baseUrl}/blog/${post.slug}`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${baseUrl}/blog/${post.slug}`,
      },
      ...(post.image && {
        image: {
          "@type": "ImageObject",
          url: post.image.startsWith("http")
            ? post.image
            : `${baseUrl}${post.image}`,
        },
      }),
    })),
  };
}

export function BlogPreview({ posts, baseUrl }: BlogPreviewProps) {
  if (posts.length === 0) {
    return (
      <Section
        id="blog"
        className="py-20 md:py-28"
        aria-labelledby="blog-heading"
      >
        <BlurFade delay={0} inView>
          <header className="text-center mb-16">
            <h2
              id="blog-heading"
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Latest Blog Posts
            </h2>
            <p className="text-muted-foreground text-lg">
              Thoughts, tutorials, and insights
            </p>
          </header>
        </BlurFade>
        <BlurFade delay={0.1} inView>
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Blog posts coming soon! Stay tuned.
            </p>
            <Button variant="outline" asChild>
              <Link href="/blog">Visit Blog</Link>
            </Button>
          </div>
        </BlurFade>
      </Section>
    );
  }

  const jsonLd = generateBlogJsonLd(posts, baseUrl);

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <Script
        id="blog-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section
        id="blog"
        className="py-20 md:py-28"
        aria-labelledby="blog-heading"
      >
        {/* Header */}
        <BlurFade delay={0} inView>
          <header className="text-center mb-16">
            <h2
              id="blog-heading"
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Latest Blog Posts
            </h2>
            <p className="text-muted-foreground text-lg">
              Thoughts, tutorials, and insights
            </p>
          </header>
        </BlurFade>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.slice(0, 6).map((post, index) => (
            <BlurFade key={post.slug} delay={0.1 + index * 0.1} inView>
              <BlogPostCard post={post} />
            </BlurFade>
          ))}
        </div>

        {/* View All Button */}
        <BlurFade delay={0.4} inView>
          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/blog">
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </BlurFade>

      </Section>
    </>
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
    <article
      className="rounded-xl border bg-card p-6 hover:shadow-md transition-shadow h-full flex flex-col"
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      {/* Category Badge and Meta */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <Badge
          className={`${style.bg} ${style.text} border-0 text-xs font-normal`}
        >
          {category.toLowerCase()}
        </Badge>
        <span className="text-muted-foreground text-sm">
          <time itemProp="datePublished" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          {" • "}
          <span itemProp="timeRequired">{post.readingTime}</span>
        </span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-lg mb-3 line-clamp-2" itemProp="headline">
        {post.title}
      </h3>

      {/* Excerpt */}
      <p
        className="text-muted-foreground text-sm mb-4 line-clamp-3 grow"
        itemProp="description"
      >
        {post.excerpt}
      </p>

      {/* Hashtags */}
      <div className="flex flex-wrap gap-2 mb-4" aria-label="Tags">
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

      {/* Hidden author for SEO */}
      <span
        className="sr-only"
        itemProp="author"
        itemScope
        itemType="https://schema.org/Person"
      >
        <span itemProp="name">Chirag Talpada</span>
      </span>

      {/* Read More Link */}
      <Link
        href={`/blog/${post.slug}`}
        className="inline-flex items-center gap-1 text-sm font-medium hover:underline mt-auto"
        itemProp="url"
      >
        Read More
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { BlurFade } from "@/components/ui/blur-fade";
import { Calendar, Clock, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import type { BlogPost } from "@/types";

const baseUrl = "https://www.chiragtalpada.in";

export const metadata: Metadata = {
  title: "Blog - Web Development, AI & Software Engineering | Chirag Talpada",
  description:
    "Thoughts, tutorials, and insights on web development, AI, and software engineering from Chirag Talpada. Learn React, Next.js, TypeScript, and more.",
  keywords: [
    "web development blog",
    "software engineering tutorials",
    "React tutorials",
    "Next.js guides",
    "AI development",
    "TypeScript tips",
    "full stack developer blog",
    "Chirag Talpada blog",
  ],
  openGraph: {
    title: "Blog - Web Development & AI Insights | Chirag Talpada",
    description:
      "Thoughts, tutorials, and insights on web development, AI, and software engineering.",
    type: "website",
    url: `${baseUrl}/blog`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Web Development & AI Insights | Chirag Talpada",
    description:
      "Thoughts, tutorials, and insights on web development, AI, and software engineering.",
  },
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
};

// Get unique tags from all posts
function getAllTags(posts: BlogPost[]): string[] {
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

export default async function BlogPage() {
  const posts = await getAllPosts();
  const allTags = getAllTags(posts);
  const featuredPost = posts.find((post) => post.featured) || posts[0];
  const remainingPosts = posts.filter((post) => post !== featuredPost);

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Chirag Talpada's Blog",
    description:
      "Thoughts, tutorials, and insights on web development, AI, and software engineering.",
    url: `${baseUrl}/blog`,
    author: {
      "@type": "Person",
      name: "Chirag Talpada",
      url: baseUrl,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: post.author.name,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="min-h-screen">
        {/* Hero Section */}
        <Section className="pt-8 pb-12 md:pt-12 md:pb-16">
          {/* Back Link */}
          <BlurFade delay={0}>
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to Home
            </Link>
          </BlurFade>

          {/* Header */}
          <BlurFade delay={0.1}>
            <header className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                {posts.length} {posts.length === 1 ? "Article" : "Articles"}{" "}
                Published
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Blog & Insights
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Thoughts, tutorials, and insights on web development, AI, and
                software engineering.
              </p>
            </header>
          </BlurFade>

          {/* Tag Filters */}
          {allTags.length > 0 && (
            <BlurFade delay={0.2}>
              <nav
                className="flex flex-wrap justify-center gap-2 mb-12"
                aria-label="Filter posts by tag"
              >
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-sm cursor-default hover:bg-primary/10 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </nav>
            </BlurFade>
          )}
        </Section>

        {/* Posts Section */}
        <Section className="py-12 md:py-16">
          {posts.length === 0 ? (
            <BlurFade delay={0.1} inView>
              <div className="text-center py-16 rounded-xl border bg-card">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
                <p className="text-muted-foreground">
                  I&apos;m working on some exciting content. Check back soon!
                </p>
              </div>
            </BlurFade>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <BlurFade delay={0.1} inView>
                  <FeaturedPostCard post={featuredPost} />
                </BlurFade>
              )}

              {/* Remaining Posts Grid */}
              {remainingPosts.length > 0 && (
                <BlurFade delay={0.2} inView>
                  <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-8">More Articles</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {remainingPosts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                      ))}
                    </div>
                  </div>
                </BlurFade>
              )}
            </>
          )}
        </Section>
      </article>
    </>
  );
}

function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block"
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <article className="relative overflow-hidden rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 hover:border-primary/30">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-64 md:h-auto md:min-h-full bg-linear-to-br from-primary/20 via-primary/10 to-transparent overflow-hidden">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                itemProp="image"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="h-16 w-16 mx-auto text-primary/40 mb-4" />
                  <span className="text-sm text-muted-foreground">
                    Featured Article
                  </span>
                </div>
              </div>
            )}
            {/* Featured Badge */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary text-primary-foreground">
                Featured
              </Badge>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8 flex flex-col justify-center">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs"
                  itemProp="keywords"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h2
              className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors"
              itemProp="headline"
            >
              {post.title}
            </h2>

            {/* Excerpt */}
            <p
              className="text-muted-foreground mb-5 line-clamp-3"
              itemProp="description"
            >
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-5">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <time dateTime={post.date} itemProp="datePublished">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                <span>{post.readingTime}</span>
              </div>
            </div>

            {/* Read More */}
            <div className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all">
              Read Article
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </div>

            {/* Hidden author for SEO */}
            <span className="sr-only" itemProp="author">
              {post.author.name}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block h-full"
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <article className="h-full flex flex-col rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/30">
        {/* Image Section */}
        <div className="relative h-48 bg-linear-to-br from-primary/15 via-primary/5 to-transparent overflow-hidden">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              itemProp="image"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-primary/30" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs"
                itemProp="keywords"
              >
                {tag}
              </Badge>
            ))}
            {post.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{post.tags.length - 2}
              </Badge>
            )}
          </div>

          {/* Title */}
          <h3
            className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2"
            itemProp="headline"
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p
            className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1"
            itemProp="description"
          >
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground pt-3 border-t">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              <time dateTime={post.date} itemProp="datePublished">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            <span className="text-muted-foreground/50">|</span>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          {/* Hidden author for SEO */}
          <span className="sr-only" itemProp="author">
            {post.author.name}
          </span>
        </div>
      </article>
    </Link>
  );
}

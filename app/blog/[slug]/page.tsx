import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllSlugs, getAllPosts } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { BlurFade } from "@/components/ui/blur-fade";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { ReadingProgress } from "./reading-progress";
import { TableOfContents } from "./table-of-contents";
import { ShareCard } from "./share-card";
import { CodeBlock } from "./code-block";
import type { BlogPost } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const baseUrl = process.env.BASE_URL || "";

  if (!post) {
    return { title: "Post Not Found" };
  }

  const postUrl = `${baseUrl}/blog/${slug}`;

  return {
    title: `${post.title} | Chirag Talpada`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: postUrl,
      publishedTime: post.date,
      authors: [post.author.name],
      images: post.image ? [post.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-2xl sm:text-3xl font-bold mt-8 sm:mt-10 mb-4 scroll-mt-24 wrap-break-word"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-4 scroll-mt-24 pb-2 border-b wrap-break-word"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-lg sm:text-xl font-semibold mt-6 sm:mt-8 mb-3 scroll-mt-24 wrap-break-word"
      {...props}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="text-base sm:text-lg font-semibold mt-5 sm:mt-6 mb-2 scroll-mt-24 wrap-break-word"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="mb-5 leading-relaxed text-foreground/90 wrap-break-word"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-4 sm:pl-6 mb-5 space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-4 sm:pl-6 mb-5 space-y-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed wrap-break-word" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-primary hover:underline underline-offset-4 wrap-break-word"
      suppressHydrationWarning
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-primary/50 pl-4 sm:pl-6 py-2 my-6 text-muted-foreground italic bg-muted/30 rounded-r-lg"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono text-zinc-800 dark:text-zinc-200 wrap-break-word"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <CodeBlock>{props.children}</CodeBlock>
  ),
  hr: () => <hr className="my-8 border-muted" />,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="rounded-xl my-6 w-full max-w-full h-auto"
      alt={props.alt || ""}
      {...props}
    />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-6 max-w-full">
      <table
        className="w-full border-collapse border border-muted"
        {...props}
      />
    </div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border border-muted bg-muted px-4 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-muted px-4 py-2" {...props} />
  ),
};

// Extract headings from markdown content for TOC
function extractHeadings(
  content: string,
): Array<{ id: string; text: string; level: number }> {
  const headingRegex = /^(#{2})\s+(.+)$/gm;
  const headings: Array<{ id: string; text: string; level: number }> = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ id, text, level });
  }

  return headings;
}

// Get all other posts (excluding current) for SEO internal linking
async function getOtherPosts(currentSlug: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.slug !== currentSlug);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.content);
  const otherPosts = await getOtherPosts(slug);

  // JSON-LD structured data for SEO
  const baseUrl = process.env.BASE_URL || "";
  const postUrl = `${baseUrl}/blog/${slug}`;

  // Convert date to full ISO 8601 format for Google structured data
  const publishedDate = new Date(post.date).toISOString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: baseUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Chirag Talpada",
      url: baseUrl,
    },
    url: postUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    ...(post.image && {
      image: {
        "@type": "ImageObject",
        url: post.image.startsWith("http")
          ? post.image
          : `${baseUrl}${post.image}`,
      },
    }),
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Reading Progress Bar */}
      <ReadingProgress />

      <article
        className="min-h-screen"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        {/* Hero Section */}
        <Section className="pt-8 pb-8 md:pt-12 md:pb-12">
          {/* Back Link */}
          <BlurFade delay={0}>
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to Blog
            </Link>
          </BlurFade>

          {/* Header */}
          <BlurFade delay={0.1}>
            <header className="max-w-3xl mx-auto text-center mb-10">
              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-sm"
                    itemProp="keywords"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6"
                itemProp="headline"
              >
                {post.title}
              </h1>

              {/* Excerpt */}
              <p
                className="text-lg text-muted-foreground mb-8"
                itemProp="description"
              >
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src="/face_shot.webp"
                      alt={post.author.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span itemProp="author">{post.author.name}</span>
                </div>
                <span className="text-muted-foreground/50">|</span>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <time dateTime={post.date} itemProp="datePublished">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <span className="text-muted-foreground/50">|</span>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </header>
          </BlurFade>

          {/* Cover Image */}
          {post.image && (
            <BlurFade delay={0.2}>
              <div className="relative aspect-video rounded-2xl overflow-hidden max-w-4xl mx-auto mb-10">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority
                  itemProp="image"
                />
              </div>
            </BlurFade>
          )}
        </Section>

        {/* Main Content with TOC */}
        <Section className="py-8 md:py-12">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-[1fr_280px] gap-6 lg:gap-12">
              {/* Content */}
              <BlurFade delay={0.15} inView>
                <div
                  className="prose prose-sm sm:prose-lg dark:prose-invert max-w-none w-full overflow-hidden wrap-break-word"
                  itemProp="articleBody"
                >
                  <MDXRemote
                    source={post.content}
                    components={mdxComponents}
                    options={{
                      mdxOptions: {
                        remarkPlugins: [remarkGfm],
                        rehypePlugins: [rehypeHighlight, rehypeSlug],
                      },
                    }}
                  />
                </div>
              </BlurFade>

              {/* Sidebar with TOC */}
              {headings.length > 0 && (
                <aside className="hidden lg:block sticky top-24 h-fit">
                  <TableOfContents headings={headings} />
                </aside>
              )}
            </div>
          </div>
        </Section>

        {/* Share Card */}
        <Section className="py-8 md:py-12">
          <BlurFade delay={0} inView>
            <ShareCard
              title={post.title}
              url={`${process.env.BASE_URL || ""}/blog/${slug}`}
            />
          </BlurFade>
        </Section>

        {/* More Articles - Show all other posts for SEO */}
        {otherPosts.length > 0 && (
          <Section className="py-8 md:py-12">
            <BlurFade delay={0} inView>
              <h2 className="text-2xl font-bold mb-6">More Articles</h2>
            </BlurFade>
            <BlurFade delay={0.1} inView>
              <div className="grid md:grid-cols-2 gap-4">
                {otherPosts.map((otherPost) => (
                  <Link
                    key={otherPost.slug}
                    href={`/blog/${otherPost.slug}`}
                    className="group block"
                  >
                    <article className="h-full rounded-xl border bg-card p-5 hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {otherPost.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {otherPost.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                        {otherPost.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        <time dateTime={otherPost.date}>
                          {new Date(otherPost.date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </time>
                        <span className="text-muted-foreground/50">|</span>
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{otherPost.readingTime}</span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </BlurFade>
          </Section>
        )}

        {/* Author Card */}
        <Section className="py-8 md:py-12">
          <BlurFade delay={0} inView>
            <div className="rounded-2xl border bg-card p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Author Photo */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shrink-0 ring-4 ring-primary/10">
                  <Image
                    src="/face_shot.webp"
                    alt="Chirag Talpada"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Author Info + CTA */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-bold text-xl mb-2">
                    Written by Chirag Talpada
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Full-stack developer specializing in AI-powered
                    applications, modern web technologies, and scalable
                    solutions.
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-sm"
                    >
                      View Portfolio
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/#contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium"
                    >
                      Get in Touch
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </Section>
      </article>
    </>
  );
}

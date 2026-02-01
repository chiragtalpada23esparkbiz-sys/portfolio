import type { BlogPost } from "@/types";

interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  url: string;
  worksFor: string;
  sameAs?: string[];
}

export function PersonJsonLd({
  name,
  jobTitle,
  url,
  worksFor,
  sameAs = [],
}: PersonSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    url,
    worksFor: {
      "@type": "Organization",
      name: worksFor,
    },
    sameAs,
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "GraphQL",
      "PostgreSQL",
      "TypeScript",
      "AI Development",
      "LangChain",
      "Web Development",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebsiteSchemaProps {
  name: string;
  url: string;
  description: string;
}

export function WebsiteJsonLd({ name, url, description }: WebsiteSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    author: {
      "@type": "Person",
      name: "Chirag Talpada",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BlogPostSchemaProps {
  post: BlogPost;
  url: string;
}

export function BlogPostJsonLd({ post, url }: BlogPostSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Chirag Talpada",
    url: "https://chiragtalpada.dev",
    logo: "https://chiragtalpada.dev/og-image.png",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@chiragtalpada.dev",
      contactType: "customer service",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

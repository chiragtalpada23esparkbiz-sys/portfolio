import type { BlogPost, Project } from "@/types";

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

interface ProjectSchemaProps {
  project: Project;
}

export function ProjectJsonLd({ project }: ProjectSchemaProps) {
  const baseUrl = "https://chiragtalpada.dev";

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    applicationCategory: "WebApplication",
    operatingSystem: "Web Browser",
    author: {
      "@type": "Person",
      name: "Chirag Talpada",
      url: baseUrl,
      jobTitle: "Full Stack Developer",
    },
    creator: {
      "@type": "Person",
      name: "Chirag Talpada",
    },
    url: project.liveUrl || `${baseUrl}/projects/${project.slug}`,
    image: `${baseUrl}${project.thumbnail}`,
    screenshot: project.images.map((img) => `${baseUrl}${img.src}`),
    keywords: project.technologies.join(", "),
    about: {
      "@type": "Thing",
      name: project.subtitle,
      description: project.longDescription,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${baseUrl}/#projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${baseUrl}/projects/${project.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

export function AchievementsJsonLd() {
  const baseUrl = "https://chiragtalpada.dev";

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Achievements & Recognition",
    description:
      "Early-career programming achievements that reflect strong problem-solving foundations.",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "EducationalOccupationalCredential",
          name: "Blind Coding Competition Winner",
          description:
            "Won 1st place in Blind Coding competition demonstrating exceptional coding skills.",
          credentialCategory: "Award",
          recognizedBy: {
            "@type": "Organization",
            name: "VNSGU University",
          },
          dateCreated: "2019",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "EducationalOccupationalCredential",
          name: "DBMania Competition Winner",
          description:
            "Secured top position in database management competition.",
          credentialCategory: "Award",
          recognizedBy: {
            "@type": "Organization",
            name: "VNSGU University",
          },
          dateCreated: "2019",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "EducationalOccupationalCredential",
          name: "State Level Programming Competition",
          description:
            "Achieved recognition in state-level programming competition.",
          credentialCategory: "Award",
          recognizedBy: {
            "@type": "Organization",
            name: "Gujarat State",
          },
          dateCreated: "2020",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Achievements & Recognition",
        item: `${baseUrl}/achievements`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

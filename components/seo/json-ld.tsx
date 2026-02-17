import type { BlogPost, Project } from "@/types";
import { getAllAchievements } from "@/data/achievements";

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
    email: "chiragtalpada0227@gmail.com",
    image: `${url}/face_shot.webp`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gujarat",
      addressCountry: "IN",
    },
    worksFor: {
      "@type": "Organization",
      name: worksFor,
    },
    sameAs,
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "GraphQL",
      "tRPC",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "Redux",
      "AI Development",
      "LangChain",
      "LangGraph",
      "RAG Chatbots",
      "AI Agents",
      "OpenAI",
      "Anthropic Claude",
      "Automation",
      "Full-Stack Development",
      "SaaS Applications",
      "Web Development",
      "Docker",
      "Git",
      "GitHub",
      "Hasura",
      "Stripe Integration",
      "OAuth",
      "JWT Authentication",
      "Zod",
      "Windmill",
      "Hyperbrowser",
      "Cursor AI",
      "shadcn/ui",
      "Better-auth",
      "Zitadel",
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

interface ProjectSchemaProps {
  project: Project;
  baseUrl: string;
}

export function ProjectJsonLd({ project, baseUrl }: ProjectSchemaProps) {

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

interface AchievementsSchemaProps {
  baseUrl: string;
}

export function AchievementsJsonLd({ baseUrl }: AchievementsSchemaProps) {
  const allAchievements = getAllAchievements();

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Achievements & Recognition",
    description:
      "Early-career programming achievements that reflect strong problem-solving foundations.",
    itemListElement: allAchievements.map((a, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "EducationalOccupationalCredential",
        name: a.title,
        description: a.description,
        credentialCategory:
          a.category === "award"
            ? "Award"
            : a.category === "certificate"
              ? "Certificate"
              : "Recognition",
        recognizedBy: {
          "@type": "Organization",
          name: a.organization,
        },
        dateCreated: a.year,
      },
    })),
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

interface WorkExperienceSchemaProps {
  baseUrl: string;
}

export function WorkExperienceJsonLd({ baseUrl }: WorkExperienceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Chirag Talpada",
    url: baseUrl,
    hasOccupation: {
      "@type": "EmployeeRole",
      roleName: "Software Developer",
      startDate: "2023-01",
      worksFor: {
        "@type": "Organization",
        name: "eSparkBiz",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ahmedabad",
          addressCountry: "IN",
        },
      },
      responsibilities: [
        "Full-stack development using React, Next.js, TypeScript, Node.js, GraphQL, Hasura, PostgreSQL",
        "Building AI agents, RAG chatbots, and automation workflows using LangChain and LangGraph",
        "Designing scalable SaaS architectures with multi-tenant support and RBAC",
        "Implementing authentication, Stripe payments, and third-party integrations",
        "Optimizing Core Web Vitals and SEO performance for production applications",
        "Mentoring junior developers and conducting code reviews",
      ],
      skills: [
        "React", "Next.js", "Node.js", "TypeScript", "GraphQL",
        "Hasura", "PostgreSQL", "LangChain", "LangGraph", "tRPC",
        "Redis", "Tailwind CSS", "OpenAI", "Claude", "Redux Toolkit",
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface EducationSchemaProps {
  baseUrl: string;
}

export function EducationJsonLd({ baseUrl }: EducationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Chirag Talpada",
    url: baseUrl,
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Sardar Patel University",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gujarat",
          addressCountry: "IN",
        },
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "Master of Computer Application",
            credentialCategory: "degree",
            educationalLevel: "Postgraduate",
            dateCreated: "2023",
            recognizedBy: {
              "@type": "EducationalOrganization",
              name: "Sardar Patel University",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Bachelor of Computer Application",
            credentialCategory: "degree",
            educationalLevel: "Undergraduate",
            dateCreated: "2021",
            recognizedBy: {
              "@type": "EducationalOrganization",
              name: "Sardar Patel University",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

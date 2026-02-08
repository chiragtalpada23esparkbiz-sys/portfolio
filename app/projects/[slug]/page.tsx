import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { ProjectGallery } from "@/components/project-gallery";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  User,
  CheckCircle2,
  Zap,
} from "lucide-react";
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getFeaturedProjects,
} from "@/data/projects";
import type { Project } from "@/types";
import { ProjectJsonLd } from "@/components/seo/json-ld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const baseUrl = "https://chiragtalpada.dev";

  return {
    title: `${project.title} - ${project.subtitle}`,
    description: project.description,
    keywords: [
      project.title,
      project.subtitle,
      ...project.technologies,
      project.role,
      "portfolio",
      "case study",
      "web development",
      "full stack developer",
    ],
    openGraph: {
      title: `${project.title} | Chirag Talpada`,
      description: project.description,
      type: "article",
      url: `${baseUrl}/projects/${project.slug}`,
      images: [
        {
          url: `${baseUrl}${project.thumbnail}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Chirag Talpada`,
      description: project.description,
      images: [`${baseUrl}${project.thumbnail}`],
    },
    alternates: {
      canonical: `${baseUrl}/projects/${project.slug}`,
    },
  };
}

const categoryLabels: Record<Project["category"], string> = {
  saas: "SaaS Platform",
  enterprise: "Enterprise Solution",
  ai: "AI-Powered",
  healthcare: "Healthcare Technology",
};

const categoryColors: Record<Project["category"], string> = {
  saas: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  enterprise: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  ai: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  healthcare: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
};

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const otherProjects = getFeaturedProjects()
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  return (
    <>
      <ProjectJsonLd project={project} />

      <article className="min-h-screen">
        {/* Hero Section */}
        <Section className="pt-8 pb-12 md:pt-12 md:pb-16">
          {/* Back Link */}
          <Link
            href="/#projects"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>

          {/* Project Header */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Project Info */}
            <div>
              {/* Category Badge */}
              <Badge
                variant="outline"
                className={`mb-4 ${categoryColors[project.category]}`}
              >
                {categoryLabels[project.category]}
              </Badge>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                {project.title}
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-muted-foreground mb-6">
                {project.subtitle}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 mb-8 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{project.role}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{project.duration}</span>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                {project.longDescription.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed">
                    {paragraph.split("**").map((part, i) =>
                      i % 2 === 1 ? (
                        <strong key={i} className="text-foreground font-semibold">
                          {part}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </p>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.liveUrl && (
                  <Button size="lg" asChild>
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      View Live Site
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button size="lg" variant="outline" asChild>
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      View Source
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Right: Featured Image */}
            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden border shadow-2xl">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover object-left-top"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Section>

        {/* Tech Stack Section */}
        <Section className="py-12 md:py-16 bg-muted/30">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-sm px-4 py-2 font-medium"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </Section>

        {/* Project Gallery */}
        <Section className="py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Project Gallery</h2>
          <ProjectGallery images={project.images} />
        </Section>

        {/* Responsibilities & Achievements */}
        <Section className="py-12 md:py-16 bg-muted/30">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Key Responsibilities */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Key Responsibilities</h2>
              </div>
              <ul className="space-y-4">
                {project.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Achievements */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Zap className="h-5 w-5 text-emerald-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Key Achievements</h2>
              </div>
              <ul className="space-y-4">
                {project.achievements.map((achievement, index) => (
                  <li key={index} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <Section className="py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Other Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {otherProjects.map((otherProject) => (
                <Link
                  key={otherProject.id}
                  href={`/projects/${otherProject.slug}`}
                  className="group block rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="relative h-[200px] md:h-[240px] overflow-hidden">
                    <Image
                      src={otherProject.thumbnail}
                      alt={otherProject.title}
                      fill
                      className="object-cover object-left-top group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-5">
                    <Badge
                      variant="outline"
                      className={`mb-3 text-xs ${categoryColors[otherProject.category]}`}
                    >
                      {categoryLabels[otherProject.category]}
                    </Badge>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                      {otherProject.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {otherProject.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        )}

        {/* CTA Section */}
        <Section className="py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Interested in working together?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            I&apos;m always open to discussing new projects and opportunities.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/#contact">Get in Touch</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/#projects">View All Projects</Link>
            </Button>
          </div>
        </Section>
      </article>
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";
import type { Project } from "@/types";
import { BlurFade } from "../ui/blur-fade";
import posthog from "posthog-js";

const categoryLabels: Record<Project["category"], string> = {
  saas: "SaaS",
  enterprise: "Enterprise",
  ai: "AI-Powered",
  healthcare: "Healthcare",
};

const categoryColors: Record<Project["category"], string> = {
  saas: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  enterprise:
    "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  ai: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  healthcare:
    "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
};

export function Projects() {
  const projects = getFeaturedProjects();

  return (
    <Section id="projects" className="py-20 md:py-28">
      {/* Header */}
      <BlurFade delay={0} inView>
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Enterprise-grade applications I&apos;ve built, from AI platforms to
            healthcare systems
          </p>
        </header>
      </BlurFade>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <BlurFade
            key={project.id}
            delay={0.1 + 0.15 * i}
            inView
            className="h-full"
          >
            <ProjectCard project={project} />
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const displayedTechs = project.technologies.slice(0, 5);
  const remainingCount = project.technologies.length - 5;

  return (
    <article className="group rounded-2xl border bg-card overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-primary/30">
      {/* Image */}
      <Link
        href={`/projects/${project.slug}`}
        className="block overflow-hidden"
        onClick={() => posthog.capture("project_clicked", { project: project.title, action: "thumbnail" })}
      >
        <div className="relative h-70 md:h-80 overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={`${project.title} - ${project.subtitle} built with ${project.technologies.slice(0, 3).join(", ")}`}
            fill
            className="object-cover object-top-left group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Category & Role */}
        <div className="flex items-center gap-3 mb-4">
          <Badge
            variant="outline"
            className={`text-xs font-medium ${categoryColors[project.category]}`}
          >
            {categoryLabels[project.category]}
          </Badge>
          <span className="text-xs text-muted-foreground">{project.role}</span>
        </div>

        {/* Title */}
        <Link href={`/projects/${project.slug}`} onClick={() => posthog.capture("project_clicked", { project: project.title, action: "title" })}>
          <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
        </Link>

        {/* Subtitle */}
        <p className="text-sm text-muted-foreground mb-3 font-medium">
          {project.subtitle}
        </p>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-5 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-5">
          {displayedTechs.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-xs font-normal"
            >
              {tech}
            </Badge>
          ))}
          {remainingCount > 0 && (
            <Badge variant="secondary" className="text-xs font-normal">
              +{remainingCount} more
            </Badge>
          )}
          {/* Hidden remaining technologies for SEO */}
          {remainingCount > 0 && (
            <span className="sr-only">
              {project.technologies.slice(5).join(", ")}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button size="sm" variant="default" className="bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200" asChild>
            <Link href={`/projects/${project.slug}`} onClick={() => posthog.capture("project_clicked", { project: project.title, action: "view_details" })}>
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          {project.liveUrl && (
            <Button size="sm" variant="outline" asChild>
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture("project_live_site_clicked", { project: project.title })}
              >
                Live Site
                <ExternalLink className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

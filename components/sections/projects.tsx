"use client";

import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: "ai-content-generator",
    title: "AI-Powered Content Generator",
    description:
      "Next-gen content creation platform powered by GPT-4 and LangChain for automated content generation.",
    image: "/images/projects/ai-content.png",
    category: "ai-ml",
    technologies: ["React", "Next.js", "TypeScript", "OpenAI API", "LangChain", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "analytics-dashboard",
    title: "Real-Time Analytics Dashboard",
    description:
      "Enterprise-grade analytics platform for data-driven decisions with real-time updates.",
    image: "/images/projects/analytics.png",
    category: "web-app",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "WebSockets", "D3.js"],
    liveUrl: "#",
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description:
      "Modern e-commerce solution with headless CMS, Stripe payments, and inventory management.",
    image: "/images/projects/ecommerce.png",
    category: "web-app",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Stripe", "Hasura"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "task-management",
    title: "Task Management SaaS",
    description:
      "Collaborative project management tool for remote teams with real-time sync.",
    image: "/images/projects/task-mgmt.png",
    category: "web-app",
    technologies: ["React", "Node.js", "MongoDB", "WebSockets", "Redis"],
    liveUrl: "#",
  },
  {
    id: "social-automation",
    title: "Social Media Automation Tool",
    description:
      "Automated social media scheduling and analytics platform with AI-powered insights.",
    image: "/images/projects/social.png",
    category: "web-app",
    technologies: ["Next.js", "Python", "OpenAI API", "PostgreSQL", "Redis"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

export function Projects() {
  return (
    <Section id="projects" className="py-20 md:py-28">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Featured Projects
        </h2>
        <p className="text-muted-foreground text-lg">Some of my best work</p>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const displayedTechs = project.technologies.slice(0, 4);
  const remainingCount = project.technologies.length - 4;

  return (
    <div className="rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-all group">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-muted to-muted/50">
        {/* Placeholder gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 flex items-center justify-center">
          <span className="text-4xl font-bold text-primary/20">
            {project.title.charAt(0)}
          </span>
        </div>
        {/* Uncomment when you have actual images */}
        {/* <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        /> */}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category Badge */}
        <Badge variant="secondary" className="mb-3 text-xs">
          {project.category}
        </Badge>

        {/* Title */}
        <h3 className="font-bold text-lg mb-2">{project.title}</h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {displayedTechs.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs font-normal">
              {tech}
            </Badge>
          ))}
          {remainingCount > 0 && (
            <Badge variant="outline" className="text-xs font-normal">
              +{remainingCount}
            </Badge>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          {project.liveUrl && (
            <Button size="sm" className="flex-1" asChild>
              <Link href={project.liveUrl} target="_blank">
                Live Demo
              </Link>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <Link href={project.githubUrl} target="_blank">
                GitHub
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

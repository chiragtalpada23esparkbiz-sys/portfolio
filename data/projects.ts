import type { Project } from "@/types";
import portfolioData from "@/data/portfolio.json";

// Map JSON data (snake_case) to TypeScript interface (camelCase)
export const projects: Project[] = portfolioData.projects.map((project) => ({
  id: project.id,
  slug: project.slug,
  title: project.title,
  subtitle: project.subtitle,
  description: project.description,
  longDescription: project.long_description,
  category: project.category as Project["category"],
  role: project.role,
  duration: project.duration,
  thumbnail: project.thumbnail,
  images: project.images,
  technologies: project.technologies,
  responsibilities: project.responsibilities,
  achievements: project.achievements,
  liveUrl: project.live_url,
  featured: project.featured,
  order: project.order,
}));

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => a.order - b.order);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

"use client";

import { Section } from "@/components/ui/section";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Code2, Brain, Database, Cloud, Workflow, Shield } from "lucide-react";
import { TechIcons } from "@/components/tech_icons";
import { ReactElement, useEffect, useState } from "react";
import { BlurFade } from "../ui/blur-fade";
import portfolioData from "@/data/portfolio.json";

type TechIconType = {
  name: string;
  Icon: ReactElement;
};

// Responsive icons per row
const useIconsPerRow = () => {
  const [iconsPerRow, setIconsPerRow] = useState(12);

  useEffect(() => {
    const updateIconsPerRow = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setIconsPerRow(4);
      } else if (width < 640) {
        setIconsPerRow(5);
      } else if (width < 768) {
        setIconsPerRow(6);
      } else if (width < 1024) {
        setIconsPerRow(8);
      } else {
        setIconsPerRow(12);
      }
    };

    updateIconsPerRow();
    window.addEventListener("resize", updateIconsPerRow);
    return () => window.removeEventListener("resize", updateIconsPerRow);
  }, []);

  return iconsPerRow;
};

// Responsive icon sizes
const useIconSize = () => {
  const [sizes, setSizes] = useState({ iconSize: 60, magnification: 80 });

  useEffect(() => {
    const updateSizes = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSizes({ iconSize: 45, magnification: 50 });
      } else if (width < 768) {
        setSizes({ iconSize: 48, magnification: 60 });
      } else {
        setSizes({ iconSize: 60, magnification: 80 });
      }
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  return sizes;
};

// Icon and color mapping for expertise areas
const expertiseConfig = [
  { icon: Code2, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { icon: Brain, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
  { icon: Database, color: "bg-green-500/10 text-green-600 dark:text-green-400" },
  { icon: Cloud, color: "bg-orange-500/10 text-orange-600 dark:text-orange-400" },
  { icon: Workflow, color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400" },
  { icon: Shield, color: "bg-pink-500/10 text-pink-600 dark:text-pink-400" },
];

// Expertise areas with descriptions from JSON
const expertiseAreas = portfolioData.expertise_areas.map((area, index) => ({
  icon: expertiseConfig[index].icon,
  title: area.title,
  description: area.description,
  color: expertiseConfig[index].color,
}));

// Tech stack organized by category with actual icon components
const techCategories = [
  {
    name: "Frontend",
    technologies: [
      { name: "React", Icon: TechIcons.React },
      { name: "Next.js", Icon: TechIcons.NextJS },
      { name: "TypeScript", Icon: TechIcons.TypeScript },
      { name: "JavaScript", Icon: TechIcons.Javascript },
      { name: "Tailwind CSS", Icon: TechIcons.Tailwind },
      { name: "shadcn/ui", Icon: TechIcons.ShadcnUI },
      { name: "HTML5", Icon: TechIcons.HTML5 },
      { name: "CSS3", Icon: TechIcons.CSS3 },
      { name: "Redux", Icon: TechIcons.Redux },
    ],
  },
  {
    name: "Backend",
    technologies: [
      { name: "Node.js", Icon: TechIcons.NodeJS },
      { name: "Express.js", Icon: TechIcons.ExpressJS },
      { name: "GraphQL", Icon: TechIcons.GraphQL },
      { name: "tRPC", Icon: TechIcons.TRPC },
      { name: "Zod", Icon: TechIcons.Zod },
    ],
  },
  {
    name: "Database",
    technologies: [
      { name: "PostgreSQL", Icon: TechIcons.PostgreSQL },
      { name: "MySQL", Icon: TechIcons.MySQL },
      { name: "MongoDB", Icon: TechIcons.MongoDB },
      { name: "Redis", Icon: TechIcons.Redis },
      { name: "Hasura", Icon: TechIcons.Hasura },
      { name: "Zitadel", Icon: TechIcons.Zitadel },
      { name: "Better-auth", Icon: TechIcons.BetterAuth },
    ],
  },
  {
    name: "AI & ML",
    technologies: [
      { name: "OpenAI", Icon: TechIcons.OpenAI },
      { name: "Anthropic", Icon: TechIcons.Anthropic },
      { name: "Claude", Icon: TechIcons.Claude },
      { name: "LangChain/LangGraph", Icon: TechIcons.LangChain },
    ],
  },
  {
    name: "DevOps & Tools",
    technologies: [
      { name: "Docker", Icon: TechIcons.Docker },
      { name: "Git", Icon: TechIcons.Git },
      { name: "GitHub", Icon: TechIcons.GitHub },
      { name: "GitLab", Icon: TechIcons.GitLab },
      { name: "Postman", Icon: TechIcons.Postman },
      { name: "PostHog", Icon: TechIcons.PostHog },
      { name: "Cursor", Icon: TechIcons.Cursor },
      { name: "Hyperbrowser", Icon: TechIcons.hyperbrowser },
    ],
  },
  {
    name: "Services & PM",
    technologies: [
      { name: "Stripe", Icon: TechIcons.Stripe },
      { name: "Notion", Icon: TechIcons.Notion },
      { name: "Trello", Icon: TechIcons.Trello },
      { name: "Jira", Icon: TechIcons.Jira },
      { name: "Windmill", Icon: TechIcons.Windmill },
    ],
  },
];

function ExpertiseCard({
  expertise,
}: {
  expertise: (typeof expertiseAreas)[0];
}) {
  const Icon = expertise.icon;

  return (
    <article className="group relative h-full rounded-xl sm:rounded-2xl border bg-card p-4 sm:p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20">
      {/* Icon */}
      <div
        className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${expertise.color} mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      {/* Content */}
      <h3 className="font-semibold text-base sm:text-lg mb-1.5 sm:mb-2">
        {expertise.title}
      </h3>
      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
        {expertise.description}
      </p>
    </article>
  );
}

// Flatten all technologies
const allTechnologies: TechIconType[] = techCategories.flatMap(
  (cat) => cat.technologies,
);

// Chunk technologies into rows based on count
const chunkTechnologies = (iconsPerRow: number): TechIconType[][] => {
  return allTechnologies.reduce((acc, _, i) => {
    if (i % iconsPerRow === 0) {
      acc.push(allTechnologies.slice(i, i + iconsPerRow) as TechIconType[]);
    }
    return acc;
  }, [] as TechIconType[][]);
};

export function TechStack() {
  const iconsPerRow = useIconsPerRow();
  const { iconSize, magnification } = useIconSize();
  const chunkedTechnologies = chunkTechnologies(iconsPerRow);

  return (
    <Section id="tech-stack" className="py-12 sm:py-16 md:py-20 lg:py-28">
      {/* Header */}
      <BlurFade delay={0} inView>
        <header className="text-center mb-10 sm:mb-12 md:mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Specialized in building robust, scalable applications with modern
            technologies, focusing on exceptional user experiences and AI-driven
            solutions.
          </p>
        </header>
      </BlurFade>

      {/* Expertise Areas */}
      <div className="mb-12 sm:mb-16 md:mb-20">
        <h3 className="sr-only">Areas of Expertise</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {expertiseAreas.map((expertise, index) => (
            <BlurFade key={expertise.title} delay={0.1 + index * 0.1} inView className="h-full">
              <ExpertiseCard expertise={expertise} />
            </BlurFade>
          ))}
        </div>
      </div>

      {/* Tech Stack with Dock Effect */}
      <div>
        <div className="text-center mb-6 sm:mb-8 md:mb-10 px-4">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-2">
            Technologies I Use
          </h3>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-2xl mx-auto">
            From frontend frameworks to AI tools, these are the technologies I
            work with daily to build modern, scalable applications.
          </p>
        </div>

        <BlurFade delay={0.25} inView>
          <div className="relative overflow-x-auto">
            {chunkedTechnologies.map((techRaw, r) => {
              return (
                <Dock
                  key={`${r}-${iconsPerRow}`}
                  iconMagnification={magnification}
                  iconDistance={100}
                  className={`border-none min-w-fit ${r === 0 ? "mt-8" : ""}`}
                  iconSize={iconSize}
                >
                  {techRaw.map((tech, i) => {
                    const Icon = tech.Icon;

                    return (
                      <DockIcon
                        key={i}
                        className="group relative bg-black/10 dark:bg-white"
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 sm:mb-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-[10px] sm:text-xs font-medium shadow-lg border border-zinc-200 dark:border-zinc-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-20">
                          {tech.name}
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white dark:bg-zinc-800 border-b border-r border-zinc-200 dark:border-zinc-700 rotate-45" />
                        </div>
                        {/* Icon */}
                        <div className="w-full h-full [&>svg]:w-full [&>svg]:h-full">
                          {Icon}
                        </div>
                      </DockIcon>
                    );
                  })}
                </Dock>
              );
            })}
          </div>
        </BlurFade>
      </div>
    </Section>
  );
}

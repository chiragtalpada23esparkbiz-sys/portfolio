"use client";

import { Section } from "@/components/ui/section";

interface Skill {
  name: string;
  percentage: number;
  color: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "AI & ML",
    skills: [
      { name: "LangChain", percentage: 90, color: "bg-orange-400" },
      { name: "OpenAI API", percentage: 92, color: "bg-blue-500" },
      { name: "Vector DBs", percentage: 85, color: "bg-purple-500" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", percentage: 94, color: "bg-green-500" },
      { name: "GraphQL", percentage: 90, color: "bg-pink-500" },
      { name: "Hasura", percentage: 88, color: "bg-blue-600" },
      { name: "REST API Design", percentage: 91, color: "bg-gray-800 dark:bg-gray-200" },
      { name: "WebSockets", percentage: 78, color: "bg-blue-400" },
    ],
  },
  {
    name: "Cloud",
    skills: [
      { name: "Vercel", percentage: 92, color: "bg-gray-800 dark:bg-gray-200" },
      { name: "AWS", percentage: 75, color: "bg-orange-500" },
      { name: "Firebase", percentage: 80, color: "bg-yellow-500" },
    ],
  },
  {
    name: "Database",
    skills: [
      { name: "PostgreSQL", percentage: 92, color: "bg-teal-500" },
      { name: "MySQL", percentage: 85, color: "bg-blue-600" },
      { name: "Redis", percentage: 78, color: "bg-red-500" },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "React", percentage: 95, color: "bg-cyan-500" },
      { name: "Next.js", percentage: 93, color: "bg-gray-800 dark:bg-gray-200" },
      { name: "TypeScript", percentage: 92, color: "bg-blue-600" },
      { name: "Tailwind CSS", percentage: 95, color: "bg-teal-400" },
      { name: "ShadCN UI", percentage: 90, color: "bg-gray-700 dark:bg-gray-300" },
    ],
  },
  {
    name: "DevOps",
    skills: [
      { name: "Docker", percentage: 82, color: "bg-blue-500" },
      { name: "GitHub Actions", percentage: 88, color: "bg-gray-800 dark:bg-gray-200" },
      { name: "Windmill", percentage: 85, color: "bg-purple-500" },
    ],
  },
  {
    name: "Authentication",
    skills: [
      { name: "Zitadel", percentage: 88, color: "bg-orange-500" },
      { name: "BetterAuth", percentage: 85, color: "bg-green-500" },
      { name: "Authorizer", percentage: 82, color: "bg-blue-500" },
      { name: "OAuth/JWT", percentage: 90, color: "bg-gray-800 dark:bg-gray-200" },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", percentage: 95, color: "bg-orange-600" },
      { name: "Stripe", percentage: 85, color: "bg-purple-600" },
      { name: "Hyperbrowser", percentage: 80, color: "bg-blue-500" },
    ],
  },
  {
    name: "Soft Skills",
    skills: [
      { name: "Problem Solving", percentage: 95, color: "bg-green-500" },
      { name: "Communication", percentage: 90, color: "bg-gray-800 dark:bg-gray-200" },
      { name: "Team Collaboration", percentage: 92, color: "bg-blue-500" },
      { name: "Agile/Scrum", percentage: 88, color: "bg-teal-500" },
    ],
  },
];

function SkillBar({ skill }: { skill: Skill }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground w-28 text-right shrink-0">
        {skill.name}
      </span>
      <div className="flex-1 h-5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${skill.color} rounded-full transition-all duration-1000`}
          style={{ width: `${skill.percentage}%` }}
        />
      </div>
      <span className="text-sm text-muted-foreground w-10">
        {skill.percentage}%
      </span>
    </div>
  );
}

function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <div className="rounded-xl border bg-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">{category.name}</h3>
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-muted text-sm font-medium">
          {category.skills.length}
        </span>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        {category.skills.map((skill) => (
          <SkillBar key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <Section id="tech-stack" className="py-20 md:py-28">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Skills & Expertise
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          A comprehensive overview of my technical proficiencies and tools I work with daily
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {skillCategories.map((category) => (
          <SkillCard key={category.name} category={category} />
        ))}
      </div>
    </Section>
  );
}

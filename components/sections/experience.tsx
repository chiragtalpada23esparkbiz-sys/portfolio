"use client";

import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

interface Experience {
  id: string;
  title: string;
  company: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    id: "eSparkBiz",
    title: "Software Developer",
    company: "eSparkBiz",
    type: "full-time",
    startDate: "Jan 2023",
    endDate: "Present",
    location: "On site - Ahmedabad, India",
    description:
      "Dedicated Full Stack Developer working directly with international clients and stakeholders to design, build, and scale enterprise-grade SaaS products. Played a key role in delivering complex platforms across renewable energy, healthcare, UX intelligence, and AI-powered B2B SaaS, contributing from early-stage POCs to production systems used by thousands of users.",
    responsibilities: [
      "Worked as a dedicated developer for client projects, collaborating directly with founders, product owners, and stakeholders to deliver business-critical solutions",
      "Led end-to-end feature development from requirement analysis and technical design to implementation, testing, and production deployment",
      "Designed and developed scalable full-stack applications using React, Next.js, TypeScript, Node.js, GraphQL, Hasura and PostgreSQL",
      "Built highly responsive, data-intensive dashboards and workflows, including planners, schedulers, analytics views, and AI-generated reports",
      "Architected type-safe API layers using GraphQL (Hasura), tRPC, and code generation to ensure reliability and maintainability",
      "Developed real-time systems using subscriptions, background jobs, queues, and streaming APIs for scheduling, notifications, and AI workflows",
      "Built and maintained SEO-friendly applications using SSR, dynamic routing, structured data, and meta optimization",
      "Implemented multi-tenant SaaS architectures with role-based access control and strict organization-level data isolation",
      "Integrated third-party services including authentication, billing, notifications, file storage, analytics, and AI providers",
      "Optimized frontend performance by improving Core Web Vitals (LCP, CLS) and reducing page load times across large datasets",
      "Collaborated closely with backend teams, designers, and QA to deliver pixel-perfect, production-ready features",
      "Mentored junior developers, conducted code reviews, assessed trainees, and supported internal training programs",
      "Participated in technical interviews and campus recruitment drives, helping evaluate and onboard engineering talent",
    ],
    achievements: [
      "Delivered 10+ major production features and multiple enterprise platforms while working as a dedicated client-facing developer",
      "Successfully converted high-risk POCs into long-term projects, building client trust and enabling product scale and revenue growth",
      "Reduced application load times by 25–40% through performance optimization, caching strategies, and efficient rendering",
      "Improved Core Web Vitals by ~30%, significantly enhancing UX and SEO performance",
      "Increased organic traffic by up to 40% through SSR, SEO best practices, and structured metadata",
      "Built reusable UI component libraries, reducing code duplication by ~30% and improving development speed across teams",
      "Built and scaled a multi-organization healthcare platform supporting EHRs, appointments, billing, insurance claims, and audit trails",
      "Designed and implemented event-sourced financial workflows handling invoices, partial payments, refunds, and credits",
      "Played a key role in launching 2 AI-powered SaaS products used by a growing user base.",
      "Built RAG-based AI assistants and AI workflows that reduced manual reporting and analysis effort by up to 80%",
      "Reduced API response times by up to 50% through query optimization and caching",
      "Received internal recognition for delivering complex AI integrations and hard POCs under tight timelines",
      "Built a production-grade appointment and scheduling system with live updates, waitlists, and calendar views",
      "Achieved 99.9% streaming reliability with resumable stream architecture",
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "GraphQL",
      "Hasura",
      "PostgreSQL",
      "LangGraph",
      "tRPC",
      "TypeScript",
      "Redis",
      "Tailwind CSS",
      "Shadcn UI",
      "Redux Toolkit",
      "OpenAI",
      "Cluade",
    ],
  },
];

export function Experience() {
  return (
    <Section id="experience" className="py-20 md:py-28">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Work Experience
        </h2>
        <p className="text-muted-foreground text-lg">My professional journey</p>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1.75 top-2 bottom-2 w-0.5 bg-border" />

          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative pl-10">
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-foreground" />

                {/* Content */}
                <div className="space-y-4">
                  {/* Header */}
                  <div>
                    <h3 className="text-2xl font-bold">{exp.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="font-medium">{exp.company}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground text-sm">
                        {exp.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-1">
                      <span>
                        {exp.startDate} - {exp.endDate}
                      </span>
                      <span>•</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground">{exp.description}</p>

                  {/* Key Responsibilities */}
                  <div>
                    <h4 className="font-semibold mb-2">
                      Key Responsibilities:
                    </h4>
                    <ul className="space-y-1.5">
                      {exp.responsibilities.map((item, index) => (
                        <li
                          key={index}
                          className="text-muted-foreground text-sm flex items-start gap-2"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="font-semibold mb-2">Achievements:</h4>
                    <ul className="space-y-1.5">
                      {exp.achievements.map((item, index) => (
                        <li
                          key={index}
                          className="text-muted-foreground text-sm flex items-start gap-2"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

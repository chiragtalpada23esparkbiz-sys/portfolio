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
    id: "esparkbiz",
    title: "Full-Stack Developer",
    company: "eSparkBiz",
    type: "full-time",
    startDate: "Jan 2022",
    endDate: "Present",
    location: "Remote",
    description:
      "Leading the development of enterprise-scale web applications using React, Next.js, and GraphQL. Architecting microservices and implementing CI/CD pipelines for improved deployment efficiency.",
    responsibilities: [
      "Architect and implement scalable full-stack applications using React, Next.js, and Node.js",
      "Design and develop GraphQL APIs using Hasura for real-time data synchronization",
      "Implement AI-powered features using LangChain and OpenAI APIs",
      "Mentor junior developers and conduct code reviews",
      "Collaborate with product managers and designers on feature planning",
    ],
    achievements: [
      "Reduced application load time by 40% through performance optimization",
      "Implemented automated testing suite increasing code coverage to 85%",
      "Successfully built RAG-based chatbot serving 10,000+ users",
      "Led adoption of TypeScript across the codebase improving code quality",
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "GraphQL",
      "Hasura",
      "PostgreSQL",
      "LangChain",
    ],
  },
  {
    id: "missionctrl",
    title: "Full-Stack Developer & AI Specialist",
    company: "MissionCtrl",
    type: "full-time",
    startDate: "Mar 2021",
    endDate: "Dec 2021",
    location: "Remote",
    description:
      "Developed AI-powered web applications integrating machine learning models with modern web technologies. Specialized in building intelligent automation and workflow systems.",
    responsibilities: [
      "Built AI-powered SaaS platforms using React, Node.js, and Python",
      "Integrated OpenAI GPT models for intelligent chatbot features",
      "Developed RESTful APIs for ML model inference",
      "Optimized database queries for production environments",
      "Collaborated with data scientists to productionize ML models",
    ],
    achievements: [
      "Launched 2 successful AI products serving 5,000+ users",
      "Reduced API response time by 50% through caching and optimization",
      "Implemented real-time notification system processing 100K+ events daily",
      "Received recognition for AI integration excellence",
    ],
    technologies: [
      "React",
      "Node.js",
      "Python",
      "OpenAI API",
      "MongoDB",
      "Redis",
    ],
  },
  {
    id: "jurnii",
    title: "Junior Full-Stack Developer",
    company: "Jurnii",
    type: "full-time",
    startDate: "Jun 2020",
    endDate: "Feb 2021",
    location: "Remote",
    description:
      "Early-stage startup team member responsible for building web platform features from scratch. Wore multiple hats including frontend, backend, and DevOps responsibilities.",
    responsibilities: [
      "Built full-stack application features using MERN stack",
      "Designed and implemented RESTful APIs and database schemas",
      "Set up development workflows and deployment pipelines",
      "Implemented user authentication and authorization",
      "Collaborated directly with founders on product decisions",
    ],
    achievements: [
      "Delivered MVP ahead of schedule enabling successful funding round",
      "Built reusable component library reducing development time by 30%",
      "Implemented payment integration using Stripe",
      "Established coding standards and documentation practices",
    ],
    technologies: ["React", "Node.js", "Express", "MySQL", "Stripe", "AWS"],
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

                {/* Separator line */}
                <div className="mt-8 border-t" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

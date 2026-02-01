import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "sparkbiz",
    company: "SparkBiz",
    role: "Full Stack Developer",
    startDate: "2022",
    endDate: "Present",
    location: "Remote",
    description:
      "Actively contributing to designing, developing, and scaling modern web platforms. Working on architecture decisions, automation, integrations, and performance-oriented solutions.",
    highlights: [
      "Designed and developed scalable GraphQL APIs using Hasura",
      "Built AI-powered applications with LangChain and LangGraph",
      "Implemented RAG-based chatbots using vector databases",
      "Created automation workflows using Windmill",
      "Developed browser automation solutions with Hyperbrowser",
    ],
    technologies: [
      "Next.js",
      "React",
      "GraphQL",
      "Hasura",
      "PostgreSQL",
      "LangChain",
      "Node.js",
    ],
    logo: "/images/companies/sparkbiz.svg",
  },
  {
    id: "missionctrl",
    company: "MissionCtrl",
    role: "Frontend Developer",
    startDate: "2021",
    endDate: "2022",
    location: "Remote",
    description:
      "Developed responsive web applications and collaborated with cross-functional teams to deliver user-centric solutions.",
    highlights: [
      "Built interactive UIs using React and Tailwind CSS",
      "Implemented state management solutions",
      "Optimized frontend performance for better Core Web Vitals",
      "Collaborated with backend team on API integrations",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "REST APIs"],
    logo: "/images/companies/missionctrl.svg",
  },
  {
    id: "jurnii",
    company: "Jurnii",
    role: "Junior Developer",
    startDate: "2020",
    endDate: "2021",
    location: "Remote",
    description:
      "Started my professional journey as a developer, learning and contributing to web development projects.",
    highlights: [
      "Developed frontend components using React",
      "Learned database design and backend development",
      "Participated in code reviews and team discussions",
      "Contributed to improving development workflows",
    ],
    technologies: ["React", "JavaScript", "Node.js", "MySQL"],
    logo: "/images/companies/jurnii.svg",
  },
];

import type { Technology } from "@/types";

export const technologies: Technology[] = [
  // Frontend
  { name: "React", icon: "react", category: "frontend" },
  { name: "Next.js", icon: "nextjs", category: "frontend" },
  { name: "TypeScript", icon: "typescript", category: "frontend" },
  { name: "Tailwind CSS", icon: "tailwindcss", category: "frontend" },
  { name: "ShadCN UI", icon: "shadcn", category: "frontend" },

  // Backend
  { name: "Node.js", icon: "nodejs", category: "backend" },
  { name: "GraphQL", icon: "graphql", category: "backend" },
  { name: "Hasura", icon: "hasura", category: "backend" },
  { name: "REST APIs", icon: "api", category: "backend" },

  // Database
  { name: "PostgreSQL", icon: "postgresql", category: "database" },
  { name: "MySQL", icon: "mysql", category: "database" },
  { name: "Sequelize", icon: "sequelize", category: "database" },

  // AI/ML
  { name: "LangChain", icon: "langchain", category: "ai" },
  { name: "LangGraph", icon: "langgraph", category: "ai" },
  { name: "Vector DBs", icon: "vectordb", category: "ai" },
  { name: "AI SDKs", icon: "ai", category: "ai" },

  // Auth
  { name: "Zitadel", icon: "zitadel", category: "auth" },
  { name: "BetterAuth", icon: "betterauth", category: "auth" },
  { name: "Authorizer", icon: "authorizer", category: "auth" },

  // Tools
  { name: "Windmill", icon: "windmill", category: "tools" },
  { name: "Hyperbrowser", icon: "hyperbrowser", category: "tools" },
  { name: "Stripe", icon: "stripe", category: "tools" },
  { name: "Git", icon: "git", category: "tools" },
];

export const categoryLabels: Record<Technology["category"], string> = {
  frontend: "Frontend",
  backend: "Backend & APIs",
  database: "Databases",
  ai: "AI & ML",
  auth: "Authentication",
  tools: "Tools & Services",
};

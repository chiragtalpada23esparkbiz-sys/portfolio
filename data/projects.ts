import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "ai-chatbot-platform",
    title: "AI Chatbot Platform",
    description:
      "A RAG-based conversational AI platform with custom knowledge bases and multi-turn conversations.",
    longDescription:
      "Built a sophisticated AI chatbot platform using LangChain and vector databases. The platform supports custom knowledge bases, multi-turn conversations, and integrates with various data sources.",
    image: "/images/projects/ai-chatbot.png",
    technologies: ["LangChain", "Next.js", "PostgreSQL", "OpenAI", "Pinecone"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation Suite",
    description:
      "Enterprise workflow automation platform with visual workflow builder and integrations.",
    longDescription:
      "Developed a workflow automation platform using Windmill that allows users to create complex automated workflows with a visual builder. Supports various integrations and scheduling.",
    image: "/images/projects/workflow.png",
    technologies: ["Windmill", "TypeScript", "React", "PostgreSQL", "GraphQL"],
    liveUrl: "#",
    featured: true,
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description:
      "Full-featured e-commerce platform with Stripe payments, inventory management, and analytics.",
    longDescription:
      "Built a complete e-commerce solution with product management, cart functionality, secure payments via Stripe, and real-time analytics dashboard.",
    image: "/images/projects/ecommerce.png",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Hasura", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "real-time-dashboard",
    title: "Real-Time Analytics Dashboard",
    description:
      "Interactive dashboard with real-time data visualization and customizable widgets.",
    longDescription:
      "Created a real-time analytics dashboard with WebSocket connections, interactive charts, and customizable widget layouts. Supports multiple data sources.",
    image: "/images/projects/dashboard.png",
    technologies: ["React", "D3.js", "WebSocket", "Node.js", "Redis"],
    liveUrl: "#",
    featured: false,
  },
  {
    id: "auth-system",
    title: "Authentication System",
    description:
      "Secure authentication solution with OAuth, RBAC, and multi-factor authentication.",
    longDescription:
      "Implemented a comprehensive authentication system supporting multiple providers, role-based access control, and MFA. Integrated with Zitadel and custom solutions.",
    image: "/images/projects/auth.png",
    technologies: ["Zitadel", "Next.js", "PostgreSQL", "JWT", "OAuth2"],
    featured: false,
  },
  {
    id: "browser-automation",
    title: "Browser Automation Tool",
    description:
      "Automated browser tasks for web scraping, testing, and report generation.",
    longDescription:
      "Built browser automation solutions using Hyperbrowser for capturing screenshots, automating processes, and generating structured reports from web data.",
    image: "/images/projects/automation.png",
    technologies: ["Hyperbrowser", "Node.js", "TypeScript", "Puppeteer"],
    githubUrl: "#",
    featured: false,
  },
];

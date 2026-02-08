import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "revtik",
    slug: "revtik",
    title: "Revtik",
    subtitle: "AI-Powered Sales Enablement & GTM Intelligence Platform",
    description:
      "Multi-tenant B2B SaaS AI platform enabling sales consultancies to operationalize proprietary sales methodologies at scale with dual-mode AI architecture.",
    longDescription: `Revtik is a multi-tenant B2B SaaS AI platform that enables sales consultancies and enterprise teams to operationalize proprietary sales methodologies at scale. The platform allows organizations to load customer-specific GTM (Go-To-Market) frameworks, knowledge bases, and sales methodologies into AI—delivering both structured sales deliverables and free-form contextual chat through a dual-mode AI architecture.

The key innovation is a dual-mode AI system:
- **Generator Mode** for ontology-driven, structured outputs (discovery scripts, business cases, VSLs, email sequences)
- **Chat Mode** for conversational exploration with full customer and GTM context loaded

This enables sales teams to generate precisely formatted outputs or freely explore ideas without losing organizational context.`,
    category: "ai",
    role: "Full Stack Developer",
    duration: "2025 - Present",
    thumbnail: "/projects/revtik/revtik-dashboard.webp",
    images: [
      {
        src: "/projects/revtik/revtik-dashboard.webp",
        alt: "Revtik Dashboard",
        caption: "Main dashboard with customer overview and quick actions",
      },
      {
        src: "/projects/revtik/revtik-chat.webp",
        alt: "Revtik AI Chat Interface",
        caption: "Dual-mode AI chat with GTM context injection",
      },
      {
        src: "/projects/revtik/revtik-chat-md-preview.webp",
        alt: "Revtik Markdown Preview",
        caption: "Real-time markdown preview for generated deliverables",
      },
      {
        src: "/projects/revtik/revtik-chat-pdf-preview.webp",
        alt: "Revtik PDF Preview",
        caption: "PDF document generation and preview",
      },
      {
        src: "/projects/revtik/revtik-GTM-frameworks.webp",
        alt: "Revtik GTM Frameworks",
        caption: "GTM framework management with RDF/TTL ontology",
      },
    ],
    technologies: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS",
      "tRPC",
      "PostgreSQL",
      "Hasura GraphQL",
      "Redis",
      "BullMQ",
      "Anthropic Claude",
      "Vercel AI SDK",
      "MinIO S3",
      "Puppeteer",
      "React 19",
    ],
    responsibilities: [
      "Architected a dual-mode AI system supporting both structured generators and contextual chat via a unified skill engine",
      "Designed a dynamic context injection system loading customer-specific GTM frameworks (personas, pain points, competitors) into AI workflows",
      "Built a skill execution engine enabling structured deliverable generation such as discovery scripts, business cases, and email sequences",
      "Developed multi-tenant architecture with strict organization-level data isolation",
      "Implemented role-based access control (RBAC) with Super Admin, Org Owner, Org Admin, and Member roles",
      "Built customer onboarding flow supporting GTM framework uploads (RDF/TTL format) with automatic markdown previews",
      "Designed GTM framework storage using RDF/TTL ontology format with structured fields",
      "Implemented three-tier caching (Redis → PostgreSQL → MinIO) for fast AI context retrieval",
      "Developed real-time AI streaming chat with resumable streams for network resilience",
      "Built AI-powered document generators producing PDF, DOCX, Excel, PPTX, and Markdown deliverables",
    ],
    achievements: [
      "Enabled non-technical skill iteration by separating ontology ownership from output refinement",
      "Reduced GTM context load time by approximately 40% using Redis caching with intelligent invalidation",
      "Achieved 99.9% streaming reliability with resumable stream architecture",
      "Reduced manual sales deliverable creation time by approximately 80%",
      "Implemented dual-mode AI architecture allowing seamless switching between structured generators and free-form chat",
      "Implemented web search, web fetch, and document generation tools",
      "Multi-Format Document Generation & Preview: Enabled generation of PDF, DOCX, Excel, PPTX, and Markdown deliverables with real-time previews, streamlining sales collateral creation",
      "Built an intelligent chat system that automatically injects organization-specific GTM (Go-To-Market) data into AI context, enabling users to query customer personas, pain points, and sales strategies without manual context switching.",
    ],
    featured: true,
    order: 1,
  },
  {
    id: "jurnii",
    slug: "jurnii",
    title: "Jurnii",
    subtitle: "AI-Driven UX Intelligence Platform",
    description:
      "Enterprise SaaS platform leveraging AI to deliver comprehensive UX intelligence by analyzing web and mobile experiences with automated UX audit reports.",
    longDescription: `Jurnii is an enterprise-grade SaaS platform that delivers automated UX intelligence for web and mobile experiences. The platform leverages AI to analyze screenshots, recordings, and design artifacts, generating rich UX audit reports across Performance, Journey, Usability, and Perception dimensions.

What started as a proof of concept quickly evolved into a funded, revenue-generating product after stakeholders were impressed by the depth and clarity of the AI-generated reports. The platform is now actively used by clients and generates significant business value.

The platform offers two core products:
- **Analysis Product** – Generates detailed UX audit reports for websites, supporting both Expert Reports (in-depth single-site analysis) and Competitor Reports (comparative benchmarking across multiple sites)
- **Customer 360 (C360)** – Aggregates and visualizes promotional content and marketing campaigns through automated scraping and rich analytics dashboards`,
    category: "ai",
    role: "Full Stack Developer",
    duration: "2024-2025",
    thumbnail: "/projects/jurnii/jurnii-report-score-tab.webp",
    images: [
      {
        src: "/projects/jurnii/jurnii-reports.webp",
        alt: "Jurnii Reports Dashboard",
        caption: "UX audit reports overview with analysis status",
      },
      {
        src: "/projects/jurnii/jurnii-search.webp",
        alt: "Jurnii Search Interface",
        caption: "Intelligent search to execute rich UX reports on any website",
      },
      {
        src: "/projects/jurnii/jurnii-report-score-tab.webp",
        alt: "Jurnii Score Tab",
        caption: "Overall UX score with detailed breakdown",
      },
      {
        src: "/projects/jurnii/jurnii-report-performance-tab.webp",
        alt: "Jurnii Performance Analysis",
        caption: "Performance metrics and optimization recommendations",
      },
      {
        src: "/projects/jurnii/jurnii-report-journey-tab.webp",
        alt: "Jurnii Journey Analysis",
        caption: "User journey mapping and flow analysis",
      },
      {
        src: "/projects/jurnii/jurnii-report-usability-tab.webp",
        alt: "Jurnii Usability Analysis",
        caption: "Usability heuristics and accessibility insights",
      },
      {
        src: "/projects/jurnii/jurnii-report-perception-tab.webp",
        alt: "Jurnii Perception Analysis",
        caption: "Brand perception and visual design analysis",
      },
      {
        src: "/projects/jurnii/jurnii-C360-product.webp",
        alt: "Jurnii Customer 360",
        caption: "C360 product for promotional content aggregation",
      },
    ],
    technologies: [
      "Next.js 14",
      "TypeScript",
      "LangGraph",
      "Node js",
      "Express.js",
      "Hasura GraphQL",
      "PostgreSQL",
      "Redis",
      "OpenAI",
      "Tailwind CSS",
      "tRPC",
      "Stripe",
      "MinIO S3",
      "Inngest",
      "Liveblocks",
      "Zitadel",
      "Windmill",
    ],
    responsibilities: [
      "Led end-to-end development as Full Stack Developer, owning frontend architecture, report UX, AI workflows, and production rollouts",
      "Designed and built the entire frontend using Next.js 14 (App Router) with focus on performance and accessibility",
      "Created highly interactive UX audit reports with tab-based layouts, visual comparisons, and annotation workflows",
      "Optimized report rendering and data pipelines, reducing report load time from ~30 seconds to under 2 seconds",
      "Built an AI-powered Report Assistant chatbot using RAG, LangGraph, and PostgreSQL vector extensions",
      "Developed advanced AI workflows for industry onboarding, journey discovery, and heuristic generation",
      "Implemented automated journey execution using browser automation and screenshots",
      "Integrated Stripe subscriptions and billing with plan-based feature access",
      "Built notification systems and internal automation using Windmill flows",
      "Managed production data migration, user account creation, and report reassignment in live environments",
    ],
    achievements: [
      "Played key role in evolving product from POC to funded, revenue-generating SaaS platform",
      "Reduced UX audit time from weeks to hours by automating analysis through AI-powered workflows",
      "Improved report load times from 16s to ~2s through optimization",
      "Designed modular LangGraph architecture enabling parallel execution of 4 assessment categories",
      "Built scalable competitor benchmarking system processing multiple websites simultaneously",
      "Achieved type-safe end-to-end development with Zod validation and GraphQL codegen",
      "Implemented real-time collaboration features for team annotations using Liveblocks",
    ],
    liveUrl: "https://www.jurnii.io",
    featured: true,
    order: 2,
  },
  {
    id: "medical-ocean",
    slug: "medical-ocean",
    title: "Medical Ocean",
    subtitle: "Enterprise EHR & Hospital Management Platform",
    description:
      "Comprehensive, enterprise-grade Electronic Health Records (EHR) SaaS platform for managing patient records, appointments, billing, and clinical workflows.",
    longDescription: `Medical Ocean is a comprehensive, enterprise-grade Electronic Health Records (EHR) SaaS platform designed to help healthcare organizations manage patient records, appointments, billing, and clinical workflows. The platform supports multi-organization and multi-location healthcare operations with real-time scheduling, standardized medical coding, and robust financial workflows.

The platform promotes interoperability, data-driven decision-making, and HIPAA-compliant healthcare operations for multi-location healthcare organizations. It features comprehensive patient management with demographics, medical history, allergies, vitals tracking, and ICD-11 medical coding integration.`,
    category: "healthcare",
    role: "Full Stack Developer",
    duration: "2023 - 2024",
    thumbnail: "/projects/medical_ocean/medical-ocean-schedule.webp",
    images: [
      {
        src: "/projects/medical_ocean/medical-ocean-schedule.webp",
        alt: "Medical Ocean Scheduling",
        caption: "Real-time appointment scheduling with calendar integration",
      },
      {
        src: "/projects/medical_ocean/medical-ocean-worklist.webp",
        alt: "Medical Ocean Worklist",
        caption: "Practitioner worklist with live appointment status",
      },
      {
        src: "/projects/medical_ocean/medical-ocean-patient.webp",
        alt: "Medical Ocean Patient Management",
        caption: "Comprehensive patient record management",
      },
      {
        src: "/projects/medical_ocean/medical-ocean-invoice.webp",
        alt: "Medical Ocean Invoicing",
        caption: "invoice management",
      },
    ],
    technologies: [
      "Next.js",
      "Hasura",
      "PostgreSQL",
      "Tailwind CSS",
      "Shadcn UI",
      "tRPC",
      "GraphQL",
      "TypeScript",
      "Zitadel",
      "Novu",
      "Metabase",
      "MinIO S3",
      "FullCalendar",
      "Puppeteer",
      "Redux Toolkit",
    ],
    responsibilities: [
      "Worked as dedicated Full Stack Developer, collaborating directly with stakeholders on healthcare workflows",
      "Designed and developed core modules including Patients, Practitioners, Organizations, Locations, and Appointment Scheduling",
      "Built real-time scheduling system with worklists, waitlists, and live appointment status using Hasura subscriptions",
      "Implemented event-sourcing architecture to maintain complete audit trails across healthcare and finance modules",
      "Developed billing and finance modules including Invoices, Claims, Credit Notes, Refunds, and Payments",
      "Implemented double-entry accounting logic (debit/credit) supporting partial payments and balance adjustments",
      "Integrated WHO ICD-11, CPT codes, and dm+d medicine data model for standardized clinical documentation",
      "Built secure, multi-tenant authentication using Zitadel OAuth with organization-level isolation",
      "Implemented notifications for appointments and billing events using Novu and scheduled background jobs",
      "Developed PDF generation workflows for invoices and reports using Puppeteer",
      "Integrated secure file storage using MinIO/S3 with presigned URLs for medical documents",
    ],
    achievements: [
      "Delivered scalable, multi-organization healthcare platform supporting real-world clinical workflows",
      "Built production-grade appointment and scheduling system with live updates and waitlists",
      "Implemented robust financial system handling invoices, partial payments, credits, and insurance claims",
      "Designed event-sourced architecture ensuring data consistency for healthcare transactions",
      "Enabled standardized medical documentation through ICD-11, CPT, and dm+d integrations",
      "Improved developer productivity through type-safe APIs and GraphQL code generation",
      "Built type-safe full-stack architecture with GraphQL, tRPC, and TypeScript ensuring zero runtime type errors",
    ],
    featured: true,
    order: 3,
  },
  {
    id: "twindo",
    slug: "twindo",
    title: "Twindo",
    subtitle: "Wind Energy Management Platform",
    description:
      "Enterprise-grade, cloud-based platform designed to digitally transform wind energy operations with project planning, workforce management, and analytics.",
    longDescription: `Twindo is an enterprise-grade, cloud-based platform designed to digitally transform wind energy operations. It streamlines project planning, workforce management, safety and quality workflows, data tracking, and analytics across wind farms through a scalable and highly customizable system tailored for the renewable energy sector.

The platform enables efficient management of wind farm operations with features like dynamic form building for inspections and safety checks, advanced job planning with multi-slot scheduling, and interactive map integration for visualizing wind sites and operational data.`,
    category: "enterprise",
    role: "Full Stack Developer",
    duration: "2023",
    thumbnail: "/projects/twindo/twindo-projects.webp",
    images: [
      {
        src: "/projects/twindo/twindo-planner.webp",
        alt: "Twindo Planner",
        caption: "Advanced job planner with multi-slot scheduling",
      },
      {
        src: "/projects/twindo/twindo-assest-planner.webp",
        alt: "Twindo Asset Planner",
        caption: "Asset-level planning and maintenance scheduling",
      },
      {
        src: "/projects/twindo/twindo-forms.webp",
        alt: "Twindo Dynamic Forms",
        caption: "Drag-and-drop form builder for inspections and safety checks",
      },
      {
        src: "/projects/twindo/twindo-projects.webp",
        alt: "Twindo Projects Dashboard",
        caption: "Wind farm projects overview and management",
      },
    ],
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Redux",
      "REST APIs",
      "Tailwind CSS",
    ],
    responsibilities: [
      "Worked as full-stack Developer contributing to multiple core modules of the platform",
      "Integrated APIs for key entities including Workers, Turbines, Jobs, Sites, and Projects",
      "Designed and developed dynamic Form Builder with drag & drop features using react-beautiful-dnd",
      "Built advanced Planner module to assign jobs/tasks to workers using multi-slot scheduling and availability logic",
      "Developed and maintained complex, data-driven UI dashboards with focus on usability and scalability",
      "Implemented interactive map integration for visualizing wind sites, turbines, and operational data",
      "Performed frontend performance optimizations to improve load time and responsiveness",
      "Collaborated closely with backend teams and product stakeholders to deliver production-ready features",
      "Customized and extended react-calendar-timeline beyond default library capabilities",
      "Reworked internal timeline components and styles using custom CSS and layout logic",
    ],
    achievements: [
      "Successfully delivered multiple business-critical modules used in real-world wind energy operations",
      "Improved user productivity by enabling efficient job planning and workforce allocation",
      "Reduced manual effort and errors through customizable digital forms and workflows",
      "Enhanced application performance and user experience across large datasets",
      "Implemented smooth auto-scroll dragging behavior for timeline items by patching the library",
      "Overcame third-party library limitations by modifying internal behavior for large-scale scheduling",
      "Delivered highly usable planner experience despite framework constraints",
    ],
    liveUrl: "https://www.twindo.ai",
    featured: true,
    order: 4,
  },
];

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

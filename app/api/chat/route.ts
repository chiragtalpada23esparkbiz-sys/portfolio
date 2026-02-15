import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { streamText, generateText, type UIMessage } from "ai";
import portfolioData from "@/data/portfolio.json";

export const maxDuration = 30;

const FREE_MODELS = [
  "openai/gpt-oss-120b:free",
  "z-ai/glm-4.6v",
  "x-ai/grok-4.1-fast",
];

// Create OpenRouter client using OpenAI-compatible provider
const openrouter = createOpenAICompatible({
  name: "openrouter",
  baseURL: "https://openrouter.ai/api/v1",
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "HTTP-Referer": process.env.BASE_URL || "http://localhost:3000",
    "X-Title": "Chirag's Portfolio",
  },
});

// Schema describing portfolio.json properties for classification
const portfolioSchema = {
  personal:
    "Basic personal info: name, title, tagline, years of experience, current company, location, availability, email, phone, social links (LinkedIn, GitHub, Twitter), profile image, CV link",
  about:
    "About section: short bio, detailed bio paragraphs explaining background, expertise areas, and philosophy. Also includes stats (projects count, technologies, years experience, achievements)",
  hero: "Hero section: rotating roles/specializations (Full-Stack SaaS Apps, AI-Powered Solutions, etc.) and main description/tagline",
  experience:
    "Work experience: job history with company names, roles, dates, locations, descriptions, responsibilities, achievements, and technologies used at each position",
  education:
    "Education background: degrees, institutions, fields of study, dates, GPA, descriptions, and academic achievements",
  tech_stack:
    "Technical skills organized by category: frontend (React, Next.js, etc.), backend (Node.js, Express, etc.), database (PostgreSQL, etc.), AI/ML tools, DevOps tools, and services",
  expertise_areas:
    "Areas of expertise with descriptions: Full-Stack Development, AI & Automation, Database & APIs, DevOps, Workflow Automation, Auth & Payments",
  testimonials:
    "Client testimonials: quotes from clients/colleagues with their names, roles, companies, and ratings",
  contact:
    "Contact information: email, phone, location, and social media links",
  projects:
    "Portfolio projects: detailed project info including titles, descriptions, technologies used, responsibilities, achievements, live URLs, and images",
  achievements:
    "Awards and recognition: competition wins, academic achievements, certificates, with descriptions, years, and organizations",
  certifications:
    "Professional certifications: titles, issuers, dates, descriptions, skills covered, and verification URLs",
};

// Valid portfolio property keys
const validProperties = [
  "personal",
  "about",
  "hero",
  "experience",
  "education",
  "tech_stack",
  "expertise_areas",
  "testimonials",
  "contact",
  "projects",
  "achievements",
  "certifications",
] as const;

type PortfolioProperty = (typeof validProperties)[number];

// Parse the classification response to extract property names
function parseClassificationResponse(text: string): PortfolioProperty[] {
  const lowerText = text.toLowerCase();
  const foundProperties: PortfolioProperty[] = [];

  for (const prop of validProperties) {
    // Check if the property name appears in the response
    if (lowerText.includes(prop.toLowerCase())) {
      foundProperties.push(prop);
    }
  }

  // If no properties found, return defaults based on common queries
  if (foundProperties.length === 0) {
    return ["personal", "about", "experience"];
  }

  // Limit to 4 most relevant properties
  return foundProperties.slice(0, 4);
}

// Function to gather context based on classified properties
function gatherContext(properties: string[]): string {
  const contextParts: string[] = [];

  for (const prop of properties) {
    switch (prop) {
      case "personal":
        contextParts.push(`## Personal Information
- Name: ${portfolioData.personal.name}
- Title: ${portfolioData.personal.title}
- Tagline: ${portfolioData.personal.tagline}
- Years of Experience: ${portfolioData.personal.years_of_experience}
- Current Company: ${portfolioData.personal.current_company}
- Location: ${portfolioData.personal.location}
- Available for Work: ${portfolioData.personal.available_for_work}
- Email: ${portfolioData.personal.email}
- Phone: ${portfolioData.personal.phone}
- LinkedIn: ${portfolioData.personal.linkedin}
`);
        break;

      case "about":
        contextParts.push(`## About
${portfolioData.about.short_bio}

### Detailed Background
${portfolioData.about.detailed_bio.join("\n\n")}

### Stats
${portfolioData.about.stats.map((s) => `- ${s.label}: ${s.value}+`).join("\n")}`);
        break;

      case "hero":
        contextParts.push(`## Hero/Introduction
- Specializations: ${portfolioData.hero.roles.join(", ")}
- Description: ${portfolioData.hero.description}`);
        break;

      case "experience":
        contextParts.push(`## Work Experience
${portfolioData.experience
  .map(
    (exp) => `
### ${exp.title} at ${exp.company}
- Duration: ${exp.start_date} - ${exp.end_date}
- Location: ${exp.location}
- Type: ${exp.type}

${exp.description}

**Key Responsibilities:**
${exp.responsibilities
  .slice(0, 8)
  .map((r) => `- ${r}`)
  .join("\n")}

**Key Achievements:**
${exp.achievements
  .slice(0, 8)
  .map((a) => `- ${a}`)
  .join("\n")}

**Technologies:** ${exp.technologies.join(", ")}
`,
  )
  .join("\n")}`);
        break;

      case "education":
        contextParts.push(`## Education
${portfolioData.education
  .map(
    (edu) => `
### ${edu.degree} - ${edu.institution}
- Field: ${edu.field}
- Duration: ${edu.start_date} - ${edu.end_date}
- GPA: ${edu.gpa}

${edu.description}

**Achievements:**
${edu.achievements.map((a) => `- ${a}`).join("\n")}
`,
  )
  .join("\n")}`);
        break;

      case "tech_stack":
        contextParts.push(`## Technical Skills
- **Frontend:** ${portfolioData.tech_stack.frontend.join(", ")}
- **Backend:** ${portfolioData.tech_stack.backend.join(", ")}
- **Database:** ${portfolioData.tech_stack.database.join(", ")}
- **AI/ML:** ${portfolioData.tech_stack.ai_ml.join(", ")}
- **DevOps:** ${portfolioData.tech_stack.devops.join(", ")}
- **Services:** ${portfolioData.tech_stack.services.join(", ")}`);
        break;

      case "expertise_areas":
        contextParts.push(`## Areas of Expertise
${portfolioData.expertise_areas.map((area) => `- **${area.title}:** ${area.description}`).join("\n")}`);
        break;

      case "testimonials":
        contextParts.push(`## Client Testimonials
${portfolioData.testimonials
  .map(
    (t) => `
### ${t.name} - ${t.role} at ${t.company}
"${t.content}"
Rating: ${t.rating}/5
`,
  )
  .join("\n")}`);
        break;

      case "contact":
        contextParts.push(`## Contact Information
${portfolioData.contact.info.map((c) => `- ${c.label}: ${c.value}`).join("\n")}

### Social Links
${portfolioData.contact.social_links.map((s) => `- ${s.label}: ${s.href}`).join("\n")}`);
        break;

      case "projects":
        contextParts.push(`## Projects
${portfolioData.projects
  .map(
    (proj) => `
### ${proj.title} - ${proj.subtitle}
- Role: ${proj.role}
- Duration: ${proj.duration}
- Category: ${proj.category}
${proj.live_url ? `- Live URL: ${proj.live_url}` : ""}

${proj.description}

**Technologies:** ${proj.technologies.join(", ")}

**Key Achievements:**
${proj.achievements
  .slice(0, 5)
  .map((a) => `- ${a}`)
  .join("\n")}
`,
  )
  .join("\n")}`);
        break;

      case "achievements":
        contextParts.push(`## Achievements & Awards
${portfolioData.achievements
  .filter((a) => a.featured || a.category === "award")
  .slice(0, 10)
  .map(
    (ach) => `
### ${ach.title}
- Year: ${ach.year}
- Organization: ${ach.organization}
- Category: ${ach.category}

${ach.description}
`,
  )
  .join("\n")}`);
        break;

      case "certifications":
        contextParts.push(`## Certifications
${portfolioData.certifications
  .map(
    (cert) => `
### ${cert.title}
- Issuer: ${cert.issuer}
- Date: ${cert.date}
${cert.valid_until ? `- Valid Until: ${cert.valid_until}` : ""}
- Skills: ${cert.skills.join(", ")}

${cert.description}
`,
  )
  .join("\n")}`);
        break;
    }
  }

  return contextParts.join("\n\n---\n\n");
}

// System prompt for final response generation
const responseSystemPrompt = `You are Chirag Talpada's AI assistant on his portfolio website. You help visitors learn about Chirag and answer their questions based on the provided context.

## Guidelines for responses
1. Be friendly, professional, and helpful
2. Keep responses concise but informative (2-4 sentences per point)
3. ONLY use information from the provided context - do not make up details
4. If asked about hiring or collaboration, encourage them to reach out via email or LinkedIn
5. If the context doesn't contain the answer, say so honestly and suggest contacting Chirag directly
6. Be enthusiastic about Chirag's work and capabilities
7. Use a conversational tone - technical yet approachable
8. NEVER use markdown tables - they don't display well in chat. Use bullet points or simple lists instead
9. Keep formatting simple: use bold for emphasis, bullet points for lists, and short paragraphs
10. When listing multiple items, pick the most relevant ones rather than listing everything`;

// Convert UIMessage format to model message format
function convertToModelMessages(messages: UIMessage[]) {
  return messages
    .filter((msg) => msg.role === "user" || msg.role === "assistant")
    .map((msg) => {
      const textContent = msg.parts
        .filter(
          (part): part is { type: "text"; text: string } =>
            part.type === "text",
        )
        .map((part) => part.text)
        .join("");

      return {
        role: msg.role as "user" | "assistant",
        content: textContent,
      };
    });
}

// Helper to check if error is a rate limit error
function isRateLimitError(error: unknown): boolean {
  if (error && typeof error === "object") {
    const err = error as { statusCode?: number; message?: string };
    return (
      err.statusCode === 429 ||
      (err.message?.toLowerCase().includes("rate limit") ?? false)
    );
  }
  return false;
}

// Create a rate limit error response
function createRateLimitResponse() {
  return new Response(
    JSON.stringify({
      error: "rate_limit",
      message:
        "Daily AI conversation limit reached. Please try again tomorrow.",
      contact: {
        email: portfolioData.personal.email,
        linkedin: portfolioData.personal.linkedin,
      },
    }),
    {
      status: 429,
      headers: { "Content-Type": "application/json" },
    },
  );
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Convert UIMessage format to model message format
    const modelMessages = convertToModelMessages(messages);

    // Get the latest user message
    const latestUserMessage =
      modelMessages.filter((m) => m.role === "user").pop()?.content || "";

    // Step 1: Classify the query to identify relevant portfolio properties
    const classificationPrompt = `You are a query classifier. Given a user's question about a developer's portfolio, identify which sections are needed to answer it.

Available sections: ${validProperties.join(", ")}

Section descriptions:
${Object.entries(portfolioSchema)
  .map(([key, desc]) => `- ${key}: ${desc}`)
  .join("\n")}

User's question: "${latestUserMessage}"

Reply with ONLY the section names (comma-separated) that are needed. Example: "about, experience, projects"`;

    let relevantProperties: PortfolioProperty[];

    try {
      const classification = await generateText({
        model: openrouter.chatModel(FREE_MODELS[2]),
        prompt: classificationPrompt,
      });
      relevantProperties = parseClassificationResponse(classification.text);
    } catch (classificationError) {
      if (isRateLimitError(classificationError)) {
        return createRateLimitResponse();
      }
      // If classification fails for other reasons, use default properties
      console.error("Classification error:", classificationError);
      relevantProperties = ["personal", "about", "experience"];
    }

    // Step 2: Gather context from identified properties
    const context = gatherContext(relevantProperties);

    // Step 3: Generate response with relevant context
    const result = streamText({
      model: openrouter.chatModel(FREE_MODELS[2]),
      system: `${responseSystemPrompt}

## Context from Chirag's Portfolio
The following information is available to answer the user's question:

${context}`,
      messages: modelMessages,
    });

    return result.toUIMessageStreamResponse({
      sendSources: true,
      sendReasoning: true,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    if (isRateLimitError(error)) {
      return createRateLimitResponse();
    }

    // Generic error response
    return new Response(
      JSON.stringify({
        error: "Something went wrong. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

import { anthropic } from "@ai-sdk/anthropic";
import { streamText, type UIMessage } from "ai";
import portfolioData from "@/data/portfolio.json";

export const maxDuration = 30;

const MODEL = "claude-haiku-4-5-20251001";

// Built once at module load — identical string every request → same cache key
const SYSTEM_PROMPT = buildSystemPrompt();

function buildSystemPrompt(): string {
  const {
    personal, about, hero, experience, education,
    tech_stack, expertise_areas, testimonials, contact, projects, achievements,
  } = portfolioData;

  const context = `## Personal Information
- Name: ${personal.name}
- Title: ${personal.title}
- Tagline: ${personal.tagline}
- Years of Experience: ${personal.years_of_experience}
- Current Company: ${personal.current_company}
- Location: ${personal.location}
- Available for Work: ${personal.available_for_work}
- Email: ${personal.email}
- Phone: ${personal.phone}
- LinkedIn: ${personal.linkedin}

---

## About
${about.short_bio}

### Detailed Background
${about.detailed_bio.join("\n\n")}

### Stats
${about.stats.map((s) => `- ${s.label}: ${s.value}+`).join("\n")}

---

## Hero/Introduction
- Specializations: ${hero.roles.join(", ")}
- Description: ${hero.description}

---

## Work Experience
${experience.map((exp) => `
### ${exp.title} at ${exp.company}
- Duration: ${exp.start_date} - ${exp.end_date}
- Location: ${exp.location}

${exp.description}

**Key Responsibilities:**
${exp.responsibilities.slice(0, 8).map((r) => `- ${r}`).join("\n")}

**Key Achievements:**
${exp.achievements.slice(0, 8).map((a) => `- ${a}`).join("\n")}

**Technologies:** ${exp.technologies.join(", ")}`).join("\n")}

---

## Education
${education.map((edu) => `
### ${edu.degree} - ${edu.institution}
- Field: ${edu.field}
- Duration: ${edu.start_date} - ${edu.end_date}
- GPA: ${edu.gpa}

${edu.description}

**Achievements:**
${edu.achievements.map((a) => `- ${a}`).join("\n")}`).join("\n")}

---

## Technical Skills
- **Frontend:** ${tech_stack.frontend.join(", ")}
- **Backend:** ${tech_stack.backend.join(", ")}
- **Database:** ${tech_stack.database.join(", ")}
- **AI/ML:** ${tech_stack.ai_ml.join(", ")}
- **DevOps:** ${tech_stack.devops.join(", ")}
- **Services:** ${tech_stack.services.join(", ")}

---

## Areas of Expertise
${expertise_areas.map((area) => `- **${area.title}:** ${area.description}`).join("\n")}

---

## Client Testimonials
${testimonials.map((t) => `
### ${t.name} - ${t.role} at ${t.company}
"${t.content}"
Rating: ${t.rating}/5`).join("\n")}

---

## Contact Information
${contact.info.map((c) => `- ${c.label}: ${c.value}`).join("\n")}

### Social Links
${contact.social_links.map((s) => `- ${s.label}: ${s.href}`).join("\n")}

---

## Projects
${projects.map((proj) => `
### ${proj.title} - ${proj.subtitle}
- Role: ${proj.role}
- Duration: ${proj.duration}
- Category: ${proj.category}
${proj.live_url ? `- Live URL: ${proj.live_url}` : ""}

${proj.description}

**Technologies:** ${proj.technologies.join(", ")}

**Key Achievements:**
${proj.achievements.slice(0, 5).map((a) => `- ${a}`).join("\n")}`).join("\n")}

---

## Achievements & Awards
${achievements
  .filter((a) => a.featured || a.category === "award")
  .slice(0, 10)
  .map((ach) => `
### ${ach.title}
- Year: ${ach.year}
- Organization: ${ach.organization}
- Category: ${ach.category}

${ach.description}`).join("\n")}`;

  return `You are Chirag Talpada's AI assistant on his portfolio website. You help visitors learn about Chirag and answer their questions based on the provided context.

## Guidelines
1. Be friendly, professional, and helpful
2. Keep responses concise but informative (2-4 sentences per point)
3. ONLY use information from the provided context — do not make up details
4. If asked about hiring or collaboration, encourage them to reach out via email or LinkedIn
5. If the context doesn't contain the answer, say so honestly and suggest contacting Chirag directly
6. Be enthusiastic about Chirag's work and capabilities
7. Use a conversational tone — technical yet approachable
8. NEVER use markdown tables. Use bullet points or simple lists instead
9. Keep formatting simple: bold for emphasis, bullet points for lists, short paragraphs
10. When listing items, pick the most relevant ones rather than listing everything
11. Always spell the developer's name correctly: "Chirag" or "Chirag Talpada"

## Chirag's Portfolio Data
${context}`;
}

const ALLOWED_ORIGINS = [
  process.env.BASE_URL ?? "http://localhost:3000",
];

function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (origin) {
    return ALLOWED_ORIGINS.some((allowed) => origin === allowed);
  }
  // Fallback for requests that omit Origin (e.g. same-origin non-CORS)
  const referer = req.headers.get("referer");
  if (referer) {
    return ALLOWED_ORIGINS.some((allowed) => referer.startsWith(allowed));
  }
  return false;
}

const MAX_BODY_BYTES = 32_768; // 32 KB — enough for 5 turns of conversation

function isValidMessages(messages: unknown): messages is UIMessage[] {
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 20) return false;
  return messages.every(
    (m) =>
      m &&
      typeof m === "object" &&
      typeof m.id === "string" &&
      (m.role === "user" || m.role === "assistant") &&
      Array.isArray(m.parts),
  );
}

function convertMessages(messages: UIMessage[]) {
  return messages
    .filter((msg) => msg.role === "user" || msg.role === "assistant")
    .map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.parts
        .filter((p): p is { type: "text"; text: string } => p.type === "text")
        .map((p) => p.text)
        .join(""),
    }));
}

// Per-user daily request limiting (in-memory)
const DAILY_USER_LIMIT = 5;
const userRequestCounts = new Map<string, { count: number; date: string }>();

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function checkAndIncrementUserLimit(ip: string): boolean {
  const today = new Date().toISOString().slice(0, 10);
  const entry = userRequestCounts.get(ip);
  if (!entry || entry.date !== today) {
    userRequestCounts.set(ip, { count: 1, date: today });
    return true;
  }
  if (entry.count >= DAILY_USER_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: Request) {
  try {
    // Block requests from outside the portfolio
    if (!isAllowedOrigin(req)) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Reject oversized payloads before parsing
    const contentLength = Number(req.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return new Response(JSON.stringify({ error: "Payload too large" }), {
        status: 413,
        headers: { "Content-Type": "application/json" },
      });
    }

    const clientIp = getClientIp(req);
    if (!checkAndIncrementUserLimit(clientIp)) {
      return new Response(
        JSON.stringify({
          error: "user_limit",
          message: `You've used all ${DAILY_USER_LIMIT} questions for today. Please contact Chirag directly or come back tomorrow.`,
          contact: {
            email: portfolioData.personal.email,
            linkedin: portfolioData.personal.linkedin,
          },
        }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { messages } = body;

    if (!isValidMessages(messages)) {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const modelMessages = convertMessages(messages);

    const result = streamText({
      model: anthropic(MODEL),
      system: SYSTEM_PROMPT,
      messages: modelMessages,
      // Automatic caching: API applies cache_control to the last cacheable block.
      // System prompt (~10k tokens, well above Haiku 4.5's 4096 minimum) gets cached
      // after the first request. Each subsequent turn also caches the conversation
      // history, so reads are 0.1× base price (90% savings on input tokens).
      providerOptions: {
        anthropic: {
          cacheControl: { type: "ephemeral", ttl: "1h" },
        },
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again later." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

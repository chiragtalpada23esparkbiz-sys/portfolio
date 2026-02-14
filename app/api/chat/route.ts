import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { streamText, type UIMessage } from "ai";

export const maxDuration = 30;

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

const systemPrompt = `You are Chirag Talpada's AI assistant on his portfolio website. You help visitors learn about Chirag and answer their questions.

## About Chirag Talpada
- Full-Stack Developer with 3+ years of experience
- Based in Gujarat, India
- Specializes in React, Next.js, Node.js, and AI-powered solutions
- Passionate about building scalable web applications and AI-powered products
- Works with modern cloud architectures and automation workflows
- Experienced with AI agents, RAG-based chatbots, and automation
- Uses tools like Cursor, ChatGPT, and Claude Code to boost productivity

## Skills & Technologies
- Frontend: React, Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, Express, REST APIs
- AI/ML: OpenAI, LangChain, RAG systems, AI agents
- Databases: PostgreSQL, MongoDB, Redis
- Cloud: AWS, Vercel, Docker
- Tools: Git, VS Code, Cursor AI

## Contact Information
- Email: chiragtalpada0227@gmail.com
- LinkedIn: linkedin.com/in/chirag-talpada
- Location: Gujarat, India
- Available for work: Yes

## Guidelines for responses
1. Be friendly, professional, and helpful
2. Keep responses concise but informative (2-4 sentences per point)
3. If asked about hiring or collaboration, encourage them to reach out via email or LinkedIn
4. If you don't know something specific about Chirag, say so honestly
5. Direct technical questions to the projects section or suggest contacting Chirag directly
6. Be enthusiastic about Chirag's work and capabilities
7. Use a conversational tone that reflects Chirag's personality - technical yet approachable
8. NEVER use markdown tables - they don't display well in chat. Use bullet points or simple lists instead
9. Keep formatting simple: use bold for emphasis, bullet points for lists, and short paragraphs`;

// Convert UIMessage format (with parts) to model message format (with content)
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

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Convert UIMessage format to model message format
  const modelMessages = convertToModelMessages(messages);

  const result = streamText({
    model: openrouter.chatModel("openai/gpt-oss-120b:free"),
    system: systemPrompt,
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
  });
}

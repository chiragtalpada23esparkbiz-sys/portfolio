import { Section } from "@/components/ui/section";
import { BlurFade } from "../ui/blur-fade";

const stats = [
  { value: "10+", label: "Projects" },
  { value: "20+", label: "Technologies Used" },
  { value: "3+", label: "Years Experience" },
  { value: "9+", label: "Achievements & Awards" },
];

export function About() {
  return (
    <Section id="about" className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            About Me
          </h2>
          <p className="text-muted-foreground text-lg">Get to know me better</p>
        </div>

        {/* Content */}
        <BlurFade delay={0.1} inView>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              I&apos;m a{" "}
              <span className="font-semibold text-foreground">
                Full-Stack JavaScript Developer
              </span>{" "}
              with 3+ years of professional experience, currently working at{" "}
              <span className="font-semibold text-foreground">eSparkBiz</span>,
              where I help build modern web applications used in real-world
              production environments.
            </p>

            <div>
              <span className="font-semibold text-foreground">
                Full-Stack Expertise
              </span>
              : I specialize in building end-to-end web and SaaS products. On
              the frontend, I work extensively with React and Next.js, crafting
              clean, responsive, and user-friendly interfaces using Tailwind CSS
              and shadcn/ui. On the backend, I design and develop reliable,
              scalable systems using Node.js, along with PostgreSQL, MySQL, and
              Hasura for API and data orchestration.
            </div>

            <div>
              <span className="font-semibold text-foreground">
                AI-Driven Solutions
              </span>
              : Beyond traditional full-stack development, I&apos;ve been
              actively working with AI-powered applications. I&apos;ve built AI
              agents and RAG-based chatbots using LangChain, LangGraph, vector
              databases, and AI SDKs—integrating them into real products that
              deliver intelligent, context-aware experiences.
            </div>

            <div>
              <span className="font-semibold text-foreground">
                Automation & Workflows
              </span>
              : I&apos;ve developed automation workflows using tools like
              Windmill and Hyperbrowser to streamline processes and generate
              intelligent reports, helping teams work smarter and faster.
            </div>

            <div>
              <span className="font-semibold text-foreground">
                End-to-End Ownership
              </span>
              : I&apos;ve implemented authentication systems, integrated Stripe
              payments, designed database schemas, and contributed to
              architectural decisions—taking ownership of features from idea to
              production.
            </div>

            <p className="text-foreground font-medium border-l-4 border-primary pl-4 py-2 bg-muted/30 rounded-r-lg">
              At my core, I enjoy solving real-world problems, learning new
              technologies, and building scalable, maintainable software that
              delivers actual value - not just code.
            </p>
          </div>
        </BlurFade>

        {/* Stats */}
        <div className="mt-16 pt-12 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

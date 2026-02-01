"use client";

import { Section } from "@/components/ui/section";

const stats = [
  { value: "50+", label: "Projects Completed" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "3+", label: "Years Experience" },
  { value: "20+", label: "Technologies Mastered" },
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
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            I&apos;m a passionate full-stack developer with over 3 years of experience
            crafting elegant solutions to complex problems. My journey in tech began
            with a fascination for how things work, which led me to pursue Computer
            Science and eventually specialize in web development and artificial
            intelligence.
          </p>

          <div>
            <span className="font-semibold text-foreground">My Approach</span>: I
            believe in writing clean, maintainable code that scales. I&apos;m a strong
            advocate for test-driven development and continuous integration. My
            experience spans from startups to enterprise companies, giving me a
            unique perspective on different development methodologies and best
            practices.
          </div>

          <div>
            <span className="font-semibold text-foreground">What I Do</span>: I
            specialize in building full-stack applications using React, Next.js, and
            Node.js. Recently, I&apos;ve been focusing on integrating AI capabilities
            into web applications, leveraging technologies like OpenAI&apos;s GPT models,
            LangChain, and vector databases. I&apos;m also experienced in GraphQL with
            Hasura, PostgreSQL, and modern cloud infrastructure.
          </div>

          <p>
            When I&apos;m not coding, you can find me contributing to open-source
            projects, writing technical blog posts, or mentoring aspiring developers.
            I&apos;m always excited to learn new technologies and share knowledge with the
            community.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-16 pt-12 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

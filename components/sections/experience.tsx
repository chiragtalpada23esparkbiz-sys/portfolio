import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { BlurFade } from "../ui/blur-fade";
import portfolioData from "@/data/portfolio.json";

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

const experiences: Experience[] = portfolioData.experience.map((exp) => ({
  id: exp.id,
  title: exp.title,
  company: exp.company,
  type: exp.type,
  startDate: exp.start_date,
  endDate: exp.end_date,
  location: exp.location,
  description: exp.description,
  responsibilities: exp.responsibilities,
  achievements: exp.achievements,
  technologies: exp.technologies,
}));

export function Experience() {
  return (
    <Section id="experience" className="py-20 md:py-28">
      {/* Header */}
      <BlurFade delay={0} inView>
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Work Experience
          </h2>
          <p className="text-muted-foreground text-lg">My professional journey</p>
        </header>
      </BlurFade>

      {/* Timeline */}
      <BlurFade delay={0.25} inView>
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
                          <time dateTime="2023-01">{exp.startDate}</time>
                          {" "}-{" "}
                          <time dateTime="2024-12">{exp.endDate}</time>
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
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BlurFade>
    </Section>
  );
}

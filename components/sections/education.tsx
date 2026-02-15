import { Section } from "@/components/ui/section";
import { Calendar, Award } from "lucide-react";
import { BlurFade } from "../ui/blur-fade";
import portfolioData from "@/data/portfolio.json";

interface Education {
  id: string;
  degree: string;
  institution: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description: string;
  achievements: string[];
}

const educationData: Education[] = portfolioData.education.map((edu) => ({
  id: edu.id,
  degree: edu.degree,
  institution: edu.institution,
  field: edu.field,
  startDate: edu.start_date,
  endDate: edu.end_date,
  gpa: edu.gpa,
  description: edu.description,
  achievements: edu.achievements,
}));

export function Education() {
  return (
    <Section id="education" className="py-20 md:py-28">
      {/* Header */}
      <BlurFade delay={0} inView>
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Education
          </h2>
          <p className="text-muted-foreground text-lg">My academic background</p>
        </header>
      </BlurFade>

      {/* Education Grid */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {educationData.map((edu, i) => (
          <BlurFade
            key={edu.id}
            delay={0.1 + 0.15 * i}
            inView
            className="h-full"
          >
            <article className="relative overflow-hidden h-full rounded-xl border bg-card p-6 hover:shadow-md transition-shadow ">
              {/* Gradient top border */}
              <div className="absolute top-0 left-0 h-2 w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-15" />

              {/* Header */}
              <div className="mb-4">
                <h3 className="text-xl font-bold">{edu.degree}</h3>
                <p className="font-medium text-foreground">{edu.institution}</p>
                <p className="text-muted-foreground text-sm">{edu.field}</p>
              </div>

              {/* Date and GPA badges */}
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={edu.startDate}>{edu.startDate}</time> -{" "}
                  <time dateTime={edu.endDate}>{edu.endDate}</time>
                </div>
                {edu.gpa && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm">
                    <Award className="h-4 w-4" />
                    CGPA: {edu.gpa}
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-4">
                {edu.description}
              </p>

              {/* Achievements */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-4 w-4" />
                  <span className="font-semibold text-sm">
                    Achievements & Honors
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {edu.achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className="text-muted-foreground text-sm flex items-start gap-2"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}

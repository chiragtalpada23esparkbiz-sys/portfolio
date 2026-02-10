import { Section } from "@/components/ui/section";
import { Calendar, Award } from "lucide-react";
import { BlurFade } from "../ui/blur-fade";

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

const educationData: Education[] = [
  {
    id: "Master",
    degree: "Master of Computer Application",
    institution: "Sardar Patel University",
    field: "Computer Applications",
    startDate: "Apr 2021",
    endDate: "Apr 2023",
    gpa: "9.55/10",
    description:
      "Graduated with a Master of Computer Applications from Sardar Patel University, specializing in advanced computing and software systems. My postgraduate studies deepened my expertise in professional programming (Java, full-stack frameworks), algorithms, distributed systems, and application design. The curriculum combined theory with significant hands-on experience, including web technologies, system architecture, and large-scale project implementation. This strengthened my ability to architect scalable applications, collaborate effectively on cross-functional teams, and adapt to emerging technologies in cloud, data, and AI-focused environments.",
    achievements: [
      "Active Participant in Technical & Coding Competitions, demonstrating strong problem-solving and algorithmic skills",
      "Ranked 3rd at College Level for academic excellence in MCA program",
      "Consistently High Academic Performance with strong focus on advanced computing and software systems",
      "Recognized for Technical Excellence in programming, database systems, and application development coursework",
      "Led and Contributed to Complex Academic Projects, applying real-world software engineering and system design principles",
      "2nd Rank – C Programming Competition - VP & RPTP Science College, Anand",
    ],
  },
  {
    id: "Bachelor",
    degree: "Bachelor of Computer Application",
    institution: "Sardar Patel University",
    field: "Computer Applications",
    startDate: "Apr 2018",
    endDate: "Apr 2021",
    gpa: "9.51/10",
    description:
      "Completed a rigorous Bachelor of Computer Applications program at Sardar Patel University, where I built strong foundations in software engineering, database systems, programming (C, Java), and web development. The curriculum emphasized hands-on labs, real-world project work, and problem-solving skills, preparing me to design efficient software solutions and work across full-stack application development. Through academic projects and coursework, I gained expertise in building responsive web apps, managing data systems, and applying core CS principles to practical scenarios.",
    achievements: [
      "Ranked 1st at College Level and 3rd at University Level (Sardar Patel University) for overall academic performance",
      "1st Rank – State Level C Programming Competition - GH Patel PG Department of Computer Science & Technology — 2019 & 2020",
      "Runner-Up – C Programming Blind Coding Competition - Charusat University, Changa",
      "Runner-Up – DB Mania (SQL Competition) - Charusat University, Changa",
      "Graduated with Distinction",
      "Class Representative (BCA) — Acted as liaison between faculty and students, coordinated academic and technical activities",
      "2nd Rank – Web Design Competition - Organized by Sardar Patel University",
    ],
  },
];

export function Education() {
  return (
    <Section id="education" className="py-20 md:py-28">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Education
        </h2>
        <p className="text-muted-foreground text-lg">My academic background</p>
      </div>

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

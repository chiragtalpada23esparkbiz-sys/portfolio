"use client";

import { Section } from "@/components/ui/section";
import { Calendar, Award } from "lucide-react";

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
    id: "certifications",
    degree: "Professional Certifications",
    institution: "Coursera & Udacity",
    field: "Machine Learning & Cloud Computing",
    startDate: "Jan 2020",
    endDate: "Present",
    description:
      "Continuous learning through professional development courses including Deep Learning Specialization, AWS Solutions Architect, and Full-Stack Web Development.",
    achievements: [
      "Deep Learning Specialization by Andrew Ng",
      "AWS Certified Solutions Architect - Associate",
      "Google Cloud Professional Cloud Architect",
      "Meta React Advanced Certification",
      "MongoDB Certified Developer",
    ],
  },
  {
    id: "bachelors",
    degree: "Bachelor of Engineering",
    institution: "Gujarat Technological University",
    field: "Computer Engineering",
    startDate: "2017",
    endDate: "2021",
    gpa: "8.5/10",
    description:
      "Comprehensive computer science education with focus on software engineering and systems design. Active member of Computer Science Student Association.",
    achievements: [
      "Graduated with Distinction",
      "2x Hackathon Winner",
      "Published research paper on web technologies",
      "Led technical team for college fest",
      "Active open source contributor",
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
        {educationData.map((edu) => (
          <div
            key={edu.id}
            className="rounded-xl border bg-card p-6 hover:shadow-md transition-shadow"
          >
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
                {edu.startDate} - {edu.endDate}
              </div>
              {edu.gpa && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm">
                  <Award className="h-4 w-4" />
                  GPA: {edu.gpa}
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
          </div>
        ))}
      </div>
    </Section>
  );
}

"use client";

import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight } from "lucide-react";

type AchievementType =
  | "award"
  | "open-source"
  | "speaking"
  | "milestone"
  | "recognition"
  | "publication";

interface Achievement {
  id: string;
  type: AchievementType;
  title: string;
  organization: string;
  description: string;
  link?: string;
  featured?: boolean;
}

const typeStyles: Record<
  AchievementType,
  { bg: string; text: string; label: string }
> = {
  award: {
    bg: "bg-orange-500/10",
    text: "text-orange-500",
    label: "Award",
  },
  "open-source": {
    bg: "bg-green-500/10",
    text: "text-green-500",
    label: "Open Source",
  },
  speaking: {
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    label: "Speaking",
  },
  milestone: {
    bg: "bg-pink-500/10",
    text: "text-pink-500",
    label: "Milestone",
  },
  recognition: {
    bg: "bg-pink-500/10",
    text: "text-pink-500",
    label: "Recognition",
  },
  publication: {
    bg: "bg-purple-500/10",
    text: "text-purple-500",
    label: "Publication",
  },
};

const achievements: Achievement[] = [
  {
    id: "hackathon-winner",
    type: "award",
    title: "First Place - National Hackathon 2023",
    organization: "Tech Innovation Summit",
    description:
      "Won first place among 500+ participants for developing an AI-powered accessibility tool.",
    link: "#",
    featured: true,
  },
  {
    id: "oss-contributor",
    type: "open-source",
    title: "Top Contributor - React Ecosystem",
    organization: "GitHub Open Source",
    description:
      "Recognized as a top contributor to major React libraries with 50+ merged PRs.",
    link: "#",
    featured: true,
  },
  {
    id: "conference-speaker",
    type: "speaking",
    title: "Featured Speaker - ReactConf 2023",
    organization: "ReactConf",
    description:
      "Delivered a talk on 'Building Accessible Web Applications at Scale' to 2000+ attendees.",
    link: "#",
    featured: true,
  },
  {
    id: "100k-downloads",
    type: "milestone",
    title: "100K+ NPM Downloads",
    organization: "NPM Registry",
    description:
      "Published npm packages achieving over 100,000 combined monthly downloads.",
    link: "#",
  },
  {
    id: "employee-excellence",
    type: "recognition",
    title: "Employee Excellence Award",
    organization: "eSparkBiz Technologies",
    description:
      "Awarded for exceptional performance and innovation in full-stack development projects.",
    link: "#",
  },
  {
    id: "tech-talk",
    type: "speaking",
    title: "Tech Talk - GraphQL Best Practices",
    organization: "Local Dev Meetup",
    description:
      "Presented advanced GraphQL patterns and optimization techniques to local developer community.",
    link: "#",
  },
  {
    id: "research-paper",
    type: "publication",
    title: "Research Paper - Web Performance",
    organization: "IEEE Conference",
    description:
      "Published research on optimizing Core Web Vitals for large-scale React applications.",
    link: "#",
  },
  {
    id: "mentor-award",
    type: "recognition",
    title: "Outstanding Mentor Award",
    organization: "Coding Bootcamp",
    description:
      "Recognized for mentoring 20+ junior developers and helping them transition into tech careers.",
    link: "#",
  },
];

export function Achievements() {
  const featuredAchievements = achievements.filter((a) => a.featured);
  const allAchievements = achievements.filter((a) => !a.featured);

  return (
    <Section id="achievements" className="py-20 md:py-28">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Achievements & Awards
        </h2>
        <p className="text-muted-foreground text-lg">
          Recognition for my contributions to the tech community
        </p>
      </div>

      {/* Featured Achievements */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-8">
          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
          <h3 className="text-xl font-semibold">Featured Achievements</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredAchievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>

      {/* All Achievements */}
      <div>
        <h3 className="text-xl font-semibold mb-8">All Achievements</h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allAchievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const style = typeStyles[achievement.type];

  return (
    <div className="rounded-xl border bg-card p-6 hover:shadow-md transition-shadow">
      {/* Type Badge */}
      <Badge className={`${style.bg} ${style.text} border-0 mb-4`}>
        {style.label}
      </Badge>

      {/* Title */}
      <h4 className="font-bold text-lg mb-1">{achievement.title}</h4>

      {/* Organization */}
      <p className="text-muted-foreground text-sm mb-3">
        {achievement.organization}
      </p>

      {/* Description */}
      <p className="text-muted-foreground text-sm mb-4">
        {achievement.description}
      </p>

      {/* Learn More Link */}
      {achievement.link && (
        <Link
          href={achievement.link}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Learn More
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

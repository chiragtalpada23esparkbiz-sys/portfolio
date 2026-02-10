import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getFeaturedAchievements } from "@/data/achievements";
import { AchievementTiltCard } from "./achievement-tilt-card";

export function AchievementsRecognition() {
  const featuredAchievements = getFeaturedAchievements();

  return (
    <Section id="achievements" className="py-20 md:py-28">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Achievements & Recognition
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Early-career programming achievements that reflect strong
          problem-solving foundations.
        </p>
      </div>

      {/* Hidden keywords for crawlers */}
      <div className="sr-only">
        {featuredAchievements.map((a) => (
          <span key={a.id}>
            {a.title} — {a.organization}, {a.year}.{" "}
          </span>
        ))}
      </div>

      {/* Featured Achievements Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-10 items-stretch">
        {featuredAchievements.map((achievement) => (
          <AchievementTiltCard key={achievement.id} achievement={achievement} />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center relative z-10 mt-4">
        <Button size="lg" variant="outline" asChild>
          <Link href="/achievements">
            View All Achievements
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}

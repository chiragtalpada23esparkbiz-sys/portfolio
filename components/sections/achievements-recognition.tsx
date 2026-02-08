"use client";

import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy } from "lucide-react";
import { getFeaturedAchievements, categoryLabels, categoryColors } from "@/data/achievements";
import type { Achievement } from "@/data/achievements";

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
          Early-career programming achievements that reflect strong problem-solving foundations.
        </p>
      </div>

      {/* Featured Achievements Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {featuredAchievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
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

function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <Link
      href="/achievements"
      className="group block rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/30"
    >
      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-muted">
        <Image
          src={achievement.image}
          alt={achievement.title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Trophy Icon */}
        <div className="absolute top-3 right-3 p-2 rounded-full bg-amber-500/90 text-white">
          <Trophy className="h-4 w-4" />
        </div>

        {/* Year Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="bg-black/50 text-white border-0 backdrop-blur-sm">
            {achievement.year}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category Badge */}
        <Badge
          variant="outline"
          className={`mb-3 text-xs ${categoryColors[achievement.category]}`}
        >
          {categoryLabels[achievement.category]}
        </Badge>

        {/* Title */}
        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {achievement.title}
        </h3>

        {/* Organization */}
        <p className="text-sm text-muted-foreground">
          {achievement.organization}
        </p>
      </div>
    </Link>
  );
}

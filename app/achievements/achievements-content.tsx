"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageModal } from "@/components/ui/image-modal";
import {
  ArrowLeft,
  Trophy,
  Award,
  GraduationCap,
  Expand,
} from "lucide-react";
import {
  getAllAchievements,
  getAchievementsByCategory,
  categoryLabels,
  categoryColors,
} from "@/data/achievements";
import type { Achievement, AchievementCategory } from "@/data/achievements";

const categoryIcons: Record<AchievementCategory, typeof Trophy> = {
  award: Trophy,
  certificate: GraduationCap,
  recognition: Award,
};

export function AchievementsPageContent() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    caption?: string;
  } | null>(null);
  const [filter, setFilter] = useState<AchievementCategory | "all">("all");

  const awards = getAchievementsByCategory("award");
  const certificates = getAchievementsByCategory("certificate");
  const recognitions = getAchievementsByCategory("recognition");

  const filteredAchievements =
    filter === "all" ? getAllAchievements() : getAchievementsByCategory(filter);

  const handleImageClick = (achievement: Achievement, isCertificate = false) => {
    setSelectedImage({
      src: isCertificate && achievement.certificateImage
        ? achievement.certificateImage
        : achievement.image,
      alt: achievement.title,
      caption: `${achievement.title} - ${achievement.organization} (${achievement.year})`,
    });
  };

  return (
    <>
      <article className="min-h-screen">
        {/* Hero Section */}
        <Section className="pt-8 pb-12 md:pt-12 md:pb-16">
          {/* Back Link */}
          <Link
            href="/#achievements"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Achievements & Recognition
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Early-career programming achievements that reflect strong problem-solving foundations.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            <div className="text-center p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Trophy className="h-6 w-6 text-amber-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{awards.length}</div>
              <div className="text-sm text-muted-foreground">Awards</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <GraduationCap className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{certificates.length}</div>
              <div className="text-sm text-muted-foreground">Certificates</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <Award className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{recognitions.length}</div>
              <div className="text-sm text-muted-foreground">Recognitions</div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "award" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("award")}
              className={filter === "award" ? "" : "hover:border-amber-500/50"}
            >
              <Trophy className="h-4 w-4 mr-2" />
              Awards
            </Button>
            <Button
              variant={filter === "certificate" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("certificate")}
              className={filter === "certificate" ? "" : "hover:border-blue-500/50"}
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              Certificates
            </Button>
            <Button
              variant={filter === "recognition" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("recognition")}
              className={filter === "recognition" ? "" : "hover:border-purple-500/50"}
            >
              <Award className="h-4 w-4 mr-2" />
              Recognitions
            </Button>
          </div>
        </Section>

        {/* Achievements Gallery */}
        <Section className="py-12 md:py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                onImageClick={handleImageClick}
              />
            ))}
          </div>
        </Section>

        {/* CTA Section */}
        <Section className="py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            These achievements reflect my dedication to continuous learning and problem-solving.
            I bring the same commitment to every project.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/#contact">Get in Touch</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/#projects">View Projects</Link>
            </Button>
          </div>
        </Section>
      </article>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageSrc={selectedImage.src}
          imageAlt={selectedImage.alt}
          caption={selectedImage.caption}
        />
      )}
    </>
  );
}

interface AchievementCardProps {
  achievement: Achievement;
  onImageClick: (achievement: Achievement, isCertificate?: boolean) => void;
}

function AchievementCard({ achievement, onImageClick }: AchievementCardProps) {
  const Icon = categoryIcons[achievement.category];

  return (
    <div className="group rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div
        className="relative h-52 overflow-hidden bg-muted cursor-pointer"
        onClick={() => onImageClick(achievement)}
      >
        <Image
          src={achievement.image}
          alt={achievement.title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 rounded-full bg-white/20 backdrop-blur-sm">
            <Expand className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Category Icon */}
        <div
          className={`absolute top-3 right-3 p-2 rounded-full ${
            achievement.category === "award"
              ? "bg-amber-500/90"
              : achievement.category === "certificate"
              ? "bg-blue-500/90"
              : "bg-purple-500/90"
          } text-white`}
        >
          <Icon className="h-4 w-4" />
        </div>

        {/* Year Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge
            variant="secondary"
            className="bg-black/50 text-white border-0 backdrop-blur-sm"
          >
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
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{achievement.title}</h3>

        {/* Organization */}
        <p className="text-sm text-muted-foreground mb-3">
          {achievement.organization}
        </p>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {achievement.description}
        </p>

        {/* View Certificate Button */}
        {achievement.certificateImage && (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onImageClick(achievement, true)}
          >
            <GraduationCap className="h-4 w-4 mr-2" />
            View Certificate
          </Button>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ImageModal } from "@/components/ui/image-modal";
import { ArrowLeft, Trophy, Award, GraduationCap, Expand } from "lucide-react";
import {
  getAllAchievements,
  getAchievementsByCategory,
  categoryLabels,
} from "@/data/achievements";
import type { Achievement, AchievementCategory } from "@/data/achievements";

const accentStyles: Record<
  AchievementCategory,
  {
    corner: string;
    dot: string;
    label: string;
    divider: string;
    btn: string;
    shadow: string;
  }
> = {
  award: {
    corner: "border-amber-400",
    dot: "bg-amber-400",
    label: "text-amber-400",
    divider: "bg-amber-400/40",
    btn: "border-amber-400/50 text-amber-400 hover:bg-amber-400/10 hover:border-amber-400",
    shadow: "dark:shadow-amber-500/30",
  },
  certificate: {
    corner: "border-blue-400",
    dot: "bg-blue-400",
    label: "text-blue-400",
    divider: "bg-blue-400/40",
    btn: "border-blue-400/50 text-blue-400 hover:bg-blue-400/10 hover:border-blue-400",
    shadow: "dark:shadow-blue-500/30",
  },
  recognition: {
    corner: "border-purple-400",
    dot: "bg-purple-400",
    label: "text-purple-400",
    divider: "bg-purple-400/40",
    btn: "border-purple-400/50 text-purple-400 hover:bg-purple-400/10 hover:border-purple-400",
    shadow: "dark:shadow-purple-500/30",
  },
};

export function AchievementsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    caption?: string;
  } | null>(null);

  const rawCategory = searchParams.get("category");
  const validCategories: AchievementCategory[] = ["award", "certificate", "recognition"];
  const filter: AchievementCategory | "all" =
    rawCategory && validCategories.includes(rawCategory as AchievementCategory)
      ? (rawCategory as AchievementCategory)
      : "all";

  const setFilter = (value: AchievementCategory | "all") => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const awards = getAchievementsByCategory("award");
  const certificates = getAchievementsByCategory("certificate");
  const recognitions = getAchievementsByCategory("recognition");

  const filteredAchievements =
    filter === "all" ? getAllAchievements() : getAchievementsByCategory(filter);

  const handleImageClick = (
    achievement: Achievement,
    isCertificate = false,
  ) => {
    setSelectedImage({
      src:
        isCertificate && achievement.certificateImage
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
              Early-career programming achievements that reflect strong
              problem-solving foundations.
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
              className={filter === "all" ? "bg-black text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-white" : ""}
            >
              All
            </Button>
            <Button
              variant={filter === "award" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("award")}
              className={filter === "award" ? "bg-black text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-white" : "hover:border-amber-500/50"}
            >
              <Trophy className="h-4 w-4 mr-2" />
              Awards
            </Button>
            <Button
              variant={filter === "certificate" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("certificate")}
              className={
                filter === "certificate" ? "bg-black text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-white" : "hover:border-blue-500/50"
              }
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              Certificates
            </Button>
            <Button
              variant={filter === "recognition" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("recognition")}
              className={
                filter === "recognition" ? "bg-black text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-white" : "hover:border-purple-500/50"
              }
            >
              <Award className="h-4 w-4 mr-2" />
              Recognitions
            </Button>
          </div>
        </Section>

        {/* Achievements Gallery */}
        <Section className="py-12 md:py-16">
          {/* Hidden keywords for crawlers */}
          <div className="sr-only">
            {filteredAchievements.map((a) => (
              <span key={a.id}>
                {a.title} — {a.organization}, {a.year}.{" "}
              </span>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
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
            These achievements reflect my dedication to continuous learning and
            problem-solving. I bring the same commitment to every project.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              className="bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              asChild
            >
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });
  const accent = accentStyles[achievement.category];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -12;
    const rotateY = ((x - rect.width / 2) / rect.width) * 12;
    setTilt({ x: rotateX, y: rotateY, active: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, active: false });
  };

  return (
    <article
      ref={cardRef}
      style={{
        transform: tilt.active
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02,1.02,1.02)`
          : "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
        transition: tilt.active
          ? "transform 0.08s ease-out"
          : "transform 0.4s ease-out",
      }}
      className={`relative rounded-xl bg-black border border-white/15 shadow-2xl shadow-black/40 ${accent.shadow} px-10 pt-10 pb-14 flex flex-col items-center text-center h-full overflow-hidden cursor-default`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        <Image
          src={achievement.image}
          alt=""
          fill
          className="object-cover object-center opacity-15 blur-sm scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* All foreground content — above the bg image & overlay */}
      <div className="relative z-10 flex flex-col items-center text-center w-full flex-1">
        {/* Corner — top-left */}
        <div
          className={`absolute -top-7 -left-7 w-8 h-8 border-t-2 border-l-2 ${accent.corner}`}
        >
          <div
            className={`absolute -bottom-0.75 -right-0.75 w-1.75 h-1.75 ${accent.dot} rotate-45`}
          />
        </div>
        {/* Corner — top-right */}
        <div
          className={`absolute -top-7 -right-7 w-8 h-8 border-t-2 border-r-2 ${accent.corner}`}
        >
          <div
            className={`absolute -bottom-0.75 -left-0.75 w-1.75 h-1.75 ${accent.dot} rotate-45`}
          />
        </div>
        {/* Corner — bottom-left */}
        <div
          className={`absolute -bottom-11 -left-7 w-8 h-8 border-b-2 border-l-2 ${accent.corner}`}
        >
          <div
            className={`absolute -top-0.75 -right-0.75 w-1.75 h-1.75 ${accent.dot} rotate-45`}
          />
        </div>
        {/* Corner — bottom-right */}
        <div
          className={`absolute -bottom-11 -right-7 w-8 h-8 border-b-2 border-r-2 ${accent.corner}`}
        >
          <div
            className={`absolute -top-0.75 -left-0.75 w-1.75 h-1.75 ${accent.dot} rotate-45`}
          />
        </div>

        {/* Year */}
        <time dateTime={achievement.year} className="text-zinc-400 text-xs mb-2">
          {achievement.year}
        </time>

        {/* Category label */}
        <p
          className={`text-xs font-bold tracking-[0.2em] uppercase ${accent.label}`}
        >
          {categoryLabels[achievement.category]}
        </p>
        <p className="text-zinc-500 text-xs italic mt-1 mb-5">for</p>

        {/* Title */}
        <h3 className="text-white font-bold text-xl leading-snug mb-4">
          {achievement.title}
        </h3>

        {/* Divider */}
        <div className={`w-16 h-px ${accent.divider} mb-4`} />

        {/* Description */}
        <p className="text-zinc-300 text-sm leading-relaxed mb-5 flex-1">
          {achievement.description}
        </p>

        {/* Organization */}
        <p className="text-white font-bold text-sm mb-6">
          {achievement.organization}
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            className={`w-full bg-transparent ${accent.btn} cursor-pointer hover:${accent.label}`}
            onClick={() => onImageClick(achievement)}
          >
            <Expand className="h-4 w-4 mr-2" />
            View Image
          </Button>
          {achievement.certificateImage && (
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent border-zinc-700 text-zinc-400 cursor-pointer hover:bg-zinc-800 hover:text-zinc-200 hover:border-zinc-500"
              onClick={() => onImageClick(achievement, true)}
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              View Certificate
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { categoryLabels } from "@/data/achievements";
import type { Achievement, AchievementCategory } from "@/data/achievements";

const accentStyles: Record<
  AchievementCategory,
  {
    corner: string;
    dot: string;
    label: string;
    divider: string;
    shadow: string;
  }
> = {
  award: {
    corner: "border-amber-400",
    dot: "bg-amber-400",
    label: "text-amber-400",
    divider: "bg-amber-400/40",
    shadow: "dark:shadow-amber-500/30",
  },
  certificate: {
    corner: "border-blue-400",
    dot: "bg-blue-400",
    label: "text-blue-400",
    divider: "bg-blue-400/40",
    shadow: "dark:shadow-blue-500/30",
  },
  recognition: {
    corner: "border-purple-400",
    dot: "bg-purple-400",
    label: "text-purple-400",
    divider: "bg-purple-400/40",
    shadow: "dark:shadow-purple-500/30",
  },
};

export function AchievementTiltCard({
  achievement,
}: {
  achievement: Achievement;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });
  const accent = accentStyles[achievement.category];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const rotateX =
      ((e.clientY - rect.top - rect.height / 2) / rect.height) * -12;
    const rotateY =
      ((e.clientX - rect.left - rect.width / 2) / rect.width) * 12;
    setTilt({ x: rotateX, y: rotateY, active: true });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0, active: false });

  return (
    <Link
      href={`/achievements?category=${achievement.category}`}
      className="h-full block"
      aria-label={`${achievement.title} - ${achievement.organization} (${achievement.year})`}
    >
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
        className={`relative rounded-xl bg-black border border-white/15 shadow-2xl shadow-black/40 ${accent.shadow} px-10 pt-10 pb-10 flex flex-col items-center text-center h-full overflow-hidden cursor-pointer`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background image + overlay — decorative only */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={achievement.image}
            alt=""
            fill
            className="object-cover object-center opacity-15 blur-sm scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>

        {/* Foreground content */}
        <div className="relative z-10 flex flex-col items-center text-center w-full flex-1">
          {/* Corner — top-left */}
          <div
            className={`absolute -top-7 -left-7 w-8 h-8 border-t-2 border-l-2 ${accent.corner}`}
            aria-hidden="true"
          >
            <div
              className={`absolute -bottom-0.75 -right-0.75 w-1.75 h-1.75 ${accent.dot} rotate-45`}
            />
          </div>
          {/* Corner — top-right */}
          <div
            className={`absolute -top-7 -right-7 w-8 h-8 border-t-2 border-r-2 ${accent.corner}`}
            aria-hidden="true"
          >
            <div
              className={`absolute -bottom-0.75 -left-0.75 w-1.75 h-1.75 ${accent.dot} rotate-45`}
            />
          </div>
          {/* Corner — bottom-left */}
          <div
            className={`absolute -bottom-7 -left-7 w-8 h-8 border-b-2 border-l-2 ${accent.corner}`}
            aria-hidden="true"
          >
            <div
              className={`absolute -top-0.75 -right-0.75 w-1.75 h-1.75 ${accent.dot} rotate-45`}
            />
          </div>
          {/* Corner — bottom-right */}
          <div
            className={`absolute -bottom-7 -right-7 w-8 h-8 border-b-2 border-r-2 ${accent.corner}`}
            aria-hidden="true"
          >
            <div
              className={`absolute -top-0.75 -left-0.75 w-1.75 h-1.75 ${accent.dot} rotate-45`}
            />
          </div>

          {/* Year */}
          <time
            dateTime={achievement.year}
            className="text-zinc-400 text-xs mb-2"
          >
            {achievement.year}
          </time>

          {/* Category label */}
          <p
            className={`text-xs font-bold tracking-[0.2em] uppercase ${accent.label}`}
          >
            {categoryLabels[achievement.category]}
          </p>
          <p
            className="text-zinc-500 text-xs italic mt-1 mb-5"
            aria-hidden="true"
          >
            for
          </p>

          {/* Title */}
          <h3 className="text-white font-bold text-xl leading-snug mb-4">
            {achievement.title}
          </h3>

          {/* Divider */}
          <div
            className={`w-16 h-px ${accent.divider} mb-4`}
            aria-hidden="true"
          />

          {/* Description */}
          <p className="text-zinc-300 text-sm leading-relaxed mb-5 flex-1">
            {achievement.description}
          </p>

          {/* Organization */}
          <p className="text-white font-bold text-sm">
            {achievement.organization}
          </p>
        </div>
      </article>
    </Link>
  );
}

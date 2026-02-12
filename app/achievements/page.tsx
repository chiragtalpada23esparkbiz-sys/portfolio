import { Suspense } from "react";
import type { Metadata } from "next";
import { AchievementsPageContent } from "./achievements-content";
import { AchievementsJsonLd } from "@/components/seo/json-ld";

const baseUrl = process.env.BASE_URL || "";

export const metadata: Metadata = {
  title: "Achievements & Recognition | Chirag Talpada",
  description:
    "Early-career programming achievements, awards, certificates, and recognitions that reflect strong problem-solving foundations. Including Blind Coding, DBMania, State Level Programming competitions.",
  keywords: [
    "Chirag Talpada achievements",
    "programming awards",
    "coding competitions",
    "blind coding winner",
    "DBMania winner",
    "state level programming",
    "university rank holder",
    "BCA distinction",
    "software developer achievements",
    "full stack developer awards",
  ],
  openGraph: {
    title: "Achievements & Recognition | Chirag Talpada",
    description:
      "Early-career programming achievements that reflect strong problem-solving foundations.",
    type: "website",
    url: `${baseUrl}/achievements`,
    images: [
      {
        url: `${baseUrl}/awards/awards-blind-coding.webp`,
        width: 1200,
        height: 630,
        alt: "Chirag Talpada - Programming Achievements",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Achievements & Recognition | Chirag Talpada",
    description:
      "Early-career programming achievements that reflect strong problem-solving foundations.",
    images: [`${baseUrl}/awards/awards-blind-coding.webp`],
  },
  alternates: {
    canonical: `${baseUrl}/achievements`,
  },
};

export default function AchievementsPage() {
  return (
    <>
      <AchievementsJsonLd baseUrl={baseUrl} />
      <Suspense fallback={null}>
        <AchievementsPageContent />
      </Suspense>
    </>
  );
}

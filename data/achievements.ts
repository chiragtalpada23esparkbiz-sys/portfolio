import portfolioData from "@/data/portfolio.json";

export type AchievementCategory = "award" | "certificate" | "recognition";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  year: string;
  organization: string;
  image: string;
  certificateImage?: string;
  featured?: boolean;
}

// Map JSON data (snake_case) to TypeScript interface (camelCase)
export const achievements: Achievement[] = portfolioData.achievements.map(
  (achievement) => ({
    id: achievement.id,
    title: achievement.title,
    description: achievement.description,
    category: achievement.category as AchievementCategory,
    year: achievement.year,
    organization: achievement.organization,
    image: achievement.image,
    certificateImage: achievement.certificate_image,
    featured: achievement.featured,
  })
);

export function getFeaturedAchievements(): Achievement[] {
  return achievements.filter((a) => a.featured);
}

export function getAchievementsByCategory(
  category: AchievementCategory
): Achievement[] {
  return achievements.filter((a) => a.category === category);
}

export function getAllAchievements(): Achievement[] {
  return achievements;
}

export const categoryLabels: Record<AchievementCategory, string> = {
  award: "Award",
  certificate: "Certificate",
  recognition: "Recognition",
};

export const categoryColors: Record<AchievementCategory, string> = {
  award:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  certificate:
    "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  recognition:
    "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
};

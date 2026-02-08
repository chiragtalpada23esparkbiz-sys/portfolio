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

export const achievements: Achievement[] = [
  // Featured Awards (shown on homepage)
  {
    id: "blind-coding",
    title: "Blind Coding Competition Winner",
    description: "Won 1st place in Blind Coding competition demonstrating exceptional coding skills without visual IDE assistance.",
    category: "award",
    year: "2019",
    organization: "VNSGU University",
    image: "/awards/awards-blind-coding.webp",
    certificateImage: "/certificates/certificate-blind-coding.webp",
    featured: true,
  },
  {
    id: "dbmania",
    title: "DBMania Competition Winner",
    description: "Secured top position in database management competition showcasing advanced SQL and database design skills.",
    category: "award",
    year: "2019",
    organization: "VNSGU University",
    image: "/awards/awards-dbmania.webp",
    certificateImage: "/certificates/certificate-dbmania.webp",
    featured: true,
  },
  {
    id: "state-level-programming-2020",
    title: "State Level Programming Competition",
    description: "Achieved recognition in state-level programming competition competing against top programmers across Gujarat.",
    category: "award",
    year: "2020",
    organization: "Gujarat State",
    image: "/awards/awards-state-level-programming-2020.webp",
    certificateImage: "/certificates/certificate-state-level-programming.webp",
    featured: true,
  },

  // Other Awards
  {
    id: "state-level-programming-2019",
    title: "State Level Programming Competition",
    description: "Participated and excelled in state-level programming competition.",
    category: "award",
    year: "2019",
    organization: "Gujarat State",
    image: "/awards/awards-state-level-programming-2019.webp",
  },
  {
    id: "logic-test",
    title: "Logic Test Competition",
    description: "Demonstrated strong logical reasoning and problem-solving abilities.",
    category: "award",
    year: "2019",
    organization: "VNSGU University",
    image: "/awards/awards-logic-test.webp",
    certificateImage: "/certificates/certificate-logic-test.webp",
  },
  {
    id: "bachelor-rank",
    title: "Bachelor's Degree - University Rank",
    description: "Achieved top rank in Bachelor's degree program for academic excellence.",
    category: "recognition",
    year: "2020",
    organization: "VNSGU University",
    image: "/awards/awards-bachelor-rank.webp",
  },
  {
    id: "college-rank",
    title: "College Rank Holder",
    description: "Recognized as top performer in college academics.",
    category: "recognition",
    year: "2020",
    organization: "KBCNMU College",
    image: "/awards/awards-college-rank.webp",
  },
  {
    id: "college-recognition",
    title: "College Recognition Award",
    description: "Received special recognition for outstanding academic performance and extracurricular activities.",
    category: "recognition",
    year: "2020",
    organization: "KBCNMU College",
    image: "/awards/awards-college-recognition.webp",
    certificateImage: "/certificates/certificate-college-recognition.webp",
  },
  {
    id: "class-representative",
    title: "Class Representative",
    description: "Served as class representative, demonstrating leadership and organizational skills.",
    category: "recognition",
    year: "2019",
    organization: "KBCNMU College",
    image: "/awards/awards-class-representative.webp",
  },

  // Certificates
  {
    id: "bca-distinction",
    title: "BCA with Distinction",
    description: "Completed Bachelor of Computer Applications with distinction honors.",
    category: "certificate",
    year: "2020",
    organization: "VNSGU University",
    image: "/certificates/certificate-bca-distinction.webp",
  },
  {
    id: "university-distinction",
    title: "University Distinction Certificate",
    description: "Awarded distinction certificate from university for academic excellence.",
    category: "certificate",
    year: "2020",
    organization: "VNSGU University",
    image: "/certificates/certificate-university-distinction.webp",
  },
  {
    id: "distinction",
    title: "Academic Distinction",
    description: "Received distinction for outstanding academic performance.",
    category: "certificate",
    year: "2020",
    organization: "VNSGU University",
    image: "/certificates/certificate-distinction.webp",
  },
  {
    id: "research-paper",
    title: "Research Paper Publication",
    description: "Published research paper in academic journal.",
    category: "certificate",
    year: "2020",
    organization: "Academic Journal",
    image: "/certificates/certificate-research.webp",
  },
  {
    id: "tally-accounting",
    title: "Tally Accounting Certification",
    description: "Completed professional certification in Tally accounting software.",
    category: "certificate",
    year: "2018",
    organization: "Tally Solutions",
    image: "/certificates/certificate-tally-accounting.webp",
  },
];

export function getFeaturedAchievements(): Achievement[] {
  return achievements.filter((a) => a.featured);
}

export function getAchievementsByCategory(category: AchievementCategory): Achievement[] {
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
  award: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  certificate: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  recognition: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
};

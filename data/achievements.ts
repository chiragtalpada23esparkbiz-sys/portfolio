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
    title: "Blind Coding Competition – Runner-Up",
    description:
      "Secured runner-up position in a Blind Coding competition where participants coded with the monitor turned off for the first 30 minutes, relying on logic and memory, followed by 10 minutes of visible screen time to finalize the solution.",
    category: "award",
    year: "2019",
    organization: "Charotar University of Science and Technology (CHARUSAT)",
    image: "/awards/awards-blind-coding.webp",
    certificateImage: "/certificates/certificate-blind-coding.webp",
    featured: true,
  },
  {
    id: "dbmania",
    title: "DB Mania Competition – Runner-Up",
    description:
      "Secured runner-up position in a database management competition focused on efficient relational database design. Designed normalized database schemas and executed complex SQL queries to solve listed problem statements within a strict time limit.",
    category: "award",
    year: "2019",
    organization: "Charotar University of Science and Technology (CHARUSAT)",
    image: "/awards/awards-dbmania.webp",
    certificateImage: "/certificates/certificate-dbmania.webp",
    featured: true,
  },
  {
    id: "state-level-programming-2020",
    title: "State Level Programming Competition – 1st Rank",
    description:
      "Secured 1st rank in a state-level programming competition by solving 4–5 algorithmic problem statements within a fixed time frame, competing against top programmers across Gujarat.",
    category: "award",
    year: "2020",
    organization: "Sardar Patel University",
    image: "/awards/awards-state-level-programming-2020.webp",
    certificateImage: "/certificates/certificate-state-level-programming.webp",
  },

  // Other Awards
  {
    id: "state-level-programming-2019",
    title: "State Level Programming Competition – 1st Rank",
    description:
      "Secured 1st rank in a state-level programming competition by solving a distinct set of logic-based and coding problem statements within a fixed time limit, demonstrating strong analytical thinking and problem-solving skills.",
    category: "award",
    year: "2019",
    organization: "Sardar Patel University",
    image: "/awards/awards-state-level-programming-2019.webp",
    certificateImage: "/certificates/certificate-state-level-programming.webp",
    featured: true,
  },
  {
    id: "logic-test",
    title: "Logic Test Competition – 2nd Rank",
    description:
      "Secured 2nd rank in a logic test competition featuring a timed set of logical reasoning and programming-based MCQ questions, demonstrating strong analytical thinking and problem-solving skills.",
    category: "award",
    year: "2019",
    organization: "V.P. & R.P.T.P Science College - SPU",
    image: "/awards/awards-logic-test.webp",
    certificateImage: "/certificates/certificate-logic-test.webp",
  },
  {
    id: "bachelor-rank",
    title: "Bachelor’s Degree – Academic Rank Holder",
    description:
      "Secured 1st rank at the college level and 3rd rank at the university level for overall academic performance in the Bachelor’s degree.",
    category: "award",
    year: "2020",
    organization: "C P Patel & F H Shah Commerce College - SPU",
    image: "/awards/awards-bachelor-rank.webp",
  },
  {
    id: "college-rank-2019",
    title: "College Rank Holder – 1st Rank (First Year)",
    description:
      "Secured 1st rank in the first year of college for academic excellence and was featured in a local newspaper for outstanding academic performance.",
    category: "award",
    year: "2019",
    organization: "C P Patel & F H Shah Commerce College - SPU",
    image: "/awards/awards-college-rank.webp",
  },
  {
    id: "college-rank-banner",
    title: "College Topper Recognition Banner",
    description:
      "Recognition banner displayed by the college honoring Bachelor’s degree toppers, where I was featured as one of the top-performing students for academic excellence.",
    category: "recognition",
    year: "2020",
    organization: "C P Patel & F H Shah Commerce College - SPU",
    image: "/recognition/recognitions-banner-college-rank.webp",
  },
  {
    id: "college-rank-newspaper-2019",
    title: "University Rank Holder – 3rd Rank (2nd Semester) News Coverage",
    description:
      "Local newspaper coverage recognizing achievement of 3rd rank in the university for the 2nd semester by securing a 9.55 GPA, highlighting strong academic performance at the university level.",
    category: "recognition",
    year: "2019",
    organization: "C P Patel & F H Shah Commerce College - SPU",
    image: "/recognition/recognitions-newspapper-college-rank-2019.webp",
  },
  {
    id: "college-rank-2018",
    title:
      "University Rank Holder – Consistent 3rd Rank (Semesters 1–4) News Coverage",
    description:
      "Local newspaper coverage recognizing consistent achievement of 3rd rank in university-level examinations from 1st to 4th semester, highlighting sustained academic excellence across multiple semesters.",
    category: "recognition",
    year: "2018",
    organization: "C P Patel & F H Shah Commerce College - SPU",
    image: "/recognition/recognitions-newspapper-college-rank-2018.webp",
  },
  {
    id: "programming-competition-newspaper",
    title: "State Level Programming Competition – 1st Rank News Coverage",
    description:
      "Local newspaper coverage recognizing achievement of 1st rank in a state-level programming competition, highlighting competitive programming skills and excellence among participants across Gujarat.",
    category: "recognition",
    year: "2019",
    organization: "Gujarat State",
    image:
      "/recognition/recognitions-newspapper-programming-competetion-rank.webp",
  },
  {
    id: "programming-rank-newspaper",
    title:
      "College Pride – Multiple Programming Competition Wins (News Coverage)",
    description:
      "Local newspaper coverage recognizing me as the pride of the college for winning multiple programming competitions and securing multiple 1st ranks, highlighting consistent excellence in competitive programming.",
    category: "recognition",
    year: "2019",
    organization: "Gujarat State",
    image: "/recognition/recognitions-newspapper-programming-rank.webp",
  },
  {
    id: "college-recognition",
    title: "College Recognition Award",
    description:
      "Received special recognition from the college for achieving multiple ranks in programming competitions during the academic year, acknowledging consistent performance and technical excellence.",
    category: "award",
    year: "2020",
    organization: "C P Patel & F H Shah Commerce College - SPU",
    image: "/awards/awards-college-recognition.webp",
    certificateImage: "/certificates/certificate-college-recognition.webp",
  },
  {
    id: "class-representative",
    title: "Class Representative – Leadership Recognition",
    description:
      "Received formal recognition from the college for serving as Class Representative in 2019, effectively managing class coordination, communication with faculty, and academic responsibilities throughout the year.",
    category: "award",
    year: "2019",
    organization: "C P Patel & F H Shah Commerce College - SPU",
    image: "/awards/awards-class-representative.webp",
  },

  // Certificates
  {
    id: "cert-blind-coding",
    title: "Blind Coding Competition – Runner-Up Certificate",
    description:
      "Certificate awarded for securing the runner-up position in the Blind Coding competition at Charotar University of Science and Technology (CHARUSAT), recognizing logical reasoning, coding accuracy, and problem-solving under restricted visibility conditions.",
    category: "certificate",
    year: "2019",
    organization: "Charotar University of Science and Technology (CHARUSAT)",
    image: "/certificates/certificate-blind-coding.webp",
  },
  {
    id: "cert-dbmania",
    title: "DB Mania Competition – Runner-Up Certificate",
    description:
      "Certificate awarded for securing the runner-up position in the DB Mania database management competition at Charotar University of Science and Technology (CHARUSAT), recognizing efficient relational database design and strong SQL problem-solving skills.",
    category: "certificate",
    year: "2019",
    organization: "Charotar University of Science and Technology (CHARUSAT)",
    image: "/certificates/certificate-dbmania.webp",
  },
  {
    id: "cert-state-level-programming",
    title: "State Level Programming Competition – 1st Rank Certificates",
    description:
      "Certificate awarded for securing 1st rank in the State Level Programming Competition organized by Sardar Patel University, recognizing excellence in algorithmic and logic-based problem solving across multiple years (2019 and 2020).",
    category: "certificate",
    year: "2019-2020",
    organization: "Sardar Patel University",
    image: "/certificates/certificate-state-level-programming.webp",
  },
  {
    id: "cert-logic-test",
    title: "Logic Test Competition – 2nd Rank Certificate",
    description:
      "Certificate awarded for securing 2nd rank in the Logic Test competition at V.P. & R.P.T.P Science College, Sardar Patel University (SPU), recognizing strong logical reasoning and programming-based problem-solving skills.",
    category: "certificate",
    year: "2019",
    organization: "V.P. & R.P.T.P Science College - SPU",
    image: "/certificates/certificate-logic-test.webp",
  },
  {
    id: "cert-college-recognition",
    title: "College Recognition Award Certificate",
    description:
      "Certificate awarded for achieving multiple ranks in programming competitions during the academic year, recognizing consistent performance, technical excellence, and contributions to the college.",
    category: "certificate",
    year: "2020",
    organization: "C P Patel & F H Shah Commerce College - SPU",
    image: "/certificates/certificate-college-recognition.webp",
  },
  {
    id: "bca-distinction",
    title: "Bachelor’s Degree – Academic Rank Certificate",
    description:
      "Certificate awarded for outstanding academic performance in the Bachelor’s degree program, securing 1st rank at the college level and 3rd rank at the university level.",
    category: "certificate",
    year: "2020",
    organization: "C P Patel & F H Shah Commerce College - SPU",
    image: "/certificates/certificate-bca-distinction.webp",
  },
  {
    id: "university-distinction",
    title: "University Examination – Distinction Certificate",
    description:
      "Certificate awarded by the college for securing distinction in the university examination, recognizing strong academic performance at the university level.",
    category: "certificate",
    year: "2020",
    organization: "C P Patel & F H Shah Commerce College - SPU",
    image: "/certificates/certificate-university-distinction.webp",
  },
  {
    id: "distinction",
    title: "Academic Distinction & Professional Training Certificate",
    description:
      "Certificate recognizing academic distinction for securing 1st rank in the Bachelor’s degree first semester, along with successful completion of professional training in website development.",
    category: "certificate",
    year: "2020",
    organization: "VNSGU University",
    image: "/certificates/certificate-distinction.webp",
  },
  {
    id: "farewell-recognition",
    title: "Farewell Ceremony – Academic & Contribution Recognition",
    description:
      "Honored by the college trust chairman during the farewell ceremony for outstanding academic achievements and significant contributions, including winning multiple competitive programming competitions.",
    category: "recognition",
    year: "2020",
    organization: "C P Patel & F H Shah Commerce College - SPU",
    image: "/recognition/recognitions-farewell.webp",
  },
];

export function getFeaturedAchievements(): Achievement[] {
  return achievements.filter((a) => a.featured);
}

export function getAchievementsByCategory(
  category: AchievementCategory,
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

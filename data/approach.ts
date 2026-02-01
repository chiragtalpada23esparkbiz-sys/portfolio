import type { ApproachStep } from "@/types";

export const approachSteps: ApproachStep[] = [
  {
    id: "planning",
    title: "Planning & Strategy",
    description:
      "Understanding your requirements, analyzing the scope, and creating a comprehensive roadmap. I focus on defining clear goals, identifying potential challenges, and establishing a solid foundation for the project.",
    icon: "Lightbulb",
  },
  {
    id: "development",
    title: "Development & Progress Updates",
    description:
      "Building your solution with clean, maintainable code while keeping you informed at every step. Regular check-ins ensure we're aligned and any adjustments can be made early in the process.",
    icon: "Code",
  },
  {
    id: "launch",
    title: "Testing & Launch",
    description:
      "Thorough testing to ensure quality and reliability, followed by a smooth deployment. Post-launch support ensures your solution continues to perform optimally and scales with your needs.",
    icon: "Rocket",
  },
];

"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, User, Briefcase, Code, Lightbulb, Wrench, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#", icon: Home, label: "Home" },
  { href: "#about", icon: User, label: "About" },
  { href: "#experience", icon: Briefcase, label: "Experience" },
  { href: "#projects", icon: Code, label: "Projects" },
  { href: "#approach", icon: Lightbulb, label: "Approach" },
  { href: "#tech-stack", icon: Wrench, label: "Tech Stack" },
  { href: "#contact", icon: Menu, label: "More" },
];

const sectionMessages: Record<string, string> = {
  "": "Hey! I'm Chirag. Let me show you around!",
  hero: "Hey! I'm Chirag. Let me show you around!",
  about: "Here's a bit about my journey.",
  experience: "I've worked with some amazing teams.",
  education: "My academic background.",
  "tech-stack": "These are my tools of choice.",
  projects: "Check out what I've built!",
  certifications: "My professional credentials.",
  achievements: "Recognition for my contributions.",
  testimonials: "Hear from people I've worked with.",
  companies: "Companies I've collaborated with.",
  approach: "From idea to launch - my process.",
  blog: "Insights and tutorials.",
  contact: "Let's connect and build something!",
};

export function BottomNav() {
  const [activeSection, setActiveSection] = React.useState("");
  const [prevSection, setPrevSection] = React.useState("");
  const [showMessage, setShowMessage] = React.useState(true);
  const [isHovering, setIsHovering] = React.useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 200) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show message when section changes
  React.useEffect(() => {
    if (activeSection !== prevSection) {
      setPrevSection(activeSection);
      setShowMessage(true);

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Auto-hide after 4 seconds if not hovering
      timeoutRef.current = setTimeout(() => {
        if (!isHovering) {
          setShowMessage(false);
        }
      }, 4000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeSection, prevSection, isHovering]);

  const currentMessage = sectionMessages[activeSection] || sectionMessages[""];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex items-center justify-center px-4">
      {/* Center Navigation */}
      <nav className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 dark:bg-zinc-900 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-lg dark:shadow-2xl">
        {navItems.map((item) => {
          const isActive =
            item.href === "#"
              ? activeSection === "" || activeSection === "hero"
              : item.href === `#${activeSection}`;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "p-3 rounded-full transition-all duration-200",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                isActive
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                  : "text-zinc-500 dark:text-zinc-400"
              )}
              aria-label={item.label}
            >
              <item.icon className="h-5 w-5" />
            </Link>
          );
        })}
      </nav>

      {/* Right side controls */}
      <div className="fixed bottom-6 right-6 flex items-center gap-3">
        {/* Assistant Message Tooltip */}
        <div
          className={cn(
            "absolute bottom-full right-0 mb-3 px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm font-medium shadow-xl border border-zinc-200 dark:border-zinc-700 whitespace-nowrap transition-all duration-300",
            showMessage
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          )}
        >
          {currentMessage}
          <div className="absolute -bottom-1 right-8 w-2 h-2 bg-white dark:bg-zinc-800 border-b border-r border-zinc-200 dark:border-zinc-700 rotate-45" />
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="relative p-3 rounded-full bg-white/80 dark:bg-zinc-900 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all shadow-lg dark:shadow-2xl"
          aria-label="Toggle dark mode"
          suppressHydrationWarning
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>

        {/* Assistant Button */}
        <button
          className="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all shadow-2xl overflow-hidden"
          aria-label="Open assistant"
          onMouseEnter={() => {
            setIsHovering(true);
            setShowMessage(true);
          }}
          onMouseLeave={() => {
            setIsHovering(false);
          }}
          onClick={() => setShowMessage(!showMessage)}
          suppressHydrationWarning
        >
          <Image
            src="/assistent_bot.png"
            alt="AI Assistant"
            fill
            className="object-cover"
            sizes="48px"
          />
        </button>
      </div>
    </div>
  );
}

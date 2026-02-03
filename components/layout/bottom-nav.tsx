"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  User,
  Briefcase,
  Code,
  Lightbulb,
  Wrench,
  Mail,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#", icon: Home, label: "Home", priority: true },
  { href: "#about", icon: User, label: "About", priority: true },
  { href: "#experience", icon: Briefcase, label: "Experience", priority: true },
  { href: "#projects", icon: Code, label: "Projects", priority: true },
  { href: "#approach", icon: Lightbulb, label: "Approach", priority: false },
  { href: "#tech-stack", icon: Wrench, label: "Tech Stack", priority: false },
  { href: "#contact", icon: Mail, label: "Contact", priority: true },
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
    <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-50 flex items-center justify-center px-2 sm:px-4">
      {/* Center Navigation */}
      <nav className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-white/80 dark:bg-zinc-900 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-lg dark:shadow-2xl">
        {navItems.map((item) => {
          const isActive =
            item.href === "#"
              ? activeSection === "" || activeSection === "hero"
              : item.href === `#${activeSection}`;

          return (
            <div
              key={item.href}
              className={cn(
                "relative group",
                !item.priority && "hidden xs:block",
              )}
            >
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-medium shadow-lg border border-zinc-200 dark:border-zinc-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                {item.label}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-zinc-800 border-b border-r border-zinc-200 dark:border-zinc-700 rotate-45" />
              </div>

              <Link
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const targetId = item.href === "#" ? "hero" : item.href.slice(1);
                  const element = document.getElementById(targetId);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  } else if (item.href === "#") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={cn(
                  "block p-2 sm:p-3 rounded-full transition-all duration-200",
                  "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                  isActive
                    ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    : "text-zinc-500 dark:text-zinc-400",
                )}
                aria-label={item.label}
              >
                <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          );
        })}

        {/* Theme toggle integrated in nav for mobile only */}
        <div className="relative group sm:hidden">
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-medium shadow-lg border border-zinc-200 dark:border-zinc-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
            {resolvedTheme === "dark" ? "Light" : "Dark"}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-zinc-800 border-b border-r border-zinc-200 dark:border-zinc-700 rotate-45" />
          </div>
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="relative p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
            aria-label="Toggle dark mode"
            suppressHydrationWarning
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
        </div>

        {/* Assistant Button with tooltip - mobile only */}
        <div className="relative sm:hidden">
          {/* Mobile Tooltip - positioned above assistant button */}
          <div
            className={cn(
              "absolute bottom-full right-0 mb-2 px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-medium shadow-xl border border-zinc-200 dark:border-zinc-700 whitespace-nowrap transition-all duration-300",
              showMessage
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 pointer-events-none",
            )}
          >
            {currentMessage}
            {/* Arrow pointing down to assistant button */}
            <div className="absolute -bottom-1 right-3 w-2 h-2 bg-white dark:bg-zinc-800 border-b border-r border-zinc-200 dark:border-zinc-700 rotate-45" />
          </div>

          <button
            className="relative w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg overflow-hidden shrink-0"
            aria-label="Open assistant"
            onClick={() => setShowMessage(!showMessage)}
            suppressHydrationWarning
          >
            <Image
              src="/assistent_bot.png"
              alt="AI Assistant"
              fill
              className="object-cover"
              sizes="32px"
            />
          </button>
        </div>
      </nav>

      {/* Right side controls - DESKTOP ONLY (unchanged from original) */}
      <div className="hidden sm:flex fixed bottom-6 right-6 items-center gap-3">
        {/* Assistant Message Tooltip - Desktop */}
        <div
          className={cn(
            "absolute bottom-full right-0 mb-3 px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm font-medium shadow-xl border border-zinc-200 dark:border-zinc-700 whitespace-nowrap transition-all duration-300",
            showMessage
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none",
          )}
        >
          {currentMessage}
          <div className="absolute -bottom-1 right-8 w-2 h-2 bg-white dark:bg-zinc-800 border-b border-r border-zinc-200 dark:border-zinc-700 rotate-45" />
        </div>

        {/* Dark Mode Toggle - Desktop */}
        <div className="relative group">
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-medium shadow-lg border border-zinc-200 dark:border-zinc-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
            {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-zinc-800 border-b border-r border-zinc-200 dark:border-zinc-700 rotate-45" />
          </div>
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="relative p-3 rounded-full bg-white/80 dark:bg-zinc-900 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all shadow-lg dark:shadow-2xl"
            aria-label="Toggle dark mode"
            suppressHydrationWarning
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
        </div>

        {/* Assistant Button - Desktop */}
        <button
          className="relative w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all shadow-2xl overflow-hidden"
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

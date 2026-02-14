"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  Code,
  Trophy,
  MessageSquareQuote,
  BookOpen,
  Mail,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#", icon: Home, label: "Home", priority: true },
  { href: "#about", icon: User, label: "About", priority: true },
  { href: "#tech-stack", icon: Wrench, label: "Tech Stack", priority: false },
  { href: "#experience", icon: Briefcase, label: "Experience", priority: true },
  {
    href: "#education",
    icon: GraduationCap,
    label: "Education",
    priority: false,
  },
  { href: "#projects", icon: Code, label: "Projects", priority: true },
  {
    href: "#achievements",
    icon: Trophy,
    label: "Achievements",
    priority: false,
  },
  {
    href: "#testimonials",
    icon: MessageSquareQuote,
    label: "Testimonials",
    priority: false,
  },
  { href: "#blog", icon: BookOpen, label: "Blog", priority: false },
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
  achievements: "Recognition for my contributions.",
  testimonials: "Hear from people I've worked with.",
  blog: "Insights and tutorials.",
  contact: "Let's connect and build something!",
};

export function BottomNav() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = React.useState("");
  const [prevSection, setPrevSection] = React.useState("");
  const [showMessage, setShowMessage] = React.useState(true);
  const [isHovering, setIsHovering] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [showMoreMenu, setShowMoreMenu] = React.useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const moreMenuDesktopRef = React.useRef<HTMLDivElement>(null);
  const moreMenuMobileRef = React.useRef<HTMLDivElement>(null);

  // Check if on subpages (not home page)
  const isSubPage =
    pathname?.startsWith("/blog") ||
    pathname?.startsWith("/projects/") ||
    pathname?.startsWith("/achievements");

  // Priority items for mobile (shown in main bar)
  const priorityItems = navItems.filter((item) => item.priority);
  // Non-priority items (shown in "More" menu on mobile)
  const moreItems = navItems.filter((item) => !item.priority);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Close more menu when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const isInsideDesktop = moreMenuDesktopRef.current?.contains(target);
      const isInsideMobile = moreMenuMobileRef.current?.contains(target);
      if (!isInsideDesktop && !isInsideMobile) {
        setShowMoreMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleNavClick = (href: string) => {
    const targetId = href === "#" ? "hero" : href.slice(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setShowMoreMenu(false);
  };

  // Simplified nav for subpages - only theme toggle on right
  if (isSubPage) {
    return (
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        <div className="relative group">
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-medium shadow-lg border border-zinc-200 dark:border-zinc-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
            {mounted
              ? resolvedTheme === "dark"
                ? "Light Mode"
                : "Dark Mode"
              : "Theme"}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-zinc-800 border-b border-r border-zinc-200 dark:border-zinc-700 rotate-45" />
          </div>
          <button
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="relative p-3 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/90 transition-all shadow-lg dark:shadow-2xl"
            aria-label="Toggle dark mode"
            suppressHydrationWarning
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-50 flex items-center justify-center px-2 sm:px-4">
      {/* Center Navigation - Desktop only */}
      <nav className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-lg dark:shadow-2xl">
        {/* Desktop: Show priority items + More button */}
        <div className="flex items-center gap-2">
          {priorityItems.map((item) => {
            const isActive =
              item.href === "#"
                ? activeSection === "" || activeSection === "hero"
                : item.href === `#${activeSection}`;

            return (
              <div key={item.href} className="relative group">
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-medium shadow-lg border border-zinc-200 dark:border-zinc-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                  {item.label}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-zinc-800 border-b border-r border-zinc-200 dark:border-zinc-700 rotate-45" />
                </div>

                <Link
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={cn(
                    "block p-3 rounded-full transition-all duration-200",
                    "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                    isActive
                      ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                      : "text-zinc-500 dark:text-zinc-400",
                  )}
                  aria-label={item.label}
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              </div>
            );
          })}

          {/* More Button - Desktop */}
          <div className="relative" ref={moreMenuDesktopRef}>
            <div className="relative group">
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-medium shadow-lg border border-zinc-200 dark:border-zinc-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                More
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-zinc-800 border-b border-r border-zinc-200 dark:border-zinc-700 rotate-45" />
              </div>
              <button
                suppressHydrationWarning
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className={cn(
                  "block p-3 rounded-full transition-all duration-200",
                  "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                  showMoreMenu
                    ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    : "text-zinc-500 dark:text-zinc-400",
                )}
                aria-label="More options"
              >
                {showMoreMenu ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* More Menu Popup - Desktop */}
            {showMoreMenu && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-2xl z-100">
                <div className="flex flex-col gap-1">
                  {moreItems.map((item) => {
                    const isActive = item.href === `#${activeSection}`;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200",
                          "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                          isActive
                            ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                            : "text-zinc-600 dark:text-zinc-300",
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="text-sm font-medium whitespace-nowrap">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile: Hamburger menu in top right corner */}
      <div
        className="fixed top-4 right-4 z-50 sm:hidden"
        ref={moreMenuMobileRef}
      >
        {/* Menu Toggle Button */}
        {!showMoreMenu && (
          <button
            onClick={() => setShowMoreMenu(true)}
            className="p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all shadow-lg"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        {/* Expanded Menu */}
        {showMoreMenu && (
          <div className="flex flex-col items-end gap-2">
            {/* Top controls: Theme toggle and Close */}
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                className="relative p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all shadow-lg"
                aria-label="Toggle dark mode"
                suppressHydrationWarning
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </button>
              <button
                onClick={() => setShowMoreMenu(false)}
                className="p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all shadow-lg"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex flex-col gap-2 p-2 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-2xl">
              {navItems.map((item) => {
                const isActive =
                  item.href === "#"
                    ? activeSection === "" || activeSection === "hero"
                    : item.href === `#${activeSection}`;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={cn(
                      "p-3 rounded-full transition-all duration-200",
                      "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                      isActive
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        : "text-zinc-600 dark:text-zinc-300",
                    )}
                    aria-label={item.label}
                  >
                    <item.icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Assistant Button - Mobile Only (Bottom Right) */}
      <div className="fixed bottom-4 right-4 z-50 sm:hidden">
        <div className="relative">
          <div
            className={cn(
              "absolute bottom-full right-0 mb-2 px-3 py-2 rounded-lg bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md text-zinc-900 dark:text-white text-xs font-medium shadow-xl border border-zinc-200 dark:border-zinc-700 whitespace-nowrap transition-all duration-300",
              showMessage
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 pointer-events-none",
            )}
          >
            {currentMessage}
            <div className="absolute -bottom-1 right-3 w-2 h-2 bg-white dark:bg-zinc-800 border-b border-r border-zinc-200 dark:border-zinc-700 rotate-45" />
          </div>

          <button
            className="relative w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg overflow-hidden"
            aria-label="Open assistant"
            onClick={() => setShowMessage(!showMessage)}
            suppressHydrationWarning
          >
            <Image
              src="/assistent_bot.webp"
              alt="AI Assistant"
              fill
              className="object-cover"
              sizes="40px"
            />
          </button>
        </div>
      </div>

      {/* Right side controls - DESKTOP ONLY */}
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
            {mounted
              ? resolvedTheme === "dark"
                ? "Light Mode"
                : "Dark Mode"
              : "Theme"}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-zinc-800 border-b border-r border-zinc-200 dark:border-zinc-700 rotate-45" />
          </div>
          <button
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="relative p-3 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/90 transition-all shadow-lg dark:shadow-2xl"
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
            src="/assistent_bot.webp"
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

"use client";

import { useState, useEffect } from "react";
import posthog from "posthog-js";

const sectionMessages: Record<string, string> = {
  hero: "Hey! I'm Chirag's AI assistant. Let me show you around!",
  about: "Here's a bit about Chirag's journey and what drives him.",
  experience: "Check out the amazing teams Chirag has worked with!",
  "tech-stack": "These are the technologies Chirag uses to build awesome stuff!",
  projects: "Take a look at some cool projects Chirag has built!",
  testimonials: "Don't just take my word for it - hear from people who worked with Chirag!",
  companies: "Chirag has collaborated with these great organizations!",
  approach: "This is how Chirag tackles every project - from idea to launch!",
  blog: "Check out Chirag's latest thoughts and tutorials!",
  contact: "Want to work together? Drop a message!",
};

export function useSectionObserver() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [message, setMessage] = useState<string>(sectionMessages.hero);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
            setMessage(sectionMessages[id] || sectionMessages.hero);
            posthog.capture("section_viewed", { section: id });
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return { activeSection, message };
}

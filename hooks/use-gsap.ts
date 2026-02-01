"use client";

import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseScrollAnimationOptions {
  animation?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale";
  delay?: number;
  duration?: number;
  stagger?: number;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const {
    animation = "fadeUp",
    delay = 0,
    duration = 0.8,
    stagger = 0,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const animations = {
      fadeUp: { opacity: 0, y: 50 },
      fadeIn: { opacity: 0 },
      slideLeft: { opacity: 0, x: -50 },
      slideRight: { opacity: 0, x: 50 },
      scale: { opacity: 0, scale: 0.9 },
    };

    const fromVars = animations[animation];

    const ctx = gsap.context(() => {
      gsap.from(element, {
        ...fromVars,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, element);

    return () => ctx.revert();
  }, [animation, delay, duration, stagger]);

  return ref;
}

export function useStaggerAnimation<T extends HTMLElement>(
  childSelector: string,
  options: UseScrollAnimationOptions = {}
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const { delay = 0, duration = 0.6, stagger = 0.1 } = options;

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = container.querySelectorAll(childSelector);
    if (children.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(children, {
        opacity: 0,
        y: 30,
        duration,
        delay,
        stagger,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, container);

    return () => ctx.revert();
  }, [childSelector, delay, duration, stagger]);

  return ref;
}

export function useHoverAnimation<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onEnter = () => {
      gsap.to(element, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    element.addEventListener("mouseenter", onEnter);
    element.addEventListener("mouseleave", onLeave);

    return () => {
      element.removeEventListener("mouseenter", onEnter);
      element.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return ref;
}

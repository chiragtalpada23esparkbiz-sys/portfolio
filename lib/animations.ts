import { gsap } from "gsap";

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "power2.out" },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, ease: "power2.out" },
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function animateOnScroll(
  element: HTMLElement,
  options?: gsap.TweenVars
): gsap.core.Tween {
  return gsap.from(element, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
    ...options,
  });
}

export function animateStaggeredList(
  container: HTMLElement,
  childSelector: string,
  options?: gsap.TweenVars
): gsap.core.Tween {
  const children = container.querySelectorAll(childSelector);

  return gsap.from(children, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: container,
      start: "top 80%",
    },
    ...options,
  });
}

export function animateText(
  element: HTMLElement,
  options?: gsap.TweenVars
): gsap.core.Tween {
  return gsap.from(element, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power3.out",
    ...options,
  });
}

export function animateScale(
  element: HTMLElement,
  options?: gsap.TweenVars
): gsap.core.Tween {
  return gsap.from(element, {
    scale: 0.9,
    opacity: 0,
    duration: 0.6,
    ease: "back.out(1.7)",
    ...options,
  });
}

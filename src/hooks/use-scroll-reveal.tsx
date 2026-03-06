import { useRef, useEffect, useState } from "react";
import { useIsMobile } from "./use-mobile";

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// Framer motion variants for staggered section reveals
export const sectionVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export const mobileSectionVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(2px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export const mobileStaggerItem = {
  hidden: { opacity: 0, y: 12, filter: "blur(2px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

// Reusable transition config
export const revealTransition = {
  duration: 0.8,
  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
};

export const mobileRevealTransition = {
  duration: 0.5,
  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
};

export function useRevealVariants() {
  const isMobile = useIsMobile();
  return {
    section: isMobile ? mobileSectionVariants : sectionVariants,
    item: isMobile ? mobileStaggerItem : staggerItem,
    transition: isMobile ? mobileRevealTransition : revealTransition,
    container: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: isMobile ? 0.1 : 0.15,
          delayChildren: 0.05,
        },
      },
    },
  };
}

import { useReducedMotion } from "framer-motion";

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.08,
    },
  },
};

export function useMotionConfig() {
  const reducedMotion = useReducedMotion();

  return {
    reducedMotion: !!reducedMotion,
    viewport: { once: true, amount: 0.15 as const },
    transition: reducedMotion
      ? { duration: 0 }
      : { duration: 0.6, ease: "easeOut" as const },
    fadeUp: reducedMotion
      ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
      : fadeUpVariants,
    stagger: reducedMotion ? { hidden: {}, visible: {} } : staggerContainer,
  };
}

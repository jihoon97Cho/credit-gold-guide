import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useScrollReveal, useRevealVariants } from "@/hooks/use-scroll-reveal";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
  id?: string;
}

/**
 * Wraps a section to animate it in when scrolled into view.
 * Children should use <RevealItem> for staggered sequencing.
 */
export const ScrollReveal = ({ children, className, as = "div", id }: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollReveal(0.12);
  const { container, transition } = useRevealVariants();

  const Component = as === "section" ? motion.section : motion.div;

  return (
    <Component
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={container}
      transition={transition}
    >
      {children}
    </Component>
  );
};

interface RevealItemProps {
  children: ReactNode;
  className?: string;
}

/**
 * A stagger child for use inside <ScrollReveal>.
 * Fades in, rises, and de-blurs in sequence.
 */
export const RevealItem = ({ children, className }: RevealItemProps) => {
  const { item } = useRevealVariants();

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
};

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  stagger?: boolean;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className = "",
  id,
  stagger = false,
}) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.section
      ref={ref}
      id={id}
      variants={stagger ? staggerContainer : fadeUpVariant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </motion.section>
  );
};

export const FadeUp: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({
  children,
  className = "",
  delay = 0,
}) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1], delay },
        },
      }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerChild: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <motion.div variants={fadeUpVariant} className={className}>
    {children}
  </motion.div>
);

export default SectionWrapper;

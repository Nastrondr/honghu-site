import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

const reducedMotionVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

const PageTransition = ({ children }) => {
  const location = useLocation();
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const variants = prefersReducedMotion ? reducedMotionVariants : pageVariants;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const mobileVariants = prefersReducedMotion ? reducedMotionVariants : {
    ...pageVariants,
    enter: {
      ...pageVariants.enter,
      transition: {
        duration: 0.25,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={isMobile ? mobileVariants : variants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="w-full min-h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;

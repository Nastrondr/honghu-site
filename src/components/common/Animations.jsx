import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.25, 0.1, 0.25, 1];

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease }
  }
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1
    }
  }
};

export const mobileContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease }
  }
};

export const titleVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease }
  }
};

export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease }
  }
};

export const reducedContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.1 } }
};

export const reducedItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.1 } }
};

export const useReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const useIsMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

export const AnimatedContainer = ({ children, className = '', delay = 0 }) => {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={isMobile ? mobileContainerVariants : containerVariants}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedItem = ({ children, className = '', variants = itemVariants }) => {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
};

export const PageHeader = ({ children, className = '' }) => {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.05, duration: 0.3 }}
      variants={titleVariants}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredList = ({ children, className = '', itemClassName = '' }) => {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const childArray = React.Children.toArray(children);

  if (reducedMotion) {
    return (
      <div className={className}>
        {childArray.map((child, index) => (
          <div key={index} className={itemClassName}>{child}</div>
        ))}
      </div>
    );
  }

  return (
    <motion.div className={className} initial="hidden" animate="visible">
      {childArray.map((child, index) => (
        <motion.div
          key={index}
          className={itemClassName}
          variants={isMobile ? reducedItemVariants : itemVariants}
          custom={index}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

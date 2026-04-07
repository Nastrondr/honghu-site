import React from 'react';
import { motion } from 'framer-motion';
import {
  pageTransitionVariants,
  pageTransitionMobileVariants,
  sectionVariants,
  sectionMobileVariants,
  containerVariants,
  containerMobileVariants,
  itemVariants,
  itemMobileVariants,
  titleVariants,
  fadeInVariants,
  tabContentVariants,
  useReducedMotion,
  useIsMobile,
} from './animationConfig';

// ============================================
// 动画容器组件
// ============================================

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
      variants={isMobile ? containerMobileVariants : containerVariants}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedItem = ({ children, className = '' }) => {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={isMobile ? itemMobileVariants : itemVariants}>
      {children}
    </motion.div>
  );
};

export const AnimatedSection = ({ children, className = '' }) => {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  if (reducedMotion) {
    return <section className={className}>{children}</section>;
  }

  return (
    <motion.section
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={isMobile ? sectionMobileVariants : sectionVariants}
    >
      {children}
    </motion.section>
  );
};

export const PageHeader = ({ children, className = '' }) => {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} initial="hidden" animate="visible" variants={titleVariants}>
      {children}
    </motion.div>
  );
};

export default {
  AnimatedContainer,
  AnimatedItem,
  AnimatedSection,
  PageHeader,
};

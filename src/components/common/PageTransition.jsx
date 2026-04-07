import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {
  pageTransitionVariants,
  pageTransitionMobileVariants,
  useReducedMotion,
  useIsMobile,
} from './Animations';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // 路由切换时滚动到顶部
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  }, [location.pathname, prefersReducedMotion]);

  // 根据用户偏好和移动端状态选择动效
  const variants = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        enter: { opacity: 1, transition: { duration: 0.15 } },
        exit: { opacity: 0, transition: { duration: 0.1 } },
      }
    : (isMobile ? pageTransitionMobileVariants : pageTransitionVariants);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={variants}
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

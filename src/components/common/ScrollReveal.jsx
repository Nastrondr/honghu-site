import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  sectionVariants,
  sectionMobileVariants,
  itemVariants,
  itemMobileVariants,
  useReducedMotion,
  useIsMobile,
  STAGGER,
} from './Animations';

// ============================================
// ScrollReveal - 区块进入动画
// ============================================

const ScrollReveal = ({
  children,
  className = '',
  type = 'section',
  delay = 0,
  threshold = 0.15,
  rootMargin = '-50px 0px',
  once = true,
}) => {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // 根据类型和平台选择动效
  const variants = type === 'item'
    ? (isMobile ? itemMobileVariants : itemVariants)
    : (isMobile ? sectionMobileVariants : sectionVariants);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold, margin: rootMargin }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// ScrollRevealStagger - 交错列表动画
// ============================================

export const ScrollRevealStagger = ({
  children,
  className = '',
  itemClassName = '',
  staggerDelay = null, // 使用默认值
  threshold = 0.1,
  rootMargin = '-30px 0px',
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // 使用默认的交错延迟
  const actualDelay = staggerDelay ?? (isMobile ? STAGGER.mobile : STAGGER.default);

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // 如果只需要触发一次，取消观察
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, once, reducedMotion]);

  const childrenArray = React.Children.toArray(children);

  return (
    <div ref={containerRef} className={className}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={itemClassName}
          style={{
            opacity: isVisible || reducedMotion ? 1 : 0,
            transform: isVisible || reducedMotion ? 'translateY(0)' : `translateY(${isMobile ? 12 : 16}px)`,
            transition: `opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)`,
            transitionDelay: isVisible ? `${index * actualDelay}s` : '0s',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// ============================================
// ScrollRevealItem - 单个滚动动画项
// ============================================

export const ScrollRevealItem = ({
  children,
  className = '',
  index = 0,
  staggerDelay = null,
}) => {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const actualDelay = staggerDelay ?? (isMobile ? STAGGER.mobile : STAGGER.default);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: isMobile ? 12 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: isMobile ? 0.35 : 0.4,
        delay: index * actualDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// FadeInView - 简单淡入
// ============================================

export const FadeInView = ({
  children,
  className = '',
  delay = 0,
  duration = 0.4,
}) => {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

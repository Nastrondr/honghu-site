import React, { useEffect, useRef, useState } from 'react';

const defaultVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const reducedVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.15 }
  }
};

const ScrollReveal = ({
  children,
  className = '',
  variants = defaultVariants,
  delay = 0,
  threshold = 0.15,
  rootMargin = '0px 0px -50px 0px'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasAnimated, threshold, rootMargin, prefersReducedMotion]);

  const currentVariants = prefersReducedMotion ? reducedVariants : variants;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? undefined : currentVariants.hidden.opacity,
        transform: isVisible ? undefined : currentVariants.hidden.y
          ? `translateY(${currentVariants.hidden.y}px)`
          : undefined,
        transition: isVisible
          ? `opacity ${currentVariants.visible.transition.duration}s ease-out, transform ${currentVariants.visible.transition.duration}s ease-out, delay: ${delay}s`
          : undefined,
        transitionDelay: isVisible ? `${delay}s` : undefined
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;

export const useScrollRevealOptions = () => {
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return { prefersReducedMotion, isMobile };
};

export const staggerContainerVariants = (staggerDelay = 0.06) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1
    }
  }
});

export const staggerItemVariants = (yOffset = 20, duration = 0.45) => ({
  hidden: { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: [0.25, 0.1, 0.25, 1] }
  }
});

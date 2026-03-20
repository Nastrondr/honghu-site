import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({
  children,
  className = '',
  type = 'content',
  delay = 0,
  threshold = 0.2,
  rootMargin = '0px 0px -50px 0px'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const getAnimationConfig = () => {
    if (prefersReducedMotion) {
      return { opacity: 0, y: 0, duration: 0.15 };
    }

    const configs = {
      title: { opacity: 0, y: isMobile ? 12 : 20, duration: isMobile ? 0.5 : 0.7 },
      content: { opacity: 0, y: isMobile ? 12 : 24, duration: isMobile ? 0.4 : 0.6 },
      image: { opacity: 0, y: isMobile ? 8 : 16, duration: isMobile ? 0.45 : 0.55 }
    };

    return configs[type] || configs.content;
  };

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

  const config = getAnimationConfig();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : config.opacity,
        transform: isVisible ? 'translateY(0)' : `translateY(${config.y}px)`,
        transition: `opacity ${config.duration}s cubic-bezier(0.25, 0.1, 0.25, 1), transform ${config.duration}s cubic-bezier(0.25, 0.1, 0.25, 1)`,
        transitionDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );
};

export const ScrollRevealStagger = ({
  children,
  className = '',
  staggerDelay = 0.12,
  threshold = 0.2
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const actualDelay = isMobile ? staggerDelay * 0.6 : staggerDelay;

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasAnimated, threshold, prefersReducedMotion]);

  const childrenArray = React.Children.toArray(children);

  return (
    <div ref={containerRef} className={className}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)`,
            transitionDelay: isVisible ? `${index * actualDelay}s` : '0s'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default ScrollReveal;

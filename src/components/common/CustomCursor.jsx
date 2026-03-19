import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const cursorRingRef = useRef(null);
  
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const ringTargetRef = useRef({ x: 0, y: 0 });
  
  const [cursorState, setCursorState] = useState('default');
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 1024px)').matches || 
                     'ontouchstart' in window || 
                     navigator.maxTouchPoints > 0;
    
    if (isMobile) return;

    setIsVisible(true);

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleHoverStart = (e) => {
      const target = e.target;
      
      if (target.tagName === 'INPUT' || 
          target.tagName === 'TEXTAREA' || 
          target.tagName === 'SELECT' ||
          target.isContentEditable ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('[contenteditable="true"]')) {
        setCursorState('hidden');
        return;
      }
      
      if (target.tagName === 'A' || 
          target.tagName === 'BUTTON' ||
          target.closest('a') || 
          target.closest('button') ||
          target.classList.contains('cursor-pointer') ||
          target.closest('.cursor-pointer')) {
        setCursorState('hover');
        setIsHovering(true);
      } else if (target.tagName === 'P' || 
                 target.tagName === 'H1' || 
                 target.tagName === 'H2' || 
                 target.tagName === 'H3' || 
                 target.tagName === 'H4' || 
                 target.tagName === 'H5' || 
                 target.tagName === 'H6' ||
                 target.tagName === 'SPAN' ||
                 target.tagName === 'LABEL' ||
                 target.closest('p') ||
                 target.closest('h1') ||
                 target.closest('h2') ||
                 target.closest('h3') ||
                 target.closest('h4') ||
                 target.closest('h5') ||
                 target.closest('h6') ||
                 target.closest('span') ||
                 target.closest('label')) {
        setCursorState('text');
      } else {
        setCursorState('default');
      }
    };

    const handleHoverEnd = () => {
      setCursorState('default');
      setIsHovering(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    const hoverableElements = document.querySelectorAll('a, button, p, h1, h2, h3, h4, h5, h6, span, label, .cursor-pointer');
    hoverableElements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    const observer = new MutationObserver((mutations) => {
      const newElements = document.querySelectorAll('a, button, p, h1, h2, h3, h4, h5, h6, span, label, .cursor-pointer');
      newElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const animate = () => {
      const ease = 0.15;
      const ringEase = 0.12;
      
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * ease;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * ease;
      
      ringTargetRef.current.x += (targetRef.current.x - ringTargetRef.current.x) * ringEase;
      ringTargetRef.current.y += (targetRef.current.y - ringTargetRef.current.y) * ringEase;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
      }
      
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
      }
      
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(${ringTargetRef.current.x}px, ${ringTargetRef.current.y}px)`;
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      
      hoverableElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  if (!isVisible) return null;

  const getGlowScale = () => {
    switch (cursorState) {
      case 'hover':
        return isHovering ? 1.5 : 1;
      case 'text':
        return 0.6;
      default:
        return 1;
    }
  };

  const getRingOpacity = () => {
    switch (cursorState) {
      case 'hover':
        return isHovering ? 1 : 0;
      default:
        return 0;
    }
  };

  const getRingScale = () => {
    return cursorState === 'hover' && isHovering ? 1 : 0;
  };

  return (
    <>
      {/* 核心点 */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: '#c084fc',
          borderRadius: '50%',
          marginLeft: '-4px',
          marginTop: '-4px',
          transition: 'transform 0.05s linear',
        }}
      />
      
      {/* 光晕 */}
      <div
        ref={cursorGlowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: '40px',
          height: '40px',
          background: 'radial-gradient(circle, rgba(192, 132, 252, 0.4) 0%, rgba(192, 132, 252, 0.15) 40%, rgba(192, 132, 252, 0) 70%)',
          borderRadius: '50%',
          marginLeft: '-20px',
          marginTop: '-20px',
          transition: 'transform 0.15s ease-out, width 0.3s ease, height 0.3s ease',
          transform: `scale(${getGlowScale()})`,
          opacity: cursorState === 'hidden' ? 0 : 1,
        }}
      />
      
      {/* 外环 */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          width: '56px',
          height: '56px',
          border: '1.5px solid rgba(192, 132, 252, 0.45)',
          borderRadius: '50%',
          marginLeft: '-28px',
          marginTop: '-28px',
          transition: 'transform 0.2s ease-out, opacity 0.2s ease, width 0.3s ease, height 0.3s ease',
          transform: `scale(${getRingScale()})`,
          opacity: getRingOpacity(),
          boxShadow: cursorState === 'hover' && isHovering ? '0 0 20px rgba(192, 132, 252, 0.3)' : 'none',
        }}
      />
    </>
  );
};

export default CustomCursor;

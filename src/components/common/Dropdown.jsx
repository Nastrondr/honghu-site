import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ 
  trigger, 
  items, 
  align = 'left',
  onOpenChange,
  isHomePage = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleMouseEnter = () => {
    if (isMobile) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
    onOpenChange?.(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      onOpenChange?.(false);
    }, 100);
  };

  const handleClick = () => {
    if (!isMobile) return;
    setIsOpen(!isOpen);
    onOpenChange?.(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [onOpenChange]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      onOpenChange?.(false);
    }
  };

  const getAlignClass = () => {
    switch (align) {
      case 'right':
        return 'right-0';
      case 'center':
        return 'left-1/2 -translate-x-1/2';
      default:
        return 'left-0';
    }
  };

  const dropdownBgClass = isHomePage 
    ? 'bg-black/60 backdrop-blur-md border border-white/10 shadow-lg shadow-black/30' 
    : 'glass-dropdown';
  
  const textClass = isHomePage
    ? 'text-pink-100 hover:text-white hover:bg-white/10'
    : 'text-neutral-600 hover:text-primary hover:bg-primary/5';
  
  const headerTextClass = isHomePage
    ? 'text-pink-200/60'
    : 'text-neutral-400';
  
  const dividerClass = isHomePage
    ? 'border-white/10'
    : 'border-neutral-200/50';

  return (
    <div 
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <div onClick={handleClick} className="cursor-pointer">
        {trigger}
      </div>

      <div
        className={`absolute top-full ${getAlignClass()} pt-2 z-50`}
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen 
            ? 'translateY(0) scale(1)' 
            : 'translateY(10px) scale(0.98)',
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div 
          className={`rounded-xl p-2 ${dropdownBgClass}`}
          style={{
            minWidth: '200px',
          }}
        >
          {items.map((item, index) => (
            <div key={index}>
              {item.type === 'divider' ? (
                <div className={`my-2 border-t ${dividerClass}`} />
              ) : item.type === 'header' ? (
                <div className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider ${headerTextClass}`}>
                  {item.label}
                </div>
              ) : item.children ? (
                <Dropdown 
                  trigger={
                    <div className={`dropdown-item rounded-lg ${textClass} ${isHomePage ? 'home' : ''}`}>
                      {item.icon && <span className="dropdown-icon">{item.icon}</span>}
                      <span>{item.label}</span>
                      <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  }
                  items={item.children}
                  align="right"
                  isHomePage={isHomePage}
                />
              ) : (
                <Link
                  to={item.path || '#'}
                  className={`dropdown-item rounded-lg ${textClass} ${isHomePage ? 'home' : ''}`}
                  onClick={() => {
                    setIsOpen(false);
                    onOpenChange?.(false);
                  }}
                >
                  {item.icon && <span className="dropdown-icon">{item.icon}</span>}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`ml-auto px-2 py-0.5 text-xs rounded-full ${isHomePage ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

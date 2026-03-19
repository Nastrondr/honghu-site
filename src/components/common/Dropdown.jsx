import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ 
  trigger, 
  items, 
  align = 'left',
  onOpenChange 
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
          className="glass-dropdown"
          style={{
            minWidth: '200px',
          }}
        >
          {items.map((item, index) => (
            <div key={index}>
              {item.type === 'divider' ? (
                <div className="my-2 border-t border-neutral-200/50" />
              ) : item.type === 'header' ? (
                <div className="px-4 py-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  {item.label}
                </div>
              ) : item.children ? (
                <Dropdown 
                  trigger={
                    <div className="dropdown-item">
                      {item.icon && <span className="dropdown-icon">{item.icon}</span>}
                      <span>{item.label}</span>
                      <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  }
                  items={item.children}
                  align="right"
                />
              ) : (
                <Link
                  to={item.path || '#'}
                  className="dropdown-item"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenChange?.(false);
                  }}
                >
                  {item.icon && <span className="dropdown-icon">{item.icon}</span>}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
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

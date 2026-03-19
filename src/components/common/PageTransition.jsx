import React, { useEffect, useState } from 'react';

const PageTransition = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(false);
    };
  }, []);

  return (
    <div 
      className={`page-transition-wrapper ${isVisible ? 'page-enter' : ''}`}
      style={{ 
        minHeight: '100%',
        transformOrigin: 'center center'
      }}
    >
      {children}
    </div>
  );
};

export default PageTransition;

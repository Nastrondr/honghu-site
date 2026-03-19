import React from 'react';

const SecondaryButton = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/10 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
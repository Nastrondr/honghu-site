import React from 'react';

const PrimaryButton = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
import React from 'react';

const SectionTitle = ({ children, className = '', ...props }) => {
  return (
    <h2 className={`text-2xl font-bold text-neutral-800 mb-6 ${className}`} {...props}>
      {children}
    </h2>
  );
};

export default SectionTitle;
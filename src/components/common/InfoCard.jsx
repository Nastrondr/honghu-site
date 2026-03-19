import React from 'react';

const InfoCard = ({ title, children, className = '', ...props }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${className}`} {...props}>
      {title && <h3 className="text-xl font-semibold text-neutral-800 mb-4">{title}</h3>}
      {children}
    </div>
  );
};

export default InfoCard;
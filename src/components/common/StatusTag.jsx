import React from 'react';
import { STATUS_CONFIG, STATUS_COLORS } from '../data/statusConfig';

const StatusTag = ({ status, className = '', size = 'md', ...props }) => {
  const config = STATUS_CONFIG[status] || { color: 'gray', hasDot: false, label: status };
  const colors = STATUS_COLORS[config.color];

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1 text-sm',
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <span 
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${colors.bg} ${colors.text} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {config.hasDot && (
        <span className={`relative ${dotSizes[size]} flex-shrink-0`}>
          <span className={`absolute inset-0 rounded-full ${colors.dot} z-10`}></span>
          <span className={`absolute inset-0 rounded-full ${colors.dot} status-dot-pulse`} style={{ background: colors.ring }}></span>
        </span>
      )}
      <span>{config.label}</span>
    </span>
  );
};

export default StatusTag;

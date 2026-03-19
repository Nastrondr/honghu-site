import React from 'react';

const StatusTag = ({ status, className = '', ...props }) => {
  const getStatusClass = () => {
    switch (status) {
      case '进行中':
        return 'bg-green-100 text-green-700';
      case '已结束':
        return 'bg-gray-100 text-gray-700';
      case '即将开始':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  return (
    <span className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusClass()} ${className}`} {...props}>
      {status}
    </span>
  );
};

export default StatusTag;
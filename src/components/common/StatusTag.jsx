import React from 'react';

const StatusTag = ({ status, className = '', ...props }) => {
  const getStatusContent = () => {
    switch (status) {
      case '进行中':
        return (
          <span className="inline-flex items-center gap-1.5">
            <span className="relative w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-green-500"></span>
              <span className="absolute inset-0 rounded-full bg-green-500 status-dot-pulse"></span>
            </span>
            <span>进行中</span>
          </span>
        );
      case '已结束':
        return (
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
            <span>已结束</span>
          </span>
        );
      case '即将开始':
        return (
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>即将开始</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-neutral-400"></span>
            <span>{status}</span>
          </span>
        );
    }
  };

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
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass()} ${className}`} {...props}>
      {getStatusContent()}
    </span>
  );
};

export default StatusTag;

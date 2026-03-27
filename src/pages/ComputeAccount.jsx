import React from 'react';
import { Server } from 'lucide-react';
import ComingSoon from '../components/common/ComingSoon';

const ComputeAccount = () => {
  return (
    <ComingSoon
      title="个人算力账户"
      subtitle="专属GPU/CPU算力资源，按需分配弹性调度"
      description="为每位参赛者分配独立算力账户，支持多种算力类型，让创意不受资源限制"
      backLink="/eco-products"
      backText="返回生态产品"
      icon={Server}
    />
  );
};

export default ComputeAccount;

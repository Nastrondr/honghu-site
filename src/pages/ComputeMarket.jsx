import React from 'react';
import { TrendingUp } from 'lucide-react';
import ComingSoon from '../components/common/ComingSoon';

const ComputeMarket = () => {
  return (
    <ComingSoon
      title="算力交易市场"
      subtitle="模拟真实算力交易，实现资源优化配置"
      description="参赛者可交易闲置算力，激发创意变现，构建活跃的算力生态"
      backLink="/eco-products"
      backText="返回生态产品"
      icon={TrendingUp}
    />
  );
};

export default ComputeMarket;

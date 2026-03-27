import React from 'react';
import { BookOpen } from 'lucide-react';
import ComingSoon from '../components/common/ComingSoon';

const Academy = () => {
  return (
    <ComingSoon
      title="鸿鹄学堂"
      subtitle="6000+门AI课程，从基础到实战"
      description="系统化学习路径，免费向选手开放，助力技能快速提升"
      backLink="/eco-products"
      backText="返回生态产品"
      icon={BookOpen}
    />
  );
};

export default Academy;

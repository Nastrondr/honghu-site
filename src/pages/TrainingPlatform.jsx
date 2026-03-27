import React from 'react';
import { Code2 } from 'lucide-react';
import ComingSoon from '../components/common/ComingSoon';

const TrainingPlatform = () => {
  return (
    <ComingSoon
      title="鸿鹄实训平台"
      subtitle="集成全流程开发工具，低代码快速实现AI应用"
      description="从数据处理到模型部署，一站式完成项目开发，降低AI开发门槛"
      backLink="/eco-products"
      backText="返回生态产品"
      icon={Code2}
    />
  );
};

export default TrainingPlatform;

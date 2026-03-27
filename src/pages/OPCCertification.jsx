import React from 'react';
import { BadgeCheck } from 'lucide-react';
import ComingSoon from '../components/common/ComingSoon';

const OPCCertification = () => {
  return (
    <ComingSoon
      title="OPC能力认证"
      subtitle="中国移动认证的技能证书，提升就业竞争力"
      description="官方认证背书，为职业发展增添有力凭证，开启AI职业新篇章"
      backLink="/eco-products"
      backText="返回生态产品"
      icon={BadgeCheck}
    />
  );
};

export default OPCCertification;

import React, { useState } from 'react';
import { universities, companies } from './partnersData';

const LogoCard = ({ name, color = 'neutral' }) => {
  const colorMap = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    green: { bg: 'bg-green-50', text: 'text-green-600', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
    neutral: { bg: 'bg-neutral-50', text: 'text-neutral-600', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' }
  };
  const c = colorMap[color] || colorMap.neutral;

  return (
    <div className="aspect-square bg-white rounded-lg border border-neutral-100 p-2 flex flex-col items-center justify-center gap-1">
      <div className={`w-10 h-10 ${c.bg} rounded-md flex items-center justify-center`}>
        <svg className={`w-5 h-5 ${c.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={c.icon} />
        </svg>
      </div>
      <span className="text-[9px] text-neutral-600 text-center leading-tight truncate w-full px-1">{name}</span>
    </div>
  );
};

const SectionCard = ({ title, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-neutral-200">
      <button
        type="button"
        className="w-full flex items-center justify-between py-2.5 px-4 text-left bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-medium text-neutral-800">{title}</span>
        <svg
          className={`w-4 h-4 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="px-4 pb-3 bg-white">{children}</div>}
    </div>
  );
};

const PartnersMobile = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero 区压缩 */}
      <section className="py-4 px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-neutral-800 mb-1">合作单位</h1>
          <p className="text-xs text-neutral-500">联合多方资源，共建人工智能创新生态</p>
        </div>
      </section>

      {/* CTA 功能入口前置 */}
      <section className="px-4 mb-3">
        <div className="bg-gradient-to-r from-[#7463EC] to-[#4338ca] rounded-lg p-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white mb-0.5">加入我们</h2>
              <p className="text-xs text-white/70">企业、高校与机构合作</p>
            </div>
            <button className="bg-white text-[#7463EC] px-3 py-1.5 rounded-md text-xs font-medium">
              联系我们
            </button>
          </div>
        </div>
      </section>

      {/* 主办单位 - 3列紧凑网格 */}
      <section className="px-4 mb-2">
        <h2 className="text-sm font-semibold text-neutral-800 mb-2">主办单位</h2>
        <div className="grid grid-cols-3 gap-2.5">
          <LogoCard name="工信部国际经济技术合作中心" color="blue" />
          <LogoCard name="中科北龙" color="purple" />
          <LogoCard name="中国移动" color="green" />
        </div>
      </section>

      {/* 产业合作伙伴 - 3列网格 */}
      <SectionCard title="产业合作伙伴" defaultOpen={true}>
        <div className="grid grid-cols-3 gap-2 pt-2">
          {companies.slice(0, 15).map((company, index) => (
            <LogoCard key={index} name={company.name} />
          ))}
        </div>
      </SectionCard>

      {/* 教育合作伙伴 - 3列网格 */}
      <SectionCard title="教育合作伙伴" defaultOpen={false}>
        <div className="grid grid-cols-3 gap-2 pt-2">
          {universities.slice(0, 15).map((university, index) => (
            <LogoCard key={index} name={university.name} />
          ))}
        </div>
      </SectionCard>

      {/* 合作说明 - 紧凑型 */}
      <section className="px-4 py-3">
        <div className="bg-neutral-50 rounded-lg p-3.5">
          <h3 className="text-xs font-medium text-neutral-800 mb-1.5">合作说明</h3>
          <p className="text-[10px] text-neutral-500 leading-relaxed">
            梧桐·鸿鹄人工智能应用创新大赛致力于整合多方资源，构建产学研协同创新生态，推动AI技术应用落地，培养优秀AI人才。
          </p>
        </div>
      </section>

      {/* 底部留白 */}
      <div className="h-6"></div>
    </div>
  );
};

export default PartnersMobile;

import React, { useState } from 'react';
import { universities, companies } from './partnersData';

const SectionCard = ({ title, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-neutral-200">
      <button
        type="button"
        className="w-full flex items-center justify-between py-3 px-4 text-left bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-neutral-800">{title}</span>
        <svg
          className={`w-5 h-5 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="px-4 pb-4 bg-white">{children}</div>}
    </div>
  );
};

const PartnersMobile = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero 区压缩 */}
      <section className="py-6 px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-neutral-800 mb-1">合作单位</h1>
          <p className="text-xs text-neutral-500">联合多方资源，共建人工智能创新生态</p>
        </div>
      </section>

      {/* CTA 功能入口前置 */}
      <section className="px-4 mb-4">
        <div className="bg-gradient-to-r from-[#7463EC] to-[#4338ca] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white mb-0.5">加入我们</h2>
              <p className="text-xs text-white/70">企业、高校与机构合作</p>
            </div>
            <button className="bg-white text-[#7463EC] px-4 py-2 rounded-md text-xs font-medium">
              联系我们
            </button>
          </div>
        </div>
      </section>

      {/* 主办单位 - 默认展开，使用紧凑卡片 */}
      <section className="px-4">
        <h2 className="text-sm font-semibold text-neutral-800 mb-3">主办单位</h2>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white rounded-lg p-3 shadow-sm border border-neutral-100">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-blue-50 rounded-md flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-xs font-medium text-neutral-800 truncate">工信部国际</span>
            </div>
            <p className="text-[10px] text-neutral-500 line-clamp-1">推动国际经济技术合作</p>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-sm border border-neutral-100">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-purple-50 rounded-md flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-neutral-800 truncate">中科北龙</span>
            </div>
            <p className="text-[10px] text-neutral-500 line-clamp-1">AI技术研发创新</p>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-sm border border-neutral-100">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-green-50 rounded-md flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-neutral-800 truncate">中国移动</span>
            </div>
            <p className="text-[10px] text-neutral-500 line-clamp-1">全球领先通信运营商</p>
          </div>
        </div>
      </section>

      {/* 合作伙伴 - 折叠式 */}
      <SectionCard title="产业合作伙伴" defaultOpen={true}>
        <div className="grid grid-cols-4 gap-2 pt-2">
          {companies.slice(0, 12).map((company, index) => (
            <div key={index} className="bg-neutral-50 rounded p-2 text-center">
              <span className="text-[10px] text-neutral-600">{company.name}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* 教育合作伙伴 - 折叠式 */}
      <SectionCard title="教育合作伙伴" defaultOpen={false}>
        <div className="grid grid-cols-4 gap-2 pt-2">
          {universities.slice(0, 12).map((university, index) => (
            <div key={index} className="bg-neutral-50 rounded p-2 text-center">
              <span className="text-[10px] text-neutral-600">{university.name}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* 合作说明 - 紧凑型 */}
      <section className="px-4 py-4">
        <div className="bg-neutral-50 rounded-lg p-4">
          <h3 className="text-xs font-medium text-neutral-800 mb-2">合作说明</h3>
          <p className="text-[10px] text-neutral-500 leading-relaxed">
            梧桐·鸿鹄人工智能应用创新大赛致力于整合多方资源，构建产学研协同创新生态，推动AI技术应用落地，培养优秀AI人才。
          </p>
        </div>
      </section>

      {/* 底部留白 */}
      <div className="h-8"></div>
    </div>
  );
};

export default PartnersMobile;

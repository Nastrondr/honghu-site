import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { universities, companies } from './partnersData';

const PartnersMobile = () => {
  const [expandedSection, setExpandedSection] = useState('main');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen">
      {/* 页面头部 - 压缩 */}
      <section className="py-6 px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-neutral-800">合作单位</h1>
          <p className="text-xs text-neutral-600 mt-1">联合多方资源，共建创新生态</p>
        </div>
      </section>

      {/* 主办单位 - 3列网格小卡片 */}
      <section className="px-4 pb-4">
        <h2 className="text-sm font-semibold text-neutral-500 mb-3">主办单位</h2>
        <div className="grid grid-cols-3 gap-3">
          {/* 工信部 */}
          <div className="bg-white rounded-xl p-3 shadow-sm flex flex-col items-center">
            <div className="w-14 h-14 aspect-square rounded-lg bg-blue-50 flex items-center justify-center mb-2">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-xs font-medium text-neutral-800 text-center leading-tight">工信部国际经济技术合作中心</span>
          </div>

          {/* 中科北龙 */}
          <div className="bg-white rounded-xl p-3 shadow-sm flex flex-col items-center">
            <div className="w-14 h-14 aspect-square rounded-lg bg-purple-50 flex items-center justify-center mb-2">
              <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-neutral-800 text-center leading-tight">中科北龙</span>
          </div>

          {/* 中国移动 */}
          <div className="bg-white rounded-xl p-3 shadow-sm flex flex-col items-center">
            <div className="w-14 h-14 aspect-square rounded-lg bg-green-50 flex items-center justify-center mb-2">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-neutral-800 text-center leading-tight">中国移动</span>
          </div>
        </div>
      </section>

      {/* 产业合作单位 - 折叠区块 */}
      <section className="px-4 pb-4">
        <button 
          onClick={() => toggleSection('industry')}
          className="w-full flex items-center justify-between py-2"
        >
          <h2 className="text-sm font-semibold text-neutral-500">产业合作单位</h2>
          <svg className={`w-4 h-4 text-neutral-400 transition-transform ${expandedSection === 'industry' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {expandedSection === 'industry' && (
          <div className="grid grid-cols-3 gap-2 pt-2">
            {companies.slice(0, 15).map((company, index) => (
              <div key={index} className="bg-white rounded-lg p-2 shadow-sm flex flex-col items-center">
                <div className="w-12 h-12 aspect-square rounded bg-neutral-50 flex items-center justify-center mb-1">
                  <span className="text-[10px] text-neutral-500 text-center leading-tight">{company.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 教育合作单位 - 折叠区块 */}
      <section className="px-4 pb-4">
        <button 
          onClick={() => toggleSection('education')}
          className="w-full flex items-center justify-between py-2"
        >
          <h2 className="text-sm font-semibold text-neutral-500">教育合作单位</h2>
          <svg className={`w-4 h-4 text-neutral-400 transition-transform ${expandedSection === 'education' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {expandedSection === 'education' && (
          <div className="grid grid-cols-3 gap-2 pt-2">
            {universities.slice(0, 18).map((university, index) => (
              <div key={index} className="bg-white rounded-lg p-2 shadow-sm flex flex-col items-center">
                <div className="w-12 h-12 aspect-square rounded bg-neutral-50 flex items-center justify-center mb-1">
                  <span className="text-[10px] text-neutral-500 text-center leading-tight">{university.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA - 功能性内容前置 */}
      <section className="px-4 pb-4">
        <div className="bg-gradient-to-r from-[#7463EC] to-[#4338ca] rounded-xl p-5 text-center">
          <h2 className="text-base font-bold text-white mb-1">合作咨询</h2>
          <p className="text-white/80 text-xs mb-3">欢迎企业、高校与机构加入鸿鹄生态合作</p>
          <div className="flex gap-2">
            <Link to="/contact" className="flex-1 bg-white text-[#7463EC] py-2 rounded-lg text-xs font-medium">
              联系我们
            </Link>
            <button className="flex-1 border border-white/40 text-white py-2 rounded-lg text-xs font-medium">
              申请合作
            </button>
          </div>
        </div>
      </section>

      {/* 合作说明 - 折叠区块 */}
      <section className="px-4 pb-8">
        <button 
          onClick={() => toggleSection('intro')}
          className="w-full flex items-center justify-between py-2"
        >
          <h2 className="text-sm font-semibold text-neutral-500">合作说明</h2>
          <svg className={`w-4 h-4 text-neutral-400 transition-transform ${expandedSection === 'intro' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {expandedSection === 'intro' && (
          <div className="bg-white rounded-xl p-4 shadow-sm mt-2">
            <p className="text-xs text-neutral-600 leading-relaxed">
              梧桐·鸿鹄人工智能应用创新大赛致力于整合多方资源，构建产学研协同创新生态。我们与行业领先的企业、高校和研究机构建立深度合作，为参赛团队提供全方位支持。
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default PartnersMobile;

import React from 'react';
import { universities, companies } from './partnersData';

const PartnersMobile = () => {
  return (
    <div className="min-h-screen">
      {/* 页面头部 */}
      <section className="py-12 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-800 mb-2">合作单位</h1>
          <p className="text-sm text-neutral-600">联合多方资源，共建人工智能创新生态</p>
        </div>
      </section>

      {/* 主办单位 */}
      <section className="py-8 px-4">
        <h2 className="text-lg font-semibold text-neutral-800 mb-6 text-center">主办单位</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-800 mb-1">工信部国际经济技术合作中心</h3>
              <p className="text-xs text-neutral-500">推动国际经济技术合作</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-800 mb-1">中科北龙</h3>
              <p className="text-xs text-neutral-500">人工智能技术研发与创新</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-800 mb-1">中国移动</h3>
              <p className="text-xs text-neutral-500">全球领先的通信运营商</p>
            </div>
          </div>
        </div>
      </section>

      {/* 合作伙伴 - 移动端简化 */}
      <section className="py-8 px-4 bg-slate-50/50">
        <h2 className="text-lg font-semibold text-neutral-800 mb-6 text-center">合作伙伴</h2>
        
        {/* 产业合作单位 */}
        <div className="mb-8">
          <h3 className="text-base font-medium text-neutral-800 mb-4">产业合作单位</h3>
          <div className="grid grid-cols-3 gap-3">
            {companies.slice(0, 12).map((company, index) => (
              <div key={index} className="bg-white rounded-lg p-3 text-center shadow-sm">
                <span className="text-xs text-neutral-600">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* 教育合作单位 */}
        <div>
          <h3 className="text-base font-medium text-neutral-800 mb-4">教育合作单位</h3>
          <div className="grid grid-cols-3 gap-3">
            {universities.slice(0, 12).map((university, index) => (
              <div key={index} className="bg-white rounded-lg p-3 text-center shadow-sm">
                <span className="text-xs text-neutral-600">{university.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 合作说明 - 移动端简化 */}
      <section className="py-8 px-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4 text-center">合作说明</h2>
          <p className="text-sm text-neutral-600 mb-3">
            梧桐·鸿鹄人工智能应用创新大赛致力于整合多方资源，构建产学研协同创新生态。
          </p>
          <p className="text-sm text-neutral-600">
            推动人工智能技术在实际场景中的应用落地，培养优秀的AI人才。
          </p>
        </div>
      </section>

      {/* CTA - 移动端简化 */}
      <section className="py-8 px-4 pb-12">
        <div className="bg-gradient-to-r from-[#7463EC] to-[#4338ca] rounded-xl p-6 text-center">
          <h2 className="text-lg font-bold text-white mb-2">携手合作，共建创新生态</h2>
          <p className="text-white/80 text-sm mb-4">
            加入我们的合作伙伴网络
          </p>
          <button className="w-full bg-white text-[#7463EC] py-2.5 rounded-lg font-medium">
            联系我们
          </button>
        </div>
      </section>
    </div>
  );
};

export default PartnersMobile;

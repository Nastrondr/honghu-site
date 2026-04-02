import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// 折叠区块组件
const CollapsibleSection = ({ title, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-neutral-200">
      <button
        type="button"
        className="w-full flex items-center justify-between py-2.5 px-4 text-left bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-medium text-neutral-800">{title}</span>
        <svg className={`w-4 h-4 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="px-4 pb-3 bg-white">{children}</div>}
    </div>
  );
};

const LogoCard = ({ name }) => (
  <div className="aspect-square bg-white rounded-lg border border-neutral-100 p-1.5 flex flex-col items-center justify-center">
    <span className="text-[8px] text-neutral-600 text-center leading-tight">{name}</span>
  </div>
);

const HomeMobile = () => {
  return (
    <div className="min-h-screen">
      {/* Hero - 限制1屏以内 */}
      <section className="relative h-[85vh] max-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-white to-purple-50"></div>
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-primary/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 container mx-auto px-5 py-12 text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-3 leading-tight">
            梧桐·鸿鹄<br/>人工智能应用创新大赛
          </h1>
          <p className="text-sm text-neutral-600 mb-6 line-clamp-2 max-w-[280px] mx-auto">
            探索AI无限可能，开启创新之旅
          </p>
          <Link 
            to="/register-competition" 
            className="inline-block w-full max-w-[200px] bg-primary text-white py-2.5 rounded-lg font-medium text-sm"
          >
            立即报名
          </Link>
        </div>
      </section>

      {/* 核心亮点 - 横向scroll */}
      <section className="py-6">
        <h2 className="text-base font-bold text-neutral-800 mb-4 px-4">大赛亮点</h2>
        <div className="flex overflow-x-auto gap-3 px-4 pb-2 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
          {[
            { title: 'OPC定向孵化', desc: '实战赛题、创业辅导', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'bg-primary/10', text: 'text-primary' },
            { title: '算力赋能', desc: 'GPU/CPU资源支持', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'bg-secondary/10', text: 'text-secondary' },
            { title: '场景对接', desc: '真实场景、生态渠道', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z', color: 'bg-primary/10', text: 'text-primary' },
            { title: '资本闭环', desc: '投融资全周期服务', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1', color: 'bg-secondary/10', text: 'text-secondary' },
          ].map((item, i) => (
            <div key={i} className="flex-shrink-0 w-[75%] sm:w-[60%] bg-white rounded-xl p-4 shadow-sm border border-neutral-100">
              <div className={`w-9 h-9 ${item.color} rounded-lg flex items-center justify-center mb-2.5`}>
                <svg className={`w-5 h-5 ${item.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
              </div>
              <h3 className="font-medium text-neutral-800 text-sm mb-0.5 truncate">{item.title}</h3>
              <p className="text-[10px] text-neutral-500 line-clamp-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 五大赛道 - 横向scroll */}
      <section className="py-6 bg-neutral-50">
        <h2 className="text-base font-bold text-neutral-800 mb-4 px-4">专项赛道</h2>
        <div className="flex overflow-x-auto gap-3 px-4 pb-2 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
          {[
            { title: '数字金融', desc: '智能金融创新', color: 'from-violet-600/30 via-violet-900/50 to-slate-900/80' },
            { title: '数字教育', desc: '智慧教育未来', color: 'from-blue-600/30 via-blue-900/50 to-slate-900/80' },
            { title: '数字健康', desc: 'AI医疗健康', color: 'from-cyan-600/30 via-cyan-900/50 to-slate-900/80' },
            { title: '数字文旅', desc: '智慧文旅体验', color: 'from-indigo-600/30 via-indigo-900/50 to-slate-900/80' },
            { title: '数字法务', desc: '智能法律服务', color: 'from-purple-600/30 via-purple-900/50 to-slate-900/80' },
          ].map((track) => (
            <Link key={track.title} to="/competition-center" className="flex-shrink-0 w-[80%] sm:w-[55%] relative h-[120px] rounded-xl overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-t ${track.color}`}></div>
              <div className="absolute inset-0 flex flex-col justify-end p-3">
                <h3 className="font-semibold text-white text-sm">{track.title}</h3>
                <p className="text-[10px] text-white/70 line-clamp-1">{track.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 赛事中心 - 紧凑列表 */}
      <section className="py-6 px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-neutral-800">热门赛事</h2>
          <Link to="/competition-center" className="text-xs text-primary font-medium">查看全部 →</Link>
        </div>
        <div className="space-y-2">
          <Link to="/competition/1" className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm border border-neutral-100">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-neutral-800 truncate">2025年梧桐·鸿鹄人工智能应用创新大赛</h3>
              <p className="text-[10px] text-neutral-500 mt-0.5">2025.4-2026.3 · 武汉纺织大学</p>
            </div>
            <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[9px] rounded-full flex-shrink-0">进行中</span>
          </Link>
          <Link to="/competition/2" className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm border border-neutral-100">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-neutral-800 truncate">AI算法挑战赛</h3>
              <p className="text-[10px] text-neutral-500 mt-0.5">2025.3-2025.6 · 线上</p>
            </div>
            <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[9px] rounded-full flex-shrink-0">即将</span>
          </Link>
        </div>
      </section>

      {/* 新闻动态 - 紧凑列表 */}
      <section className="py-6 px-4 bg-neutral-50">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-neutral-800">最新动态</h2>
          <Link to="/news" className="text-xs text-primary font-medium">更多 →</Link>
        </div>
        <div className="space-y-2">
          <Link to="/news/1" className="flex items-center gap-3 bg-white rounded-lg p-2.5 shadow-sm border border-neutral-100">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm text-neutral-800 truncate">大赛正式启动</h3>
              <p className="text-[9px] text-neutral-500 mt-0.5">2025年4月15日</p>
            </div>
          </Link>
          <Link to="/news/2" className="flex items-center gap-3 bg-white rounded-lg p-2.5 shadow-sm border border-neutral-100">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm text-neutral-800 truncate">大赛规则发布</h3>
              <p className="text-[9px] text-neutral-500 mt-0.5">2025年4月10日</p>
            </div>
          </Link>
        </div>
      </section>

      {/* 生态产品 - 横向scroll */}
      <section className="py-6">
        <div className="flex items-center justify-between mb-4 px-4">
          <h2 className="text-base font-bold text-neutral-800">生态产品</h2>
          <Link to="/eco-products" className="text-xs text-primary font-medium">查看 →</Link>
        </div>
        <div className="flex overflow-x-auto gap-3 px-4 pb-2 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
          {[
            { title: '鸿鹄实训平台', desc: '全流程开发工具', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'bg-primary/10', text: 'text-primary' },
            { title: '个人算力账户', desc: 'GPU/CPU资源', icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2m-2-4h.01M17 16h.01', color: 'bg-secondary/10', text: 'text-secondary' },
            { title: '鸿鹄学堂', desc: '6000+AI课程', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'bg-primary/10', text: 'text-primary' },
            { title: 'OPC认证', desc: '官方技能证书', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z', color: 'bg-secondary/10', text: 'text-secondary' },
          ].map((item, i) => (
            <Link key={i} to="/eco-products" className="flex-shrink-0 w-[70%] sm:w-[45%] bg-white rounded-xl p-3.5 shadow-sm border border-neutral-100">
              <div className={`w-9 h-9 ${item.color} rounded-lg flex items-center justify-center mb-2`}>
                <svg className={`w-5 h-5 ${item.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
              </div>
              <h3 className="font-medium text-neutral-800 text-sm truncate">{item.title}</h3>
              <p className="text-[10px] text-neutral-500">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 合作伙伴 - 折叠结构 */}
      <section className="py-6 px-4 bg-neutral-50">
        <h2 className="text-base font-bold text-neutral-800 mb-3">合作伙伴</h2>
        
        <CollapsibleSection title="主办单位" defaultOpen={true}>
          <div className="grid grid-cols-3 gap-2 pt-2">
            <LogoCard name="中国移动" />
            <LogoCard name="工信部国际" />
            <LogoCard name="中科北龙" />
          </div>
        </CollapsibleSection>
        
        <CollapsibleSection title="产业合作伙伴" defaultOpen={false}>
          <div className="grid grid-cols-4 gap-1.5 pt-2">
            {[1,2,3,4,5,6,7,8].map(i => <LogoCard key={i} name={`企业${i}`} />)}
          </div>
        </CollapsibleSection>
        
        <CollapsibleSection title="教育合作伙伴" defaultOpen={false}>
          <div className="grid grid-cols-4 gap-1.5 pt-2">
            {[1,2,3,4,5,6,7,8].map(i => <LogoCard key={i} name={`高校${i}`} />)}
          </div>
        </CollapsibleSection>
      </section>

      {/* CTA */}
      <section className="py-8 px-4">
        <div className="bg-gradient-to-r from-primary to-[#4338ca] rounded-xl p-5 text-center">
          <h2 className="text-base font-bold text-white mb-1.5">立即加入 AI 创新实践</h2>
          <p className="text-xs text-white/70 mb-4">展示才华，开启精彩旅程</p>
          <Link to="/register-competition" className="inline-block w-full bg-white text-primary py-2 rounded-lg text-sm font-medium">
            立即报名
          </Link>
        </div>
      </section>

      <div className="h-6"></div>
    </div>
  );
};

export default HomeMobile;

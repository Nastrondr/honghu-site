import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ScrollSection = ({ children, className = '' }) => (
  <div className={`overflow-x-auto scrollbar-hide -mx-4 px-4 ${className}`}>
    <div className="flex gap-3" style={{ width: 'max-content' }}>
      {children}
    </div>
  </div>
);

const Card80 = ({ children, className = '' }) => (
  <div className={`w-[80vw] flex-shrink-0 ${className}`}>
    {children}
  </div>
);

const Card85 = ({ children, className = '' }) => (
  <div className={`w-[85vw] flex-shrink-0 ${className}`}>
    {children}
  </div>
);

const HomeMobile = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero - 限制高度1屏以内 */}
      <section className="relative h-[85vh] max-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-white to-purple-50"></div>
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-primary/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 container mx-auto px-5 py-8 text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-3 leading-tight">
            梧桐·鸿鹄<br/>人工智能应用创新大赛
          </h1>
          <p className="text-sm text-neutral-600 mb-5 line-clamp-2">
            探索AI无限可能，开启创新之旅
          </p>
          <div className="flex flex-col gap-2.5 max-w-[200px] mx-auto">
            <Link 
              to="/register-competition" 
              className="w-full bg-primary text-white py-2.5 rounded-lg font-medium text-sm text-center"
            >
              立即报名
            </Link>
          </div>
        </div>
      </section>

      {/* 2. 核心亮点 - 横向滑动 */}
      <section className="py-5 px-0">
        <h2 className="text-base font-bold text-neutral-800 mb-4 px-4">大赛亮点</h2>
        <ScrollSection>
          <Card80>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 h-full">
              <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-800 text-sm mb-1">OPC定向孵化</h3>
              <p className="text-xs text-neutral-500 line-clamp-2">实战赛题、创业辅导、算力支持</p>
            </div>
          </Card80>
          <Card80>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 h-full">
              <div className="w-9 h-9 bg-secondary/10 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-800 text-sm mb-1">个人算力全程赋能</h3>
              <p className="text-xs text-neutral-500 line-clamp-2">GPU/CPU资源支持</p>
            </div>
          </Card80>
          <Card80>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 h-full">
              <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-800 text-sm mb-1">场景与市场对接</h3>
              <p className="text-xs text-neutral-500 line-clamp-2">真实场景，对接生态渠道</p>
            </div>
          </Card80>
          <Card80>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 h-full">
              <div className="w-9 h-9 bg-secondary/10 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-800 text-sm mb-1">资本闭环</h3>
              <p className="text-xs text-neutral-500 line-clamp-2">投早投小投长期</p>
            </div>
          </Card80>
        </ScrollSection>
      </section>

      {/* 3. 五大赛道 - 横向滑动 */}
      <section className="py-5 px-0">
        <h2 className="text-base font-bold text-neutral-800 mb-4 px-4">专项赛道</h2>
        <ScrollSection>
          <Card85>
            <div className="relative h-[140px] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 bg-violet-600/30"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3.5">
                <h3 className="font-semibold text-white text-sm">数字金融</h3>
                <p className="text-white/70 text-xs line-clamp-1">智能金融创新</p>
              </div>
            </div>
          </Card85>
          <Card85>
            <div className="relative h-[140px] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 bg-blue-600/30"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3.5">
                <h3 className="font-semibold text-white text-sm">数字教育</h3>
                <p className="text-white/70 text-xs line-clamp-1">智慧教育未来</p>
              </div>
            </div>
          </Card85>
          <Card85>
            <div className="relative h-[140px] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 bg-cyan-600/30"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3.5">
                <h3 className="font-semibold text-white text-sm">数字健康</h3>
                <p className="text-white/70 text-xs line-clamp-1">AI医疗健康</p>
              </div>
            </div>
          </Card85>
          <Card85>
            <div className="relative h-[140px] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 bg-indigo-600/30"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3.5">
                <h3 className="font-semibold text-white text-sm">数字文旅</h3>
                <p className="text-white/70 text-xs line-clamp-1">智慧文旅体验</p>
              </div>
            </div>
          </Card85>
          <Card85>
            <div className="relative h-[140px] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 bg-purple-600/30"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3.5">
                <h3 className="font-semibold text-white text-sm">数字法务</h3>
                <p className="text-white/70 text-xs line-clamp-1">智能法律服务</p>
              </div>
            </div>
          </Card85>
        </ScrollSection>
      </section>

      {/* 4. 赛事中心 - 紧凑卡片列表 */}
      <section className="py-5 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-neutral-800">热门赛事</h2>
          <Link to="/competition-center" className="text-xs text-primary font-medium">更多→</Link>
        </div>
        <div className="space-y-3">
          <Link to="/competition/1" className="block bg-white rounded-lg p-3 shadow-sm border border-neutral-100">
            <div className="flex justify-between items-start gap-2 mb-1.5">
              <h3 className="font-medium text-neutral-800 text-sm flex-1 line-clamp-1">2025年梧桐·鸿鹄人工智能应用创新大赛</h3>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] rounded-full flex-shrink-0">进行中</span>
            </div>
            <p className="text-xs text-neutral-500">2025.4-2026.3 · 武汉纺织大学</p>
          </Link>
          
          <Link to="/competition/2" className="block bg-white rounded-lg p-3 shadow-sm border border-neutral-100">
            <div className="flex justify-between items-start gap-2 mb-1.5">
              <h3 className="font-medium text-neutral-800 text-sm flex-1 line-clamp-1">2025年梧桐·鸿鹄AI算法挑战赛</h3>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] rounded-full flex-shrink-0">即将开始</span>
            </div>
            <p className="text-xs text-neutral-500">2025.3-2025.6 · 线上</p>
          </Link>
        </div>
      </section>

      {/* 5. 新闻动态 - 紧凑列表 */}
      <section className="py-5 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-neutral-800">新闻动态</h2>
          <Link to="/news" className="text-xs text-primary font-medium">更多→</Link>
        </div>
        <div className="space-y-2">
          <Link to="/news/1" className="flex items-center gap-3 py-2 border-b border-neutral-100">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-neutral-800 text-sm line-clamp-1">大赛正式启动</h3>
              <p className="text-xs text-neutral-500">2025年4月15日</p>
            </div>
          </Link>
          <Link to="/news/2" className="flex items-center gap-3 py-2 border-b border-neutral-100">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-neutral-800 text-sm line-clamp-1">大赛规则发布</h3>
              <p className="text-xs text-neutral-500">2025年4月10日</p>
            </div>
          </Link>
          <Link to="/news/3" className="flex items-center gap-3 py-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-neutral-800 text-sm line-clamp-1">专家评审团名单公布</h3>
              <p className="text-xs text-neutral-500">2025年4月5日</p>
            </div>
          </Link>
        </div>
      </section>

      {/* 6. 生态产品 - 横向滑动 */}
      <section className="py-5 px-0">
        <div className="flex items-center justify-between mb-4 px-4">
          <h2 className="text-base font-bold text-neutral-800">生态产品</h2>
          <Link to="/eco-products" className="text-xs text-primary font-medium">更多→</Link>
        </div>
        <ScrollSection>
          <Card80>
            <Link to="/eco-products" className="block bg-white rounded-xl p-4 shadow-sm border border-neutral-100">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-800 text-sm mb-1">鸿鹄实训平台</h3>
              <p className="text-xs text-neutral-500 line-clamp-2">全流程开发工具</p>
            </Link>
          </Card80>
          <Card80>
            <Link to="/eco-products" className="block bg-white rounded-xl p-4 shadow-sm border border-neutral-100">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-800 text-sm mb-1">个人算力账户</h3>
              <p className="text-xs text-neutral-500 line-clamp-2">GPU/CPU资源</p>
            </Link>
          </Card80>
          <Card80>
            <Link to="/eco-products" className="block bg-white rounded-xl p-4 shadow-sm border border-neutral-100">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-800 text-sm mb-1">OPC能力认证</h3>
              <p className="text-xs text-neutral-500 line-clamp-2">官方技能证书</p>
            </Link>
          </Card80>
        </ScrollSection>
      </section>

      {/* 7. 合作伙伴 - 紧凑展示 */}
      <section className="py-5 px-4">
        <h2 className="text-base font-bold text-neutral-800 mb-4">合作伙伴</h2>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-square bg-neutral-50 rounded-lg flex items-center justify-center">
              <span className="text-[10px] text-neutral-400">合作{i}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CTA - 紧凑 */}
      <section className="py-6 px-4">
        <div className="bg-gradient-to-br from-primary/10 to-purple-50 rounded-xl p-5 text-center">
          <h2 className="text-base font-bold text-neutral-800 mb-2">立即加入 AI 创新实践</h2>
          <p className="text-xs text-neutral-600 mb-4">展示才华，开启AI精彩旅程</p>
          <Link 
            to="/register-competition" 
            className="inline-block w-full bg-primary text-white py-2.5 rounded-lg font-medium text-sm"
          >
            立即报名
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomeMobile;

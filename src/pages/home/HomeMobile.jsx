import React from 'react';
import { Link } from 'react-router-dom';

const HomeMobile = () => {
  return (
    <div className="min-h-screen">
      {/* Hero 首屏 - 移动端简化版 */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* 背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-white to-purple-50"></div>
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4 leading-tight">
            梧桐·鸿鹄<br/>人工智能应用创新大赛
          </h1>
          <p className="text-base text-neutral-600 mb-8 max-w-sm mx-auto">
            探索AI无限可能，开启创新之旅
          </p>
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <Link 
              to="/register-competition" 
              className="w-full bg-primary text-white py-3 rounded-lg font-medium text-center"
            >
              立即报名
            </Link>
            <Link 
              to="/competition-center" 
              className="w-full border border-primary text-primary py-3 rounded-lg font-medium text-center"
            >
              查看赛事
            </Link>
          </div>
        </div>
      </section>

      {/* 大赛核心亮点 - 移动端简化 */}
      <section className="py-12 px-4">
        <h2 className="text-xl font-bold text-neutral-800 mb-8 text-center">大赛亮点</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-800">OPC定向孵化</h3>
                <p className="text-xs text-neutral-600">实战赛题、创业辅导、算力支持</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-800">个人算力全程赋能</h3>
                <p className="text-xs text-neutral-600">GPU/CPU资源支持</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-800">场景与市场对接</h3>
                <p className="text-xs text-neutral-600">真实场景，对接生态渠道</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 五大专项赛道 - 移动端简化 */}
      <section className="py-12 px-4">
        <h2 className="text-xl font-bold text-neutral-800 mb-6 text-center">专项赛道</h2>
        <div className="space-y-3">
          {[
            { title: '数字金融', desc: '智能金融创新', color: 'bg-violet-100' },
            { title: '数字教育', desc: '智慧教育未来', color: 'bg-blue-100' },
            { title: '数字健康', desc: 'AI医疗健康', color: 'bg-cyan-100' },
            { title: '数字文旅', desc: '智慧文旅体验', color: 'bg-indigo-100' },
            { title: '数字法务', desc: '智能法律服务', color: 'bg-purple-100' },
          ].map((track) => (
            <Link 
              key={track.title}
              to="/competition-center"
              className={`block ${track.color} rounded-xl p-4 hover:opacity-80 transition-opacity`}
            >
              <h3 className="font-semibold text-neutral-800">{track.title}</h3>
              <p className="text-xs text-neutral-600">{track.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 赛事中心 - 移动端简化 */}
      <section className="py-12 px-4">
        <h2 className="text-xl font-bold text-neutral-800 mb-6 text-center">热门赛事</h2>
        <div className="space-y-4">
          <Link to="/competition/1" className="block bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-neutral-800 text-sm flex-1">2025年梧桐·鸿鹄人工智能应用创新大赛</h3>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">进行中</span>
            </div>
            <p className="text-xs text-neutral-500">2025.4-2026.3 · 武汉纺织大学</p>
          </Link>
          
          <Link to="/competition/2" className="block bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-neutral-800 text-sm flex-1">2025年梧桐·鸿鹄AI算法挑战赛</h3>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">即将开始</span>
            </div>
            <p className="text-xs text-neutral-500">2025.3-2025.6 · 线上</p>
          </Link>
        </div>
        
        <div className="mt-6 text-center">
          <Link to="/competition-center" className="text-primary text-sm font-medium">
            查看全部赛事 →
          </Link>
        </div>
      </section>

      {/* 新闻动态 - 移动端简化 */}
      <section className="py-12 px-4">
        <h2 className="text-xl font-bold text-neutral-800 mb-6 text-center">最新动态</h2>
        <div className="space-y-4">
          <Link to="/news/1" className="block bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-medium text-neutral-800 text-sm mb-1">大赛正式启动</h3>
            <p className="text-xs text-neutral-500">2025年4月15日</p>
          </Link>
          <Link to="/news/2" className="block bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-medium text-neutral-800 text-sm mb-1">大赛规则发布</h3>
            <p className="text-xs text-neutral-500">2025年4月10日</p>
          </Link>
        </div>
        
        <div className="mt-6 text-center">
          <Link to="/news" className="text-primary text-sm font-medium">
            查看更多新闻 →
          </Link>
        </div>
      </section>

      {/* 合作伙伴 - 移动端简化 */}
      <section className="py-12 px-4">
        <h2 className="text-xl font-bold text-neutral-800 mb-6 text-center">合作伙伴</h2>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg p-3 text-center">
              <p className="text-xs text-neutral-500">合作{i}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 生态产品 - 移动端简化 */}
      <section className="py-12 px-4">
        <h2 className="text-xl font-bold text-neutral-800 mb-6 text-center">生态产品</h2>
        <div className="space-y-4">
          <Link to="/eco-products" className="block bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-neutral-800">鸿鹄实训平台</h3>
              <p className="text-xs text-neutral-500">全流程开发工具</p>
            </div>
          </Link>
          
          <Link to="/eco-products" className="block bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-neutral-800">个人算力账户</h3>
              <p className="text-xs text-neutral-500">GPU/CPU资源支持</p>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA - 移动端简化 */}
      <section className="py-16 px-4">
        <div className="bg-gradient-to-br from-primary/10 to-purple-50 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-neutral-800 mb-3">立即加入 AI 创新实践</h2>
          <p className="text-sm text-neutral-600 mb-6">
            展示你的创新才华，开启AI精彩旅程
          </p>
          <div className="flex flex-col gap-3">
            <Link 
              to="/register-competition" 
              className="w-full bg-primary text-white py-3 rounded-lg font-medium text-center"
            >
              立即报名
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeMobile;

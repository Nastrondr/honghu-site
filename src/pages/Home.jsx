import React from 'react';
import { Link } from 'react-router-dom';
import HomeHero from '../components/common/HomeHero';

const Home = () => {
  return (
    <div className="min-h-screen animate-fadeIn">
      {/* Hero 首屏 */}
      <HomeHero />

      {/* 一、大赛核心亮点 */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-neutral-800 mb-16 text-center">大赛核心亮点</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 主卡 - 百万奖金 */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-8 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-neutral-800 mb-4">百万奖金池</h3>
                <p className="text-neutral-600 mb-6">
                  总奖金池超过100万元，设置金奖、银奖、铜奖及最佳创新奖等多个奖项，奖励优秀参赛项目和团队
                </p>
                <div className="flex items-center gap-2 text-sm text-primary font-medium">
                  了解详情
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* 次卡 - 顶级导师 */}
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-secondary/20 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-secondary to-orange-400 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-secondary/20">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-3">顶级导师</h3>
                <p className="text-neutral-600 text-sm">
                  汇聚行业专家和学术领袖，提供专业指导和评审，助力项目成长
                </p>
              </div>
            </div>
            
            {/* 次卡 - 产业对接 */}
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-400 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-primary/20">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-3">产业对接</h3>
                <p className="text-neutral-600 text-sm">
                  优秀项目有机会对接企业资源，实现商业化落地，开启创业之路
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 二、四大专项赛道 */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-neutral-800 mb-16 text-center">四大专项赛道</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card rounded-2xl p-8 group hover:-translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-all">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">数字金融</h3>
              <p className="text-neutral-600 text-sm">
                探索AI在金融风险控制、智能投顾、反欺诈等领域的创新应用
              </p>
            </div>
            
            <div className="glass-card rounded-2xl p-8 group hover:-translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-all">
                <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">智慧教育</h3>
              <p className="text-neutral-600 text-sm">
                开发AI驱动的智能教育工具，提升教学效率和学习体验
              </p>
            </div>
            
            <div className="glass-card rounded-2xl p-8 group hover:-translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-all">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">智能制造</h3>
              <p className="text-neutral-600 text-sm">
                利用AI技术优化生产流程，实现智能工厂和工业互联网创新
              </p>
            </div>
            
            <div className="glass-card rounded-2xl p-8 group hover:-translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-all">
                <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">智慧医疗</h3>
              <p className="text-neutral-600 text-sm">
                运用AI技术辅助诊断、药物研发和健康管理，提升医疗服务质量
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 三、赛事中心 */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4 text-center">赛事中心</h2>
          <p className="text-neutral-600 mb-12 text-center">当前开放赛事 · 实时更新</p>
          
          {/* 分段切换控件 */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative bg-white/50 backdrop-blur-[12px] rounded-full p-1 inline-flex">
              <Link 
                to="/competition-center" 
                className="relative z-10 px-6 py-2.5 text-sm font-medium transition-all duration-300 text-white"
              >
                赛事列表
              </Link>
              <Link 
                to="/competition-center?tab=info" 
                className="relative z-10 px-6 py-2.5 text-sm font-medium transition-all duration-300 text-neutral-600 hover:text-neutral-800"
              >
                关键信息
              </Link>
              {/* 滑动底板 */}
              <div 
                className="absolute top-1 left-1 bottom-1 rounded-full bg-gradient-to-r from-primary to-purple-500 shadow-md shadow-primary/20 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ width: 'calc(50% - 2px)' }}
              />
            </div>
            
            {/* 申请办赛CTA */}
            <div className="ml-4">
              <Link 
                to="/apply-competition" 
                className="text-sm text-primary/80 hover:text-primary font-medium flex items-center gap-1 transition-all hover:translate-x-1"
              >
                想举办赛事？
                <span className="flex items-center">
                  申请成为主办方
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          
          {/* 搜索栏 */}
          <div className="glass-card rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="搜索赛事名称、描述..."
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="flex gap-4">
                <select className="px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:border-primary focus:outline-none">
                  <option>全部赛道</option>
                  <option>数字金融</option>
                  <option>智慧教育</option>
                  <option>智能制造</option>
                  <option>智慧医疗</option>
                </select>
                <select className="px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:border-primary focus:outline-none">
                  <option>全部状态</option>
                  <option>进行中</option>
                  <option>即将开始</option>
                  <option>已结束</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* 赛事卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card rounded-2xl p-6 group hover:-translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-neutral-800">2025年梧桐·鸿鹄人工智能应用创新大赛</h3>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">进行中</span>
              </div>
              <div className="text-neutral-600 text-sm mb-4">
                <div className="flex items-center mb-2">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  2025.4-2026.3
                </div>
                <div className="flex items-center mb-4">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  武汉纺织大学
                </div>
                <p className="mb-4 line-clamp-2">
                  面向全国的人工智能应用创新大赛，鼓励选手开发具有实际应用价值的AI解决方案。
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">人工智能</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">创新应用</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">全国赛</span>
              </div>
              <Link to="/competition/1" className="block w-full py-2 text-center border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary/10 transition-all">
                查看详情
              </Link>
            </div>
            
            <div className="glass-card rounded-2xl p-6 group hover:-translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-neutral-800">2025年梧桐·鸿鹄AI算法挑战赛</h3>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">即将开始</span>
              </div>
              <div className="text-neutral-600 text-sm mb-4">
                <div className="flex items-center mb-2">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  2025.3-2025.6
                </div>
                <div className="flex items-center mb-4">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  线上
                </div>
                <p className="mb-4 line-clamp-2">
                  专注于AI算法优化的技术挑战赛，考验选手的算法设计和实现能力。
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">算法</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">AI</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">技术挑战</span>
              </div>
              <Link to="/competition/2" className="block w-full py-2 text-center border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary/10 transition-all">
                查看详情
              </Link>
            </div>
            
            <div className="glass-card rounded-2xl p-6 group hover:-translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-neutral-800">2025年梧桐·鸿鹄区县AI应用创新大赛</h3>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">进行中</span>
              </div>
              <div className="text-neutral-600 text-sm mb-4">
                <div className="flex items-center mb-2">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  2025.1-2025.4
                </div>
                <div className="flex items-center mb-4">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  线下
                </div>
                <p className="mb-4 line-clamp-2">
                  面向各区县的人工智能应用创新大赛，鼓励选手开发适合本地场景的AI解决方案。
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">人工智能</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">区县应用</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">地方赛</span>
              </div>
              <Link to="/competition/3" className="block w-full py-2 text-center border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary/10 transition-all">
                查看详情
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/competition-center" className="inline-flex items-center gap-2 text-primary font-medium hover:underline transition-colors">
              查看更多赛事
              <svg className="w-4 h-4 transition-transform hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 四、新闻动态 */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-neutral-800 mb-16 text-center">新闻动态</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* 大卡 */}
            <div className="md:col-span-2 glass-card rounded-2xl overflow-hidden group">
              <div className="relative overflow-hidden h-64">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-purple-500/30 opacity-80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">大赛启动</h3>
                    <p className="text-lg">2025年4月15日</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-800 mb-3">2025年梧桐·鸿鹄人工智能应用创新大赛正式启动</h3>
                <p className="text-neutral-600 text-sm mb-4">
                  本次大赛以"AI赋能未来"为主题，面向全国高校学生、科研机构和企业团队，旨在推动人工智能技术在各行业的应用落地...
                </p>
                <Link to="/news/1" className="text-sm text-primary font-medium hover:underline transition-colors">
                  阅读全文
                </Link>
              </div>
            </div>
            
            {/* 小卡 */}
            <div className="glass-card rounded-2xl overflow-hidden group">
              <div className="relative overflow-hidden h-32">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/30 to-orange-500/30 opacity-80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <p className="text-sm">2025年4月10日</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2 line-clamp-2">大赛规则发布</h3>
                <Link to="/news/2" className="text-xs text-primary font-medium hover:underline transition-colors">
                  阅读全文
                </Link>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl overflow-hidden group">
              <div className="relative overflow-hidden h-32">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-blue-500/30 opacity-80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <p className="text-sm">2025年4月5日</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2 line-clamp-2">专家评审团名单公布</h3>
                <Link to="/news/3" className="text-xs text-primary font-medium hover:underline transition-colors">
                  阅读全文
                </Link>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl overflow-hidden group">
              <div className="relative overflow-hidden h-32">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/30 to-purple-500/30 opacity-80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <p className="text-sm">2025年3月28日</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2 line-clamp-2">往届优秀项目展示</h3>
                <Link to="/news/4" className="text-xs text-primary font-medium hover:underline transition-colors">
                  阅读全文
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/news" className="inline-flex items-center gap-2 text-primary font-medium hover:underline transition-colors">
              查看更多新闻
              <svg className="w-4 h-4 transition-transform hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 五、合作伙伴 */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-neutral-800 mb-16 text-center">合作伙伴</h2>
          
          {/* 战略合作 */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold text-neutral-800 mb-8 text-center">战略合作</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="glass-card rounded-2xl p-6 flex items-center justify-center h-28 group hover:bg-white/80 transition-all duration-300">
                  <div className="text-center group-hover:text-primary transition-colors duration-300">
                    <p className="text-neutral-500 group-hover:text-primary font-medium">战略合作{i}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 支持单位 */}
          <div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-8 text-center">支持单位</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="glass-card rounded-xl p-4 flex items-center justify-center h-20 group hover:bg-white/80 transition-all duration-300">
                  <div className="text-center group-hover:text-primary transition-colors duration-300">
                    <p className="text-neutral-400 group-hover:text-primary text-sm">支持单位{i}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 六、生态产品 */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-neutral-800 mb-16 text-center">生态产品</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card rounded-2xl p-8 group hover:bg-white/80 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">鸿鹄实训平台</h3>
              <p className="text-neutral-600 text-sm">
                集成全流程开发工具，支持低代码快速实现AI应用，为参赛选手提供便捷的开发环境
              </p>
            </div>
            
            <div className="glass-card rounded-2xl p-8 group hover:bg-white/80 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">个人算力账户</h3>
              <p className="text-neutral-600 text-sm">
                为每位参赛者分配独立算力，支持GPU/CPU资源，满足模型训练和应用部署需求
              </p>
            </div>
            
            <div className="glass-card rounded-2xl p-8 group hover:bg-white/80 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">OPC能力认证</h3>
              <p className="text-neutral-600 text-sm">
                中国移动认证的OPC技能证书，提升就业竞争力，为职业发展添砖加瓦
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/eco-products" className="inline-flex items-center gap-2 text-primary font-medium hover:underline transition-colors">
              查看全部产品
              <svg className="w-4 h-4 transition-transform hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 页尾 CTA 模块 */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(116,99,236,0.08),transparent_50%)]"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">立即加入 AI 创新实践</h2>
            <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto">
              参与梧桐·鸿鹄人工智能应用创新大赛，展示你的创新才华，开启AI领域的精彩旅程
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                to="/register-competition" 
                className="bg-primary text-white px-10 py-4 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 text-lg"
              >
                立即报名
              </Link>
              <Link 
                to="/competition-center" 
                className="border border-primary text-primary px-10 py-4 rounded-lg font-medium hover:bg-primary/10 transition-all duration-300 text-lg"
              >
                查看赛事
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
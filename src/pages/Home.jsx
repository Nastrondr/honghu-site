import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeHero from '../components/common/HomeHero';
import ScrollReveal, { ScrollRevealStagger } from '../components/common/ScrollReveal';

const TrackCard = ({ track }) => {
  const [imageError, setImageError] = useState(false);

  const themeGradients = {
    violet: 'from-violet-600/20 via-violet-500/12 to-transparent',
    blue: 'from-blue-600/20 via-blue-500/12 to-transparent',
    cyan: 'from-cyan-600/20 via-cyan-500/12 to-transparent',
    indigo: 'from-indigo-600/20 via-indigo-500/12 to-transparent',
    purple: 'from-purple-600/20 via-purple-500/12 to-transparent'
  };

  const fallbackGradients = {
    violet: 'from-violet-600/30 via-violet-900/50 to-slate-900/80',
    blue: 'from-blue-600/30 via-blue-900/50 to-slate-900/80',
    cyan: 'from-cyan-600/30 via-cyan-900/50 to-slate-900/80',
    indigo: 'from-indigo-600/30 via-indigo-900/50 to-slate-900/80',
    purple: 'from-purple-600/30 via-purple-900/50 to-slate-900/80'
  };

  return (
    <div className="group relative h-48 md:h-64 rounded-xl md:rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 w-[85vw] md:w-auto">
      {!imageError && (
        <img
          src={track.imageUrl}
          alt={track.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={() => setImageError(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className={`absolute inset-0 bg-gradient-to-t ${imageError ? fallbackGradients[track.accentColor] : themeGradients[track.accentColor]} opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out`} />
      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
        <span className="text-[10px] md:text-xs text-white/50 mb-1 tracking-wide">
          {track.subtitle}
        </span>
        <h3 className="text-base md:text-xl font-semibold text-white mb-1 md:mb-2 drop-shadow-lg line-clamp-1">
          {track.title}
        </h3>
        <p className="text-[10px] md:text-sm text-white/85 leading-relaxed line-clamp-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
          {track.description}
        </p>
      </div>
    </div>
  );
};

const HighlightCard = ({ title, description, icon, gradientFrom, gradientTo }) => (
  <div className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6 relative overflow-hidden group hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 flex-shrink-0 w-[80vw] md:w-auto">
    <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-xl group-hover:scale-110 transition-all duration-500"></div>
    <div className="relative z-10">
      <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-primary to-purple-500 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-5 shadow-lg shadow-primary/20">
        {icon}
      </div>
      <h3 className="text-sm md:text-xl font-semibold text-neutral-800 mb-2 md:mb-3 line-clamp-1">{title}</h3>
      <p className="text-xs md:text-sm text-neutral-600 line-clamp-2">{description}</p>
    </div>
  </div>
);

const EcoCard = ({ title, description, icon, iconBg }) => (
  <div className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6 group hover:bg-white/80 transition-all duration-300 flex-shrink-0 w-[80vw] md:w-auto">
    <div className={`w-12 h-12 md:w-16 md:h-16 ${iconBg} rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-6`}>
      {icon}
    </div>
    <h3 className="text-sm md:text-xl font-semibold text-neutral-800 mb-2 md:mb-4 line-clamp-1">{title}</h3>
    <p className="text-xs md:text-sm text-neutral-600 line-clamp-2">{description}</p>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero 首屏 - 移动端限制1屏 */}
      <HomeHero />

      {/* 一、大赛核心亮点 - 横向scroll */}
      <section className="py-8 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <ScrollReveal type="title">
            <h2 className="text-xl md:text-3xl font-bold text-neutral-800 mb-6 md:mb-16 text-center">大赛核心亮点</h2>
          </ScrollReveal>
          {/* 移动端横向滚动 */}
          <div className="md:block">
            <div className="md:grid md:grid-cols-2 md:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 flex gap-3 md:space-y-0 pb-2 md:pb-0">
              <HighlightCard
                title="OPC定向孵化"
                description="通过实战赛题、创业辅导、算力支持、投融资对接"
                icon={<svg className="w-5 h-5 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
              />
              <HighlightCard
                title="个人算力全程赋能"
                description="为每位选手配备个人算力账户，引入算力额度及交易机制"
                icon={<svg className="w-5 h-5 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>}
              />
              <HighlightCard
                title="场景与市场对接"
                description="赛题源自数字金融、教育、健康等真实场景"
                icon={<svg className="w-5 h-5 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
              />
              <HighlightCard
                title="资本闭环"
                description="联合机构提供全周期资本服务"
                icon={<svg className="w-5 h-5 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 二、五大专项赛道 - 横向scroll */}
      <section className="py-8 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <ScrollReveal type="title">
            <h2 className="text-xl md:text-3xl font-bold text-neutral-800 mb-6 md:mb-16 text-center">五大专项赛道</h2>
          </ScrollReveal>
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 flex gap-3 pb-2">
            {[
              { title: '数字金融', subtitle: '智能金融创新', description: '探索AI在金融风险控制、智能投顾、反欺诈等领域的创新应用', accentColor: 'violet', imageUrl: '/assets/image/matchcategory card/finance.jpg' },
              { title: '数字教育', subtitle: '智慧教育未来', description: '开发AI驱动的智能教育工具，提升教学效率和学习体验', accentColor: 'blue', imageUrl: '/assets/image/matchcategory card/AI education technology.jpg' },
              { title: '数字健康', subtitle: 'AI医疗健康', description: '运用AI技术辅助诊断、药物研发和健康管理', accentColor: 'cyan', imageUrl: '/assets/image/matchcategory card/smart healthcare.jpg' },
              { title: '数字文旅', subtitle: '智慧文旅体验', description: '利用AI技术推动文化传播、旅游服务智能化', accentColor: 'indigo', imageUrl: '/assets/image/matchcategory card/digital culture immersive.jpg' },
              { title: '数字法务', subtitle: '智能法律服务', description: '运用AI技术提升法律服务效率，推动智能合规', accentColor: 'purple', imageUrl: '/assets/image/matchcategory card/legal tech interface.jpg' }
            ].map((track, index) => (
              <ScrollReveal key={track.title} delay={index * 0.08}>
                <TrackCard track={track} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 三、赛事中心 - 紧凑卡片 */}
      <section className="py-8 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <ScrollReveal type="title">
            <h2 className="text-xl md:text-3xl font-bold text-neutral-800 mb-3 md:mb-4 text-center">赛事中心</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-xs md:text-sm text-neutral-600 mb-6 md:mb-12 text-center">当前开放赛事 · 实时更新</p>
          </ScrollReveal>
          
          {/* 赛事卡片 - 移动端2列紧凑 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <Link to="/competition/1" className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6 group hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 flex flex-col h-full cursor-pointer">
              <div className="flex justify-between items-start gap-2 mb-3 md:mb-4">
                <h3 className="text-sm md:text-lg font-semibold text-neutral-800 flex-1 min-w-0 line-clamp-2">2025年梧桐·鸿鹄人工智能应用创新大赛</h3>
                <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-medium bg-green-100 text-green-700 flex-shrink-0">进行中</span>
              </div>
              <div className="text-neutral-600 text-[11px] md:text-sm mb-3 md:mb-4">
                <div className="flex items-center mb-1 md:mb-2">
                  <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span className="truncate">2025.4-2026.3</span>
                </div>
                <p className="line-clamp-2 text-[10px] md:text-xs">面向全国的人工智能应用创新大赛</p>
              </div>
              <div className="flex flex-wrap gap-1 md:gap-2 mt-auto">
                <span className="px-2 py-0.5 md:px-3 md:py-1 bg-primary/10 text-primary rounded-full text-[10px] md:text-xs">AI</span>
                <span className="px-2 py-0.5 md:px-3 md:py-1 bg-primary/10 text-primary rounded-full text-[10px] md:text-xs">创新</span>
              </div>
            </Link>
            
            <Link to="/competition/2" className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6 group hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 flex flex-col h-full cursor-pointer">
              <div className="flex justify-between items-start gap-2 mb-3 md:mb-4">
                <h3 className="text-sm md:text-lg font-semibold text-neutral-800 flex-1 min-w-0 line-clamp-2">2025年梧桐·鸿鹄AI算法挑战赛</h3>
                <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-medium bg-blue-100 text-blue-700 flex-shrink-0">即将开始</span>
              </div>
              <div className="text-neutral-600 text-[11px] md:text-sm mb-3 md:mb-4">
                <div className="flex items-center mb-1 md:mb-2">
                  <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span className="truncate">2025.3-2025.6</span>
                </div>
                <p className="line-clamp-2 text-[10px] md:text-xs">专注于AI算法优化的技术挑战赛</p>
              </div>
              <div className="flex flex-wrap gap-1 md:gap-2 mt-auto">
                <span className="px-2 py-0.5 md:px-3 md:py-1 bg-primary/10 text-primary rounded-full text-[10px] md:text-xs">算法</span>
                <span className="px-2 py-0.5 md:px-3 md:py-1 bg-primary/10 text-primary rounded-full text-[10px] md:text-xs">挑战</span>
              </div>
            </Link>
            
            <Link to="/competition/3" className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6 group hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 flex flex-col h-full cursor-pointer">
              <div className="flex justify-between items-start gap-2 mb-3 md:mb-4">
                <h3 className="text-sm md:text-lg font-semibold text-neutral-800 flex-1 min-w-0 line-clamp-2">2025年区县AI应用创新大赛</h3>
                <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-medium bg-green-100 text-green-700 flex-shrink-0">进行中</span>
              </div>
              <div className="text-neutral-600 text-[11px] md:text-sm mb-3 md:mb-4">
                <div className="flex items-center mb-1 md:mb-2">
                  <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span className="truncate">2025.1-2025.4</span>
                </div>
                <p className="line-clamp-2 text-[10px] md:text-xs">面向各区县的人工智能应用创新大赛</p>
              </div>
              <div className="flex flex-wrap gap-1 md:gap-2 mt-auto">
                <span className="px-2 py-0.5 md:px-3 md:py-1 bg-primary/10 text-primary rounded-full text-[10px] md:text-xs">区县</span>
                <span className="px-2 py-0.5 md:px-3 md:py-1 bg-primary/10 text-primary rounded-full text-[10px] md:text-xs">应用</span>
              </div>
            </Link>
          </div>
          
          <div className="text-center mt-6 md:mt-12">
            <Link to="/competition-center" className="inline-flex items-center gap-1 md:gap-2 text-primary text-xs md:text-sm font-medium hover:underline transition-colors">
              查看更多赛事
              <svg className="w-3 h-3 md:w-4 md:h-4 transition-transform hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 四、新闻动态 - 紧凑列表 */}
      <section className="py-8 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-xl md:text-3xl font-bold text-neutral-800 mb-6 md:mb-16 text-center">新闻动态</h2>
          
          {/* 移动端列表布局 */}
          <div className="space-y-3 md:hidden">
            <Link to="/news/1" className="flex gap-3 p-3 bg-white rounded-xl shadow-sm border border-neutral-100">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg flex-shrink-0 flex items-center justify-center">
                <span className="text-[10px] text-primary font-medium">大赛</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-neutral-800 line-clamp-1">大赛正式启动</h3>
                <p className="text-[10px] text-neutral-500 mt-0.5">2025.4.15</p>
              </div>
            </Link>
            <Link to="/news/2" className="flex gap-3 p-3 bg-white rounded-xl shadow-sm border border-neutral-100">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-orange-500/20 rounded-lg flex-shrink-0 flex items-center justify-center">
                <span className="text-[10px] text-secondary font-medium">规则</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-neutral-800 line-clamp-1">大赛规则发布</h3>
                <p className="text-[10px] text-neutral-500 mt-0.5">2025.4.10</p>
              </div>
            </Link>
            <Link to="/news/3" className="flex gap-3 p-3 bg-white rounded-xl shadow-sm border border-neutral-100">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-lg flex-shrink-0 flex items-center justify-center">
                <span className="text-[10px] text-blue-600 font-medium">评审</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-neutral-800 line-clamp-1">专家评审团名单公布</h3>
                <p className="text-[10px] text-neutral-500 mt-0.5">2025.4.5</p>
              </div>
            </Link>
          </div>

          {/* 桌面端卡片布局 */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-8">
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
                <p className="text-neutral-600 text-sm mb-4">本次大赛以"AI赋能未来"为主题...</p>
                <Link to="/news/1" className="text-sm text-primary font-medium hover:underline transition-colors">阅读全文</Link>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl overflow-hidden group">
              <div className="relative overflow-hidden h-32">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/30 to-orange-500/30 opacity-80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white"><p className="text-sm">2025年4月10日</p></div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2 line-clamp-2">大赛规则发布</h3>
                <Link to="/news/2" className="text-xs text-primary font-medium hover:underline transition-colors">阅读全文</Link>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl overflow-hidden group">
              <div className="relative overflow-hidden h-32">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-blue-500/30 opacity-80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white"><p className="text-sm">2025年4月5日</p></div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2 line-clamp-2">专家评审团名单公布</h3>
                <Link to="/news/3" className="text-xs text-primary font-medium hover:underline transition-colors">阅读全文</Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6 md:mt-12">
            <Link to="/news" className="inline-flex items-center gap-1 md:gap-2 text-primary text-xs md:text-sm font-medium hover:underline transition-colors">
              查看更多新闻
              <svg className="w-3 h-3 md:w-4 md:h-4 transition-transform hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 五、生态产品 - 横向scroll */}
      <section className="py-8 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-xl md:text-3xl font-bold text-neutral-800 mb-6 md:mb-16 text-center">生态产品</h2>
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 flex gap-3 pb-2 md:hidden">
            <EcoCard
              title="鸿鹄实训平台"
              description="集成全流程开发工具，支持低代码快速实现AI应用"
              icon={<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>}
              iconBg="bg-primary/20"
            />
            <EcoCard
              title="个人算力账户"
              description="为每位参赛者分配独立算力，支持GPU/CPU资源"
              icon={<svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>}
              iconBg="bg-secondary/20"
            />
            <EcoCard
              title="OPC能力认证"
              description="中国移动认证的OPC技能证书，提升就业竞争力"
              icon={<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              iconBg="bg-primary/20"
            />
          </div>
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card rounded-2xl p-8 group hover:bg-white/80 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">鸿鹄实训平台</h3>
              <p className="text-neutral-600 text-sm">集成全流程开发工具，支持低代码快速实现AI应用</p>
            </div>
            
            <div className="glass-card rounded-2xl p-8 group hover:bg-white/80 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">个人算力账户</h3>
              <p className="text-neutral-600 text-sm">为每位参赛者分配独立算力，支持GPU/CPU资源</p>
            </div>
            
            <div className="glass-card rounded-2xl p-8 group hover:bg-white/80 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">OPC能力认证</h3>
              <p className="text-neutral-600 text-sm">中国移动认证的OPC技能证书，提升就业竞争力</p>
            </div>
          </div>
          
          <div className="text-center mt-6 md:mt-12">
            <Link to="/eco-products" className="inline-flex items-center gap-1 md:gap-2 text-primary text-xs md:text-sm font-medium hover:underline transition-colors">
              查看全部产品
              <svg className="w-3 h-3 md:w-4 md:h-4 transition-transform hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 六、合作伙伴 - 折叠结构 */}
      <section className="py-8 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-xl md:text-3xl font-bold text-neutral-800 mb-6 md:mb-16 text-center">合作伙伴</h2>
          
          {/* 移动端折叠 */}
          <div className="md:hidden space-y-4">
            {/* 战略合作 */}
            <details className="group">
              <summary className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-neutral-100 cursor-pointer list-none">
                <span className="text-sm font-medium text-neutral-800">战略合作</span>
                <svg className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="mt-2 grid grid-cols-3 gap-2 p-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-neutral-100 rounded-lg flex items-center justify-center">
                    <span className="text-[10px] text-neutral-400">合作{i}</span>
                  </div>
                ))}
              </div>
            </details>
            
            {/* 支持单位 */}
            <details className="group">
              <summary className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-neutral-100 cursor-pointer list-none">
                <span className="text-sm font-medium text-neutral-800">支持单位</span>
                <svg className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="mt-2 grid grid-cols-4 gap-2 p-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="aspect-square bg-neutral-100 rounded-lg flex items-center justify-center">
                    <span className="text-[10px] text-neutral-400">单位{i}</span>
                  </div>
                ))}
              </div>
            </details>
          </div>

          {/* 桌面端展示 */}
          <div className="hidden md:block">
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
        </div>
      </section>

      {/* 页尾 CTA - 移动端紧凑 */}
      <section className="py-16 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(116,99,236,0.08),transparent_50%)]"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <ScrollReveal type="title">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-xl md:text-4xl font-bold text-neutral-800 mb-4 md:mb-6">立即加入 AI 创新实践</h2>
              <p className="text-sm md:text-xl text-neutral-600 mb-6 md:mb-10 max-w-2xl mx-auto">
                参与梧桐·鸿鹄人工智能应用创新大赛
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6">
                <Link
                  to="/register-competition"
                  className="bg-primary text-white px-6 py-3 md:px-10 md:py-4 rounded-lg md:rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 text-sm md:text-lg"
                >
                  立即报名
                </Link>
                <Link
                  to="/competition-center"
                  className="border border-primary text-primary px-6 py-3 md:px-10 md:py-4 rounded-lg md:rounded-lg font-medium hover:bg-primary/10 transition-all duration-300 text-sm md:text-lg"
                >
                  查看赛事
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default Home;

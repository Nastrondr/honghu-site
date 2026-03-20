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
    <div className="group relative h-72 md:h-64 rounded-2xl overflow-hidden cursor-pointer">
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
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
        <span className="text-xs text-white/50 mb-1.5 tracking-wide">
          {track.subtitle}
        </span>
        <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2 drop-shadow-lg">
          {track.title}
        </h3>
        <p className="text-xs md:text-sm text-white/85 leading-relaxed line-clamp-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
          {track.description}
        </p>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero 首屏 */}
      <HomeHero />

      {/* 一、大赛核心亮点 */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <ScrollReveal type="title">
            <h2 className="text-3xl font-bold text-neutral-800 mb-16 text-center">大赛核心亮点</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* OPC定向孵化 */}
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-purple-500 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-primary/20">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-3">OPC定向孵化</h3>
                <p className="text-neutral-600 text-sm">
                  通过实战赛题、创业辅导、算力支持、投融资对接，选拔"超级个体"
                </p>
              </div>
            </div>
            
            {/* 个人算力全程赋能 */}
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-secondary/20 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-secondary to-orange-400 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-secondary/20">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-3">个人算力全程赋能</h3>
                <p className="text-neutral-600 text-sm">
                  为每位选手配备个人算力账户，引入算力额度及交易机制
                </p>
              </div>
            </div>
            
            {/* 场景与市场对接 */}
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-400 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-primary/20">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-3">场景与市场对接</h3>
                <p className="text-neutral-600 text-sm">
                  赛题源自数字金融、教育、健康等真实场景，对接中国移动生态渠道
                </p>
              </div>
            </div>

            {/* 资本闭环 */}
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-secondary/20 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-secondary to-purple-400 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-secondary/20">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-3">资本闭环</h3>
                <p className="text-neutral-600 text-sm">
                  联合中投万方等机构，"投早、投小、投长期"，提供全周期资本服务
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 二、五大专项赛道 */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <ScrollReveal type="title">
            <h2 className="text-3xl font-bold text-neutral-800 mb-16 text-center">五大专项赛道</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '数字金融',
                subtitle: '智能金融创新',
                description: '探索AI在金融风险控制、智能投顾、反欺诈等领域的创新应用',
                accentColor: 'violet',
                imageUrl: '/assets/image/matchcategory card/finance.jpg'
              },
              {
                title: '数字教育',
                subtitle: '智慧教育未来',
                description: '开发AI驱动的智能教育工具，提升教学效率和学习体验',
                accentColor: 'blue',
                imageUrl: '/assets/image/matchcategory card/AI education technology.jpg'
              },
              {
                title: '数字健康',
                subtitle: 'AI医疗健康',
                description: '运用AI技术辅助诊断、药物研发和健康管理，提升医疗服务质量',
                accentColor: 'cyan',
                imageUrl: '/assets/image/matchcategory card/smart healthcare.jpg'
              },
              {
                title: '数字文旅',
                subtitle: '智慧文旅体验',
                description: '利用AI技术推动文化传播、旅游服务智能化与体验创新',
                accentColor: 'indigo',
                imageUrl: '/assets/image/matchcategory card/digital culture immersive.jpg'
              },
              {
                title: '数字法务',
                subtitle: '智能法律服务',
                description: '运用AI技术提升法律服务效率，推动智能合规与风险预警',
                accentColor: 'purple',
                imageUrl: '/assets/image/matchcategory card/legal tech interface.jpg'
              }
            ].map((track, index) => (
              <ScrollReveal key={track.title} delay={index * 0.08}>
                <TrackCard track={track} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 三、赛事中心 */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <ScrollReveal type="title">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4 text-center">赛事中心</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-neutral-600 mb-12 text-center">当前开放赛事 · 实时更新</p>
          </ScrollReveal>
          
          {/* 赛事卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to="/competition/1" className="glass-card rounded-2xl p-6 group hover:-translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col h-full cursor-pointer">
              <div className="flex justify-between items-start gap-3 mb-4">
                <h3 className="text-lg font-semibold text-neutral-800 flex-1 min-w-0">2025年梧桐·鸿鹄人工智能应用创新大赛</h3>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex-shrink-0">进行中</span>
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
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">人工智能</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">创新应用</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">全国赛</span>
              </div>
            </Link>
            
            <Link to="/competition/2" className="glass-card rounded-2xl p-6 group hover:-translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col h-full cursor-pointer">
              <div className="flex justify-between items-start gap-3 mb-4">
                <h3 className="text-lg font-semibold text-neutral-800 flex-1 min-w-0">2025年梧桐·鸿鹄AI算法挑战赛</h3>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 flex-shrink-0">即将开始</span>
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
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">算法</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">AI</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">技术挑战</span>
              </div>
            </Link>
            
            <Link to="/competition/3" className="glass-card rounded-2xl p-6 group hover:-translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col h-full cursor-pointer">
              <div className="flex justify-between items-start gap-3 mb-4">
                <h3 className="text-lg font-semibold text-neutral-800 flex-1 min-w-0">2025年梧桐·鸿鹄区县AI应用创新大赛</h3>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex-shrink-0">进行中</span>
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
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">人工智能</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">区县应用</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">地方赛</span>
              </div>
            </Link>
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
          <ScrollReveal type="title">
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
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
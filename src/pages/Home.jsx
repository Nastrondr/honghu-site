import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeHero from '../components/common/HomeHero';
import ScrollReveal, { ScrollRevealStagger } from '../components/common/ScrollReveal';

const SquareCard = ({ title, description, icon, iconBg = 'bg-primary/20' }) => (
  <div className="glass-card rounded-2xl p-4 flex flex-col items-center text-center h-full">
    <div className={`w-10 h-10 md:w-12 md:h-12 ${iconBg} rounded-xl flex items-center justify-center mb-2 md:mb-3`}>
      {icon}
    </div>
    <h3 className="text-xs md:text-base font-semibold text-neutral-800 mb-1 md:mb-2 line-clamp-1">{title}</h3>
    <p className="text-[10px] md:text-sm text-neutral-600 line-clamp-2">{description}</p>
  </div>
);

const TrackCard = ({ track, isScrolling }) => {
  const [imageError, setImageError] = useState(false);

  const fallbackGradients = {
    violet: 'from-violet-600/30 via-violet-900/50 to-slate-900/80',
    blue: 'from-blue-600/30 via-blue-900/50 to-slate-900/80',
    cyan: 'from-cyan-600/30 via-cyan-900/50 to-slate-900/80',
    indigo: 'from-indigo-600/30 via-indigo-900/50 to-slate-900/80',
    purple: 'from-purple-600/30 via-purple-900/50 to-slate-900/80'
  };

  return (
    <div className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 w-[70vw] snap-center ${isScrolling ? '' : ''}`}>
      {!imageError ? (
        <img
          src={track.imageUrl}
          alt={track.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradients[track.accentColor]}`} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-4">
        <h3 className="text-sm md:text-lg font-semibold text-white mb-0.5 md:mb-1 drop-shadow-lg line-clamp-1">
          {track.title}
        </h3>
        <p className="text-[10px] md:text-xs text-white/80 line-clamp-2">
          {track.description}
        </p>
      </div>
    </div>
  );
};

const Home = () => {
  const carouselRef = useRef(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);
  
  const tracks = [
    { title: '数字金融', subtitle: '智能金融创新', description: '探索AI在金融风险控制、智能投顾、反欺诈等领域的创新应用', accentColor: 'violet', imageUrl: '/assets/image/matchcategory card/finance.jpg' },
    { title: '数字教育', subtitle: '智慧教育未来', description: '开发AI驱动的智能教育工具，提升教学效率和学习体验', accentColor: 'blue', imageUrl: '/assets/image/matchcategory card/AI education technology.jpg' },
    { title: '数字健康', subtitle: 'AI医疗健康', description: '运用AI技术辅助诊断、药物研发和健康管理', accentColor: 'cyan', imageUrl: '/assets/image/matchcategory card/smart healthcare.jpg' },
    { title: '数字文旅', subtitle: '智慧文旅体验', description: '利用AI技术推动文化传播、旅游服务智能化', accentColor: 'indigo', imageUrl: '/assets/image/matchcategory card/digital culture immersive.jpg' },
    { title: '数字法务', subtitle: '智能法律服务', description: '运用AI技术提升法律服务效率，推动智能合规', accentColor: 'purple', imageUrl: '/assets/image/matchcategory card/legal tech interface.jpg' }
  ];

  useEffect(() => {
    let scrollInterval;
    const cardWidth = carouselRef.current?.firstElementChild?.offsetWidth || 0;
    const gap = 12;

    const autoScroll = () => {
      if (!carouselRef.current || isUserScrolling) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;
      
      if (isAtEnd) {
        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carouselRef.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
      }
    };

    scrollInterval = setInterval(autoScroll, 3000);

    return () => {
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, [isUserScrolling]);

  const handleScrollStart = () => {
    setIsUserScrolling(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
  };

  const handleScrollEnd = () => {
    scrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero 首屏 */}
      <HomeHero />

      {/* 一、大赛核心亮点 - 正方形网格布局 */}
      <section className="py-6 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <ScrollReveal type="title">
            <h2 className="text-lg md:text-3xl font-bold text-neutral-800 mb-4 md:mb-12 text-center">大赛核心亮点</h2>
          </ScrollReveal>
          {/* 移动端2列正方形网格 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            <SquareCard
              title="OPC定向孵化"
              description="实战赛题+创业辅导+算力支持"
              iconBg="bg-primary/20"
              icon={<svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
            />
            <SquareCard
              title="个人算力赋能"
              description="配备算力账户与额度交易"
              iconBg="bg-secondary/20"
              icon={<svg className="w-5 h-5 md:w-6 md:h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>}
            />
            <SquareCard
              title="场景对接"
              description="数字金融/教育/健康场景"
              iconBg="bg-blue-100"
              icon={<svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            />
            <SquareCard
              title="资本闭环"
              description="投早投小投长期"
              iconBg="bg-green-100"
              icon={<svg className="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            />
          </div>
        </div>
      </section>

      {/* 二、五大专项赛道 - 自动轮播 */}
      <section className="py-6 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <ScrollReveal type="title">
            <h2 className="text-lg md:text-3xl font-bold text-neutral-800 mb-4 md:mb-12 text-center">五大专项赛道</h2>
          </ScrollReveal>
          {/* 自动轮播容器 - 移动端横向滚动 */}
          <div 
            ref={carouselRef}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-5 gap-4">
              {tracks.map((track, index) => (
                <div key={track.title} className={`
                  relative rounded-2xl overflow-hidden cursor-pointer
                  ${index === 2 ? 'col-span-1 row-span-2' : 'col-span-1 row-span-1'}
                `}>
                  {!false ? (
                    <img
                      src={track.imageUrl}
                      alt={track.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br from-violet-600/30 via-violet-900/50 to-slate-900/80`} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <h3 className="text-sm font-semibold text-white line-clamp-1">
                      {track.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 移动端横向滚动轮播 */}
          <div 
            ref={carouselRef}
            className="lg:hidden flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4"
            onScrollStart={handleScrollStart}
            onScrollEnd={handleScrollEnd}
          >
            {tracks.map((track, index) => (
              <TrackCard key={track.title} track={track} isScrolling={isUserScrolling} />
            ))}
          </div>
          
          {/* 移动端指示器 */}
          <div className="lg:hidden flex justify-center gap-1.5 mt-3">
            {tracks.map((_, index) => (
              <div key={index} className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
            ))}
          </div>
        </div>
      </section>

      {/* 三、赛事中心 - 紧凑卡片 */}
      <section className="py-6 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <ScrollReveal type="title">
            <h2 className="text-lg md:text-3xl font-bold text-neutral-800 mb-3 md:mb-4 text-center">赛事中心</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-xs md:text-sm text-neutral-600 mb-4 md:mb-12 text-center">当前开放赛事 · 实时更新</p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            <Link to="/competition/1" className="glass-card rounded-xl md:rounded-2xl p-3 md:p-6 group hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 flex flex-col h-full cursor-pointer">
              <div className="flex justify-between items-start gap-2 mb-2 md:mb-4">
                <h3 className="text-xs md:text-lg font-semibold text-neutral-800 flex-1 min-w-0 line-clamp-2">2025年梧桐·鸿鹄人工智能应用创新大赛</h3>
                <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-medium bg-green-100 text-green-700 flex-shrink-0">进行中</span>
              </div>
              <div className="text-neutral-600 text-[10px] md:text-sm mb-2 md:mb-4">
                <p className="line-clamp-2">面向全国的人工智能应用创新大赛</p>
              </div>
              <div className="flex flex-wrap gap-1 md:gap-2 mt-auto">
                <span className="px-2 py-0.5 md:px-3 md:py-1 bg-primary/10 text-primary rounded-full text-[10px] md:text-xs">AI</span>
                <span className="px-2 py-0.5 md:px-3 md:py-1 bg-primary/10 text-primary rounded-full text-[10px] md:text-xs">创新</span>
              </div>
            </Link>
            
            <Link to="/competition/2" className="glass-card rounded-xl md:rounded-2xl p-3 md:p-6 group hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 flex flex-col h-full cursor-pointer">
              <div className="flex justify-between items-start gap-2 mb-2 md:mb-4">
                <h3 className="text-xs md:text-lg font-semibold text-neutral-800 flex-1 min-w-0 line-clamp-2">2025年梧桐·鸿鹄AI算法挑战赛</h3>
                <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-medium bg-blue-100 text-blue-700 flex-shrink-0">即将开始</span>
              </div>
              <div className="text-neutral-600 text-[10px] md:text-sm mb-2 md:mb-4">
                <p className="line-clamp-2">专注于AI算法优化的技术挑战赛</p>
              </div>
              <div className="flex flex-wrap gap-1 md:gap-2 mt-auto">
                <span className="px-2 py-0.5 md:px-3 md:py-1 bg-primary/10 text-primary rounded-full text-[10px] md:text-xs">算法</span>
                <span className="px-2 py-0.5 md:px-3 md:py-1 bg-primary/10 text-primary rounded-full text-[10px] md:text-xs">挑战</span>
              </div>
            </Link>
            
            <Link to="/competition/3" className="glass-card rounded-xl md:rounded-2xl p-3 md:p-6 group hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 flex flex-col h-full cursor-pointer">
              <div className="flex justify-between items-start gap-2 mb-2 md:mb-4">
                <h3 className="text-xs md:text-lg font-semibold text-neutral-800 flex-1 min-w-0 line-clamp-2">2025年区县AI应用创新大赛</h3>
                <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-medium bg-green-100 text-green-700 flex-shrink-0">进行中</span>
              </div>
              <div className="text-neutral-600 text-[10px] md:text-sm mb-2 md:mb-4">
                <p className="line-clamp-2">面向各区县的人工智能应用创新大赛</p>
              </div>
              <div className="flex flex-wrap gap-1 md:gap-2 mt-auto">
                <span className="px-2 py-0.5 md:px-3 md:py-1 bg-primary/10 text-primary rounded-full text-[10px] md:text-xs">区县</span>
                <span className="px-2 py-0.5 md:px-3 md:py-1 bg-primary/10 text-primary rounded-full text-[10px] md:text-xs">应用</span>
              </div>
            </Link>
          </div>
          
          <div className="text-center mt-4 md:mt-12">
            <Link to="/competition-center" className="inline-flex items-center gap-1 md:gap-2 text-primary text-xs md:text-sm font-medium hover:underline transition-colors">
              查看更多赛事
              <svg className="w-3 h-3 md:w-4 md:h-4 transition-transform hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 四、生态产品 - 正方形网格 */}
      <section className="py-6 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-lg md:text-3xl font-bold text-neutral-800 mb-4 md:mb-12 text-center">生态产品</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            <SquareCard
              title="鸿鹄实训平台"
              description="全流程开发工具，低代码AI应用"
              iconBg="bg-primary/20"
              icon={<svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>}
            />
            <SquareCard
              title="个人算力账户"
              description="GPU/CPU资源，模型训练"
              iconBg="bg-secondary/20"
              icon={<svg className="w-5 h-5 md:w-6 md:h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>}
            />
            <SquareCard
              title="OPC能力认证"
              description="中国移动认证，提升竞争力"
              iconBg="bg-green-100"
              icon={<svg className="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
            />
          </div>
          
          <div className="text-center mt-4 md:mt-12">
            <Link to="/eco-products" className="inline-flex items-center gap-1 md:gap-2 text-primary text-xs md:text-sm font-medium hover:underline transition-colors">
              查看全部产品
              <svg className="w-3 h-3 md:w-4 md:h-4 transition-transform hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 五、合作伙伴 - 折叠结构 */}
      <section className="py-6 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-lg md:text-3xl font-bold text-neutral-800 mb-4 md:mb-12 text-center">合作伙伴</h2>
          
          {/* 移动端折叠 */}
          <div className="md:hidden space-y-3">
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
            <div className="mb-12">
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

      {/* 六、CTA */}
      <section className="py-12 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(116,99,236,0.08),transparent_50%)]"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-lg md:text-4xl font-bold text-neutral-800 mb-3 md:mb-6">立即加入 AI 创新实践</h2>
            <p className="text-xs md:text-xl text-neutral-600 mb-4 md:mb-10 max-w-2xl mx-auto">
              参与梧桐·鸿鹄人工智能应用创新大赛
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-6">
              <Link
                to="/register-competition"
                className="bg-primary text-white px-5 py-2.5 md:px-10 md:py-4 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 text-sm md:text-lg"
              >
                立即报名
              </Link>
              <Link
                to="/competition-center"
                className="border border-primary text-primary px-5 py-2.5 md:px-10 md:py-4 rounded-lg font-medium hover:bg-primary/10 transition-all duration-300 text-sm md:text-lg"
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

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal, { ScrollRevealStagger } from '../../components/common/ScrollReveal';

const cardHover = 'transform-gpu translate-y-0 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-md active:scale-[0.99]';
const linkHover = 'transform-gpu transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]';
const btnHover = 'transform-gpu transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:brightness-105 active:scale-[0.98]';

const SquareCard = ({ icon, title, desc, color = 'primary' }) => {
  const colorMap = {
    primary: { bg: 'bg-primary/10', text: 'text-primary' },
    secondary: { bg: 'bg-secondary/10', text: 'text-secondary' },
  };
  const c = colorMap[color] || colorMap.primary;
  
  return (
    <div className={`aspect-square bg-white rounded-xl p-3 shadow-sm border border-neutral-100 flex flex-col items-center justify-center text-center ${cardHover}`}>
      <div className={`w-9 h-9 ${c.bg} rounded-lg flex items-center justify-center mb-2`}>
        {icon}
      </div>
      <h3 className="font-semibold text-neutral-800 text-xs mb-1 line-clamp-1">{title}</h3>
      <p className="text-[10px] text-neutral-500 line-clamp-2 leading-tight">{desc}</p>
    </div>
  );
};

const MobileTrackScroll = () => {
  const tracks = [
    { title: '数字金融', desc: '智能金融创新', imageUrl: '/assets/image/matchcategory%20card/finance.jpg', bgColor: 'bg-violet-600' },
    { title: '数字教育', desc: '智慧教育未来', imageUrl: '/assets/image/matchcategory%20card/AI%20education%20technology.jpg', bgColor: 'bg-blue-600' },
    { title: '数字健康', desc: 'AI医疗健康', imageUrl: '/assets/image/matchcategory%20card/smart%20healthcare.jpg', bgColor: 'bg-cyan-600' },
    { title: '数字文旅', desc: '智慧文旅体验', imageUrl: '/assets/image/matchcategory%20card/digital%20culture%20immersive.jpg', bgColor: 'bg-indigo-600' },
    { title: '数字法务', desc: '智能法律服务', imageUrl: '/assets/image/matchcategory%20card/legal%20tech%20interface.jpg', bgColor: 'bg-purple-600' },
  ];

  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef([]);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const containerCenter = container.scrollLeft + container.offsetWidth / 2;
    let minDistance = Infinity;
    let closestIndex = 0;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const cardLeft = card.offsetLeft;
      const cardWidth = card.offsetWidth;
      const cardCenter = cardLeft + cardWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div
      ref={scrollRef}
      className="overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2"
      style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
    >
      <div className="flex gap-3" style={{ width: 'max-content' }}>
        {tracks.map((track, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`relative flex-shrink-0 w-[78vw] h-[200px] overflow-hidden rounded-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
              } ${track.bgColor}`}
              style={{ scrollSnapAlign: 'center' }}
            >
              <img
                src={track.imageUrl}
                alt={track.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <p className="text-white/60 text-[11px] mb-0.5">{track.desc}</p>
                <h3 className="font-bold text-white text-base">{track.title}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const HomeMobile = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[85vh] max-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/image/herobanner.png)' }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 container mx-auto px-5 py-8 text-center">
          <div className="hero-badge mb-4 inline-flex items-center rounded-full px-3 py-1 text-[11px] text-white/90 font-medium">
            <span className="hero-badge-dot mr-2" />
            全国性人工智能赛事 · OPC 核心孵化平台
          </div>

          <h1 className="text-2xl font-bold text-white mb-3 leading-tight drop-shadow-lg">
            梧桐·鸿鹄<br/>人工智能应用创新大赛
          </h1>
          <p className="text-sm text-white/80 mb-5 line-clamp-2">
            探索AI无限可能，开启创新之旅
          </p>
          <div className="flex flex-col gap-2.5 max-w-[200px] mx-auto">
            <Link 
              to="/register-competition" 
              className={`w-full bg-primary text-white py-2.5 rounded-lg font-medium text-sm text-center ${btnHover}`}
            >
              立即报名
            </Link>
            <Link 
              to="/competition-center"
              className="w-full border border-white/20 bg-white/10 text-white/80 py-2.5 rounded-lg font-medium text-sm text-center backdrop-blur-sm hover:bg-white/18 hover:text-white hover:border-white/30 transition-all duration-300"
            >
              查看赛事
            </Link>
          </div>
        </div>
      </section>

      <section className="py-4 px-4">
        <ScrollReveal>
          <h2 className="text-sm font-bold text-neutral-800 mb-3">大赛亮点</h2>
        </ScrollReveal>
        <ScrollRevealStagger staggerDelay={0.06}>
          <div className="grid grid-cols-2 gap-2.5">
            <SquareCard 
              color="primary"
              icon={
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="OPC定向孵化"
              desc="实战赛题、创业辅导、算力支持"
            />
            <SquareCard 
              color="secondary"
              icon={
                <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              }
              title="个人算力赋能"
              desc="GPU/CPU资源全程支持"
            />
            <SquareCard 
              color="primary"
              icon={
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              title="场景市场对接"
              desc="真实场景对接生态渠道"
            />
            <SquareCard 
              color="secondary"
              icon={
                <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="资本闭环"
              desc="投早投小投长期"
            />
          </div>
        </ScrollRevealStagger>
      </section>

      <section className="py-4 px-4">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-neutral-800">生态产品</h2>
            <Link to="/eco-products" className={`text-xs text-primary font-medium ${linkHover}`}>更多→</Link>
          </div>
        </ScrollReveal>
        <ScrollRevealStagger staggerDelay={0.06}>
          <div className="grid grid-cols-2 gap-2.5">
            <SquareCard 
              color="primary"
              icon={
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              }
              title="鸿鹄实训平台"
              desc="全流程开发工具支持"
            />
            <SquareCard 
              color="secondary"
              icon={
                <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                </svg>
              }
              title="个人算力账户"
              desc="GPU/CPU资源按需分配"
            />
            <SquareCard 
              color="primary"
              icon={
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
              title="鸿鹄学堂"
              desc="6000+门AI课程免费学"
            />
            <SquareCard 
              color="secondary"
              icon={
                <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              }
              title="OPC能力认证"
              desc="中国移动官方技能证书"
            />
          </div>
        </ScrollRevealStagger>
      </section>

      <section className="py-4">
        <ScrollReveal>
          <h2 className="text-sm font-bold text-neutral-800 mb-3 px-4">专项赛道</h2>
        </ScrollReveal>
        <MobileTrackScroll />
      </section>

      <section className="py-4 px-4">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-neutral-800">热门赛事</h2>
            <Link to="/competition-center" className={`text-xs text-primary font-medium ${linkHover}`}>更多→</Link>
          </div>
        </ScrollReveal>
        <ScrollRevealStagger staggerDelay={0.08}>
          <div className="space-y-2">
            <Link to="/competition/1" className={`block bg-white rounded-lg p-2.5 shadow-sm border border-neutral-100 ${cardHover}`}>
              <div className="flex justify-between items-center gap-2">
                <h3 className="font-medium text-neutral-800 text-xs flex-1 line-clamp-1">2025年梧桐·鸿鹄人工智能应用创新大赛</h3>
                <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[9px] rounded-full flex-shrink-0">进行中</span>
              </div>
            </Link>
            <Link to="/competition/2" className={`block bg-white rounded-lg p-2.5 shadow-sm border border-neutral-100 ${cardHover}`}>
              <div className="flex justify-between items-center gap-2">
                <h3 className="font-medium text-neutral-800 text-xs flex-1 line-clamp-1">2025年梧桐·鸿鹄AI算法挑战赛</h3>
                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[9px] rounded-full flex-shrink-0">即将开始</span>
              </div>
            </Link>
          </div>
        </ScrollRevealStagger>
      </section>

      <section className="py-4 px-4">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-neutral-800">新闻动态</h2>
            <Link to="/news" className={`text-xs text-primary font-medium ${linkHover}`}>更多→</Link>
          </div>
        </ScrollReveal>
        <ScrollRevealStagger staggerDelay={0.08}>
          <div className="space-y-1.5">
            {[
              { title: '大赛正式启动', date: '2025年4月15日' },
              { title: '大赛规则发布', date: '2025年4月10日' },
              { title: '专家评审团名单公布', date: '2025年4月5日' },
            ].map((item, index) => (
              <Link key={index} to="/news/1" className={`flex items-center justify-between py-2 border-b border-neutral-100 last:border-0 ${linkHover}`}>
                <span className="text-xs text-neutral-700 line-clamp-1">{item.title}</span>
                <span className="text-[10px] text-neutral-400 flex-shrink-0 ml-2">{item.date}</span>
              </Link>
            ))}
          </div>
        </ScrollRevealStagger>
      </section>

      <section className="py-4 px-4">
        <ScrollReveal>
          <h2 className="text-sm font-bold text-neutral-800 mb-3">合作伙伴</h2>
        </ScrollReveal>
        <ScrollRevealStagger staggerDelay={0.06}>
          <div className="grid grid-cols-4 gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className={`aspect-square bg-neutral-50 rounded-lg flex items-center justify-center ${cardHover}`}>
                <span className="text-[9px] text-neutral-400">合作{i}</span>
              </div>
            ))}
          </div>
        </ScrollRevealStagger>
      </section>

      <section className="py-5 px-4 pb-6">
        <ScrollReveal>
          <div className="bg-gradient-to-br from-primary/10 to-purple-50 rounded-xl p-4 text-center">
            <h2 className="text-sm font-bold text-neutral-800 mb-1.5">立即加入 AI 创新实践</h2>
            <p className="text-xs text-neutral-600 mb-3">展示才华，开启AI精彩旅程</p>
            <Link 
              to="/register-competition" 
              className={`inline-block w-full bg-primary text-white py-2 rounded-lg font-medium text-xs ${btnHover}`}
            >
              立即报名
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default HomeMobile;

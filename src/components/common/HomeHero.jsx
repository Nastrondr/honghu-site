import React from 'react';
import { Link } from 'react-router-dom';

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 背景图片 */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/assets/image/herobanner.png)' }} />
      
      {/* 半透明深色遮罩 */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* 顶部过渡层 - 与导航融合 */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#05081f] to-transparent" />
      
      {/* 底部过渡层 - 平滑过渡到下一区域 */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f8f9ff]/10 via-[#f8f9ff]/4 to-transparent" />
    </div>
  );
}

export default function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative min-h-[85vh] md:min-h-[88vh] lg:min-h-[90vh]">
        <HeroBackground />

        <div className="relative z-10 mx-auto flex min-h-[85vh] md:min-h-[88vh] lg:min-h-[90vh] max-w-5xl items-center justify-center px-5 pt-32 pb-20 md:px-6 lg:pt-36 lg:pb-24">
          <div className="mx-auto max-w-2xl text-center">
            {/* 标签 */}
            <div className="mb-16 inline-flex items-center rounded-full border border-white/15 bg-white/8 px-5 py-2 text-[13px] text-white/80 backdrop-blur-sm">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#7463EC] shadow-[0_0_8px_rgba(116,99,236,0.7)]" />
              全国性人工智能赛事 · OPC 核心孵化平台
            </div>

            {/* 主标题 */}
            <h1 className="mx-auto max-w-xl">
              <span className="block text-[32px] md:text-[48px] lg:text-[56px] font-semibold leading-[1.2] tracking-tight text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]">
                梧桐·鸿鹄
              </span>
              <span className="block mt-3 text-[36px] md:text-[56px] lg:text-[72px] font-bold leading-[1.05] tracking-tight text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                人工智能应用创新大赛
              </span>
            </h1>

            {/* 副标题 */}
            <div className="mt-16 space-y-3">
              <p className="text-[16px] leading-7 text-white/90 md:text-lg">
                以赛促学 · 以赛促用 · 以赛促创
              </p>
              <p className="text-[15px] leading-6 text-white/70 md:text-[16px]">
                打造面向未来的人工智能应用创新与人才孵化平台
              </p>
            </div>

            {/* 按钮 */}
            <div className="mt-20 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/register"
                className="group relative inline-flex min-w-[160px] items-center justify-center overflow-hidden rounded-2xl px-8 py-4 text-[15px] font-semibold text-white shadow-[0_4px_20px_rgba(116,99,236,0.4)] transition-all duration-300 ease-out bg-[#7463EC] hover:-translate-y-1 hover:shadow-[0_6px_28px_rgba(116,99,236,0.55)] active:scale-[0.98]"
              >
                <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] skew-x-12 -translate-x-full group-hover:translate-x-full" />
                <span className="relative">立即报名</span>
              </Link>

              <Link
                to="/competition-center"
                className="inline-flex min-w-[160px] items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-[15px] font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/18 hover:text-white hover:border-white/30 active:scale-[0.98]"
              >
                查看赛事
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

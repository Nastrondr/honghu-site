import React from 'react';
import { Link } from 'react-router-dom';
import ParticleCanvas from './ParticleCanvas';

function HeroParticleBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 背景主渐变 - 比其他区域稍强 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(116,99,236,0.15),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#f0f4ff_50%,#f8fafc_100%)]" />

      {/* 标题后方中心光晕 - 蓝紫色 */}
      <div className="absolute left-1/2 top-[42%] h-[480px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18)_0%,rgba(116,99,236,0.15)_30%,rgba(252,115,36,0.08)_60%,rgba(255,255,255,0)_100%)] blur-3xl" />

      {/* 左侧淡光 - 使用primary紫色 */}
      <div className="absolute left-[8%] top-[15%] h-[280px] w-[280px] rounded-full bg-[#7463EC]/12 blur-3xl" />

      {/* 右下淡光 - 使用secondary橙色 */}
      <div className="absolute right-[10%] bottom-[20%] h-[300px] w-[300px] rounded-full bg-[#FC7324]/10 blur-3xl" />

      {/* 顶部轻微白雾，缓和导航栏白底衔接 */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/60 via-white/25 to-transparent" />

      {/* 底部平滑过渡层：Hero -> 页面背景 */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#f1f5f9]/80 via-transparent to-transparent" />
    </div>
  );
}

export default function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative min-h-[640px] md:min-h-[720px]">
        <HeroParticleBg />

        {/* 粒子层 */}
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          <ParticleCanvas />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[640px] md:min-h-[720px] max-w-7xl items-center justify-center px-6 pt-24 pb-24 md:px-8">
          <div className="mx-auto max-w-5xl text-center">
            {/* 上方标签 */}
            <div className="mb-6 inline-flex items-center rounded-full border border-white/60 bg-white/55 px-4 py-2 text-sm text-slate-600 shadow-[0_8px_30px_rgba(116,99,236,0.08)] backdrop-blur-md">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#7463EC] shadow-[0_0_10px_rgba(116,99,236,0.6)]" />
              全国性人工智能赛事 · OPC 核心孵化平台
            </div>

            <h1 className="hero-title mx-auto max-w-4xl text-[44px] font-black leading-[1.08] tracking-[-0.04em] text-transparent md:text-[78px] bg-clip-text bg-gradient-to-b from-slate-800 to-slate-900">
              梧桐·鸿鹄
              <br />
              人工智能应用创新大赛
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-slate-600 md:text-[30px] md:leading-[1.7]">
              以赛促学 · 以赛促用 · 以赛促创，
              打造面向未来的人工智能应用创新与人才孵化平台
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/register"
                className="group relative inline-flex min-w-[170px] items-center justify-center overflow-hidden rounded-2xl px-8 py-4 text-base font-semibold text-white shadow-[0_12px_34px_rgba(79,70,229,0.28),0_0_0_1px_rgba(255,255,255,0.18)_inset] transition-all duration-300 ease-out bg-[linear-gradient(135deg,#6D5EF8_0%,#5B6EFF_45%,#4F8CFF_100%)] hover:-translate-y-[2px] hover:scale-[1.02] hover:shadow-[0_18px_50px_rgba(79,70,229,0.34),0_0_22px_rgba(96,165,250,0.28)] active:scale-[0.98]"
              >
                <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(120deg,transparent_15%,rgba(255,255,255,0.28)_50%,transparent_85%)] translate-x-[-120%] group-hover:translate-x-[120%]" />
                <span className="relative z-10">立即报名</span>
              </Link>

              <Link
                to="/competition-center"
                className="inline-flex min-w-[170px] items-center justify-center rounded-2xl border border-[#7463EC]/30 bg-white/55 px-8 py-4 text-base font-semibold text-[#7463EC] backdrop-blur-md shadow-[0_8px_24px_rgba(116,99,236,0.08)] transition-all duration-300 ease-out hover:-translate-y-[2px] hover:scale-[1.02] hover:border-[#7463EC]/50 hover:bg-white/72 hover:shadow-[0_14px_34px_rgba(116,99,236,0.14)] active:scale-[0.98]"
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

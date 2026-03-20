import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const PARTICLE_COLORS = ['#7C5CFF', '#60A5FA', '#22D3EE'];

function MouseTrailParticles() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -100, y: -100, moving: false });
  const animationRef = useRef(null);
  const moveTimeoutRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const isMobile = () => window.innerWidth < 768;
    if (isMobile()) return;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.moving = true;

      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
      moveTimeoutRef.current = setTimeout(() => {
        mouseRef.current.moving = false;
      }, 100);
    };

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8 - 0.3;
        this.opacity = 1;
        this.decay = Math.random() * 0.015 + 0.01;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.decay;
        this.size *= 0.97;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();
        ctx.restore();
      }
    }

    const spawnParticles = (x, y) => {
      if (particlesRef.current.length < 40) {
        particlesRef.current.push(new Particle(x, y));
      }
    };

    let lastSpawn = 0;
    const animate = (timestamp) => {
      ctx.clearRect(0, 0, width, height);

      if (mouseRef.current.moving && mouseRef.current.x > 0 && mouseRef.current.y > 0) {
        if (timestamp - lastSpawn > 30) {
          spawnParticles(mouseRef.current.x, mouseRef.current.y);
          lastSpawn = timestamp;
        }
      }

      particlesRef.current = particlesRef.current.filter(p => p.opacity > 0 && p.size > 0.1);
      particlesRef.current.forEach(p => {
        p.update();
        p.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[5]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/assets/image/herobanner.png)' }} />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f8f9ff]/10 via-[#f8f9ff]/4 to-transparent" />
    </div>
  );
}

export default function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden min-h-[85vh] md:min-h-[88vh] lg:min-h-[90vh]">
      <HeroBackground />
      <MouseTrailParticles />

      <div className="relative z-10 mx-auto flex min-h-[85vh] md:min-h-[88vh] lg:min-h-[90vh] max-w-5xl items-center justify-center px-5 pt-24 pb-20 md:px-6 lg:pt-28 lg:pb-24">
        <div className="mx-auto max-w-2xl text-center">
          {/* 标签 */}
          <div className="hero-badge mb-16 inline-flex items-center rounded-full px-5 py-2 text-[13px] text-white/90 font-medium">
            <span className="hero-badge-dot mr-2" />
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
    </section>
  );
}

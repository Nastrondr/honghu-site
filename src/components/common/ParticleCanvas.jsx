import React, { useRef, useEffect } from 'react';

const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particleCount = Math.floor((width * height) / 15000);
    const connectionDistance = 150;
    const mouseDistance = 200;

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseDistance) {
            const force = (mouseDistance - distance) / mouseDistance;
            const attraction = force * 0.5;
            this.x -= dx * attraction * 0.01;
            this.y -= dy * attraction * 0.01;
          }
        }

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        this.x = Math.max(0, Math.min(width, this.x));
        this.y = Math.max(0, Math.min(height, this.y));
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(116, 99, 236, 0.6)';
        ctx.fill();
      }
    }

    const init = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(116, 99, 236, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleCanvas;

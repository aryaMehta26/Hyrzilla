import React, { useEffect, useRef, useState } from 'react';

export default function AuroraMesh() {
  const meshRef = useRef(null);
  const canvasRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const smoothMouse = useRef({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas particle constellation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particles
    const numParticles = 45;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update & draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 58, 237, ${p.alpha})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(167, 139, 250, ${(1 - dist / 120) * 0.15})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Smooth mouse lerp for gradient mesh
  useEffect(() => {
    let animId;
    const animate = () => {
      smoothMouse.current.x += (mouse.x - smoothMouse.current.x) * 0.03;
      smoothMouse.current.y += (mouse.y - smoothMouse.current.y) * 0.03;

      if (meshRef.current) {
        const { x, y } = smoothMouse.current;
        meshRef.current.style.setProperty('--mx', `${x}%`);
        meshRef.current.style.setProperty('--my', `${y}%`);
      }

      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [mouse]);

  return (
    <>
      {/* Dynamic Ambient Fluid Aurora Mesh */}
      <div 
        ref={meshRef}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          '--mx': '50%',
          '--my': '50%',
        }}
      >
        {/* Soft Lavender Orb — follows cursor */}
        <div 
          className="absolute w-[850px] h-[850px] rounded-full opacity-35 blur-[150px]"
          style={{
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4), transparent 70%)',
            left: 'calc(var(--mx) - 425px)',
            top: 'calc(var(--my) - 425px)',
            transition: 'none',
          }}
        />

        {/* Soft Indigo Orb — offset */}
        <div 
          className="absolute w-[650px] h-[650px] rounded-full opacity-25 blur-[130px]"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.35), transparent 70%)',
            right: 'calc(100% - var(--mx) - 200px)',
            bottom: 'calc(100% - var(--my) - 100px)',
            transition: 'none',
          }}
        />

        {/* Ambient Top Violet Glow */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[450px] opacity-35 blur-[140px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.3), transparent 70%)',
          }}
        />

        {/* Particle Constellation Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" />
      </div>

      {/* Film Grain Noise Overlay */}
      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}

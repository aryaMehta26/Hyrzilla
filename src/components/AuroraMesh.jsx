import React, { useEffect, useRef, useState } from 'react';

export default function AuroraMesh() {
  const meshRef = useRef(null);
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
      {/* Aurora Mesh Gradient Background */}
      <div 
        ref={meshRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          '--mx': '50%',
          '--my': '50%',
        }}
      >
        {/* Violet Orb — follows cursor */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-[160px]"
          style={{
            background: 'radial-gradient(circle, #8B5CF6, transparent 70%)',
            left: 'calc(var(--mx) - 400px)',
            top: 'calc(var(--my) - 400px)',
            transition: 'none',
          }}
        />

        {/* Cyan Orb — offset from cursor */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-15 blur-[140px]"
          style={{
            background: 'radial-gradient(circle, #06B6D4, transparent 70%)',
            right: 'calc(100% - var(--mx) - 200px)',
            bottom: 'calc(100% - var(--my) - 100px)',
            transition: 'none',
          }}
        />

        {/* Emerald Orb — ambient drift */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-10 blur-[120px] animate-pulse"
          style={{
            background: 'radial-gradient(circle, #10B981, transparent 70%)',
            left: '10%',
            bottom: '10%',
          }}
        />

        {/* Deep void base gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(6, 182, 212, 0.04) 0%, transparent 40%)',
          }}
        />
      </div>

      {/* Film Grain Noise Overlay */}
      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}

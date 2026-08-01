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
      {/* Light Lavender Ethereal Aurora Mesh */}
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
          className="absolute w-[800px] h-[800px] rounded-full opacity-35 blur-[140px]"
          style={{
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4), transparent 70%)',
            left: 'calc(var(--mx) - 400px)',
            top: 'calc(var(--my) - 400px)',
            transition: 'none',
          }}
        />

        {/* Soft Indigo Orb — offset */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-25 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent 70%)',
            right: 'calc(100% - var(--mx) - 200px)',
            bottom: 'calc(100% - var(--my) - 100px)',
            transition: 'none',
          }}
        />

        {/* Ambient Top Glow */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] opacity-30 blur-[130px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.3), transparent 70%)',
          }}
        />
      </div>

      {/* Film Grain Noise Overlay */}
      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}

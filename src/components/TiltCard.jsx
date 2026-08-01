import React, { useRef, useState } from 'react';

export default function TiltCard({ children, className = '', maxTilt = 12, glare = true }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const rotateY = ((mouseX - width / 2) / (width / 2)) * maxTilt;
    const rotateX = -((mouseY - height / 2) / (height / 2)) * maxTilt;

    const glareX = (mouseX / width) * 100;
    const glareY = (mouseY / height) * 100;

    setTilt({ x: rotateX, y: rotateY });
    setGlarePos({ x: glareX, y: glareY, opacity: 0.35 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-transform duration-200 ease-out ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0px)`,
      }}
    >
      {/* Glare effect */}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-20"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.4), transparent 60%)`,
          }}
        />
      )}

      <div style={{ transform: 'translateZ(20px)' }} className="h-full">
        {children}
      </div>
    </div>
  );
}

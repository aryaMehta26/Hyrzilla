import React from 'react';

// Sleek, zero-rotation ambient background
export default function ParticleCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Top subtle emerald beam */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] opacity-40 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.25), transparent 70%)'
        }}
      />
    </div>
  );
}

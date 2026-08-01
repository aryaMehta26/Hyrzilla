import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef([]);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const trailPositions = useRef([
    { x: -100, y: -100 },
    { x: -100, y: -100 },
    { x: -100, y: -100 },
  ]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let animId;
    const speeds = [0.15, 0.1, 0.06];

    const loop = () => {
      // Ring follows with spring
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;

      // Trail dots follow with decreasing speed
      trailPositions.current.forEach((tp, i) => {
        const target = i === 0 ? pos.current : trailPositions.current[i - 1];
        tp.x += (target.x - tp.x) * speeds[i];
        tp.y += (target.y - tp.y) * speeds[i];
      });

      // Apply transforms
      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`;
        dotRef.current.style.top = `${pos.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      trailRefs.current.forEach((ref, i) => {
        if (ref) {
          ref.style.left = `${trailPositions.current[i].x}px`;
          ref.style.top = `${trailPositions.current[i].y}px`;
        }
      });

      animId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Hover detection with MutationObserver for dynamically added elements
  useEffect(() => {
    const handleHover = () => setIsHovered(true);
    const handleUnhover = () => setIsHovered(false);

    const attachListeners = () => {
      const els = document.querySelectorAll('a, button, input, select, textarea, [data-magnetic]');
      els.forEach((el) => {
        el.addEventListener('mouseenter', handleHover);
        el.addEventListener('mouseleave', handleUnhover);
      });
      return els;
    };

    const els = attachListeners();

    // Re-attach on DOM changes
    const observer = new MutationObserver(() => {
      attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      els.forEach((el) => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleUnhover);
      });
    };
  }, []);

  return (
    <>
      {/* Trail dots */}
      {[0.2, 0.14, 0.08].map((opacity, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="cursor-trail"
          style={{ opacity }}
        />
      ))}
      <div
        ref={dotRef}
        className={`cursor-dot ${isHovered ? 'hv' : ''}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovered ? 'hv' : ''}`}
      />
    </>
  );
}

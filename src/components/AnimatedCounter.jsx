import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedCounter({ 
  target, 
  duration = 1.4, 
  prefix = '', 
  suffix = '', 
  decimals = 0,
  className = '' 
}) {
  const counterRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = counterRef.current;
    if (!el || hasAnimated) return;

    const obj = { value: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        setHasAnimated(true);
        gsap.to(obj, {
          value: target,
          duration: duration,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = prefix + obj.value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [target, duration, prefix, suffix, decimals, hasAnimated]);

  return (
    <span ref={counterRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

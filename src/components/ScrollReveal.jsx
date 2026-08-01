import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({ 
  children, 
  className = '', 
  delay = 0, 
  y = 50, 
  duration = 0.8,
  stagger = 0,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger > 0 ? el.children : el;

    gsap.fromTo(
      targets,
      { 
        y: y, 
        opacity: 0,
        filter: 'blur(6px)',
      },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: duration,
        delay: delay,
        stagger: stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [delay, y, duration, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

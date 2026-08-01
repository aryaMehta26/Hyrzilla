import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({ children, className = '', as: Tag = 'h1', delay = 0 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Split text into individual characters wrapped in spans
    const text = el.textContent;
    el.innerHTML = '';

    // Preserve existing className
    const words = text.split(' ');
    words.forEach((word, wi) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';

      const chars = word.split('');
      chars.forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.textContent = char;
        charSpan.style.display = 'inline-block';
        charSpan.style.opacity = '0';
        charSpan.style.transform = 'translateY(40px) rotateX(40deg)';
        charSpan.style.transformOrigin = 'bottom center';
        charSpan.className = 'split-char';
        wordSpan.appendChild(charSpan);
      });

      el.appendChild(wordSpan);

      // Add space between words
      if (wi < words.length - 1) {
        const space = document.createElement('span');
        space.innerHTML = '&nbsp;';
        space.style.display = 'inline-block';
        el.appendChild(space);
      }
    });

    const splitChars = el.querySelectorAll('.split-char');

    gsap.to(splitChars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.6,
      stagger: 0.02,
      ease: 'power3.out',
      delay: delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [delay]);

  return (
    <Tag 
      ref={containerRef} 
      className={className}
      style={{ perspective: '600px', overflow: 'hidden' }}
    >
      {children}
    </Tag>
  );
}

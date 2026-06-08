'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useAppStore } from '@/lib/store';

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { cursorType } = useAppStore();
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || isReducedMotion) return;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.4, ease: 'power3' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isReducedMotion]);

  if (isReducedMotion) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
        cursorType === 'default'
          ? 'bg-white mix-blend-difference'
          : 'bg-white/10 backdrop-blur-md scale-[4] border border-white/20'
      }`}
    >
      {cursorType !== 'default' && (
        <span className="text-[4px] font-mono font-bold text-white uppercase tracking-widest animate-in fade-in zoom-in duration-300">
          {cursorType}
        </span>
      )}
    </div>
  );
}

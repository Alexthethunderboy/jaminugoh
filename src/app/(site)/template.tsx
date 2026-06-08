'use client';

import { ReactNode, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Template({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Page-in animation
    gsap.fromTo(container.current,
      { opacity: 0, y: 15, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', delay: 0.1 }
    );
  }, { scope: container });

  return (
    <div ref={container} className="w-full h-full will-change-transform">
      {children}
    </div>
  );
}

'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ProjectCard from './works/ProjectCard';

gsap.registerPlugin(ScrollTrigger);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function WorksGallery({ projects }: { projects: any[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useGSAP(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion || projects.length <= 1) return;
    
    const mm = gsap.matchMedia();

    // Only apply GSAP horizontal scroll hijacking on Desktop (768px and up)
    mm.add("(min-width: 768px)", () => {
      const getScrollAmount = () => window.innerWidth * (projects.length - 1);

      gsap.to(containerRef.current, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          snap: 1 / (projects.length - 1),
        }
      });
    });

    return () => mm.revert();
  }, { scope: parentRef, dependencies: [projects] });

  // Desktop vertical scroll height
  const verticalScrollHeight = `${projects.length * 150}vh`;

  return (
    <div 
      ref={parentRef} 
      className="relative w-full h-[100dvh] md:h-[var(--desktop-height)]"
      style={{ '--desktop-height': verticalScrollHeight } as React.CSSProperties}
    >
      {/* On desktop, it's sticky. On mobile, it's just a full-height wrapper */}
      <div className="md:sticky md:top-0 md:left-0 w-full h-[100dvh] md:overflow-hidden bg-obsidian">
        <section 
          ref={containerRef} 
          className="relative h-full flex flex-nowrap bg-obsidian w-full md:w-[var(--desktop-width)] overflow-x-auto md:overflow-visible overflow-y-hidden snap-x snap-mandatory no-scrollbar"
          style={{ '--desktop-width': `${projects.length * 100}vw` } as React.CSSProperties}
        >
          {projects.map((project, index) => (
            <div key={project._id || index} className="w-[100vw] h-[100dvh] shrink-0 flex-none snap-center snap-always">
              <ProjectCard 
                project={project}
                index={index}
                isHovered={hoveredIndex === index}
                onHoverEnter={() => setHoveredIndex(index)}
                onHoverLeave={() => setHoveredIndex(null)}
              />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

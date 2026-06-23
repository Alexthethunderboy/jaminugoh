'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ProjectCard from './works/ProjectCard';

gsap.registerPlugin(ScrollTrigger);

import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function WorksGallery({ projects }: { projects: any[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const displayedProjects = projects.slice(0, 5);
  const totalSlides = displayedProjects.length + 1;

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (!hasScrolled && e.currentTarget.scrollLeft > 20) {
      setHasScrolled(true);
    }
  };

  useGSAP(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion || totalSlides <= 1) return;
    
    const mm = gsap.matchMedia();

    // Only apply GSAP horizontal scroll hijacking on Desktop (768px and up)
    mm.add("(min-width: 768px)", () => {
      const getScrollAmount = () => window.innerWidth * (totalSlides - 1);

      gsap.to(containerRef.current, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          snap: 1 / (totalSlides - 1),
        }
      });
    });

    return () => mm.revert();
  }, { scope: parentRef, dependencies: [projects] });

  // Desktop vertical scroll height
  const verticalScrollHeight = `${totalSlides * 150}vh`;

  return (
    <div 
      ref={parentRef} 
      className="relative w-full h-[100dvh] md:h-[var(--desktop-height)]"
      style={{ '--desktop-height': verticalScrollHeight } as React.CSSProperties}
    >
      {/* On desktop, it's sticky. On mobile, it's just a full-height wrapper */}
      <div className="md:sticky md:top-0 md:left-0 w-full h-[100dvh] md:overflow-hidden bg-obsidian">
        <div className={`md:hidden absolute right-6 top-1/2 -translate-y-1/2 z-50 pointer-events-none transition-opacity duration-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${hasScrolled ? 'opacity-0' : 'opacity-100 animate-bounce'}`}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-silver rotate-[-90deg]">
             <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>

        <section 
          ref={containerRef} 
          onScroll={handleScroll}
          className="relative h-full flex flex-nowrap bg-obsidian w-full md:w-[var(--desktop-width)] overflow-x-auto md:overflow-visible overflow-y-hidden snap-x snap-mandatory no-scrollbar"
          style={{ '--desktop-width': `${totalSlides * 100}vw` } as React.CSSProperties}
        >
          {displayedProjects.map((project, index) => (
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

          {/* MORE BUTTON SLIDE */}
          <div className="w-[100vw] h-[100dvh] shrink-0 flex-none snap-center snap-always flex items-center justify-center bg-obsidian relative overflow-hidden group">
            <Link href="/archive" className="relative z-10 flex flex-col items-center justify-center gap-6 p-8 group">
              <div className="w-24 h-24 rounded-full border border-silver/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-silver transition-all duration-500">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-silver group-hover:text-obsidian transition-colors">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
              <span className="text-h2 font-display uppercase text-silver tracking-tight">View Archive</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

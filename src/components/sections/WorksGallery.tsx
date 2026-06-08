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
    
    // Calculate the exact distance we need to translate to reach the last project
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
        // No 'pin: true' needed! We use native CSS sticky to avoid layout thrashing.
      }
    });
  }, { scope: parentRef, dependencies: [projects] });

  // Native vertical scroll height needed to scrub through all projects
  // We use 150vh per project to make the scroll slower and less sensitive (default is 100vh)
  const verticalScrollHeight = `${projects.length * 150}vh`;

  return (
    <div ref={parentRef} className="relative w-full" style={{ height: verticalScrollHeight }}>
      {/* Native sticky wrapper ensures flawless pinning without GSAP DOM manipulation */}
      <div className="sticky top-0 left-0 w-full h-[100dvh] overflow-hidden bg-obsidian">
        <section 
          ref={containerRef} 
          className="relative h-full flex flex-nowrap bg-obsidian"
          style={{ width: `${projects.length * 100}vw` }}
        >
          {projects.map((project, index) => (
            <ProjectCard 
              key={project._id || index}
              project={project}
              index={index}
              isHovered={hoveredIndex === index}
              onHoverEnter={() => setHoveredIndex(index)}
              onHoverLeave={() => setHoveredIndex(null)}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

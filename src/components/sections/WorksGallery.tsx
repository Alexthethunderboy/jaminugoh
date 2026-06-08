'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Metadata } from '@/components/ui/typography';
import { useAppStore } from '@/lib/store';
import DistortedImage from '@/components/motion/DistortedImage';
import { urlForImage } from '@/sanity/lib/image';

gsap.registerPlugin(ScrollTrigger);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function WorksGallery({ projects }: { projects: any[] }) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const setCursorType = useAppStore((state) => state.setCursorType);

  useGSAP(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion || projects.length <= 1) return;

    const sections = gsap.utils.toArray('.project-card');
    
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => `+=${triggerRef.current?.offsetWidth}`,
      }
    });
  }, { scope: triggerRef, dependencies: [projects] });

  return (
    <div ref={triggerRef} className="overflow-hidden">
      <section 
        className="relative h-screen flex bg-obsidian"
        style={{ width: `${projects.length * 100}vw` }}
      >
        {projects.map((project, index) => {
          const posterUrl = typeof project.poster === 'string' 
            ? project.poster 
            : project.poster ? urlForImage(project.poster)?.url() : '';

          return (
            <div 
              key={project._id || index}
              className="project-card relative w-screen h-full flex items-center justify-center p-4 md:p-12 group"
              onMouseEnter={() => setCursorType('view')}
              onMouseLeave={() => setCursorType('default')}
            >
              {/* Project Number (Micro) */}
              <div className="absolute top-8 left-8 md:top-12 md:left-12">
                <Metadata className="text-silver/40">0{index + 1} / Project</Metadata>
              </div>

              {/* Content Wrapper */}
              <div className="relative w-full max-w-5xl h-full flex flex-col justify-center gap-6 md:gap-12">
                
                {/* Image/Video Container */}
                <div className="relative w-full aspect-[4/5] md:aspect-video overflow-hidden bg-charcoal rounded-sm">
                  <div className="w-full h-full group-hover:opacity-0 transition-opacity duration-500">
                    {posterUrl && <DistortedImage url={posterUrl} />}
                  </div>
                  {project.videoUrl && (
                    <video 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      preload="none"
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    >
                      <source src={project.videoUrl} type="video/mp4" />
                    </video>
                  )}
                </div>

                {/* Text Info */}
                <div className="text-left flex flex-col justify-center">
                  <div className="flex justify-between items-end">
                    <div>
                      <Metadata className="mb-2">{project.year} • {project.role}</Metadata>
                      <h2 className="text-[12vw] md:text-[8vw] font-display font-bold uppercase leading-[0.8] tracking-tighter text-silver">
                        {project.title}
                      </h2>
                    </div>
                    <button className="hidden md:flex items-center gap-4 text-micro group-hover:gap-6 transition-all opacity-0 group-hover:opacity-100">
                      <span>Explore</span>
                      <span className="w-8 h-[1px] bg-silver/40" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

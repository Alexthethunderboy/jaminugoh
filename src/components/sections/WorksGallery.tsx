'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Metadata } from '@/components/ui/typography';
import { useAppStore } from '@/lib/store';
import DistortedImage from '@/components/motion/DistortedImage';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "KAIROS",
    role: "Director",
    year: "2023",
    video: "https://assets.mixkit.co/videos/preview/mixkit-cinematic-view-of-a-mountain-valley-during-sunset-34504-large.mp4",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "ELCA TALES",
    role: "Cinematographer",
    year: "2022",
    video: "https://assets.mixkit.co/videos/preview/mixkit-underwater-view-of-a-man-swimming-in-the-sea-42037-large.mp4",
    poster: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "NOIR ECHO",
    role: "Director",
    year: "2024",
    video: "https://assets.mixkit.co/videos/preview/mixkit-driving-through-the-city-at-night-4240-large.mp4",
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "URBAN RHYTHM",
    role: "Writer",
    year: "2021",
    video: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-dense-city-at-night-42484-large.mp4",
    poster: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function WorksGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const setCursorType = useAppStore((state) => state.setCursorType);

  useGSAP(() => {
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
  }, { scope: triggerRef });

  return (
    <div ref={triggerRef} className="overflow-hidden">
      <section className="relative h-screen w-[400vw] flex bg-obsidian">
        {PROJECTS.map((project) => (
          <div 
            key={project.id}
            className="project-card relative w-screen h-full flex items-center justify-center p-8 md:p-24 group"
            onMouseEnter={() => setCursorType('view')}
            onMouseLeave={() => setCursorType('default')}
          >
            {/* Project Number (Micro) */}
            <div className="absolute top-12 left-12 md:top-24 md:left-24">
              <Metadata className="text-silver/40">0{project.id} / Project</Metadata>
            </div>

            {/* Content Wrapper */}
            <div className="relative w-full max-w-6xl h-full flex flex-col justify-center gap-8 md:gap-16">
              
              {/* Image/Video Container */}
              <div className="relative w-full aspect-[4/5] md:aspect-video overflow-hidden bg-charcoal rounded-sm">
                <div className="w-full h-full group-hover:opacity-0 transition-opacity duration-500">
                  <DistortedImage url={project.poster} />
                </div>
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                >
                  <source src={project.video} type="video/mp4" />
                </video>
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
        ))}
      </section>
    </div>
  );
}

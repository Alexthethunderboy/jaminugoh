'use client';

import React from 'react';
import { Metadata } from '@/components/ui/typography';
import { useAppStore } from '@/lib/store';
import TransitionLink from '@/components/layout/TransitionLink';
import { resolveProjectMedia } from '@/lib/media';
import { urlForImage } from '@/sanity/lib/image';

interface ProjectCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any;
  index: number;
  isHovered: boolean;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
}

export default function ProjectCard({
  project,
  index,
  isHovered,
  onHoverEnter,
  onHoverLeave,
}: ProjectCardProps) {
  const setCursorType = useAppStore((state) => state.setCursorType);
  const { posterUrl, videoUrl, youtubeUrl } = resolveProjectMedia(project);

  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered) {
      videoRef.current.play().catch(() => {
        // Ignore autoplay policy errors or abort errors
      });
    } else {
      videoRef.current.pause();
    }
  }, [isHovered]);

  const CardMediaContent = (
    <>
      <div className="w-full h-full">
        {posterUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={posterUrl} 
            alt={project.title || "Project poster"} 
          className={`w-full h-full object-cover transition-opacity duration-500 ${isHovered && videoUrl && !youtubeUrl ? 'opacity-0' : 'opacity-100'}`} 
        />
      )}
    </div>
    {videoUrl && !youtubeUrl && (
      <video 
        ref={videoRef}
        loop 
        muted 
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 pointer-events-none"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    )}
  </>
);

  return (
    <div 
      className="project-card relative w-screen h-[100dvh] shrink-0 flex items-center justify-center p-4 md:p-12 group/card"
      onMouseEnter={() => {
        setCursorType('view');
        onHoverEnter();
      }}
      onMouseLeave={() => {
        setCursorType('default');
        onHoverLeave();
      }}
    >
      {/* Project Number (Micro) */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12">
        <Metadata className="text-silver/40">0{index + 1} / Project</Metadata>
      </div>

      {/* Content Wrapper */}
      <div className="relative w-full max-w-5xl aspect-4/5 md:aspect-video group/card">
        
        {project.slug ? (
          <TransitionLink 
            href={`/projects/${project.slug}`} 
            className="block w-full h-full overflow-hidden bg-charcoal rounded-sm cursor-pointer z-10 relative" 
            onMouseEnter={() => setCursorType('play')} 
            onMouseLeave={() => setCursorType('view')}
          >
            {CardMediaContent}

            {/* Overlaid Text Info (Always visible now) */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 bg-linear-to-t from-obsidian/90 via-obsidian/20 to-transparent">
              <div className="flex justify-between items-end">
                <div>
                  <Metadata className="mb-2 text-silver/80">{project.year} • {project.role}</Metadata>
                  <h2 className="text-[12vw] md:text-[6vw] font-display font-bold uppercase leading-[0.85] tracking-tighter text-white drop-shadow-lg">
                    {project.title}
                  </h2>
                </div>
                <div className="hidden md:flex items-center gap-4 text-micro text-white opacity-60 group-hover/card:opacity-100 transition-opacity">
                  <span>Explore</span>
                  <span className="w-12 h-[1px] bg-white/60" />
                </div>
              </div>
            </div>
          </TransitionLink>
        ) : (
          <div className="relative w-full h-full overflow-hidden bg-charcoal rounded-sm z-10">
            {CardMediaContent}

            {/* Overlaid Text Info (No Link) */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 bg-linear-to-t from-obsidian/90 via-obsidian/20 to-transparent">
              <div className="flex justify-between items-end">
                <div>
                  <Metadata className="mb-2 text-silver/80">{project.year} • {project.role}</Metadata>
                  <h2 className="text-[12vw] md:text-[6vw] font-display font-bold uppercase leading-[0.85] tracking-tighter text-white drop-shadow-lg">
                    {project.title}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

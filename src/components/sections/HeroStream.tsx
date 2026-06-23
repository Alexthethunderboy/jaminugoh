'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAppStore } from '@/lib/store';
import { H1, Metadata } from '@/components/ui/typography';
import { urlForImage } from '@/sanity/lib/image';
import StarryBackground from '@/components/motion/StarryBackground';

interface HeroData {
  title: string;
  roles: string[];
  videoUrl?: string;
  videoFileUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  poster?: any;
  posterUrl?: string;
}

export default function HeroStream({ data }: { data: HeroData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  
  const setCursorType = useAppStore((state) => state.setCursorType);

  const finalPosterUrl = data.posterUrl || (typeof data.poster === 'string' 
    ? data.poster 
    : data.poster ? urlForImage(data.poster)?.url() : undefined);
    
  const finalVideoUrl = data.videoFileUrl || data.videoUrl;

  useGSAP(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const bgMedia = containerRef.current?.querySelector('.hero-bg-media');

    if (isReducedMotion) {
      if (bgMedia) gsap.set(bgMedia, { scale: 1, filter: "blur(0px)", opacity: 1, clearProps: "filter" });
      gsap.set(".char", { y: 0, opacity: 1, rotateX: 0 });
      if (metadataRef.current) gsap.set(metadataRef.current, { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Entry Animation
    if (bgMedia) {
      tl.fromTo(
        bgMedia,
        { scale: 1.15, filter: "blur(20px)", opacity: 0 },
        { scale: 1, filter: "blur(0px)", opacity: 1, duration: 2.5, clearProps: "filter" }
      );
    }

    tl.fromTo(
      ".char",
      { y: 150, opacity: 0, rotateX: -90 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.5, stagger: 0.04 },
      bgMedia ? "-=1.8" : 0
    )
    .fromTo(
      metadataRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2 },
      "-=1.2"
    );

    // Ambient Pan/Scale
    if (bgMedia) {
      gsap.to(bgMedia, {
        scale: 1.15,
        duration: 20,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });
    }

    // Parallax Mouse Effect
    const handleMouseParallax = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

      gsap.to(titleRef.current, {
        x: xPos,
        y: yPos,
        rotateY: xPos * 0.1,
        rotateX: -yPos * 0.1,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseParallax);
    return () => window.removeEventListener('mousemove', handleMouseParallax);
  }, { scope: containerRef });

  React.useEffect(() => {
    if (finalVideoUrl && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Suppress unhandled rejection on fast navigations
      });
    }
  }, [finalVideoUrl]);

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block will-change-transform" style={{ transformOrigin: '50% 100%' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-obsidian flex flex-col justify-center items-center"
      onMouseEnter={() => setCursorType('play')}
      onMouseLeave={() => setCursorType('default')}
    >
      {/* Background Video or Stars */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {finalVideoUrl ? (
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            className="hero-bg-media w-full h-full object-cover origin-center opacity-0"
            poster={finalPosterUrl}
          >
            <source src={finalVideoUrl} type="video/mp4" />
          </video>
        ) : finalPosterUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img 
            src={finalPosterUrl} 
            alt="Hero Background" 
            className="hero-bg-media w-full h-full object-cover origin-center opacity-0" 
          />
        ) : (
          <StarryBackground />
        )}
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 flex flex-col items-center pointer-events-none text-center px-4 w-full -mt-[12px]">
        <H1 
          ref={titleRef} 
          className="text-[12vw] text-center text-silver drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] [text-shadow:0_4px_24px_rgba(0,0,0,0.5),_0_0_2px_rgba(0,0,0,1)]" 
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
          {splitText(data.title)}
        </H1>
        
        <div ref={metadataRef} className="-mt-2 md:-mt-6 flex flex-wrap justify-center gap-4 md:gap-8 opacity-0 [text-shadow:0_1px_3px_rgba(0,0,0,0.8),_0_0_1px_rgba(0,0,0,1)]">
          {data.roles?.map((role, idx) => (
            <React.Fragment key={idx}>
              <Metadata>{role}</Metadata>
              {idx < data.roles.length - 1 && (
                <span className="hidden md:block w-[3px] h-[3px] rounded-full bg-silver/30 self-center" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import NativeYoutubeEmbed from './NativeYoutubeEmbed';

interface ClientHeroVideoProps {
  youtubeUrl: string | null;
  videoUrl: string | null;
  posterUrl: string | null;
  title?: string;
}

export default function ClientHeroVideo({ youtubeUrl, videoUrl, posterUrl, title }: ClientHeroVideoProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoUrl && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Suppress unhandled rejection on fast navigations
      });
    }
  }, [videoUrl]);

  if (youtubeUrl) {
    return (
      <div className="absolute inset-0 overflow-hidden w-full h-full opacity-60">
        <div className="w-full h-full transform scale-[1.35] md:scale-[1.15] pointer-events-none">
          <NativeYoutubeEmbed 
            url={youtubeUrl}
            autoplay={true}
            muted={true}
            loop={true}
            controls={false}
          />
        </div>
      </div>
    );
  }


  if (videoUrl) {
    return (
      <video 
        ref={videoRef}
        loop 
        muted 
        playsInline
        className="w-full h-full object-cover opacity-60"
        poster={posterUrl || undefined}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    );
  }

  if (posterUrl) {
    /* eslint-disable-next-line @next/next/no-img-element */
    return (
      <img 
        src={posterUrl} 
        alt={title || 'Project Background'} 
        className="w-full h-full object-cover opacity-60"
      />
    );
  }

  return null;
}

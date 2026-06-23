'use client';

import React from 'react';
interface ClientHeroVideoProps {
  videoUrl?: string | null;
  posterUrl?: string | null;
  title?: string;
}

export default function ClientHeroVideo({ videoUrl, posterUrl, title }: ClientHeroVideoProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoUrl && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Suppress unhandled rejection on fast navigations
      });
    }
  }, [videoUrl]);
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

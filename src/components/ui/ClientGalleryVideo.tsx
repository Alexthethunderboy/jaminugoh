'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface ClientGalleryVideoProps {
  videoUrl: string;
  posterUrl: string;
}

export default function ClientGalleryVideo({ videoUrl, posterUrl }: ClientGalleryVideoProps) {
  const isYoutube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');

  if (isYoutube) {
    return (
      <div className="w-full aspect-video bg-black rounded-sm overflow-hidden">
        <ReactPlayer 
          url={videoUrl}
          controls={true}
          width="100%"
          height="100%"
          light={posterUrl ? posterUrl : true}
        />
      </div>
    );
  }

  return (
    <video 
      autoPlay={false}
      controls
      playsInline
      className="w-full h-auto object-cover rounded-sm"
      poster={posterUrl || undefined}
    >
      <source src={videoUrl} type="video/mp4" />
    </video>
  );
}

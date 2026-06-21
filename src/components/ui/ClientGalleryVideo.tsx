'use client';

import React from 'react';
import NativeYoutubeEmbed from './NativeYoutubeEmbed';

interface ClientGalleryVideoProps {
  videoUrl: string;
  posterUrl: string;
}

export default function ClientGalleryVideo({ videoUrl, posterUrl }: ClientGalleryVideoProps) {
  const isYoutube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');

  if (isYoutube) {
    return (
      <div className="w-full aspect-video bg-black rounded-sm overflow-hidden">
        <NativeYoutubeEmbed 
          url={videoUrl}
          controls={true}
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

import React from 'react';

interface NativeYoutubeEmbedProps {
  url: string;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
  className?: string;
}

function getYoutubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function NativeYoutubeEmbed({ 
  url, 
  autoplay = false, 
  muted = false, 
  controls = true,
  loop = false,
  className = "" 
}: NativeYoutubeEmbedProps) {
  const videoId = getYoutubeId(url);

  if (!videoId) {
    return <div className={`bg-black/50 flex items-center justify-center text-white/50 ${className}`}>Invalid YouTube URL</div>;
  }

  // Build the embed query string
  const params = new URLSearchParams();
  // Dynamic autoplay is handled via postMessage below.
  if (muted) params.append('mute', '1');
  if (!controls) params.append('controls', '0');
  if (loop) {
    params.append('loop', '1');
    params.append('playlist', videoId); // Required for looping single videos
  }
  params.append('modestbranding', '1');
  params.append('rel', '0');
  params.append('playsinline', '1');
  params.append('enablejsapi', '1'); // Enable postMessage API

  // We set autoplay=1 in the URL ONLY if it's initially true, 
  // but to prevent iframe reloading on hover, we use a ref and postMessage for updates.
  const [initialAutoplay] = React.useState(autoplay);
  if (initialAutoplay) params.append('autoplay', '1');

  const embedUrl = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;

  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    
    // Only post message if it differs from initial mount to avoid double-playing
    const command = autoplay ? 'playVideo' : 'pauseVideo';
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func: command, args: [] }),
      '*'
    );
  }, [autoplay]);

  return (
    <iframe
      ref={iframeRef}
      className={`w-full h-full ${className}`}
      src={embedUrl}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
}

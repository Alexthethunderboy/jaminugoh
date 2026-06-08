'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Play, Pause, X } from 'lucide-react';
import gsap from 'gsap';

export default function AudioPlayer() {
  const { currentTrack, isPlaying, togglePlay, stopTrack } = useAppStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Handle play/pause commands from the store
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.error("Audio playback error:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  // Handle Entrance / Exit animation
  useEffect(() => {
    if (currentTrack) {
      gsap.to(containerRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', display: 'flex' });
    } else {
      gsap.to(containerRef.current, { y: 20, opacity: 0, duration: 0.5, ease: 'power3.in', display: 'none' });
      setProgress(0);
    }
  }, [currentTrack]);

  // Handle time update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration > 0) {
        setProgress((current / duration) * 100);
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-charcoal/90 backdrop-blur-xl border border-white/10 z-[300] hidden items-center justify-between gap-6 px-4 py-2 rounded-full shadow-2xl transform translate-y-8 opacity-0 w-64 md:w-80"
      onMouseEnter={() => useAppStore.getState().setCursorType('default')}
    >
      {/* Hidden Audio Element */}
      {currentTrack && (
        <audio 
          ref={audioRef}
          src={currentTrack.url}
          onTimeUpdate={handleTimeUpdate}
          onEnded={stopTrack}
        />
      )}

      {/* Progress Background */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none -z-10">
        <div 
          className="h-full bg-white/5 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Track Info */}
      <div className="flex flex-col overflow-hidden whitespace-nowrap">
        <span className="text-[8px] text-silver/60 uppercase tracking-widest font-mono">Sonic Lab</span>
        <span className="text-xs text-white font-bold truncate">{currentTrack?.title}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button onClick={togglePlay} className="text-silver hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">
          {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
        </button>
        <button onClick={stopTrack} className="text-silver/40 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

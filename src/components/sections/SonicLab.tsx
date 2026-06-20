'use client';

import React from 'react';
import { Metadata } from '@/components/ui/typography';
import { Play, Pause } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export interface SonicLabTrack {
  _id?: string;
  title?: string;
  audioUrl?: string;
  fileUrl?: string;
  url?: string;
  duration?: string;
  category?: string;
}

export default function SonicLab({ tracks }: { tracks: SonicLabTrack[] }) {
  const { currentTrack, isPlaying, playTrack, togglePlay, setCursorType } = useAppStore();

  const handleTrackClick = (track: SonicLabTrack, index: number) => {
    const isThisTrack = currentTrack?.id === (track._id || index.toString());
    
    if (isThisTrack) {
      togglePlay();
    } else {
      playTrack({
        id: track._id || index.toString(),
        title: track.title,
        url: track.audioUrl || track.fileUrl || track.url || "", // Adjust based on your sanity query
        duration: track.duration,
        category: track.category
      });
    }
  };

  return (
    <section className="relative min-h-screen bg-obsidian py-16 px-8 md:px-24">
      <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
        <Metadata className="mb-8">03 / The Sonic Lab</Metadata>
        <h2 className="text-h1 mb-16 text-silver">Audio<br/>Scapes</h2>
        
        <div className="space-y-4">
          {tracks.map((track, i) => {
            const isThisTrack = currentTrack?.id === (track._id || i.toString());
            const isTrackPlaying = isThisTrack && isPlaying;

            return (
              <div 
                key={track._id || i}
                className="group flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 border border-silver/5 hover:border-silver/20 hover:bg-white/[0.02] transition-all cursor-pointer gap-6 md:gap-0"
                onClick={() => handleTrackClick(track, i)}
                onMouseEnter={() => setCursorType('audio')}
                onMouseLeave={() => setCursorType('default')}
              >
                <div className="flex items-center gap-6 md:gap-12">
                  <span className="font-mono text-[10px] md:text-micro text-silver/30">0{i + 1}</span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-display font-bold uppercase text-silver group-hover:text-white transition-colors">
                      {track.title}
                    </h3>
                    <Metadata className="mt-1 md:mt-2 text-silver/40">{track.category}</Metadata>
                  </div>
                </div>
                
                <div className="flex items-center justify-between md:justify-end gap-6 md:gap-8">
                  {/* Minimal Waveform Animation (Fake) */}
                  <div className="flex items-end gap-[2px] h-6 md:h-8">
                    {[...Array(10)].map((_, j) => (
                      <div 
                        key={j}
                        className={`w-[2px] bg-silver/20 transition-all duration-300 ${
                          isTrackPlaying ? 'animate-pulse bg-white/60' : ''
                        }`}
                        style={{ 
                          height: isTrackPlaying ? `${Math.random() * 100}%` : '20%',
                          animationDelay: `${j * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-micro text-silver/40 w-12 text-right">
                      {track.duration}
                    </span>
                    
                    <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-silver/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all shrink-0">
                      {isTrackPlaying ? (
                        <Pause size={14} className="text-silver group-hover:text-black" />
                      ) : (
                        <Play size={14} className="text-silver group-hover:text-black translate-x-[1px]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

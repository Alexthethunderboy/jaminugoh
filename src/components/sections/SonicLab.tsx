'use client';

import React, { useState } from 'react';
import { Metadata } from '@/components/ui/typography';
import { Play, Pause } from 'lucide-react';
import { useAppStore } from '@/lib/store';

const TRACKS = [
  { title: "KAIROS SCORE", duration: "03:42", category: "Film Score" },
  { title: "URBAN ECHOES", duration: "02:15", category: "Experimental" },
  { title: "LAGOS NIGHTS", duration: "04:10", category: "Atmospheric" }
];

export default function SonicLab() {
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const setCursorType = useAppStore((state) => state.setCursorType);

  return (
    <section className="relative min-h-screen bg-obsidian py-24 px-8 md:px-24">
      <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
        <Metadata className="mb-12">03 / The Sonic Lab</Metadata>
        <h2 className="text-h1 mb-24 text-silver">Audio<br/>Scapes</h2>
        
        <div className="space-y-4">
          {TRACKS.map((track, i) => (
            <div 
              key={i}
              className="group flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 border border-silver/5 hover:border-silver/20 hover:bg-white/[0.02] transition-all cursor-pointer gap-6 md:gap-0"
              onClick={() => setPlayingTrack(playingTrack === i ? null : i)}
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
                        playingTrack === i ? 'animate-pulse' : ''
                      }`}
                      style={{ 
                        height: playingTrack === i ? `${Math.random() * 100}%` : '20%',
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
                    {playingTrack === i ? (
                      <Pause size={14} className="text-silver group-hover:text-black" />
                    ) : (
                      <Play size={14} className="text-silver group-hover:text-black translate-x-[1px]" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

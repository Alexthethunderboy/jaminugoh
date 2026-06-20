import React from 'react';
import { client } from '@/sanity/lib/client';
import { audioTracksQuery } from '@/sanity/lib/queries';
import { H1, Metadata } from '@/components/ui/typography';
import AudioScapesList from '@/components/sections/audio/AudioScapesList';
import { SonicLabTrack } from '@/components/sections/SonicLab';

export const revalidate = 30;

export default async function AudioPage() {
  let tracks: SonicLabTrack[] = [];

  try {
    const config = client.config();
    if (config.projectId && config.projectId !== 'dummy-project-id') {
      const fetchedTracks = await client.fetch(audioTracksQuery);
      if (fetchedTracks && fetchedTracks.length > 0) {
        tracks = fetchedTracks;
      }
    }
  } catch (error) {
    console.error("Failed to fetch sanity audio tracks:", error);
  }

  return (
    <main className="min-h-screen bg-obsidian text-silver pt-32 pb-24 px-4 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-24 text-center md:text-left">
          <Metadata className="mb-4 text-silver/60">The Sonic Lab</Metadata>
          <H1 className="text-[12vw] md:text-[8vw] font-display font-bold uppercase leading-none tracking-tighter text-white">
            Audio Scapes
          </H1>
        </header>

        <AudioScapesList tracks={tracks} />
      </div>
      
      {/* Background Stylized Element */}
      <div className="fixed bottom-0 right-0 p-24 opacity-5 pointer-events-none z-0">
        <span className="text-[30vw] font-display font-black leading-none">AUDIO</span>
      </div>
    </main>
  );
}

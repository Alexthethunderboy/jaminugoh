import React from 'react';
import { client } from '@/sanity/lib/client';
import { screenplaysQuery } from '@/sanity/lib/queries';
import { H1, Metadata } from '@/components/ui/typography';

export const revalidate = 30;

export interface Screenplay {
  _id?: string;
  title?: string;
  type?: string;
  status?: string;
  logline?: string;
}

export default async function ScreenplaysPage() {
  let screenplays: Screenplay[] = [];

  try {
    const config = client.config();
    if (config.projectId && config.projectId !== 'dummy-project-id') {
      const fetchedScreenplays = await client.fetch(screenplaysQuery);
      if (fetchedScreenplays && fetchedScreenplays.length > 0) {
        screenplays = fetchedScreenplays;
      }
    }
  } catch (error) {
    console.error("Failed to fetch sanity screenplays:", error);
  }

  return (
    <main className="min-h-screen bg-obsidian text-silver pt-32 pb-24 px-4 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-24 text-center md:text-left">
          <Metadata className="mb-4 text-silver/60">Screenplays & Concepts</Metadata>
          <H1 className="text-[12vw] md:text-[8vw] font-display font-bold uppercase leading-none tracking-tighter text-white">
            The Vault
          </H1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {screenplays.map((script, i) => (
            <div key={script._id || i} className="group relative border-t border-silver/10 pt-12 hover:border-silver/40 transition-colors bg-obsidian/50 p-6 -mx-6 md:mx-0 md:bg-transparent md:p-0">
              <div className="flex justify-between items-start mb-8">
                <Metadata>{script.type} • {script.status}</Metadata>
                <div className="w-12 h-[1px] bg-silver/20" />
              </div>
              
              <h3 className="text-[5vw] font-display font-bold uppercase mb-6 group-hover:text-white transition-colors">
                {script.title}
              </h3>
              
              <p className="font-mono text-body text-silver/50 max-w-md leading-relaxed mb-12">
                {script.logline}
              </p>
              
              <button className="flex items-center gap-4 text-micro group-hover:gap-6 transition-all">
                <span>View Script Treatment</span>
                <span className="w-8 h-[1px] bg-silver/40" />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background Stylized Element */}
      <div className="fixed bottom-0 right-0 p-24 opacity-5 pointer-events-none z-0">
        <span className="text-[30vw] font-display font-black leading-none">SCRIPT</span>
      </div>
    </main>
  );
}

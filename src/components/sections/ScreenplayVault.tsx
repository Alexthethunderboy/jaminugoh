'use client';

import React from 'react';
import { Metadata } from '@/components/ui/typography';

const SCRIPTS = [
  {
    title: "KAIROS",
    type: "Short Film",
    logline: "In a world where time is a currency, one man risks everything to buy a single hour with his past.",
    status: "Produced"
  },
  {
    title: "MIDNIGHT IN LAGOS",
    type: "Feature",
    logline: "An aspiring jazz musician uncovers a high-stakes conspiracy in the heart of Lagos.",
    status: "In Development"
  }
];

export default function ScreenplayVault() {
  return (
    <section className="relative min-h-screen bg-[#080808] py-24 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <Metadata className="mb-12">02 / The Writing</Metadata>
        <h2 className="text-h1 mb-24 mix-blend-difference text-silver">Screenplay<br/>Vault</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {SCRIPTS.map((script, i) => (
            <div key={i} className="group relative border-t border-silver/10 pt-12 hover:border-silver/40 transition-colors">
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
      <div className="absolute bottom-0 right-0 p-24 opacity-5 pointer-events-none">
        <span className="text-[30vw] font-display font-black leading-none">SCRIPT</span>
      </div>
    </section>
  );
}

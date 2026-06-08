'use client';

import React, { useState } from 'react';
import ScreenplayViewer from '@/components/ui/ScreenplayViewer';
import { BookOpen } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function ScreenplayTrigger({ scriptUrl }: { scriptUrl?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const setCursorType = useAppStore((state) => state.setCursorType);

  if (!scriptUrl) return null;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setCursorType('view')}
        onMouseLeave={() => setCursorType('default')}
        className="mt-8 mx-auto flex items-center justify-center gap-3 px-8 py-4 border border-silver/20 rounded-full text-silver hover:text-white hover:bg-white/5 transition-all duration-300 font-mono text-sm tracking-widest uppercase hover:scale-105"
      >
        <BookOpen size={18} />
        Read Screenplay
      </button>
      <ScreenplayViewer url={scriptUrl} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

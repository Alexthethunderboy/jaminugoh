'use client';

import React, { useState, useEffect } from 'react';
import ScreenplayViewer from '@/components/ui/ScreenplayViewer';
import ScreenplayEmailModal from '@/components/ui/ScreenplayEmailModal';
import { BookOpen } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function ScreenplayTrigger({ scriptUrl }: { scriptUrl?: string }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const setCursorType = useAppStore((state) => state.setCursorType);

  useEffect(() => {
    const subscribed = localStorage.getItem('hasSubscribed') === 'true';
    if (subscribed) setHasSubscribed(true);
  }, []);

  if (!scriptUrl) return null;

  const handleClick = () => {
    if (hasSubscribed) {
      setIsViewerOpen(true);
    } else {
      setIsEmailModalOpen(true);
    }
  };

  const handleSubscribeSuccess = () => {
    setHasSubscribed(true);
    setIsViewerOpen(true);
  };

  return (
    <>
      <button 
        onClick={handleClick}
        onMouseEnter={() => setCursorType('view')}
        onMouseLeave={() => setCursorType('default')}
        className="mt-8 mx-auto flex items-center justify-center gap-3 px-8 py-4 border border-silver/20 rounded-full text-silver hover:text-white hover:bg-white/5 transition-all duration-300 font-mono text-sm tracking-widest uppercase hover:scale-105"
      >
        <BookOpen size={18} />
        Read Screenplay
      </button>

      <ScreenplayEmailModal 
        isOpen={isEmailModalOpen} 
        onClose={() => setIsEmailModalOpen(false)} 
        onSuccess={handleSubscribeSuccess}
        scriptUrl={scriptUrl}
      />

      <ScreenplayViewer 
        url={scriptUrl} 
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
      />
    </>
  );
}

'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import VideoPreviewModal from './VideoPreviewModal';

interface PlayVideoButtonProps {
  videoUrl: string;
  youtubeUrl?: string;
}

export default function PlayVideoButton({ videoUrl, youtubeUrl }: PlayVideoButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Use youtubeUrl if available, otherwise fallback to videoUrl (MP4 file)
  const previewUrl = youtubeUrl || videoUrl;

  if (!previewUrl) return null;

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={() => setIsOpen(true)}
        className="mt-8 mx-auto flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full transition-all duration-300 ring-1 ring-white/20 hover:ring-white/40 group"
      >
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-charcoal group-hover:scale-110 transition-transform duration-300">
          <Play size={18} className="ml-1" fill="currentColor" />
        </span>
        <span className="text-sm font-medium tracking-widest uppercase">Watch Preview</span>
      </motion.button>

      <VideoPreviewModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        videoUrl={previewUrl} 
      />
    </>
  );
}

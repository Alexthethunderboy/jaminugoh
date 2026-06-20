'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface VideoPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export default function VideoPreviewModal({ isOpen, onClose, videoUrl }: VideoPreviewModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/90 backdrop-blur-md p-4 md:p-8"
          onClick={onClose}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 md:top-8 md:right-8 z-50 p-2 bg-charcoal/50 hover:bg-charcoal text-silver hover:text-white rounded-full transition-all duration-300"
            aria-label="Close video"
          >
            <X size={24} />
          </button>

          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative w-full max-w-6xl aspect-video bg-black rounded-lg shadow-2xl overflow-hidden ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the player
          >
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="100%"
              playing={isOpen}
              controls={true}
              fallback={<div className="w-full h-full flex items-center justify-center text-silver">Loading player...</div>}
              config={{
                youtube: {
                  // @ts-expect-error react-player types are slightly outdated
                  playerVars: { autoplay: 1, modestbranding: 1, rel: 0 }
                }
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import NativeYoutubeEmbed from './NativeYoutubeEmbed';
import { isYoutubeLink } from '@/lib/media';

const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2h15a2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z"/><path d="m10 15 5-3-5-3v6Z"/>
  </svg>
);

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

  if (!mounted || typeof document === 'undefined') return null;

  const modalContent = (
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
          <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50 flex items-center gap-3">
            {videoUrl && (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) && (
              <a 
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#FF0000] hover:bg-red-700 text-white font-bold rounded-full text-sm transition-colors shadow-lg flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <YoutubeIcon size={18} />
                Watch on YouTube
              </a>
            )}
            <button 
              onClick={onClose}
              className="p-2 bg-charcoal/50 hover:bg-charcoal text-silver hover:text-white rounded-full transition-all duration-300"
              aria-label="Close video"
            >
              <X size={24} />
            </button>
          </div>

          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative w-full max-w-6xl aspect-video bg-black rounded-lg shadow-2xl overflow-hidden ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the player
          >
            {isYoutubeLink(videoUrl) ? (
              <NativeYoutubeEmbed 
                url={videoUrl}
                autoplay={true}
                controls={true}
                className="absolute top-0 left-0"
              />
            ) : (
              <video 
                src={videoUrl} 
                autoPlay 
                controls 
                className="absolute top-0 left-0 w-full h-full object-contain"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

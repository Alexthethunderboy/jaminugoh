'use client';

import React from 'react';
import { Mail, Video } from 'lucide-react';
import { useAppStore } from '@/lib/store';

// Custom SVG Icons for Brands (Lucide 1.0 removed them)
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2h15a2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z"/><path d="m10 15 5-3-5-3v6Z"/>
  </svg>
);

const SOCIALS = [
  { name: 'Instagram', icon: <InstagramIcon size={18} />, href: 'https://www.instagram.com/jaminugoh/' },
  { name: 'Mail', icon: <Mail size={18} />, href: 'mailto:Benjaminugoh@gmail.com' },
  { name: 'Vimeo', icon: <Video size={18} />, href: '#' },
  { name: 'YouTube', icon: <YoutubeIcon size={18} />, href: '#' },
];

export default function FloatingNav() {
  const setCursorType = useAppStore((state) => state.setCursorType);

  return (
    <nav className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both w-[max-content]">
      <div className="flex items-center gap-1 md:gap-2 p-1.5 md:p-2 bg-charcoal/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
        {SOCIALS.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full text-silver/60 hover:text-white transition-all duration-300 hover:bg-white/5"
            onMouseEnter={() => setCursorType('view')}
            onMouseLeave={() => setCursorType('default')}
          >
            {social.icon}
            
            {/* Tooltip */}
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-black text-[8px] font-mono font-bold uppercase tracking-widest rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {social.name}
            </span>
          </a>
        ))}
        
        <div className="w-[1px] h-6 bg-white/10 mx-1 md:mx-2" />
        
        <a 
          href="mailto:Benjaminugoh@gmail.com"
          className="px-4 md:px-6 py-2 bg-white text-black text-[8px] md:text-[10px] font-mono font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform whitespace-nowrap"
          onMouseEnter={() => setCursorType('view')}
          onMouseLeave={() => setCursorType('default')}
        >
          <span className="hidden md:inline">Work With Me</span>
          <span className="md:hidden">Contact</span>
        </a>
      </div>
    </nav>
  );
}

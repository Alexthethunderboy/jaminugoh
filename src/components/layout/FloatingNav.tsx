'use client';

import React from 'react';
import { Mail, Link as LinkIcon } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import TransitionLink from './TransitionLink';

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

const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const LinkedInIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const VimeoIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.396 7.164c-.093 2.026-1.507 4.8-4.245 8.32C15.323 19.16 12.93 21 11.003 21c-1.332 0-2.44-3.23-3.304-9.692C7.169 7.425 6.64 5.485 5.56 5.485c-.236 0-1.007.507-2.314 1.519L2 5.672C3.513 4.385 5.093 2.94 6.25 2.654c1.604-.401 2.628.375 3.073 2.327 1.092 6.845 1.54 9.141 2.308 9.141.536 0 1.705-2.022 2.502-4.043.901-2.296.901-4.043 0-5.246-1.464-1.954-4.577-1.127-4.577-1.127s.945-3.084 4.545-3.41c3.21-.293 5.441 1.002 5.56 4.352"/>
  </svg>
);

// Map common platforms to their icons
const getSocialIcon = (platform: string, size = 18) => {
  if (!platform) return <LinkIcon size={size} />;
  const p = platform.toLowerCase();
  if (p.includes('instagram')) return <InstagramIcon size={size} />;
  if (p.includes('youtube')) return <YoutubeIcon size={size} />;
  if (p.includes('twitter') || p.includes('x')) return <TwitterIcon size={size} />;
  if (p.includes('linkedin')) return <LinkedInIcon size={size} />;
  if (p.includes('vimeo')) return <VimeoIcon size={size} />;
  
  // Fallback icon for any other platform
  return <LinkIcon size={size} />;
};

export interface SocialLink {
  platform: string;
  url: string;
}

export interface GlobalSettingsData {
  headshot?: unknown;
  bio?: unknown;
  clientRoster?: string[];
  email?: string;
  socialLinks?: SocialLink[];
  [key: string]: unknown;
}

export default function FloatingNav({ data }: { data?: GlobalSettingsData }) {
  const { setCursorType, toggleInfo } = useAppStore();

  const displaySocials = [];
  
  if (data?.socialLinks) {
    data.socialLinks.forEach((s: SocialLink) => {
      displaySocials.push({
        name: s.platform,
        icon: getSocialIcon(s.platform, 18),
        href: s.url
      });
    });
  }

  if (data?.email) {
    displaySocials.push({ name: 'Mail', icon: <Mail size={18} />, href: `mailto:${data.email}` });
  }

  const contactEmail = data?.email ? `mailto:${data.email}` : "mailto:Benjaminugoh@gmail.com";

  return (
    <nav className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both w-[98vw] max-w-[95vw] md:w-[max-content]">
      <div className="flex items-center justify-between md:justify-center max-[360px]:gap-0 gap-0.5 md:gap-2 max-[360px]:p-0.5 p-1 md:p-2 bg-charcoal/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl mx-auto w-full md:w-auto overflow-x-auto no-scrollbar">
        {displaySocials.map((social, index) => (
          <a
            key={`${social.name}-${index}`}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center max-[360px]:w-6 max-[360px]:h-6 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 shrink-0 rounded-full text-silver/60 hover:text-white transition-all duration-300 hover:bg-white/5"
            onMouseEnter={() => setCursorType('view')}
            onMouseLeave={() => setCursorType('default')}
          >
            <div className="scale-75 sm:scale-100 flex items-center justify-center">{social.icon}</div>
            
            {/* Tooltip */}
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-black text-[8px] font-mono font-bold uppercase tracking-widest rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden md:block">
              {social.name}
            </span>
          </a>
        ))}
        
        <div className="w-[1px] h-3 sm:h-4 md:h-6 bg-white/10 max-[360px]:mx-0 mx-0.5 md:mx-2 shrink-0" />
        
        <TransitionLink 
          href="/archive"
          className="max-[360px]:px-1.5 px-2 sm:px-3 md:px-4 py-1.5 md:py-2 text-silver/60 hover:text-white max-[360px]:text-[7px] text-[8px] sm:text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-widest transition-colors whitespace-nowrap"
          onMouseEnter={() => setCursorType('view')}
          onMouseLeave={() => setCursorType('default')}
        >
          Archive
        </TransitionLink>

        <button 
          onClick={toggleInfo}
          className="max-[360px]:px-1.5 px-2 sm:px-3 md:px-4 py-1.5 md:py-2 text-silver/60 hover:text-white max-[360px]:text-[7px] text-[8px] sm:text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-widest transition-colors whitespace-nowrap"
          onMouseEnter={() => setCursorType('view')}
          onMouseLeave={() => setCursorType('default')}
        >
          Info
        </button>

        <a 
          href={contactEmail}
          className="max-[360px]:px-2.5 px-3 sm:px-4 md:px-6 py-1.5 md:py-2 bg-white text-black max-[360px]:text-[7px] text-[8px] sm:text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform whitespace-nowrap ml-0.5 md:ml-2 shrink-0"
          onMouseEnter={() => setCursorType('view')}
          onMouseLeave={() => setCursorType('default')}
        >
          <span className="hidden sm:inline">Work With Me</span>
          <span className="sm:hidden">Contact</span>
        </a>
      </div>
    </nav>
  );
}

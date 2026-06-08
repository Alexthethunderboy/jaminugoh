'use client';

import React, { useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store';
import gsap from 'gsap';
import { X } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { urlForImage } from '@/sanity/lib/image';
import ContactForm from '@/components/ui/ContactForm';

import { GlobalSettingsData, SocialLink } from './FloatingNav';

export default function InfoDrawer({ data }: { data: GlobalSettingsData | null | undefined }) {
  const { isInfoOpen, toggleInfo } = useAppStore();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInfoOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.5, display: 'block', ease: 'power2.out' });
      gsap.to(drawerRef.current, { x: 0, duration: 0.7, ease: 'power4.out' });
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.5, display: 'none', ease: 'power2.in' });
      gsap.to(drawerRef.current, { x: '100%', duration: 0.5, ease: 'power3.in' });
      document.body.style.overflow = '';
    }
  }, [isInfoOpen]);

  const displayData = data || {};
  const hasContent = !!displayData.bio || !!displayData.headshot || (displayData.clientRoster?.length ?? 0) > 0 || !!displayData.email || (displayData.socialLinks?.length ?? 0) > 0;

  const headshotUrl = displayData.headshot 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? urlForImage(displayData.headshot as any)?.url() 
    : null;

  return (
    <>
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-obsidian/80 backdrop-blur-sm z-[200] hidden opacity-0"
        onClick={toggleInfo}
      />

      {/* Drawer */}
      <div 
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-charcoal z-[210] translate-x-full shadow-2xl flex flex-col overflow-y-auto"
      >
        <button 
          onClick={toggleInfo}
          className="absolute top-6 right-6 md:top-8 md:right-8 text-silver hover:text-white transition-colors z-10"
        >
          <X size={28} />
        </button>

        <div className="p-8 md:p-12 mt-12 flex-1 flex flex-col">
          
          {!hasContent ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-silver/60">
              <p className="font-mono text-sm uppercase tracking-widest mb-4">Drawer Empty</p>
              <p className="text-xl">Please configure your <b>Global Settings</b> in Sanity Studio to populate your Bio, Headshot, and Clients here.</p>
            </div>
          ) : (
            <>
              {/* Headshot */}
              {headshotUrl && (
                <div className="w-full aspect-[4/5] md:aspect-square mb-12 overflow-hidden rounded-sm bg-obsidian shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={headshotUrl} alt="Portrait" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Bio */}
              {displayData.bio && (
                <div className="prose prose-invert prose-p:text-silver/80 prose-headings:text-silver max-w-none mb-16">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <PortableText value={displayData.bio as any} />
                </div>
              )}

              {/* Client Roster */}
              {displayData.clientRoster && displayData.clientRoster.length > 0 && (
                <div className="mb-16">
                  <h3 className="text-micro text-silver/40 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Selected Clients & Awards</h3>
                  <ul className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm text-silver/80">
                    {displayData.clientRoster.map((client: string, i: number) => (
                      <li key={i}>{client}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact / Socials */}
              {displayData.socialLinks && displayData.socialLinks.length > 0 && (
                <div className="mt-auto pt-12 border-t border-white/10">
                  <h3 className="text-micro text-silver/40 uppercase tracking-widest mb-6">Socials</h3>
                  <div className="flex gap-6 mt-8">
                    {displayData.socialLinks.map((social: SocialLink, i: number) => (
                      <a 
                        key={i} 
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-micro text-silver hover:text-white uppercase tracking-widest transition-colors"
                      >
                        {social.platform}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ALWAYS show the Contact Form regardless of Sanity config */}
          <div className={`pt-12 mt-12 ${hasContent ? 'border-t border-white/10' : ''}`}>
            <h3 className="text-micro text-silver/40 uppercase tracking-widest mb-6">Direct Inquiry</h3>
            <ContactForm />
          </div>

        </div>
      </div>
    </>
  );
}

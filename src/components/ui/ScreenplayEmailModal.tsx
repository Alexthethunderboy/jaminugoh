'use client';

import React, { useState, useEffect } from 'react';
import { X, Loader2, BookOpen } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useAppStore } from '@/lib/store';

interface ScreenplayEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  scriptUrl: string;
}

export default function ScreenplayEmailModal({ isOpen, onClose, onSuccess, scriptUrl }: ScreenplayEmailModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setCursorType = useAppStore((state) => state.setCursorType);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Save to Sanity
      const sanityRes = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Screenplay Download' }),
      });

      if (!sanityRes.ok) {
        throw new Error('Failed to save subscription.');
      }

      // 2. Send Email via EmailJS
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_SCREENPLAY;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            to_email: email,
            script_url: scriptUrl,
          },
          publicKey
        );
      } else {
        console.warn('EmailJS vars missing. Simulated email send.');
      }

      // 3. Save flag in local storage and trigger success
      localStorage.setItem('hasSubscribed', 'true');
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-obsidian/90 backdrop-blur-md px-4">
      <div className="relative w-full max-w-md bg-charcoal border border-white/10 rounded-xl p-8 shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-silver hover:text-white transition-colors"
          onMouseEnter={() => setCursorType('view')}
          onMouseLeave={() => setCursorType('default')}
        >
          <X size={20} />
        </button>

        <div className="flex justify-center mb-6 text-white/50">
          <BookOpen size={48} strokeWidth={1} />
        </div>

        <h3 className="text-xl font-display font-bold text-white text-center uppercase tracking-widest mb-2">
          Read Screenplay
        </h3>
        <p className="text-sm text-silver/70 font-mono text-center mb-8">
          Subscribe to my newsletter to unlock this screenplay. I'll send a copy to your inbox and you can read it right here.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email Address"
              className="w-full bg-obsidian border border-white/10 focus:border-white/40 py-3 px-4 text-silver placeholder:text-silver/30 outline-none transition-colors rounded-lg font-mono text-sm"
              onMouseEnter={() => setCursorType('view')}
              onMouseLeave={() => setCursorType('default')}
            />
          </div>

          {error && <div className="text-red-500 text-xs font-mono text-center">{error}</div>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-charcoal hover:bg-silver font-mono text-xs uppercase tracking-widest py-4 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 font-bold"
            onMouseEnter={() => setCursorType('view')}
            onMouseLeave={() => setCursorType('default')}
          >
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : 'Subscribe & Read'}
          </button>
        </form>
      </div>
    </div>
  );
}

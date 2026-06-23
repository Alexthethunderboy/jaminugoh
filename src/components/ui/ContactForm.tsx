'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAppStore } from '@/lib/store';
import { Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setCursorType = useAppStore((state) => state.setCursorType);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS environment variables are missing. Simulating success.');
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: data.name,
            reply_to: data.email,
            message: data.message,
          },
          publicKey
        );
      }

      setIsSuccess(true);
      reset();
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mt-12 mb-24">
      <h3 className="text-sm font-mono text-silver/60 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
        Direct Inquiries
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div>
          <input
            {...register('name')}
            placeholder="Your Name"
            className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500/50' : 'border-white/10 focus:border-white/40'} py-3 text-silver placeholder:text-silver/30 outline-none transition-colors rounded-none font-mono text-sm`}
            onMouseEnter={() => setCursorType('view')}
            onMouseLeave={() => setCursorType('default')}
          />
          {errors.name && <span className="text-red-500/80 text-xs mt-2 block">{errors.name.message}</span>}
        </div>

        <div>
          <input
            {...register('email')}
            placeholder="Your Email"
            className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-white/40'} py-3 text-silver placeholder:text-silver/30 outline-none transition-colors rounded-none font-mono text-sm`}
            onMouseEnter={() => setCursorType('view')}
            onMouseLeave={() => setCursorType('default')}
          />
          {errors.email && <span className="text-red-500/80 text-xs mt-2 block">{errors.email.message}</span>}
        </div>

        <div>
          <textarea
            {...register('message')}
            placeholder="Tell me about your project..."
            rows={4}
            className={`w-full bg-transparent border-b ${errors.message ? 'border-red-500/50' : 'border-white/10 focus:border-white/40'} py-3 text-silver placeholder:text-silver/30 outline-none transition-colors resize-none rounded-none font-mono text-sm`}
            onMouseEnter={() => setCursorType('view')}
            onMouseLeave={() => setCursorType('default')}
          />
          {errors.message && <span className="text-red-500/80 text-xs mt-2 block">{errors.message.message}</span>}
        </div>

        {error && (
          <div className="text-red-500 text-sm font-mono">{error}</div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          onMouseEnter={() => setCursorType('view')}
          onMouseLeave={() => setCursorType('default')}
          className="self-start mt-4 border border-silver/20 hover:border-silver/60 text-silver hover:text-white px-8 py-3 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
          {isSuccess ? 'Message Sent' : 'Send Transmission'}
        </button>
      </form>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import gsap from 'gsap';

interface TransitionLinkProps extends React.ComponentProps<typeof Link> {
  children: ReactNode;
  className?: string;
  href: string;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function TransitionLink({ children, href, className, ...props }: TransitionLinkProps) {
  const router = useRouter();

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    
    // Create an overlay on the fly for the exit transition
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-obsidian z-[9999] pointer-events-none';
    overlay.style.opacity = '0';
    document.body.appendChild(overlay);

    // Fade out to black
    gsap.to(overlay, {
      opacity: 1,
      duration: 0.8,
      ease: 'power3.inOut'
    });

    await sleep(800);
    
    // Navigate to the next route
    router.push(href);

    // Clean up the overlay shortly after pushing, letting template.tsx handle the entrance
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
    }, 100);
  };

  return (
    <Link href={href} onClick={handleTransition} className={className} {...props}>
      {children}
    </Link>
  );
}

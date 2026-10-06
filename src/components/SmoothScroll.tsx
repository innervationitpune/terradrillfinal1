'use client';
import { ReactLenis, useLenis } from 'lenis/react';
import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

function ScrollRestoration() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && lenis) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // If there's a hash in the URL, scroll to that section
      if (window.location.hash) {
        try {
          lenis.scrollTo(window.location.hash, { 
            immediate: prefersReducedMotion,
            duration: 1.2
          });
        } catch (e) {
          // Fallback if selector is invalid
        }
        return;
      }

      // Otherwise, smooth scroll to the top of the new page
      lenis.scrollTo(0, {
        immediate: prefersReducedMotion,
        duration: 1.2,
      });
    }
  }, [pathname, lenis, mounted]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      <ScrollRestoration />
      {children}
    </ReactLenis>
  );
}

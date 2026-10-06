'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MasterCinematicCanvas from './MasterCinematicCanvas';
import SceneOverlay from './SceneOverlay';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TrayanaMasterExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  // The canvas reads the ref every frame; state only drives the HTML overlay
  const progressRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true, // Lenis already smooths the scroll
        onUpdate: (self) => {
          progressRef.current = self.progress;
          setScrollProgress(self.progress);
        },
      });
    }, element);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[800vh] bg-[#040d1f]">
      {/* Sticky Fullscreen 3D Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#040d1f]">
        
        {/* Three.js WebGL Rendering Canvas */}
        <MasterCinematicCanvas progressRef={progressRef} />

        {/* HTML/CSS UI Overlays (Text + Metrics Bar) */}
        <SceneOverlay scrollProgress={scrollProgress} />

      </div>
    </section>
  );
}

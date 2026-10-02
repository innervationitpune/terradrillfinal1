'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function DrillAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  // Calculate the height of the pipe based on scroll
  const pipeHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // Rotate the drill bit constantly
  const drillRotation = useTransform(scrollYProgress, [0, 1], [0, 3600]); // Spins fast as you scroll

  return (
    <div ref={containerRef} className="absolute left-4 md:left-24 top-0 bottom-0 w-24 pointer-events-none z-0 hidden sm:block">
      {/* The trailing pipe */}
      <motion.div 
        style={{ height: pipeHeight }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-4 bg-gradient-to-b from-navy-deep to-primary rounded-b-full shadow-[0_0_20px_rgba(255,107,53,0.5)]"
      />
      
      {/* The rotating drill head */}
      <motion.div 
        style={{ 
          top: pipeHeight,
          rotate: drillRotation
        }}
        className="absolute left-1/2 -translate-x-1/2 -mt-4 w-12 h-16 origin-top"
      >
        {/* SVG of an HDD Drill Head / Reamer */}
        <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_10px_10px_rgba(255,107,53,0.6)]">
          <path d="M50 120L10 60L30 0H70L90 60L50 120Z" fill="url(#drillGrad)" stroke="#1a2744" strokeWidth="4"/>
          <path d="M50 120L30 60L40 0" stroke="#1a2744" strokeWidth="4"/>
          <path d="M50 120L70 60L60 0" stroke="#1a2744" strokeWidth="4"/>
          <path d="M10 60H90" stroke="#1a2744" strokeWidth="4"/>
          <circle cx="50" cy="80" r="6" fill="#ff6b35"/>
          <circle cx="30" cy="40" r="4" fill="#ff6b35"/>
          <circle cx="70" cy="40" r="4" fill="#ff6b35"/>
          <defs>
            <linearGradient id="drillGrad" x1="0" y1="0" x2="100" y2="120" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ff8555" />
              <stop offset="0.5" stopColor="#ff6b35" />
              <stop offset="1" stopColor="#e55525" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}

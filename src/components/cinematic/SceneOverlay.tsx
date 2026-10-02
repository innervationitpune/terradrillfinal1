'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { T, range } from './timeline';

// The four story cards, one per scroll range of the shared timeline
const CARDS = [
  {
    no: "01", from: T.boreStart, to: T.boreEnd, accent: "#ff5500",
    label: "Horizontal Directional Drilling",
    title: "Steerable Bore Path & Pipe Pullback",
    text: "Guided drilling passes beneath the river bed through complex rock strata while the reamer expands the bore path. The product pipe follows continuously behind the assembly with zero gap, without disturbing the waterway.",
  },
  {
    no: "02", from: T.boreEnd, to: T.microEnd, accent: "#38bdf8",
    label: "Microtunneling & Pipe Jacking",
    title: "Jacked Concrete Pipe Segments",
    text: "Hydraulic jacking rams advance concrete segment rings from the launch pit, one section at a time, holding line and level through mixed ground.",
  },
  {
    no: "03", from: T.microEnd, to: T.railEnd, accent: "#facc15",
    label: "Railway & Utility Crossings",
    title: "Under Live Tracks, Zero Disruption",
    text: "The pipeline is installed beneath active railway corridors, highways and utilities while trains and traffic keep running on the surface above.",
  },
  {
    no: "04", from: T.railEnd, to: 1.01, accent: "#ff5500",
    label: "Global Engineering Footprint",
    title: "Proven Executional Excellence",
    text: "From river crossings in India to complex urban utility corridors in Europe and Asia, Trayana delivers precision underground infrastructure solutions worldwide.",
  },
];

interface SceneOverlayProps {
  scrollProgress: number;
}

export default function SceneOverlay({ scrollProgress }: SceneOverlayProps) {
  // Active stage comes from the shared master timeline (see timeline.ts)
  const card = CARDS.find(c => scrollProgress >= c.from && scrollProgress < c.to);

  // Hero Text opacity smoothly fades as the globe zooms
  const heroOpacity = 1 - range(scrollProgress, T.globeEnd, T.cut);
  // Veil hides the camera cut from globe to river crossing
  const veilOpacity = Math.max(0, 1 - Math.abs(scrollProgress - T.cut) / 0.04);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between overflow-hidden">

      <div className="absolute inset-0 bg-[#040d1f]" style={{ opacity: veilOpacity }} />

      {/* --- STAGE 0: TRAYANA HERO OVERLAY (LEFT SIDE) --- */}
      <div 
        className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 md:pt-36 flex-1 flex flex-col justify-center transition-opacity duration-300"
        style={{ opacity: heroOpacity, display: scrollProgress > T.cut ? 'none' : 'flex' }}
      >
        <div className="max-w-xl md:max-w-2xl text-left pointer-events-auto">
          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff5500]/10 border border-[#ff5500]/30 rounded-full mb-4 backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-[#ff5500] animate-pulse" />
            <span className="text-[#ff5500] text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
              Global Trenchless Engineering Specialists
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-display text-[2.75rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.25rem] font-bold text-white uppercase leading-[0.95] tracking-tight mb-6 drop-shadow-2xl">
            ENGINEERING <br />
            CONNECTIONS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#ff5500]">
              BENEATH THE SURFACE
            </span>
          </h1>

          {/* Description Paragraph */}
          <p className="max-w-lg text-sm md:text-base text-white/80 font-normal leading-relaxed mb-8 drop-shadow">
            Specialists in Trenchless Technology and Underground Infrastructure delivering HDD, Pipe Jacking, Microtunneling, Railway Crossing and Utility Infrastructure projects across India and international markets.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="/services" 
              className="bg-white text-black rounded-full px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#ff5500] hover:text-white transition-all shadow-lg hover:shadow-[#ff5500]/25 transform hover:-translate-y-0.5"
            >
              Our Services
            </a>
            <a 
              href="/projects" 
              className="border border-white/30 text-white rounded-full px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-white/10 transition-all backdrop-blur-sm transform hover:-translate-y-0.5"
            >
              View Projects
            </a>
          </div>
        </div>
      </div>

      {/* --- STORY CARDS (one at a time, 01 → 04) --- */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex-1 flex items-center justify-end pointer-events-none">
        <AnimatePresence mode="wait">
          {card && (
            <motion.div
              key={card.no}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md bg-[#040d1f]/85 backdrop-blur-xl border border-white/15 p-6 md:p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] border-l-4 pointer-events-auto"
              style={{ borderLeftColor: card.accent }}
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-xs font-black tracking-widest uppercase" style={{ color: card.accent }}>
                  {card.no} / {card.label}
                </span>
                <span className="text-white/40 text-[10px] font-mono">{card.no} / 04</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide mb-3">
                {card.title}
              </h3>
              <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- METRICS BOTTOM BAR (MUST ALWAYS BE FULLY VISIBLE & SEPARATE) --- */}
      <div className="w-full bg-[#040d1f]/95 border-t border-white/10 backdrop-blur-xl pointer-events-auto z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            
            {/* Metric 1: 4+ COUNTRIES (FULL TEXT ALWAYS VISIBLE) */}
            <div className="flex flex-col py-5 md:py-6 md:px-6">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
                4+
              </div>
              <div className="text-[10px] md:text-[11px] font-black text-[#ff5500] uppercase tracking-[0.18em] mb-0.5">
                COUNTRIES
              </div>
              <div className="text-[10px] md:text-[11px] text-white/60 font-medium">
                India · France · UAE · Malaysia
              </div>
            </div>

            {/* Metric 2: 250+ PROJECTS */}
            <div className="flex flex-col py-5 md:py-6 md:px-6">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
                250+
              </div>
              <div className="text-[10px] md:text-[11px] font-black text-[#ff5500] uppercase tracking-[0.18em] mb-0.5">
                PROJECTS
              </div>
              <div className="text-[10px] md:text-[11px] text-white/60 font-medium">
                Completed Successfully
              </div>
            </div>

            {/* Metric 3: 25+ MACHINES */}
            <div className="flex flex-col py-5 md:py-6 md:px-6">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
                25+
              </div>
              <div className="text-[10px] md:text-[11px] font-black text-[#ff5500] uppercase tracking-[0.18em] mb-0.5">
                MACHINES
              </div>
              <div className="text-[10px] md:text-[11px] text-white/60 font-medium">
                Advanced Fleet
              </div>
            </div>

            {/* Metric 4: 250+ EXPERTS */}
            <div className="flex flex-col py-5 md:py-6 md:px-6">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
                250+
              </div>
              <div className="text-[10px] md:text-[11px] font-black text-[#ff5500] uppercase tracking-[0.18em] mb-0.5">
                EXPERTS
              </div>
              <div className="text-[10px] md:text-[11px] text-white/60 font-medium">
                Skilled Professionals
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

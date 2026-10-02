'use client';
import { motion } from 'framer-motion';
import { MouseEvent, useState } from 'react';

import { AnimatedTitle } from './PremiumAnimations';

const services = [
  {
    title: 'HDD',
    description: 'Advanced trenchless HDD solutions for pipelines, OFC, and utility crossings beneath rivers, roads, and railway corridors.',
    colSpan: 'col-span-1 md:col-span-2',
    rowSpan: 'row-span-1 md:row-span-2',
    accent: 'bg-gradient-to-br from-primary/20 to-transparent'
  },
  {
    title: 'Microtunneling',
    description: 'Precision-engineered, remote-controlled microtunneling solutions up to 2,600 mm diameter.',
    colSpan: 'col-span-1',
    rowSpan: 'row-span-1',
    accent: ''
  },
  {
    title: 'Jacking & Pushing',
    description: 'Specialized hydraulic pipe jacking solutions for large-diameter sewer and utility infrastructure.',
    colSpan: 'col-span-1',
    rowSpan: 'row-span-1',
    accent: ''
  },
  {
    title: 'Railway Crossings',
    description: 'Trenchless railway crossings beneath active railway corridors without disruption to rail operations.',
    colSpan: 'col-span-1 md:col-span-3',
    rowSpan: 'row-span-1',
    accent: 'bg-gradient-to-r from-transparent via-primary/10 to-transparent'
  }
];

export default function ServicesBento() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="py-40 px-4 md:px-8 relative z-10 bg-navy-deep overflow-hidden">
      <div className="max-w-[90rem] mx-auto">
        <div className="mb-24 md:mb-32">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-[0.3em] uppercase text-sm md:text-base mb-8"
          >
            Capabilities
          </motion.p>
          <AnimatedTitle 
            text="ENGINEERING END TO END."
            className="text-display text-5xl sm:text-7xl md:text-[8rem] font-bold uppercase leading-[0.9] tracking-tighter"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
              onMouseMove={handleMouseMove}
              className={`relative rounded-3xl overflow-hidden glass p-8 flex flex-col justify-end group ${svc.colSpan} ${svc.rowSpan} ${svc.accent}`}
            >
              {/* Spotlight Hover Effect */}
              <div 
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{
                  background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 107, 53, 0.1), transparent 40%)`
                }}
              />
              
              <div className="relative z-10">
                <h3 className="text-display text-3xl md:text-4xl font-bold mb-3 group-hover:text-primary transition-colors">{svc.title}</h3>
                <p className="text-white/60 text-lg max-w-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {svc.description}
                </p>
              </div>
              
              {/* Techy Corner Accents */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity m-6" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

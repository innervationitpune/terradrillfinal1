'use client';
import { motion, useScroll } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import ParallaxFooter from '@/components/ParallaxFooter';
import { useRef } from 'react';
import GlobalPageEarth from '@/components/GlobalPageEarth';

const locations = [
  { country: "India", type: "Headquarters & Operations", desc: "Executing massive infrastructure projects across all states." },
  { country: "Middle East", type: "Regional Operations", desc: "Specialized trenchless infrastructure for arid environments." },
  { country: "Southeast Asia", type: "Engineering Hub", desc: "Supporting urban utility expansion in high-density regions." }
];

export default function GlobalPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <SmoothScroll>
      <main ref={containerRef} className="relative min-h-screen z-10 text-white bg-[#03060a] pt-32 pb-40 overflow-hidden">
        
        {/* Subtle Atmospheric Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#0044ff]/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

        <section className="max-w-[1400px] mx-auto px-6 relative z-10">
          
          {/* Header */}
          <div className="mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-widest text-white border-l-4 border-primary pl-6"
            >
              Reach
            </motion.h1>
          </div>

          <div className="grid lg:grid-cols-[45%_1fr] gap-16 lg:gap-24 items-center">
            
            {/* LEFT: Earth Network Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative w-full aspect-square md:aspect-auto md:h-[600px] lg:h-[700px] rounded-full lg:rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,30,100,0.3)] border border-white/5"
            >
              <GlobalPageEarth />
              {/* Subtle inner shadow/gradient to blend edges */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#03060a_100%)] pointer-events-none" />
            </motion.div>

            {/* RIGHT: Regional Cards */}
            <div className="flex flex-col gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="mb-4"
              >
                <h2 className="text-xl md:text-2xl text-white/50 uppercase tracking-[0.3em] font-light">Regional Operations</h2>
              </motion.div>

              {locations.map((loc, i) => (
                <motion.div
                  key={loc.country}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
                  className="group relative bg-[#0a0f18]/80 backdrop-blur-md p-8 lg:p-10 border border-white/5 rounded-lg overflow-hidden cursor-default transition-all duration-500 hover:bg-[#0c1322] hover:border-white/10 hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Subtle animated border top */}
                  <div className="absolute top-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-700 ease-in-out" />
                  
                  <div className="relative z-10">
                    <h3 className="text-3xl lg:text-4xl font-display font-bold uppercase tracking-wider mb-3 text-white">{loc.country}</h3>
                    <div className="text-primary text-xs lg:text-sm font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                      <span className="w-8 h-[1px] bg-primary/50" />
                      {loc.type}
                    </div>
                    <p className="text-white/60 text-base lg:text-lg leading-relaxed font-light">{loc.desc}</p>
                  </div>

                  {/* Subtle background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              ))}
            </div>

          </div>
        </section>

      </main>
      <ParallaxFooter />
    </SmoothScroll>
  );
}

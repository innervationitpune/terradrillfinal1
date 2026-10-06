'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Elite percentage counter simulation
    const duration = 2500;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setCount(progress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => setIsLoading(false), 400); // Small pause at 100%
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          key="preloader"
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#050914] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        >
          {/* Top Panel */}
          <motion.div 
            initial={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1], delay: 0.1 }}
            className="absolute top-0 left-0 w-full h-[50vh] bg-navy-deep border-b border-white/5"
          />
          
          {/* Bottom Panel */}
          <motion.div 
            initial={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1], delay: 0.1 }}
            className="absolute bottom-0 left-0 w-full h-[50vh] bg-navy-deep border-t border-white/5"
          />

          <div className="relative z-10 flex flex-col items-center justify-center mix-blend-difference">
            <motion.div className="flex gap-4 items-end overflow-hidden mb-6">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                className="text-display text-[8rem] md:text-[12rem] font-bold text-white leading-[0.8] tracking-tighter"
              >
                {count}
              </motion.span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-primary text-2xl font-bold mb-4"
              >
                %
              </motion.span>
            </motion.div>
            
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="text-white/50 text-sm md:text-lg tracking-[0.4em] uppercase font-bold"
              >
                TERRADRILL & ENERGY PRIVATE LIMITED
              </motion.h1>
            </div>
            
            {/* Minimal Loader Line */}
            <div className="w-[300px] h-[1px] bg-white/10 mt-12 overflow-hidden relative">
              <motion.div 
                style={{ width: `${count}%` }}
                className="absolute top-0 left-0 h-full bg-primary"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

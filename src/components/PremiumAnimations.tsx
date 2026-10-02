'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export function AnimatedTitle({ text, className }: { text: string, className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const words = text.split(" ");

  return (
    <h2 ref={ref} className={`flex flex-wrap gap-2 md:gap-4 ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-flex">
          <motion.span
            initial={{ y: "100%", opacity: 0, rotate: 10 }}
            animate={isInView ? { y: "0%", opacity: 1, rotate: 0 } : { y: "100%", opacity: 0, rotate: 10 }}
            transition={{ 
              duration: 1.2, 
              delay: i * 0.1, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="inline-block transform-origin-bottom-left"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

export function ParallaxImage({ src, alt, className }: { src: string, alt: string, className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img 
        src={src} 
        alt={alt}
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      />
    </div>
  );
}

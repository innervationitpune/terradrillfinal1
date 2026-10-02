'use client';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import ParallaxFooter from '@/components/ParallaxFooter';
import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const galleryImages = Array.from({ length: 21 }, (_, i) => `/images/gallery/g${i + 1}.jpeg`);

const stripData = [
  { label: 'SPECIALIZED FLEET', text: 'HDD • MICRO TUNNELLING • RMC' },
  { label: 'INFRASTRUCTURE', text: 'PIPE JACKING • EXCAVATION • RAILWAY CROSSINGS' },
  { label: 'OPERATIONS', text: 'INDIA • UAE • MALAYSIA • SINGAPORE' }
];

export default function EquipmentPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const openLightbox = (idx: number) => {
    setCurrentImageIdx(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  
  const nextImage = useCallback(() => {
    setCurrentImageIdx((prev) => (prev + 1) % galleryImages.length);
  }, []);
  
  const prevImage = useCallback(() => {
    setCurrentImageIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  return (
    <SmoothScroll>
      <main ref={containerRef} className="relative min-h-screen bg-navy-deep text-white font-sans overflow-hidden">
        
        {/* HERO SECTION */}
        <section ref={heroRef} className="relative w-full h-[85vh] min-h-[600px] flex items-center bg-black overflow-hidden pt-20">
          <motion.div 
            initial={{ scale: 1.04 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}
            className="absolute inset-0 z-0"
          >
            <Image 
              src="/images/equipment/hdd-hero.jpeg" 
              alt="Advanced Equipment Fleet" 
              fill 
              priority
              className="object-cover"
            />
            {/* Cinematic dark overlay with subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/60 to-transparent mix-blend-multiply" />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          <div className="container-x relative z-10 w-full h-full flex flex-col justify-center max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-4 mb-6"
            >
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="w-12 h-[2px] bg-primary origin-left" 
              />
              <span className="text-primary uppercase tracking-[0.2em] font-bold text-xs">
                EQUIPMENT
              </span>
            </motion.div>

            <h1 className="text-display text-4xl md:text-5xl lg:text-7xl font-bold uppercase text-white leading-[1.1] mb-6 overflow-hidden">
              <motion.span 
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="block"
              >
                Advanced Fleet.
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="block text-white/90"
              >
                Engineered for <br className="hidden md:block" /> Performance.
              </motion.span>
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-white/80 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl font-light"
            >
              A modern fleet of HDD rigs, microtunneling systems, RMC equipment, excavation machinery, and specialized infrastructure assets, supported by skilled operators and robust maintenance systems.
            </motion.p>
          </div>
        </section>

        {/* TECHNICAL DATA STRIP */}
        <section className="relative z-20 bg-navy border-y border-white/5 shadow-2xl">
          <div className="container-x">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {stripData.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="py-8 md:py-10 px-4 md:px-8 group hover:bg-white/[0.02] transition-colors"
                >
                  <div className="text-primary text-[10px] uppercase tracking-[0.25em] font-bold mb-3 flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.label}
                  </div>
                  <div className="text-white/80 text-xs md:text-sm uppercase tracking-widest leading-relaxed">
                    {item.text}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* EQUIPMENT GALLERY */}
        <section className="pt-32 pb-40 relative">
          <div className="container-x">
            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 mb-4"
              >
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-primary uppercase tracking-[0.2em] font-bold text-xs">MACHINERY GALLERY</span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-display text-4xl md:text-5xl font-bold uppercase text-white mb-6"
              >
                Our Fleet in Operation
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/60 text-lg max-w-2xl font-light"
              >
                Specialized equipment deployed across trenchless, tunnelling, underground infrastructure and critical crossing projects.
              </motion.p>
            </div>

            {/* Asymmetric Masonry Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {galleryImages.map((src, i) => {
                // Determine spanning logic for rhythm
                let spanClasses = "col-span-1 row-span-1 aspect-square";
                if (i === 0 || i === 7) spanClasses = "col-span-2 row-span-2 aspect-square md:aspect-auto";
                if (i === 4 || i === 12 || i === 18) spanClasses = "col-span-2 row-span-1 aspect-[2/1]";

                return (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: (i % 6) * 0.1 }}
                    className={`relative rounded-sm overflow-hidden group cursor-pointer bg-[#0a0f18] shadow-lg ${spanClasses}`}
                    onClick={() => openLightbox(i)}
                  >
                    <div className="absolute inset-0 bg-navy/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <Image
                      src={src}
                      alt={`Fleet equipment ${i + 1}`}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />

                    {/* Hover UI */}
                    <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <div className="w-8 h-8 border-t-2 border-l-2 border-primary" />
                      <div className="self-end flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-sm border border-white/10">
                        <span className="text-white text-xs uppercase tracking-[0.15em] font-bold">View</span>
                        <svg className="w-4 h-4 text-primary transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="relative py-24 md:py-32 bg-navy border-t border-white/10 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] pointer-events-none" />
          <div className="container-x relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
              <div className="max-w-2xl">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-display text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-white leading-[1.1]"
                >
                  Need specialist equipment <br /> for a critical crossing?
                </motion.h2>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/contact" className="group relative bg-primary hover:bg-primary-bright text-white px-8 py-4 font-bold uppercase tracking-[0.15em] text-sm transition-all rounded-sm flex items-center justify-center gap-3 overflow-hidden shadow-xl shadow-primary/20">
                  <span className="relative z-10">Contact Us</span>
                  <svg className="w-4 h-4 relative z-10 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <Link href="/projects" className="group border-2 border-white/20 hover:border-white/40 text-white hover:bg-white/5 px-8 py-4 font-bold uppercase tracking-[0.15em] text-sm transition-all rounded-sm flex items-center justify-center">
                  View Projects
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      {/* FULLSCREEN LIGHTBOX */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-navy-deep/95 backdrop-blur-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 lg:p-8 z-50">
              <div className="text-white/50 tracking-[0.2em] font-bold text-sm">
                <span className="text-white">{currentImageIdx + 1 < 10 ? `0${currentImageIdx + 1}` : currentImageIdx + 1}</span> / {galleryImages.length}
              </div>
              <button 
                onClick={closeLightbox}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Main Image Area */}
            <div className="flex-1 relative flex items-center justify-center p-4 lg:p-12">
              <button 
                onClick={prevImage}
                className="absolute left-4 lg:left-8 w-14 h-14 hidden md:flex items-center justify-center rounded-full bg-black/50 hover:bg-primary text-white backdrop-blur-sm transition-colors z-50"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="relative w-full h-full max-w-7xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIdx}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={galleryImages[currentImageIdx]}
                      alt={`Fleet equipment ${currentImageIdx + 1}`}
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <button 
                onClick={nextImage}
                className="absolute right-4 lg:right-8 w-14 h-14 hidden md:flex items-center justify-center rounded-full bg-black/50 hover:bg-primary text-white backdrop-blur-sm transition-colors z-50"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Mobile Controls */}
            <div className="md:hidden flex justify-between p-6 border-t border-white/10 bg-black/20">
              <button onClick={prevImage} className="text-white/70 hover:text-white uppercase tracking-widest text-xs font-bold p-2">Prev</button>
              <button onClick={nextImage} className="text-primary hover:text-white uppercase tracking-widest text-xs font-bold p-2">Next</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ParallaxFooter />
    </SmoothScroll>
  );
}

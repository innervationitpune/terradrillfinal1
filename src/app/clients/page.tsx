'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import ParallaxFooter from '@/components/ParallaxFooter';
import { useRef } from 'react';
import Link from 'next/link';

const govtClients = [
  { name: 'INDIAN RAILWAYS', url: '/images/clients/government/indian-railways.png' },
  { name: 'MIDC', url: '/images/clients/government/midc.png' },
  { name: 'PCMC', url: '/images/clients/government/pcmc.png' },
  { name: 'PMC', url: '/images/clients/government/pmc.png' },
  { name: 'KMDA', url: '/images/clients/government/kmda.png' },
  { name: 'BMC', url: '/images/clients/government/bmc.png' },
  { name: 'ULHASNAGAR MUNICIPAL\nCORPORATION', url: '/images/clients/government/ulhasnagar.png' },
  { name: 'RANAGHAT MUNICIPAL\nCORPORATION', url: '/images/clients/government/ranaghat.png' }
];

const sectors = [
  {
    title: "OIL & GAS",
    items: [
      "Reliance Industries",
      "Indian Oil Corporation (IOCL)",
      "Bharat Petroleum (BPCL)",
      "Hindustan Petroleum (HPCL)"
    ]
  },
  {
    title: "GOVERNMENT & URBAN INFRASTRUCTURE",
    desc: "Municipal Corporations and Urban Development Authorities including:",
    items: [
      "Mumbai",
      "Pune",
      "Pimpri-Chinchwad",
      "Thane",
      "Kolkata",
      "Ulhasnagar",
      "Ranaghat"
    ]
  },
  {
    title: "RAILWAYS",
    items: [
      "Eastern Railway",
      "Central Railway",
      "Western Railway",
      "South Central Railway"
    ]
  },
  {
    title: "TELECOMMUNICATIONS",
    items: [
      "Bharti Airtel",
      "Reliance Jio",
      "BSNL",
      "Vodafone Idea"
    ]
  },
  {
    title: "EPC & INFRASTRUCTURE",
    items: [
      "L&T Construction",
      "Tata Projects",
      "Afcons Infrastructure",
      "Megha Engineering & Infrastructures (MEIL)"
    ]
  },
  {
    title: "INDUSTRIAL & MANUFACTURING",
    items: [
      "Serum Institute of India",
      "Cipla",
      "Amanora Group",
      "Tata Steel",
      "JSW Group",
      "Adani Group"
    ]
  }
];

export default function ClientsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <SmoothScroll>
      <main ref={containerRef} className="relative min-h-screen z-10 font-sans overflow-hidden bg-navy-deep text-white">
        
        {/* HERO SECTION */}
        <section ref={heroRef} className="relative w-full h-[70vh] min-h-[500px] flex items-center bg-navy overflow-hidden pt-20">
          <motion.div 
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ scale: heroScale, y: heroY }}
            className="absolute inset-0 z-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/projects/p13.jpg)' }}
            />
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-navy/80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>

          <div className="container-x relative z-10 w-full mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mb-4"
            >
              <span className="text-primary uppercase tracking-[0.2em] font-bold text-xs md:text-sm">
                CLIENTS & PARTNERS
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-display text-4xl md:text-5xl lg:text-7xl font-bold uppercase text-white leading-[1.1] mb-6 max-w-4xl"
            >
              Trusted by India's<br/>Industry Leaders
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl font-light"
            >
              Long-term partnerships built on engineering reliability and safe execution.
            </motion.p>
          </div>
        </section>

        {/* GOVERNMENT CLIENTS GRID */}
        <section className="py-24 relative z-10">
          <div className="container-x max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-white/40 font-bold tracking-[0.2em] text-xs uppercase">
                GOVERNMENT CLIENTS
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-white/10">
              {govtClients.map((client, i) => (
                <motion.div 
                  key={client.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="border-b border-r border-white/10 p-8 lg:p-12 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors bg-navy-deep/50"
                >
                  <div className="h-20 w-20 relative flex items-center justify-center mb-6 bg-white rounded-full p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={client.url} 
                      alt={client.name.replace('\n', ' ')}
                      className="max-w-full max-h-full object-contain transition-all duration-300"
                    />
                  </div>
                  <h3 className="text-xs font-bold text-white/90 uppercase tracking-widest whitespace-pre-line leading-relaxed">
                    {client.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTORS GRID */}
        <section className="py-24 relative border-t border-white/10 bg-navy">
          <div className="container-x max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase block mb-4">
                BY SECTOR
              </span>
              <h2 className="text-display text-4xl md:text-5xl font-bold uppercase text-white">
                Who We Work With
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {sectors.map((sector, i) => (
                <motion.div 
                  key={sector.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/5 p-8 lg:p-10 border border-white/10 border-t-4 border-t-primary shadow-xl backdrop-blur-sm hover:bg-white/10 transition-colors"
                >
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">
                    {sector.title}
                  </h3>
                  
                  {sector.desc && (
                    <p className="text-white/60 text-sm mb-4 leading-relaxed">
                      {sector.desc}
                    </p>
                  )}
                  
                  <ul className="space-y-3">
                    {sector.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-primary/50 mt-1 text-xs">•</span>
                        <span className="text-white/80 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 bg-[#141C2C] relative">
          <div className="container-x max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
              <div className="max-w-2xl">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-display text-3xl md:text-4xl lg:text-[40px] font-bold uppercase text-white leading-[1.1]"
                >
                  Become a Trayana Infratech<br/>Public Limited Client.
                </motion.h2>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 shrink-0"
              >
                <Link href="/contact" className="group relative bg-primary hover:bg-primary-bright text-white px-8 py-4 font-bold uppercase tracking-[0.15em] text-xs transition-all flex items-center justify-center gap-3">
                  <span className="relative z-10">CONTACT US</span>
                  <svg className="w-4 h-4 relative z-10 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/projects" className="border border-white/20 hover:border-white/40 text-white/90 hover:bg-white/5 px-8 py-4 font-bold uppercase tracking-[0.15em] text-xs transition-all flex items-center justify-center">
                  VIEW PROJECTS
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

      </main>
      
      <ParallaxFooter />
    </SmoothScroll>
  );
}

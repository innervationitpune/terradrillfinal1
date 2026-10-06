'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import ParallaxFooter from '@/components/ParallaxFooter';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  srNo: string;
  client: string;
  logo: string;
  details: string;
  location: string;
  cost: string;
}

const projects: Project[] = [
  { srNo: '01', client: 'RELIANCE', logo: '/clients/private/reliance.png', details: 'LAYING OF 40 MM HDPE PIPES - TOTAL LENGTH = 7 KM', location: 'BRAHMAPUR TO ADWA MOHNA ROAD (ORISSA)', cost: '4.40 CR' },
  { srNo: '02', client: 'VODAFONE & TATA', logo: '/clients/private/tata-vodafone.png', details: 'LAYING OF 40 MM HDPE PIPES - TOTAL LENGTH = 3 KM', location: 'BHADRAK KEONJHAR GHATGAON SUAKATI & PANKOLI (ORISSA)', cost: '72.00 LAKHS' },
  { srNo: '03', client: 'AIRTEL', logo: '/clients/private/airtel.png', details: 'LAYING OF 40 MM HDPE PIPES - TOTAL LENGTH = 4.2 KM', location: 'CUTTACK & NEARBY AREA (ORISSA)', cost: '1.65 CR' },
  { srNo: '04', client: 'TATA', logo: '/clients/private/tata.png', details: 'LAYING OF 40 MM HDPE PIPES - TOTAL LENGTH = 1.4 KM', location: 'GUNPUR, DIST. KORAPUT (ORISSA)', cost: '1.88 CR' },
  { srNo: '05', client: 'B.S.N.L', logo: '/clients/private/bsnl.png', details: 'LAYING OF 40 MM HDPE PIPES - TOTAL LENGTH = 3.4 KM', location: 'JEYPORE DIST. KORAPUT (ORISSA)', cost: '7.03 CR' },
  { srNo: '06', client: 'TATA', logo: '/clients/private/tata.png', details: 'LAYING OF 40 MM HDPE PIPES - TOTAL LENGTH = 5 KM', location: 'BHAWANIPATNA (ORISSA)', cost: '2.33 CR' },
  { srNo: '07', client: 'GAIL', logo: '/clients/private/gail.png', details: 'LAYING OF 4" & 6" PIPE - TOTAL LENGTH 400 MTR', location: 'KANKINADA (ANDHRA PRADESH)', cost: '75 LAKHS' },
  { srNo: '08', client: 'IOCL', logo: '/clients/private/iocl.gif', details: 'LAYING OF 28" MM STEEL PIPE - TOTAL LENGTH = 315 MTR (ROCK)', location: 'KOTKI RIVER (RAJASTHAN)', cost: '2.58 CR' },
  { srNo: '09', client: 'SS SATHE INFRA PVT LTD', logo: '/clients/private/ss-sathe.png', details: '600, 900 MM ROAD, RAILWAY & RIVER CROSSING', location: 'PIMPRI CHINCHWAD', cost: '5.10 CR' },
  { srNo: '10', client: 'MAHARASHTRA INDUSTRIAL DEVELOPMENT CORPORATION', logo: '/clients/government/midc.png', details: '1200MM - 289 MTRS', location: 'AHMEDNAGAR - SUPA', cost: '2.33 CR' },
  { srNo: '11', client: 'SERUM INSTITUTE OF INDIA', logo: '/clients/private/serum.png', details: '600MM / 900MM - 188 MTRS', location: 'PUNE', cost: '75 LAKHS' },
  { srNo: '12', client: 'MAHARASHTRA JEEVAN PRADHIKARAN (MJP)', logo: '/clients/private/mjp.png', details: '1000MM / 800MM / 600MM', location: 'SANGLI & PUNE', cost: '2.58 CR' },
  { srNo: '13', client: 'L&T CONSTRUCTION (24*7 PROJECT PMC)', logo: '/clients/private/lnt.png', details: '900MM / 600MM - 650 MTRS', location: 'PUNE', cost: '1.55 CR' },
  { srNo: '14', client: 'KOLKATA MUNICIPAL DEVELOPMENT AUTHORITY', logo: '/clients/government/kmda.png', details: '600MM / 800MM - 250 MTRS', location: 'KOLKATA CENTRAL', cost: '1.02 CR' },
  { srNo: '15', client: 'VODAFONE', logo: '/clients/private/vodafone.png', details: 'LAYING OF 40 MM HDPE PIPES - TOTAL LENGTH = 2.6 KM', location: 'RAYAGADA DIST. (ORISSA)', cost: '1.25 CR' },
  { srNo: '16', client: 'JIO', logo: '/clients/private/jio.png', details: 'LAYING OF 40 MM HDPE PIPES - TOTAL LENGTH = 6.8 KM', location: 'BALASORE DIST. (ORISSA)', cost: '3.10 CR' },
  { srNo: '17', client: 'HINDUJA GROUP', logo: '/clients/private/hinduja.png', details: 'LAYING OF 18" & 24" STEEL PIPE - TOTAL LENGTH = 2.2 KM', location: 'WAINGANGA RIVER CROSSING (MAHARASHTRA)', cost: '4.75 CR' },
  { srNo: '18', client: 'ONGC', logo: '/clients/private/ongc.png', details: 'LAYING OF 12" & 16" PIPELINES - TOTAL LENGTH = 3.6 KM', location: 'ASSAM & ARUNACHAL PRADESH', cost: '3.85 CR' },
];

const tableVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const, staggerChildren: 0.05, delayChildren: 0.2 }
  }
};

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export default function ProjectsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  
  // Engineering line scroll effect removed

  return (
    <SmoothScroll>
      <div className="bg-slate-50 min-h-screen font-sans">
        
        {/* HERO SECTION */}
        <section ref={heroRef} className="relative w-full h-[65vh] min-h-[500px] flex bg-navy overflow-hidden">
          <div className="container-x w-full h-full flex flex-col lg:flex-row relative z-10">
            
            {/* Left Content (45%) */}
            <motion.div 
              style={{ y: textY }}
              className="flex-1 lg:w-[45%] flex flex-col justify-center pr-8 lg:pr-16 relative z-20 h-full pt-16"
            >
              <div className="max-w-xl">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex items-center gap-4 mb-6"
                >
                  <div className="w-8 h-[2px] bg-primary" />
                  <span className="text-primary uppercase tracking-[0.2em] font-bold text-xs">
                    Our Projects
                  </span>
                </motion.div>
                
                <h1 className="text-display text-3xl md:text-4xl lg:text-[44px] font-bold uppercase text-white leading-[1.1] mb-6 overflow-hidden">
                  <motion.span 
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                    className="block"
                  >
                    Delivered For
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                    className="block text-white/95"
                  >
                    India's
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                    className="block text-white/95"
                  >
                    Largest Clients
                  </motion.span>
                </h1>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-white/70 text-[15px] md:text-base leading-relaxed max-w-lg"
                >
                  Mission-critical trenchless and underground infrastructure projects executed for government authorities, EPC contractors and leading private sector organizations.
                </motion.p>
              </div>
            </motion.div>

            {/* Right Image (55%) */}
            <div className="absolute inset-0 lg:relative lg:inset-auto lg:w-[55%] h-full flex items-center justify-end lg:pl-10">
              <motion.div 
                style={{ y: imageY }}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 lg:relative lg:inset-auto lg:w-full lg:h-[85%] lg:mt-8 overflow-hidden lg:shadow-2xl"
              >
                <div className="absolute inset-0 lg:hidden bg-gradient-to-r from-navy via-navy/90 to-navy/30 z-10" />
                <div className="absolute inset-0 lg:hidden bg-gradient-to-t from-navy via-transparent to-transparent z-10" />
                <Image 
                  src="/images/projects/p13.jpg" 
                  alt="Trenchless project site" 
                  fill 
                  priority
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>

        </section>

        {/* PROJECT ARCHIVE SECTION */}
        <section className="pt-20 pb-32 relative">
          
          {/* Engineering subtle background grid */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div className="container-x relative z-10">
            
            <div className="mb-14 pl-2 lg:pl-[8%] max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                {/* Horizontal Engineering Section Marker */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex items-center mb-5 origin-left"
                >
                  <div className="w-[80px] md:w-[120px] lg:w-[150px] h-[2px] bg-primary" />
                  <div className="w-2 h-2 rounded-full bg-primary -ml-[1px]" />
                </motion.div>

                <p className="eyebrow text-primary mb-3">Project Portfolio</p>
                <h2 className="text-display text-3xl md:text-4xl font-bold uppercase text-navy mb-4">
                  Our Achievements
                </h2>
                <p className="text-navy/70 text-base leading-relaxed">
                  Major trenchless, HDD, pipeline crossing and underground infrastructure projects successfully executed across India.
                </p>
              </motion.div>
            </div>

            {/* THE PROJECT ARCHIVE CONTAINER (DESKTOP) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={tableVariants}
              className="w-full max-w-[1400px] mx-auto bg-white border border-slate-200 rounded-sm shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden hidden lg:block relative"
            >
              {/* Archive Header */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-slate-50/50">
                <span className="font-bold text-navy/90 tracking-[0.2em] uppercase text-xs flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Project Archive
                </span>
                <span className="font-display font-bold text-navy/40 text-sm tracking-widest">
                  01 — 18
                </span>
              </div>

              <table className="w-full text-left border-collapse table-fixed">
                <thead className="bg-white border-b border-slate-200 sticky top-20 z-20">
                  <tr>
                    <th className="w-[8%] px-8 py-5 font-bold uppercase tracking-[0.1em] text-[11px] text-navy/50">Sr. No.</th>
                    <th className="w-[28%] px-8 py-5 font-bold uppercase tracking-[0.1em] text-[11px] text-navy/50">Client</th>
                    <th className="w-[32%] px-8 py-5 font-bold uppercase tracking-[0.1em] text-[11px] text-navy/50">Project Details</th>
                    <th className="w-[20%] px-8 py-5 font-bold uppercase tracking-[0.1em] text-[11px] text-navy/50">Site Location</th>
                    <th className="w-[12%] px-8 py-5 font-bold uppercase tracking-[0.1em] text-[11px] text-navy/50 text-right">Work Cost</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {projects.map((proj, idx) => (
                    <motion.tr 
                      variants={rowVariants}
                      key={idx}
                      className="group hover:bg-[#FDFDFD] transition-colors relative"
                    >
                      {/* Left subtle indicator on hover */}
                      <td className="relative px-8 py-7 font-display font-bold text-navy/30 text-base group-hover:text-primary transition-colors">
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        {proj.srNo}
                      </td>
                      <td className="px-8 py-7">
                        <div className="flex items-center gap-5">
                          <div className="w-[52px] h-[52px] shrink-0 bg-white border border-slate-100 rounded-sm flex items-center justify-center p-2 transition-transform duration-300 group-hover:scale-[1.04] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                            <Image src={proj.logo} alt={proj.client} width={40} height={40} className="object-contain w-full h-full" unoptimized />
                          </div>
                          <span className="font-bold text-navy/80 uppercase text-[13px] tracking-wide leading-tight group-hover:text-navy transition-colors">{proj.client}</span>
                        </div>
                      </td>
                      <td className="px-8 py-7 text-[14px] text-navy/70 leading-relaxed font-medium group-hover:text-navy/90 transition-colors">
                        {proj.details}
                      </td>
                      <td className="px-8 py-7 text-[13px] text-navy/50 font-medium group-hover:text-navy/70 transition-colors">
                        {proj.location}
                      </td>
                      <td className="px-8 py-7 text-right whitespace-nowrap">
                        <span className="font-display font-bold text-primary text-[15px] tracking-wide">
                          {proj.cost}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* MOBILE / TABLET RESPONSIVE LAYOUT */}
            <div className="lg:hidden w-full overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex items-center justify-between px-4 py-4 border border-slate-200 border-b-0 bg-slate-50/50 rounded-t-sm min-w-[800px]">
                <span className="font-bold text-navy/90 tracking-[0.2em] uppercase text-[10px] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Project Archive
                </span>
                <span className="font-display font-bold text-navy/40 text-xs tracking-widest">01 — 18</span>
              </div>
              <motion.table 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={tableVariants}
                className="w-full min-w-[800px] text-left border-collapse bg-white border border-slate-200 rounded-b-sm shadow-sm"
              >
                <thead className="bg-white border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-4 font-bold uppercase tracking-[0.1em] text-[10px] text-navy/50 whitespace-nowrap">Sr. No.</th>
                    <th className="px-5 py-4 font-bold uppercase tracking-[0.1em] text-[10px] text-navy/50 whitespace-nowrap">Client</th>
                    <th className="px-5 py-4 font-bold uppercase tracking-[0.1em] text-[10px] text-navy/50 whitespace-nowrap">Project Details</th>
                    <th className="px-5 py-4 font-bold uppercase tracking-[0.1em] text-[10px] text-navy/50 whitespace-nowrap">Site Location</th>
                    <th className="px-5 py-4 font-bold uppercase tracking-[0.1em] text-[10px] text-navy/50 text-right whitespace-nowrap">Work Cost</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {projects.map((proj, idx) => (
                    <motion.tr 
                      variants={rowVariants}
                      key={idx}
                    >
                      <td className="px-5 py-6 font-display font-bold text-navy/40 text-sm">{proj.srNo}</td>
                      <td className="px-5 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 shrink-0 bg-white border border-slate-100 rounded-sm flex items-center justify-center p-1.5">
                            <Image src={proj.logo} alt={proj.client} width={32} height={32} className="object-contain w-full h-full" unoptimized />
                          </div>
                          <span className="font-bold text-navy/80 uppercase text-[11px] tracking-wide">{proj.client}</span>
                        </div>
                      </td>
                      <td className="px-5 py-6 text-[13px] text-navy/70 font-medium leading-relaxed">{proj.details}</td>
                      <td className="px-5 py-6 text-[12px] text-navy/50 font-medium">{proj.location}</td>
                      <td className="px-5 py-6 text-right">
                        <span className="font-display font-bold text-primary text-[13px] tracking-wide">
                          {proj.cost}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>
            </div>

          </div>
        </section>

        {/* SINGLE CTA SECTION */}
        <section className="relative py-28 lg:py-36 overflow-hidden bg-navy">
          <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy-deep z-0" />
          <div className="absolute right-0 bottom-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px] pointer-events-none z-0" />
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 container-x"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 max-w-[1300px] mx-auto border-l-2 border-primary pl-6 md:pl-10">
              <div className="max-w-2xl">
                <h2 className="text-display text-3xl md:text-[42px] font-bold uppercase tracking-widest text-white leading-[1.1]">
                  Got An Underground Project? <br className="hidden md:block" /> Let's Engineer It.
                </h2>
              </div>
              <div className="shrink-0">
                <Link href="/contact">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    className="bg-primary hover:bg-primary-bright text-white px-8 py-4 font-bold uppercase tracking-[0.15em] text-[13px] transition-all shadow-[0_4px_20px_rgba(255,102,0,0.3)] rounded-sm flex items-center gap-3"
                  >
                    Contact Us 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
      <ParallaxFooter />
    </SmoothScroll>
  );
}

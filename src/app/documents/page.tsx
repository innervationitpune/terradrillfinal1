'use client';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import ParallaxFooter from '@/components/ParallaxFooter';
import { useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Cable, Waypoints, Waves, TrainFront, BadgeCheck, Ruler, ExternalLink, Download } from 'lucide-react';

const allDocuments = [
  {
    id: 1,
    category: "Utility Crossings",
    title: "Chandani Chowk Utility Infrastructure Crossing",
    client: "Pune Municipal Corporation",
    location: "Pune, Maharashtra",
    year: "2017",
    desc: "Utility corridor planning, underground infrastructure alignment and crossing layout for a major urban infrastructure corridor.",
    link: "/documents/1-DRG._NO._801_R5_Chandani_chowk_layout_plan_22.09.2017.pdf",
    size: "4.70 MB",
    icon: Cable,
    color: "#a78bfa" // purple
  },
  {
    id: 2,
    category: "Sewer Infrastructure",
    title: "Hadapsar Main Sewer Line Project — Line No. 07",
    client: "Pune Municipal Corporation",
    location: "Hadapsar, Pune",
    year: "2023",
    desc: "Underground sewer infrastructure and utility crossing involving sewer network development and trenchless execution along Hadapsar Nalla.",
    link: "/documents/LINE_NO-07_MAIN_SEWER_LINE_ALONG_HADAPSAR_NALLA_06-02-2023-4.pdf",
    size: "2.61 MB",
    icon: Waypoints,
    color: "#34d399" // emerald
  },
  {
    id: 3,
    category: "River Crossings",
    title: "Luni River Crossing",
    client: "Gas / Pipeline Authority",
    location: "Luni River, Rajasthan",
    year: null,
    desc: "River crossing engineering solution demonstrating HDD alignment and underground utility installation beneath water bodies.",
    link: "/documents/Luni_River_Crossing_Drawing.pdf",
    size: "0.25 MB",
    icon: Waves,
    color: "#38bdf8" // sky
  },
  {
    id: 4,
    category: "River Crossings",
    title: "Ravet River Crossing Tunnel — PCMC",
    client: "PCMC",
    location: "Ravet, Pune",
    year: null,
    desc: "L-section and plan of river crossing tunnel showcasing underground infrastructure execution beneath river corridors.",
    link: "/documents/L_SECTION_PLAN_OF_RIVER_CROSSING_TUNNEL_AT_RAVET_IN_PCMC.PUNE-Model.pdf",
    size: "0.27 MB",
    icon: Waves,
    color: "#38bdf8"
  },
  {
    id: 5,
    category: "Railway Crossings",
    title: "Bhusawal Railway Foundation Project (PWL-FDN-02)",
    client: "Indian Railways — Central Railway",
    location: "Bhusawal, Maharashtra",
    year: null,
    desc: "Foundation engineering and railway infrastructure support works for Indian Railways workshop facilities.",
    link: "/documents/BHUSAWAL_-_PWL_-_FDN_-_02.pdf",
    size: "0.46 MB",
    icon: TrainFront,
    color: "#f97316" // orange
  },
  {
    id: 6,
    category: "Railway Crossings",
    title: "Central Railway Pune Infrastructure (CR-PUNE-2024-WL-10)",
    client: "Indian Railways — Central Railway",
    location: "Pune Division",
    year: "2024",
    desc: "Railway utility crossing and underground infrastructure execution supporting railway operations.",
    link: "/documents/CR-PUNE-2024-WL-10.pdf",
    size: "0.28 MB",
    icon: TrainFront,
    color: "#f97316"
  },
  {
    id: 7,
    category: "Client Credentials",
    title: "Repairing and Maintenance of Footpath, Paving Blocks in Tathwade, Punawale, Wakad and Other Areas at Ward No. 25",
    client: "Pimpri Chinchwad Municipal Corporation",
    location: "Pune, Maharashtra",
    year: "2022",
    desc: "Work-done certificate for repairing and maintenance of footpaths and paving blocks across Tathwade, Punawale, Wakad and other areas under Ward No. 25.",
    link: "/documents/pimpri_chinchava_work_done_certi.pdf",
    size: "0.25 MB",
    icon: BadgeCheck,
    color: "#fbbf24" // amber
  },
  {
    id: 8,
    category: "Technical Drawings",
    title: "General Arrangement Engineering Drawing (R3)",
    client: null,
    location: null,
    year: null,
    desc: "Detailed engineering layout demonstrating design, planning and execution standards used in complex infrastructure projects.",
    link: "/documents/127.1001.02_R3_GA_DRAWING_AGAINST_JOINT_NOTE_FOR_APPROVAL_1.pdf",
    size: "0.83 MB",
    icon: Ruler,
    color: "#f97316"
  }
];

const categories = ["All", "Railway Crossings", "River Crossings", "Sewer Infrastructure", "Utility Crossings", "Technical Drawings", "Client Credentials"];

export default function DocumentsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredDocs = useMemo(() => {
    return allDocuments.filter(doc => {
      const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
      const matchesSearch = 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.client && doc.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (doc.location && doc.location.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <SmoothScroll>
      <main ref={containerRef} className="relative min-h-screen z-10 font-sans overflow-hidden bg-navy-deep text-white">
        
        {/* HERO SECTION */}
        <section ref={heroRef} className="relative w-full h-[72vh] min-h-[520px] flex items-center overflow-hidden pt-20 bg-navy">
          <motion.div 
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ scale: heroScale, y: heroY }}
            className="absolute inset-0 z-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-no-repeat"
              style={{ backgroundImage: 'url(/images/projects/p7.jpg)', backgroundPosition: '80% center' }}
            />
            {/* Exactly recreating the gradient overlays from the source */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/60 to-navy-deep/30 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/40 to-transparent" />
          </motion.div>

          <div className="container-x relative z-10 w-full mx-auto max-w-7xl pt-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mb-4"
            >
              <span className="text-primary uppercase tracking-[0.2em] font-bold text-xs md:text-sm drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
                Technical Document Library
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-display text-4xl md:text-5xl lg:text-7xl font-bold uppercase text-white leading-[1.1] mb-6 max-w-5xl drop-shadow-[0_2px_16px_rgba(0,0,0,0.60)]"
            >
              Engineering Drawings & Credentials
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl font-light drop-shadow-[0_1px_10px_rgba(0,0,0,0.55)]"
            >
              Authentic project drawings, work orders and technical documents from TERRADRILL & ENERGY PRIVATE LIMITED's executed portfolio. Each document is a downloadable PDF.
            </motion.p>
          </div>
        </section>

        {/* SEARCH & FILTER STRIP */}
        <section className="bg-[#0a0f18] py-10 border-y border-white/5 relative z-20">
          <div className="container-x max-w-7xl mx-auto">
            <div className="bg-white/5 border border-white/10 p-5 flex flex-col md:flex-row gap-4 items-stretch md:items-center rounded-sm">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input 
                  type="text"
                  placeholder="Search drawings, clients, locations…" 
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary transition-colors rounded-sm placeholder-white/40"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select 
                className="px-4 py-3 bg-[#111827] border border-white/10 text-sm font-bold uppercase tracking-[0.12em] text-white focus:outline-none focus:border-primary transition-colors rounded-sm cursor-pointer"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.16em] text-white/40 font-bold">
                {filteredDocs.length} {filteredDocs.length === 1 ? 'document' : 'documents'}
              </span>
              {searchQuery && (
                <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-sm">
                  Filter active
                </span>
              )}
            </div>
          </div>
        </section>

        {/* DOCUMENTS GRID */}
        <section className="bg-navy-deep py-12 md:py-20 relative z-10 min-h-[40vh]">
          <div className="container-x max-w-7xl mx-auto">
            
            <AnimatePresence mode="popLayout">
              {filteredDocs.length > 0 ? (
                <motion.div 
                  layout
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                  {filteredDocs.map((doc, i) => {
                    const Icon = doc.icon;
                    return (
                      <motion.article 
                        layout
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        key={doc.id}
                        className="group bg-white/5 border border-white/10 hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col rounded-sm overflow-hidden"
                      >
                        {/* Card Header / Graphic Area */}
                        <div className="aspect-[4/3] bg-gradient-to-br from-navy-deep via-navy to-navy-deep relative flex items-center justify-center overflow-hidden border-b border-white/5">
                          <div 
                            className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]"
                            style={{ backgroundSize: '16px 16px' }}
                          />
                          <div className="absolute inset-x-0 bottom-0 h-1" style={{ background: doc.color }} />
                          <Icon className="w-16 h-16 relative z-10 group-hover:scale-110 transition-transform duration-500" style={{ color: doc.color }} strokeWidth={1} />
                          
                          <div 
                            className="absolute top-3 left-3 text-navy-deep text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-sm shadow-md"
                            style={{ background: doc.color }}
                          >
                            {doc.category}
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-base font-bold text-white uppercase tracking-tight leading-tight mb-4">
                            {doc.title}
                          </h3>
                          
                          {(doc.client || doc.location || doc.year) && (
                            <div className="mb-4 text-xs text-white/50 space-y-1 bg-black/20 p-3 rounded-sm border border-white/5">
                              {doc.client && <div><span className="font-bold text-white/70">Client:</span> {doc.client}</div>}
                              {doc.location && <div><span className="font-bold text-white/70">Location:</span> {doc.location}</div>}
                              {doc.year && <div><span className="font-bold text-white/70">Year:</span> {doc.year}</div>}
                            </div>
                          )}

                          <p className="text-sm text-white/60 leading-relaxed flex-1">
                            {doc.desc}
                          </p>

                          <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-3">
                            <a 
                              href={doc.link} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex-1 inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] transition border border-white/5 rounded-sm"
                            >
                              <ExternalLink className="w-3.5 h-3.5" /> View
                            </a>
                            <a 
                              href={doc.link} 
                              download
                              className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-bright text-white px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] transition rounded-sm shadow-lg shadow-primary/20"
                            >
                              <Download className="w-3.5 h-3.5" /> PDF
                            </a>
                          </div>
                          
                          <div className="mt-3 text-[10px] uppercase tracking-[0.18em] text-white/30 text-right font-medium">
                            {doc.size}
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-20 text-center flex flex-col items-center"
                >
                  <Search className="w-12 h-12 text-white/20 mb-4" />
                  <p className="text-white/60 text-lg">No documents found matching your criteria.</p>
                  <button 
                    onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                    className="mt-6 text-primary hover:text-primary-bright uppercase tracking-widest text-xs font-bold transition-colors"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="relative bg-navy overflow-hidden">
          <div className="absolute -right-20 -top-20 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
          <div className="container-x max-w-7xl mx-auto py-20 md:py-24 grid gap-8 md:grid-cols-[1fr_auto] items-center relative z-10">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white uppercase leading-[1.05] max-w-3xl">
                Need a project-specific credential or method statement?
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 rounded-sm bg-primary hover:bg-primary-bright px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition shadow-lg shadow-primary/20"
              >
                Contact Us
              </Link>
              <Link 
                href="/projects"
                className="inline-flex items-center gap-2 rounded-sm border-2 border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white hover:bg-white/10 hover:border-white/40 transition"
              >
                View Projects
              </Link>
            </div>
          </div>
        </section>

      </main>
      
      <ParallaxFooter />
    </SmoothScroll>
  );
}

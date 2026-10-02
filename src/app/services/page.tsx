'use client';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import ParallaxFooter from '@/components/ParallaxFooter';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    id: 1,
    number: "01",
    shortName: "HDD",
    title: "HORIZONTAL DIRECTIONAL DRILLING",
    description: "Advanced trenchless HDD solutions for pipelines, optical fiber cable (OFC), and utility crossings beneath rivers, roads, and railway corridors. Proven capability in executing complex installations for diameters up to 900 mm, ensuring minimal environmental impact and uninterrupted surface operations.",
    image: "/images/services/service-01.jpg"
  },
  {
    id: 2,
    number: "02",
    shortName: "PIPE JACKING",
    title: "PIPE JACKING",
    description: "Specialized hydraulic pipe jacking solutions for large-diameter sewer, potable water, and utility infrastructure projects. Expertise in the installation of underground pipelines and tunnels with minimal surface disruption, supporting diameters up to 3,600 mm.",
    image: "/images/services/service-02.jpg"
  },
  {
    id: 3,
    number: "03",
    shortName: "MICROTUNNELING",
    title: "MICROTUNNELING",
    description: "Precision-engineered, remote-controlled microtunneling solutions for the installation of underground infrastructure beneath urban environments, highways, and railway networks. Execution capability for projects up to 2,600 mm diameter, ensuring high accuracy and operational efficiency in challenging ground conditions.",
    image: "/images/services/service-03.jpg"
  },
  {
    id: 4,
    number: "04",
    shortName: "RAILWAY CROSSINGS",
    title: "RAILWAY CROSSINGS",
    description: "Industry-leading expertise in the execution of trenchless railway crossings beneath active railway corridors without disruption to rail operations. Successfully completed crossings up to 2,200 mm diameter across multiple divisions of South Central Railway, Western Railway, Eastern Railway, and Central Railway. Backed by over two decades of proven project delivery and execution excellence, Trayana Infratech Public Limited has established a strong track record in delivering safe, reliable, and technically demanding railway crossing projects.",
    image: "/images/services/service-04.jpg"
  },
  {
    id: 5,
    number: "05",
    shortName: "WATER INFRASTRUCTURE",
    title: "WATER PIPELINE INFRASTRUCTURE",
    description: "End-to-end execution of water transmission pipelines, distribution networks, Water Treatment Plants (WTP), pumping stations, and Overhead Water Tanks (OHT) for municipal and industrial clients.",
    image: "/images/services/service-05.jpg"
  },
  {
    id: 6,
    number: "06",
    shortName: "UTILITY CROSSINGS",
    title: "UTILITY CROSSINGS",
    description: "Specialized utility crossing solutions for water, sewer, gas, power, and telecom networks using trenchless and conventional methods, ensuring safe installation with minimal surface disruption.",
    image: "/images/services/service-06.jpg"
  },
  {
    id: 7,
    number: "07",
    shortName: "SEWER INFRASTRUCTURE",
    title: "SEWER INFRASTRUCTURE",
    description: "Deep sewer tunnels, manhole construction and trenchless rehabilitation of legacy networks.",
    image: "/images/services/service-07.jpg"
  },
  {
    id: 8,
    number: "08",
    shortName: "INTEGRATED EPC",
    title: "INTEGRATED EPC SOLUTIONS",
    description: "Turnkey engineering, procurement, and construction (EPC) services for water, wastewater, utility, and underground infrastructure projects, delivering reliable and sustainable assets for communities and industries.",
    image: "/images/services/service-08.jpg"
  },
  {
    id: 9,
    number: "09",
    shortName: "UNDERGROUND NETWORKS",
    title: "UNDERGROUND NETWORK SOLUTIONS",
    description: "Integrated underground network planning, design and EPC delivery for cities and industrial parks.",
    image: "/images/services/service-09.jpg"
  },
  {
    id: 10,
    number: "10",
    shortName: "NATM / NEW AUSTRIAN TUNNELLING METHOD",
    title: "NATM",
    description: "Specialized underground excavation using the New Austrian Tunnelling Method (NATM). We leverage advanced geological monitoring and sequential excavation with immediate shotcrete and rock bolt support. This highly adaptable method ensures structural integrity and safety in varying ground conditions, making it ideal for complex urban tunnels, caverns, and deep infrastructure projects.",
    image: "/images/services/natm.jpg"
  }
];

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 9 services -> map 0-1 progress to 0-8 index
    const totalServices = services.length;
    // adding a small buffer so the last one stays active a bit longer
    let idx = Math.floor(latest * totalServices);
    if (idx >= totalServices) idx = totalServices - 1;
    if (idx < 0) idx = 0;

    if (idx !== activeIdx) {
      setActiveIdx(idx);
    }
  });

  const activeService = services[activeIdx];

  // Optional function to scroll to a specific service
  const scrollToService = (index: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = rect.height - window.innerHeight;
      const targetScroll = window.scrollY + rect.top + (containerHeight * (index / (services.length - 1)));
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <SmoothScroll>
      <div className="bg-navy-deep min-h-screen text-white">

        {/* Intro Section */}
        <section className="relative pt-40 pb-20 px-4 max-w-[1400px] mx-auto">
          <p className="text-primary uppercase tracking-[0.2em] font-bold text-sm mb-4">Services</p>
          <h1 className="text-display text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[1.1] text-white max-w-4xl mb-6">
            End-to-End Infrastructure <br />
            <span className="text-primary">Excellence.</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl leading-relaxed font-light">
            Integrated engineering, procurement, construction, and project management solutions across diverse infrastructure sectors, delivering sustainable and high-performance assets for public and private clients.
          </p>
        </section>

        {/* SCROLLYTELLING CONTAINER - Desktop */}
        <div className="hidden lg:block relative" ref={containerRef} style={{ height: '1000vh' }}>
          <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden border-t border-white/10">
            <div className="max-w-[1600px] mx-auto w-full h-full flex px-4 md:px-8 xl:px-12 py-24 gap-12">

              {/* LEFT: Cinematic Engineering Visual (60%) */}
              <div className="w-[60%] h-full relative rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-black">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeService.image}
                      alt={activeService.title}
                      fill
                      priority
                      className="object-cover"
                    />

                    {/* Subtle mask / gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 mix-blend-multiply" />

                    {/* Engineering Line Motif overlaying the image */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute top-1/2 left-0 h-[1px] bg-primary/30"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Fixed Decorative Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-20"
                  style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
              </div>

              {/* RIGHT: Active Service Information (40%) */}
              <div className="w-[40%] h-full flex flex-col justify-center pr-8 relative">

                {/* Small indicator map */}
                <div className="absolute left-[-2rem] top-1/2 -translate-y-1/2 flex flex-col gap-3">
                  {services.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToService(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeIdx ? 'bg-primary scale-150' : 'bg-white/20 hover:bg-white/50'}`}
                      aria-label={`Go to service ${i + 1}`}
                    />
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-col h-full justify-center max-w-lg"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-primary font-bold font-display text-4xl">{activeService.number}</span>
                      <span className="w-12 h-[2px] bg-white/20"></span>
                      <span className="text-white/50 font-bold tracking-[0.2em] text-xs uppercase">{activeService.shortName}</span>
                    </div>

                    <h2 className="text-display text-4xl xl:text-5xl font-bold uppercase tracking-tight text-white mb-8 leading-[1.1]">
                      {activeService.title}
                    </h2>

                    <p className="text-white/80 text-lg leading-relaxed font-light mb-12 line-clamp-4">
                      {activeService.description}
                    </p>

                    {activeService.description.length > 50 && (
                      <button
                        onClick={() => setModalOpen(true)}
                        className="group flex items-center gap-3 text-primary uppercase tracking-[0.2em] font-bold text-sm hover:text-white transition-colors w-fit"
                      >
                        Read More
                        <span className="group-hover:translate-x-2 transition-transform">→</span>
                      </button>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Master Progress Indicator */}
                <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 pt-6 flex items-center justify-between">
                  <div className="text-white/40 font-bold tracking-[0.2em] text-xs">
                    SERVICE {activeService.number} / {services.length < 10 ? `0${services.length}` : services.length}
                  </div>
                  <div className="w-1/2 h-[2px] bg-white/10 relative overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-primary"
                      style={{ width: `${((activeIdx + 1) / services.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* MOBILE FALLBACK - Standard Stack */}
        <div className="lg:hidden px-4 pb-24">
          <div className="flex flex-col gap-20">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-white/10 shadow-xl mb-8">
                  <Image src={service.image} alt={service.title} fill className="object-cover" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-primary font-bold font-display text-2xl">{service.number}</span>
                  <span className="text-white/50 font-bold tracking-[0.1em] text-xs uppercase">{service.shortName}</span>
                </div>
                <h2 className="text-display text-3xl font-bold uppercase tracking-tight text-white mb-4">
                  {service.title}
                </h2>
                <p className="text-white/80 text-base leading-relaxed font-light mb-6">
                  {service.description.substring(0, 150)}{service.description.length > 150 ? '...' : ''}
                </p>
                {service.description.length > 150 && (
                  <button
                    onClick={() => {
                      setActiveIdx(i);
                      setModalOpen(true);
                    }}
                    className="text-primary uppercase tracking-[0.2em] font-bold text-xs flex items-center gap-2"
                  >
                    Read More <span>→</span>
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* DETAILS MODAL */}
        <AnimatePresence>
          {modalOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setModalOpen(false)}
                className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 bottom-0 w-full md:w-[600px] bg-navy-deep z-[101] border-l border-white/10 shadow-2xl flex flex-col"
              >
                <div className="p-8 md:p-12 border-b border-white/10 flex justify-between items-center bg-navy/50">
                  <div className="text-primary font-bold tracking-[0.2em] text-xs uppercase">Service Detail</div>
                  <button onClick={() => setModalOpen(false)} className="text-white/50 hover:text-white transition-colors p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-primary font-bold font-display text-4xl">{activeService.number}</span>
                  </div>
                  <h2 className="text-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-8">
                    {activeService.title}
                  </h2>

                  <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-white/10 mb-10">
                    <Image src={activeService.image} alt={activeService.title} fill className="object-cover" />
                  </div>

                  <div className="prose prose-invert prose-lg max-w-none">
                    <p className="text-white/80 font-light leading-relaxed">
                      {activeService.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <section className="relative py-32 overflow-hidden bg-navy border-t border-white/10">
          <div className="absolute -left-20 -bottom-20 w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-[1400px] mx-auto px-4"
          >
            <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
              <div>
                <h2 className="text-display text-4xl md:text-5xl font-bold uppercase tracking-widest text-white leading-[1.1] max-w-3xl">
                  Looking for a trenchless EPC partner?
                </h2>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="bg-primary hover:bg-primary-bright text-white px-8 py-4 font-bold uppercase tracking-[0.15em] text-sm transition-all shadow-xl rounded-sm flex items-center gap-2"
                  >
                    Contact Us
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                  </motion.button>
                </Link>
                <Link href="/projects">
                  <motion.button
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                    className="border-2 border-white/30 text-white px-8 py-4 font-bold uppercase tracking-[0.15em] text-sm transition-all rounded-sm"
                  >
                    View Projects
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

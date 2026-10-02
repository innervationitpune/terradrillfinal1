'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const services = [
  {
    title: 'HDD',
    desc: 'Advanced trenchless HDD solutions for pipelines, optical fiber cable (OFC), and utility crossings beneath rivers, roads, and railway corridors. Proven capability in executing complex installations for diameters up to 900 mm, ensuring minimal environmental impact and uninterrupted surface operations.',
  },
  {
    title: 'Jacking & Pushing',
    desc: 'Specialized hydraulic pipe jacking solutions for large-diameter sewer, potable water, and utility infrastructure projects. Expertise in the installation of underground pipelines and tunnels with minimal surface disruption, supporting diameters up to 3,600 mm.',
  },
  {
    title: 'Microtunneling',
    desc: 'Precision-engineered, remote-controlled microtunneling solutions for the installation of underground infrastructure beneath urban environments, highways, and railway networks. Execution capability for projects up to 2,600 mm diameter, ensuring high accuracy and operational efficiency in challenging ground conditions.',
  },
  {
    title: 'Railway Crossings',
    desc: 'Industry-leading expertise in the execution of trenchless railway crossings beneath active railway corridors without disruption to rail operations. Successfully completed crossings up to 2,200 mm diameter across multiple divisions of South Central Railway, Western Railway, Eastern Railway, and Central Railway. Backed by over two decades of proven project delivery and execution excellence, Trayana Infratech Public Limited has established a strong track record in delivering safe, reliable, and technically demanding railway crossing projects.',
  },
  {
    title: 'Water Infrastructure',
    desc: 'End-to-end execution of water transmission pipelines, distribution networks, Water Treatment Plants (WTP), pumping stations, and Overhead Water Tanks (OHT) for municipal and industrial clients.',
  },
  {
    title: 'Utility Crossings',
    desc: 'Specialized utility crossing solutions for water, sewer, gas, power, and telecom networks using trenchless and conventional methods, ensuring safe installation with minimal surface disruption.',
  },
  {
    title: 'Sewerage & Wastewater Infrastructure',
    desc: 'Deep sewer tunnels, manhole construction and trenchless rehabilitation of legacy networks.',
  },
  {
    title: 'Integrated EPC Solutions',
    desc: 'Turnkey engineering, procurement, and construction (EPC) services for water, wastewater, utility, and underground infrastructure projects, delivering reliable and sustainable assets for communities and industries.',
  },
  {
    title: 'Underground Networks',
    desc: 'Integrated underground network planning, design and EPC delivery for cities and industrial parks.',
  }
];

export default function ServicesShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSvc, setActiveSvc] = useState<typeof services[0] | null>(null);

  useEffect(() => {
    if (activeSvc) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [activeSvc]);
  
  return (
    <section ref={containerRef} className="py-32 bg-navy-deep text-white relative z-10">
      <div className="max-w-7xl mx-auto px-8">

        {/* ── Services header: text left + image right ── */}
        <div
          className="mb-16 items-center"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 52fr) minmax(0, 48fr)',
            gap: '3rem',
          }}
        >
          {/* Left: text */}
          <div>
            <p className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4">Our Services</p>
            <h2 className="text-display text-5xl md:text-7xl font-bold uppercase tracking-tight mb-6">
              Trenchless Engineering. End to End.
            </h2>
            <p className="text-xl text-white/70 leading-relaxed">
              A comprehensive range of underground and above-ground infrastructure solutions delivered through integrated engineering expertise and a specialized owned fleet.
            </p>
          </div>

          {/* Right: supplied image */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl" style={{ height: '340px' }}>
            <img
              src="/images/services/services-hero.jpg"
              alt="Trenchless engineering — HDD drilling rig at dusk"
              className="w-full h-full object-cover object-center"
              style={{ objectPosition: 'right center' }}
            />
            {/* Gradient bleed so the image fades into the navy background on the left */}
            <div
              className="absolute inset-y-0 left-0 w-24 pointer-events-none"
              style={{ background: 'linear-gradient(to right, #081020 0%, transparent 100%)' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-white/10 p-px rounded-xl overflow-hidden">
          {services.map((svc, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="bg-navy-deep p-8 hover:bg-[#071b3d] transition-colors group flex flex-col h-[320px]"
            >
              <div className="text-primary text-sm font-bold tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="mt-3 mb-4 text-2xl font-bold uppercase tracking-tight text-white line-clamp-2">{svc.title}</h3>
              <p className="text-sm text-white/65 leading-relaxed flex-grow line-clamp-3">
                {svc.desc}
              </p>
              <div className="mt-auto pt-8 flex items-center justify-between border-t border-white/5">
                <button type="button" onClick={() => setActiveSvc(svc)} className="text-xs font-bold uppercase tracking-[0.14em] text-primary group-hover:text-white transition cursor-pointer">Read more</button>
                <div className="h-[2px] w-8 bg-primary group-hover:w-16 transition-all"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeSvc && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-deep/90 backdrop-blur-md"
            onClick={() => setActiveSvc(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#071b3d] border border-primary/30 p-8 md:p-12 max-w-2xl w-full rounded-xl relative shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setActiveSvc(null)} className="absolute top-6 right-6 text-white/50 hover:text-white text-3xl font-light">&times;</button>
              <h3 className="text-3xl font-bold uppercase tracking-tight text-white mb-6 pr-8">{activeSvc.title}</h3>
              <p className="text-lg text-white/80 leading-relaxed">{activeSvc.desc}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

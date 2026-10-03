'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    id: '01',
    client: 'RELIANCE',
    title: 'HDPE Pipeline Infrastructure',
    location: 'Odisha',
    type: 'HDD Pipeline',
    scale: '7 KM / ₹4.40 Cr',
    challenge: 'Long-distance alignment through challenging geological formations with strict environmental constraints.',
    solution: 'Utilized maxi-rig HDD systems to execute continuous long-distance pulls, minimizing surface disruption.',
    img: '/images/projects/case-study-01.jpg'
  },
  {
    id: '02',
    client: 'CENTRAL RAILWAY',
    title: 'Solapur Division Crossing',
    location: 'Solapur',
    type: 'Pipe Jacking',
    scale: '1500mm Dia / 1100 Meters / ₹7.03 Cr',
    challenge: 'Installing large diameter casing beneath active railway tracks without disrupting train schedules.',
    solution: 'Deployed specialized hydraulic pipe jacking systems with continuous monitoring to prevent settlement.',
    img: '/images/projects/case-study-02.jpg'
  },
  {
    id: '03',
    client: 'MIDC',
    title: 'Ahmednagar Crossing',
    location: 'Ahmednagar',
    type: 'Microtunneling',
    scale: '1200mm Dia / 289 Meters / ₹2.33 Cr',
    challenge: 'Navigating highly congested industrial utility corridors.',
    solution: 'Precision microtunneling with laser guidance to ensure exact grade and alignment.',
    img: '/images/projects/case-study-03.jpg'
  },
  {
    id: '04',
    client: 'L&T CONSTRUCTION',
    title: '24x7 Water Supply Project',
    location: 'India',
    type: 'Utility Infrastructure',
    scale: '650 Meters / ₹1.55 Cr',
    challenge: 'Urban water network integration requiring multiple crossings.',
    solution: 'Optimized HDD trajectories to bypass existing subterranean infrastructure.',
    img: '/images/projects/case-study-04.jpg'
  }
];

export default function ProjectCaseStudies() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#050914] text-white">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-20">

        <div className="absolute top-12 left-8 md:left-16 z-20 pointer-events-none">
          <p className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4">Project Intelligence</p>
          <h2 className="text-display text-5xl md:text-[6rem] font-bold uppercase tracking-tighter leading-[0.9]">
            Projects
          </h2>
        </div>

        <motion.div style={{ x }} className="flex w-[400vw] h-[70vh] items-center px-8 md:px-16 pt-24 gap-16 md:gap-32">
          {projects.map((project) => (
            <div key={project.id} className="w-[85vw] md:w-[80vw] shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

              {/* Image Side */}
              <div className="relative h-[40vh] lg:h-[60vh] rounded-2xl overflow-hidden group">
                <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-primary font-bold tracking-[0.2em] mb-2 text-sm">{project.client}</p>
                  <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">{project.title}</h3>
                </div>
              </div>

              {/* Data Side */}
              <div className="flex flex-col gap-8 bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10">
                <div className="grid grid-cols-2 gap-8 pb-8 border-b border-white/10">
                  <div>
                    <p className="text-white/40 uppercase text-xs tracking-widest mb-1">Project Type</p>
                    <p className="font-bold text-lg">{project.type}</p>
                  </div>
                  <div>
                    <p className="text-white/40 uppercase text-xs tracking-widest mb-1">Location</p>
                    <p className="font-bold text-lg">{project.location}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-white/40 uppercase text-xs tracking-widest mb-1">Scope & Scale</p>
                    <p className="font-bold text-xl text-primary">{project.scale}</p>
                  </div>
                </div>

                <div>
                  <p className="text-white/40 uppercase text-xs tracking-widest mb-2">Engineering Challenge</p>
                  <p className="text-white/80 leading-relaxed">{project.challenge}</p>
                </div>

                <div>
                  <p className="text-white/40 uppercase text-xs tracking-widest mb-2">Solution</p>
                  <p className="text-white/80 leading-relaxed">{project.solution}</p>
                </div>

                <button className="mt-4 border border-white/30 text-white rounded-full px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-navy-deep transition-colors self-start">
                  View Full Details
                </button>
              </div>

            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

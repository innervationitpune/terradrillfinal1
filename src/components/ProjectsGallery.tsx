'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedTitle } from './PremiumAnimations';

const projects = [
  { id: '01', title: "HDD Pipeline Installations", img: "https://Trayanainfra.netlify.app/images/hero-banner.jpg", location: "Global" },
  { id: '02', title: "Deep Water Infrastructure", img: "https://Trayanainfra.netlify.app/images/projects/p3.jpg", location: "Mumbai" },
  { id: '03', title: "Microtunneling Networks", img: "https://images.unsplash.com/photo-1541888086950-844fb2b12eb5?auto=format&fit=crop&q=80&w=1600", location: "Delhi" },
  { id: '04', title: "Urban Utility Ducting", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1600", location: "Dubai" }
];

export default function ProjectsGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#050914] overflow-hidden pt-32">
      <div className="absolute top-12 left-8 md:left-16 z-20 pointer-events-none mix-blend-difference">
        <p className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4">Portfolio</p>
        <AnimatedTitle 
          text="FEATURED WORKS"
          className="text-display text-5xl md:text-[7rem] font-bold text-white uppercase tracking-tighter leading-[0.8]"
        />
      </div>

      <div className="sticky top-0 h-screen flex items-center overflow-hidden pt-20">
        <motion.div style={{ x }} className="flex gap-12 md:gap-32 px-8 md:px-32 h-[65vh] items-center">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, scrollYProgress }: { project: any, index: number, scrollYProgress: any }) {
  // Inner image parallax calculation
  const start = index * 0.25;
  const end = start + 0.5;
  const imageX = useTransform(scrollYProgress, [start, end], ["-20%", "20%"]);

  return (
    <div className="group relative h-full w-[85vw] md:w-[50vw] shrink-0 overflow-visible cursor-pointer">
      <div className="absolute -top-24 -left-12 text-[15rem] font-bold text-white/5 z-0 pointer-events-none select-none text-display leading-none">
        {project.id}
      </div>
      
      <div className="relative w-full h-full rounded-2xl overflow-hidden z-10 shadow-2xl">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-10" />
        
        <motion.div style={{ x: imageX, scale: 1.15 }} className="absolute inset-0 w-full h-full origin-center">
          <img 
            src={project.img} 
            alt={project.title} 
            className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)]"
          />
        </motion.div>
      </div>
      
      <div className="absolute -bottom-16 left-0 z-20 overflow-hidden flex items-end justify-between w-full pr-8">
        <div>
          <h3 className="text-display text-4xl md:text-5xl font-bold text-white tracking-tighter">
            {project.title}
          </h3>
          <p className="text-primary tracking-[0.2em] uppercase font-bold mt-2 text-sm">
            {project.location}
          </p>
        </div>
      </div>
    </div>
  );
}

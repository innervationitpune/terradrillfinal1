'use client';
import { motion } from 'framer-motion';

export default function AboutTimeline() {
  const steps = [
    { year: "FOUNDATION", desc: "Established as a specialized infrastructure contractor focusing on core engineering capabilities." },
    { year: "TECHNOLOGY", desc: "Pioneered the adoption of advanced trenchless technologies, bringing international HDD standards to regional projects." },
    { year: "PROJECT EXPERIENCE", desc: "Successfully delivered complex cross-country pipelines, urban utility networks, and critical railway crossings." },
    { year: "INTERNATIONAL", desc: "Expanded operational footprint across multiple countries, executing mission-critical infrastructure globally." },
    { year: "MAYA TODAY", desc: "A premier engineering and EPC firm delivering comprehensive end-to-end underground infrastructure solutions." }
  ];

  return (
    <section className="py-32 bg-white text-navy-deep relative z-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-20">
          <p className="text-primary font-bold tracking-[0.2em] uppercase mb-4 text-sm">Company Story</p>
          <h2 className="text-display text-5xl md:text-7xl font-bold uppercase tracking-tight mb-8">Engineering<br/>Excellence.</h2>
          <p className="text-xl md:text-2xl font-light text-navy-deep/80 max-w-3xl leading-relaxed">
            Building on a strong legacy of engineering capability, we integrate advanced technology, risk-controlled execution, and specialized equipment to deliver complex infrastructure.
          </p>
        </div>

        <div className="relative">
          {/* Line */}
          <div className="absolute left-4 md:left-[50%] top-0 bottom-0 w-[2px] bg-gray-200 -translate-x-1/2" />
          
          <div className="flex flex-col gap-16 md:gap-24">
            {steps.map((step, i) => (
              <motion.div 
                key={step.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="absolute left-4 md:left-[50%] w-4 h-4 bg-primary rounded-full -translate-x-1/2 mt-1 md:mt-0 ring-4 ring-white" />
                
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                  <h3 className="text-2xl font-bold mb-2 uppercase tracking-wide">{step.year}</h3>
                  <p className="text-navy-deep/70 text-lg leading-relaxed">{step.desc}</p>
                </div>
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

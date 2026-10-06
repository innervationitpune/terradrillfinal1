'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';

const equipmentData = [
  {
    category: 'HDD Rigs',
    name: '10+ Owned HDD Systems',
    description: 'Advanced horizontal directional drilling systems for complex underground installations and varied soil conditions.',
    specs: ['Trenchless Installations', 'Pipelines & Utilities']
  },
  {
    category: 'Microtunneling',
    name: 'Microtunneling Systems',
    description: 'Precision-engineered, remote-controlled microtunneling systems for large diameter underground infrastructure.',
    specs: ['High Accuracy', 'Minimal Surface Disruption']
  },
  {
    category: 'Concrete',
    name: 'RMC Transit Mixers',
    description: 'Ready-mix concrete transit mixers ensuring continuous supply and operational reliability on site.',
    specs: ['Integrated Supply', 'Site Reliability']
  },
  {
    category: 'Earthwork',
    name: 'Excavation Equipment',
    description: 'Heavy excavation and advanced infrastructure construction machinery for complete project execution.',
    specs: ['End-to-End Capability', 'Diverse Environments']
  }
];

export default function EquipmentShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="py-32 bg-white text-navy-deep relative z-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8 relative">
        <div className="mb-20 text-center max-w-4xl mx-auto">
          <p className="eyebrow text-primary mb-4 uppercase tracking-widest font-bold">Advanced Fleet</p>
          <h2 className="text-display text-5xl md:text-6xl font-bold uppercase tracking-tight text-navy-deep mb-6">
            Operational Reliability
          </h2>
          <p className="text-lg text-navy-deep/70 leading-relaxed">
            Specialized fleet comprising 10+ owned HDD rigs, Microtunneling systems, RMC transit mixers, excavation equipment, and advanced infrastructure construction machinery, ensuring efficient execution and operational reliability across diverse project environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipmentData.map((eq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#f5f5f5] p-8 rounded-xl border border-gray-200 hover:shadow-2xl transition-all group flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">{eq.category}</p>
                <h3 className="text-xl font-bold text-navy-deep mb-3 uppercase tracking-tight">{eq.name}</h3>
                <p className="text-sm text-navy-deep/70 mb-6">{eq.description}</p>
              </div>
              
              <div className="space-y-2">
                {eq.specs.map(spec => (
                  <div key={spec} className="flex justify-between items-center text-xs border-b border-gray-300 pb-2">
                    <span className="text-navy-deep/60">{spec}</span>
                    <span className="text-primary font-bold">✓</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

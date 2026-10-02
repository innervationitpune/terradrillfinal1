'use client';
import { motion } from 'framer-motion';

const presence = [
  { country: 'India', flag: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/in.svg' },
  { country: 'Malaysia', flag: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/my.svg' },
  { country: 'UAE', flag: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/ae.svg' },
  { country: 'France', flag: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/fr.svg' },
];

export default function GlobalPresence() {
  return (
    <section className="py-32 bg-navy relative z-10 overflow-hidden">
      {/* Abstract Map Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,white_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="max-w-3xl mb-20">
          <p className="eyebrow text-primary mb-4 uppercase tracking-widest font-bold text-sm">Global Presence</p>
          <h2 className="text-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-white mb-6">Across Four Countries.</h2>
          <p className="text-white/70 text-xl max-w-2xl leading-relaxed">
            An expanding international footprint with active execution and representation across Asia and Europe.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {presence.map((item, i) => (
            <motion.div 
              key={item.country}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-white/10 hover:border-primary p-8 flex flex-col items-center min-h-[180px] justify-center transition-colors group bg-navy-deep/50 backdrop-blur-sm rounded-2xl"
            >
              <img src={item.flag} alt={item.country} className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform shadow-lg" />
              <h3 className="text-2xl font-bold text-white uppercase tracking-wider text-center">{item.country}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

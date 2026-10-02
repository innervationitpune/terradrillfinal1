'use client';
import { motion } from 'framer-motion';
import { AnimatedTitle } from './PremiumAnimations';

const stats = [
  { value: '4+', label: 'Countries Operated' },
  { value: '250+', label: 'Projects Completed' },
  { value: '25+', label: 'Machines & Rigs' },
  { value: '250+', label: 'Skilled Experts' },
];

export default function KineticStats() {
  return (
    <section className="py-32 md:py-48 bg-[#f5f5f5] text-navy-deep relative z-10 overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-8 lg:px-16 flex flex-col xl:flex-row justify-between items-start gap-24">
        <div className="max-w-2xl xl:sticky xl:top-40">
          <p className="text-primary font-bold tracking-[0.2em] uppercase mb-8 text-sm md:text-base">Capabilities</p>
          <AnimatedTitle 
            text="BUILT FOR CRITICAL INFRASTRUCTURE" 
            className="text-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.9] tracking-tighter mb-12"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-navy-deep/60 text-lg md:text-2xl font-light leading-relaxed max-w-xl"
          >
            Trusted by government agencies, PSUs, and private sector clients for the successful delivery of mission-critical projects globally.
          </motion.p>
        </div>

        <div className="flex flex-col gap-16 md:gap-32 flex-1 w-full xl:pl-20">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col border-l-[6px] border-navy-deep/10 pl-8 md:pl-16 hover:border-primary transition-colors duration-500 relative group cursor-default"
            >
              {/* Highlight bar that fills on hover */}
              <div className="absolute top-0 left-[-6px] w-[6px] h-0 bg-primary group-hover:h-full transition-all duration-700 ease-out" />
              
              <span className="text-display text-[7rem] sm:text-[10rem] md:text-[14rem] font-bold leading-[0.8] tracking-tighter text-navy-deep group-hover:text-primary transition-colors duration-700">
                {stat.value}
              </span>
              <span className="text-lg md:text-2xl font-bold uppercase tracking-[0.2em] text-navy-deep/50 mt-6 md:mt-8 group-hover:text-navy-deep transition-colors duration-700">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

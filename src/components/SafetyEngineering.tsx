'use client';
import { motion } from 'framer-motion';

export default function SafetyEngineering() {
  return (
    <section className="py-32 bg-navy-deep text-white relative z-10 overflow-hidden">
      
      {/* Background blueprint graphic */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div>
          <p className="text-primary font-bold tracking-[0.2em] uppercase mb-4 text-sm">Operational Integrity</p>
          <h2 className="text-display text-5xl md:text-7xl font-bold uppercase tracking-tight mb-8">Safety & <br/>Quality.</h2>
          <p className="text-xl text-white/70 max-w-lg leading-relaxed mb-12 border-l-2 border-white/20 pl-6">
            Zero-incident culture. Our engineering protocols mandate rigorous risk assessment, continuous monitoring, and adherence to international HSE standards on every site.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold uppercase mb-2">Risk Control</h4>
              <p className="text-white/60 text-sm leading-relaxed">Advanced geotech surveying and contingency planning before deployment.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold uppercase mb-2">Quality Assurance</h4>
              <p className="text-white/60 text-sm leading-relaxed">ISO certified processes ensuring asset longevity and specification compliance.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold uppercase mb-2">Crew Safety</h4>
              <p className="text-white/60 text-sm leading-relaxed">Mandatory safety briefings, PPE compliance, and emergency response readiness.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold uppercase mb-2">Environmental</h4>
              <p className="text-white/60 text-sm leading-relaxed">Controlled fluid management, zero surface disruption, and ecological protection.</p>
            </div>
          </div>
        </div>

        <div className="relative h-[600px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <img src="/images/safety-hero.jpg" alt="Engineering Safety" className="w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
            <p className="font-mono text-sm text-primary font-bold uppercase tracking-widest mb-2">Metrics</p>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold">100%</p>
                <p className="text-white/60 text-xs uppercase">Compliance</p>
              </div>
              <div className="w-[1px] h-10 bg-white/20" />
              <div>
                <p className="text-3xl font-bold">ISO</p>
                <p className="text-white/60 text-xs uppercase">Certified</p>
              </div>
              <div className="w-[1px] h-10 bg-white/20" />
              <div>
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-white/60 text-xs uppercase">Monitoring</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

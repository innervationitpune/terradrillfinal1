'use client';
import { motion } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import ParallaxFooter from '@/components/ParallaxFooter';

export default function ContactPage() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen z-10 text-white bg-navy-deep pt-40 pb-40 overflow-hidden">
        
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-20 relative z-10">
          
          <div>
            <motion.h1 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="text-display text-5xl md:text-7xl font-bold uppercase tracking-tight mb-8"
            >
              Let's <br/> <span className="text-primary">Connect.</span>
            </motion.h1>
            
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-12 mt-16"
            >
              <div>
                <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Headquarters</h3>
                <p className="text-lg md:text-xl font-display leading-relaxed">
                  205, Wide angle, Citadel Enclave,<br/>
                  B.T Kawade Road, Ghorpadi,<br/>
                  Pune, Maharashtra INDIA - 411036
                </p>
              </div>
              
              <div>
                <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Contact</h3>
                <p className="text-lg md:text-xl font-display mb-1">+91 7557662002 / +91 8805264369</p>
                <p className="text-lg md:text-xl font-display text-white/80">manasincorporation21@gmail.com</p>
              </div>

              <div>
                <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Registration Info</h3>
                <p className="text-sm md:text-base font-display text-white/80 mb-1">GST NO: 27ASJPJ4888N1ZT</p>
                <p className="text-sm md:text-base font-display text-white/80">Udyam No: UDYAM-MH-26-0104756</p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="glass p-12 rounded-3xl border border-white/10"
          >
            <form className="space-y-8 flex flex-col">
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-white/50 mb-2 block">Name</label>
                <input type="text" className="w-full bg-transparent border-b-2 border-white/20 focus:border-primary text-white text-xl py-2 outline-none transition-colors" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-white/50 mb-2 block">Email</label>
                <input type="email" className="w-full bg-transparent border-b-2 border-white/20 focus:border-primary text-white text-xl py-2 outline-none transition-colors" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-white/50 mb-2 block">Message</label>
                <textarea rows={4} className="w-full bg-transparent border-b-2 border-white/20 focus:border-primary text-white text-xl py-2 outline-none transition-colors resize-none" />
              </div>
              <button type="button" className="self-start mt-8 bg-primary text-navy-deep px-10 py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors">
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </main>
      <ParallaxFooter />
    </SmoothScroll>
  );
}

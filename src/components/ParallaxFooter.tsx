'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function ParallaxFooter() {
  const footerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'start center']
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative h-auto md:h-[600px]" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
      <div className="relative md:fixed bottom-0 w-full h-auto md:h-[600px] bg-[#020612] z-0 flex flex-col justify-between pt-16 md:pt-24 pb-8 px-6 md:px-12 lg:px-20 overflow-hidden">

        {/* Glow Effects */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#ff5500]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#1d4ed8]/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div style={{ y, opacity }} ref={footerRef} className="max-w-7xl mx-auto w-full h-full flex flex-col justify-between relative z-10">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 lg:gap-16">

            {/* Branding & Description */}
            <div className="md:col-span-1 flex flex-col gap-6">
              <div>
                <img src="/images/terradrill-logo.png" alt="TERRADRILL & ENERGY PRIVATE LIMITED" className="w-[200px] md:w-[260px] h-auto object-contain" />
              </div>
              <p className="text-white/60 text-xs md:text-sm leading-relaxed">
                TERRADRILL & ENERGY PRIVATE LIMITED is an integrated infrastructure company delivering engineering, procurement, and construction solutions across water, wastewater, transportation, utility, industrial, and trenchless infrastructure projects, serving public and private sector clients across India and international markets.
              </p>

              <div className="flex flex-col gap-4 mt-2">
                <div className="flex gap-3 text-white/70 hover:text-white transition-colors group">
                  <MapPin className="w-5 h-5 text-[#ff5500] shrink-0 group-hover:scale-110 transition-transform" />
                  <p className="text-xs md:text-sm">Head Office - 205, 2nd Floor, Wide Angle Citadel Enclave, B.T. Kawade Road, Koregaon Park Annexe, Pune, Maharashtra, India</p>
                </div>
                <div className="flex gap-3 text-white/70 hover:text-white transition-colors group">
                  <Phone className="w-5 h-5 text-[#ff5500] shrink-0 group-hover:scale-110 transition-transform" />
                  <p className="text-xs md:text-sm">+91 7557662002 / +91 8805264369</p>
                </div>
                <div className="flex gap-3 text-white/70 hover:text-white transition-colors group">
                  <Mail className="w-5 h-5 text-[#ff5500] shrink-0 group-hover:scale-110 transition-transform" />
                  <p className="text-xs md:text-sm">manasincorporation21@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Navigation - Company */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-[0.2em] text-xs">COMPANY</h4>
              <ul className="flex flex-col gap-3 text-white/50 text-xs md:text-sm">
                {['About Us', 'Services', 'Projects', 'Equipment', 'Clients', 'Safety', 'Certifications', 'News & Media'].map(item => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="hover:text-[#ff5500] hover:translate-x-1 transition-all cursor-pointer block">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation - Capabilities */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-[0.2em] text-xs">CAPABILITIES</h4>
              <ul className="flex flex-col gap-3 text-white/50 text-xs md:text-sm">
                {['Water', 'Wastewater', 'Transportation', 'Utility', 'Industrial', 'EPC', 'HDD', 'Pipe Jacking', 'Microtunneling', 'Railway Crossings', 'WTP', 'STP', 'Urban Infrastructure'].map(item => (
                  <li key={item}>
                    <span className="hover:text-[#ff5500] hover:translate-x-1 transition-all cursor-default block">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation - Global Presence */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-[0.2em] text-xs">GLOBAL PRESENCE</h4>
              <ul className="flex flex-col gap-3 text-white/50 text-xs md:text-sm">
                {['Pune, India', 'Mumbai, India', 'Chhatrapati Sambhajinagar, India', 'Baramati, India', 'Bengaluru, India', 'Hubballi, India', 'Kolkata, India', 'Hyderabad, India', 'Nagpur, India', 'Kuala Lumpur, Malaysia', 'Singapore', 'Calais, France', 'Dubai, UAE'].map(item => (
                  <li key={item}>
                    <span className="hover:text-[#ff5500] transition-colors cursor-default block">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 mt-12 text-white/30 text-[11px] md:text-xs tracking-wider gap-4">
            <p>&copy; 2026 TERRADRILL & ENERGY PRIVATE LIMITED. All rights reserved.</p>
            <p>Designed & Developed by Innervation IT</p>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

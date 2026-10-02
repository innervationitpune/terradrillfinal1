'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import ParallaxFooter from '@/components/ParallaxFooter';
import { useRef, useState } from 'react';
import Link from 'next/link';

const values = [
  { title: "Engineering Excellence", desc: "Delivering quality through expertise and precision." },
  { title: "Integrity", desc: "Doing what is right, every time." },
  { title: "Safety", desc: "Protecting people, assets, and communities." },
  { title: "Innovation", desc: "Driving progress through technology and continuous improvement." },
  { title: "Reliability", desc: "Delivering on commitments with consistency and accountability." },
  { title: "Partnership", desc: "Building lasting relationships through trust and collaboration." },
];

const capabilities = [
  { title: "INTERNATIONAL EXECUTION", desc: "Established project experience across multiple international markets, including India, Malaysia, France, and the UAE, reflecting the Company's capability to deliver complex infrastructure solutions across diverse geographies while adhering to international engineering, quality, and safety standards." },
  { title: "ENGINEERING EXCELLENCE", desc: "In-house engineering, geotechnical expertise, and risk assessment capabilities." },
  { title: "SAFETY-FIRST CULTURE", desc: "ISO-aligned HSE practices with stringent safety compliance." },
  { title: "ADVANCED FLEET", desc: "Specialized fleet comprising 10+ owned HDD rigs, Microtunneling systems, RMC transit mixers, excavation equipment, and advanced infrastructure construction machinery, ensuring efficient execution and operational reliability across diverse project environments." }
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Hero Parallax
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "15%"]);

  const [activeValue, setActiveValue] = useState<number | null>(null);
  const [activeCap, setActiveCap] = useState<number | null>(null);

  return (
    <SmoothScroll>
      <main ref={containerRef} className="relative min-h-screen z-10 text-white bg-navy-deep overflow-hidden">

        {/* 01. Hero / Company Introduction - SPLIT LAYOUT */}
        <section className="relative flex flex-col md:flex-row items-center pt-32 pb-24 px-4 max-w-[1400px] mx-auto gap-12 md:min-h-[85vh]">

          {/* LEFT 50-55%: Content */}
          <div className="w-full md:w-[55%] relative z-10 pr-0 md:pr-12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm border-l-2 border-primary pl-4 py-1">About Us</span>
            </motion.div>

            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[1.1] text-white"
              >
                Engineering Sustainable<br />
                <span className="text-primary">Infrastructure</span> For The Future
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-white text-lg leading-relaxed max-w-xl font-light"
            >
              Trayana Infratech is a diversified infrastructure company providing engineering, procurement, construction, and specialized infrastructure solutions across multiple sectors, serving government agencies, public sector undertakings, EPC contractors, and private enterprises.
            </motion.p>
          </div>

          {/* RIGHT 45-50%: Image Composition */}
          <div className="w-full md:w-[45%] h-[50vh] md:h-[70vh] relative overflow-hidden rounded-lg shadow-2xl">
            <motion.div
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ y: heroY, backgroundImage: 'url(/images/about-hero.jpg)' }}
              className="absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center"
            />
            {/* Very light overlay to retain image quality */}
            <div className="absolute inset-0 bg-navy-deep/10 mix-blend-multiply pointer-events-none" />
          </div>
        </section>

        {/* 02. Mission + Vision - BLUEPRINT GRID */}
        <section className="py-24 px-4 max-w-[1400px] mx-auto relative">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* MISSION */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-navy p-12 lg:p-16 rounded-lg border border-white/10 hover:border-primary/50 transition-colors duration-500 group relative overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 pointer-events-none opacity-[0.05] group-hover:opacity-[0.1] transition-opacity"
                style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

              <h2 className="text-display text-3xl md:text-4xl font-bold mb-6 text-white uppercase tracking-wider flex items-center gap-4 relative z-10">
                <span className="text-primary text-sm font-bold tracking-[0.2em]">01</span>
                Our Mission
              </h2>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light relative z-10">To be a trusted infrastructure partner, delivering safe, sustainable, and technologically advanced solutions that strengthen communities, industries, and economies.</p>
            </motion.div>

            {/* VISION */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="bg-navy p-12 lg:p-16 rounded-lg border border-white/10 hover:border-primary/50 transition-colors duration-500 group relative overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 pointer-events-none opacity-[0.05] group-hover:opacity-[0.1] transition-opacity"
                style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

              <h2 className="text-display text-3xl md:text-4xl font-bold mb-6 text-white uppercase tracking-wider flex items-center gap-4 relative z-10">
                <span className="text-primary text-sm font-bold tracking-[0.2em]">02</span>
                Our Vision
              </h2>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light relative z-10">To build world-class infrastructure that drives economic growth, enhances quality of life, and creates lasting value for future generations.</p>
            </motion.div>
          </div>
        </section>

        {/* 03. Values */}
        <section className="py-24 bg-[#050b14] relative border-y border-white/10">
          <div className="max-w-[1400px] mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 md:text-left text-center"
            >
              <h2 className="text-display text-4xl md:text-5xl font-bold uppercase tracking-widest text-white">What We Stand For</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v, i) => {
                const isActive = activeValue === i;
                const isHoveredAny = activeValue !== null;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    onMouseEnter={() => setActiveValue(i)}
                    onMouseLeave={() => setActiveValue(null)}
                    className={`bg-navy/80 p-8 border-t-4 transition-all duration-300 cursor-default flex flex-col min-h-[220px] shadow-lg
                      ${isActive ? 'border-primary bg-navy' : 'border-primary/30'}
                      ${isHoveredAny && !isActive ? 'opacity-60' : 'opacity-100'}
                    `}
                  >
                    <div className="text-sm font-bold tracking-widest mb-3 text-primary">
                      0{i + 1}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-4 font-display uppercase tracking-wide text-white">
                      {v.title}
                    </h3>
                    <p className="text-base text-white/80 leading-relaxed font-light mt-auto">
                      {v.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 04. Financial Growth */}
        <section className="py-24 px-4 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:text-left text-center"
          >
            <p className="text-primary uppercase tracking-[0.2em] font-bold text-sm mb-4">Financial Growth</p>
            <h2 className="text-display text-4xl md:text-5xl font-bold uppercase tracking-widest text-white mb-6">Consistent Year-On-Year Performance</h2>
            <p className="text-white/80 text-lg max-w-2xl font-light">Audited revenue figures in INR Lakhs.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 pt-8">
            {[
              { year: "FY 2022-23", value: "328.34", width: "69.4%" },
              { year: "FY 2023-24", value: "394.08", width: "83.3%" },
              { year: "FY 2024-25", value: "472.89", width: "100%" }
            ].map((stat, i) => (
              <div key={i} className="flex-1 flex flex-col items-start w-full bg-navy p-10 rounded-lg shadow-xl border border-white/5">
                <div className="text-white/70 font-bold tracking-[0.15em] uppercase text-sm mb-4">{stat.year}</div>
                <div className="text-white text-5xl font-bold font-display tracking-tight mb-8">
                  ₹<motion.span>{stat.value}</motion.span>
                  <span className="text-xl text-white/60 ml-2">crores</span>
                </div>

                {/* Horizontal Bar */}
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden relative mt-auto">
                  <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: stat.width }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                    className="absolute top-0 left-0 h-full bg-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 05. Capabilities */}
        <section className="py-24 bg-[#03070d] relative border-y border-white/10">
          <div className="max-w-[1400px] mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <p className="text-primary uppercase tracking-[0.2em] font-bold text-sm mb-4">Capability</p>
              <h2 className="text-display text-4xl md:text-5xl font-bold uppercase tracking-widest text-white">Built For Critical Infrastructure</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  onMouseEnter={() => setActiveCap(i)}
                  onMouseLeave={() => setActiveCap(null)}
                  className="bg-navy border border-white/10 p-10 relative overflow-hidden group hover:border-primary transition-all duration-300 rounded-lg flex flex-col justify-between shadow-xl"
                >
                  <div className={`absolute top-0 left-0 w-2 h-full transition-all duration-300 ${activeCap === i ? 'bg-primary' : 'bg-transparent'}`} />

                  <div className="relative z-10 flex flex-col h-full pl-2">
                    <h3 className="text-2xl font-bold mb-4 font-display uppercase tracking-wider text-white">{cap.title}</h3>
                    <p className="text-white/80 text-base leading-relaxed font-light">{cap.desc}</p>

                    {cap.desc.length > 150 && (
                      <div className="mt-8 pt-4">
                        <button className="text-primary uppercase tracking-[0.1em] font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                          Read More <span>→</span>
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 06. International Execution */}
        <section className="py-24 px-4 relative bg-navy overflow-hidden">
          {/* Extremely Subtle Map Background */}
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none">
            <svg viewBox="0 0 1000 500" className="w-[150%] md:w-[100%] h-auto max-w-none" stroke="white" strokeWidth="1" fill="none">
              <path d="M 100 250 L 900 250" strokeDasharray="4 8" />
              <path d="M 300 150 Q 400 100 600 150 T 800 250" />
            </svg>
          </div>

          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <p className="text-primary uppercase tracking-[0.2em] font-bold text-sm mb-4">International Capability</p>
              <h2 className="text-display text-4xl md:text-5xl font-bold uppercase tracking-widest text-white mb-6">Delivering Infrastructure<br />Across Borders</h2>
              <p className="text-white/80 text-lg max-w-3xl leading-relaxed font-light">A proven execution model supporting infrastructure projects across multiple geographies through strong engineering expertise, local partnerships, and global standards.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 text-left mt-12">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-[#050b14] p-8 md:p-10 border border-white/10 border-l-2 border-l-primary rounded-lg shadow-xl hover:-translate-y-1 hover:border-white/20 transition-all duration-300 flex flex-col h-full group">
                <span className="text-primary text-xs font-bold tracking-[0.2em] mb-4 opacity-80 group-hover:opacity-100 transition-opacity">01</span>
                <h4 className="text-white font-bold font-display text-xl uppercase mb-4">Engineering Excellence</h4>
                <p className="text-white/60 text-base leading-relaxed mt-auto">Integrated engineering, project management, and technical support capabilities.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="bg-[#050b14] p-8 md:p-10 border border-white/10 border-l-2 border-l-primary rounded-lg shadow-xl hover:-translate-y-1 hover:border-white/20 transition-all duration-300 flex flex-col h-full group">
                <span className="text-primary text-xs font-bold tracking-[0.2em] mb-4 opacity-80 group-hover:opacity-100 transition-opacity">02</span>
                <h4 className="text-white font-bold font-display text-xl uppercase mb-4">Local Partnerships</h4>
                <p className="text-white/60 text-base leading-relaxed mt-auto">Strong regional partnerships enabling efficient project delivery and market access.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="bg-[#050b14] p-8 md:p-10 border border-white/10 border-l-2 border-l-primary rounded-lg shadow-xl hover:-translate-y-1 hover:border-white/20 transition-all duration-300 flex flex-col h-full group">
                <span className="text-primary text-xs font-bold tracking-[0.2em] mb-4 opacity-80 group-hover:opacity-100 transition-opacity">03</span>
                <h4 className="text-white font-bold font-display text-xl uppercase mb-4">Compliance & Governance</h4>
                <p className="text-white/60 text-base leading-relaxed mt-auto">Committed to international standards of safety, quality, regulatory compliance, and corporate governance.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 07. Leadership */}
        <section className="py-24 bg-[#050b14] relative border-t border-white/10">
          <div className="max-w-[1400px] mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <p className="text-primary uppercase tracking-[0.2em] font-bold text-sm mb-4">Leadership</p>
              <h2 className="text-display text-4xl md:text-5xl font-bold uppercase tracking-widest text-white">Board of Directors</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Manas Joshi", title: "Founder & Managing Director", desc: "Driving corporate strategy, growth, and long-term vision." },
                { name: "Rajat Fadtare", title: "Director, Projects & Operations", desc: "Leading safe, efficient, and high-quality project execution." },
                { name: "Shubham Badade", title: "Director, Business Development & Stakeholder Relations", desc: "Strengthening client partnerships and government engagement." }
              ].map((leader, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-navy p-10 rounded-lg flex flex-col min-h-[250px] border-l-4 border-primary hover:-translate-y-2 transition-transform duration-300 shadow-xl"
                >
                  <h3 className="text-2xl font-display font-bold text-white mb-2 uppercase tracking-wide">{leader.name}</h3>
                  <p className="text-primary uppercase tracking-[0.1em] text-sm font-bold mb-6">{leader.title}</p>
                  <p className="text-white/80 leading-relaxed font-light text-base mt-auto">{leader.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 08. Governance */}
        <section className="py-24 px-4 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-primary uppercase tracking-[0.2em] font-bold text-sm mb-4">Governance</p>
            <h2 className="text-display text-4xl md:text-5xl font-bold uppercase tracking-widest text-white mb-6">Legal & Compliance</h2>
            <p className="text-white/80 text-lg max-w-3xl leading-relaxed font-light">Strengthening governance, ensuring compliance, and safeguarding stakeholder interests across all operations.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-navy p-10 rounded-lg border-l-4 border-primary shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-2 font-display">Adv. Neha Uday Fadtare <span className="text-white/50 text-sm font-sans ml-2">(M.Sc, LL.B)</span></h3>
              <p className="text-white/80 leading-relaxed font-light text-base mt-4">Senior Legal Advisor – Corporate Law, Arbitration & Risk Management</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-navy p-10 rounded-lg border-l-4 border-primary shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-2 font-display">Adv. Sanskruti Zawar <span className="text-white/50 text-sm font-sans ml-2">(B.A. LL.B)</span></h3>
              <p className="text-white/80 leading-relaxed font-light text-base mt-4">Legal Counsel – Contracts, Compliance & Regulatory Affairs</p>
            </motion.div>
          </div>
        </section>

        {/* 09. CTA - SPLIT LAYOUT */}
        <section className="relative py-32 overflow-hidden bg-navy border-t border-white/10">
          <div className="absolute -right-20 -top-20 w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-[1400px] mx-auto px-4"
          >
            <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
              <div>
                <h2 className="text-display text-4xl md:text-5xl font-bold uppercase tracking-widest text-white leading-[1.1] max-w-3xl">
                  Partner with India's trenchless engineering specialists.
                </h2>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="bg-primary hover:bg-primary-bright text-white px-8 py-4 font-bold uppercase tracking-[0.15em] text-sm transition-all shadow-xl rounded-sm"
                  >
                    Contact Us →
                  </motion.button>
                </Link>
                <Link href="/projects">
                  <motion.button
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                    className="border-2 border-white/30 text-white px-8 py-4 font-bold uppercase tracking-[0.15em] text-sm transition-all rounded-sm"
                  >
                    View Projects
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

      </main>

      <ParallaxFooter />
    </SmoothScroll>
  );
}

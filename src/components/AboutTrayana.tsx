'use client';
import { motion } from 'framer-motion';

export default function AboutTrayana() {
  return (
    <section className="py-24 md:py-28 bg-white text-navy-deep relative z-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8">

        {/* Two-column grid: ~44% image / ~56% text */}
        <div
          className="gap-12 lg:gap-16 items-start"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 44fr) minmax(0, 56fr)',
          }}
        >

          {/* ── LEFT: Tall portrait image ── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div
              className="w-full rounded-lg shadow-2xl overflow-hidden group"
              style={{ height: '640px' }}
            >
              <img
                src="/images/projects/p3.jpg"
                alt="Trayana Infratech project site"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>

            {/* Orange 30+ card — overlaps lower-right corner of image */}
            <motion.div
              className="absolute bg-primary text-white shadow-xl z-10"
              style={{
                bottom: 0,
                right: '-28px',
                width: '185px',
                padding: '24px 22px',
              }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            >
              <div
                className="font-bold leading-none mb-2 font-display"
                style={{ fontSize: '3.25rem' }}
              >
                30+
              </div>
              <div className="font-bold leading-snug" style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                YEARS OF<br />TRENCHLESS<br />ENGINEERING
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Text column ── */}
          <motion.div
            className="flex flex-col justify-start"
            style={{ paddingTop: '4px' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          >
            {/* Eyebrow */}
            <p className="text-primary font-bold uppercase tracking-widest mb-4" style={{ fontSize: '0.72rem', letterSpacing: '0.18em' }}>
              About Trayana Infratech Public Limited
            </p>

            {/* Heading — ~2 lines on desktop via clamp + explicit break */}
            <h2
              className="font-bold uppercase text-navy-deep mb-7"
              style={{
                fontSize: 'clamp(1.7rem, 2.5vw, 2.55rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              Three Decades of Trenchless<br />Engineering Excellence
            </h2>

            {/* Body copy */}
            <div
              className="text-navy-deep/75 space-y-5 mb-8"
              style={{ fontSize: '0.96rem', lineHeight: 1.65 }}
            >
              <p>
                For over 30 years, Trayana InfraTech and its subsidiaries have been delivering advanced trenchless engineering solutions that enable critical underground infrastructure development across urban, industrial, and utility sectors. The company specializes in the design, engineering, and execution of complex trenchless projects, supporting the expansion of transportation, energy, telecommunications, water, and waste infrastructure.
              </p>
              <p>
                With proven expertise in Horizontal Directional Drilling (HDD), Microtunneling, Pipe Jacking, Utility Crossings, and Railway Infrastructure Projects, Trayana InfraTech has successfully executed projects for government agencies, public utilities, EPC contractors, and multinational corporations.
              </p>
              <p>
                Our integrated engineering and construction approach combines technical innovation, rigorous project management, and uncompromising safety standards to deliver reliable, cost-effective, and environmentally responsible infrastructure solutions.
              </p>
            </div>

            {/* CTA link */}
            <a
              href="/about"
              className="inline-flex items-center gap-2 font-bold uppercase text-navy-deep hover:text-primary transition-colors self-start"
              style={{ fontSize: '0.72rem', letterSpacing: '0.16em' }}
            >
              Learn More About Us&nbsp;↗
            </a>
          </motion.div>

        </div>

        {/* ── Capability Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">

          <div className="bg-white border border-gray-200 border-l-4 border-l-primary p-6 shadow-sm hover:shadow-xl transition flex flex-col">
            <h3 className="font-bold text-navy-deep text-lg uppercase tracking-tight mb-4">International Execution</h3>
            <p
              className="text-sm leading-relaxed flex-1 mb-5"
              style={{
                color: 'rgba(8,16,32,0.68)',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              Established project experience across multiple international markets, including India, Malaysia, France, and the UAE, reflecting the Company's capability to deliver complex infrastructure solutions across diverse geographies while adhering to international engineering, quality, and safety standards.
            </p>
            <a
              href="/about"
              className="text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-dark transition-colors self-start"
              style={{ letterSpacing: '0.14em' }}
            >
              Read More
            </a>
          </div>

          <div className="bg-white border border-gray-200 border-l-4 border-l-primary p-6 shadow-sm hover:shadow-xl transition flex flex-col">
            <h3 className="font-bold text-navy-deep text-lg uppercase tracking-tight mb-4">Engineering Excellence</h3>
            <p
              className="text-sm leading-relaxed flex-1 mb-5"
              style={{
                color: 'rgba(8,16,32,0.68)',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              In-house engineering, geotechnical expertise, and risk assessment capabilities.
            </p>
            <a
              href="/about"
              className="text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-dark transition-colors self-start"
              style={{ letterSpacing: '0.14em' }}
            >
              Read More
            </a>
          </div>

          <div className="bg-white border border-gray-200 border-l-4 border-l-primary p-6 shadow-sm hover:shadow-xl transition flex flex-col">
            <h3 className="font-bold text-navy-deep text-lg uppercase tracking-tight mb-4">Safety-First Culture</h3>
            <p
              className="text-sm leading-relaxed flex-1 mb-5"
              style={{
                color: 'rgba(8,16,32,0.68)',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              ISO-aligned HSE practices with stringent safety compliance.
            </p>
            <a
              href="/about"
              className="text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-dark transition-colors self-start"
              style={{ letterSpacing: '0.14em' }}
            >
              Read More
            </a>
          </div>

          <div className="bg-white border border-gray-200 border-l-4 border-l-primary p-6 shadow-sm hover:shadow-xl transition flex flex-col">
            <h3 className="font-bold text-navy-deep text-lg uppercase tracking-tight mb-4">Advanced Fleet</h3>
            <p
              className="text-sm leading-relaxed flex-1 mb-5"
              style={{
                color: 'rgba(8,16,32,0.68)',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              Specialized fleet comprising 10+ owned HDD rigs, Microtunneling systems, RMC transit mixers, excavation equipment, and advanced infrastructure construction machinery, ensuring efficient execution and operational reliability across diverse project environments.
            </p>
            <a
              href="/about"
              className="text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-dark transition-colors self-start"
              style={{ letterSpacing: '0.14em' }}
            >
              Read More
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}

'use client';
import { motion } from 'framer-motion';

const govtClients = [
  { name: 'Indian Railways', url: '/images/clients/government/indian-railways.png' },
  { name: 'MIDC', url: '/images/clients/government/midc.png' },
  { name: 'PCMC', url: '/images/clients/government/pcmc.png' },
  { name: 'PMC', url: '/images/clients/government/pmc.png' },
  { name: 'KMDA', url: '/images/clients/government/kmda.png' },
  { name: 'BMC', url: '/images/clients/government/bmc.png' },
  { name: 'Ulhasnagar Municipal Corporation', url: '/images/clients/government/ulhasnagar.png' },
  { name: 'Ranaghat Municipal Corporation', url: '/images/clients/government/ranaghat.png' }
];

const privateClients = [
  { name: 'Reliance', url: '/images/clients/private/reliance.png' },
  { name: 'IOCL', url: '/images/clients/private/iocl.gif' },
  { name: 'BPCL', url: '/images/clients/private/bpcl.png' },
  { name: 'Airtel', url: '/images/clients/private/airtel.png' },
  { name: 'L&T', url: '/images/clients/private/lnt.png' },
  { name: 'Serum Institute', url: '/images/clients/private/serum.png' },
  { name: 'SS Sathe Infra', url: '/images/clients/private/ss-sathe.png' },
  { name: 'SUEZ', url: '/images/clients/private/suez.svg' }
];

export default function ClientLogos() {
  return (
    <section className="py-32 bg-[#f5f5f5] relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="mb-20 text-center">
          <p className="eyebrow text-primary mb-4 uppercase tracking-widest font-bold">Trusted By Leading Organizations</p>
          <h2 className="text-display text-5xl md:text-6xl font-bold uppercase tracking-tight text-navy-deep">Our Partners</h2>
        </div>

        <div className="mb-24">
          <h3 className="text-sm font-bold text-navy-deep/40 uppercase tracking-widest mb-12 border-b border-gray-200 pb-4 text-center md:text-left">Government Clients</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {govtClients.map((client, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                key={client.name} 
                className="bg-white border border-gray-200 rounded-lg p-6 h-52 flex flex-col items-center justify-center text-center hover:shadow-lg transition group"
              >
                <img 
                  src={client.url} 
                  alt={client.name}
                  className="max-w-full max-h-full object-contain h-24 transition-all duration-300"
                />
                <p className="mt-4 text-sm font-semibold text-navy-deep">{client.name}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-navy-deep/40 uppercase tracking-widest mb-12 border-b border-gray-200 pb-4 text-center md:text-left">Private Sector Clients</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {privateClients.map((client, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                key={client.name} 
                className="bg-white border border-gray-200 rounded-lg p-6 h-52 flex flex-col items-center justify-center text-center hover:shadow-lg transition group"
              >
                <img 
                  src={client.url} 
                  alt={client.name}
                  className="max-w-full max-h-full object-contain h-20 transition-all duration-300"
                />
                <p className="mt-4 text-sm font-semibold text-navy-deep">{client.name}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

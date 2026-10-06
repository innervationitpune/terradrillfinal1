'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MagneticButton from './MagneticButton';

const links = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Equipment', href: '/equipment' },
  { name: 'Clients', href: '/clients' },
  { name: 'Global', href: '/global' },
  { name: 'Documents', href: '/documents' },
  { name: 'Contact', href: '/contact' }
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-navy-deep/90 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
        <div className="w-full px-6 md:px-10 xl:px-16 flex items-center justify-between">
          <Link href="/" className="shrink-0 flex items-center">
            <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer relative z-50">
              <img src="/images/terradrill-logo.png" alt="TERRADRILL & ENERGY PRIVATE LIMITED" className="w-[160px] md:w-[260px] lg:w-[280px] xl:w-[300px] h-auto object-contain" />
            </motion.div>
          </Link>
          
          <nav className="hidden xl:flex items-center gap-4 xl:gap-6">
            {links.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.name} href={link.href}>
                  <span className={`whitespace-nowrap text-[11px] xl:text-xs uppercase tracking-[0.12em] xl:tracking-[0.15em] font-bold transition-colors cursor-pointer relative group ${isActive ? 'text-primary' : 'text-white/70 hover:text-white'}`}>
                    {link.name}
                    <span className={`absolute left-0 -bottom-2 h-0.5 bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </span>
                </Link>
              );
            })}
          </nav>
          
          <div className="hidden xl:block shrink-0">
            <Link href="/contact">
              <MagneticButton>Enquire Now</MagneticButton>
            </Link>
          </div>

          <button 
            className="xl:hidden relative z-50 text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="flex flex-col gap-1.5 w-6">
              <span className={`h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy-deep/95 backdrop-blur-xl pt-32 px-8 pb-12 overflow-y-auto xl:hidden flex flex-col"
          >
            <div className="flex flex-col gap-6 items-center text-center">
              {links.map(link => {
                const isActive = pathname === link.href;
                return (
                  <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                    <span className={`text-lg uppercase tracking-[0.2em] font-bold ${isActive ? 'text-primary' : 'text-white'}`}>
                      {link.name}
                    </span>
                  </Link>
                );
              })}
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="mt-8">
                <button className="bg-primary hover:bg-primary-bright text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all w-full">
                  Enquire Now
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

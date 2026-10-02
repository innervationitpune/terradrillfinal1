import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import NoiseOverlay from '@/components/NoiseOverlay';
import Preloader from '@/components/Preloader';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const syne = Syne({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'], 
  variable: '--font-syne' 
});

export const metadata: Metadata = {
  title: 'Trayana Infratech | World-Class Engineering',
  description: 'Global trenchless engineering specialists delivering underground infrastructure across the globe.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="antialiased bg-[#f5f5f5] text-navy-deep selection:bg-primary selection:text-white">
        <Preloader />
        <NoiseOverlay />
        <Header />
        {children}
      </body>
    </html>
  );
}

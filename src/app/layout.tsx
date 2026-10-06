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
  metadataBase: new URL('https://terradrillenergy.in'),
  title: {
    default: 'TERRADRILL & ENERGY PRIVATE LIMITED | Trenchless Engineering & Infrastructure',
    template: '%s | TERRADRILL & ENERGY PRIVATE LIMITED',
  },
  description: 'TERRADRILL & ENERGY PRIVATE LIMITED is a global trenchless engineering specialist delivering underground infrastructure across the globe.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TERRADRILL & ENERGY PRIVATE LIMITED | Trenchless Engineering & Infrastructure',
    description: 'TERRADRILL & ENERGY PRIVATE LIMITED is a global trenchless engineering specialist delivering underground infrastructure across the globe.',
    url: 'https://terradrillenergy.in',
    siteName: 'TERRADRILL & ENERGY PRIVATE LIMITED',
    images: [
      {
        url: '/images/terradrill-logo.png', // Fallback OG image is the logo
        width: 1200,
        height: 630,
        alt: 'TERRADRILL & ENERGY PRIVATE LIMITED Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TERRADRILL & ENERGY PRIVATE LIMITED',
    description: 'TERRADRILL & ENERGY PRIVATE LIMITED is a global trenchless engineering specialist delivering underground infrastructure across the globe.',
    images: ['/images/terradrill-logo.png'],
  },
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'TERRADRILL & ENERGY PRIVATE LIMITED',
        url: 'https://terradrillenergy.in/',
        logo: 'https://terradrillenergy.in/images/terradrill-logo.png',
      },
      {
        '@type': 'WebSite',
        name: 'TERRADRILL & ENERGY PRIVATE LIMITED',
        url: 'https://terradrillenergy.in/',
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#f5f5f5] text-navy-deep selection:bg-primary selection:text-white">
        <Preloader />
        <NoiseOverlay />
        <Header />
        {children}
      </body>
    </html>
  );
}

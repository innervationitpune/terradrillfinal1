import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about TERRADRILL & ENERGY PRIVATE LIMITED, our mission, vision, and core values driving sustainable engineering and infrastructure solutions.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

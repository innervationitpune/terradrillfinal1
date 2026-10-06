import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trenchless Engineering Services',
  description: 'Explore the expert trenchless engineering and specialized infrastructure services provided by TERRADRILL & ENERGY PRIVATE LIMITED across the globe.',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

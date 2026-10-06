import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trenchless Equipment & Technology',
  description: 'Discover the advanced fleet of HDD rigs, microtunneling systems, and specialized infrastructure machinery used by TERRADRILL & ENERGY PRIVATE LIMITED.',
};

export default function EquipmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

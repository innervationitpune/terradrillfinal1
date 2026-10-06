import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trenchless Engineering Projects',
  description: 'View the portfolio of complex infrastructure and trenchless engineering projects successfully executed by TERRADRILL & ENERGY PRIVATE LIMITED.',
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

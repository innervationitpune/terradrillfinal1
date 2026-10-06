'use client';

import SmoothScroll from '@/components/SmoothScroll';
import TrayanaMasterExperience from '@/components/cinematic/TrayanaMasterExperience';

// Information-Rich Sections
import AboutTrayana from '@/components/AboutTrayana';
import ServicesShowcase from '@/components/ServicesShowcase';
import ProjectCaseStudies from '@/components/ProjectCaseStudies';
import EquipmentShowcase from '@/components/EquipmentShowcase';
import SafetyEngineering from '@/components/SafetyEngineering';
import GlobalPresence from '@/components/GlobalPresence';
import ClientLogos from '@/components/ClientLogos';
import ParallaxFooter from '@/components/ParallaxFooter';

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative z-10 text-navy-deep bg-[#f5f5f5] min-h-screen">
        
        {/* CONTINUOUS 3D CINEMATIC EXPERIENCE (GLOBE -> UNDERGROUND HDD DRILLING STORY) */}
        <TrayanaMasterExperience />

        {/* INFORMATION RICH SECTIONS */}
        <div className="relative z-10 bg-[#f5f5f5]">
          <AboutTrayana />
          <ServicesShowcase />
          <ProjectCaseStudies />
          <EquipmentShowcase />
          <SafetyEngineering />
          <GlobalPresence />
          <ClientLogos />
        </div>
      </main>
      
      <ParallaxFooter />
    </SmoothScroll>
  );
}

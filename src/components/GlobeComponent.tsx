'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function GlobeComponent() {
  const globeEl = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 1200 });
  const [countries, setCountries] = useState({ features: [] });

  useEffect(() => {
    // Fetch GeoJSON for the dotted/hex continent rendering
    fetch('https://unpkg.com/three-globe/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(setCountries);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // Scale earth to be very large
      const size = Math.max(window.innerWidth * 1.3, 1600);
      setDimensions({
        width: size,
        height: size
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    setTimeout(() => {
      if (globeEl.current) {
        const controls = globeEl.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5; // Smooth cinematic rotation
        controls.enableZoom = false;
        
        // Initial point of view centered around Asia/Middle East
        globeEl.current.pointOfView({ lat: 10, lng: 90, altitude: 1.6 }, 2000);
      }
    }, 200);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ONLY approved Trayana locations
  const locations = [
    { name: 'INDIA', lat: 20.5937, lng: 78.9629 },
    { name: 'FRANCE', lat: 46.2276, lng: 2.2137 },
    { name: 'UAE', lat: 23.4241, lng: 53.8478 },
    { name: 'MALAYSIA', lat: 4.2105, lng: 101.9758 }
  ];

  // Orbital lines radiating from India to other locations
  const arcsData = locations.filter(loc => loc.name !== 'INDIA').map(loc => ({
    startLat: 20.5937,
    startLng: 78.9629,
    endLat: loc.lat,
    endLng: loc.lng,
    color: ['#ff5500', '#ff9900'] // Trayana orange accents
  }));

  return (
    <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-[65%] md:translate-x-[55%] lg:translate-x-[48%] z-10 pointer-events-none opacity-100 flex items-center justify-center">
      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        showGlobe={true} // Base sphere
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-water.png" // Dark base
        atmosphereColor="#1d4ed8" // Vibrant blue rim light matching reference
        atmosphereAltitude={0.15}
        
        // Dotted Hex Continent Rendering
        hexPolygonsData={countries.features}
        hexPolygonResolution={3} // Density of the dots
        hexPolygonMargin={0.2} // Spacing between dots
        hexPolygonColor={() => 'rgba(255, 255, 255, 0.4)'} // Technical dot color
        
        // Orbital Lines
        arcsData={arcsData}
        arcColor="color"
        arcDashLength={1} // Solid line look
        arcDashGap={0}
        arcDashInitialGap={() => Math.random()}
        arcDashAnimateTime={4000}
        arcStroke={0.5} // THIN elegant orange arcs
        
        // Custom Location Markers
        htmlElementsData={locations}
        htmlElement={(d: any) => {
          const el = document.createElement('div');
          // Match the exact label style from the reference: black box, white text, orange dot
          el.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; transform: translate(-50%, -50%); pointer-events: auto;">
              <div style="background-color: #040d1f; padding: 2px 6px; border: 1px solid rgba(255,255,255,0.1);">
                <span style="color: rgba(255,255,255,0.8); font-family: 'Inter', sans-serif; font-size: 8px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; white-space: nowrap;">${d.name}</span>
              </div>
              <div style="width: 3px; height: 3px; background-color: #ff5500; border-radius: 50%; box-shadow: 0 0 10px 2px #ff5500;"></div>
            </div>
          `;
          return el;
        }}
      />
      {/* Dark inner sphere for depth */}
      <div className="absolute inset-0 bg-[#020612] rounded-full pointer-events-none -z-20 scale-[0.98]" />
      
      {/* Subtle orange atmospheric glow behind globe matching reference */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-transparent via-[#ff5500]/10 to-transparent rounded-full blur-[150px] pointer-events-none -z-10" />
    </div>
  );
}

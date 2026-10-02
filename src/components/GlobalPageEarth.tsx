'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function GlobalPageEarth() {
  const globeEl = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 700 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    // Initial size
    handleResize();
    
    // Observe container resizing
    const observer = new ResizeObserver(() => {
      handleResize();
    });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    window.addEventListener('resize', handleResize);

    // Initial setup for the globe
    setTimeout(() => {
      if (globeEl.current) {
        const controls = globeEl.current.controls();
        controls.autoRotate = false; // Hold initially
        controls.enableZoom = false; // Prevent zooming to stay in layout
        
        // Initial point of view centered on India
        globeEl.current.pointOfView({ lat: 20, lng: 80, altitude: 2 }, 0);

        // Start rotation after ~2 seconds
        setTimeout(() => {
          if (globeEl.current) {
            const controls = globeEl.current.controls();
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.5; // Slow, elegant continuous rotation (approx 360deg over 45s)
          }
        }, 2000);
      }
    }, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  // Approved Trayana locations
  const locations = [
    { name: 'PUNE', lat: 18.5204, lng: 73.8567, isHub: true },
    { name: 'MUMBAI', lat: 19.0760, lng: 72.8777 },
    { name: 'BENGALURU', lat: 12.9716, lng: 77.5946 },
    { name: 'NAGPUR', lat: 21.1458, lng: 79.0882 },
    { name: 'DUBAI', lat: 25.2048, lng: 55.2708 },
    { name: 'KUALA LUMPUR', lat: 3.1390, lng: 101.6869 },
    { name: 'SINGAPORE', lat: 1.3521, lng: 103.8198 },
    { name: 'CALAIS', lat: 50.9513, lng: 1.8587 }
  ];

  // Orbital lines radiating from Pune to international locations
  const internationalLocations = locations.filter(loc => ['DUBAI', 'KUALA LUMPUR', 'SINGAPORE', 'CALAIS'].includes(loc.name));
  
  const arcsData = internationalLocations.map(loc => ({
    startLat: 18.5204, // Pune
    startLng: 73.8567,
    endLat: loc.lat,
    endLng: loc.lng,
    color: '#ff6600' // Thin orange arcs
  }));

  return (
    <div ref={containerRef} className="w-full h-full relative flex items-center justify-center bg-transparent cursor-grab active:cursor-grabbing">
      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor="#0066ff"
        atmosphereAltitude={0.15}
        
        // Realistic night textures
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        
        // Network arcs
        arcsData={arcsData}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={4000}
        arcStroke={0.5}
        
        // Location Markers
        labelsData={locations}
        labelLat={d => (d as any).lat}
        labelLng={d => (d as any).lng}
        labelText={d => (d as any).name}
        labelSize={d => ((d as any).isHub ? 1.2 : 0.8)}
        labelDotRadius={0.5}
        labelColor={() => 'rgba(255, 255, 255, 0.9)'}
        labelResolution={2}
        labelAltitude={0.01}
      />
    </div>
  );
}

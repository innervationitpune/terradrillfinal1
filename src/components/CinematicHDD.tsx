'use client';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';

// Path configuration
const START_X = 150; // Entry offset from left
const L1 = 400;      // Vertical drop length
const R = 350;       // Turn radius
const L2 = 1200;     // Horizontal run length
const ARC_LEN = (Math.PI * R) / 2;
const TOTAL_LEN = L1 + ARC_LEN + L2;

// Parametric function to get position and angle
function getHDDState(p: number) {
  const d = Math.max(0, Math.min(1, p)) * TOTAL_LEN;
  if (d <= L1) {
    // Straight down
    return { x: START_X, y: d, angle: 90 };
  } else if (d <= L1 + ARC_LEN) {
    // Curve
    const arcD = d - L1;
    const theta = (arcD / ARC_LEN) * (Math.PI / 2); // 0 to PI/2
    return {
      x: START_X + R - R * Math.cos(theta),
      y: L1 + R * Math.sin(theta),
      angle: 90 - (theta * 180) / Math.PI
    };
  } else {
    // Horizontal right
    const lineD = d - (L1 + ARC_LEN);
    return {
      x: START_X + R + lineD,
      y: L1 + R,
      angle: 0
    };
  }
}

const hddProcesses = [
  {
    id: 1,
    title: "SITE PREPARATION",
    description: "Comprehensive geological surveying, radar scanning, and alignment planning. Setting up entry and exit pits while ensuring zero disruption to existing surface infrastructure."
  },
  {
    id: 2,
    title: "PILOT BORE",
    description: "Guided drilling of the initial path using advanced telemetry and steering tools to navigate complex soil strata."
  },
  {
    id: 3,
    title: "STEERING / ALIGNMENT",
    description: "Continuous trajectory adjustment along the designed curve. Ensuring depth and pitch remain strictly within the engineered tolerance to navigate beneath obstacles."
  },
  {
    id: 4,
    title: "BORE DEVELOPMENT",
    description: "Successive reaming passes to enlarge the pilot hole to the required diameter. Drilling fluid is pumped to stabilize the bore, cool the drill, and remove cuttings."
  },
  {
    id: 5,
    title: "PIPE INSTALLATION",
    description: "The product pipe is pulled through the enlarged borehole in a continuous operation. The pipe safely traverses the entire alignment, completing the trenchless installation."
  }
];

export default function CinematicHDD() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Global progress for the drilling operation
  const progress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  // Derived states for Drill Head
  const drillX = useTransform(progress, p => getHDDState(p).x);
  const drillY = useTransform(progress, p => getHDDState(p).y);
  const drillRotateZ = useTransform(progress, p => getHDDState(p).angle);
  
  // AXIAL rotation: the drill spins around its own forward axis (rotateX)
  const drillSpinX = useTransform(scrollYProgress, [0, 1], [0, 7200]);

  // Derived states for Pipe (follows exactly 0.04 behind the drill)
  const pipeProgress = useTransform(progress, p => Math.max(0, p - 0.04));

  // The camera slowly tracks downward and slightly rightward to follow the drill
  const cameraY = useTransform(scrollYProgress, [0, 0.9], ["0px", "-500px"]);
  const cameraX = useTransform(scrollYProgress, [0, 0.9], ["0px", "-300px"]);

  // HUD State Machine
  const [activeStep, setActiveStep] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) setActiveStep(0);
    else if (latest < 0.40) setActiveStep(1);
    else if (latest < 0.55) setActiveStep(2);
    else if (latest < 0.70) setActiveStep(3);
    else setActiveStep(4);
  });

  // SVG Path Data matching the parametric math
  const pathD = `M ${START_X} 0 L ${START_X} ${L1} A ${R} ${R} 0 0 0 ${START_X + R} ${L1 + R} L ${START_X + R + L2} ${L1 + R}`;

  return (
    <section ref={containerRef} className="relative h-[800vh] bg-[#0a0a0a] text-white">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#071b3d]">
        
        {/* World Container - applies camera movement */}
        <motion.div style={{ x: cameraX, y: cameraY }} className="absolute top-0 left-0 w-[3000px] h-[2000px]">
          
          {/* Surface Layer */}
          <div className="absolute top-0 inset-x-0 h-[25vh] bg-[url('/images/hero-banner.jpg')] bg-cover bg-bottom opacity-60">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2a1a10]" />
          </div>
          
          {/* HDD Machine Stand-in (At entry point) */}
          <div className="absolute top-[10vh] left-[80px] w-[140px] h-[15vh] bg-[#1a1a1a] border-b-4 border-primary rounded-t-xl z-20 flex items-center justify-center shadow-2xl">
            <div className="text-white/50 text-[10px] font-mono tracking-widest text-center">HDD<br/>RIG</div>
          </div>

          {/* Ground Line */}
          <div className="absolute top-[25vh] inset-x-0 h-[10px] bg-gradient-to-b from-[#1a1005] to-[#2a1a10] border-t-4 border-[#3a2010] z-10" />

          {/* Underground Environment */}
          <div className="absolute top-[25vh] bottom-0 inset-x-0 bg-[#120a05] overflow-hidden">
             {/* Dirt texture */}
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #2a1a10 2px, transparent 3px)', backgroundSize: '40px 40px' }} />
             {/* Rock layers */}
             <div className="absolute top-[300px] inset-x-0 h-[600px] bg-gradient-to-b from-transparent via-[#0a0502]/80 to-[#050201]" />
          </div>

          {/* The Drilling Area (offset to start at ground level) */}
          <div className="absolute top-[25vh] left-0 w-full h-full z-20">
            
            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="xMidYMid slice">
              {/* Completed Bore Hole (Newly created path) */}
              <motion.path
                d={pathD}
                fill="none"
                stroke="#050201"
                strokeWidth="40"
                strokeLinecap="round"
                pathLength="1"
                className="opacity-90 drop-shadow-[0_0_10px_rgba(0,0,0,1)]"
                style={{ 
                  strokeDasharray: "1 1",
                  strokeDashoffset: useTransform(progress, p => 1 - p)
                }}
              />
              
              {/* Pipe Following Behind */}
              <motion.path
                d={pathD}
                fill="none"
                stroke="url(#pipeGradient)"
                strokeWidth="24"
                strokeLinecap="round"
                pathLength="1"
                className="drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                style={{ 
                  strokeDasharray: "1 1",
                  strokeDashoffset: useTransform(pipeProgress, p => 1 - p)
                }}
              />

              <defs>
                <linearGradient id="pipeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#333" />
                  <stop offset="50%" stopColor="#666" />
                  <stop offset="100%" stopColor="#111" />
                </linearGradient>
              </defs>
            </svg>

            {/* The Mechanical Drill Head */}
            <motion.div
              style={{
                x: drillX,
                y: drillY,
                rotateZ: drillRotateZ
              }}
              // The wrapper centers the drill exactly on the path point
              className="absolute top-0 left-0 w-0 h-0 origin-center"
            >
              {/* Inner div rotates around the X-axis (drilling axis) */}
              <motion.div
                style={{ rotateX: drillSpinX }}
                className="absolute -top-[12px] -left-[12px] w-[60px] h-[24px] origin-center flex items-center"
              >
                {/* 2.5D Mechanical Drill Head Graphic (pointing right/forward by default) */}
                <div className="w-full h-full bg-gradient-to-r from-[#222] via-[#ff6b35] to-[#aa2200] rounded-r-full shadow-[0_0_20px_rgba(255,107,53,0.6)] border-y border-r border-[#444] flex justify-end pr-1">
                  {/* Cutter teeth simulation */}
                  <div className="flex flex-col justify-between h-full py-[2px] opacity-80">
                    <div className="w-2 h-1 bg-white rounded-full" />
                    <div className="w-2 h-1 bg-white rounded-full" />
                    <div className="w-2 h-1 bg-white rounded-full" />
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </motion.div>

        {/* UI Overlay: Information Panels locked to viewport (Right Side) */}
        <div className="absolute inset-y-0 right-0 w-full md:w-1/2 lg:w-[40%] flex items-center pr-8 md:pr-16 z-30 pointer-events-none">
          <div className="relative w-full h-[400px]">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-widest border border-primary/30">
                    PROCESS {String(hddProcesses[activeStep].id).padStart(2, '0')}
                  </div>
                  {/* Progress indicator */}
                  <div className="flex gap-1.5">
                    {hddProcesses.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === activeStep ? 'w-6 bg-primary' : 'w-1.5 bg-white/20'}`} 
                      />
                    ))}
                  </div>
                </div>

                <h4 className="text-3xl lg:text-4xl font-bold mb-6 uppercase tracking-wide text-white">
                  {hddProcesses[activeStep].title}
                </h4>

                <div className="bg-[#1a1a1a]/90 backdrop-blur-md p-6 lg:p-8 border-l-4 border-primary shadow-2xl rounded-r-xl pointer-events-auto">
                  <p className="text-lg text-white/90 leading-relaxed">
                    {hddProcesses[activeStep].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}

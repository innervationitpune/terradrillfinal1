'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative overflow-hidden group rounded-full border border-primary/50 hover:border-primary px-8 py-3 text-xs uppercase tracking-widest font-bold transition-colors ${className}`}
    >
      <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
      <span className="relative z-10 group-hover:text-navy-deep transition-colors duration-500">{children}</span>
    </motion.button>
  );
}

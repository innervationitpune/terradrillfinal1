'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function Particles() {
  const count = 4000;
  const mesh = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 600;
      const z = (Math.random() - 0.5) * 600;
      const y = Math.sin(x * 0.05) * Math.cos(z * 0.05) * 15 - 30;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      const isOrange = Math.random() > 0.4;
      colors[i * 3] = isOrange ? 1.0 : 0.0;
      colors[i * 3 + 1] = isOrange ? 0.42 : 0.95;
      colors[i * 3 + 2] = isOrange ? 0.2 : 1.0;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      mesh.current.position.y = window.scrollY * 0.05; // Parallax
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={1.5} vertexColors transparent opacity={0.6} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export default function ThreeScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 50, 150], fov: 75, rotation: [-Math.PI / 8, 0, 0] }}>
        <fog attach="fog" args={['#081020', 0, 300]} />
        <Particles />
      </Canvas>
    </div>
  );
}

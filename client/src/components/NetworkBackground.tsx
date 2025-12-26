import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Procedural particle generation resembling a neural network
function ParticleNetwork(props: any) {
  const ref = useRef<THREE.Points>(null!);
  
  // Create 500 particles
  const count = 500;
  
  const [positions, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Distribute in a spherical cloud
      const r = 4 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      sizes[i] = Math.random() < 0.1 ? 0.3 : 0.1; // Some larger nodes
    }
    
    return [positions, sizes];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Very slow, deterministic rotation - mechanical, not organic
    ref.current.rotation.x = time * 0.02;
    ref.current.rotation.y = time * 0.015;
    
    // Extremely subtle scale fluctuation (barely perceptible)
    const scale = 1 + Math.sin(time * 0.25) * 0.02;
    ref.current.scale.set(scale, scale, scale);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]} {...props}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ec4899"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.5}
        />
      </Points>
      {/* Add connecting lines visualization if performance allows - simulated here with dense points */}
    </group>
  );
}

export function NetworkBackground() {
  return (
    <div className="absolute inset-0 z-0 h-screen w-full bg-transparent">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <fog attach="fog" args={['#0b1121', 3, 10]} />
        <ParticleNetwork />
      </Canvas>
    </div>
  );
}

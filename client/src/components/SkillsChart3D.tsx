import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface Skill {
  name: string;
  proficiency: number;
}

interface SkillsChart3DProps {
  skills: Skill[];
}

function Chart3D({ skills }: SkillsChart3DProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const barRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.3;
    }
    // Subtle hover effect on bars
    barRefs.current.forEach((bar, idx) => {
      if (bar) {
        const time = state.clock.getElapsedTime();
        bar.position.y = (idx - skills.length / 2) * 0.6 + Math.sin(time * 0.5 + idx) * 0.08;
      }
    });
  });

  const geometry = new THREE.BoxGeometry(0.4, 1, 0.4);

  return (
    <group ref={groupRef}>
      {skills.map((skill, idx) => {
        const proficiency = skill.proficiency / 100;
        const hue = 323 + (idx / skills.length) * 94; // Pink to blue transition
        
        return (
          <mesh
            key={idx}
            ref={(el) => {
              if (el) barRefs.current[idx] = el;
            }}
            position={[idx - skills.length / 2 + 0.5, 0, 0]}
            scale={[1, proficiency * 2, 1]}
          >
            <boxGeometry args={[0.35, 1, 0.35]} />
            <meshStandardMaterial
              color={`hsl(${hue}, 90%, 55%)`}
              emissive={`hsl(${hue}, 90%, 45%)`}
              emissiveIntensity={0.2}
              metalness={0.4}
              roughness={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export function SkillsChart3D({ skills }: SkillsChart3DProps) {
  if (!skills || skills.length === 0) {
    return <div className="flex items-center justify-center h-full text-muted-foreground">No skills data</div>;
  }

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, skills.length * 0.5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, 5]} intensity={0.4} color="#ec4899" />
        <pointLight position={[0, 5, -10]} intensity={0.4} color="#3b82f6" />
        <Chart3D skills={skills} />
      </Canvas>
    </div>
  );
}

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const planets = [
  { name: 'Sun', size: 0.8, color: '#FDB813', distance: 0 },
  { name: 'Mercury', size: 0.1, color: '#8C7853', distance: 2 },
  { name: 'Venus', size: 0.15, color: '#FFC649', distance: 3 },
  { name: 'Earth', size: 0.16, color: '#4B9CD3', distance: 4 },
  { name: 'Mars', size: 0.12, color: '#E27B58', distance: 5 },
  { name: 'Jupiter', size: 0.4, color: '#C88B3A', distance: 7 },
  { name: 'Saturn', size: 0.35, color: '#FAD5A5', distance: 9 },
  { name: 'Uranus', size: 0.25, color: '#4FD0E7', distance: 11 },
  { name: 'Neptune', size: 0.24, color: '#4166F5', distance: 13 },
];

const Planet = ({ planet, index }: { planet: typeof planets[0], index: number }) => {
  const isGasGiant = ['Jupiter', 'Saturn', 'Uranus', 'Neptune'].includes(planet.name);
  
  return (
    <group position={[planet.distance, 0, 0]}>
      <Sphere args={[planet.size, 32, 32]}>
        <meshStandardMaterial
          color={planet.color}
          roughness={isGasGiant ? 0.3 : 0.7}
          metalness={isGasGiant ? 0.2 : 0.1}
        />
      </Sphere>
      
      {/* Glow effect for Sun */}
      {planet.name === 'Sun' && (
        <Sphere args={[planet.size * 1.2, 32, 32]}>
          <meshBasicMaterial
            color={planet.color}
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </Sphere>
      )}
      
      {/* Saturn's rings */}
      {planet.name === 'Saturn' && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.45, 0.65, 64]} />
          <meshBasicMaterial
            color="#FAD5A5"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
};

const SolarSystemScene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} />
      
      {planets.map((planet, i) => (
        <Planet key={planet.name} planet={planet} index={i} />
      ))}
      
      {/* Asteroid belt */}
      {[...Array(100)].map((_, i) => {
        const angle = (i / 100) * Math.PI * 2;
        const radius = 5.5 + Math.random() * 0.8;
        return (
          <Sphere
            key={i}
            args={[0.02, 8, 8]}
            position={[
              Math.cos(angle) * radius,
              (Math.random() - 0.5) * 0.3,
              Math.sin(angle) * radius
            ]}
          >
            <meshBasicMaterial color="#888888" />
          </Sphere>
        );
      })}
    </>
  );
};

export const SolarSystem = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-strong rounded-t-xl border-t border-white/10 h-[200px]"
    >
      <div className="p-3 border-b border-white/10">
        <h3 className="text-sm font-bold text-cyan-electric font-mono">SOLAR SYSTEM OVERVIEW</h3>
      </div>
      <div className="h-[150px]">
        <Canvas camera={{ position: [0, 8, 12], fov: 60 }}>
          <Suspense fallback={null}>
            <SolarSystemScene />
            <OrbitControls 
              enableZoom={true} 
              enablePan={true}
              minDistance={5}
              maxDistance={30}
            />
          </Suspense>
        </Canvas>
      </div>
    </motion.div>
  );
};

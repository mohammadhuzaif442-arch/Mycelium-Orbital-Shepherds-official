import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useMissionStore } from '@/store/missionStore';
import { DebrisPopup } from './DebrisPopup';
import * as THREE from 'three';

const EarthGlobe = () => {
  return (
    <group>
      {/* Earth */}
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#1e4b7a"
          roughness={0.7}
          metalness={0.2}
        />
      </Sphere>
      
      {/* Atmosphere Glow */}
      <Sphere args={[2.1, 64, 64]}>
        <meshBasicMaterial
          color="#00f3ff"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Debris Points */}
      {[...Array(50)].map((_, i) => {
        const angle = (i / 50) * Math.PI * 2;
        const radius = 2.5 + Math.random() * 1.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 2;
        
        return (
          <Sphere key={i} args={[0.03, 8, 8]} position={[x, y, z]}>
            <meshBasicMaterial color="#ff4444" />
          </Sphere>
        );
      })}
      
      {/* Shepherd Units */}
      {[...Array(16)].map((_, i) => {
        const angle = (i / 16) * Math.PI * 2 + Date.now() * 0.0001;
        const radius = 2.8;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 2) * 0.5;
        
        return (
          <Sphere key={`shepherd-${i}`} args={[0.05, 8, 8]} position={[x, y, z]}>
            <meshBasicMaterial color="#10b981" />
          </Sphere>
        );
      })}
      
      <Stars radius={50} depth={50} count={5000} factor={4} fade speed={1} />
    </group>
  );
};

export const LeftPanel = () => {
  const { stats } = useMissionStore();
  const [selectedDebris, setSelectedDebris] = useState<any>(null);

  const statCards = [
    { 
      label: 'Total Debris Tracked', 
      value: stats.totalDebrisTracked.toLocaleString(),
      color: 'text-cyan-electric',
      unit: 'objects'
    },
    { 
      label: 'Debris Consumed Today', 
      value: stats.debrisConsumedToday.toLocaleString(),
      color: 'text-green-bio',
      unit: 'objects'
    },
    { 
      label: 'Material Recycled', 
      value: stats.materialRecycled.toLocaleString(),
      color: 'text-purple-plasma',
      unit: 'kg'
    },
    { 
      label: 'Bio-Fuel Generated', 
      value: stats.bioFuelGenerated.toLocaleString(),
      color: 'text-gold-accent',
      unit: 'liters'
    },
  ];

  const handleDebrisClick = () => {
    // Mock debris data
    setSelectedDebris({
      id: `DEBRIS-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      position: [Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5],
      velocity: 7.5 + Math.random() * 1.5,
      mass: 10 + Math.random() * 50,
      type: ['Satellite Fragment', 'Rocket Stage', 'Solar Panel'][Math.floor(Math.random() * 3)],
      risk: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
      altitude: 400 + Math.floor(Math.random() * 200),
      collisionProbability: 10 + Math.floor(Math.random() * 50),
    });
  };

  return (
    <div className="h-full flex flex-col gap-4 p-4 overflow-y-auto">
      {/* Debris Popup */}
      <AnimatePresence>
        {selectedDebris && (
          <DebrisPopup
            debris={selectedDebris}
            onClose={() => setSelectedDebris(null)}
          />
        )}
      </AnimatePresence>

      {/* 3D Earth Globe */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-strong rounded-xl overflow-hidden h-[400px]"
      >
        <div className="p-3 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-sm font-bold text-cyan-electric font-mono">DEBRIS TRACKING - LEO/MEO/GEO</h3>
          <button
            onClick={handleDebrisClick}
            className="text-xs font-mono text-muted-foreground hover:text-cyan-electric transition-colors"
          >
            Click debris for details
          </button>
        </div>
        <div className="h-[350px]">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Suspense fallback={null}>
              <EarthGlobe />
              <OrbitControls enableZoom={true} enablePan={false} />
            </Suspense>
          </Canvas>
        </div>
      </motion.div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-3">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="glass rounded-lg p-4 hover:glass-strong transition-all cursor-pointer group"
          >
            <div className="text-xs text-muted-foreground mb-2 font-mono">{stat.label}</div>
            <div className="flex items-baseline justify-between">
              <motion.div
                key={stat.value}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className={`text-2xl font-bold ${stat.color} font-mono`}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground font-mono">{stat.unit}</div>
            </div>
            <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                className={`h-full ${stat.color.replace('text-', 'bg-')}`}
              />
            </div>
          </motion.div>
        ))}
        
        {/* Kessler Syndrome Risk */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="glass rounded-lg p-4 border border-yellow-500/30"
        >
          <div className="text-xs text-muted-foreground mb-3 font-mono">KESSLER SYNDROME PROBABILITY</div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-gold-accent font-mono">
              {stats.kesslerProbability}%
            </div>
            <div className="text-xs text-gold-accent font-mono">MONITORING</div>
          </div>
          <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${stats.kesslerProbability}%` }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="absolute h-full bg-gradient-to-r from-green-bio via-gold-accent to-red-500"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

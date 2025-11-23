import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface EntranceAnimationProps {
  onComplete: () => void;
}

export const EntranceAnimation = ({ onComplete }: EntranceAnimationProps) => {
  const [stage, setStage] = useState<'meteor' | 'explosion' | 'complete'>('meteor');

  useEffect(() => {
    // Meteor phase: 2 seconds
    const meteorTimer = setTimeout(() => {
      setStage('explosion');
    }, 2000);

    // Explosion phase: 1.5 seconds
    const explosionTimer = setTimeout(() => {
      setStage('complete');
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(meteorTimer);
      clearTimeout(explosionTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-background-deep">
      {/* Starfield Background */}
      <div className="absolute inset-0 starfield opacity-50" />
      
      {/* Meteor */}
      {stage === 'meteor' && (
        <motion.div
          initial={{ x: '100vw', y: '-100vh', rotate: -45 }}
          animate={{ x: '30vw', y: '30vh', rotate: -45 }}
          transition={{ duration: 2, ease: 'easeIn' }}
          className="absolute w-24 h-24"
        >
          {/* Meteor Core */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500 via-red-500 to-yellow-600 blur-sm" />
          
          {/* Fire Trail */}
          <motion.div
            className="absolute -right-40 top-1/2 w-80 h-2"
            style={{
              background: 'linear-gradient(90deg, rgba(255,140,0,1) 0%, rgba(255,69,0,1) 50%, transparent 100%)',
              transformOrigin: 'left center',
            }}
            animate={{
              scaleX: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 2, ease: 'easeIn' }}
          />
          
          {/* Particle Trail */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-orange-400"
              style={{
                left: `-${i * 30}px`,
                top: '50%',
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                repeat: 3,
              }}
            />
          ))}
        </motion.div>
      )}
      
      {/* Explosion */}
      {stage === 'explosion' && (
        <div className="absolute" style={{ left: '30vw', top: '30vh' }}>
          {/* Main Explosion Flash */}
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 8, opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-full h-full rounded-full bg-gradient-radial from-white via-orange-400 to-red-600" />
          </motion.div>
          
          {/* Ember Particles */}
          {[...Array(30)].map((_, i) => {
            const angle = (i / 30) * Math.PI * 2;
            const distance = 100 + Math.random() * 200;
            return (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-orange-500"
                style={{
                  left: '0',
                  top: '0',
                }}
                animate={{
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance,
                  opacity: [1, 0],
                  scale: [1, 0],
                }}
                transition={{
                  duration: 1.5,
                  ease: 'easeOut',
                  delay: Math.random() * 0.3,
                }}
              />
            );
          })}
          
          {/* Smoke Clouds */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`smoke-${i}`}
              className="absolute w-48 h-48 rounded-full"
              style={{
                left: (Math.random() - 0.5) * 100,
                top: (Math.random() - 0.5) * 100,
                background: 'radial-gradient(circle, rgba(100,100,100,0.6) 0%, transparent 70%)',
              }}
              animate={{
                scale: [0, 2],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

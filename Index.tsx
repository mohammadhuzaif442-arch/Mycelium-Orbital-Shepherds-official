import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EntranceAnimation } from '@/components/EntranceAnimation';
import { CommandBar } from '@/components/CommandBar';
import { LeftPanel } from '@/components/LeftPanel';
import { CenterPanel } from '@/components/CenterPanel';
import { RightPanel } from '@/components/RightPanel';
import { SolarSystem } from '@/components/SolarSystem';
import { AIAssistant } from '@/components/AIAssistant';
import { MissionTimeline } from '@/components/MissionTimeline';
import { SoundControls } from '@/components/SoundControls';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const soundEffects = useSoundEffects();

  useEffect(() => {
    // Check if animation has been shown before
    const hasSeenAnimation = sessionStorage.getItem('hasSeenAnimation');
    if (hasSeenAnimation) {
      setShowDashboard(true);
      setAnimationComplete(true);
    }
  }, []);

  const handleAnimationComplete = () => {
    sessionStorage.setItem('hasSeenAnimation', 'true');
    setTimeout(() => {
      setShowDashboard(true);
      setAnimationComplete(true);
    }, 500);
  };

  if (!showDashboard) {
    return <EntranceAnimation onComplete={handleAnimationComplete} />;
  }

  return (
    <div className="min-h-screen bg-background-deep relative overflow-hidden">
      {/* Animated Starfield Background */}
      <div className="fixed inset-0 starfield opacity-30" />
      
      {/* Nebula Background Effect */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-purple-plasma/30 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-cyan-electric/20 to-transparent blur-3xl" />
      </div>
      
      {/* Main Dashboard Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        {/* Top Command Bar */}
        <div className="relative">
          <CommandBar />
          <div className="absolute top-4 right-4">
            <SoundControls soundEffects={soundEffects} />
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div className="container mx-auto h-[calc(100vh-200px)] grid grid-cols-12 gap-4 p-4">
          {/* Left Panel - 30% */}
          <div className="col-span-3 overflow-hidden">
            <LeftPanel />
          </div>
          
          {/* Center Panel - 40% */}
          <div className="col-span-5 overflow-hidden">
            <CenterPanel />
          </div>
          
          {/* Right Panel - 30% */}
          <div className="col-span-4 overflow-hidden">
            <RightPanel />
          </div>
        </div>
        
        {/* Bottom Solar System */}
        <div className="container mx-auto px-4 pb-4">
          <SolarSystem />
        </div>
        
        {/* Floating AI Assistant */}
        <AIAssistant />
        
        {/* Mission Timeline */}
        <MissionTimeline />
        
        {/* Version Number */}
        <div className="fixed bottom-4 left-4 text-xs text-muted-foreground font-mono">
          MYCELIUM ORBITAL SHEPHERDS v2.1.0
        </div>
      </motion.div>
      
      {/* Particle Effects */}
      {animationComplete && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed w-1 h-1 rounded-full bg-green-bio/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Index;

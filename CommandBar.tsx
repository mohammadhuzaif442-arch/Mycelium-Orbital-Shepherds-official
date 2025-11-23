import { useEffect, useState } from 'react';
import { useMissionStore } from '@/store/missionStore';
import { motion } from 'framer-motion';
import { Activity, Radio, Zap, Database, Wifi, AlertTriangle } from 'lucide-react';

export const CommandBar = () => {
  const { missionElapsedSeconds, stats, incrementMissionTime } = useMissionStore();
  const [solarWind, setSolarWind] = useState(432);
  const [kIndex, setKIndex] = useState(3.2);

  useEffect(() => {
    const timer = setInterval(() => {
      incrementMissionTime();
      // Simulate data changes
      setSolarWind(prev => prev + (Math.random() - 0.5) * 10);
      setKIndex(prev => Math.max(0, Math.min(9, prev + (Math.random() - 0.5) * 0.2)));
    }, 1000);
    return () => clearInterval(timer);
  }, [incrementMissionTime]);

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${String(hours).padStart(2, '0')}h ${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
  };

  const systemIndicators = [
    { label: 'POWER', icon: Zap, status: 'active', color: 'text-green-bio' },
    { label: 'COMMS', icon: Radio, status: 'active', color: 'text-cyan-electric' },
    { label: 'BIO-SYS', icon: Activity, status: 'active', color: 'text-green-bio' },
    { label: 'DATA', icon: Database, status: 'active', color: 'text-purple-plasma' },
    { label: 'NETWORK', icon: Wifi, status: 'active', color: 'text-cyan-electric' },
  ];

  return (
    <div className="glass-strong border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Mission Time */}
          <div className="flex items-center gap-8">
            <div>
              <div className="text-xs text-muted-foreground mb-1 font-mono">MISSION ELAPSED TIME</div>
              <div className="text-2xl font-bold text-cyan-electric font-mono tracking-wider">
                {formatTime(missionElapsedSeconds)}
              </div>
            </div>
            
            {/* System Status Indicators */}
            <div className="flex items-center gap-3">
              {systemIndicators.map((sys, i) => (
                <motion.div
                  key={sys.label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center gap-1"
                >
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        '0 0 10px currentColor',
                        '0 0 20px currentColor',
                        '0 0 10px currentColor',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-3 h-3 rounded-full ${sys.color}`}
                    style={{ backgroundColor: 'currentColor' }}
                  />
                  <div className="text-[10px] text-muted-foreground font-mono">{sys.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Center: Key Metrics */}
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-1 font-mono">ACTIVE SHEPHERDS</div>
              <motion.div
                key={stats.activeShepherds}
                initial={{ scale: 1.5, color: '#00f3ff' }}
                animate={{ scale: 1, color: '#ffffff' }}
                className="text-3xl font-bold font-mono"
              >
                {stats.activeShepherds}
              </motion.div>
            </div>
            
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-1 font-mono">DEBRIS ELIMINATED TODAY</div>
              <motion.div
                key={stats.debrisConsumedToday}
                initial={{ scale: 1.2, color: '#10b981' }}
                animate={{ scale: 1, color: '#ffffff' }}
                className="text-3xl font-bold font-mono"
              >
                {stats.debrisConsumedToday.toLocaleString()}
              </motion.div>
            </div>
          </div>
          
          {/* Right: Space Weather & Alert */}
          <div className="flex items-center gap-4">
            <div className="glass rounded-lg px-4 py-2">
              <div className="text-xs text-muted-foreground mb-1 font-mono">SPACE WEATHER</div>
              <div className="flex gap-4 text-sm font-mono">
                <div>
                  <span className="text-purple-plasma">K-INDEX:</span> {kIndex.toFixed(1)}
                </div>
                <div>
                  <span className="text-cyan-electric">SOLAR:</span> {solarWind.toFixed(0)} km/s
                </div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass rounded-lg px-6 py-3 border border-red-500/50 hover:border-red-500 transition-colors"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="text-sm font-bold text-red-500 font-mono">EMERGENCY</span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMissionStore } from '@/store/missionStore';
import { Terminal, Activity, Thermometer, RadioIcon as Radiation } from 'lucide-react';

export const CenterPanel = () => {
  const { operationLogs, addOperationLog } = useMissionStore();
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate operations
    const messages = [
      { text: 'Shepherd Unit SHEP-003 engaged debris at 401km altitude', type: 'normal' as const },
      { text: 'Bio-fuel production rate nominal, 97.3% efficiency', type: 'normal' as const },
      { text: 'Warning: Debris cluster detected in sector 7-Alpha', type: 'warning' as const },
      { text: 'Material conversion complete: 125kg aluminum processed', type: 'normal' as const },
      { text: 'Neural network strength at 94% - colony health optimal', type: 'normal' as const },
      { text: 'Collision avoidance maneuver executed successfully', type: 'normal' as const },
      { text: 'Radiation levels elevated in LEO zone 3', type: 'warning' as const },
    ];

    const interval = setInterval(() => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      addOperationLog(randomMessage.text, randomMessage.type);
    }, 4000);

    return () => clearInterval(interval);
  }, [addOperationLog]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [operationLogs]);

  const bioMetrics = [
    { label: 'Fungal Colony Health', value: 94, color: 'bg-green-bio', icon: Activity },
    { label: 'Temperature Range', value: '18-24°C', color: 'text-cyan-electric', icon: Thermometer },
    { label: 'Radiation Exposure', value: '2.3 mSv', color: 'text-purple-plasma', icon: Radiation },
    { label: 'Growth Rate', value: '+12%/day', color: 'text-green-bio', icon: Activity },
  ];

  return (
    <div className="h-full flex flex-col gap-4 p-4 overflow-hidden">
      {/* Operations Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-strong rounded-xl flex-1 flex flex-col max-h-[300px]"
      >
        <div className="p-3 border-b border-white/10 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-electric" />
          <h3 className="text-sm font-bold text-cyan-electric font-mono">REAL-TIME OPERATIONS FEED</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2 font-mono text-sm">
          {operationLogs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex gap-3 ${
                log.type === 'warning' ? 'text-gold-accent' :
                log.type === 'critical' ? 'text-red-500' :
                'text-green-bio'
              }`}
            >
              <span className="text-muted-foreground">[{log.time}]</span>
              <span>{log.message}</span>
            </motion.div>
          ))}
          <div ref={logsEndRef} />
        </div>
      </motion.div>
      
      {/* Active Operations Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-strong rounded-xl flex-1"
      >
        <div className="p-3 border-b border-white/10">
          <h3 className="text-sm font-bold text-purple-plasma font-mono">ORBITAL OPERATIONS MAP</h3>
        </div>
        <div className="p-4 h-[200px] relative overflow-hidden">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-electric" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* Orbital Zones */}
          {['LEO', 'MEO', 'GEO'].map((zone, i) => (
            <motion.div
              key={zone}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="absolute rounded-full border-2 border-dashed"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: `${(i + 1) * 80}px`,
                height: `${(i + 1) * 80}px`,
                borderColor: i === 0 ? '#ff4444' : i === 1 ? '#fbbf24' : '#00f3ff',
              }}
            >
              <div 
                className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold font-mono"
                style={{ color: i === 0 ? '#ff4444' : i === 1 ? '#fbbf24' : '#00f3ff' }}
              >
                {zone}
              </div>
            </motion.div>
          ))}
          
          {/* Active Nodes */}
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 60 + Math.random() * 40;
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-green-bio"
                style={{
                  left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                  top: `calc(50% + ${Math.sin(angle) * radius}px)`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            );
          })}
        </div>
      </motion.div>
      
      {/* Bio-Status Monitoring */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-strong rounded-xl"
      >
        <div className="p-3 border-b border-white/10">
          <h3 className="text-sm font-bold text-green-bio font-mono">BIO-STATUS MONITORING</h3>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3">
          {bioMetrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.05 }}
              className="glass rounded-lg p-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
                <div className="text-xs text-muted-foreground font-mono">{metric.label}</div>
              </div>
              <div className={`text-lg font-bold font-mono ${typeof metric.value === 'number' ? metric.color : metric.color.replace('bg-', 'text-')}`}>
                {metric.value}{typeof metric.value === 'number' && '%'}
              </div>
              {typeof metric.value === 'number' && (
                <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 1, delay: 0.7 + i * 0.05 }}
                    className={metric.color}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

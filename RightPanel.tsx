import { motion } from 'framer-motion';
import { useMissionStore } from '@/store/missionStore';
import { TrendingUp, MapPin, Brain, Zap, Battery } from 'lucide-react';

export const RightPanel = () => {
  const { shepherds } = useMissionStore();

  const materials = [
    { name: 'Aluminum', progress: 78, color: 'text-cyan-electric' },
    { name: 'Titanium', progress: 62, color: 'text-purple-plasma' },
    { name: 'Carbon Fiber', progress: 45, color: 'text-gold-accent' },
  ];

  const forecasts = [
    { period: '48hr', collisions: 3, probability: '12%' },
    { period: '7day', collisions: 18, probability: '34%' },
    { period: '30day', collisions: 67, probability: '58%' },
  ];

  return (
    <div className="h-full flex flex-col gap-4 p-4 overflow-y-auto">
      {/* Predictive Analytics */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-strong rounded-xl"
      >
        <div className="p-3 border-b border-white/10 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-purple-plasma" />
          <h3 className="text-sm font-bold text-purple-plasma font-mono">AI PREDICTIVE ANALYTICS</h3>
        </div>
        <div className="p-4 space-y-3">
          <div className="glass rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-2 font-mono">COLLISION FORECAST</div>
            <div className="space-y-2">
              {forecasts.map((forecast, i) => (
                <motion.div
                  key={forecast.period}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="font-mono text-cyan-electric">{forecast.period}</span>
                  <span className="font-mono">{forecast.collisions} events</span>
                  <span className="font-mono text-gold-accent">{forecast.probability}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="glass rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-purple-plasma" />
              <div className="text-xs text-muted-foreground font-mono">ML MODEL CONFIDENCE</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '94%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-purple-plasma to-cyan-electric"
                  />
                </div>
              </div>
              <div className="text-lg font-bold text-purple-plasma font-mono">94%</div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Material Conversion */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-strong rounded-xl"
      >
        <div className="p-3 border-b border-white/10">
          <h3 className="text-sm font-bold text-gold-accent font-mono">MATERIAL CONVERSION STATUS</h3>
        </div>
        <div className="p-4 space-y-3">
          {materials.map((material, i) => (
            <motion.div
              key={material.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="glass rounded-lg p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono">{material.name}</span>
                <span className={`text-sm font-bold font-mono ${material.color}`}>{material.progress}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${material.progress}%` }}
                  transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                  className={`h-full ${material.color.replace('text-', 'bg-')}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Fleet Management */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-strong rounded-xl flex-1"
      >
        <div className="p-3 border-b border-white/10 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-green-bio" />
          <h3 className="text-sm font-bold text-green-bio font-mono">SHEPHERD FLEET</h3>
        </div>
        <div className="p-3 grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
          {shepherds.map((shepherd, i) => (
            <motion.div
              key={shepherd.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + (i % 8) * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className={`glass rounded-lg p-2 cursor-pointer transition-all ${
                shepherd.status === 'active' ? 'border border-green-bio/30' : 'border border-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold font-mono text-cyan-electric">{shepherd.id}</div>
                <div className={`w-2 h-2 rounded-full ${
                  shepherd.status === 'active' ? 'bg-green-bio' : 'bg-muted'
                } pulse-green`} />
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <Battery className="w-3 h-3 text-gold-accent" />
                  <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: `${shepherd.energy}%` }}
                      transition={{ duration: 1, delay: 0.6 + (i % 8) * 0.05 }}
                      className="h-full bg-gold-accent"
                    />
                  </div>
                  <span className="text-[10px] font-mono">{shepherd.energy}%</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-green-bio" />
                  <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: `${shepherd.health}%` }}
                      transition={{ duration: 1, delay: 0.6 + (i % 8) * 0.05 }}
                      className="h-full bg-green-bio"
                    />
                  </div>
                  <span className="text-[10px] font-mono">{shepherd.health}%</span>
                </div>
              </div>
              
              <div className="mt-2 text-[10px] text-muted-foreground font-mono truncate">
                {shepherd.task}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

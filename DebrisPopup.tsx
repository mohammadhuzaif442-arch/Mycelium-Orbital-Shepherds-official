import { motion } from 'framer-motion';
import { X, AlertTriangle, TrendingUp, Gauge } from 'lucide-react';

interface DebrisData {
  id: string;
  position: [number, number, number];
  velocity: number;
  mass: number;
  type: string;
  risk: 'low' | 'medium' | 'high';
  altitude: number;
  collisionProbability: number;
}

interface DebrisPopupProps {
  debris: DebrisData;
  onClose: () => void;
}

export const DebrisPopup = ({ debris, onClose }: DebrisPopupProps) => {
  const riskColors = {
    low: 'text-green-bio',
    medium: 'text-gold-accent',
    high: 'text-red-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[500px]"
    >
      <div className="glass-strong rounded-xl border border-cyan-electric/30 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-cyan-electric/20 to-transparent flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground font-mono mb-1">DEBRIS OBJECT</div>
            <div className="text-lg font-bold text-cyan-electric font-mono">{debris.id}</div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Risk Status */}
          <div className="glass rounded-lg p-3 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className={`w-5 h-5 ${riskColors[debris.risk]}`} />
                <span className="text-sm font-mono">COLLISION RISK</span>
              </div>
              <span className={`text-lg font-bold font-mono ${riskColors[debris.risk]}`}>
                {debris.risk.toUpperCase()}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${debris.collisionProbability}%` }}
                  transition={{ duration: 1 }}
                  className={`h-full ${riskColors[debris.risk].replace('text-', 'bg-')}`}
                />
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                {debris.collisionProbability}%
              </span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="glass rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-purple-plasma" />
                <span className="text-xs text-muted-foreground font-mono">VELOCITY</span>
              </div>
              <div className="text-xl font-bold text-purple-plasma font-mono">
                {debris.velocity.toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground font-mono">km/s</div>
            </div>

            <div className="glass rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="w-4 h-4 text-gold-accent" />
                <span className="text-xs text-muted-foreground font-mono">MASS</span>
              </div>
              <div className="text-xl font-bold text-gold-accent font-mono">
                {debris.mass.toFixed(1)}
              </div>
              <div className="text-xs text-muted-foreground font-mono">kg</div>
            </div>

            <div className="glass rounded-lg p-3">
              <div className="text-xs text-muted-foreground font-mono mb-2">ALTITUDE</div>
              <div className="text-xl font-bold text-cyan-electric font-mono">
                {debris.altitude}
              </div>
              <div className="text-xs text-muted-foreground font-mono">km</div>
            </div>

            <div className="glass rounded-lg p-3">
              <div className="text-xs text-muted-foreground font-mono mb-2">TYPE</div>
              <div className="text-lg font-bold text-green-bio font-mono">
                {debris.type}
              </div>
            </div>
          </div>

          {/* Position Vector */}
          <div className="glass rounded-lg p-3">
            <div className="text-xs text-muted-foreground font-mono mb-2">POSITION VECTOR</div>
            <div className="font-mono text-sm text-cyan-electric">
              [{debris.position.map(p => p.toFixed(3)).join(', ')}]
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 glass rounded-lg py-2 font-mono text-sm hover:glass-strong transition-all border border-green-bio/30"
            >
              Deploy Shepherd
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 glass rounded-lg py-2 font-mono text-sm hover:glass-strong transition-all border border-cyan-electric/30"
            >
              Track Trajectory
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

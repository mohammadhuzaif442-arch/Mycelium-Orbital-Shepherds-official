import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { SoundEffects } from '@/hooks/useSoundEffects';

interface SoundControlsProps {
  soundEffects: SoundEffects;
}

export const SoundControls = ({ soundEffects }: SoundControlsProps) => {
  const [showVolume, setShowVolume] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowVolume(!showVolume)}
        className="glass rounded-lg px-3 py-2 flex items-center gap-2 hover:glass-strong transition-all"
      >
        {soundEffects.isMuted ? (
          <VolumeX className="w-5 h-5 text-muted-foreground" />
        ) : (
          <Volume2 className="w-5 h-5 text-cyan-electric" />
        )}
      </motion.button>

      <AnimatePresence>
        {showVolume && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 glass-strong rounded-lg p-4 w-64 border border-white/10"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">AUDIO</span>
                <button
                  onClick={soundEffects.toggleMute}
                  className="text-xs font-mono text-cyan-electric hover:text-cyan-electric/80"
                >
                  {soundEffects.isMuted ? 'UNMUTE' : 'MUTE'}
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono">Ambient</span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {Math.round(soundEffects.ambientVolume * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={soundEffects.ambientVolume * 100}
                  onChange={(e) => soundEffects.setAmbientVolume(Number(e.target.value) / 100)}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-electric"
                  disabled={soundEffects.isMuted}
                />
              </div>

              <div className="pt-2 border-t border-white/10">
                <div className="text-xs text-muted-foreground font-mono">
                  Sound design: Ambient hum, UI feedback, alerts
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

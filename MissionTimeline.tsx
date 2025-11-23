import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Bookmark } from 'lucide-react';

interface TimelineEvent {
  time: number;
  label: string;
  type: 'normal' | 'important';
}

export const MissionTimeline = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(3600); // seconds
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const totalDuration = 86400; // 24 hours

  const events: TimelineEvent[] = [
    { time: 3600, label: 'Mission Start', type: 'important' },
    { time: 7200, label: 'First Debris Collection', type: 'normal' },
    { time: 14400, label: 'Bio-Fuel Milestone', type: 'important' },
    { time: 21600, label: 'Collision Avoidance', type: 'normal' },
    { time: 43200, label: 'Mid-Mission Checkpoint', type: 'important' },
  ];

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  };

  const speeds = [0.5, 1, 2, 5];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[800px] glass-strong rounded-xl border border-cyan-electric/30 p-4 z-40"
    >
      <div className="space-y-3">
        {/* Timeline Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground">MISSION REPLAY</span>
            <div className="text-sm font-mono text-cyan-electric">
              {formatTime(currentTime)} / {formatTime(totalDuration)}
            </div>
          </div>

          {/* Playback Speed */}
          <div className="flex items-center gap-2">
            {speeds.map(speed => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={`px-2 py-1 text-xs font-mono rounded transition-colors ${
                  playbackSpeed === speed
                    ? 'bg-cyan-electric text-background'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Scrubber */}
        <div className="relative h-12">
          {/* Event Markers */}
          {events.map((event) => (
            <div
              key={event.time}
              className="absolute top-0 -translate-x-1/2 group cursor-pointer"
              style={{ left: `${(event.time / totalDuration) * 100}%` }}
            >
              <div className={`w-1 h-8 ${
                event.type === 'important' ? 'bg-gold-accent' : 'bg-cyan-electric/50'
              }`} />
              <Bookmark className="w-3 h-3 absolute -top-1 left-1/2 -translate-x-1/2 text-gold-accent" />
              <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="glass rounded px-2 py-1 text-xs font-mono">
                  {event.label}
                </div>
              </div>
            </div>
          ))}

          {/* Progress Bar */}
          <div className="absolute top-9 w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-electric to-purple-plasma"
              style={{ width: `${(currentTime / totalDuration) * 100}%` }}
            />
          </div>

          {/* Scrubber */}
          <input
            type="range"
            min="0"
            max={totalDuration}
            value={currentTime}
            onChange={(e) => setCurrentTime(Number(e.target.value))}
            className="absolute top-8 w-full h-4 opacity-0 cursor-pointer"
          />
          <div
            className="absolute top-7 w-4 h-4 rounded-full bg-cyan-electric border-2 border-white shadow-lg cursor-pointer"
            style={{ left: `${(currentTime / totalDuration) * 100}%`, transform: 'translateX(-50%)' }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentTime(Math.max(0, currentTime - 3600))}
            className="w-8 h-8 rounded-lg glass hover:glass-strong flex items-center justify-center transition-all"
          >
            <SkipBack className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-electric to-purple-plasma flex items-center justify-center"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentTime(Math.min(totalDuration, currentTime + 3600))}
            className="w-8 h-8 rounded-lg glass hover:glass-strong flex items-center justify-center transition-all"
          >
            <SkipForward className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

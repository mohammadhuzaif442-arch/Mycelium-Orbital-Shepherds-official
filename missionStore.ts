import { create } from 'zustand';

export interface DebrisObject {
  id: string;
  position: [number, number, number];
  velocity: [number, number, number];
  mass: number;
  type: string;
  risk: 'low' | 'medium' | 'high';
}

export interface ShepherdUnit {
  id: string;
  name: string;
  health: number;
  energy: number;
  task: string;
  status: 'active' | 'idle' | 'maintenance';
  position: [number, number, number];
}

export interface MissionStats {
  totalDebrisTracked: number;
  debrisConsumedToday: number;
  materialRecycled: number;
  bioFuelGenerated: number;
  kesslerProbability: number;
  activeShepherds: number;
}

interface MissionStore {
  missionElapsedSeconds: number;
  stats: MissionStats;
  debris: DebrisObject[];
  shepherds: ShepherdUnit[];
  operationLogs: Array<{ time: string; message: string; type: 'normal' | 'warning' | 'critical' }>;
  
  incrementMissionTime: () => void;
  updateStats: (partial: Partial<MissionStats>) => void;
  addOperationLog: (message: string, type: 'normal' | 'warning' | 'critical') => void;
}

export const useMissionStore = create<MissionStore>((set) => ({
  missionElapsedSeconds: 0,
  stats: {
    totalDebrisTracked: 36542,
    debrisConsumedToday: 847,
    materialRecycled: 12456,
    bioFuelGenerated: 3421,
    kesslerProbability: 23.7,
    activeShepherds: 16,
  },
  debris: [],
  shepherds: Array.from({ length: 16 }, (_, i) => ({
    id: `SHEP-${String(i + 1).padStart(3, '0')}`,
    name: `Shepherd ${i + 1}`,
    health: Math.floor(Math.random() * 30) + 70,
    energy: Math.floor(Math.random() * 40) + 60,
    task: ['Debris Collection', 'Material Processing', 'Orbital Patrol', 'Bio-Fuel Generation'][Math.floor(Math.random() * 4)],
    status: ['active', 'active', 'active', 'idle'][Math.floor(Math.random() * 4)] as 'active' | 'idle',
    position: [Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5],
  })),
  operationLogs: [
    { time: '12:34:56', message: 'System initialization complete', type: 'normal' },
    { time: '12:35:12', message: 'All shepherd units operational', type: 'normal' },
    { time: '12:35:45', message: 'Debris field scan in progress', type: 'normal' },
  ],
  
  incrementMissionTime: () => set((state) => ({ 
    missionElapsedSeconds: state.missionElapsedSeconds + 1 
  })),
  
  updateStats: (partial) => set((state) => ({
    stats: { ...state.stats, ...partial }
  })),
  
  addOperationLog: (message, type) => set((state) => {
    const now = new Date();
    const time = now.toTimeString().split(' ')[0];
    const newLog = { time, message, type };
    return {
      operationLogs: [newLog, ...state.operationLogs].slice(0, 50)
    };
  }),
}));

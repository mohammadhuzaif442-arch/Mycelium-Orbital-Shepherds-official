import { useEffect, useRef, useState } from 'react';

export interface SoundEffects {
  playClick: () => void;
  playAlert: () => void;
  playSuccess: () => void;
  playWhoosh: () => void;
  toggleMute: () => void;
  isMuted: boolean;
  ambientVolume: number;
  setAmbientVolume: (volume: number) => void;
}

export const useSoundEffects = (): SoundEffects => {
  const [isMuted, setIsMuted] = useState(false);
  const [ambientVolume, setAmbientVolume] = useState(0.3);
  const ambientRef = useRef<OscillatorNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Initialize ambient background hum
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = isMuted ? 0 : ambientVolume;

      // Create low frequency ambient hum
      const oscillator = audioContextRef.current.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.value = 60; // Low frequency hum
      oscillator.connect(gainNodeRef.current);
      oscillator.start();
      ambientRef.current = oscillator;

      return () => {
        oscillator.stop();
        audioContextRef.current?.close();
      };
    }
  }, []);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = isMuted ? 0 : ambientVolume;
    }
  }, [isMuted, ambientVolume]);

  const createBeep = (frequency: number, duration: number, volume: number = 0.3) => {
    if (isMuted || !audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    gainNode.gain.value = volume;

    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + duration);
  };

  const playClick = () => createBeep(800, 0.05, 0.2);
  const playAlert = () => {
    createBeep(1200, 0.1, 0.3);
    setTimeout(() => createBeep(1000, 0.1, 0.3), 100);
  };
  const playSuccess = () => {
    createBeep(600, 0.1, 0.2);
    setTimeout(() => createBeep(800, 0.15, 0.2), 100);
  };
  const playWhoosh = () => {
    if (isMuted || !audioContextRef.current) return;
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    oscillator.frequency.setValueAtTime(1000, audioContextRef.current.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContextRef.current.currentTime + 0.3);
    gainNode.gain.setValueAtTime(0.2, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.3);
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.3);
  };

  const toggleMute = () => setIsMuted(!isMuted);

  return {
    playClick,
    playAlert,
    playSuccess,
    playWhoosh,
    toggleMute,
    isMuted,
    ambientVolume,
    setAmbientVolume,
  };
};

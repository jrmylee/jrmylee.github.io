import { useState, useCallback } from 'react';

export const useAudioPlayer = (initialTrack) => {
  const [currentTrack, setCurrentTrack] = useState(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const togglePlay = useCallback((track) => {
    if (currentTrack === track) {
      setIsPlaying(!isPlaying);
      setIsSpinning(!isSpinning);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      setIsSpinning(true);
    }
  }, [currentTrack, isPlaying, isSpinning]);

  return {
    currentTrack,
    isPlaying,
    isSpinning,
    togglePlay,
    setIsPlaying,
  };
}; 
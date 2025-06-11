

import { useEffect, useRef } from 'react';

  const AudioPlayer = ({ src, onEnded, volume }) => { 
  const audioRef = useRef(null);

  useEffect(() => {
  if (!src) return;

  const audio = audioRef.current;
  audio.src = src;
  audio.play().catch(e => console.error('Audio play failed:', e));

const handleEnded = () => {
  if (onEnded) onEnded(); 
  };

  audio.addEventListener('ended', handleEnded);
  return () => {
  audio.removeEventListener('ended', handleEnded);
  audio.pause();
  audio.src = '';
  };
  }, [src, onEnded]);


  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]); 

 return <audio ref={audioRef} className="hidden" />;
};

export default AudioPlayer;
import { Link } from 'react-router-dom';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../hooks/useTheme';
import { useState, useRef, useEffect } from 'react';

const SurahRightSide = ({ 
  surah, 
  id,
  audioKey 
}) => {
  const { theme } = useTheme();
  const [activeVerse, setActiveVerse] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());


  const handlePlayAudio = (audioUrl, verseNumber) => {
    if (activeVerse === verseNumber && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setActiveVerse(null);
    } else {
      if (audioUrl) {
        audioRef.current.src = audioUrl;
        audioRef.current.play()
          .then(() => {
            setActiveVerse(verseNumber);
            setIsPlaying(true);
          })
          .catch(error => console.error("Audio playback failed:", error));
      }
    }
  };

  useEffect(() => {
    const currentAudio = audioRef.current;
    
    const handleEnded = () => {
      setIsPlaying(false);
      setActiveVerse(null);
    };

    currentAudio.addEventListener('ended', handleEnded);

    return () => {
      currentAudio.removeEventListener('ended', handleEnded);
      currentAudio.pause();
    };
  }, []);

  return (
    <div className="lg:w-2/3">
      <div className={`rounded-2xl shadow-2xl p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-blue-100'}`}>
        <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Ayat</h2>
        <div className="space-y-4">
          {surah.ayat?.map(verse => (
            <div 
              key={verse.nomorAyat}
              className={`p-4 rounded-xl ${
                activeVerse === verse.nomorAyat 
                  ? `${theme === 'dark' ? 'bg-blue-900 border-blue-700' : 'bg-blue-100 border-blue-300'} border` 
                  : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-gray-600'}`}>
                  Ayat {verse.nomorAyat}
                </span>
              </div>
              <p className={`text-right text-xl font-arabic mb-2 ${theme === 'dark' ? 'text-white' : ''}`}>
                {verse.teksArab}
              </p>
              <p className={`text-sm italic ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {verse.teksLatin}
              </p>
              <div className="flex justify-between items-center mt-2">
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                  {verse.teksIndonesia}
                </p>
                <button
                  onClick={() => handlePlayAudio(verse.audio?.[audioKey], verse.nomorAyat)}
                  className={`p-2 rounded-full hover:bg-blue-200 transition-colors ${
                    theme === 'dark' 
                      ? 'bg-blue-900 text-blue-300 hover:bg-blue-800' 
                      : 'bg-blue-100 text-blue-600'
                  }`}
                  disabled={!verse.audio?.[audioKey]}
                >
                  {activeVerse === verse.nomorAyat && isPlaying ? (
                    <PauseIcon className="h-4 w-4" />
                  ) : (
                    <PlayIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
        

        <div className="flex justify-between mt-6">
          {surah.nomor > 1 && (
            <Link
              to={`/surah/${parseInt(id) - 1}`}
              className={`px-4 py-2 rounded-lg shadow text-sm font-medium hover:bg-gray-100 ${
                theme === 'dark' 
                  ? 'bg-gray-800 text-white hover:bg-gray-700' 
                  : 'bg-white text-gray-800'
              }`}
            >
              Previous
            </Link>
          )}
          {surah.nomor < 114 && (
            <Link
              to={`/surah/${parseInt(id) + 1}`}
              className={`px-4 py-2 rounded-lg shadow text-sm font-medium hover:bg-gray-100 ml-auto ${
                theme === 'dark' 
                  ? 'bg-gray-800 text-white hover:bg-gray-700' 
                  : 'bg-white text-gray-800'
              }`}
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurahRightSide;
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useTheme } from '../hooks/useTheme';
import AudioPlayer from '../components/AudioPlayer';
import Navbar from '../components/Navbar';
import SurahLeftSide from '../components/SurahLeftSide';
import SurahRightSide from '../components/SurahRightSide';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import Footer from '../components/Footer';

const SurahDetail = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const [currentAudio, setCurrentAudio] = useState(null);
  const [audioKey, setAudioKey] = useState('01');
  const [isPlayingFullSurah, setIsPlayingFullSurah] = useState(false);
  const [activeVerse, setActiveVerse] = useState(null);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState(null);

  const { data: surahData, loading: surahLoading, error: fetchError } = useFetch(
    `https://equran.id/api/v2/surat/${id}`
  );

  useEffect(() => {
    if (fetchError) {
      setError(fetchError);
      console.error('Error fetching surah data:', fetchError);
    }
  }, [fetchError]);

  const handlePlayAudio = (audioSrc, verseNumber) => {
    if (!audioSrc) {
      console.error('Audio source is undefined');
      return;
    }
    setActiveVerse(verseNumber);
    setCurrentAudio({ src: audioSrc });
  };

  const handlePlayFullSurah = () => {
    if (!surahData?.data?.audioFull?.[audioKey]) {
      console.error('Full surah audio not available');
      return;
    }
    setIsPlayingFullSurah(true);
    handlePlayAudio(surahData.data.audioFull[audioKey], null);
  };

  const handlePauseFullSurah = () => {
    setIsPlayingFullSurah(false);
    setCurrentAudio(null);
    setActiveVerse(null);
  };

  const handleAudioEnded = () => {
    setActiveVerse(null);
    setIsPlayingFullSurah(false);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (surahLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-color)' }}>
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
              theme === 'dark' 
                ? 'border-blue-400' 
                : 'border-blue-500'
            }`}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-color)' }}>
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-8 text-center">
          <div className="p-4 rounded-lg" style={{ 
            backgroundColor: 'var(--card-bg)',
            color: 'var(--text-color)'
          }}>
            <p>Error loading surah: {error.message || 'Network Error'}</p>
            <button 
              onClick={() => window.location.reload()} 
              className={`mt-2 px-4 py-2 rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const surah = surahData?.data || {};
  const audioFull = surah.audioFull || {};

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20" style={{ backgroundColor: 'var(--bg-color)' }}>   
        <AudioPlayer 
          src={currentAudio?.src} 
          onEnded={handleAudioEnded} 
          volume={isMuted ? 0 : volume} 
        />

        <div className="container mx-auto px-4 py-6">
          {/* Back Button - Mobile Only */}
          <div className="mb-4 lg:hidden">
            <Link 
              to="/" 
              className={`flex items-center transition-colors ${
                theme === 'dark' 
                  ? 'text-blue-400 hover:text-blue-300' 
                  : 'text-blue-600 hover:text-blue-800'
              }`}
              style={{ color: 'var(--text-color)' }}
            >
              <ChevronLeftIcon className="h-5 w-5 mr-1" />
              <span>Back to Surah List</span>
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Side Component */}
            <SurahLeftSide 
              surah={surah}
              audioFull={audioFull}
              isPlayingFullSurah={isPlayingFullSurah}
              handlePlayFullSurah={handlePlayFullSurah}
              handlePauseFullSurah={handlePauseFullSurah}
              audioKey={audioKey}
              setAudioKey={setAudioKey}
              volume={volume}
              handleVolumeChange={handleVolumeChange}
              toggleMute={toggleMute}
              isMuted={isMuted}
              currentAudio={currentAudio}
              theme={theme}
            />

            {/* Right Side Component */}
            <SurahRightSide 
              surah={surah}
              activeVerse={activeVerse}
              handlePlayAudio={handlePlayAudio}
              audioKey={audioKey}
              id={id}
              theme={theme}
            />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default SurahDetail;
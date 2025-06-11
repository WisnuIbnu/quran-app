import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import AudioPlayer from '../components/AudioPlayer';
import Header from '../components/Header';
import SurahLeftSide from '../components/SurahLeftSide';
import SurahRightSide from '../components/SurahRightSide';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

const SurahDetail = () => {
  const { id } = useParams();
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
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <Header />
        <div className="max-w-md mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <Header />
        <div className="max-w-md mx-auto px-4 py-8 text-center">
          <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
            <p>Error loading surah: {error.message || 'Network Error'}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 pt-20">   
        <AudioPlayer 
          src={currentAudio?.src} 
          onEnded={handleAudioEnded} 
          volume={isMuted ? 0 : volume} 
        />

        <div className="container mx-auto px-4 py-6">
          {/* Back Button - Mobile Only */}
          <div className="mb-4 lg:hidden">
            <Link to="/" className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
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
            />

            {/* Right Side Component */}
            <SurahRightSide 
              surah={surah}
              activeVerse={activeVerse}
              handlePlayAudio={handlePlayAudio}
              audioKey={audioKey}
              id={id}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SurahDetail;
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import AudioPlayer from '../components/AudioPlayer';
import Header from '../components/Header';
import { PlayIcon, PauseIcon, ChevronLeftIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

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

  const getQariName = (key) => {
    const qariNames = {
      '01': 'Mishary Rashid Alafasy',
      '02': 'Abdullah Basfar',
      '03': 'Abdurrahman as-Sudais',
      '04': 'Ibrahim Akhdar',
      '05': 'Muhammad Ayyub',
    };
    return qariNames[key] || `Qari ${key}`;
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 pt-20">   
      <AudioPlayer 
        src={currentAudio?.src} 
        onEnded={handleAudioEnded} 
        volume={isMuted ? 0 : volume} 
      />

      <div className="container mx-auto px-4 py-6" >
        {/* Back Button - Mobile Only */}
        <div className="mb-4 lg:hidden">
          <Link to="/" className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
            <ChevronLeftIcon className="h-5 w-5 mr-1" />
            <span>Back to Surah List</span>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Surah Header and Reciter */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                {/* Back Button - Desktop Only */}
                <div className="hidden lg:block mb-4">
                  <Link to="/" className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                    <ChevronLeftIcon className="h-5 w-5 mr-1" />
                    <span>Back to Surah List</span>
                  </Link>
                </div>

                {/* Surah Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{surah.namaLatin || 'Loading...'}</h1>
                    <p className="text-xl font-arabic text-gray-800 dark:text-white">{surah.nama || '...'}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{surah.nomor || '...'}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{surah.jumlahAyat || '...'} verses</div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-gray-700 rounded-xl p-4 mb-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300 text-justify">
                    {surah.deskripsi ? surah.deskripsi.replace(/<[^>]+>/g, '').substring(0, 300) + '...' : 'Loading description...'}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300">{surah.arti || 'Loading translation...'}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{surah.tempatTurun || '...'}</p>
                  </div>
                  {audioFull && Object.keys(audioFull).length > 0 && (
                    <button
                      onClick={isPlayingFullSurah ? handlePauseFullSurah : handlePlayFullSurah}
                      className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      disabled={!audioFull[audioKey]}
                    >
                      {isPlayingFullSurah ? (
                        <PauseIcon className="h-6 w-6" />
                      ) : (
                        <PlayIcon className="h-6 w-6" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Reciter Selection */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Reciter Selection</h2>
                <Menu as="div" className="relative inline-block w-full">
                  <div>
                    <Menu.Button 
                      className="inline-flex justify-between w-full px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      disabled={!audioFull || Object.keys(audioFull).length === 0}
                    >
                      {getQariName(audioKey)}
                      <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  <Menu.Items className="absolute right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 dark:divide-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="px-1 py-1">
                      {audioFull && Object.keys(audioFull).map(key => (
                        <Menu.Item key={key}>
                          {({ active }) => (
                            <button
                              onClick={() => setAudioKey(key)}
                              className={`${
                                active ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-gray-200'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm ${
                                audioKey === key ? 'bg-blue-600 text-white' : ''
                              }`}
                            >
                              {getQariName(key)}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Menu>

                {/* Volume Control */}
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Volume Control</h2>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={toggleMute}
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      disabled={!currentAudio}
                    >
                      {isMuted ? (
                        <SpeakerXMarkIcon className="h-5 w-5" />
                      ) : (
                        <SpeakerWaveIcon className="h-5 w-5" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      disabled={!currentAudio}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Verses List */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Ayat</h2>
              <div className="space-y-4">
                {surah.ayat?.map(verse => (
                  <div 
                    key={verse.nomorAyat}
                    className={`p-4 rounded-xl ${activeVerse === verse.nomorAyat 
                      ? 'bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700' 
                      : 'bg-gray-50 dark:bg-gray-700'}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-blue-600 dark:text-blue-400">Ayat {verse.nomorAyat}</span>
                    </div>
                    <p className="text-right text-xl dark:text-white font-arabic mb-2">{verse.teksArab}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 italic">{verse.teksLatin}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-700 dark:text-gray-200">{verse.teksIndonesia}</p>
                      <button
                        onClick={() => handlePlayAudio(verse.audio?.[audioKey], verse.nomorAyat)}
                        className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                        disabled={!verse.audio?.[audioKey]}
                      >
                        {activeVerse === verse.nomorAyat ? (
                          <PauseIcon className="h-4 w-4" />
                        ) : (
                          <PlayIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation */}
              <div className="flex justify-between mt-6">
                {surah.nomor > 1 && (
                  <Link
                    to={`/surah/${parseInt(id) - 1}`}
                    className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Previous
                  </Link>
                )}
                {surah.nomor < 114 && (
                  <Link
                    to={`/surah/${parseInt(id) + 1}`}
                    className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ml-auto"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SurahDetail;
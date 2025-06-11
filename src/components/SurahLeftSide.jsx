import { Link } from 'react-router-dom';
import { PlayIcon, PauseIcon, ChevronLeftIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const SurahLeftSide = ({ 
  surah, 
  audioFull, 
  isPlayingFullSurah, 
  handlePlayFullSurah, 
  handlePauseFullSurah, 
  audioKey, 
  setAudioKey, 
  volume, 
  handleVolumeChange, 
  toggleMute, 
  isMuted, 
  currentAudio 
}) => {
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
  );
};

export default SurahLeftSide;
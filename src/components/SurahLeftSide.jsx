import { Link } from 'react-router-dom';
import { PlayIcon, PauseIcon, ChevronLeftIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../hooks/useTheme';

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

  const { theme } = useTheme();

  return (
    <div className="lg:w-1/3">
      <div className="sticky top-28 space-y-6">
        <div className={`rounded-2xl shadow-2xl p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-blue-100'}`}>

          <div className="hidden lg:block mb-4">
            <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
              <ChevronLeftIcon className="h-5 w-5 mr-1" />
              <span>Back to Surah List</span>
            </Link>
          </div>


          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className={`text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>{surah.namaLatin || 'Loading...'}</h1>
              <p className={`text-xl font-arabic ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>{surah.nama || '...'}</p>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-gray-500'}`}>{surah.nomor || '...'}</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>{surah.jumlahAyat || '...'} Ayat</div>
            </div>
          </div>

          <div className={`rounded-xl p-4 mb-4 shadow-sm ${theme === 'dark' ? 'bg-gray-700 border-gray-700' : 'bg-white/80 border-blue-100'}`}>
            <p className={`text-sm text-justify ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {surah.deskripsi ? surah.deskripsi.replace(/<[^>]+>/g, '').substring(0, 200) + '...' : 'Loading description...'}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-500'} font-medium`}>{surah.arti || 'Loading translation...'}</p>
              <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-500'} text-sm`}>{surah.tempatTurun || '...'}</p>
            </div>
            {audioFull && Object.keys(audioFull).length > 0 && (
              <button
                onClick={isPlayingFullSurah ? handlePauseFullSurah : handlePlayFullSurah}
                className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-lg"
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

        <div className={`rounded-2xl shadow-2xl p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-blue-100'}`}>
          <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Qori</h2>
          <Menu as="div" className="relative inline-block w-full">
            <div>
              <Menu.Button 
                className={`inline-flex justify-between w-full px-4 py-3 text-sm font-medium ${theme === 'dark' ? 'text-gray-200 bg-gray-700 hover:bg-gray-600 ' : 'text-gray-800 bg-blue-50 hover:bg-gray-200 border-gray-200'} rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 border`}
                disabled={!audioFull || Object.keys(audioFull).length === 0}
              >
                {getQariName(audioKey)}
                <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
              </Menu.Button>
            </div>
            <Menu.Items className={`absolute right-0 mt-2 w-full origin-top-right divide-y ${theme === 'dark' ? 'divide-gray-700 bg-gray-800' : 'divide-gray-100 bg-white'} rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10`}>
              <div className="px-1 py-1">
                {audioFull && Object.keys(audioFull).map(key => (
                  <Menu.Item key={key}>
                    {({ active }) => (
                      <button
                        onClick={() => setAudioKey(key)}
                        className={`${
                          active ? 'bg-gray-500 text-white' : `${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm ${
                          audioKey === key ? 'bg-gray-600 text-white' : ''
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


          <div className="mt-4">
            <h2 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Volume</h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleMute}
                className={`p-2 rounded-full transition-colors border ${theme === 'dark' ? ' bg-gray-700  text-white hover:bg-gray-600 border-gray-700' : 'bg-gray-200 text-gray-500 hover:bg-gray-00 border-blue-100'}`}
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
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`}
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
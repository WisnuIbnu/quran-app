import { Link } from 'react-router-dom';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

const SurahRightSide = ({ 
  surah, 
  activeVerse, 
  handlePlayAudio, 
  audioKey, 
  id 
}) => {
  return (
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
  );
};

export default SurahRightSide;
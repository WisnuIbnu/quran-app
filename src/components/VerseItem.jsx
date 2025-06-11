import { useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

const VerseItem = ({ verse, audioKey, onPlayAudio }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
    onPlayAudio(verse.audio[audioKey], () => setIsPlaying(false));
  };

  return (
    <div className="mb-8 p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-bold text-sm">
          {verse.nomorAyat}
        </div>
        <button
          onClick={handlePlayAudio}
          className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
        >
          {isPlaying ? (
            <PauseIcon className="h-5 w-5" />
          ) : (
            <PlayIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      <div className="mb-4">
        <p className="text-2xl font-arabic text-right text-gray-800 dark:text-white leading-loose">
          {verse.teksArab}
        </p>
      </div>
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-300 italic">
          {verse.teksLatin}
        </p>
      </div>
      <div>
        <p className="text-gray-700 dark:text-gray-200">{verse.teksIndonesia}</p>
      </div>
    </div>
  );
};

export default VerseItem;
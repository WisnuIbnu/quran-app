import { Link } from 'react-router-dom';

const SurahCard = ({ surah }) => {
  return (
    <Link
      to={`/surah/${surah.nomor}`}
      className="block p-6 bg-white dark:bg-gray-700 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-bold mr-4">
            {surah.nomor}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {surah.namaLatin}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {surah.arti} • {surah.jumlahAyat} ayat
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-arabic text-gray-800 dark:text-white">
            {surah.nama}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {surah.tempatTurun}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SurahCard;
import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import SurahCard from '../components/SurahCard';
import Header from '../components/Header';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error } = useFetch('https://equran.id/api/v2/surat');

  const baseWrapper = "min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100";

  if (loading) return (
    <div className={baseWrapper}>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className={baseWrapper}>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-100 dark:bg-red-200/10 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded">
          <p>Error loading surahs: {error}</p>
        </div>
      </div>
    </div>
  );

  const filteredSurahs = data?.data?.filter(surah =>
    surah.namaLatin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.arti.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={baseWrapper}>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search surah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSurahs?.map(surah => (
            <SurahCard key={surah.nomor} surah={surah} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

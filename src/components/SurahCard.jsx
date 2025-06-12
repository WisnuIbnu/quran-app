import { Link } from 'react-router-dom';

const SurahCard = ({ surah, theme }) => {
  return (
    <Link
      to={`/surah/${surah.nomor}`}
      className={`
        border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:-translate-y-2 duration-500 hover:shadow-lg  
        ${theme === 'dark' 
          ? 'box-shadow-white hover:bg-slate-800' 
          : 'box-shadow-black lightHover-background'
        }
      `}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className={`
            flex items-center justify-center h-10 w-10 rounded-full 
            font-bold mr-4
            ${theme === 'dark' 
              ? 'bg-indigo-900/50 text-indigo-300' 
              : 'bg-indigo-100 text-indigo-600'
            }
          `}>
            {surah.nomor}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-color)]">
              {surah.namaLatin}
            </h3>
            <p className={`
              ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
            `}>
              {surah.arti} • {surah.jumlahAyat} ayat
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-arabic text-[var(--text-color)]">
            {surah.nama}
          </p>
          <p className={`
            text-sm 
            ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}
          `}>
            {surah.tempatTurun}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SurahCard;
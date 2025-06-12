import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const UnderDevelopment = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 10));
    }, 800);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen bg-[#1a1a2e] flex flex-col items-center justify-center p-4 text-white`}>
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center"
      >
        <div className="relative">
          <motion.div
            animate={{ 
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-32 -left-32 w-64 h-64 rounded-full border-4 border-gray-600 opacity-20"
          ></motion.div>
          <motion.div
            animate={{ 
              rotate: -360,
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full border-4 border-gray-500 opacity-20"
          ></motion.div>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 border border-gray-700 shadow-xl"
        >
          <div className="flex justify-center mb-6">
            <motion.div 
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </motion.div>
          </div>

          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-100"
          >
            Under Development
          </motion.h1>

          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg mb-8 text-gray-300"
          >
             Masih UAS (ujian akhir semester) jadi belum sempat mengerjakan halaman ini, Doain lancar ya, nanti dikerjain kok~ ✨😉.
          </motion.p>

          <div className="mb-8">
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8 }}
                className="h-full bg-gradient-to-r from-gray-500 to-gray-300 rounded-full"
              />
            </div>
            <p className="mt-2 text-sm text-gray-400">Development progress: {progress}%</p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-gray-900 bg-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UnderDevelopment;
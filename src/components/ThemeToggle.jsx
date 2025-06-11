import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors duration-300 
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        ${
          theme === 'light'
            ? 'focus:ring-indigo-500 focus:ring-offset-white bg-gray-200 hover:bg-gray-300'
            : 'focus:ring-indigo-400 focus:ring-offset-gray-800 bg-gray-700 hover:bg-gray-600'
        }`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MoonIcon className="h-6 w-6 text-gray-800" />
      ) : (
        <SunIcon className="h-6 w-6 text-yellow-300" />
      )}
    </button>
  );
};

export default ThemeToggle;

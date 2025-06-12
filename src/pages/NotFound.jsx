import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center w-full">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              404 - Page Not Found
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              The page you're looking for doesn't exist.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
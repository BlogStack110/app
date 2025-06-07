import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="h-8 w-32 bg-gray-700 rounded animate-pulse"></div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
              ))}
            </nav>

            {/* User avatar */}
            <div className="h-8 w-8 bg-gray-700 rounded-full animate-pulse"></div>
          </div>
        </div>
      </header>


      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Content paragraphs */}
            <div className="space-y-4 mb-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-800 rounded animate-pulse w-5/6"></div>
                  <div className="h-4 bg-gray-800 rounded animate-pulse w-4/5"></div>
                  {i % 3 === 0 && <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4"></div>}
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex space-x-2 mb-8">
              <div className="h-6 w-16 bg-blue-500/20 rounded-full animate-pulse"></div>
              <div className="h-6 w-12 bg-blue-500/20 rounded-full animate-pulse"></div>
            </div>

            {/* Bottom actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-800">
              <div className="flex items-center space-x-4">
                <div className="h-8 w-24 bg-gray-800 rounded animate-pulse"></div>
                <div className="h-8 w-16 bg-gray-800 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gray-800 rounded-full animate-pulse"></div>
                <div className="h-8 w-16 bg-gray-800 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="h-6 w-32 bg-gray-700 rounded mb-4 animate-pulse"></div>

              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-gray-700 rounded-full mr-4 animate-pulse"></div>
                <div>
                  <div className="h-5 w-16 bg-gray-700 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>

              <div className="h-4 bg-gray-700 rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded mb-4 w-5/6 animate-pulse"></div>

              <div className="h-8 w-28 bg-blue-500/20 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-gray-700 rounded-full animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Loader;

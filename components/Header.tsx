
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center">
      <div className="flex items-center justify-center space-x-2 mb-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">StreamSnap</h1>
      </div>
      <p className="text-gray-500 max-w-xs mx-auto text-sm">
        Fast, free, and minimal video downloader for your favorite platforms.
      </p>
    </header>
  );
};

export default Header;

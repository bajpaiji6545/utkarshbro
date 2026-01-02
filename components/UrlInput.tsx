import React from 'react';
import { DownloadStatus } from '../types';

interface UrlInputProps {
  url: string;
  setUrl: (url: string) => void;
  onFetch: () => void;
  status: DownloadStatus;
}

const UrlInput: React.FC<UrlInputProps> = ({ url, setUrl, onFetch, status }) => {
  const isFetching = status === DownloadStatus.FETCHING;

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onFetch();
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {/* Fix: Removed duplicate 'd' attribute which was causing a JSX error */}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Paste video link here (YouTube, TikTok, etc.)"
          className="block w-full pl-11 pr-32 py-4 border-2 border-gray-100 rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-50/50 focus:border-indigo-500 sm:text-sm transition-all shadow-sm hover:border-gray-200"
          disabled={isFetching}
        />
        <div className="absolute inset-y-0 right-0 py-2 pr-2">
          <button
            onClick={onFetch}
            disabled={isFetching || !url.trim()}
            className={`h-full px-6 rounded-xl text-sm font-semibold transition-all flex items-center justify-center space-x-2 ${
              isFetching || !url.trim()
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-100'
            }`}
          >
            {isFetching ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Fetching...</span>
              </>
            ) : (
              <span>Start</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UrlInput;
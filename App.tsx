
import React, { useState, useCallback } from 'react';
import { AppState, DownloadStatus } from './types';
import Header from './components/Header';
import UrlInput from './components/UrlInput';
import VideoPreview from './components/VideoPreview';
import Features from './components/Features';
import { extractVideoInfo } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    url: '',
    status: DownloadStatus.IDLE,
    metadata: null,
    progress: 0,
    errorMessage: null,
  });

  const handleFetchInfo = async () => {
    if (!state.url.trim()) return;

    setState(prev => ({ 
      ...prev, 
      status: DownloadStatus.FETCHING, 
      errorMessage: null,
      metadata: null 
    }));

    try {
      const metadata = await extractVideoInfo(state.url);
      setState(prev => ({
        ...prev,
        status: DownloadStatus.READY,
        metadata,
      }));
    } catch (err) {
      console.error(err);
      setState(prev => ({
        ...prev,
        status: DownloadStatus.ERROR,
        errorMessage: 'Invalid URL or unsupported platform. Please check your link and try again.',
      }));
    }
  };

  const startDownload = (resolution: string) => {
    setState(prev => ({ ...prev, status: DownloadStatus.DOWNLOADING, progress: 0 }));
    
    // Simulate a download progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 10) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // Finalize download simulation
        setTimeout(() => {
          setState(prev => ({ ...prev, status: DownloadStatus.COMPLETED, progress: 100 }));
        }, 500);
      }
      setState(prev => ({ ...prev, progress: currentProgress }));
    }, 200);
  };

  const setUrl = (url: string) => {
    setState(prev => ({ ...prev, url }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center">
      <div className="w-full max-w-4xl py-12">
        <Header />
        
        <UrlInput 
          url={state.url} 
          setUrl={setUrl} 
          onFetch={handleFetchInfo} 
          status={state.status} 
        />

        {state.errorMessage && (
          <div className="w-full max-w-2xl mx-auto px-4 mt-6">
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl text-sm flex items-center space-x-2 animate-in fade-in zoom-in-95">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{state.errorMessage}</span>
            </div>
          </div>
        )}

        {state.metadata && (
          <VideoPreview 
            metadata={state.metadata} 
            status={state.status} 
            progress={state.progress} 
            onDownload={startDownload} 
          />
        )}

        {state.status === DownloadStatus.IDLE && <Features />}
      </div>

      <footer className="mt-auto py-8 text-center text-gray-400 text-[10px] tracking-widest uppercase">
        © {new Date().getFullYear()} StreamSnap Downloader • Safe & Secure
      </footer>
    </div>
  );
};

export default App;

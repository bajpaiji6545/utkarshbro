
import React from 'react';
import { VideoMetadata, DownloadStatus } from '../types';

interface VideoPreviewProps {
  metadata: VideoMetadata;
  status: DownloadStatus;
  progress: number;
  onDownload: (resolution: string) => void;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ metadata, status, progress, onDownload }) => {
  const isDownloading = status === DownloadStatus.DOWNLOADING;
  const isCompleted = status === DownloadStatus.COMPLETED;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/50">
        <div className="relative group">
          <img
            src={metadata.thumbnail}
            alt={metadata.title}
            className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-white text-xs font-mono">
            {metadata.duration}
          </div>
          <div className="absolute top-4 left-4">
             <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
               {metadata.platform}
             </span>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">
            {metadata.title}
          </h2>
          
          {metadata.description && (
            <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
              {metadata.description}
            </p>
          )}

          {isDownloading ? (
            <div className="space-y-4">
              <div className="flex justify-between items-end text-sm">
                <span className="font-medium text-gray-700">Downloading...</span>
                <span className="font-mono text-indigo-600 font-bold">{progress}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : isCompleted ? (
            <div className="flex flex-col items-center space-y-4 py-4 animate-bounce-short">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-green-700 font-bold text-lg">Download Complete!</span>
              <p className="text-gray-500 text-sm">Your file has been saved to your device.</p>
              <button 
                onClick={() => window.location.reload()}
                className="text-indigo-600 text-sm font-semibold hover:underline"
              >
                Download another video
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {metadata.resolutionOptions.map((res) => (
                <button
                  key={res}
                  onClick={() => onDownload(res)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl border-2 border-gray-100 hover:border-indigo-600 hover:bg-indigo-50/50 transition-all group"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-gray-900 font-bold text-sm">MP4 Video</span>
                    <span className="text-gray-400 text-xs font-medium uppercase tracking-tighter">{res} • High Quality</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-y-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;

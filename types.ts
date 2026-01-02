
export interface VideoMetadata {
  title: string;
  thumbnail: string;
  duration: string;
  platform: string;
  resolutionOptions: string[];
  description?: string;
}

export enum DownloadStatus {
  IDLE = 'IDLE',
  FETCHING = 'FETCHING',
  READY = 'READY',
  DOWNLOADING = 'DOWNLOADING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface AppState {
  url: string;
  status: DownloadStatus;
  metadata: VideoMetadata | null;
  progress: number;
  errorMessage: string | null;
}

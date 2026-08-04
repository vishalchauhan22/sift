import create from 'zustand';

type VideoDownloadState = {
  isDownloading: boolean;
  downloadingPercentage: number;
};

type VideoDownloadActions = {
  setDownloading: () => void;
  setDownloadingPercentage: (downloadingPercentage: number) => void;
  resetDownloading: () => void;
};

type VideoDownloadStore = VideoDownloadState & VideoDownloadActions;

export const useVideoDownload = create<VideoDownloadStore>(set => ({
  isDownloading: false,
  downloadingPercentage: 0,

  setDownloading: () => set(() => ({ isDownloading: true })),
  setDownloadingPercentage: downloadingPercentage =>
    set(() => ({ downloadingPercentage })),
  resetDownloading: () =>
    set(() => ({ isDownloading: false, downloadingPercentage: 0 })),
}));

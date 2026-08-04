import create from 'zustand';

type UseVideoSeekPreviewUrl = {
  seekPreviewUrls: Record<string, string | null>;
  setSeekPreviewUrl: (videoId: string, url: string | null) => void;
  clearSeekPreviewUrls: () => void;
};

export const useVideoSeekPreviewUrl = create<UseVideoSeekPreviewUrl>(set => ({
  seekPreviewUrls: {},
  setSeekPreviewUrl: (videoId, url) =>
    set(state => {
      const newSeekPreviewUrls = { ...state.seekPreviewUrls };
      newSeekPreviewUrls[videoId] = url;
      return { seekPreviewUrls: newSeekPreviewUrls };
    }),
  clearSeekPreviewUrls: () => set(() => ({ seekPreviewUrls: {} })),
}));

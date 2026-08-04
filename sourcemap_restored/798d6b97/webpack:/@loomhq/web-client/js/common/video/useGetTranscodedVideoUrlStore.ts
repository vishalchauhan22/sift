import create from 'zustand';

type UseGetTranscodedVideoUrl = {
  url: string | null;
  setUrl: (newUrl: string | null) => void;
  clearUrl: () => void;
};

export const useGetTranscodedVideoUrlStore = create<UseGetTranscodedVideoUrl>(
  set => ({
    url: null,
    setUrl: newUrl => set(() => ({ url: newUrl })),
    clearUrl: () => set(() => ({ url: null })),
  })
);

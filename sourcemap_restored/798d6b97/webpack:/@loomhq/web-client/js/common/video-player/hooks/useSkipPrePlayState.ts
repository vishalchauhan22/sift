import create from 'zustand';

export const useSkipPrePlayState = create<{
  skipPrePlayState: boolean;
  setSkipPrePlayState: (skipPrePlayState: boolean) => void;
  updatedPlayerTime: number;
  setUpdatedPlayerTime: (updatedPlayerTime: number) => void;
}>(set => ({
  skipPrePlayState: false,
  setSkipPrePlayState: (skipPrePlayState: boolean) => set({ skipPrePlayState }),
  updatedPlayerTime: 0,
  setUpdatedPlayerTime: (updatedPlayerTime: number) =>
    set({ updatedPlayerTime }),
}));

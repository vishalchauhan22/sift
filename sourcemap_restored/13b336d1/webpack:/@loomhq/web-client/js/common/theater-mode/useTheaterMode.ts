import create from 'zustand';

interface TheaterModeState {
  isInTheaterMode: boolean;
  setIsInTheaterMode: (payload: boolean) => void;
}

export const useTheaterMode = create<TheaterModeState>(set => ({
  isInTheaterMode: false,
  setIsInTheaterMode: (payload: boolean) => {
    set({ isInTheaterMode: payload });
  },
}));

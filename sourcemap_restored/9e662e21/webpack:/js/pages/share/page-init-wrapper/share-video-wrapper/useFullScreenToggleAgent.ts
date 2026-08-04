import create from 'zustand';

type UseFullScreenToggleAgent = {
  fullScreenToggleAgent: 'auto' | 'user' | 'none';
  setFullScreenToggleAgent: (
    fullScreenToggleAgent: 'auto' | 'user' | 'none'
  ) => void;
};

export const useFullScreenToggleAgent = create<UseFullScreenToggleAgent>(
  set => ({
    fullScreenToggleAgent: 'none',
    setFullScreenToggleAgent: (
      fullScreenToggleAgent: 'auto' | 'user' | 'none'
    ) => set({ fullScreenToggleAgent }),
  })
);

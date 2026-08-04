import create from 'zustand';

import { TabTypes } from './types';

interface RightPanelTabStore {
  currentRightPanelTab: TabTypes | null;
  setCurrentRightPanelTab: (tab: TabTypes | null) => void;
}

export const useRightPanelTabStore = create<RightPanelTabStore>(set => ({
  currentRightPanelTab: null,
  setCurrentRightPanelTab: tab => set({ currentRightPanelTab: tab }),
}));

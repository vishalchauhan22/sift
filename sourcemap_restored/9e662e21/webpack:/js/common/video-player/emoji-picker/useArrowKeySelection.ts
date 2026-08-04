import create from 'zustand';

type Selection = {
  category: number;
  emoji: number;
  categoryLength: number;
};

export const DEFAULT_SELECTION_STATE: Selection = {
  category: -1,
  emoji: -1,
  categoryLength: 0,
};

export const FIRST_SELECTION_STATE: Selection = {
  category: 0,
  emoji: 0,
  categoryLength: 2,
};

export type ArrowKeySelectionCtx = {
  mouseScrolled: boolean;
  setMouseScrolled: (mouseScrolled: boolean) => void;
  currentSelection: Selection;
  setCurrentSelection: (newSelection: Selection) => void;
};

export const useArrowKeySelection = create<ArrowKeySelectionCtx>(set => ({
  mouseScrolled: false,
  setMouseScrolled: (mouseScrolled: boolean) => set({ mouseScrolled }),
  currentSelection: DEFAULT_SELECTION_STATE,
  setCurrentSelection: (currentSelection: Selection) =>
    set({ currentSelection }),
}));

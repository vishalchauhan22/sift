import create from 'zustand';

interface RightPanelExpansionState {
  expandRightPanel: boolean;
}

interface RightPanelExpansionActions {
  setExpandRightPanel: (expand: boolean) => void;
}

interface RightPanelExpansionStore
  extends RightPanelExpansionState,
    RightPanelExpansionActions {}

export const useRightPanelExpansion = create<RightPanelExpansionStore>(set => ({
  // State
  expandRightPanel: false,

  // Actions
  setExpandRightPanel: (expand: boolean) =>
    set(() => ({
      expandRightPanel: expand,
    })),
}));

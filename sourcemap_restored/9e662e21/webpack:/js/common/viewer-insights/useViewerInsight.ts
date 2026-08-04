import create from 'zustand';

interface ViewerInsightState {
  isViewerSelected: boolean;
  selectedViewer: any | null;
  toggleIsViewerSelected: VoidFunction;
  setViewer: (viewer: any) => void;
}

export const useViewerInsight = create<ViewerInsightState>(set => ({
  isViewerSelected: false,
  selectedViewer: null,
  toggleIsViewerSelected: () =>
    set(state => {
      const isViewerSelected = state.isViewerSelected;
      const selectedViewer = isViewerSelected ? null : state.selectedViewer;

      return {
        selectedViewer,
        isViewerSelected: !isViewerSelected,
      };
    }),
  setViewer: viewer => set({ selectedViewer: viewer }),
}));

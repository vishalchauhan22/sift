import create from 'zustand';

interface VideoEditState {
  hasBeenEdited: boolean;
}

interface VideoEditActions {
  setHasBeenEdited: (hasBeenEdited: boolean) => void;
  reset: () => void;
}

type VideoEditStore = VideoEditState & VideoEditActions;

const initialState: VideoEditState = {
  hasBeenEdited: false,
};

export const useVideoEditStore = create<VideoEditStore>(set => ({
  ...initialState,
  setHasBeenEdited: (hasBeenEdited: boolean) => set({ hasBeenEdited }),
  reset: () => set(initialState),
}));

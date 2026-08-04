import create from 'zustand';

type UseFromRecorderState = {
  fromRecorder: boolean;
  setFromRecorder: (fromRecorder: boolean) => void;
};

const DEFAULT_FROM_RECORDER_STATE = {
  fromRecorder: false,
};

export const useFromRecorder = create<UseFromRecorderState>(set => ({
  ...DEFAULT_FROM_RECORDER_STATE,
  setFromRecorder: (fromRecorder: boolean) => set({ fromRecorder }),
}));

import create from 'zustand';

interface Dimensions {
  width: number;
  height: number;
}

interface ThumbnailData {
  thumbnailLocal: null | string;
  initiateSave: boolean;
  uploading: boolean;
  ogDims: null | Dimensions;
}

interface ThumbnailFlowState {
  isInThumbnailFlow: boolean;
  thumbnailData: ThumbnailData;
  startThumbnailFlow: VoidFunction;
  endThumbnailFlow: VoidFunction;
  initiateThumbnailSave: VoidFunction;
  finishThumbnailSave: VoidFunction;
  setLocalThumbnail: (
    payload: null | { url: string; dims: Dimensions }
  ) => void;
  toggleThumbnailUploading: VoidFunction;
}

const initialThumbnailData: ThumbnailData = {
  thumbnailLocal: null,
  initiateSave: false,
  uploading: false,
  ogDims: null,
};

export const useThumbnailFlow = create<ThumbnailFlowState>(set => ({
  isInThumbnailFlow: false,
  thumbnailData: {
    ...initialThumbnailData,
  },
  startThumbnailFlow: () => set({ isInThumbnailFlow: true }),
  endThumbnailFlow: () => set({ isInThumbnailFlow: false }),
  initiateThumbnailSave: () =>
    set(state => ({
      thumbnailData: { ...state.thumbnailData, initiateSave: true },
    })),
  finishThumbnailSave: () =>
    set({
      isInThumbnailFlow: false,
      thumbnailData: { ...initialThumbnailData },
    }),
  setLocalThumbnail: payload =>
    set(state => ({
      thumbnailData: {
        ...state.thumbnailData,
        thumbnailLocal: payload?.url ?? null,
        ogDims: payload?.dims ?? null,
      },
    })),
  toggleThumbnailUploading: () =>
    set(state => ({
      thumbnailData: {
        ...state.thumbnailData,
        initiateSave: false,
        uploading: !state.thumbnailData.uploading,
      },
    })),
}));

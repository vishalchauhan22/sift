import { TITLE_EDIT_FIELD_ACTIVATED } from '@js/constants/events';

import { useCallback, createRef } from 'react';
import create from 'zustand';

import { track } from '@js/utilities/analytics';

export enum TitleFieldFocusSource {
  TitleBar = 'title_bar',
  AISidebar = 'ai_sidebar',
}

type TitleBarStoreState = {
  titleRef: React.RefObject<HTMLInputElement>;
  cursorPosition: number | null;
  isInEditMode: boolean;
  isEntireTitleFirstSelected: boolean;
};

type TitleBarStoreActions = {
  setCursorPosition: (value: number | null) => void;
  setIsInEditMode: (value: boolean) => void;
  exitEditMode: () => void;
  setIsEntireTitleFirstSelected: (value: boolean) => void;
};

type TitleBarStore = TitleBarStoreState & TitleBarStoreActions;

const useTitleBarStore = create<TitleBarStore>(set => ({
  titleRef: createRef(),
  cursorPosition: null,
  setCursorPosition: value => {
    set({ cursorPosition: value });
  },
  isInEditMode: false,
  setIsInEditMode: value => {
    set({ isInEditMode: value });
  },
  exitEditMode: () => {
    set({ isInEditMode: false });
  },
  isEntireTitleFirstSelected: false,
  setIsEntireTitleFirstSelected: value => {
    set({ isEntireTitleFirstSelected: value });
  },
}));

type TitleBarReturnType = TitleBarStoreState &
  Omit<TitleBarStoreActions, 'setCursorPosition' | 'setIsInEditMode'> & {
    enterEditMode: (source: TitleFieldFocusSource, videoId: string) => void;
    saveCursorPosition: () => void;
  };

export const useTitleBar = (): TitleBarReturnType => {
  const {
    titleRef,
    cursorPosition,
    setCursorPosition,
    isEntireTitleFirstSelected,
    setIsEntireTitleFirstSelected,
    isInEditMode,
    setIsInEditMode,
    exitEditMode,
  } = useTitleBarStore();

  const enterEditMode = useCallback(
    (source: TitleFieldFocusSource, videoId: string) => {
      setIsEntireTitleFirstSelected(true);
      setIsInEditMode(true);

      if (videoId) {
        track(TITLE_EDIT_FIELD_ACTIVATED, {
          video_id: videoId,
          source,
        });
      }
    },
    [setIsEntireTitleFirstSelected, setIsInEditMode]
  );

  const saveCursorPosition = useCallback(() => {
    // We do a setTimeout here because the selectionStart is not always
    // updated immediately after a click event. See https://bugs.chromium.org/p/chromium/issues/detail?id=459168
    setTimeout(() => {
      setCursorPosition(titleRef.current?.selectionStart ?? null);
    }, 0);
  }, [setCursorPosition, titleRef]);

  return {
    titleRef,
    cursorPosition,
    saveCursorPosition,
    isEntireTitleFirstSelected,
    setIsEntireTitleFirstSelected,
    isInEditMode,
    enterEditMode,
    exitEditMode,
  };
};

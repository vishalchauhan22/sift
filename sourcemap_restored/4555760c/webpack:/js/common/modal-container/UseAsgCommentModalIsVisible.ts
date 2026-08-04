import create from 'zustand';

type UseAsgCommentModalIsVisible = {
  asgCommentModalIsVisible: boolean;
  setAsgCommentModalIsVisible: (isVisible: boolean) => void;
};

export const useAsgCommentModalIsVisible = create<UseAsgCommentModalIsVisible>(
  set => ({
    asgCommentModalIsVisible: false,
    setAsgCommentModalIsVisible: (isVisible: boolean) =>
      set({ asgCommentModalIsVisible: isVisible }),
  })
);

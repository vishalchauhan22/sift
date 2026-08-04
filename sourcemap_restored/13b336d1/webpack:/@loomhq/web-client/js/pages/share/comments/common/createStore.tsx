import React from 'react';
import create from 'zustand';
import createContext from 'zustand/context';

const { Provider, useStore } = createContext<CommentsAreaState>();

interface CommentsAreaState {
  overlayOpen: boolean;
  setOverlayOpen: (val: boolean) => void;
  replyId: string | null;
  setReplyId: (val: string | null) => void;
  sharePageSelectedComments: string[];
  setSharePageSelectedComments: (val: string[]) => void;
  timestampClicked: boolean;
  setTimestampClicked: (val: boolean) => void;
}

const createStore = () =>
  create<CommentsAreaState>(set => ({
    overlayOpen: false,
    setOverlayOpen: value =>
      set(() => ({
        overlayOpen: value,
        replyId: null,
      })),
    replyId: null,
    setReplyId: value =>
      set(() => ({
        replyId: value,
      })),
    sharePageSelectedComments: [],
    setSharePageSelectedComments: value =>
      set(() => ({
        sharePageSelectedComments: value,
      })),
    timestampClicked: false,
    setTimestampClicked: value =>
      set(() => ({
        timestampClicked: value,
      })),
  }));

export const CommentStateProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  return <Provider createStore={createStore}>{children}</Provider>;
};

export { useStore as useCommentStore };

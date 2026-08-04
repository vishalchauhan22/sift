import React from 'react';
import create from 'zustand';
import createContext from 'zustand/context';

type VideoPasswordState = {
  isProtected: boolean;
  needsPassword: boolean | undefined;
  password: string | null;
};

type VideoPasswordActions = {
  setPassword: (password: VideoPasswordState['password']) => void;
  setNeedsPassword: (needsPassword: boolean) => void;
  setIsProtected: (isProtected: VideoPasswordState['isProtected']) => void;
  initPasswordStore: ({
    isProtected,
    needsPassword,
  }: {
    isProtected?: VideoPasswordState['isProtected'];
    needsPassword: boolean;
  }) => void;
};

const { Provider, useStore } = createContext<
  VideoPasswordState & VideoPasswordActions
>();

const createStore = () =>
  create<VideoPasswordState & VideoPasswordActions>(set => ({
    password: null,
    // Setting the initial state to undefined to avoid flashing
    // of the password screen when the video is not protected
    needsPassword: undefined,
    isProtected: true,
    setPassword: (password: string | null) => set({ password }),
    setNeedsPassword: (needsPassword: boolean) => set({ needsPassword }),
    setIsProtected: (isProtected: boolean) => set({ isProtected }),
    initPasswordStore: ({
      isProtected,
      needsPassword,
    }: {
      isProtected?: boolean;
      needsPassword: boolean;
    }) =>
      set({
        isProtected: isProtected !== undefined ? isProtected : true,
        needsPassword,
      }),
  }));

type PasswordContextProps = {
  children: React.ReactNode;
};

export function PasswordContextProvider({
  children,
}: PasswordContextProps): JSX.Element {
  return <Provider createStore={createStore}>{children}</Provider>;
}

export function useVideoPasswordContext(): VideoPasswordState &
  VideoPasswordActions {
  const context = useStore();

  if (context === undefined) {
    throw new Error(
      'usePasswordContext must be used within a PasswordContextProvider'
    );
  }

  return context;
}

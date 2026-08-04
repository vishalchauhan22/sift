import React, { ReactNode } from 'react';

import { v4 as uuidv4 } from 'uuid';
import create from 'zustand';
import createContext from 'zustand/context';

const { Provider, useStore } = createContext<ErrorLayerStore>();

const ERROR_LIST_SIZE = 3;

export type ErrorItem = {
  message: string;
  key: string;
};

interface ErrorLayerStore {
  errors: ErrorItem[];
  pushError: (val: string) => void;
}

// Human Readable Explanation:
// errors[] has the last 3 errors which were pushed, the most recent is at the end
// when we push another one, it will be added to the end, with the first element removed
// even if errors are pushed with the same message, we can tell them apart by the key - to aid rendeirng
const createStore = () =>
  create<ErrorLayerStore>(set => ({
    errors: [],
    pushError: message =>
      set(state => ({
        errors: [...state.errors, { message, key: uuidv4() }].slice(
          -ERROR_LIST_SIZE
        ),
      })),
  }));

export const ErrorStoreProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  return <Provider createStore={createStore}>{children}</Provider>;
};

export { useStore as useErrorStore };

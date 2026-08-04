import create from 'zustand';

import {
  getAnonUserNameFromCookie,
  setAnonUserNameInCookie,
} from '@js/utilities/auth-anon';

type UseAnonUserNameState = {
  anonUserName: string;
  setAnonUserName: (anonUserName: string) => void;
};

export const useAnonUserName = create<UseAnonUserNameState>(set => ({
  anonUserName: getAnonUserNameFromCookie(),
  setAnonUserName: anonUserName => {
    set({ anonUserName });
    setAnonUserNameInCookie(anonUserName);
  },
}));

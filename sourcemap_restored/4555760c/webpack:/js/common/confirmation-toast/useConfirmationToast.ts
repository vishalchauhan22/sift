import { ReactNode } from 'react';

import create from 'zustand';

type UseConfirmationToastState = {
  message: string | ReactNode;
  show: boolean;
  setShowConfirmationToast: (message: string | ReactNode) => void;
  setHideConfirmationToast: () => void;
};

const DEFAULT_CONFIRMATION_TOAST_STATE = {
  message: '',
  show: false,
};

export const useConfirmationToast = create<UseConfirmationToastState>(set => ({
  ...DEFAULT_CONFIRMATION_TOAST_STATE,
  setShowConfirmationToast: (message: string | ReactNode) =>
    set({ show: true, message }),
  setHideConfirmationToast: () => set({ ...DEFAULT_CONFIRMATION_TOAST_STATE }),
}));

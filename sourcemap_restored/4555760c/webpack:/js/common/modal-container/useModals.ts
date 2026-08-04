import create from 'zustand';

import type { ModalPayload, ModalStore } from './types';

export const useModals = create<ModalStore>(set => ({
  modalType: null,
  options: {},
  openModal: ({ modalType, options = {} }: ModalPayload) => {
    return set(() => ({ modalType, options }));
  },
  closeModal: () => {
    return set(() => ({ modalType: null, options: {} }));
  },
}));

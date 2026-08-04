import { ComponentType, LazyExoticComponent } from 'react';

import * as ModalTypes from './modal-components/constants';
import { ModalTypeEnum } from './modal-components/enums';

export interface ModalProps {
  openModal: () => void;
  closeModal: () => void;
}

// note: adding to constants is deprecated so supporting constants and enums implementations
const allModalTypes = { ...ModalTypes, ...ModalTypeEnum };

export { allModalTypes as ModalTypes };

export type ModalTypeKeys = keyof typeof allModalTypes;

export type ModalComponentMap = {
  [key in ModalTypeKeys]?: LazyExoticComponent<
    ComponentType<React.PropsWithChildren<any>>
  >;
};

// useModal types

export type ModalPayload = {
  modalType: ModalTypeKeys;
  options?: any;
};

type ModalState = {
  modalType?: ModalTypeKeys | null;
  options: any;
};

type ModalActions = {
  openModal: (payload: ModalPayload) => void;
  closeModal: () => void;
};

export type ModalStore = ModalState & ModalActions;

// Options Types

type AfterOAuthLoginModal = {
  modals: {
    options: {
      addReplyId: string;
      comment: string;
      currentVideoTime: number;
      emojiReaction: string;
      onboardingType: string;
      parentPostId?: number;
      source: string;
      videoOwnerName: string;
    };
  };
};

type ShareRecordReplySignupModal = {
  modals: {
    options: {
      addReplyId: string;
      videoId: string;
    };
  };
};

type ModalOptions = AfterOAuthLoginModal | ShareRecordReplySignupModal;

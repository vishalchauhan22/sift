import create from 'zustand';

type UseDidPassEmailGateModal = {
  didPassEmailGateModal: boolean;
  setDidPassEmailGateModal: (didPassEmailGateModal: boolean) => void;
};

export const useDidPassEmailGateModal = create<UseDidPassEmailGateModal>(
  set => ({
    didPassEmailGateModal: false,
    setDidPassEmailGateModal: didPassEmailGateModal =>
      set(() => ({ didPassEmailGateModal })),
  })
);

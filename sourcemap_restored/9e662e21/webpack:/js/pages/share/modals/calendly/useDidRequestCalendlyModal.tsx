import create from 'zustand';

type UseDidRequestCalendlyModal = {
  didRequestCalendlyModal: boolean;
  setDidRequestCalendlyModal: (didRequestCalendlyModal: boolean) => void;
};

export const useDidRequestCalendlyModal = create<UseDidRequestCalendlyModal>(
  set => ({
    didRequestCalendlyModal: false,
    setDidRequestCalendlyModal: didRequestCalendlyModal =>
      set(() => ({ didRequestCalendlyModal })),
  })
);

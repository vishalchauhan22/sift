import create from 'zustand';

type UseRoleMandatoryModalHasBeenClosed = {
  roleMandatoryModalHasBeenClosed: boolean;
  setRoleMandatoryModalHasBeenClosed: (
    roleMandatoryModalHasBeenClosed: boolean
  ) => void;
};

export const useRoleMandatoryModalHasBeenClosed =
  create<UseRoleMandatoryModalHasBeenClosed>(set => ({
    roleMandatoryModalHasBeenClosed: false,
    setRoleMandatoryModalHasBeenClosed: (hasBeenClosed: boolean) =>
      set({ roleMandatoryModalHasBeenClosed: hasBeenClosed }),
  }));

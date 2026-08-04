import create from 'zustand';
import { MAX_FTUX } from '@loomhq/shared-utilities/constants/ftux';
import { AvailableFtux } from '@js/globalTypes.generated';
import { compareFtuxStore } from '@js/utilities/object';

type FtuxStore = {
  availableFtuxAnonymous: AvailableFtux[];
  ftuxTriggered: AvailableFtux[];
  visibleFtux: AvailableFtux[];
  setAvailableFtuxAnonymous: (ftux: AvailableFtux[]) => void;
  setTriggeredFtux: (ftux: AvailableFtux) => void;
  removeVisibleFtux: (ftux: AvailableFtux) => void;
};

// Export the base store for testing purposes
export const useFtuxStoreBase = create<FtuxStore>(set => ({
  availableFtuxAnonymous: [],
  ftuxTriggered: [],
  visibleFtux: [],

  setAvailableFtuxAnonymous: ftux => set({ availableFtuxAnonymous: ftux }),

  setTriggeredFtux: ftux =>
    set(state => {
      if (state.ftuxTriggered.some(f => f.name === ftux.name)) {
        return state;
      }

      const newTriggered = [...state.ftuxTriggered, ftux];
      const p0Ftux = newTriggered.filter(ftux => ftux.priority === 0);
      const p1Ftux = newTriggered.filter(ftux => ftux.priority !== 0);

      if (p0Ftux.length >= MAX_FTUX) {
        return {
          ...state,
          ftuxTriggered: newTriggered,
          visibleFtux: p0Ftux,
        };
      }

      while (p0Ftux.length < MAX_FTUX && p1Ftux.length > 0) {
        const ftux = p1Ftux.pop();
        if (ftux) {
          p0Ftux.push(ftux);
        }
      }

      return {
        ...state,
        ftuxTriggered: newTriggered,
        visibleFtux: p0Ftux,
      };
    }),

  removeVisibleFtux: ftux =>
    set(state => ({
      ...state,
      visibleFtux: state.visibleFtux.filter(f => f.name !== ftux.name),
    })),
}));

export const useFtuxStore = (
  selector?: Parameters<typeof useFtuxStoreBase<FtuxStore>>[0], // extracting types from our store
  equalityFn?: Parameters<typeof useFtuxStoreBase<FtuxStore>>[1] // extracting types from our store
): ReturnType<typeof useFtuxStoreBase<FtuxStore>> =>
  useFtuxStoreBase(
    selector ?? (state => state), // default selector which returns the whole state
    equalityFn ?? compareFtuxStore // our comparator
  );

import { CheckedItem } from '@js/common/item-selection/useUpdateCheckedItems';
import create from 'zustand';

type VideoDashboard = {
  checkedItems: CheckedItem[];
  renameId: string | null;
  currentFolderId: string | null;
  currentSpaceId: string | null;
  setCheckedItems: (newCheckedItems: CheckedItem[]) => void;
  setRenameId: (newId: string | null) => void;
  setCurrentFolderId: (newCurrentFolderId: string | null) => void;
  setCurrentSpaceId: (newcurrentSpaceId: string | null) => void;
};

export const useVideoDashboard = create<VideoDashboard>(set => ({
  checkedItems: [],
  renameId: null,
  currentFolderId: null,
  currentSpaceId: null,
  setCheckedItems: checkedItems => set(() => ({ checkedItems })),
  setRenameId: renameId => set(() => ({ renameId })),
  setCurrentFolderId: (currentFolderId: string | null) =>
    set(() => ({ currentFolderId })),
  setCurrentSpaceId: (currentSpaceId: string | null) =>
    set(() => ({ currentSpaceId })),
}));

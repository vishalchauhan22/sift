import create from 'zustand';

type DeviceStore = {
  checkedExtensionInstalled: boolean;
  extensionInstalled: boolean;
  updateExtensionInstalled: (installed: boolean) => void;
};

export const useDevice = create<DeviceStore>(set => ({
  checkedExtensionInstalled: false,
  extensionInstalled: false,
  updateExtensionInstalled: (installed: boolean) =>
    set({ checkedExtensionInstalled: true, extensionInstalled: installed }),
}));

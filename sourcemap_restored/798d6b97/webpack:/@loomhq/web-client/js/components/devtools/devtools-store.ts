import create from 'zustand';

export const useDevTools = create(
  (set: (args: { showDevToolsModal: boolean }) => void) => ({
    showDevToolsModal: false,
    openDevToolsModal() {
      set({ showDevToolsModal: true });
    },
    closeDevToolsModal() {
      set({ showDevToolsModal: false });
    },
  })
);

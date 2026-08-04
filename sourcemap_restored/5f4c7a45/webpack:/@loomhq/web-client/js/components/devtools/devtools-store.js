/* eslint-disable @loomhq/loom/no-js-extension */
import create from 'zustand';

export const useDevTools = create(set => ({
  showDevToolsModal: false,
  openDevToolsModal() {
    set({ showDevToolsModal: true });
  },
  closeDevToolsModal() {
    set({ showDevToolsModal: false });
  },
}));

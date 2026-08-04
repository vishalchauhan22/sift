import create from 'zustand';

interface DefaultSettingsStore {
  showDefaultSettings: boolean;
  setShowDefaultSettings: (showDefaultSettings: boolean) => void;
}

const useDefaultSettingsStore = create<DefaultSettingsStore>(set => ({
  showDefaultSettings: false,
  setShowDefaultSettings: (showDefaultSettings: boolean) =>
    set({ showDefaultSettings }),
}));

/**
 * Custom hook to access the default settings store
 * Provides access to both the state and actions for managing showDefaultSettings
 *
 * @returns {Object} Object containing:
 *   - showDefaultSettings: boolean - Current state of showDefaultSettings
 *   - setShowDefaultSettings: (boolean) => void - Action to update showDefaultSettings
 */
export const useDefaultSettings = (): DefaultSettingsStore => {
  const { showDefaultSettings, setShowDefaultSettings } =
    useDefaultSettingsStore();

  return {
    showDefaultSettings,
    setShowDefaultSettings,
  };
};

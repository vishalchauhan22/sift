import create from 'zustand';

interface NavigationMenuToggleState {
  userClickedNavToggle: boolean;
}

interface NavigationMenuToggleActions {
  setUserClickedNavToggle: () => void;
}

interface NavigationMenuToggleStore
  extends NavigationMenuToggleState,
    NavigationMenuToggleActions {}

export const useNavigationMenuToggle = create<NavigationMenuToggleStore>(
  set => ({
    // State
    userClickedNavToggle: false,

    // Actions
    setUserClickedNavToggle: () =>
      set(() => ({
        userClickedNavToggle: true,
      })),
  })
);

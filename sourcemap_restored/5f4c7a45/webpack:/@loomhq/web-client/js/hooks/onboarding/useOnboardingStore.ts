import create from 'zustand';

type OnboardingStore = {
  useCasePlan: any;
  role: any;
  updateWelcomeUseCasePlan: (useCasePlan: any) => void;
  updateWelcomeRole: (role: any) => void;
};

export const useOnboardingStore = create<OnboardingStore>(set => ({
  useCasePlan: null,
  role: null,

  updateWelcomeUseCasePlan: useCasePlan =>
    set(() => ({
      useCasePlan,
    })),
  updateWelcomeRole: role =>
    set(() => ({
      role,
    })),
}));

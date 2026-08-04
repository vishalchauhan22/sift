import create from 'zustand';

type UsePromotionalCheckboxStore = {
  locale: string | null;
  localeRequiresMarketingOptIn: boolean | null;
  isPromotionalEmailBoxChecked: boolean;
  setLocale: (locale: string | null) => void;
  setLocaleRequiresMarketingOptIn: (
    localeRequiresMarketingOptIn: boolean
  ) => void;
  setIsChecked: (checked: boolean) => void;
};

export const usePromotionalCheckboxStore = create<UsePromotionalCheckboxStore>(
  set => ({
    locale: null,
    localeRequiresMarketingOptIn: null,
    isPromotionalEmailBoxChecked: false,
    setLocale: locale => set(() => ({ locale })),
    setLocaleRequiresMarketingOptIn: localeRequiresMarketingOptIn =>
      set(() => ({ localeRequiresMarketingOptIn })),
    setIsChecked: checked =>
      set(() => ({ isPromotionalEmailBoxChecked: checked })),
  })
);

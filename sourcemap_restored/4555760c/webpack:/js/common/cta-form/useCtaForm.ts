import create from 'zustand';

export type CtaMod = {
  color: string;
  background_color: string;
  border_radius: number;
  only_show_at_end_of_video?: boolean;
  location?: string | 'Top left' | 'Top right' | 'Bottom left' | 'Bottom right';
};

export type Cta = {
  ctaMods: CtaMod | null;
  ctaText: string | null;
  ctaUrl: string | null;
  ctaApprovedAt: string | null;
  ctaEnabled: boolean;
  ctaIsAuto: boolean;
};

type CtaFormStateProps = Cta & {
  isEditingCta: boolean;
};

type CtaFormStateFunctions = {
  initializeCtaForm: (cta?: Partial<CtaFormStateProps>) => void;
  setIsEditingCta: (isEditing: boolean) => void;
  setCta: (cta: Partial<CtaFormStateProps>) => void;
  deleteCta: () => void;
  setCtaEnabled: (enabled: boolean) => void;
  setCtaText: (text: string) => void;
  setCtaUrl: (url: string) => void;
  setCtaIsAuto: (isAuto: boolean) => void;
  setCtaMods: (mods: Partial<CtaMod>) => void;
};

function areObjectsEqualByProps<T>(
  obj1: T,
  obj2: T,
  props: (keyof T)[]
): boolean {
  return props.every(prop => obj1[prop] === obj2[prop]);
}

export const useCtaForm = create<CtaFormStateProps & CtaFormStateFunctions>(
  set => ({
    ctaApprovedAt: null,
    ctaEnabled: false,
    ctaIsAuto: false,
    ctaMods: null,
    ctaText: null,
    ctaUrl: null,
    isEditingCta: false,
    // eslint-disable-next-line sort-keys
    deleteCta: () =>
      set({
        ctaIsAuto: false,
        ctaMods: null,
        ctaText: null,
        ctaUrl: null,
      }),
    initializeCtaForm: (cta = {}) => {
      if (!cta || typeof cta !== 'object') {
        return;
      }
      set(state => {
        if (
          areObjectsEqualByProps(cta, state, [
            'ctaEnabled',
            'ctaText',
            'ctaUrl',
            'ctaMods',
            'ctaIsAuto',
            'ctaApprovedAt',
          ])
        ) {
          return state;
        }

        return {
          ...cta,
          isEditingCta: true,
        } as CtaFormStateProps;
      });
    },
    setCta: cta => {
      if (!cta || typeof cta !== 'object') {
        return;
      }

      set(state => {
        if (
          !areObjectsEqualByProps(cta, state, [
            'ctaEnabled',
            'ctaText',
            'ctaUrl',
            'ctaMods',
            'ctaIsAuto',
            'ctaApprovedAt',
          ])
        ) {
          return cta as CtaFormStateProps;
        }
        return state;
      });
    },
    setCtaEnabled: enabled => set({ ctaEnabled: enabled }),
    setCtaIsAuto: isAuto => set({ ctaIsAuto: isAuto }),
    setCtaMods: mods => set({ ctaMods: mods as CtaMod }),
    setCtaText: text => set({ ctaText: text }),
    setCtaUrl: url => set({ ctaUrl: url }),
    setIsEditingCta: isEditing => set({ isEditingCta: isEditing }),
  })
);

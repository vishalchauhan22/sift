export type ConnectCalendarButtonVariant =
  | 'branded-neutral'
  | 'branded-primary'
  | 'primary'
  | 'neutral';

type Variant = 'neutral' | 'danger' | 'primary';

export const getButtonVariant = (
  variant: ConnectCalendarButtonVariant,
  googleCalendarConnected: boolean
): Variant => {
  if (variant === 'branded-neutral') {
    return 'neutral';
  }

  if (variant === 'branded-primary') {
    return 'primary';
  }

  if (variant === 'neutral') {
    if (googleCalendarConnected) {
      return 'danger';
    }

    return 'neutral';
  }

  if (variant === 'primary') {
    if (googleCalendarConnected) {
      return 'neutral';
    }

    return 'primary';
  }

  return 'neutral';
};

export const isBrandedVariant = (
  variant: ConnectCalendarButtonVariant
): boolean => {
  return variant.indexOf('branded') >= 0;
};

import { Addon } from '@js/globalTypes.generated';

import { incrementMetric } from '../metrics';

export const navigateToCheckout = (): void => {
  const url = new URL('/upgrade-plan', window.location.origin);
  url.searchParams.append('type', 'annually');
  url.searchParams.append('addon', Addon.Ai);
  incrementMetric('upgrade_cta.deeplink.shown');
  window.location.href = url.toString();
};

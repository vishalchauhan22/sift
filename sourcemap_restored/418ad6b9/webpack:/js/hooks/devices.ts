import { useEffect } from 'react';

import * as extension from '@js/utilities/extension';

import { useDevice } from '../common/useDevice';

export function useExtensionInstalled(): boolean {
  const {
    checkedExtensionInstalled,
    extensionInstalled,
    updateExtensionInstalled,
  } = useDevice();

  useEffect(() => {
    if (checkedExtensionInstalled || extensionInstalled) {
      return;
    }

    extension.isInstalled(installed => {
      updateExtensionInstalled(installed);
    });
  }, [checkedExtensionInstalled, extensionInstalled, updateExtensionInstalled]);

  return extensionInstalled;
}

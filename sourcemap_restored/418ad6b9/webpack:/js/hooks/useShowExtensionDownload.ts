import { SHOW_EXTENSION_DOWNLOAD } from '@loomhq/shared-utilities/constants/featureFlag';
import { useFlagIsActivated } from '@js/hooks/featureFlag';

export function useShowExtensionDownload(): boolean | null {
  return useFlagIsActivated({
    flag: SHOW_EXTENSION_DOWNLOAD,
    activationValues: [true],
  });
}

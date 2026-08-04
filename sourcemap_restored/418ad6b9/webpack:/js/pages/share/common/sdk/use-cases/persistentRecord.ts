/**
 * Provides singleton to import for the persistent record use case.
 */
import { RecordSDKInitializer } from '../recordSDKInitializer';

// Persistent record redirects to Loom share page and tests FTUX.
const config = {
  disableDesktopOnFirefox: true,
  disablePreviewModal: true,
  enableOnboardingTutorial: true,
  productName: 'loom',
  entryPointName: 'persistent_record',
};
let sdkInstance;

export function getSdkInstance(): RecordSDKInitializer {
  if (!sdkInstance) {
    sdkInstance = new RecordSDKInitializer(config);
  }

  return sdkInstance;
}

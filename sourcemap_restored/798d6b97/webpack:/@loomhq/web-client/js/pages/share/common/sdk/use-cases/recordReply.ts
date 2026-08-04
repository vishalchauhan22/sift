/**
 * Provides singleton to import for the record a reply use case.
 */
import { RecordSDKInitializer } from '../recordSDKInitializer';

// Record a reply uses default recordSDK settings.
const config = {
  disableDesktopOnFirefox: true,
  enablePictureInPicture: true,
  productName: 'loom',
  entryPointName: 'record_a_reply',
};
let sdkInstance;

export function getSdkInstance(): RecordSDKInitializer {
  if (!sdkInstance) {
    sdkInstance = new RecordSDKInitializer(config);
  }

  return sdkInstance;
}

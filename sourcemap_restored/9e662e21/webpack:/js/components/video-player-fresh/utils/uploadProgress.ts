import { isIOS, isSafari } from '@js/utilities/device';

export const shouldWaitForTranscodeComplete = (
  mediaMetadataRotation: number | null | undefined
): boolean => {
  return Boolean(
    mediaMetadataRotation !== null &&
      mediaMetadataRotation !== undefined &&
      (isIOS || isSafari)
  );
};

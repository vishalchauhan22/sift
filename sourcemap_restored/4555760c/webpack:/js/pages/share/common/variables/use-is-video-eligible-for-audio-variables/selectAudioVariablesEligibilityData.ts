import { GetAudioVariablesEligibilityForVariablesEntryPointQuery } from './GetAudioVariablesEligibilityForVariablesEntryPoint.generated';

export const selectAudioVariablesEligibilityData = (
  data: GetAudioVariablesEligibilityForVariablesEntryPointQuery | undefined,
  videoCompletedLoading: boolean,
  transcriptInProgress: boolean,
  transcriptAvailable: boolean
): {
  hasAccess: boolean;
  reason: string | null;
} => {
  let hasAccess = false;
  let reason: string | null = 'Feature unavailable on this video';

  if (!videoCompletedLoading || transcriptInProgress) {
    return { hasAccess, reason: null };
  } else if (!transcriptAvailable) {
    return { hasAccess, reason };
  }

  if (
    data?.determineAudioPersonalizationEligibility?.__typename ===
    'DetermineAudioPersonalizationEligibilityPayload'
  ) {
    hasAccess = Boolean(
      data.determineAudioPersonalizationEligibility.isEligible
    );
    reason = data.determineAudioPersonalizationEligibility.reason;
  }

  return { hasAccess, reason };
};

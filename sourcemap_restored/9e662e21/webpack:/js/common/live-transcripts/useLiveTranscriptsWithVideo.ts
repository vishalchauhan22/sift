import { useFeatureFlagValue } from '@js/hooks/featureFlag';

import {
  ControlType,
  FEATURE_GATES,
} from '@loomhq/shared-utilities/constants/statsig';
import { useMemo } from 'react';
import { useVideoContext } from '../video-player';
import { useLiveTranscripts } from './useLiveTranscripts';
import { UseLiveTranscriptsReturnType } from './types';

// Specific web-implementation of useLiveTranscripts that provides video context to get videoId and feature flag
export const useLiveTranscriptsWithVideo = (): UseLiveTranscriptsReturnType => {
  const { video } = useVideoContext();
  const videoId = video?.id;
  const flagValue = useFeatureFlagValue<boolean>(
    FEATURE_GATES.LIVE_TRANSCRIPTS,
    ControlType.STATSIG_FEATURE_GATE
  );
  const isLiveTranscriptEnabled = flagValue === true;
  const hookResult = useLiveTranscripts(videoId);
  const result = useMemo(() => {
    if (!isLiveTranscriptEnabled || !videoId) {
      return {
        transcript: null,
        hasError: false,
        status: null,
        isLiveTranscriptRunning: false,
      };
    }
    return hookResult;
  }, [isLiveTranscriptEnabled, videoId, hookResult]);

  return result;
};

import { useVideoPasswordContext } from '@js/common/video-password';

import { useMemo } from 'react';

import { ClipDimensions } from '../types';
import {
  ConsolidatedEditGetClipDimensionsQuery,
  useConsolidatedEditGetClipDimensionsQuery,
} from './ConsolidatedEditGetClipDimensions.generated';

const selectClipsDimensions = (
  videoData: ConsolidatedEditGetClipDimensionsQuery | undefined
): ClipDimensions[] => {
  if (videoData?.getVideo?.__typename !== 'RegularUserVideo') {
    return [];
  }

  const clipsDimensions: ClipDimensions[] = [];
  let cursorTimeMs = 0;

  for (const clip of videoData.getVideo.clips) {
    const clipStartTimeMs = cursorTimeMs;
    const clipDurationMs = clip.video_properties.durationMs ?? 0;
    const clipEndTimeMs = cursorTimeMs + clipDurationMs;

    const clipDimensions: ClipDimensions = {
      clipId: clip.id,
      width: clip.video_properties.width ?? 0,
      height: clip.video_properties.height ?? 0,
      clipStartTimeMs,
      clipEndTimeMs,
      clipDurationMs,
    };
    clipsDimensions.push(clipDimensions);
    cursorTimeMs += clipDurationMs;
  }

  return clipsDimensions;
};

export const useClipsDimensions = ({
  videoId,
}: {
  videoId: string;
}): ClipDimensions[] => {
  const { password } = useVideoPasswordContext();

  const { data: videoData } = useConsolidatedEditGetClipDimensionsQuery({
    variables: {
      videoId,
      password,
    },
  });

  const clipsDimensions = useMemo(
    () => selectClipsDimensions(videoData),
    [videoData]
  );

  return clipsDimensions;
};

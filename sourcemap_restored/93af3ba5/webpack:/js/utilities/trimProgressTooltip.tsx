import React, { useEffect, useState, useRef } from 'react';
import { Tooltip } from '@loomhq/lens';
import { VideoTrimProgressUpdatedSubscription } from './VideoTrimProgressUpdated.generated';
const DOWNLOAD_DISABLED_TOOLTIP = 'Video is being processed. Please wait...';
const DOWNLOAD_DISABLED_TEXT = 'Processing';

export const TrimProgressUpdatedTooltip = ({
  onComplete,
  trimProgressData,
}: {
  videoId: string;
  onComplete: () => void;
  trimProgressData: VideoTrimProgressUpdatedSubscription | undefined;
}): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const canDisplayProgress = progress < 100;
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (trimProgressData?.videoTrimProgressUpdated?.progress) {
      // Prevent 99.X from being rounded to 100%, it might seem like a bug to users
      // |progress| should never exceed 100%
      const newProgress = Math.floor(
        Number(trimProgressData.videoTrimProgressUpdated.progress)
      );
      setProgress(newProgress);
    }
  }, [trimProgressData]);

  useEffect(() => {
    if (progress === 100) {
      onCompleteRef.current();
    }
  }, [progress]);

  return (
    <Tooltip
      content={DOWNLOAD_DISABLED_TOOLTIP}
      placement="leftCenter"
      triggerOffset={38}
      maxWidth={32}
    >
      <span>{DOWNLOAD_DISABLED_TEXT}</span>
      {canDisplayProgress && (
        <span style={{ fontFeatureSettings: 'tnum' }}>{` (${progress}%)`}</span>
      )}
    </Tooltip>
  );
};

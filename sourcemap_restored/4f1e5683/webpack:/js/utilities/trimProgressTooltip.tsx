import React, { useEffect, useState, useRef } from 'react';
import { Tooltip } from '@loomhq/lens';
import { useGetVideoTrimProgressQuery } from './GetVideoTrimProgress.generated';
import { useVideoTrimProgressUpdatedSubscription } from './VideoTrimProgressUpdated.generated';
const DOWNLOAD_DISABLED_TOOLTIP = 'Video is being processed. Please wait...';
const DOWNLOAD_DISABLED_TEXT = 'Processing';

export const TrimProgressUpdatedTooltip = ({
  videoId,
  onComplete,
}: {
  videoId: string;
  onComplete: () => void;
}): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const canDisplayProgress = progress < 100;
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const { data } = useGetVideoTrimProgressQuery({
    variables: {
      videoId,
    },
  });

  // Subscribe to updates on any existing widgets (apollo will automatically
  // merge them into the 'data' from above, as long as the subscription payload
  // contains Widget nodes with an 'id' field that matches one from the query)
  useVideoTrimProgressUpdatedSubscription({ variables: { videoId } });

  useEffect(() => {
    if (data?.getVideoTrimProgress?.progress != null) {
      // Prevent 99.X from being rounded to 100%, it might seem like a bug to users
      // |progress| should never exceed 100%
      const newProgress = Math.floor(
        Number(data.getVideoTrimProgress.progress)
      );
      setProgress(newProgress);
    }
  }, [data]);

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

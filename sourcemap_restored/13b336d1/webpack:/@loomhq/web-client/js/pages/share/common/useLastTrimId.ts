import { useVideoContext } from '@js/common/video-player';
import { useState, useEffect } from 'react';

export const useLastTrimId = (): {
  lastTrimId: number | string;
  forceSave: boolean;
} => {
  const {
    video: { processingInformation },
  } = useVideoContext();
  const { trimId: lastTrimId } = processingInformation ?? {};

  const [trimId, setTrimId] = useState<number | string>(lastTrimId ?? '');
  const [forceSave, setForceSave] = useState<boolean>(false);

  // Keep trimId in sync with lastTrimId
  useEffect(() => {
    if (lastTrimId && lastTrimId > (trimId as number)) {
      setTrimId(lastTrimId);
    }
  }, [lastTrimId, trimId]);

  // If lastTrimId is missing, use fallback
  useEffect(() => {
    if (!lastTrimId && !trimId) {
      setForceSave(true);
      setTrimId(new Date().getTime());
    }
  }, [lastTrimId, trimId]);

  return { lastTrimId: trimId, forceSave };
};

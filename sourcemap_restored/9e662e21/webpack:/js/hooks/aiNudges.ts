import { useVideoContext } from '@js/common/video-player';

export function useIsEligibleForAiNudgeDisplay(): boolean {
  const { video } = useVideoContext();

  const { isOwner, commentsEnabled } = video;

  return Boolean(video && !isOwner && commentsEnabled);
}

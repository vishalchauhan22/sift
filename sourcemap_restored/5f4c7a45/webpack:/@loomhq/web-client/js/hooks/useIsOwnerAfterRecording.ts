import { useCurrentUserIsOwner } from './useCurrentUserIsOwner';
import { useFromRecorder } from '@js/common/useFromRecorder';

export const useIsOwnerAfterRecording = ({
  videoId,
}: {
  videoId: string | null;
}): boolean => {
  const currentUserIsOwner = useCurrentUserIsOwner({ videoId });
  const { fromRecorder } = useFromRecorder();
  return currentUserIsOwner && fromRecorder;
};

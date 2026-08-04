import { useEffect } from 'react';

import { WorkspaceSetting } from '@loomhq/shared-utilities/constants/settings';
import { useIsMeetingRecording } from '@js/common/meeting-recordings';
import { useVideoContext } from '@js/common/video-player';
import { useMatchLargeTabletOrDesktop } from '@js/hooks/useMatchMedia';
import { useWorkspaceSetting } from '@js/hooks/workspaceSettings';

import { TAB_LIST } from './constants';
import { TabTypes } from './types';
import { useCurrentUserCanEdit } from './useCurrentUserCanEdit';
import { useFromRecorder } from '@js/common/useFromRecorder';

export const useSetInitialTab = ({
  onTab,
  setOnTab,
}: {
  onTab: TabTypes | null;
  setOnTab: (newTab: TabTypes) => void;
}): void => {
  const {
    video: {
      id: videoId,
      commentsEnabled,
      views,
      description: videoDescription,
    },
  } = useVideoContext();
  const isMeetingRecording = useIsMeetingRecording(videoId);
  const {
    loading: workspaceAllowsAiAccessLoading,
    value: workspaceAllowsAiAccess,
  } = useWorkspaceSetting(WorkspaceSetting.ALLOWS_AI);
  const { fromRecorder: fromRecorderParam } = useFromRecorder();
  const currentUserCanEdit = useCurrentUserCanEdit();
  const onLargeTabletOrDesktop = useMatchLargeTabletOrDesktop();

  const hasViews = (views?.distinct ?? 0) > 0;

  const shouldShowRecapTab =
    isMeetingRecording && (workspaceAllowsAiAccess || videoDescription);
  const shouldShowEditTab: boolean =
    currentUserCanEdit &&
    onLargeTabletOrDesktop &&
    (fromRecorderParam || !hasViews);

  useEffect(() => {
    if (onTab || workspaceAllowsAiAccessLoading) {
      return;
    }

    if (shouldShowRecapTab) {
      setOnTab(TAB_LIST.Recap);
    } else if (shouldShowEditTab) {
      setOnTab(TAB_LIST.Edit);
    } else if (!commentsEnabled) {
      setOnTab(TAB_LIST.Transcript);
    } else {
      setOnTab(TAB_LIST.Activity);
    }
  }, [
    shouldShowRecapTab,
    shouldShowEditTab,
    commentsEnabled,
    onTab,
    setOnTab,
    workspaceAllowsAiAccessLoading,
  ]);
};

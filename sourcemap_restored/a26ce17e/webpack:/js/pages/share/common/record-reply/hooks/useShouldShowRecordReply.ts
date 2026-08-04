import { useVideoPasswordContext } from '@js/common/video-password';
import { useVideoContext } from '@js/common/video-player';
import { useSDKSupport } from '@js/contexts/SDKContext';
import { useGetSelectedWorkspace } from '@js/hooks/workspace';
import { isMobile } from '@js/utilities/device';

import { ORG_ROLE_VIEWER } from '@loomhq/shared-utilities/constants/organizationRoles';
import { WORKSPACE_PLAN_EDUCATION } from '@loomhq/shared-utilities/constants/workspacePlans';

export const useShouldShowRecordReply = (): boolean => {
  const {
    video: { recordReplyEnabled, videoWorkspacePlan },
  } = useVideoContext();
  const workspace = useGetSelectedWorkspace();
  const { isSDKSupported } = useSDKSupport();

  const { needsPassword, password } = useVideoPasswordContext();

  // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
  const isEDUVideo = videoWorkspacePlan === WORKSPACE_PLAN_EDUCATION;

  const isViewer = workspace?.memberRole === ORG_ROLE_VIEWER;

  // we need to delay loading the record-reply button till the user enters the correct password
  // https://www.loom.com/share/6df7da0e33e4480eb1651c06c5492c96
  const hasUserEnteredCorrectPassword = password !== '';
  const doesUserHaveAccessToPasswordProtectedVideo = needsPassword
    ? hasUserEnteredCorrectPassword
    : true;

  const recordReplyAllowed =
    !isViewer &&
    recordReplyEnabled &&
    isSDKSupported &&
    !isEDUVideo &&
    !isMobile &&
    doesUserHaveAccessToPasswordProtectedVideo;

  return Boolean(recordReplyAllowed);
};

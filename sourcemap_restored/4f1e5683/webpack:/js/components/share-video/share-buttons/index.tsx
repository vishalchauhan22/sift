import { SHARE_BUTTON_CLICKED } from '@js/constants/events';

import { SHARE_UI_MODAL } from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import { ShareModalSource } from '@js/common/share-video/share-modal/enums';
import { usePlayer, useVideoContext } from '@js/common/video-player';
import { useMatchLargeTabletOrDesktop } from '@js/hooks/useMatchMedia';
import { useGetSelectedWorkspace } from '@js/hooks/workspace';
import React from 'react';

import * as analytics from '@js/utilities/analytics';

import { Button, Tooltip } from '@loomhq/lens';
import { SvgUsersAdd } from '@loomhq/lens/icons/users-add';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../utilities/analytics/attribute-transformer';

type ShareModalButtonProps = {
  userIsMemberOfVideoWorkspace: boolean;
  onClick: () => void;
};

const ShareModalButton = ({
  userIsMemberOfVideoWorkspace,
  onClick,
}: ShareModalButtonProps): JSX.Element => {
  const onLargeTabletOrDesktop = useMatchLargeTabletOrDesktop();

  return (
    <div className="relative">
      <Button
        data-testid="share-modal-button"
        variant={userIsMemberOfVideoWorkspace ? 'primary' : 'neutral'}
        icon={<SvgUsersAdd />}
        onClick={onClick}
        size={onLargeTabletOrDesktop ? 'medium' : 'small'}
      >
        Share
      </Button>
    </div>
  );
};

type ShareButtonProps = {
  isLoggedIn: boolean;
  videoId: string;
  source: string;
};

export const ShareButton = ({
  isLoggedIn,
  videoId,
  source,
}: ShareButtonProps): JSX.Element | null => {
  const { openModal } = useModals();
  const {
    setVideo,
    video: { organizationId },
  } = useVideoContext();
  const player = usePlayer(videoId);

  const onShareModalClick = () => {
    player?.pause();
    openModal({
      modalType: SHARE_UI_MODAL,
      options: { source: ShareModalSource.ShareButton, videoId, setVideo },
    });
    analytics.track(SHARE_BUTTON_CLICKED, {
      ...withIdentifiers(
        SHARE_BUTTON_CLICKED,
        AnalyticsEntityId.video(videoId, 'video_id')
      ),
      source,
    });
  };
  const selectedWorkspace = useGetSelectedWorkspace();

  let userIsMemberOfVideoWorkspace: boolean | null = null;

  if (selectedWorkspace?.id) {
    userIsMemberOfVideoWorkspace = selectedWorkspace.id === organizationId;
  } else if (!isLoggedIn) {
    userIsMemberOfVideoWorkspace = false;
  }

  if (userIsMemberOfVideoWorkspace === null) {
    return null;
  }

  return (
    <Tooltip content="Share video" placement="bottomCenter">
      <ShareModalButton
        userIsMemberOfVideoWorkspace={userIsMemberOfVideoWorkspace}
        onClick={onShareModalClick}
      />
    </Tooltip>
  );
};

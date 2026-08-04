import { ErrorSeverities } from '@js/constants/error-severities';

import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import { useVideoPasswordContext } from '@js/common/video-password';
import {
  RightPanelContentButton,
  RightPanelIconButton,
} from '@js/components/share-video-fresh/right-panel/right-panel-button';
import { useToggleFollowingVideoMutation } from '@js/pages/share/common/ToggleFollowingVideo.generated';
import React, { useState } from 'react';
import { useLayer } from 'react-laag';
import * as analytics from '@js/utilities/analytics';
import { getAnonUserId } from '@js/utilities/auth-anon';
import { getAppSource } from '@js/utilities/device';
import * as loggerx from '@js/utilities/loggerx';

import { Text, Container, Popover, Spacer } from '@loomhq/lens';
import { SvgBell } from '@loomhq/lens/icons/bell';
import { SvgBellOff } from '@loomhq/lens/icons/bell-off';

import {
  FOLLOWED_A_LOOM,
  UNFOLLOWED_A_LOOM,
} from '@loomhq/shared-utilities/constants/events';

import { FollowCopy } from './constants';
import { FollowLoomToast } from './toast';

type FollowLoomButtonProps = {
  videoId: string;
  withNewCommentEntryPoint?: boolean;
  isFollowingVideo: boolean | undefined;
  popoverPlacement: 'bottomLeft' | 'bottomRight';
  isCompact?: boolean;
};

export const FollowLoomButton = ({
  videoId,
  withNewCommentEntryPoint = false,
  isFollowingVideo,
  popoverPlacement,
  isCompact = false,
}: FollowLoomButtonProps): React.ReactElement => {
  const { showErrorBar } = useErrorBar();
  const { password } = useVideoPasswordContext();

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);

  const analyticsProps = {
    anonymous_user_id: getAnonUserId(),
    video_id: videoId,
    device: getAppSource(),
    follow_mode: 'manual',
  };

  const [toggleFollowingVideoMutation] = useToggleFollowingVideoMutation({
    onCompleted: () => {
      if (isFollowingVideo) {
        setIsToastOpen(true);
      }
    },
    onError: err => {
      loggerx.warning(err, { message: 'Error toggle video follow' });

      showErrorBar({
        message: `Oops! Error ${
          isFollowingVideo ? 'following' : 'unfollowing'
        } video.`,
        severity: ErrorSeverities.ERROR,
      });
    },
  });

  const onClick = () => {
    if (isFollowingVideo) {
      analytics.track(UNFOLLOWED_A_LOOM, analyticsProps);
    } else {
      analytics.track(FOLLOWED_A_LOOM, analyticsProps);
    }

    if (isFollowingVideo !== undefined) {
      toggleFollowingVideoMutation({
        variables: {
          videoId,
          follow: !isFollowingVideo,
          password,
        },
      });
    }
  };

  // TLDR: due to a z-index issue related to the header, we need to render this toast in a layer.
  // More details: the header has a z-index of 101, and due to other components breaking
  // it is not simple to give this toast's ancestors a z-index greater than that.
  // Instead of creating complex logic for fixing the z-index, it is better to just render this as a layer.
  const { layerProps, triggerProps, renderLayer } = useLayer({
    isOpen: isToastOpen,
  });

  const followStatus = isFollowingVideo ? 'follow' : 'unfollow';

  const buttonMap = {
    follow: <SvgBellOff />,
    unfollow: <SvgBell />,
  };

  const notificationCopy = FollowCopy.Notifications[followStatus];
  const replyNotificationsCopy = FollowCopy.NewReply[followStatus];
  const buttonCopy = FollowCopy.Button[followStatus];
  const icon = buttonMap[followStatus];

  return (
    <Container>
      <Container
        onMouseEnter={() => setIsTooltipOpen(true)}
        onMouseLeave={() => setIsTooltipOpen(false)}
        position="relative"
        zIndex={2}
      >
        <Popover
          isOpen={isTooltipOpen}
          placement={popoverPlacement}
          content={
            <Container
              contentColor="body"
              backgroundColor="overlay"
              borderSide="all"
              radius="medium"
              shadow="medium"
              padding="medium"
              width={42}
            >
              <Text fontWeight="bold">{replyNotificationsCopy}</Text>
              <Spacer top={2} />
              <Text fontWeight="book" color="bodyDimmed">
                {notificationCopy}
              </Text>
            </Container>
          }
        >
          {isCompact ? (
            <RightPanelIconButton
              onClick={onClick}
              buttonIcon={icon}
              altText={buttonCopy}
              isCompact={isCompact}
            />
          ) : (
            <RightPanelContentButton
              onClick={onClick}
              buttonIcon={icon}
              buttonText={buttonCopy}
              isNewStyle={withNewCommentEntryPoint}
            />
          )}
        </Popover>
      </Container>
      <div {...triggerProps}>
        {renderLayer(
          <div {...layerProps} style={{ zIndex: '1100' }}>
            <FollowLoomToast
              isOpen={isToastOpen}
              onClick={onClick}
              onCloseClick={() => setIsToastOpen(false)}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

/* eslint-disable @loomhq/loom/limit-parent-import-depth */

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import { getParam } from '@js/utilities/url';

import { LoomURL } from '@loomhq/enums';
import {
  Arrange,
  Text,
  Container,
  Spacer,
  Tooltip,
  Avatar,
} from '@loomhq/lens';

import { SIMPLIFY_PLAYER_PARAM } from '@loomhq/shared-utilities/constants/urlParams';

import {
  useCommentsCount,
  useHideOwner,
  useHideTitle,
  useShowLoomWatermark,
  useVideoContext,
  VideoModel,
} from '../../context';
import {
  usePlayerHasStarted,
  usePlayingStatus,
  useContainerBoundary,
  usePlayerFromContext,
} from '../../hooks';
import {
  videoMouseIsActiveClassName,
  colors,
  defaultTransition,
} from '../../variables';
import { useViewportContext } from '../../viewportContext';
import { LoomLink } from '../loom-link';
import { Show } from '../show';
import { LoomWatermark } from '../watermark';
import {
  ActionsCta,
  ActionsEmbed,
  ActionsFeed,
  titleCardHeight,
} from './actions';

import { VideoData } from './video-data';

const TitleCardEmbedSection = styled.div`
  border-radius: var(--lns-radius-medium);
  background: ${colors.videoOverlay};
  height: ${titleCardHeight};
  padding: 0 var(--lns-space-small);
  display: grid;
  place-items: center;
  width: fit-content;
`;

function OwnerAvatar({
  owner,
  size = 4,
}: {
  owner: VideoModel['owner'];
  size?: number;
}) {
  return (
    <Avatar
      size={size}
      imageSrc={owner.avatar.thumbFullUrl}
      letter={owner.name[0]}
    />
  );
}

export function TitleCardEmbed(): JSX.Element {
  const { video } = useVideoContext();
  const { title, owner } = video;
  const hideOwner = useHideOwner();
  const hideTitle = useHideTitle();
  // WAP-451 - owner comes back as undefined in some cases
  // adding a fallback to prevent type error
  const ownerName = owner ? owner.name : '';
  const heading = hideTitle ? ownerName : title;
  const tooltipContent = hideTitle ? '' : ownerName;
  const { ref, boundaryRef } = useContainerBoundary();
  const container = boundaryRef.current as HTMLElement;

  return (
    <TitleCardEmbedSection ref={ref}>
      <Arrange gap="small">
        {!hideOwner && (
          <Tooltip
            content={tooltipContent}
            placement="bottomLeft"
            container={container}
          >
            <OwnerAvatar owner={owner} size={3} />
          </Tooltip>
        )}

        <LoomLink title={title}>
          <Text color="body" size="body-lg" fontWeight="bold" hasEllipsis>
            {heading}
          </Text>
        </LoomLink>
      </Arrange>
    </TitleCardEmbedSection>
  );
}

export const VideoInfoWrapper = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { width } = useViewportContext();

  const getPadding = () => {
    switch (true) {
      case width < 600:
        return 'small';
      default:
        return 'medium';
    }
  };

  return (
    <Container padding={getPadding()} {...props}>
      {children}
    </Container>
  );
};

export const HideableVideoInfoEmbedWrapper = styled.div<{
  isHideable?: boolean;
}>`
  ${props =>
    props.isHideable &&
    `
      transition: ${defaultTransition}ms;
      opacity: 0;
      &:hover, .${videoMouseIsActiveClassName} & {
        opacity: 1;
      }
  `}
`;

export const VideoInfoEmbed = ({
  ...props
}: {
  [x: string]: any;
}): JSX.Element => {
  const { video } = useVideoContext();
  const { showAnalytics, isOwner } = video;
  const hasStarted = usePlayerHasStarted(video.id);
  const { status } = usePlayingStatus(video.id);
  const player = usePlayerFromContext();
  const numComments = useCommentsCount();
  const hideOwner = useHideOwner();
  const hideTitle = useHideTitle();
  const showLoomWatermark = useShowLoomWatermark();
  const isEnded = status === 'ended';
  const hideOwnerAndTitle = hideOwner && hideTitle;

  const isPlaying = hasStarted && status === 'playing';
  const isPaused = hasStarted && status === 'paused';
  const hasEnded = status === 'ended';
  const isInPlay = isPlaying || isPaused;

  const hasTitle = !hideOwnerAndTitle && (!hasStarted || isEnded);

  // hide analytics if it's off in video settings and as a viewer
  const hideAnalytics = !showAnalytics && !isOwner;
  const hasVideoData = !hasStarted || isEnded;

  const onClickWatermark = () => {
    if (player) {
      player.pause();
    }

    window.open(`${LoomURL.Production}?utm_source=embed&utm_medium=watermark`);
  };

  const simplifyPlayerParam = getParam(SIMPLIFY_PLAYER_PARAM) === 'true';

  return (
    <VideoInfoWrapper {...props}>
      <Arrange gap="small" alignItems="center" justifyContent="stretch">
        {isInPlay ? (
          <div>
            {showLoomWatermark && (
              <LoomWatermark animated onClick={onClickWatermark} />
            )}
          </div>
        ) : null}
        {!simplifyPlayerParam ? (
          <HideableVideoInfoEmbedWrapper isHideable={isPlaying}>
            <Arrange
              gap="small"
              justifyContent="space-between"
              alignItems="start"
            >
              <div>
                {hasTitle ? (
                  <Show afterWidth={300}>
                    <TitleCardEmbed />
                    <Spacer top="xsmall" />
                  </Show>
                ) : null}
                {hasVideoData ? (
                  <Show afterWidth={300}>
                    <Show afterHeight={hasEnded ? 500 : 200}>
                      <VideoData
                        views={video.views?.total}
                        duration={video.videoProperties?.playableDuration ?? 0}
                        comments={numComments}
                        hideAnalytics={hideAnalytics}
                      />
                    </Show>
                  </Show>
                ) : null}
              </div>
              <ActionsEmbed />
            </Arrange>
          </HideableVideoInfoEmbedWrapper>
        ) : null}
      </Arrange>
    </VideoInfoWrapper>
  );
};

export const VideoInfoFeed = ({
  ...props
}: {
  [x: string]: any;
}): JSX.Element => (
  <VideoInfoWrapper {...props}>
    <Arrange justifyContent="end">
      <ActionsFeed />
    </Arrange>
  </VideoInfoWrapper>
);

export const VideoInfoShare = ({
  ...props
}: {
  [x: string]: any;
}): JSX.Element => {
  const { width } = useViewportContext();
  const ctaSize = width < 600 ? 'medium' : 'large';

  return (
    <VideoInfoWrapper {...props}>
      <Arrange gap="small" justifyContent="end">
        <ActionsCta size={ctaSize} />
      </Arrange>
    </VideoInfoWrapper>
  );
};

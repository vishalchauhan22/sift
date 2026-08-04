/* eslint-disable @loomhq/loom/limit-parent-import-depth */

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import { Arrange, Icon, Text } from '@loomhq/lens';
import { SvgClock } from '@loomhq/lens/icons/clock';
import { SvgEye } from '@loomhq/lens/icons/eye';

import { secondsToHumanReadableString, viewCount } from '../../utils';
import { colors, videoMouseIsActiveClassName } from '../../variables';

const VideoDataWrapper = styled.div`
  display: grid;
  gap: var(--lns-space-small);
  grid-auto-flow: column;
  border-radius: var(--lns-radius-medium);
  background: ${colors.videoOverlay};
  width: fit-content;
  padding: var(--lns-space-xsmall) var(--lns-space-small);
`;

const VideoDataItemWrapper = styled.div<{
  hideOnHover?: boolean;
}>`
  padding: 0 var(--lns-space-xsmall);
  text-shadow: 0.5px 0.5px 1px black;
  ${props =>
    props.hideOnHover &&
    `
  display: none;
  &:hover, .${videoMouseIsActiveClassName} & {
    display: grid;
  }
`}
`;

const VideoDataItem = ({
  icon,
  title,
  hideOnHover = false,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  hideOnHover?: boolean;
}) => {
  return (
    <VideoDataItemWrapper hideOnHover={hideOnHover}>
      <Arrange gap="xsmall">
        <Icon icon={icon} />
        <Text color="body" fontWeight="bold">
          {title}
        </Text>
      </Arrange>
    </VideoDataItemWrapper>
  );
};

export const VideoData = ({
  views = 0,
  duration = 0,
  hideAnalytics = false,
}: {
  views?: number;
  duration?: number;
  comments?: number;
  hideAnalytics?: boolean;
}): JSX.Element => {
  const Wrapper = VideoDataWrapper;

  return (
    <Wrapper>
      <VideoDataItem
        icon={<SvgClock />}
        title={secondsToHumanReadableString(duration)}
      />
      {!hideAnalytics && (
        <VideoDataItem icon={<SvgEye />} title={viewCount(views)} />
      )}
    </Wrapper>
  );
};

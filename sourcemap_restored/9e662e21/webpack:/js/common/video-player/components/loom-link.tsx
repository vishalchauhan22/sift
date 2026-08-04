// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import {
  useVideoContext,
  useVideoPlatform,
  useWhiteLabelPlayer,
  VideoPlatform,
} from '../context';
import { usePlayerFromContext } from '../hooks';

const Wrapper = styled.a`
  text-decoration: none;
  min-width: 0;
`;

type LoomLinkParams = {
  t?: string;
  source?: string;
};

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
const constructURL = (url: string, params: LoomLinkParams) => {
  const urlParams = new URLSearchParams(params);
  const queryString = urlParams.toString();

  if (!queryString) {
    return url;
  }

  return `${url}?${queryString}`;
};

export const LoomLink = ({
  title,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
  children,
  ...props
}: {
  title: string;
  onClick?: () => void;
  children: React.ReactNode;
}): JSX.Element => {
  const { video, userContext } = useVideoContext();
  const player = usePlayerFromContext();
  const url = `/share/${video.modelId}`;
  const whiteLabelPlayer = useWhiteLabelPlayer();
  const videoPlatform = useVideoPlatform();

  const getShareLink = () => {
    const params: LoomLinkParams = {};

    if (videoPlatform === VideoPlatform.embedPlayer) {
      params.source = 'embed_watch_on_loom_cta';
    } else if (videoPlatform === VideoPlatform.slackPlayer) {
      params.source = 'slack_watch_on_loom_cta';
    }

    if (!player) {
      return constructURL(url, params);
    }

    const { currentTime, duration } = player;

    if (currentTime !== duration && currentTime !== 0) {
      params.t = `${Math.floor(player.currentTime)}`;
    }

    return constructURL(url, params);
  };

  const path = getShareLink();
  const fullUrl = `${userContext.baseUrl || 'https://loom.com'}${path}`;

  return (
    <Wrapper
      title={title}
      href={!whiteLabelPlayer ? fullUrl : undefined}
      target="_blank"
      rel="noopener"
      onClick={onClick}
      {...props}
    >
      {children}
    </Wrapper>
  );
};

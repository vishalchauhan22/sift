// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import { useVideoContext } from '@js/common/video-player';
import { useFetchVideoData } from '@js/components/video-player-fresh/hooks';
import { VideoFromGraphQl } from '@js/components/video-player-fresh/utils';
import React, { useState } from 'react';

import { getCloudfrontURI } from '@js/utilities/avatar';

import {
  Text,
  Container,
  Arrange,
  Align,
  Icon,
  Link,
  IconButton,
} from '@loomhq/lens';
import { SvgClose } from '@loomhq/lens/icons/close';
import { SvgExternalLink } from '@loomhq/lens/icons/external-link';
import { SvgPlay } from '@loomhq/lens/icons/play';

import { timeUtils } from '@loomhq/shared-utilities';

import { getShareVideoUrl } from '@js/utilities/video';

const { secondsToHumanReadableString } = timeUtils;

const PlayIconCircleWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayIconCircle = ({ iconColor }) => {
  return (
    <Container
      backgroundColor="background"
      radius="full"
      width="calc(4*var(--lns-unit))"
      height="calc(4*var(--lns-unit))"
    >
      {/* optically center */}
      <Align alignment="center" style={{ paddingLeft: '5%' }}>
        <Icon icon={<SvgPlay />} color={iconColor}></Icon>
      </Align>
    </Container>
  );
};

const DisplayedUrl = ({
  url,
  hovering,
}: {
  url: string;
  hovering: boolean;
}) => {
  const endLength = 4;
  const startLength = url.length - endLength;
  const color = hovering ? 'primary' : 'bodyDimmed';

  return (
    <Arrange columns={['1fr', 'auto']} gap="small">
      <Arrange>
        <Text color={color} hasEllipsis ellipsisLines={1}>
          {url.substring(0, startLength)}
        </Text>
        <Text color={color} noWrap>
          {url.substring(url.length - endLength)}
        </Text>
      </Arrange>
      <Icon icon={<SvgExternalLink />} color={color} size={2} />
    </Arrange>
  );
};

export const LoomLinkUnfurledInComments = ({
  videoId,
}: {
  videoId: string;
}): JSX.Element => {
  const { id } = useVideoContext().video;
  const videoIdIsTheSameOnSharePage = id === videoId;

  const { loading, error, data } = useFetchVideoData(
    videoId,
    videoIdIsTheSameOnSharePage
  );

  const [hovering, setHovering] = useState(false);

  // TODO [FSP-922]
  // This is a band-aid fix to prevent infinite looping when users
  // paste a link to the same loom in a comment
  if (videoIdIsTheSameOnSharePage) {
    const url = getShareVideoUrl(id);

    return <Link href={url}>{url}</Link>;
  }

  if (loading || error || !data?.video) {
    return <></>;
  }

  const video = data?.video as VideoFromGraphQl;

  if (!video) {
    return <></>;
  }

  try {
    const thumbSrc = getCloudfrontURI(video.signedDefaultThumbnails.static);
    const title = video.name;
    const url = getShareVideoUrl(video.id);
    const readableDuration = secondsToHumanReadableString(
      video.playable_duration || 0
    );

    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Container
          borderSide="all"
          radius="large"
          padding="small"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          backgroundColor={hovering ? 'backgroundHover' : 'background'}
          style={{ cursor: 'pointer' }}
        >
          <Arrange columns={['auto', '1fr']} gap="small">
            <Container
              radius="medium"
              width={12}
              height={8}
              overflow="hidden"
              backgroundColor="body"
              position="relative"
            >
              {/* TODO(next author): Please add an explicit height and width for performance/accessibility. */}
              <img
                alt="video thumbnail"
                src={thumbSrc}
                style={{ opacity: 0.7, position: 'absolute' }}
              />

              <PlayIconCircleWrapper>
                <PlayIconCircle
                  iconColor={hovering ? 'primary' : 'bodyDimmed'}
                />
              </PlayIconCircleWrapper>
            </Container>
            <Arrange autoFlow="row" gap="2px" justifyContent="stretch">
              <Text fontWeight="bold" hasEllipsis ellipsisLines={2}>
                {title}
              </Text>
              <Arrange columns={['auto', 'auto', '1fr']} gap="small">
                <Text color="bodyDimmed" noWrap>
                  {readableDuration}
                </Text>
                <Text size="body-sm" color="bodyDimmed">
                  •
                </Text>
                <DisplayedUrl url={url} hovering={hovering} />
              </Arrange>
            </Arrange>
          </Arrange>
        </Container>
      </a>
    );
  } catch {
    return <>{getShareVideoUrl(video.id)}</>;
  }
};

export const InviteLoomLinkUnfurledInComments = ({
  videoId,
  onCloseClick,
}: {
  videoId: string;
  onCloseClick?: (e) => void;
  source?: 'reply' | 'invite_modal';
}): JSX.Element => {
  const { loading, error, data } = useFetchVideoData(videoId);

  const [hovering, setHovering] = useState(false);

  if (loading || error || !data?.video) {
    return <></>;
  }

  const video = data?.video as VideoFromGraphQl;

  if (!video) {
    return <></>;
  }

  try {
    const thumbSrc = getCloudfrontURI(video.signedDefaultThumbnails.static);
    const title = video.name;
    const url = getShareVideoUrl(video.id);
    const readableDuration = secondsToHumanReadableString(
      video.playable_duration || 0
    );

    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Container
          borderSide="all"
          radius="large"
          padding="small"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          backgroundColor={hovering ? 'backgroundHover' : 'background'}
          style={{ cursor: 'pointer' }}
          className={onCloseClick && 'relative'}
        >
          {onCloseClick && (
            <Container
              className="flex justify:flexEnd absolute"
              top={0}
              right={0}
              padding={1}
            >
              <IconButton
                onClick={onCloseClick}
                icon={<SvgClose />}
                size="small"
                altText="Close"
                color="grey3"
              />
            </Container>
          )}
          <Arrange columns={['auto', '1fr']} gap="small">
            <Container
              radius="medium"
              width={12}
              height={8}
              overflow="hidden"
              backgroundColor="body"
              position="relative"
            >
              {/* TODO(next author): Please add an explicit height and width for performance/accessibility. */}
              <img
                alt="video thumbnail"
                src={thumbSrc}
                style={{ opacity: 0.7, position: 'absolute' }}
              />

              <PlayIconCircleWrapper>
                <PlayIconCircle
                  iconColor={hovering ? 'primary' : 'bodyDimmed'}
                />
              </PlayIconCircleWrapper>
            </Container>
            <Arrange autoFlow="row" gap="2px" justifyContent="stretch">
              <Text fontWeight="bold" hasEllipsis ellipsisLines={2}>
                {title}
              </Text>
              <Arrange columns={['auto', 'auto', '1fr']} gap="small">
                <Text color="bodyDimmed" noWrap>
                  {readableDuration}
                </Text>
                <Text size="body-sm" color="bodyDimmed">
                  •
                </Text>
                <DisplayedUrl url={url} hovering={hovering} />
              </Arrange>
            </Arrange>
          </Arrange>
        </Container>
      </a>
    );
  } catch {
    return <>{getShareVideoUrl(video.id)}</>;
  }
};

import { isDev } from '@js/constants/environment';
import { COMMUNITY_LOOMS_URI, LOOM_PROD_URI } from '@js/constants/routes';

import { MobileEmptyStateVideoCard } from '@js/common/mobile-empty-state-video-card';
import { useExpUpdatedMobileOnboarding } from '@js/hooks/experiments/useExpUpdatedMobileOnboarding';
import React from 'react';

import { getCloudfrontURI, getUserAvatarThumb } from '@js/utilities/avatar';

import { Arrange, Container, Link, Spacer, Text } from '@loomhq/lens';

import { useMatchMobileOnly } from '@js/hooks/useMatchMedia';

import {
  EmptyStateVideos,
  LOOM_AVATAR,
  MobileVideoCardInfo,
} from '../constants';
import styles from './styles.module.less';
import { useExpMobileWebOnboardingV2 } from '@js/hooks/experiments/useExpMobileWebOnboardingVersion2';

const selectVideos = (videoIds: string[]): MobileVideoCardInfo[] => {
  return videoIds?.reduce((result, videoId) => {
    const videoInfo = EmptyStateVideos[videoId];

    if (videoInfo) {
      result.push(videoInfo);
    }

    return result;
  }, [] as MobileVideoCardInfo[]);
};

const getThumbnail = (thumbnail): string | undefined => {
  if (isDev) {
    return `https://cdn.loom.com/${thumbnail}`;
  }

  return getCloudfrontURI(thumbnail);
};

const getAvatarThumbnail = (): string | undefined => {
  if (isDev) {
    return `https://cdn.loom.com/${LOOM_AVATAR}`;
  }

  return getUserAvatarThumb([LOOM_AVATAR]);
};

const EmptyStateCarousel = ({
  title,
  videoIds,
}: {
  title: string | JSX.Element;
  videoIds: string[];
}): JSX.Element | null => {
  const { isExpUpdatedMobileOnboarding } = useExpUpdatedMobileOnboarding();
  const { isExpMobileWebOnboardingV2 } = useExpMobileWebOnboardingV2();
  const isMobile = useMatchMobileOnly();
  const showUpdatedMobileLibrary =
    isMobile && (isExpUpdatedMobileOnboarding || isExpMobileWebOnboardingV2);
  const videos = selectVideos(videoIds);
  const hasVideos = videos?.length > 0;

  const isExpMobileOnboardingAndHasVideos =
    (isExpUpdatedMobileOnboarding || isExpMobileWebOnboardingV2) && hasVideos;

  return (
    <>
      {showUpdatedMobileLibrary ? (
        <Container paddingLeft={showUpdatedMobileLibrary ? 0 : 1.5}>
          <Arrange gap="xsmall">
            <Text htmlTag="h2" size="body-lg" fontWeight="bold">
              Inspiration from the{' '}
              <Link href={COMMUNITY_LOOMS_URI}>Loom Community</Link>
            </Text>
          </Arrange>
        </Container>
      ) : (
        <Container paddingLeft={1.5}>
          <Text htmlTag="h2" size="body-lg" fontWeight="bold">
            {title}
          </Text>
        </Container>
      )}
      <Spacer top="xsmall" />
      <Arrange columns={isMobile ? '1fr' : '1fr 1fr'}>
        {isExpMobileOnboardingAndHasVideos
          ? videos.map(video => (
              <Container key={video.id} paddingY="small">
                <MobileEmptyStateVideoCard
                  title={video.title}
                  videoUrl={`${LOOM_PROD_URI}/share/${video.id}`}
                  thumbnailUrl={getThumbnail(video.thumbnail)}
                  duration={video.length}
                  ownerAvatarUrl={getAvatarThumbnail()}
                  ownerName="Loom Team"
                />
              </Container>
            ))
          : videoIds?.map(videoId => (
              <Container key={videoId} padding={1.5}>
                <div className={styles.calloutLoom}>
                  <iframe
                    allowFullScreen
                    className="absolute height:full overflow:hidden radius:large width:full"
                    frameBorder="0"
                    src={`${LOOM_PROD_URI}/embed/${videoId}`}
                    title="Loom"
                  />
                </div>
              </Container>
            ))}
      </Arrange>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default EmptyStateCarousel;

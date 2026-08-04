import { COMMUNITY_LOOMS_URI, LOOM_URI } from '@js/constants/routes';

import { MobileEmptyStateVideoCard } from '@js/common/mobile-empty-state-video-card';
import { ToolTip } from '@js/components/home/community-carousel-home';
import InlinePlayerVideoCard from '@js/components/inline-player-video-card';

import { VideoCardVideo } from '@js/components/video-card/types';
import { VideoFromGraphQl } from '@js/components/video-player-fresh/utils/model';
import { useExpUpdatedMobileOnboarding } from '@js/hooks/experiments/useExpUpdatedMobileOnboarding';
import React, { useState, useRef, useCallback, useMemo } from 'react';

import { getCloudfrontURI, getUserAvatarThumb } from '@js/utilities/avatar';

import { Arrange, Container, Link, Spacer, Text } from '@loomhq/lens';
import { INITIAL_BATCH_SIZE } from '@loomhq/shared-utilities/constants/communityLoomsEmptyStates';
import useInfiniteScroll from '@js/hooks/useInfiniteScroll';

import { useMatchMobileOnly } from '@js/hooks/useMatchMedia';

import { useFetchVideosByIdLazyQuery } from './fetchVideosById.generated';
import { useExpMobileWebOnboardingV2 } from '@js/hooks/experiments/useExpMobileWebOnboardingVersion2';

type Video = VideoCardVideo & VideoFromGraphQl;

const CommunityCarousel = ({
  videoIds,
  starterVideos,
}: {
  videoIds: string[];
  starterVideos: Video[];
}): JSX.Element | null => {
  const [cursor, setCursor] = useState(INITIAL_BATCH_SIZE);
  const [fetchedAllItems, setFetchedAllItems] = useState(false);
  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const [displayableVideos, setDisplayableVideos] =
    useState<Video[]>(starterVideos);

  const { isExpUpdatedMobileOnboarding } = useExpUpdatedMobileOnboarding();
  const { isExpMobileWebOnboardingV2 } = useExpMobileWebOnboardingV2();

  const [fetchVideos, { data, loading }] = useFetchVideosByIdLazyQuery({
    fetchPolicy: 'no-cache',
  });

  const newVideos = useMemo(() => {
    if (data?.fetchVideosById?.__typename === 'FetchVideosByIdPayload') {
      data?.fetchVideosById?.videos?.map(video => video) || [];
    }

    return [];
  }, [data]);

  useMemo(() => {
    setDisplayableVideos([...displayableVideos, ...newVideos]);
    setFetchedAllItems(displayableVideos.length === videoIds.length);
    // TODO(next author): Please update this hook to fix dependency issue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newVideos, setDisplayableVideos, setFetchedAllItems]);

  const fetchMoreLooms = useCallback(() => {
    if (!loading) {
      fetchVideos({
        variables: {
          videoIds: videoIds.slice(cursor, cursor + INITIAL_BATCH_SIZE),
        },
      });
      setCursor(cursor + INITIAL_BATCH_SIZE);
    }
    // TODO(next author): Please update this hook to fix dependency issue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchVideos, setCursor, loading]);

  useInfiniteScroll(fetchMoreRef, fetchMoreLooms);
  const isMobile = useMatchMobileOnly();

  const showUpdatedMobileLibrary =
    isMobile && (isExpUpdatedMobileOnboarding || isExpMobileWebOnboardingV2);

  return (
    <>
      <Container paddingLeft={showUpdatedMobileLibrary ? 0 : 1.5}>
        <Arrange gap="xsmall">
          <Text htmlTag="h2" size="body-lg" fontWeight="bold">
            Inspiration from the{' '}
            <Link href={COMMUNITY_LOOMS_URI}>Loom Community</Link>
          </Text>
          {showUpdatedMobileLibrary ? null : <ToolTip />}
        </Arrange>
      </Container>
      <Spacer top="xsmall" />
      <Arrange columns={showUpdatedMobileLibrary ? '1fr' : '1fr 1fr'}>
        {displayableVideos.map(video =>
          showUpdatedMobileLibrary && video ? (
            <Container key={video.id} paddingY="small">
              <MobileEmptyStateVideoCard
                title={video.name}
                videoUrl={`${LOOM_URI}/share/${video.id}`}
                thumbnailUrl={getCloudfrontURI(
                  video.signedDefaultThumbnails.default
                )}
                duration={video.playable_duration}
                ownerAvatarUrl={getUserAvatarThumb(video.owner.avatars)}
                ownerName={video.owner.display_name}
              />
            </Container>
          ) : video ? (
            <Container key={video.id} padding={1.5}>
              <InlinePlayerVideoCard video={video} showProfileOnHover={true} />
            </Container>
          ) : null
        )}

        {!fetchedAllItems && <div ref={fetchMoreRef}></div>}
      </Arrange>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default CommunityCarousel;

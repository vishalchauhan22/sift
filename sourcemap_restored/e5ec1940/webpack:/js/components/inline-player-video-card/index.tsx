import { CardVariant } from '@js/constants/destinationLogging';

import { VIDEO_CARD_CLICKED } from '@js/constants/events';

import { LOOM_URI } from '@js/constants/routes';

import { HOME_CONTEXT } from '@js/constants/videoCard';

import { TagLink } from '@js/components/tag-link';
import UserAvatar from '@js/components/user-avatar';
import { UserComponentWithProfileHover } from '@js/components/user-profile/user-component-with-profile-hover';

import { VideoVisibility } from '@js/components/video-card/VideoVisibility';
import { VideoCardVideo } from '@js/components/video-card/types';
import { FeedVideo } from '@js/components/video-player-fresh';
import { VideoFromGraphQl } from '@js/components/video-player-fresh/utils/model';

import { SectionTitleContext } from '@js/contexts/SectionTitleContext';
import { formatDistanceToNowStrict } from 'date-fns';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { getUserAvatarThumb } from '@js/utilities/avatar';

import { Arrange, Container, Icon, Spacer, Text } from '@loomhq/lens';
import { SvgComment } from '@loomhq/lens/icons/comment';
import { SvgEye } from '@loomhq/lens/icons/eye';
import { SvgSmile } from '@loomhq/lens/icons/smile';

import { track } from '@js/utilities/analytics';

import styles from './styles.module.css';

const SHOW_ENGAGEMENTS_CARD_WIDTH = 440;

const InlinePlayerVideoCard = ({
  video,
  showProfileOnHover,
  htmlTag = 'h2',
}: {
  video: VideoCardVideo & VideoFromGraphQl;
  showProfileOnHover: boolean;
  htmlTag?: 'h2' | 'h3' | 'h4' | 'div';
}): JSX.Element => {
  const videoUrl = `${LOOM_URI}/share/${video.id}`;
  const sectionTitle = useContext(SectionTitleContext);
  const engagementsRef = useRef<HTMLDivElement>(null);

  const [showEngagements, setShowEngagements] = useState(true);

  const videoCreatedAt = new Date(video?.createdAt);
  const dateCreated =
    videoCreatedAt.toString() === 'Invalid Date'
      ? ''
      : formatDistanceToNowStrict(videoCreatedAt);

  useEffect(() => {
    const handleResize = () => {
      const offsetWidth = engagementsRef?.current?.offsetWidth;

      if (!offsetWidth) {
        return;
      }

      if (offsetWidth >= SHOW_ENGAGEMENTS_CARD_WIDTH) {
        setShowEngagements(true);
      } else {
        setShowEngagements(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
  }, [engagementsRef, video]);

  const avatarThumb = getUserAvatarThumb(video.owner?.avatars);

  const Tag = htmlTag;

  return (
    <div className={styles.inlinePlayerVideoCard}>
      <div className={styles.videoCardThumbnailWrapper}>
        <FeedVideo videoModel={video} />
      </div>
      <div className="relative" ref={engagementsRef}>
        <a
          className="absolute height:full width:full"
          href={videoUrl}
          onClick={() => {
            if (!sectionTitle) {
              return;
            }

            track(VIDEO_CARD_CLICKED, {
              video_id: video.id,
              card_variant: CardVariant.INLINE_PLAYER,
              links_to: videoUrl,
            });
          }}
        >
          <Tag className="srOnly">{video.name}</Tag>
        </a>
        <Spacer top="medium" right="large" bottom="large" left="large">
          <Arrange gap={1.5} autoFlow="row" justifyContent="stretch">
            <Arrange gap="medium" justifyContent="space-between">
              <Arrange alignItems="center" gap="medium">
                {showProfileOnHover ? (
                  <UserComponentWithProfileHover
                    profileId={video.owner?.id}
                    avatarSize={5}
                    fallbackUserName={video.owner?.display_name}
                    fallbackUserAvatar={avatarThumb}
                  />
                ) : (
                  <UserAvatar
                    avatarSize={5}
                    avatarSrc={avatarThumb}
                    name={video.owner?.display_name}
                  />
                )}

                <Container minWidth={0}>
                  {showProfileOnHover ? (
                    <Container height="20px">
                      <Arrange>
                        <UserComponentWithProfileHover
                          profileId={video.owner?.id}
                          type="name"
                          fontSize="medium"
                          fallbackUserName={video.owner?.display_name}
                          fallbackUserAvatar={avatarThumb}
                        />

                        {dateCreated && (
                          <Text
                            className={styles.timeStampText}
                            htmlTag="p"
                            color="bodyDimmed"
                          >
                            {`・${dateCreated}`}
                          </Text>
                        )}
                      </Arrange>
                    </Container>
                  ) : (
                    <Container height="1.125rem">
                      <Arrange>
                        <Text size="body-md" fontWeight="bold" hasEllipsis>
                          {video.owner?.display_name}
                        </Text>

                        {dateCreated && (
                          <Text
                            className={styles.timeStampText}
                            htmlTag="p"
                            color="bodyDimmed"
                          >
                            {`・${dateCreated}`}
                          </Text>
                        )}
                      </Arrange>
                    </Container>
                  )}

                  {!video.archived && (
                    <span className={styles.videoVisibility}>
                      <VideoVisibility
                        video={video}
                        textSize="medium"
                        context={HOME_CONTEXT}
                      />
                    </span>
                  )}
                </Container>
              </Arrange>
              {showEngagements && (
                <Arrange gap="medium">
                  <Arrange gap="xsmall">
                    <Icon color="bodyDimmed" icon={<SvgEye />} />
                    <Text color="bodyDimmed">{video.views?.total || 0}</Text>
                  </Arrange>
                  <Arrange gap="xsmall">
                    <Icon color="bodyDimmed" icon={<SvgComment />} />
                    <Text color="bodyDimmed">{video.totalComments || 0}</Text>
                  </Arrange>
                  <Arrange gap="xsmall">
                    <Icon color="bodyDimmed" icon={<SvgSmile />} />
                    <Text color="bodyDimmed">{video.totalReactions || 0}</Text>
                  </Arrange>
                </Arrange>
              )}
            </Arrange>
            <Text size="body-lg" fontWeight="bold" hasEllipsis>
              {video.name}
            </Text>
            <ScrollContainer className={styles.videoCardTags}>
              <Arrange gap="xsmall">
                {video?.tags?.map(tag => (
                  <TagLink
                    key={tag}
                    tag={tag}
                    context="InlinePlayer"
                    textSize="medium"
                    className={styles.tagLink}
                    useReactLink
                  />
                ))}
                <Spacer bottom="small">
                  <Text>&nbsp;</Text>
                </Spacer>
              </Arrange>
            </ScrollContainer>
          </Arrange>
        </Spacer>
      </div>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default InlinePlayerVideoCard;

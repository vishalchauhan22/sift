// 🚩 Start: EXP_MWEB_COMMENTING
import UserAvatar from '@js/components/user-avatar';
import { AvatarContainerComment } from '@js/pages/share/comments/common/AvatarContainerComment';
import { AVATAR_SIZE } from '@js/pages/share/comments/common/constants';
import { CommentStateProvider } from '@js/pages/share/comments/common/createStore';
import { PostBodyFreshEmbed } from '@js/pages/share/comments/common/grouped-comments/comment-thread/comment-post/PostBodyFreshEmbed';
import { TimestampSection } from '@js/pages/share/comments/common/grouped-comments/comment-thread/comment-post/TimestampSection';
import { useCommentsFullSize } from '@js/pages/share/comments/common/hooks';
import { useMobileCommentInput } from '@js/pages/share/comments/common/hooks/useMobileCommentInput';
import { CommentFromServer } from '@js/pages/share/common/comments/commentFromServer';
import React from 'react';
import { getAvatarThumbForUser } from '@js/utilities/avatar';

import { Arrange, Split, SplitSection, Text, Spacer } from '@loomhq/lens';

import styles from './style.module.css';

export const CommentPostSkeleton = (): React.ReactElement | null => {
  const { comment } = useMobileCommentInput();
  const fullSize = useCommentsFullSize();
  const avatarSrc = getAvatarThumbForUser([comment?.avatar]);

  if (!comment) {
    return null;
  }

  return (
    <div className={styles.skeletonContainer}>
      <Arrange
        gap={fullSize ? 'medium' : 'xsmall'}
        columns={['auto', '1fr']}
        alignItems="start"
      >
        <AvatarContainerComment singleComment>
          <Spacer right={0.5}>
            <UserAvatar
              avatarSrc={avatarSrc}
              name={comment.user_name}
              avatarSize={AVATAR_SIZE.FULL}
            />
          </Spacer>
        </AvatarContainerComment>

        <div className="comment-container">
          <Split justifyContent="space-between">
            <SplitSection>
              <Arrange gap="xsmall">
                <Text fontWeight="bold">
                  {(comment as CommentFromServer).user_name ?? 'Anonymous'}
                </Text>

                <CommentStateProvider>
                  <TimestampSection
                    time={(comment as CommentFromServer).time_stamp}
                    fontSize={'small'}
                    inActivitySidebar
                  />
                </CommentStateProvider>
              </Arrange>
            </SplitSection>
          </Split>
          <div>
            <PostBodyFreshEmbed comment={comment} />
          </div>
        </div>
      </Arrange>
    </div>
  );
};
// 🚩 End: EXP_MWEB_COMMENTING

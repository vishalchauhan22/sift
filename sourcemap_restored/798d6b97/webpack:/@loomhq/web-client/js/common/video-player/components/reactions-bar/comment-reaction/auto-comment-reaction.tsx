/* eslint-disable @loomhq/loom/limit-parent-import-depth */

import { SemanticParser } from '@js/common/comments';
import {
  CREATOR_AUTO_COMMENT_ID,
  VISITOR_AUTO_COMMENT_ID,
} from '@js/pages/share/common/constants';
import React from 'react';

import { Arrange, Avatar, Container, Icon, Text } from '@loomhq/lens';
import { SvgEye } from '@loomhq/lens/icons/eye';

import { CommentContentWrapper } from './comment-summary';

import { CommentPost } from '@js/common/video-player';

export const isAutoComment = (commentId: string): boolean => {
  return [CREATOR_AUTO_COMMENT_ID, VISITOR_AUTO_COMMENT_ID].includes(commentId);
};

export const AutoCommentReaction = ({
  topComment,
}: {
  topComment: CommentPost;
}): JSX.Element => {
  return (
    <Container minWidth={0} width="100%">
      <Arrange gap="small" alignContent="space-between">
        <Avatar size={4} imageSrc={topComment.avatar} />
        {topComment.name}
      </Arrange>
      <Arrange gap="xsmall" alignContent="space-between">
        <Icon color="bodyDimmed" size="1rem" icon={<SvgEye />} />
        <Text size="body-sm" color="bodyDimmed">
          Only you can see this
        </Text>
      </Arrange>
      <Text
        style={{
          marginTop: '4px',
          whiteSpace: 'normal',
        }}
        color="body"
        size="body-sm"
        hasEllipsis
        ellipsisLines={2}
      >
        <CommentContentWrapper>
          <SemanticParser comment={topComment} />
        </CommentContentWrapper>
      </Text>
    </Container>
  );
};

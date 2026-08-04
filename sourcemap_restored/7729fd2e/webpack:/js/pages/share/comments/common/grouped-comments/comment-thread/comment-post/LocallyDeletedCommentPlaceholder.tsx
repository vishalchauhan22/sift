import { COMMENTS_BREAKPOINT } from '@js/constants/breakpoints';

import {
  useFetchComments,
  useRestoreComment,
} from '@js/pages/share/comments/common/hooks';
import { CommentOrReply } from '@js/pages/share/common/comments/commentOrReply';
import { isReply } from '@js/pages/share/common/comments/isReply';
import React from 'react';

import {
  Container,
  Text,
  Split,
  SplitSection,
  TextButton,
  useMedia,
} from '@loomhq/lens';

export const LocallyDeletedCommentPlaceholder = ({
  comment,
  trackRestoreComment,
  addCommentOrReplyDeleted,
}: {
  comment: CommentOrReply;
  trackRestoreComment: () => void;
  addCommentOrReplyDeleted?: (id) => void;
}): JSX.Element | null => {
  const [dismissed, setDismissed] = React.useState(false);

  const textContent = isReply(comment)
    ? `Deleted a comment from ${comment.user_name ?? 'someone'}.`
    : 'Deleted a comment thread.';

  const restoreComment = useRestoreComment(comment, trackRestoreComment);
  const { refetch } = useFetchComments();

  const dismissClick = () => {
    setDismissed(true);

    if (addCommentOrReplyDeleted) {
      addCommentOrReplyDeleted(comment.id);
    }

    refetch();
  };

  // TODO: VV: I'm going to make a hook that will return the comment size
  const componentSize = useMedia(
    [`(min-width: ${COMMENTS_BREAKPOINT}px)`],
    ['medium'],
    'small'
  );

  if (dismissed) {
    return null;
  }

  return (
    <Container paddingY="small">
      <Container
        paddingLeft="medium"
        paddingRight="medium"
        radius="medium"
        backgroundColor="backgroundSecondary"
        paddingY="small"
        maxWidth={72}
      >
        <Split justifyContent="space-between">
          <SplitSection minWidth="0px">
            <Container paddingRight={4}>
              <Text size={componentSize} hasEllipsis color="bodyDimmed">
                {textContent}
              </Text>
            </Container>
          </SplitSection>
          <SplitSection>
            <TextButton size={componentSize} onClick={restoreComment}>
              Undo
            </TextButton>
            <TextButton size={componentSize} onClick={dismissClick}>
              Dismiss
            </TextButton>
          </SplitSection>
        </Split>
      </Container>
    </Container>
  );
};

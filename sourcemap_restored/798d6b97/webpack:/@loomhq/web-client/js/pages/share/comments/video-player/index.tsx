import React from 'react';

import { Container } from '@loomhq/lens';
import {
  CommentPortalSlot,
  usePlayerFromContext,
} from '@js/common/video-player/';
import { CREATION_METHOD_COMMENT_OVERLAY } from '@js/constants/comments';
import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

const CommentInput = reactLazyRetry(() =>
  import(
    /* webpackChunkName: "CommentInput" */ '@js/pages/share/comments/common/comment-input'
  ).then(module => ({ default: module.CommentInput }))
);

export const CommentPortalForm = (): JSX.Element => {
  const player = usePlayerFromContext();

  const handleClose = () => {
    player?.commentFormToggle();
  };

  return (
    <CommentPortalSlot>
      <Container paddingY="small" width="100%" height="100%">
        <React.Suspense fallback={null}>
          <CommentInput
            inPlayer={true}
            closeReply={handleClose}
            creationMethod={CREATION_METHOD_COMMENT_OVERLAY}
          />
        </React.Suspense>
      </Container>
    </CommentPortalSlot>
  );
};

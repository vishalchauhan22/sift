import React from 'react';

import { CommentStateProvider as OverlayStateProvider } from '@js/pages/share/comments/common/createStore';
import { MayRenderCommentsOverlay } from '@js/pages/share/comments/video-player-overlay/comments-overlay/async';

import { CommentsOverlayProps } from '@js/pages/share/comments/video-player-overlay/common/types';

export const CommentsOverlayLazy = ({
  isSharePlayer,
}: CommentsOverlayProps): JSX.Element => (
  <React.Suspense fallback={null}>
    <OverlayStateProvider>
      <MayRenderCommentsOverlay isSharePlayer={isSharePlayer} />
    </OverlayStateProvider>
  </React.Suspense>
);

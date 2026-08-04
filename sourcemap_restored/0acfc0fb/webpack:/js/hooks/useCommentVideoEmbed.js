/* eslint-disable @loomhq/loom/no-js-extension */
import { useEffect } from 'react';

import { linkReplace } from '@loomhq/loom-embed';

import { INLINE_COMMENT_LOOM_VIDEO_SELECTOR } from '@js/constants/comments';

// replace Loom links with video embeds
// eslint-disable-next-line import/no-default-export
export default function useCommentVideoEmbed(ref) {
  useEffect(() => {
    ref.current &&
      linkReplace(INLINE_COMMENT_LOOM_VIDEO_SELECTOR, {}, ref.current);
  }, [ref]);
}

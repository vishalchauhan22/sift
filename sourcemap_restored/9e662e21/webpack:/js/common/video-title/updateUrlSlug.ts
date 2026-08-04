import { urlUtils } from '@loomhq/shared-utilities';

export const updateUrlSlug = (title: string | null, videoId: string): void => {
  const url = new URL(window.location.href);

  const parts = url.pathname.split('/');
  const lastPart = parts.pop();

  const expectedSlug = title ? urlUtils.getSlugForVideo(title) : null;

  const expectedPathWithSlug = expectedSlug
    ? `${expectedSlug}-${videoId}`
    : videoId;

  if (lastPart !== expectedPathWithSlug) {
    parts.push(expectedPathWithSlug);
    url.pathname = parts.join('/');

    history.replaceState(null, '', url.toString());
  }
};

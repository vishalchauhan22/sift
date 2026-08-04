import { VideoViews } from '@js/common/video-player';

export type Viewer = {
  user: {
    name?: string;
  };
};

export const selectViewersForViewerInsights = (
  views: VideoViews = { total: 0 }
): Viewer[] => {
  const namedViews = views?.named || [];
  const distinctViews = views?.distinct || 0;
  const viewers: Viewer[] = namedViews.map(namedView => ({
    user: {
      name: `${namedView.firstName} ${namedView.lastName}`,
      avatar: namedView?.avatar,
    },
  }));

  const anonymousViews = distinctViews - viewers.length;

  for (let i = 0; i < anonymousViews; i++) {
    viewers.push({ user: {} });
  }

  return viewers;
};

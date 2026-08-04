import { GetViewerInsightsQuery } from './GetViewersInsights.generated';

const MAX_AVATARS = 3;

type Viewer = {
  avatar?: string;
  firstName?: string;
};

// given the named viewers and the total number of distinct views, this function
// prepares the viewers so they can be shown as avatars. it limits the number to
// MAX_AVATARS, and adds avatars for anonymous viewers, if there is room within
// MAX_AVATARS for them. the function returns the array of viewers that will be
// rendered as avatars
function getFirstViewerAvatars(
  namedViewers: Viewer[] = [],
  total = 0
): Viewer[] {
  const remaining = Math.max(0, total - MAX_AVATARS);
  const namedCount = namedViewers.length;

  if (namedCount >= MAX_AVATARS) {
    return namedViewers.slice(0, MAX_AVATARS);
  }

  const anonymousCount = total - namedCount - remaining;

  if (anonymousCount <= 0) {
    return namedViewers;
  }

  const result = [...namedViewers];

  for (let i = 0; i < anonymousCount; i++) {
    result.push({});
  }

  return result;
}

type ViewerInfoForAvatar = {
  thumb?: string;
  name?: string;
};

export const selectViewersInsightsData = (
  data?: GetViewerInsightsQuery
): {
  totalViews: number;
  viewerInfoForAvatars: ViewerInfoForAvatar[];
  organizationId: string;
  currentUserIsOwner: boolean;
  showAnalyticsToViewer: boolean;
} => {
  let totalViews = 0;
  let viewerInfoForAvatars: ViewerInfoForAvatar[] = [];
  let organizationId;
  let currentUserIsOwner;
  let showAnalyticsToViewer;

  if (
    data?.getVideo?.__typename === 'RegularUserVideo' &&
    data.getVideo.views
  ) {
    totalViews = data.getVideo.views.total;
    const distinctViews = data.getVideo.views.distinct;

    organizationId = data.getVideo.organization_idv2;
    currentUserIsOwner = data.getVideo.current_user_is_owner;
    showAnalyticsToViewer = data.getVideo.show_analytics_to_viewer;

    if (data.getVideo.views.named) {
      const viewers = data.getVideo.views.named
        .filter(viewer => viewer !== null)
        .map(viewer => {
          return {
            avatar: viewer?.avatar ?? undefined,
            firstName: viewer?.firstName ?? undefined,
          };
        });

      viewerInfoForAvatars = getFirstViewerAvatars(viewers, distinctViews).map(
        (viewer: Viewer) => {
          return { thumb: viewer.avatar, name: viewer.firstName };
        }
      );
    }
  }

  return {
    totalViews,
    viewerInfoForAvatars,
    organizationId,
    currentUserIsOwner,
    showAnalyticsToViewer,
  };
};

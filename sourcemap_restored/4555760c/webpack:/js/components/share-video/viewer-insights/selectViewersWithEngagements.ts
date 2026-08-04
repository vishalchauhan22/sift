import { GetPaginatedInsightsForVideoQuery } from './GetPaginatedInsightsForVideo.generated';
import { Viewer } from './selectViewersForViewerInsights';

export type ViewerWithEngagements = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<
        GetPaginatedInsightsForVideoQuery['engagementInsightsSummaryForVideo']
      >['paginatedViewers']
    >['edges']
  >[number]
>['node'] & {
  commentCount: number;
  reactionCount: number;
};

export const selectViewersWithEngagements = (
  data?: GetPaginatedInsightsForVideoQuery
): {
  viewersWithEngagements: ViewerWithEngagements[];
  hasNextPage: boolean;
  endCursor: string | null;
} => {
  const rawViewers =
    (data?.engagementInsightsSummaryForVideo?.paginatedViewers?.edges
      ?.map(edge => edge?.node)
      .filter(
        viewer => viewer && viewer.__typename === 'EngagementInsightsAggregate'
      ) ?? []) as ViewerWithEngagements[]; // Cast here to remove the nullables that have been filtered out above

  const viewersWithEngagements = rawViewers.map(rawViewer => ({
    ...rawViewer,
    commentCount: (rawViewer.events || []).filter(
      evt => evt && (evt.type === 'comment' || evt.type === 'reply')
    ).length,
    reactionCount: (rawViewer.events || []).filter(
      evt => evt && evt.type === 'reaction'
    ).length,
  }));

  const endCursor =
    data?.engagementInsightsSummaryForVideo?.paginatedViewers?.pageInfo
      ?.endCursor ?? null;
  const hasNextPage =
    data?.engagementInsightsSummaryForVideo?.paginatedViewers?.pageInfo
      ?.hasNextPage ?? false;

  return { viewersWithEngagements, endCursor, hasNextPage };
};

export const isViewerWithEngagements = (
  viewer: ViewerWithEngagements | Viewer
): viewer is ViewerWithEngagements => {
  const casted = viewer as ViewerWithEngagements;

  return (
    casted.__typename === 'EngagementInsightsAggregate' &&
    'commentCount' in casted &&
    'reactionCount' in casted
  );
};

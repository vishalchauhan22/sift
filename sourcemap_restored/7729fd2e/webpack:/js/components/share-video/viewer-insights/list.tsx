import { EI_HOW_WE_CALCULATE } from '@js/constants/routes';

import classnames from 'classnames';

import { useGetCta } from '@js/common/cta-form';
import { LegacyErrorBoundary } from '@js/common/error-management';
import { useVideoContext } from '@js/common/video-player';
import Scopes from '@js/components/scopes';
import { usePrevious } from '@js/hooks/usePrevious';
import pluralize from 'pluralize';
import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useHasScope } from '@js/hooks/useHasScopes';

import { getGraphQlClientInsights } from '@js/utilities/graphql';
import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';
import { getParam, removeParam } from '@js/utilities/url';

import {
  Align,
  Arrange,
  Button,
  Container,
  Distribute,
  IconButton,
  Loader,
  Spacer,
  Text,
  Tooltip,
} from '@loomhq/lens';
import { SvgClose } from '@loomhq/lens/icons/close';
import { SvgInfo } from '@loomhq/lens/icons/info';
import { NOTIFICATION_URL_PARAMS } from '@loomhq/shared-utilities/constants/notifications';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import { ENGAGEMENT_INSIGHTS_ACCESS } from '@loomhq/shared-utilities/constants/scopes';
import { useViewerInsight } from '@js/common/viewer-insights';

import useInfiniteScroll from '@js/hooks/useInfiniteScroll';
import PlayerIllustrationSrc from '@assets/img/illustrations/player.png';

import { useGetInsightsStatsForVideoQuery } from './GetInsightsStatsForVideo.generated';
import { useGetPaginatedInsightsForVideoQuery } from './GetPaginatedInsightsForVideo.generated';
import { ViewersSkeleton } from './ViewersSkeleton';
import {
  trackBackToList,
  trackInfoIcon,
  trackPartialInfoAck,
  trackViewerDetails,
} from './analytics';
import { ViewerInfo } from './components';
import Details from './details';
import InsightsMilestone from './insightsMilestones';
import { getHidePartialInfoStored, hidePartialInfo } from './localStorage';
import {
  Viewer,
  selectViewersForViewerInsights,
} from './selectViewersForViewerInsights';
import {
  isViewerWithEngagements,
  selectViewersWithEngagements,
  ViewerWithEngagements,
} from './selectViewersWithEngagements';
import styles from './styles.module.less';

import '../../engagement-insights/styles.less';

const { reactor } = NOTIFICATION_URL_PARAMS;

const ENGAGEMENTS_VIEWER_PAGINATION_LIMIT = 50;

type ViewerInsightsListProps = {
  onExit?: (e: SyntheticEvent) => void;
  inActivitySidebar?: boolean;
};

export const toPercent = (num: number): string =>
  isNaN(num) ? 'n/a' : `${Math.round(num)}%`;

const ViewerInsightsListWithoutFeatureWrapper: React.FC<
  ViewerInsightsListProps
> = ({ onExit, inActivitySidebar }) => {
  const { featureLoadedRef } = useFeatureWrapper();
  const { selectedViewer: selected, setViewer } = useViewerInsight();
  const slideableContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const fetchMoreRef = useRef<HTMLDivElement>(null);

  const [showPartialInfo, setShowPartialInfo] = useState(
    !getHidePartialInfoStored()
  );

  const saveSelected = useCallback(
    (view: any) => {
      if (selected !== view) {
        setViewer(view);
        view && trackViewerDetails();
      }
    },
    [setViewer, selected]
  );

  const onPartialInfoAck = () => {
    setShowPartialInfo(false);
    hidePartialInfo();
    trackPartialInfoAck();
  };

  const slideableEl = slideableContainerRef?.current;
  const sectionEl = containerRef?.current;

  const onBack = useCallback(() => {
    if (!inActivitySidebar) {
      slideableEl?.classList.remove(styles.shrinked);

      setTimeout(() => {
        document.documentElement.scrollTo({ top: 0 });
        slideableEl?.scrollTo({ left: 0, behavior: 'smooth' });
        sectionEl?.scrollTo({ top: 0 });
      }, 50);

      trackBackToList();

      setTimeout(() => saveSelected(null), 350);
    } else {
      trackBackToList();
      saveSelected(null);
    }
  }, [saveSelected, sectionEl, slideableEl, inActivitySidebar]);

  const {
    video: { id: videoId, views },
  } = useVideoContext();
  const videoHasCta = useGetCta(videoId)?.ctaEnabled ?? false;
  const { total: totalViews = 0, distinct: totalViewerCount = 0 } = views ?? {};

  const hasEngagementInsights = useHasScope(ENGAGEMENT_INSIGHTS_ACCESS);

  const { data: insightsStatsData } = useGetInsightsStatsForVideoQuery({
    variables: { videoId },
    skip: !hasEngagementInsights || !totalViews,
    client: getGraphQlClientInsights(),
  });

  const completionPercentAvg =
    insightsStatsData?.engagementInsightsSummaryForVideo?.stats
      ?.completionPercentAvg ?? undefined;
  const ctaConversionPercent =
    insightsStatsData?.engagementInsightsSummaryForVideo?.stats
      ?.ctaConversionPercent ?? undefined;
  const trackedViewerCount =
    insightsStatsData?.engagementInsightsSummaryForVideo?.stats
      ?.trackedViewerCount ?? undefined;

  const {
    data: paginatedViewersData,
    loading: paginatedViewersLoading,
    fetchMore,
  } = useGetPaginatedInsightsForVideoQuery({
    variables: {
      first: ENGAGEMENTS_VIEWER_PAGINATION_LIMIT,
      videoId,
    },
    client: getGraphQlClientInsights(),
    skip: !hasEngagementInsights || !totalViews,
    notifyOnNetworkStatusChange: true,
  });

  const { viewersWithEngagements, hasNextPage, endCursor } =
    selectViewersWithEngagements(paginatedViewersData);

  const fetchMoreViewers = useCallback(() => {
    if (
      !paginatedViewersLoading &&
      fetchMore &&
      endCursor &&
      hasNextPage &&
      hasEngagementInsights
    ) {
      fetchMore({
        variables: {
          first: ENGAGEMENTS_VIEWER_PAGINATION_LIMIT,
          after: endCursor,
          videoId,
        },
      });
    }
  }, [
    fetchMore,
    paginatedViewersLoading,
    videoId,
    endCursor,
    hasNextPage,
    hasEngagementInsights,
  ]);

  useInfiniteScroll(fetchMoreRef, fetchMoreViewers);

  const insightsViewers = selectViewersForViewerInsights(views);
  const viewers = hasEngagementInsights
    ? viewersWithEngagements
    : insightsViewers;

  const previousSelected = usePrevious(selected);

  const hasPartialData = trackedViewerCount !== totalViewerCount;

  useEffect(() => {
    const reactorId = getParam(reactor);

    if (reactorId) {
      const viewer = (viewers as ViewerWithEngagements[]).find(
        u => isViewerWithEngagements(u) && String(u.user.id) == reactorId
      );

      if (viewer != null) {
        saveSelected(viewer);
        removeParam(window)(reactor);
      }
    }

    containerRef?.current?.scrollTo?.({ top: 0 });

    if (!selected && !reactorId) {
      onBack();
    }
  }, [onBack, saveSelected, selected, viewers]);

  return (
    <div ref={featureLoadedRef}>
      <section
        ref={containerRef}
        className={
          styles.containerBox + ' overflow:auto thin-scrollbars radius:medium'
        }
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {totalViews === 0 ? (
          <NoViewsPlaceholder />
        ) : (
          <LegacyErrorBoundary feature={Feature.EngagementInsights}>
            {!inActivitySidebar && (
              <Distribute alignment="center" isSpread className={styles.sticky}>
                <Text variant="title">Engagement Insights</Text>
                <IconButton
                  altText="Close"
                  icon={<SvgClose />}
                  onClick={onExit}
                />
              </Distribute>
            )}

            {/* Only show the upsell if there's partial data (or no tracking data)
                and the user lacks the engagement insights scope */}
            {hasPartialData && showPartialInfo && !hasEngagementInsights && (
              <div className="mb:medium">
                <PartialDataBox onClick={onPartialInfoAck} />
              </div>
            )}

            <div
              className={styles.slideableContainer}
              ref={slideableContainerRef}
            >
              <section className={styles.slideable}>
                <Spacer top="medium" />
                <InsightsMilestone />
                <Spacer top="small" />
                <ul
                  className={classnames(styles.viewsMetadata, {
                    [styles.partial]: !hasPartialData,
                  })}
                >
                  <>
                    <TotalViews total={totalViews} />
                    {/* Starter free workspaces only have access to number of views in terms of viewer insights */}

                    <Scopes name={ENGAGEMENT_INSIGHTS_ACCESS}>
                      <PercentCompleted
                        completionPercentAvg={completionPercentAvg}
                        trackedViewerCount={trackedViewerCount}
                        totalViewerCount={totalViewerCount}
                      />
                    </Scopes>

                    {videoHasCta && (
                      <Scopes name={ENGAGEMENT_INSIGHTS_ACCESS}>
                        <CtaConversion
                          ctaConversionPercent={ctaConversionPercent}
                        />
                      </Scopes>
                    )}
                  </>
                </ul>

                <Viewers
                  viewers={viewers}
                  totalViewerCount={totalViewerCount}
                  onViewerClick={saveSelected}
                  hasEngagementInsights={hasEngagementInsights}
                  hasNextPage={hasNextPage ?? false}
                  paginatedViewersLoading={paginatedViewersLoading}
                  fetchMoreRef={fetchMoreRef}
                />

                {!viewers.length && <Loader />}
              </section>
              {selected && (
                <Details
                  viewer={selected}
                  onBack={onBack}
                  // we skip animation if selection was made before we rendered
                  // if selected in the UI, previousSelected would be null, not undefined
                  skipAnimation={previousSelected === undefined}
                  inActivitySidebar={inActivitySidebar}
                />
              )}
            </div>
          </LegacyErrorBoundary>
        )}
      </section>
    </div>
  );
};

const NoViewsPlaceholder = () => {
  const {
    video: {
      owner: { displayName: videoOwnerName },
    },
  } = useVideoContext();

  return (
    <Container paddingY="20vh" style={{ textAlign: 'center' }}>
      <img
        alt="A Loom user is pointing a finger upwards to a video"
        width="140px"
        height="140px"
        src={PlayerIllustrationSrc}
        loading="lazy"
      />

      <Spacer bottom={3} />
      <Text fontWeight="bold" size="body-lg">
        No views... yet
      </Text>
      <Spacer top={1} bottom={2}>
        <Text fontWeight="book" color="bodyDimmed">
          {`Be the first to watch ${videoOwnerName}'s video`}
        </Text>
      </Spacer>
    </Container>
  );
};

const TotalViews = ({ total }: { total: number }) => (
  <li className="bgc:blurpleMedium">
    <Text fontWeight="bold" color="grey8">
      Total video views
    </Text>
    <Text size="heading-md" fontWeight="bold" color="grey8">
      {total}
    </Text>
  </li>
);

const PercentCompleted = ({
  completionPercentAvg,
  trackedViewerCount,
  totalViewerCount,
}: {
  completionPercentAvg: number | undefined;
  trackedViewerCount: number | undefined;
  totalViewerCount: number;
}) => (
  <li
    className={classnames('bgc:blueLight', {
      [styles.disabled]: !completionPercentAvg,
    })}
  >
    <Arrange gap="xsmall" autoFlow="row">
      <Text fontWeight="bold" color="grey8">
        Average Completion Rate
      </Text>
      <PartialDataLabel
        trackedViewerCount={trackedViewerCount}
        totalViewerCount={totalViewerCount}
        source="completion rate"
      />
    </Arrange>
    <BigNumber percent={completionPercentAvg} />
  </li>
);

const CtaConversion = ({
  ctaConversionPercent,
}: {
  ctaConversionPercent: number | undefined;
}) => (
  <li
    className={classnames('bgc:yellowLight', {
      [styles.disabled]: !ctaConversionPercent,
    })}
  >
    <Arrange gap="xsmall" autoFlow="row">
      <Text fontWeight="bold" color="grey8">
        Call-to-Action Conversion
      </Text>
    </Arrange>
    <BigNumber percent={ctaConversionPercent} />
  </li>
);

const InfoIcon = ({ href, source }: { href: string; source: string }) => {
  const onClick = () => trackInfoIcon({ source });

  return (
    <Tooltip
      content="Engagement for this video is only tracked since your upgrade to Business or Enterprise."
      placement="topCenter"
    >
      <a
        href={href}
        className={styles.infoIcon}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SvgInfo />
      </a>
    </Tooltip>
  );
};

const PartialDataLabel = ({
  trackedViewerCount,
  totalViewerCount,
  source,
}: {
  trackedViewerCount: number | undefined;
  totalViewerCount: number | undefined;
  source: string;
}) => {
  if (trackedViewerCount === totalViewerCount) {
    return null;
  }

  if (!trackedViewerCount || !totalViewerCount) {
    return null;
  }

  const higherCount =
    trackedViewerCount > totalViewerCount
      ? trackedViewerCount
      : totalViewerCount;
  const lowerCount =
    trackedViewerCount > totalViewerCount
      ? totalViewerCount
      : trackedViewerCount;

  return (
    <div className="flex items:center">
      <Text size="body-sm" color="grey8">
        Based on {lowerCount} of {higherCount} viewers
      </Text>
      <InfoIcon href={EI_HOW_WE_CALCULATE} source={source} />
    </div>
  );
};

const PartialDataBox = ({ onClick }: { onClick: () => void }) => (
  <Container
    backgroundColor="backgroundSecondary"
    radius="medium"
    padding="medium"
  >
    <Text fontWeight="bold" className="mb:medium">
      This video includes partially tracked data.
    </Text>
    <Spacer bottom="medium">
      <Text>
        Engagement is only tracked after upgrading to Business or Enterprise.
      </Text>
    </Spacer>
    <Align alignment="centerRight">
      <Button variant="primary" onClick={onClick}>
        Got it
      </Button>
    </Align>
  </Container>
);

const BigNumber = ({ percent }: { percent: number | undefined }) => (
  <Text size="heading-md" fontWeight="bold" color="grey8">
    {typeof percent === 'number' ? toPercent(percent) : '--'}
  </Text>
);

const Viewers = ({
  viewers,
  totalViewerCount,
  onViewerClick,
  hasEngagementInsights,
  hasNextPage,
  paginatedViewersLoading,
  fetchMoreRef,
}: {
  viewers: ViewerWithEngagements[] | Viewer[];
  totalViewerCount?: number;
  onViewerClick: (viewer: ViewerWithEngagements | Viewer) => void;
  hasEngagementInsights: boolean;
  hasNextPage: boolean;
  paginatedViewersLoading: boolean;
  fetchMoreRef: React.RefObject<HTMLDivElement>;
}) => (
  <div className={styles.viewers}>
    <Text fontWeight="bold" size="body-lg" className="mb:small">
      {`${totalViewerCount} ${pluralize('Viewers', totalViewerCount)}`}
    </Text>
    {viewers.map(viewer => (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable
      <div
        key={viewer.user.id}
        className={
          hasEngagementInsights ? classnames(styles.card) : 'overflow:hidden'
        }
        onClick={
          hasEngagementInsights ? () => onViewerClick(viewer) : undefined
        }
      >
        <ViewerInfo user={viewer.user} events={viewer.events} />
      </div>
    ))}

    {(hasNextPage || paginatedViewersLoading) && (
      <>
        <div ref={fetchMoreRef} />
        <ViewersSkeleton rowCount={3} />
      </>
    )}
  </div>
);

export const ViewerInsightsList: React.FC<ViewerInsightsListProps> = props => {
  return (
    <FeatureWrapper
      feature={Feature.EngagementInsights}
      errorType={ErrorBoundaryTypes.SILENT}
      additionalLoggingValues={{ version: 'views panel' }}
    >
      <ViewerInsightsListWithoutFeatureWrapper {...props} />
    </FeatureWrapper>
  );
};

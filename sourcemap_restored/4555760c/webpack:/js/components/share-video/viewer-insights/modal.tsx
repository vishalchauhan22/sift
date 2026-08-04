import { SEE_ENGAGEMENT_UPGRADE_BUTTON_CLICKED } from '@js/constants/events';

import cn from 'classnames';
import { useCtaForm } from '@js/common/cta-form';
import { useTheaterMode } from '@js/common/theater-mode';
import { useThumbnailFlow } from '@js/common/thumbnail-flow';
import { useVideoContext } from '@js/common/video-player';
import { useViewerInsight } from '@js/common/viewer-insights';
import UpgradeTooltip from '@js/components/upgrade-tooltip';
import { useOnBusinessTrial } from '@js/hooks/eligibility/useOnBusinessTrial';
import { useHasScope, useHasSomeScopes } from '@js/hooks/useHasScopes';
import _debounce from 'lodash/debounce';
import pluralize from 'pluralize';
import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { getGraphQlClientInsights } from '@js/utilities/graphql';
import { UpgradeComponentFeature } from '@js/utilities/upgrades';

import {
  Align,
  Arrange,
  Button,
  Icon,
  Loader,
  Spacer,
  Text,
  Container,
} from '@loomhq/lens';
import { SvgBarChart } from '@loomhq/lens/icons/bar-chart';
import { SvgComment } from '@loomhq/lens/icons/comment';
import { SvgSmile } from '@loomhq/lens/icons/smile';
import { SvgEditions } from '@loomhq/lens/icons/editions';
import {
  ENGAGEMENT_INSIGHTS_ACCESS,
  ENGAGEMENT_INSIGHTS_PAYWALL,
  ENGAGEMENT_INSIGHTS_PAYWALL_LITE,
} from '@loomhq/shared-utilities/constants/scopes';

import SrcEngagementInsightsNoViews from '@assets/img/engagement-insights-no-views.svg';

import { BusinessHighlightTooltip } from '../common/business-highlight-tooltip';
import { useGetPaginatedInsightsForVideoQuery } from './GetPaginatedInsightsForVideo.generated';
import { trackActivate } from './analytics';
import { ViewerAvatar } from './components';
import styles from './modal.module.less';
import {
  Viewer,
  selectViewersForViewerInsights,
} from './selectViewersForViewerInsights';
import {
  isViewerWithEngagements,
  selectViewersWithEngagements,
  ViewerWithEngagements,
} from './selectViewersWithEngagements';

export const EMPTY_TITLE =
  'Share your video with someone to see their engagement!';

const MAX_DISTINCT_VIEWERS = 50;

const ModalContainer = ({
  children,
  variant,
}: {
  children: JSX.Element | JSX.Element[];
  variant?: 'small' | undefined;
}) => {
  return (
    <div
      className={cn(styles.modal, {
        [styles.small]: variant === 'small',
      })}
    >
      {children}
    </div>
  );
};

const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

const InsightsNoView = () => (
  <ModalContainer variant="small">
    <article className="px:large py:medium my:large flex flexDirection:column items:center">
      <img
        src={SrcEngagementInsightsNoViews}
        width={80}
        height={80}
        className="mb:large"
        alt="No views yet"
      />

      <Text alignment="center" fontWeight="bold">
        {EMPTY_TITLE}
      </Text>
    </article>
  </ModalContainer>
);

const SeeEngagementButton = ({
  hasEngagementInsights,
  showPaywall,
  openInsights,
}: {
  hasEngagementInsights: boolean;
  showPaywall: boolean;
  openInsights: () => void;
}) => {
  const isBusinessTrialUser = useOnBusinessTrial();

  if (!hasEngagementInsights && !showPaywall) {
    return null;
  }

  if (isBusinessTrialUser) {
    return (
      <div className="borderTop pt:medium px:large my:medium">
        <BusinessHighlightTooltip
          tooltipText="See the metrics behind how viewers interact and engage with your
                videos."
          tooltipDirection="bottomCenter"
        >
          <Button
            onClick={openInsights}
            hasFullWidth
            isDisabled={!hasEngagementInsights}
            icon={<SvgBarChart />}
          >
            <Arrange gap="small">
              See Engagement
              <Container
                width={3}
                height={3}
                backgroundColor="upgrade"
                radius="100"
              >
                <Align>
                  <Icon size={2} icon={<SvgEditions />} />
                </Align>
              </Container>
            </Arrange>
          </Button>
        </BusinessHighlightTooltip>
      </div>
    );
  }

  return (
    <div className="borderTop pt:medium px:large mb:medium">
      <ConditionalWrapper
        condition={showPaywall}
        // TODO: Please refactor this to not be a nested component
        // eslint-disable-next-line react/no-unstable-nested-components
        wrapper={children => (
          <UpgradeTooltip
            analyticsEvent={SEE_ENGAGEMENT_UPGRADE_BUTTON_CLICKED}
            feature={UpgradeComponentFeature.ENGAGEMENT_INSIGHTS}
          >
            <Spacer top={1} />
            <div data-testid="engagement-insights-paywall">
              <div className={cn(styles.upgradeHover)}>{children}</div>
            </div>
          </UpgradeTooltip>
        )}
      >
        <Button
          onClick={openInsights}
          hasFullWidth
          isDisabled={!hasEngagementInsights}
          icon={<SvgBarChart />}
        >
          See Engagement
        </Button>
      </ConditionalWrapper>
    </div>
  );
};

type ViewerItemProps = {
  viewer: ViewerWithEngagements | Viewer;
  hasEngagementInsights: boolean;
  onClick?: () => void;
};

export const ViewerItem = ({
  viewer,
  hasEngagementInsights,
  onClick,
}: ViewerItemProps): JSX.Element => {
  const commentCount = isViewerWithEngagements(viewer)
    ? viewer.commentCount
    : 0;
  const reactionCount = isViewerWithEngagements(viewer)
    ? viewer.reactionCount
    : 0;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <article
      className={cn(styles.viewerItem, {
        [styles.isClickable]: hasEngagementInsights,
      })}
      onClick={onClick}
      /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
      tabIndex={0}
    >
      <ViewerAvatar {...viewer.user} />

      <h4 className="ellipsis weight:bold">
        {viewer.user.name || 'Anonymous'}
      </h4>
      {hasEngagementInsights && (
        <ul className={styles.reactionsAndComments}>
          <li>
            <Icon
              icon={<SvgComment />}
              color="bodyDimmed"
              altText="comments count"
            />

            <label>{commentCount}</label>
          </li>
          <li>
            <Icon
              icon={<SvgSmile />}
              color="bodyDimmed"
              altText="reactions count"
            />

            <label>{reactionCount}</label>
          </li>
        </ul>
      )}
    </article>
  );
};

type ViewerInsightsModalProps = {
  closeModal: () => void;
  popupOnTop?: boolean;
};

export function ViewerInsightsModal({
  closeModal,
}: ViewerInsightsModalProps): JSX.Element {
  const {
    video: { id: videoId, views },
  } = useVideoContext();
  const { isViewerSelected, toggleIsViewerSelected, setViewer } =
    useViewerInsight();
  const { setIsInTheaterMode } = useTheaterMode();
  const { endThumbnailFlow } = useThumbnailFlow();
  const { setIsEditingCta } = useCtaForm();
  const hasEngagementInsights = useHasScope(ENGAGEMENT_INSIGHTS_ACCESS);
  const hasPaywallScope = useHasSomeScopes([
    ENGAGEMENT_INSIGHTS_PAYWALL,
    ENGAGEMENT_INSIGHTS_PAYWALL_LITE,
  ]);

  // Below is to fix an issue where the paywall is shown when the user has the engagement insights but is an admin
  // since admins receive ALL scopes
  // TODO: Long-term, we should remove the paywall scope as it's not really inline with the mental model of scopes

  const showPaywall = hasPaywallScope && !hasEngagementInsights;

  // to be removed as a part of https://linear.app/loom-com/issue/CRX-746/using-enter-hotkey-should-focus-first-element-of-child-in-engagement
  useHotkeys(
    'esc',
    event => {
      event.preventDefault();
      event.stopPropagation();
      _debounce(closeModal, 2500);
    },
    { keyup: true }
  );

  const totalViews = views?.total || 0;
  const distinctViews = views?.distinct || 0;

  const { data: paginatedViewersData, loading: paginatedViewersLoading } =
    useGetPaginatedInsightsForVideoQuery({
      variables: {
        first: MAX_DISTINCT_VIEWERS,
        videoId,
      },
      client: getGraphQlClientInsights(),
      skip: !hasEngagementInsights || !totalViews,
    });

  const { viewersWithEngagements } =
    selectViewersWithEngagements(paginatedViewersData);
  const insightsViewers = selectViewersForViewerInsights(views);
  const viewers = hasEngagementInsights
    ? viewersWithEngagements
    : insightsViewers;

  if (!totalViews) {
    return <InsightsNoView />;
  }

  const loading = hasEngagementInsights && paginatedViewersLoading;

  // Regardless of the number of viewers loaded, we only ever want to show 50 unique viewers in the modal.
  const limitedViewers = viewers.slice(0, MAX_DISTINCT_VIEWERS);

  const openInsights = viewer => {
    setViewer(viewer);

    setIsInTheaterMode(false);
    setIsEditingCta(false);
    endThumbnailFlow();

    if (!isViewerSelected) {
      toggleIsViewerSelected();
      trackActivate();
    }

    closeModal();
  };

  const viewsText = [
    `${totalViews} total ${pluralize('view', Number(totalViews))}`,
    `${distinctViews} unique ${pluralize('viewer', Number(distinctViews))}`,
  ].join(', ');

  return (
    <ModalContainer variant={hasEngagementInsights ? undefined : 'small'}>
      <div className="borderBottom px:large">
        <Text variant="title" as="h2">
          {hasEngagementInsights ? 'Engagement' : 'Viewer'} Insights
        </Text>
        <Text color="bodyDimmed" className="mt:small mb:medium" as="p">
          {viewsText}
        </Text>
      </div>
      <div className="modal-viewer-list px:small py:medium thin-scrollbars overflow:auto">
        {loading ? (
          <div className="loading text:center py:xlarge">
            <Loader size="large" />
          </div>
        ) : (
          limitedViewers.map((viewer, i) => {
            return (
              <ViewerItem
                key={i}
                viewer={viewer}
                hasEngagementInsights={hasEngagementInsights}
                onClick={
                  hasEngagementInsights ? () => openInsights(viewer) : undefined
                }
              />
            );
          })
        )}
      </div>
      <SeeEngagementButton
        showPaywall={showPaywall}
        hasEngagementInsights={hasEngagementInsights}
        openInsights={() => openInsights(null)}
      />
    </ModalContainer>
  );
}

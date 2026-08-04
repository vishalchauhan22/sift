import { EMBED_VIDEO_PAGE } from '@js/constants/events';

import {
  selectWorkspaceId,
  useCurrentUserSelector,
} from '@js/common/current-user';
import { PageInitializationProvider } from '@js/common/page-initialization-provider';

import { renderLoomPage } from '@js/common/react/renderLoomPage';
import { PasswordContextProvider } from '@js/common/video-password';
import { PopulateWorkspacesWrapper } from '@js/common/workspace-memberships';
import { EmbedPageVideo } from '@js/components/video-player-fresh';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { getViewerSessionIdAndUpdateTimestamp } from '@js/utilities/localStorage/viewerSession';
import { datadogRum } from '@js/utilities/rum';
import { RUMWrapper } from '@js/utilities/rum/RUMWrapper';
import { DefaultReportingContext } from '@js/utilities/rum/ReportingContextProvider';
import { SuccessMarkers } from '@js/utilities/rum/constants';

import {
  Team,
  Feature,
  Page,
} from '@loomhq/shared-utilities/constants/product';

import {
  getVideoIdFromPageUrl,
  Page as UrlPage,
} from '@loomhq/shared-utilities/utilities/urlUtils';
import { page } from '@js/utilities/analytics';

import { LoomProviders } from './contexts/LoomProviders';
import { withIdentifiers } from './utilities/analytics/attribute-transformer';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';

type AnalyticsProps = {
  is_logged_in?: boolean;
  organization_id?: string;
  viewerSessionId?: string;
};

function init() {
  // TODO: Migrate into PageInitializationProvider
  datadogRum.onReady(() => {
    datadogRum.startView('/embed/:videoId');
  });

  renderLoomPage(
    <PageInitializationProvider
      entityType="video"
      entityId={getVideoIdFromPageUrl(window.location.href, UrlPage.embed)}
    >
      <LoomProviders feature={Feature.EmbedSDK} pageName={Page.Embed}>
        <PopulateWorkspacesWrapper>
          <RUMWrapper
            pageName={Page.Embed}
            timeoutMs={30000}
            expectedMarkers={[
              SuccessMarkers.VideoCanPlay,
              SuccessMarkers.VideoSourceFetchStart,
              SuccessMarkers.VideoSourceFetched,
              SuccessMarkers.VideoSourceParsed,
              SuccessMarkers.ShakaPlayerInit,
              SuccessMarkers.VideoPlayerReady,
              SuccessMarkers.VideoPlayer,
            ]}
            ReportingContext={DefaultReportingContext}
            team={Team.CorePlatform}
          >
            <PasswordContextProvider>
              <BrowserRouter>
                <EmbedPageVideo />
              </BrowserRouter>
            </PasswordContextProvider>
          </RUMWrapper>
          <AnalyticsTrackPage />
        </PopulateWorkspacesWrapper>
      </LoomProviders>
    </PageInitializationProvider>
  );
}

const AnalyticsTrackPage = () => {
  const userIsLoggedIn = useCurrentUserSelector(() => true, false);
  const organizationId = useCurrentUserSelector(selectWorkspaceId, undefined);

  React.useEffect(() => {
    const props: AnalyticsProps = {
      is_logged_in: userIsLoggedIn,
      ...withIdentifiers(
        EMBED_VIDEO_PAGE,
        AnalyticsEntityId.workspace(
          organizationId ?? undefined,
          'string',
          'organization_id'
        ),
        AnalyticsEntityId.session(
          getViewerSessionIdAndUpdateTimestamp(),
          'viewerSessionId'
        )
      ),
    };
    // The fresh embed player loads so fast that window.analytics.page isn't ready in time.
    // Combatting this with adding a 150ms delay.
    // Loom for additional context: https://www.loom.com/share/0a2019604fe84d8b83ee4ea6887ede04
    const updatePageAnalyticsDelayed = setTimeout(() => {
      page(EMBED_VIDEO_PAGE, props);
    }, 150);

    return () => clearTimeout(updatePageAnalyticsDelayed);
  }, [organizationId, userIsLoggedIn]);

  return null;
};

init();

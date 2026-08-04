import React from 'react';

import { validate as isValidUuid } from 'uuid';

import { NOTIFICATION_URL_PARAMS } from '@loomhq/shared-utilities/constants/notifications';
import { Feature, Page } from '@loomhq/shared-utilities/constants/product';
import {
  CASCADING_RECORDERS_TAB_UUID_PARAM,
  FOCUS_TITLE_PARAM,
  MUTED_PARAM,
  SOURCE_EMAIL_PARAM,
  FROM_RECORDER_PARAM,
  RECORDING_LIMIT_PARAM,
  TIME_PARAM,
  SOURCE_PARAM,
  OAUTH_ERROR_PARAM,
  PROVIDER_PARAM,
  DATA_PARAM,
  FROM_EXTENSION_TUTORIAL,
  ANON_EMAIL_PARAM,
  ACTIVE_TAB_PARAM,
  OPEN_SHARE_PERMISSIONS_PARAM,
  RECORDING_DOCUMENTATION_TYPE_PARAM,
} from '@loomhq/shared-utilities/constants/urlParams';
import { getVideoIdFromPageUrl } from '@loomhq/shared-utilities/utilities/urlUtils';
import { PageInitializationProvider } from '@js/common/page-initialization-provider';
import { renderLoomPage } from '@js/common/react/renderLoomPage';
import { PasswordContextProvider } from '@js/common/video-password/useVideoPasswordContext';
import { LoomProviders } from '@js/contexts/LoomProviders';
import { TAB_LIST } from '@js/pages/share/common';
import { ShareVideoInitWrapper } from '@js/pages/share/page-init-wrapper';

import { enableFtuxReset } from '@js/utilities/ftux';

import * as loggerx from '@js/utilities/loggerx';

import { processPushEventData } from '@js/utilities/notifications';
import { datadogRum } from '@js/utilities/rum';

import { getParam, removeParamsFromQueryString } from '@js/utilities/url';

import UFOSegment from '@atlaskit/react-ufo/segment';

import { getPageLoadParam } from '@js/utilities/urlParams';
import { getLoomBrowserSupportedMimeTypes } from '@js/utilities/video-supported-mime';

import { jsonParseOrDefault } from './utilities/json/safe-json-parse';
import { WorkflowTemplateType } from '@js/globalTypes.generated';

const { reactor } = NOTIFICATION_URL_PARAMS;
const loggerPrefix = '[Fresh Page]';

// we do this immediately in case someone tries to copy the link with the
// query param in it right after a recording
const focusTitleParam = getParam(FOCUS_TITLE_PARAM) === '1';

const mutedParam = getParam(MUTED_PARAM) === '1';

const fromFirstVideoViewEmail =
  getParam(SOURCE_EMAIL_PARAM) === 'loom-video-first-view-updated';

const reactorId = getPageLoadParam(reactor);
const fromReactionNotification = reactorId !== '';

const fromRecorderParam = getParam(FROM_RECORDER_PARAM) === '1';

const fromTutorialParam = getParam(FROM_EXTENSION_TUTORIAL) === '1';

const rawCascadingRecordersTabIdParam = getParam(
  CASCADING_RECORDERS_TAB_UUID_PARAM
);

const cascadingRecordersTabIdParam = isValidUuid(
  rawCascadingRecordersTabIdParam
)
  ? rawCascadingRecordersTabIdParam
  : '';

const recordingLimitParam = getParam(RECORDING_LIMIT_PARAM) === '1';

const activeTabParam = getParam(ACTIVE_TAB_PARAM) as TAB_LIST | null;

const openSharePermissionsParam = Boolean(
  getParam(OPEN_SHARE_PERMISSIONS_PARAM) === '1'
);

const timeParam = getParam(TIME_PARAM);
const oauthError = getParam(OAUTH_ERROR_PARAM);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = getParam(DATA_PARAM)
  ? jsonParseOrDefault(atob(getParam(DATA_PARAM)), {})
  : {};

const anonEmailParam = getParam(ANON_EMAIL_PARAM);

const recordingDocumentationTypeParam = getParam(
  RECORDING_DOCUMENTATION_TYPE_PARAM
);

// Convert string to WorkflowTemplateType enum, or undefined if invalid
const recordingDocumentationTypeParamTyped = recordingDocumentationTypeParam
  ? Object.values(WorkflowTemplateType).includes(
      recordingDocumentationTypeParam as WorkflowTemplateType
    )
    ? (recordingDocumentationTypeParam as WorkflowTemplateType)
    : undefined
  : undefined;

function init() {
  // TODO(tatiana): Pull into analytics page wrapper as a config or make default for all pages
  datadogRum.onReady(() => {
    datadogRum.startView(`/share/:videoId`);
  });

  try {
    // This kicks off the async work to derive the mimetypes this browser supports.
    // We do this as early as possible because the result is needed in order to fetch
    // the video source URL, which is needed for the player. The function can take over
    // 1 second to complete: https://useloom.slack.com/archives/C058L11LY68/p1684790219346049.
    getLoomBrowserSupportedMimeTypes();
  } catch (e) {
    // Empty block, since loggerx might not be started yet
  }

  const shouldOpenInsights =
    fromFirstVideoViewEmail || fromReactionNotification;

  const { pathname, search } = window.location;

  const paramsToRemove = [
    ACTIVE_TAB_PARAM,
    FOCUS_TITLE_PARAM,
    MUTED_PARAM,
    SOURCE_EMAIL_PARAM,
    FROM_RECORDER_PARAM,
    RECORDING_LIMIT_PARAM,
    OAUTH_ERROR_PARAM,
    PROVIDER_PARAM,
    SOURCE_PARAM,
    DATA_PARAM,
    FROM_EXTENSION_TUTORIAL,
    ANON_EMAIL_PARAM,
    OPEN_SHARE_PERMISSIONS_PARAM,
    CASCADING_RECORDERS_TAB_UUID_PARAM,
    RECORDING_DOCUMENTATION_TYPE_PARAM,
  ];

  const newQueryString = removeParamsFromQueryString(paramsToRemove, search);

  window.history.replaceState('', '', `${pathname}${newQueryString}`);

  if (data && data?.referrer === 'push') {
    processPushEventData(data);
  }

  enableFtuxReset();

  renderLoomPage(
    <UFOSegment name="share-video">
      <PageInitializationProvider
        entityType="video"
        entityId={getVideoIdFromPageUrl(window.location.href)}
      >
        <LoomProviders feature={Feature.SharePage} pageName={Page.Share}>
          <PasswordContextProvider>
            <ShareVideoInitWrapper
              data={data}
              focusTitleParam={focusTitleParam}
              mutedParam={mutedParam}
              timeParam={timeParam}
              shouldOpenInsights={shouldOpenInsights}
              fromRecorderParam={fromRecorderParam}
              fromTutorialParam={fromTutorialParam}
              recordingLimitParam={recordingLimitParam}
              activeTabParam={activeTabParam}
              oauthError={oauthError}
              anonEmailParam={anonEmailParam}
              openSharePermissionsParam={openSharePermissionsParam}
              cascadingRecordersTabUuidParam={cascadingRecordersTabIdParam}
              recordingDocumentationTypeParam={
                recordingDocumentationTypeParamTyped
              }
            />
          </PasswordContextProvider>
        </LoomProviders>
      </PageInitializationProvider>
    </UFOSegment>,
    { enableTtvc: true }
  );
}

try {
  init();
} catch (e) {
  // ignore unactionable errors
  if (!['SecurityError'].includes(e.name)) {
    loggerx.error(
      e,
      {
        message: `${loggerPrefix} Errored`,
        hasVideo: true,
      },
      { feature: Feature.SharePage }
    );
  }
}

/* eslint-disable @loomhq/loom/no-js-extension */
import {
  EI_BACK_TO_LIST_CLICKED,
  EI_INFO_ICON_CLICKED,
  EI_INFO_LINK_CLICKED,
  EI_MODAL_VIEWS_OPEN,
  EI_PARTIAL_INFO_ACK,
  EI_SEE_ENGAGEMENTS_CLICKED,
  EI_SEE_ENGAGEMENTS_CLOSED,
  EI_SEE_ENGAGEMENTS_SHOWN,
  EI_VIEWER_DETAILS_CLICKED,
} from '@js/constants/events';
import * as analytics from '@js/utilities/analytics';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../utilities/analytics/attribute-transformer';

let videoId;

export const initForVideo = id => {
  videoId = id;
};

export const trackModal = videoId =>
  analytics.track(
    EI_MODAL_VIEWS_OPEN,
    withIdentifiers(
      EI_MODAL_VIEWS_OPEN,
      AnalyticsEntityId.video(videoId, 'videoId')
    )
  );
export const trackShown = () =>
  analytics.track(
    EI_SEE_ENGAGEMENTS_SHOWN,
    withIdentifiers(
      EI_SEE_ENGAGEMENTS_SHOWN,
      AnalyticsEntityId.video(videoId, 'videoId')
    )
  );
export const trackActivate = () =>
  analytics.track(
    EI_SEE_ENGAGEMENTS_CLICKED,
    withIdentifiers(
      EI_SEE_ENGAGEMENTS_CLICKED,
      AnalyticsEntityId.video(videoId, 'videoId')
    )
  );
export const trackExit = () =>
  analytics.track(
    EI_SEE_ENGAGEMENTS_CLOSED,
    withIdentifiers(
      EI_SEE_ENGAGEMENTS_CLOSED,
      AnalyticsEntityId.video(videoId, 'videoId')
    )
  );
export const trackPartialInfoAck = () =>
  analytics.track(
    EI_PARTIAL_INFO_ACK,
    withIdentifiers(
      EI_PARTIAL_INFO_ACK,
      AnalyticsEntityId.video(videoId, 'videoId')
    )
  );
export const trackBackToList = () =>
  analytics.track(
    EI_BACK_TO_LIST_CLICKED,
    withIdentifiers(
      EI_BACK_TO_LIST_CLICKED,
      AnalyticsEntityId.video(videoId, 'videoId')
    )
  );
export const trackViewerDetails = () =>
  analytics.track(
    EI_VIEWER_DETAILS_CLICKED,
    withIdentifiers(
      EI_VIEWER_DETAILS_CLICKED,
      AnalyticsEntityId.video(videoId, 'videoId')
    )
  );
export const trackInfoIcon = (source = {}) =>
  analytics.track(EI_INFO_ICON_CLICKED, {
    ...withIdentifiers(
      EI_INFO_ICON_CLICKED,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    ...source,
  });
export const trackInfoLink = () =>
  analytics.track(
    EI_INFO_LINK_CLICKED,
    withIdentifiers(
      EI_INFO_LINK_CLICKED,
      AnalyticsEntityId.video(videoId, 'videoId')
    )
  );

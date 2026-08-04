/* eslint-disable @loomhq/loom/no-js-extension */
import { WEB_PUSH_NOTIFICATION_CLICKED } from '@js/constants/events';
import * as analytics from '@js/utilities/analytics';

import { jsonParseOrDefault } from './json/safe-json-parse';

let paramsObj;

const parseAndStoreParams = () => {
  if (paramsObj) {
    return;
  }

  paramsObj = Object.fromEntries(new URLSearchParams(location.search));

  const dataBase64 = paramsObj?.data;
  const data = dataBase64 ? jsonParseOrDefault(atob(dataBase64), {}) : {};

  if (dataBase64) {
    analytics.track(WEB_PUSH_NOTIFICATION_CLICKED, {
      notificationType: data?.event,
      url: data.url,
    });
  }

  paramsObj = {
    ...paramsObj,
    ...data,
  };
};

export const getPageLoadParam = key => {
  if (!paramsObj) {
    parseAndStoreParams();
  }

  const paramVal = paramsObj[key];

  return paramVal ? String(paramVal) : '';
};

// Store page load params for use later
// We do this here in case they are cleared out early
// in other palces
parseAndStoreParams();

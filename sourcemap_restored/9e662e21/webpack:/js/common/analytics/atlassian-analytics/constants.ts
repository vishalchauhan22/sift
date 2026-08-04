import { isStaging } from '@js/constants/environment';

import { envType } from '@atlassiansox/analytics-web-client';

/*
NODE_ENV results in the staging deployment to incorrectly resolve to production as its values are only
development and production. This is a workaround to correctly resolve staging.
*/
const currentNodeEnv = isStaging
  ? 'staging'
  : process.env.NODE_ENV || 'development';
const nodeToAnalyticsEnv = {
  production: envType.PROD,
  development: envType.DEV,
  staging: envType.STAGING,
  local: envType.LOCAL,
  test: envType.LOCAL,
};

export const analyticsEnv = nodeToAnalyticsEnv[currentNodeEnv];

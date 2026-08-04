import {
  DATADOG_RUM_APPLICATION_ID,
  DATADOG_RUM_CLIENT_TOKEN,
  DATADOG_RUM_ENABLE,
  DATADOG_RUM_SESSION_SAMPLE_RATE,
  DATADOG_RUM_SERVICE,
  LOOM_VERSION,
  NODE_ENV,
} from '@js/constants/runtimeConfig';

import { datadogRum } from '@datadog/browser-rum-slim';

import { selectFromCurrentUserCache } from '@js/common/current-user/cache/selectFromCurrentUserCache';

const WORKSPACE_SIZE_THRESHOLD = 5000;

function getWorkspaceSizeTag(workspaceSize) {
  if (workspaceSize < 100) {
    return 'lessthan100';
  }

  if (workspaceSize >= 100 && workspaceSize < 1000) {
    return '100to1000';
  }

  if (workspaceSize >= 1000 && workspaceSize < 5000) {
    return '1000to5000';
  }

  if (workspaceSize >= 5000 && workspaceSize < 10000) {
    return '5000to10000';
  }

  if (workspaceSize >= 10000 && workspaceSize < 50000) {
    return '10000to50000';
  }

  if (workspaceSize >= 50000 && workspaceSize < 100000) {
    return '50000to100000';
  }

  return 'morethan100000';
}

interface Window {
  workspaceSize?: number;
}

interface DdRumInitOptionOverrides {
  applicationId?: string;
  clientToken?: string;
  site?: string;
  env?: string;
  version?: string;
  service?: string;
  sessionSampleRate?: number;
  sessionReplaySampleRate?: number;
  telemetrySampleRate?: number;
  trackLongTasks?: boolean;
  trackResources?: boolean;
  trackInteractions?: boolean;
  trackFrustrations?: boolean;
  enableExperimentalFeatures?: string[];
}

function init(optionsOverride: DdRumInitOptionOverrides = {}): void {
  if (
    !DATADOG_RUM_SERVICE ||
    !DATADOG_RUM_ENABLE ||
    !DATADOG_RUM_APPLICATION_ID ||
    !DATADOG_RUM_CLIENT_TOKEN
  ) {
    return;
  }

  const userEmail = selectFromCurrentUserCache(user => user.email, undefined);

  const workspaceSize = (window as Window)?.workspaceSize ?? 0;

  const workspaceSizeEligibleForFullSampleRate =
    workspaceSize >= WORKSPACE_SIZE_THRESHOLD;

  const eligibleForFullSampleRate =
    userEmail?.endsWith('@loom.com') ||
    userEmail?.endsWith('.loom.com') ||
    userEmail?.endsWith('@atlassian.com') ||
    userEmail?.endsWith('.atlassian.com') ||
    workspaceSizeEligibleForFullSampleRate;

  const workspaceSizeTag = getWorkspaceSizeTag(workspaceSize);

  datadogRum.init({
    allowedTracingUrls: [
      'https://www.loom.com',
      url => url.startsWith('https://www.loom.com/'),
    ],
    applicationId: DATADOG_RUM_APPLICATION_ID,
    clientToken: DATADOG_RUM_CLIENT_TOKEN,
    env: NODE_ENV,
    service: DATADOG_RUM_SERVICE,
    sessionReplaySampleRate: 0,
    sessionSampleRate: parseInt(DATADOG_RUM_SESSION_SAMPLE_RATE, 10),
    site: 'datadoghq.com',
    telemetrySampleRate: 0,
    traceSampleRate: eligibleForFullSampleRate ? 100 : 10,
    trackFrustrations: true,
    trackInteractions: true,
    trackLongTasks: true,
    trackResources: true,
    version: LOOM_VERSION,
    ...optionsOverride,
  });

  datadogRum.addRumGlobalContext('workspace_size', workspaceSizeTag);
}

export { datadogRum, init };

import { isDevOrTest } from '@js/constants/environment';

import { userType, tenantType } from '@atlassiansox/analytics-web-client';
import {
  selectWorkspaceId,
  useCurrentUserSelector,
  useIsCurrentUserLoggedIn,
} from '@js/common/current-user';
import { useUserWorkspaceMembershipsQuery } from '@js/common/workspace-memberships/getUserWorkspaceMemberships.generated';

import { useEffect, useMemo, useRef } from 'react';
import * as loggerx from '@js/utilities/loggerx';

import {
  Feature,
  FeatureInfo,
} from '@loomhq/shared-utilities/constants/product';

import { useGetVideoSiteIdQuery } from './GetVideoSiteId.generated';
import { analyticsEnv } from './constants';

import { getAtlassianAnalyticsClient } from './get-analytics-client';
import { getVideoIdForFeature } from './utilities/getVideoIdForFeature';

type UseSendEventParams = {
  feature: undefined | FeatureInfo;
};

const LOG_PREFIX = '[Loom MAU]';

interface MAUUserInfo {
  userIdType: userType.ATLASSIAN_ACCOUNT | userType.LOOM;
  userId: string;
  siteId: string | undefined;
}

interface LoadableMAUUserInfo {
  loading: boolean;
  userInfo: MAUUserInfo;
}

const useUserInformation = ({
  anonAaid,
}: {
  anonAaid: string | null;
}): LoadableMAUUserInfo => {
  const userIsLoggedIn = useIsCurrentUserLoggedIn();
  const atlassianUserId = useCurrentUserSelector(user => user.aaId, '');
  const loomUserId = useCurrentUserSelector(user => user.id, NaN);
  // NOTE: Normally we would localise this query. However this AGG fetching method will soon be replaced with a tenant context service and we can localise the query at that time.
  const { data, loading } = useUserWorkspaceMembershipsQuery({
    skip: !userIsLoggedIn || isDevOrTest,
    fetchPolicy: 'cache-first',
    onError: error => {
      loggerx.error(
        'Error fetching workspace by id',
        { error },
        {
          feature: Feature.AtlassianAnalytics,
        }
      );
    },
  });

  const maybeUserSiteId =
    data?.userWorkspaceMemberships?.[0]?.organization.site_id ?? '';
  const isAtlassianMastered = Boolean(maybeUserSiteId);

  const userAccountType =
    isAtlassianMastered || Boolean(anonAaid) ? 'atlassian' : 'loom';

  // Values based on if user is Atlassian mastered or not OR if they are an unmastered user/viewer viewing a public video in an Atlassian site
  const userDataMap: Record<string, MAUUserInfo> = {
    atlassian: {
      userIdType: userType.ATLASSIAN_ACCOUNT,
      userId: (atlassianUserId?.toString() || anonAaid) ?? '',
      siteId: maybeUserSiteId,
    },
    loom: {
      userIdType: userType.LOOM,
      userId: loomUserId.toString(),
      siteId: undefined,
    },
  };

  // Select the appropriate mapping
  return { userInfo: userDataMap[userAccountType], loading };
};

interface TenantInfo {
  tenantIdType: tenantType;
  tenantId: string;
}
type LoadableTenantInfo =
  | { loading: false; tenantInfo: TenantInfo; error?: undefined }
  | { loading: true; tenantInfo: undefined; error?: undefined }
  | { loading: false; tenantInfo: undefined; error: Error };

interface UseTenantInformationParams {
  feature: FeatureInfo | undefined;
  anonAaid: string | null;
}

/**
 * Determines the appropriate tenant information to track MAU events against
 *
 * {@link https://hello.atlassian.net/wiki/x/jCSxHQE [Tenant Attribution DACI]}
 *
 * If we are on a video page, always track against the video's tenant
 * If not on a video page or unable to get video information (like for a private video) track against the users workspace
 */
const useTenantInformation = ({
  feature,
  anonAaid,
}: UseTenantInformationParams): LoadableTenantInfo => {
  const maybeVideoId = getVideoIdForFeature(feature);
  const maybeUserWorkspaceId = useCurrentUserSelector(
    selectWorkspaceId,
    undefined
  );
  const {
    data: videoData,
    loading: isLoadingVideoData,
    error: videoDataError,
  } = useGetVideoSiteIdQuery({
    skip: !maybeVideoId,
    variables: {
      videoId: maybeVideoId as string,
    },
    fetchPolicy: 'cache-first',
    onError: error => {
      loggerx.error(
        `${LOG_PREFIX} Error loading video data`,
        {
          error,
        },
        { feature: Feature.AtlassianAnalytics }
      );
    },
  });

  const { userInfo: userData, loading: isLoadingUserInfo } = useUserInformation(
    { anonAaid }
  );
  const maybeUserSiteId = userData.siteId;

  // We can't determine tenant info until this is loaded
  if (isLoadingVideoData || isLoadingUserInfo) {
    return { loading: true, tenantInfo: undefined };
  }

  if (videoDataError) {
    return { loading: false, tenantInfo: undefined, error: videoDataError };
  }

  // The page doesn't have a video, or the user doesn't have access to the video they are trying to view
  // track the view based on user auth
  if (!maybeVideoId || videoData?.getVideo?.__typename !== 'RegularUserVideo') {
    if (maybeUserSiteId) {
      return {
        loading: false,
        tenantInfo: {
          tenantIdType: tenantType.CLOUD_ID,
          tenantId: maybeUserSiteId,
        },
      };
    }
    return {
      loading: false,
      tenantInfo: {
        tenantIdType: tenantType.LOOM_ORG_ID,
        tenantId: maybeUserWorkspaceId?.toString() || '',
      },
    };
  }

  // At this point we can guarantee that there is a video
  const maybeVideoSiteId = videoData.getVideo.organization.site_id;
  const videoLoomOrganizationId = videoData.getVideo.organization.id;

  // Th video belonging to an org associated with an Atlassian site
  if (maybeVideoSiteId) {
    return {
      loading: false,
      tenantInfo: {
        tenantIdType: tenantType.CLOUD_ID,
        tenantId: maybeVideoSiteId,
      },
    };
  }

  // This video does not belong to an org associated with an Atlassian site
  return {
    loading: false,
    tenantInfo: {
      tenantIdType: tenantType.LOOM_ORG_ID,
      tenantId: videoLoomOrganizationId,
    },
  };
};

/**
 * Optionally tracks a UI Viewed event for the purpose of MAU tracking and attribution.
 * This used to be called useSendUiEvent which conflicted with the sendUiEvent
 * method exposed by the `'@atlassiansox/analytics-web-client'` package so the name was changed.
 */
export const useSendUiViewEvent = ({ feature }: UseSendEventParams): void => {
  const isEmbed = Feature.EmbedSDK === feature;
  const analyticsClient = getAtlassianAnalyticsClient();
  const loomUserId = useCurrentUserSelector(user => user.id, NaN);
  const userIsLoggedIn = useCurrentUserSelector(() => true, false);
  const workspaceId = useCurrentUserSelector(selectWorkspaceId, undefined);
  const hasStartedSending = useRef(false);

  const anonAaid = useMemo(
    () => new URLSearchParams(window.location.search).get('anonViewerAaid'),
    []
  );

  const { userInfo: userData, loading: isLoadingUserInfo } = useUserInformation(
    { anonAaid }
  );

  const {
    loading: loadingTenantInfo,
    tenantInfo,
    error: tenantInfoError,
  } = useTenantInformation({ feature, anonAaid });

  const product = useMemo(
    () => new URLSearchParams(window.location.search).get('product'),
    []
  );

  useEffect(() => {
    if (hasStartedSending.current) {
      loggerx.debug(`${LOG_PREFIX} stopping UI viewed event`, {});
      analyticsClient.stopUIViewedEvent();
    }
  }, [analyticsClient]);

  useEffect(() => {
    const nonTrackableUser = (!userIsLoggedIn || isDevOrTest) && !anonAaid;
    let isMounted = true;

    // Only send the event once
    if (hasStartedSending.current) {
      loggerx.debug(`${LOG_PREFIX} event already sent, skipping`, {});
      return;
    }

    if (isLoadingUserInfo || loadingTenantInfo) {
      loggerx.debug(`${LOG_PREFIX} loading data, skipping`, {
        isLoadingUserInfo,
        loadingTenantInfo,
      });
      return;
    }

    if (tenantInfoError) {
      loggerx.debug(`${LOG_PREFIX} error resolving tenant data`, {
        tenantInfoError,
      });
      return;
    }

    if (nonTrackableUser) {
      loggerx.debug(`${LOG_PREFIX} user is untrackable`, {
        userIsLoggedIn,
        isDevOrTest,
        anonAaid,
      });
      return;
    }

    if (!userData.userId) {
      loggerx.warning(
        `${LOG_PREFIX} Could not find userId for MAU analytics event`,
        {},
        {
          feature: Feature.AtlassianAnalytics,
        }
      );
      return;
    }

    if (!tenantInfo.tenantId) {
      loggerx.warning(
        `${LOG_PREFIX} Could not find tenantId for MAU analytics event`,
        {},
        { feature: Feature.AtlassianAnalytics }
      );
    }

    const sendAnalytics = () => {
      if (!isMounted) {
        loggerx.debug(`${LOG_PREFIX} unmounted, skipping`, {});
        return;
      } // Check if component is still mounted before proceeding

      try {
        hasStartedSending.current = true;
        analyticsClient.setTenantInfo(
          tenantInfo.tenantIdType,
          tenantInfo.tenantId
        );
        analyticsClient.setUserInfo(userData.userIdType, userData.userId ?? '');
        analyticsClient.setUIViewedAttributes({
          userIdType: userData.userIdType,
          userId: userData.userId,
          tenantType: tenantInfo.tenantIdType,
          tenantId: tenantInfo.tenantId,
          loomUserId: loomUserId.toString() ?? '', // will not always exist but mapped for when it does
          loomOrgId: workspaceId,
          ...(isEmbed && {
            embeddedInEnv: analyticsEnv,
            embeddedInProduct: product,
          }),
          ...analyticsClient.getUIViewedAttributes(),
        });

        loggerx.debug(`${LOG_PREFIX} attempting to start UI Viewed Event`, {
          tenantInfo,
          userData,
          loomUserId: loomUserId.toString(),
          loomOrgId: workspaceId,
          isEmbed,
          analyticsEnv,
          product,
          clientUIViewedAttributes: analyticsClient.getUIViewedAttributes(),
        });
        analyticsClient.startUIViewedEvent();
      } catch (error) {
        loggerx.error(
          'Could not send Atlassian MAU analytics event:',
          { error },
          {
            feature: Feature.AtlassianAnalytics,
          }
        );
      }
    };

    sendAnalytics();

    return () => {
      isMounted = false;
    };
  }, [
    analyticsClient,
    isEmbed,
    loadingTenantInfo,
    loomUserId,
    product,
    anonAaid,
    tenantInfo?.tenantId,
    tenantInfo?.tenantIdType,
    tenantInfoError,
    userData.userId,
    userData.userIdType,
    userIsLoggedIn,
    workspaceId,
    isLoadingUserInfo,
    userData,
    tenantInfo,
  ]);
};

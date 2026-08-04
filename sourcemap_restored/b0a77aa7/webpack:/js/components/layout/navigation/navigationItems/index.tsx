import { NAVIGATION_ITEM_CLICKED } from '@js/constants/events';

import {
  ADMIN_HUB_URI,
  ADMIN_MANAGEMENT_PAGE,
  HISTORY_PAGE,
  LOOMS_PAGE,
  MANAGE_WORKSPACE,
  NOTIFICATIONS_PAGE,
  PROFILE_PAGE,
  WATCH_LATER_PAGE,
  INCENTIVES_PAGE,
  MEETINGS_PAGE,
  PLAYGROUND_PAGE,
} from '@js/constants/routes';
import {
  ControlType,
  FEATURE_GATES,
} from '@loomhq/shared-utilities/constants/statsig';

import { MenuItemProps } from '@js/common/navigation/MenuItem';
import { MenuItemTooltip } from '@js/common/navigation/MenuItemTooltip';
import { useUnseenNotificationsCount } from '@js/common/notifications/useUnseenNotificationCount';
import { IncentivesSideNavFtux } from '@js/components/incentives-page/IncentivesSideNavFtux';

import Scopes from '@js/components/scopes';
import { useFeatureFlagValue } from '@js/hooks/featureFlag';
import { useIsAtlassianManagedWorkspace } from '@js/hooks/useIsAtlassianManagedWorkspace';
import { useGetRoleAndPlan } from '@js/hooks/workspace';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';
import { SvgAccount } from '@loomhq/lens/icons/account';

import React from 'react';

import { useGetWorkspaceAggEntitlementsQuery } from '@js/utilities/billing/GetWorkspaceAGGEntitlements.generated';

import { Icon, Spacer, Text } from '@loomhq/lens';
import { SvgBell } from '@loomhq/lens/icons/bell';
import { SvgCalendar } from '@loomhq/lens/icons/calendar';
import { SvgClock } from '@loomhq/lens/icons/clock';
import { SvgExternalLink } from '@loomhq/lens/icons/external-link';
import { SvgGlobe } from '@loomhq/lens/icons/globe';
import { SvgPresent } from '@loomhq/lens/icons/present';
import { SvgSettings } from '@loomhq/lens/icons/settings';
import { SvgSparkle } from '@loomhq/lens/icons/sparkle';
import { SvgVideoLibrary } from '@loomhq/lens/icons/video-library';
import { SvgWatchLater } from '@loomhq/lens/icons/watch-later';

import { REWATCH_MEETINGS } from '@loomhq/shared-utilities/constants/featureFlag';
import { ORG_ROLE_ADMIN } from '@loomhq/shared-utilities/constants/organizationRoles';
import { AUTHENTICATED_USER_ACCESS } from '@loomhq/shared-utilities/constants/scopes';

import BillingButtonTooltipImg from '@assets/img/billing-button-tooltip.png';
import * as analytics from '@js/utilities/analytics';

import { FadeRoot, FadeText } from '../FadeText';
import MenuButton from '../MenuButton';
import MenuLink from '../MenuLink';

import styles from '../styles.module.less';

import { useWatchLaterListUnwatchedVideosCount } from '../useWatchLaterListUnwatchedVideosCount';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../../utilities/analytics/attribute-transformer';

export const navBarAnimationDuration = 300;

export const SettingsButtonWithFtux = ({
  isCollapsed,
}: {
  isCollapsed: boolean;
}): JSX.Element => {
  const isAtlassianManagedWorkspace = useIsAtlassianManagedWorkspace();
  const { userRole } = useGetRoleAndPlan();

  const workspace = useGetSelectedWorkspace();

  const { data: entitlementData, loading: entitlementLoading } =
    useGetWorkspaceAggEntitlementsQuery({
      variables: {
        workspaceId: workspace?.id,
      },
      skip: !workspace || !isAtlassianManagedWorkspace,
    });

  const [atlassianOrgId, entitlementId] =
    entitlementData?.getWorkspaceAGGEntitlements?.__typename ===
    'GetWorkspaceAGGEntitlementsPayload'
      ? [
          entitlementData.getWorkspaceAGGEntitlements.entitlements[0]?.orgId,
          entitlementData.getWorkspaceAGGEntitlements.entitlements[0]
            ?.entitlementId,
        ]
      : [null, null];
  const billingUrl =
    atlassianOrgId != null && entitlementId != null
      ? `${ADMIN_HUB_URI}/billing/${atlassianOrgId}/entitlement/${entitlementId}`
      : null;

  const showBillingButton =
    userRole === ORG_ROLE_ADMIN &&
    isAtlassianManagedWorkspace &&
    !entitlementLoading &&
    billingUrl;

  const menuItems: MenuItemProps[] = [
    {
      title: 'Personal',
      path: PROFILE_PAGE,
      onClick: () => {
        analytics.track(NAVIGATION_ITEM_CLICKED, {
          primary_nav_item: 'settings_personal',
        });
        window.location.href = PROFILE_PAGE;
      },
    },
    {
      title: 'Workspace',
      path: MANAGE_WORKSPACE,
      onClick: () => {
        analytics.track(NAVIGATION_ITEM_CLICKED, {
          ...withIdentifiers(
            NAVIGATION_ITEM_CLICKED,
            AnalyticsEntityId.site(workspace?.site_id, 'tenant_id')
          ),
          primary_nav_item: 'settings_workspace',
        });
        window.location.href = MANAGE_WORKSPACE;
      },
    },
  ];

  if (showBillingButton) {
    menuItems.push({
      title: 'Billing',
      path: billingUrl,
      target: '_blank',
      icon: <SvgExternalLink />,
      popover: (
        <MenuItemTooltip
          title="Manage billing on Atlassian"
          text="Upgrade your plan, review billing, and see your upcoming invoices on Atlassian."
          img={BillingButtonTooltipImg}
          altText="Billing tooltip image"
        />
      ),
      onClick: () => {
        analytics.track(NAVIGATION_ITEM_CLICKED, {
          ...withIdentifiers(
            NAVIGATION_ITEM_CLICKED,
            AnalyticsEntityId.site(workspace?.site_id, 'tenant_id')
          ),
          primary_nav_item: 'settings_billing',
        });
        window.open(billingUrl);
      },
    });
  }

  return (
    <Scopes name={AUTHENTICATED_USER_ACCESS}>
      <MenuButton collapsed={isCollapsed} name="settings" items={menuItems}>
        <FadeRoot className={styles.menuItemInner}>
          <Icon icon={<SvgSettings />} color="currentColor" />
          <Spacer right="small" />
          <FadeText visible={!isCollapsed}>
            <Text className={styles.linkTitle}>Settings</Text>
          </FadeText>
        </FadeRoot>
      </MenuButton>
    </Scopes>
  );
};

export const HomeButton = ({
  isCollapsed,
  isMobileCollapsedNav,
}: {
  isCollapsed: boolean;
  isMobileCollapsedNav: boolean;
}): JSX.Element => {
  return (
    <MenuLink
      icon={<SvgAccount />}
      title="For you"
      url="/home"
      collapsed={isCollapsed}
      isMobileCollapsedNav={isMobileCollapsedNav}
      isReactRouterLink
      onClick={() => {
        analytics.track(NAVIGATION_ITEM_CLICKED, {
          primary_nav_item: 'home',
        });
      }}
    />
  );
};

export const MyLibraryButton = ({
  isCollapsed,
  isMobileCollapsedNav,
}: {
  isCollapsed: boolean;
  isMobileCollapsedNav: boolean;
}): JSX.Element => {
  return (
    <MenuLink
      icon={<SvgVideoLibrary />}
      title={'My library'}
      url={LOOMS_PAGE}
      collapsed={isCollapsed}
      isMobileCollapsedNav={isMobileCollapsedNav}
      isReactRouterLink
      onClick={() => {
        analytics.track(NAVIGATION_ITEM_CLICKED, {
          primary_nav_item: 'library',
          secondary_nav_item: 'videos',
        });
      }}
    />
  );
};

export const MeetingsButton = ({
  isCollapsed,
  isMobileCollapsedNav,
  isNotViewer,
}: {
  isCollapsed: boolean;
  isMobileCollapsedNav: boolean;
  isNotViewer: boolean;
}): JSX.Element | null => {
  const showRewatchMeetings = useFeatureFlagValue(REWATCH_MEETINGS);

  if (showRewatchMeetings && isNotViewer) {
    return (
      <MenuLink
        icon={<SvgCalendar />}
        title="Meetings"
        url={MEETINGS_PAGE}
        collapsed={isCollapsed}
        isMobileCollapsedNav={isMobileCollapsedNav}
        isNew
        countColorScheme={{
          containerColor: 'backgroundSecondary',
          textColor: 'body',
        }}
        showNotificationDot={false}
        isReactRouterLink
        onClick={() => {
          analytics.track(NAVIGATION_ITEM_CLICKED, {
            primary_nav_item: 'my_meetings',
          });
        }}
      />
    );
  }

  return null;
};

export const NotificationsButton = ({
  isCollapsed,
  isMobileCollapsedNav,
}: {
  isCollapsed: boolean;
  isMobileCollapsedNav: boolean;
}): JSX.Element | null => {
  const { count } = useUnseenNotificationsCount();

  return (
    <MenuLink
      icon={<SvgBell />}
      title="Notifications"
      url={NOTIFICATIONS_PAGE}
      collapsed={isCollapsed}
      count={count}
      showNotificationDot
      isMobileCollapsedNav={isMobileCollapsedNav}
      isReactRouterLink
      onClick={() => {
        analytics.track(NAVIGATION_ITEM_CLICKED, {
          primary_nav_item: 'notifications',
        });
      }}
    />
  );
};

export const WatchLaterButton = ({
  isCollapsed,
  isMobileCollapsedNav,
}: {
  isCollapsed: boolean;
  isMobileCollapsedNav: boolean;
}): JSX.Element => {
  const watchLaterUnwatchedVideosCount =
    useWatchLaterListUnwatchedVideosCount() ?? 0;

  return (
    <MenuLink
      icon={<SvgWatchLater />}
      title="Watch later"
      url={WATCH_LATER_PAGE}
      collapsed={isCollapsed}
      isMobileCollapsedNav={isMobileCollapsedNav}
      count={watchLaterUnwatchedVideosCount}
      countColorScheme={{
        containerColor: 'highlight',
        textColor: 'body',
      }}
      showNotificationDot={false}
      isReactRouterLink
      onClick={() => {
        analytics.track(NAVIGATION_ITEM_CLICKED, {
          primary_nav_item: 'watch_later',
        });
      }}
    />
  );
};

export const HistoryButton = ({
  isCollapsed,
  isMobileCollapsedNav,
}: {
  isCollapsed: boolean;
  isMobileCollapsedNav: boolean;
}): JSX.Element => {
  return (
    <MenuLink
      icon={<SvgClock />}
      title="History"
      url={HISTORY_PAGE}
      collapsed={isCollapsed}
      isMobileCollapsedNav={isMobileCollapsedNav}
      isReactRouterLink
      onClick={() => {
        analytics.track(NAVIGATION_ITEM_CLICKED, {
          primary_nav_item: 'history',
        });
      }}
    />
  );
};

export const AdminManagementButton = ({
  isCollapsed,
  isMobileCollapsedNav,
}: {
  isCollapsed: boolean;
  isMobileCollapsedNav: boolean;
}): JSX.Element | null => {
  const { userRole, workspacePlan } = useGetRoleAndPlan();
  const isGlobalAdminViewEnabled = useFeatureFlagValue(
    FEATURE_GATES.ROLLOUT_GLOBAL_ADMIN_VIEW,
    ControlType.STATSIG_FEATURE_GATE
  );

  if (userRole !== ORG_ROLE_ADMIN) {
    return null;
  }
  if (workspacePlan !== 'enterprise') {
    return null;
  }

  if (!isGlobalAdminViewEnabled) {
    return null;
  }

  return (
    <MenuLink
      icon={<SvgGlobe />}
      title="Admin management"
      url={ADMIN_MANAGEMENT_PAGE}
      collapsed={isCollapsed}
      isMobileCollapsedNav={isMobileCollapsedNav}
      isReactRouterLink
      onClick={() => {
        analytics.track(NAVIGATION_ITEM_CLICKED, {
          primary_nav_item: 'admin_management',
        });
      }}
    />
  );
};

export const PlaygroundButton = ({
  isCollapsed,
  isMobileCollapsedNav,
}: {
  isCollapsed: boolean;
  isMobileCollapsedNav: boolean;
}): JSX.Element => {
  return (
    <MenuLink
      icon={<SvgSparkle />}
      title="Playground"
      url={PLAYGROUND_PAGE}
      collapsed={isCollapsed}
      isMobileCollapsedNav={isMobileCollapsedNav}
      isReactRouterLink
      onClick={() => {
        analytics.track(NAVIGATION_ITEM_CLICKED, {
          primary_nav_item: 'playground',
        });
      }}
    />
  );
};

export const EarnFreeVideosButton = ({
  shouldShowIncentives,
  isCollapsed,
  isMobileCollapsedNav,
}: {
  shouldShowIncentives: boolean;
  isCollapsed: boolean;
  isMobileCollapsedNav: boolean;
}): JSX.Element | null => {
  if (!shouldShowIncentives) {
    return null;
  }

  return (
    <MenuLink
      icon={<SvgPresent />}
      title="Earn free videos"
      url={INCENTIVES_PAGE}
      collapsed={isCollapsed}
      isMobileCollapsedNav={isMobileCollapsedNav}
      isReactRouterLink
      ftuxComponent={<IncentivesSideNavFtux />}
      onClick={() => {
        analytics.track(NAVIGATION_ITEM_CLICKED, {
          primary_nav_item: 'earn_free_videos',
        });
      }}
    />
  );
};

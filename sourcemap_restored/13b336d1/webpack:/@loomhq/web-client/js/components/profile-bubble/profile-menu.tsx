import { devToolsEnabled } from '@js/constants/devtools';

import { isDev } from '@js/constants/environment';

import {
  HEADER_UPGRADE_TEXT_CLICKED,
  NAVIGATION_ITEM_CLICKED,
  REQUEST_AI_MODAL_OPENED,
} from '@js/constants/events';

import { RequestPlanUpgradeLocations } from '@js/constants/requestPlanUpgradeLocations';

import {
  ADMIN_HUB_URI,
  ADMIN_PAGE,
  CHROME_EXT_WEBSTORE_URL,
  DESKTOP,
  MOBILE_ANDROID_APP,
  MOBILE_IOS_APP,
  MOBILE_WEB,
  PROFILE_PAGE,
  PLANS_AND_BILLING,
} from '@js/constants/routes';

import { usePaywallRequest } from '@js/actions/request-upgrade';
import { AtlassianPurchaseLoomAI } from '@js/common/atlassian-purchase-ai';
import { AtlassianManaged } from '@js/common/atlassian-workspace';
import { useGetWorkspaceBillingDetailsQuery } from '@js/common/billing/getWorkspaceBillingDetails.generated';
import { useCurrentUserSelector } from '@js/common/current-user';
import { MenuItemTooltip } from '@js/common/navigation/MenuItemTooltip';
import {
  MenuTextButton,
  MenuTextButtonProps,
} from '@js/common/navigation/MenuTextButton';
import { DarkModeToggle } from '@js/common/themes';
import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships';
import { CopiableText } from '@js/pages/admin/common/CopiableText';
import UserAvatar from '@js/components/user-avatar';
import FocusTrap from 'focus-trap-react';
import { useOnBusinessTrial } from '@js/hooks/eligibility/useOnBusinessTrial';
import { useIsAtlassianManagedWorkspace } from '@js/hooks/useIsAtlassianManagedWorkspace';

import {
  useGetMemberVideoLimits,
  useGetSelectedWorkspace,
  useGetUserRoleForSelectedWorkspace,
  useWorkspaceFreeRole,
} from '@js/hooks/workspace';
import React, { useCallback, useEffect } from 'react';

import { getUserAvatarThumb } from '@js/utilities/avatar';
import { useGetWorkspaceAggEntitlementsQuery } from '@js/utilities/billing/GetWorkspaceAGGEntitlements.generated';

import { isPureTrial } from '@js/utilities/billingAndPayments/billingDetailsUtil';

import { isAndroid, isIOS, isMobile } from '@js/utilities/device';

import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';

import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';

import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { getUpgradeType } from '@js/utilities/upgrades';

import { logoutUserWithRedirect } from '@js/utilities/user';

import {
  getDisplayNameFromGrants,
  getProductGrants,
} from '@loomhq/billing-core/utility';
import {
  Arrange,
  Button,
  Container,
  IconButton,
  Link,
  Spacer,
  Text,
  TextButton,
  Tooltip,
} from '@loomhq/lens';
import { SvgClose } from '@loomhq/lens/icons/close';
import { SvgExternalLink } from '@loomhq/lens/icons/external-link';
import { DARK_MODE_TOGGLE } from '@loomhq/shared-utilities/constants/featureFlag';
import {
  ORG_ROLE_ADMIN,
  ORG_ROLE_CREATOR_LITE,
} from '@loomhq/shared-utilities/constants/organizationRoles';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import { ADMIN } from '@loomhq/shared-utilities/constants/userRoles';
import {
  WORKSPACE_PLAN_BUSINESS,
  WORKSPACE_PLAN_STARTER_FREE,
} from '@loomhq/shared-utilities/constants/workspacePlans';
import { UPGRADE_TYPES } from '@loomhq/shared-utilities/constants/workspaceUpgradeRequests';
import { getRoleDisplayName } from '@loomhq/shared-utilities/utilities/membershipsUtils';

import { useDevTools } from '@js/components/devtools/devtools-store';
import { FeatureFlaggedComponent } from '@js/components/feature-flag-wrapper';

import { Addon } from '@js/globalTypes.generated';

import useClickOutside from '@js/hooks/useClickOutside';
import BillingButtonTooltipImg from '@assets/img/billing-button-tooltip.png';
import * as analytics from '@js/utilities/analytics';

import { useProfileMenu } from '../../contexts/ProfileMenuContext';
import { AsyncInsightsHub } from '../insights-hub/AsyncInsightsHub';
import { eoyTakeoverDataType } from '../insights-hub/end-of-year-insights/EndOfYearInsightsHub';
import { PurchaseLoomAI } from './PurchaseLoomAI';
import styles from './styles.module.css';
import { defaultProfileData, ProfileMenuItems } from './types';
import { useGetLegacyMigrationIsActive } from '@js/hooks/legacyMigration/useLegacyMigrationIsActive';
import {
  FEATURE_LOCKDOWN_UPGRADE_PLAN,
  getTooltipMessage,
} from '@js/utilities/featureLockdown';

const ACCOUNT_ITEM: ProfileMenuItems = {
  label: 'Account & preferences',
  href: PROFILE_PAGE,
  onClick: () => {
    analytics.track(NAVIGATION_ITEM_CLICKED, {
      primary_nav_item: 'avatar',
      secondary_nav_item: 'sign_out',
    });
  },
};

const BILLING_ITEM: ProfileMenuItems = {
  label: 'Billing',
  href: PLANS_AND_BILLING,
};

const LOG_OUT_ITEM: ProfileMenuItems = {
  label: 'Sign Out',
};

const ADMIN_ITEM: ProfileMenuItems = {
  label: 'Loommate portal',
  href: ADMIN_PAGE,
};

const DOWNLOAD_ITEMS: Array<ProfileMenuItems> = [
  {
    label: 'Install Chrome extension',
    href: CHROME_EXT_WEBSTORE_URL,
  },
  {
    label: 'Download desktop app',
    href: DESKTOP,
  },
];

const DOWNLOAD_MOBILE: ProfileMenuItems = { label: 'Download mobile app' };

const PROFILE_BUBBLE_LABEL = 'Profile and personal settings';

type BubbleMenuProps = {
  eoyTakeoverData: eoyTakeoverDataType | null;
};

const BubbleMenuWithoutFeatureWrapper = ({
  eoyTakeoverData,
}: BubbleMenuProps): JSX.Element | null => {
  const paywallRequest = usePaywallRequest();
  const workspace = useGetSelectedWorkspace();
  const role = workspace?.memberRole;

  const freeRole = useWorkspaceFreeRole();
  const memberVideoLimit = useGetMemberVideoLimits();
  const videoLimit = memberVideoLimit?.limit ?? 0;
  const videosRecorded = memberVideoLimit?.totalVideos ?? 0;
  const { data } = useGetWorkspaceBillingDetailsQuery({
    variables: {
      workspaceId: workspace.id,
    },
    skip: !workspace.id,
  });
  const billingDetails = data?.billing?.billing_details;
  const loomMasteredProduct = billingDetails?.plan?.product;
  const isAtlassianManagedWorkspace = useIsAtlassianManagedWorkspace();

  // Get billing URL for Atlassian managed workspace
  const { data: entitlementData, loading: entitlementLoading } =
    useGetWorkspaceAggEntitlementsQuery({
      variables: {
        workspaceId: workspace?.id,
      },
      skip: !workspace || !isAtlassianManagedWorkspace,
    });

  const entitlement =
    entitlementData?.getWorkspaceAGGEntitlements?.__typename ===
    'GetWorkspaceAGGEntitlementsPayload'
      ? entitlementData.getWorkspaceAGGEntitlements.entitlements[0]
      : null;
  const atlassianOrgId = entitlement?.orgId;
  const entitlementId = entitlement?.entitlementId;
  const isCollection = entitlement?.isCollection;
  const entitlementLoomProduct = entitlement?.currentLoomProductLevel;

  const grant = entitlementLoomProduct
    ? getProductGrants(Number(entitlementLoomProduct))
    : loomMasteredProduct
      ? getProductGrants(loomMasteredProduct)
      : null;

  const displayName = grant
    ? getDisplayNameFromGrants([grant])
    : getDisplayNameFromGrants([{ base: workspace.type }]);

  const billingUrl =
    atlassianOrgId != null && entitlementId != null
      ? `${ADMIN_HUB_URI}/billing/${atlassianOrgId}/entitlement/${entitlementId}`
      : null;

  // Managed workspace admins will see BILLING_ITEM_MANAGED instead of BILLING_ITEM
  const BILLING_ITEM_MANAGED: MenuTextButtonProps = {
    title: 'Billing',
    path: billingUrl ?? '',
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
        primary_nav_item: 'settings_billing',
      });
    },
  };

  const showBillingButton =
    isAtlassianManagedWorkspace && !entitlementLoading && billingUrl;

  const roleDisplayName = getRoleDisplayName(role ?? '', {
    hideViewer: false,
  });

  const { isProfileMenuOpen, setIsProfileMenuOpen, hideInsightsPanel } =
    useProfileMenu();

  const closeProfileBubble = useCallback(
    (targetClassName: any) => {
      if (setIsProfileMenuOpen) {
        setIsProfileMenuOpen(false, targetClassName);
      }
    },
    [setIsProfileMenuOpen]
  );

  const ref = useClickOutside(closeProfileBubble, undefined, true);

  const { featureLoadedRef } = useFeatureWrapper(ref);

  const openDevToolsModal = useDevTools(state => state.openDevToolsModal);
  const {
    avatars,
    id,
    firstName,
    lastName,
    email,
    role: currentUserRole,
  } = useCurrentUserSelector(user => user, defaultProfileData);

  const name: string =
    firstName && lastName ? `${firstName} ${lastName}`.trim() : email;

  const isLoomAdmin = currentUserRole === ADMIN;
  let videoId: string | null = null;

  if (isLoomAdmin) {
    const lastWordInPath = document.location.pathname
      .split('/')
      .at?.(-1) // find last path segment
      ?.split('-') // handle slug prefixes
      .at?.(-1);

    // does it look like a video ID?
    if (lastWordInPath?.match(/[0-9a-f]{32}/)) {
      videoId = lastWordInPath;
    }
  }

  const starterFree = workspace?.type === WORKSPACE_PLAN_STARTER_FREE;
  const business = workspace?.type === WORKSPACE_PLAN_BUSINESS;
  const creatorLite = role === ORG_ROLE_CREATOR_LITE;
  const admin = role === ORG_ROLE_ADMIN;
  const freeSeat = role === freeRole;
  const pureTrial = isPureTrial(billingDetails);
  const addOns = billingDetails?.add_ons ?? [];

  const addOnGrants = addOns.map(a => getProductGrants(a.price.product));
  const planGrants = billingDetails?.plan?.product
    ? getProductGrants(billingDetails.plan.product)
    : undefined;

  const aiAddOn = Boolean(
    addOnGrants.find(g => g.addon === Addon.Ai) ||
      planGrants?.addon === Addon.Ai
  );

  // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
  const displayPurchaseAIAddon =
    business && !aiAddOn && !pureTrial && !creatorLite;
  /**
   * Show upgrade prompt if:
   * 1. Not part of a TWC atlassian collection
   * 2. Starter Free plan
   * 3. Paid Business plan and user is creator lite
   * 4. Trialing business plan
   * 5. Free seat
   */
  const displayUpgradePrompt =
    !isCollection &&
    (starterFree ||
      (business && freeSeat) ||
      (business && pureTrial) ||
      freeSeat);

  if (!isMobile) {
    DOWNLOAD_MOBILE.href = MOBILE_WEB;
  } else if (isIOS) {
    DOWNLOAD_MOBILE.href = MOBILE_IOS_APP;
  } else if (isAndroid) {
    DOWNLOAD_MOBILE.href = MOBILE_ANDROID_APP;
  }

  /**
   * Internally sets the workspace memberships in the redux store
   */
  useGetWorkspaceMemberships();

  useEffect(() => {
    const onLogOutClick = (
      e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
    ) => {
      e.preventDefault();
      analytics.track(NAVIGATION_ITEM_CLICKED, {
        primary_nav_item: 'avatar',
        secondary_nav_item: 'sign_out',
      });
      logoutUserWithRedirect();
    };

    LOG_OUT_ITEM.onClick = onLogOutClick;
  }, []);

  useEffect(() => {
    function onKeydown(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        const target = e.target as HTMLButtonElement;

        e.preventDefault();

        closeProfileBubble(target?.className);
      }
    }

    document.addEventListener('keydown', onKeydown);

    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, [closeProfileBubble]);

  const getLoomAiOnClick = () => {
    admin
      ? paywallRequest('loom-ai')
      : paywallRequest('loom-ai', {
          analyticEvent: REQUEST_AI_MODAL_OPENED,
          source: RequestPlanUpgradeLocations.AI_PROFILE_DROPDOWN,
        });
  };

  // hack for Safari: prevent scrollbar from showing on the share page when the profile bubble is open
  const preventSharePageScroll = (preventScroll: boolean): void => {
    const sharePageContainer = document.getElementsByClassName(
      'sharePageContainer'
    )[0] as HTMLDivElement | undefined | null;

    if (sharePageContainer) {
      preventScroll
        ? (sharePageContainer.style.position = 'fixed')
        : (sharePageContainer.style.position = 'unset');
    }
  };

  if (!isProfileMenuOpen) {
    return null;
  }

  return (
    <FocusTrap
      active
      focusTrapOptions={{
        clickOutsideDeactivates: true,
        onActivate: () => preventSharePageScroll(true),
        onDeactivate: () => preventSharePageScroll(false),
      }}
    >
      <dialog
        open
        className={styles.bubbleMenuWrapper}
        ref={featureLoadedRef}
        aria-label={PROFILE_BUBBLE_LABEL}
      >
        <Container position="absolute" top={1.5} right={1.5} zIndex={2}>
          <IconButton
            altText="Close"
            icon={<SvgClose />}
            onClick={e => {
              closeProfileBubble((e?.target as HTMLInputElement)?.className);
            }}
          />
        </Container>
        <div className={styles.bubbleMenu}>
          <Arrange
            autoFlow="row"
            gap="small"
            justifyContent="center"
            justifyItems="center"
          >
            <UserAvatar
              isDecorativeImage={true}
              avatarSrc={getUserAvatarThumb(avatars)}
              name={name}
              size={6}
            />

            <div>
              <Text
                alignment="center"
                fontWeight="bold"
                hasEllipsis
                htmlTag="h1"
              >
                {name}
              </Text>
            </div>
            <Button
              htmlTag="a"
              href="/profile"
              onClick={() => {
                analytics.track(NAVIGATION_ITEM_CLICKED, {
                  primary_nav_item: 'avatar',
                  secondary_nav_item: 'my_profile',
                });
              }}
              size="small"
            >
              View or edit profile
            </Button>
          </Arrange>
          {(isLoomAdmin || isDev) && (
            <Spacer x="medium" top="small" bottom={1.5}>
              <Arrange autoFlow="row" gap="xsmall" justifyContent="stretch">
                <TextButton htmlTag="a" href={ADMIN_ITEM.href}>
                  <Text>{ADMIN_ITEM.label}</Text>
                </TextButton>

                <Spacer x={1.5}>
                  <Arrange gap="xsmall">
                    <CopiableText value={email} />
                    <Text color="bodyDimmed" size="body-sm">
                      Email: {email}
                    </Text>
                  </Arrange>
                  <Arrange gap="xsmall">
                    <CopiableText value={id.toString()} />
                    <Link
                      href={`/admin/users?id=${id}`}
                      target="_blank"
                      className={styles.linkNoUnderline}
                    >
                      <Text color="bodyDimmed" size="body-sm">
                        User ID: {id}{' '}
                        <span
                          role="img"
                          aria-label="User lookup in admin dashboard"
                        >
                          ↗
                        </span>
                      </Text>
                    </Link>
                  </Arrange>
                  {workspace?.id && (
                    <Arrange gap="xsmall">
                      <CopiableText value={workspace?.id.toString()} />
                      <Link
                        href={`/admin/workspaces/workspace-lookup/${workspace.id}`}
                        target="_blank"
                        className={styles.linkNoUnderline}
                      >
                        <Text color="bodyDimmed" size="body-sm">
                          Workspace ID: {workspace.id}{' '}
                          <span
                            role="img"
                            aria-label="Workspace lookup in admin dashboard"
                          >
                            ↗
                          </span>
                        </Text>
                      </Link>
                    </Arrange>
                  )}
                  {typeof videoId === 'string' && (
                    <Arrange gap="xsmall">
                      <CopiableText value={videoId} />
                      <Link
                        href={`/admin/videos/video-dive/${videoId}`}
                        target="_blank"
                        className={styles.linkNoUnderline}
                      >
                        <Text color="bodyDimmed" size="body-sm">
                          Video Dive{' '}
                          <span
                            role="img"
                            aria-label="Workspace lookup in admin dashboard"
                          >
                            ↗
                          </span>
                        </Text>
                      </Link>
                    </Arrange>
                  )}
                </Spacer>
              </Arrange>
            </Spacer>
          )}

          <Spacer x="large" y="medium">
            <Arrange gap="xsmall" columns="1fr" width="100%">
              {displayUpgradePrompt && <ProfileMenuUpgradePrompt />}
              <dl>
                <Arrange autoFlow="column" gap=".25em">
                  <dt>
                    <Text color="bodyDimmed">Current role:</Text>
                  </dt>
                  <dd>
                    <Text color="bodyDimmed">{roleDisplayName}</Text>
                  </dd>
                </Arrange>
                <Arrange autoFlow="column" gap=".25em">
                  <dt>
                    <Text color="bodyDimmed">Current plan:</Text>
                  </dt>
                  <dd>
                    <Text color="bodyDimmed">{displayName}</Text>
                  </dd>
                </Arrange>
              </dl>
              {videoLimit > 0 && (
                <Text color="bodyDimmed">
                  {videosRecorded}/{videoLimit} videos
                </Text>
              )}
            </Arrange>
          </Spacer>
          <AtlassianManaged
            LoomUI={
              displayPurchaseAIAddon ? (
                <Spacer x="medium" y="medium">
                  <PurchaseLoomAI
                    onClick={() => {
                      closeProfileBubble(undefined);
                      getLoomAiOnClick();
                    }}
                  />
                </Spacer>
              ) : null
            }
            AtlassianUI={
              <AtlassianPurchaseLoomAI
                isCollection={Boolean(isCollection)}
                onClick={() => {
                  closeProfileBubble(undefined);
                  getLoomAiOnClick();
                }}
              />
            }
          />
          <Spacer all="medium">
            <Arrange
              gap="small"
              autoFlow="row"
              htmlTag="ul"
              justifyContent="stretch"
            >
              <li>
                <Arrange justifyContent="stretch">
                  <TextButton
                    htmlTag="a"
                    href={ACCOUNT_ITEM.href}
                    onClick={ACCOUNT_ITEM.onClick}
                  >
                    <Text>{ACCOUNT_ITEM.label}</Text>
                  </TextButton>
                </Arrange>
              </li>
              {admin && !isAtlassianManagedWorkspace ? (
                <li>
                  <Arrange justifyContent="stretch">
                    <TextButton htmlTag="a" href={BILLING_ITEM.href}>
                      <Text>{BILLING_ITEM.label}</Text>
                    </TextButton>
                  </Arrange>
                </li>
              ) : null}
              {admin && isAtlassianManagedWorkspace && showBillingButton ? (
                <MenuTextButton item={BILLING_ITEM_MANAGED} />
              ) : null}
              {DOWNLOAD_ITEMS.map(item => (
                <li key={item.label}>
                  <Arrange justifyContent="stretch">
                    <TextButton htmlTag="a" href={item.href}>
                      <Text>{item.label}</Text>
                    </TextButton>
                  </Arrange>
                </li>
              ))}
              {(!isMobile || isIOS || isAndroid) && (
                <li>
                  <Arrange justifyContent="stretch">
                    <TextButton htmlTag="a" href={DOWNLOAD_MOBILE?.href}>
                      <Text>{DOWNLOAD_MOBILE.label}</Text>
                    </TextButton>
                  </Arrange>
                </li>
              )}

              <FeatureFlaggedComponent
                flag={DARK_MODE_TOGGLE}
                activationValues={[true]}
              >
                <DarkModeToggle />
              </FeatureFlaggedComponent>
            </Arrange>
          </Spacer>
          <Spacer all="medium">
            <Arrange justifyContent="stretch">
              <TextButton onClick={LOG_OUT_ITEM?.onClick}>
                <Text>{LOG_OUT_ITEM.label}</Text>
              </TextButton>
            </Arrange>
          </Spacer>
          {devToolsEnabled && (
            <Spacer all="medium">
              <Arrange justifyContent="stretch">
                <TextButton onClick={() => openDevToolsModal()}>
                  <Text>Open devtools</Text>
                </TextButton>
              </Arrange>
            </Spacer>
          )}
        </div>
        {hideInsightsPanel ? null : (
          <AsyncInsightsHub eoyTakeoverData={eoyTakeoverData} />
        )}
      </dialog>
    </FocusTrap>
  );
};

/**
 * Do not add logic is unrelated to upgrade prompts,
 * Avoid adding logic here.
 *
 */
function ProfileMenuUpgradePrompt() {
  const paywallRequest = usePaywallRequest();
  const workspace = useGetSelectedWorkspace();
  const pureBusinessTrial = useOnBusinessTrial();
  const userRole = useGetUserRoleForSelectedWorkspace();
  const isLegacyMigrationActive = useGetLegacyMigrationIsActive();

  const upgradeType = getUpgradeType({
    selectedWorkspace: workspace,
    minPlanForFeature: WORKSPACE_PLAN_BUSINESS,
    pureTrial: pureBusinessTrial,
  });

  const upgradeCopy =
    upgradeType === UPGRADE_TYPES.ROLE
      ? 'Request role upgrade'
      : userRole === ORG_ROLE_ADMIN
        ? 'Upgrade plan'
        : 'Request plan upgrade';

  const upgradeOnClick = () => {
    analytics.track(NAVIGATION_ITEM_CLICKED, {
      primary_nav_item: 'avatar',
      secondary_nav_item: 'upgrade',
    });
    paywallRequest('business', {
      analyticEvent: HEADER_UPGRADE_TEXT_CLICKED,
      source: RequestPlanUpgradeLocations.PROFILE_DROPDOWN,
    });
  };

  return (
    <Tooltip
      isDisabled={!isLegacyMigrationActive}
      content={getTooltipMessage({
        featureName: FEATURE_LOCKDOWN_UPGRADE_PLAN,
      })}
    >
      <TextButton
        isDisabled={isLegacyMigrationActive}
        type="button"
        data-testid="profile-menu-upgrade-plan-button"
        onClick={upgradeOnClick}
        offsetSide="left"
      >
        <Text color="primary" fontWeight="bold">
          {upgradeCopy}
        </Text>
      </TextButton>
    </Tooltip>
  );
}

export const BubbleMenu = (props: BubbleMenuProps): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.Profile}
      errorType={ErrorBoundaryTypes.SILENT}
      additionalLoggingValues={{ version: 'profile bubble menu' }}
    >
      <BubbleMenuWithoutFeatureWrapper {...props} />
    </FeatureWrapper>
  );
};

import {
  GLOBAL_CONTENT_LIMIT_BANNER_UPGRADE_CLICKED,
  STORAGE_INCENTIVE_INVITE_TEAMMATES_CTA_CLICKED,
} from '@js/constants/events';

import { usePaywallRequest } from '@js/actions/request-upgrade';
import { TEAM_INVITE_MODAL } from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import { useInvitationCapabilities } from '@js/hooks/useInvitationCapabilities';
import { useStorageIncentiveEligibility } from '@js/hooks/useStorageIncentiveEligibility';
import { useGetMemberVideoLimits } from '@js/hooks/workspace';
import React from 'react';

import { Button, Container, Icon, Split, Text } from '@loomhq/lens';
import { SvgAlertTriangle } from '@loomhq/lens/icons/alert-triangle';

import * as analytics from '../../../utilities/analytics';
import { useBannerVisibility } from '../useBannerVisibility';

const GLOBAL_CONTENT_LIMIT_BANNER = 'Global Content Limit Banner';

type GlobalContentLimitBannerProps = {
  reportBannerVisibility: (component: JSX.Element, isVisible: boolean) => void;
};

export function GlobalContentLimitBanner({
  reportBannerVisibility,
}: GlobalContentLimitBannerProps): JSX.Element | null {
  const { openModal } = useModals();

  const { showInviteButton } = useInvitationCapabilities();

  const memberVideoLimits = useGetMemberVideoLimits();
  const hasStorageIncentive = useStorageIncentiveEligibility();

  const showGlobalContentLimitBanner =
    hasStorageIncentive === true &&
    memberVideoLimits?.remainingVideos &&
    memberVideoLimits.remainingVideos <= 0;
  const paywallRequest = usePaywallRequest();

  useBannerVisibility(
    Boolean(showGlobalContentLimitBanner),
    reportBannerVisibility,
    <GlobalContentLimitBanner reportBannerVisibility={reportBannerVisibility} />
  );

  if (!showGlobalContentLimitBanner) {
    return null;
  }

  const isOnPlanAndBilling =
    location.pathname === '/settings/workspace' && location.hash === '#plans';

  function handleUpgrade() {
    if (isOnPlanAndBilling) {
      const element = document.getElementById('allPlansSectionTitle');

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      paywallRequest('business', {
        analyticEvent: GLOBAL_CONTENT_LIMIT_BANNER_UPGRADE_CLICKED,
      });
    }
  }

  function handleInviteTeammates() {
    openModal({ modalType: TEAM_INVITE_MODAL });

    analytics.track(STORAGE_INCENTIVE_INVITE_TEAMMATES_CTA_CLICKED, {
      source: GLOBAL_CONTENT_LIMIT_BANNER,
    });
  }

  return (
    <BannerContainer>
      <Split justifyContent="center" gap="medium">
        <Split gap="xsmall">
          <Icon
            icon={<SvgAlertTriangle />}
            size="large"
            color="blurpleStrong"
          />
          <Text color="blurpleStrong">
            <b>
              You&apos;ve reached your {memberVideoLimits.limit} video limit.
            </b>{' '}
            {showInviteButton
              ? 'Invite teammates or upgrade to store more.'
              : 'Upgrade to store more.'}
          </Text>
        </Split>

        {showInviteButton ? (
          <Button type="button" onClick={handleInviteTeammates}>
            Invite Teammates
          </Button>
        ) : null}
        <Button type="button" variant="primary" onClick={handleUpgrade}>
          Upgrade Plan
        </Button>
      </Split>
    </BannerContainer>
  );
}

const BannerContainer = ({ children }) => (
  <Container
    // TODO(lens): Add theme as option for components
    className="theme-light"
    width="100%"
    position="sticky"
    top={0}
    paddingX="2rem"
    paddingY="medium"
    backgroundColor="highlight"
    zIndex={5}
  >
    {children}
  </Container>
);

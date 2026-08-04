import { RequestPlanUpgradeLocations } from '@js/constants/requestPlanUpgradeLocations';

import { HeaderUpgradeButton } from '@js/components/HeaderUpgradeButton';
import { useFeatureFlagValue } from '@js/hooks/featureFlag';
import { useUserProperty } from '@js/hooks/user/useUserProperty';

import React from 'react';

import { Container, Split, Text, Arrange, Loader } from '@loomhq/lens';

import {
  AI,
  AI_DEFAULT_LIMIT,
} from '@loomhq/shared-utilities/constants/limits';
import { AI_AUTO_TITLE_ACCESS } from '@loomhq/shared-utilities/constants/scopes';
import {
  ControlType,
  EXPERIMENTS,
  FEATURE_GATES,
  FlagReturnValues,
} from '@loomhq/shared-utilities/constants/statsig';
import { UserPropertyEnum } from '@loomhq/shared-utilities/constants/userProperties';

import { useHasScope } from '../../../hooks/useHasScopes';
import { useGetSelectedWorkspace } from '../../../hooks/workspace';
import { useBannerVisibility } from '../useBannerVisibility';
import { useGetWorkspaceBillingDetailsQuery } from '../../billing/getWorkspaceBillingDetails.generated';
import {
  WORKSPACE_PLAN_BUSINESS,
  WORKSPACE_PLAN_STARTER_FREE,
} from '@loomhq/shared-utilities/constants/workspacePlans';
import { getProductGrants } from '@loomhq/billing-core/utility';
import { useGetAiTriesCountSubscription } from './GetAiTriesCount.generated';

type UsageBasedAiTriesBannerProps = {
  reportBannerVisibility: (component: JSX.Element, isVisible: boolean) => void;
  useSubscription?: boolean; // New prop to control data source
};

const UsageBasedAiTriesBanner = ({
  reportBannerVisibility,
  useSubscription = false,
}: UsageBasedAiTriesBannerProps): JSX.Element | null => {
  const hasAiScope = useHasScope(AI_AUTO_TITLE_ACCESS);
  const workspace = useGetSelectedWorkspace();
  const workspaceId = workspace?.id;
  const memberLimits = workspace?.memberLimits ?? {};
  const staticAiTries = memberLimits[AI] ?? AI_DEFAULT_LIMIT;

  const { data: subscriptionData, loading } = useGetAiTriesCountSubscription({
    variables: { workspaceId },
    skip: !workspaceId || !useSubscription,
  });

  // Biz+AI tries are base 1 indexed, so we subtract 1 to get the remaining tries
  // When Biz+AI tries hit 0, user has already lost access to Biz+AI features
  const AiTriesLeft = subscriptionData?.aiTriesCount?.aiTries
    ? subscriptionData?.aiTriesCount?.aiTries - 1
    : staticAiTries - 1;

  const usageBizAiTrialVariant = useFeatureFlagValue(
    EXPERIMENTS.EXP_USAGE_BIZ_AI_TRIAL,
    ControlType.STATSIG_EXPERIMENT
  );
  const { value: enteredUsageBizAiTrial } = useUserProperty(
    UserPropertyEnum.ENTERED_USAGE_BIZ_AI_TRIAL
  );
  const isEligibleVariant =
    usageBizAiTrialVariant === FlagReturnValues.VARIANT_2;

  const showBanner: boolean =
    !hasAiScope &&
    AiTriesLeft > 0 &&
    enteredUsageBizAiTrial !== null &&
    isEligibleVariant;

  useBannerVisibility(
    showBanner,
    reportBannerVisibility,
    <UsageBasedAiTriesBanner
      reportBannerVisibility={reportBannerVisibility}
      useSubscription={useSubscription}
    />
  );

  if (!showBanner) {
    return null;
  }

  return (
    <BannerContainer>
      <Split justifyContent="center" gap="medium">
        <Split gap="xsmall">
          {useSubscription && loading ? (
            <Arrange gap="medium">
              <Loader size="medium" />
            </Arrange>
          ) : (
            <>
              {AiTriesLeft === 1 ? (
                <Text color="blurpleStrong">
                  <b>You have 1 AI video remaining in your free trial.</b>{' '}
                </Text>
              ) : (
                <Text color="blurpleStrong">
                  <b>
                    You have {AiTriesLeft} AI videos remaining in your free
                    trial.
                  </b>{' '}
                </Text>
              )}
              <Text>Upgrade for unlimited access.</Text>
              <div data-testid="upgrade-button">
                <HeaderUpgradeButton
                  source={RequestPlanUpgradeLocations.USAGE_BASED_BANNER}
                />
              </div>
            </>
          )}
        </Split>
      </Split>
    </BannerContainer>
  );
};

export const BannerContainer = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <Container
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

const Eligibility = ({ children }) => {
  const workspace = useGetSelectedWorkspace();
  const { data, loading } = useGetWorkspaceBillingDetailsQuery({
    variables: { workspaceId: workspace.id },
    skip: !workspace.id,
  });
  const allowProvision = useFeatureFlagValue(
    FEATURE_GATES.LOOM_ALLOW_PROVISIONING_FOR_ATLASSIAN_WORKSPACE,
    ControlType.STATSIG_FEATURE_GATE
  );

  if (loading) {
    return null;
  }

  if (!workspace.id) {
    return null;
  }

  // this should be removed if the experiment is successful and we want to enable this as the standard behavior
  // https://useloom.atlassian.net/browse/LB-694
  if (!allowProvision && workspace.isAtlassianMastered) {
    return null;
  }

  if (workspace.type === WORKSPACE_PLAN_STARTER_FREE) {
    return children;
  }

  if (workspace.type === WORKSPACE_PLAN_BUSINESS) {
    const billing = data?.billing?.billing_details;

    const addOn = Boolean(billing?.add_ons?.length);
    const grants = billing?.plan?.product
      ? getProductGrants(billing?.plan?.product)
      : null;

    if (!addOn && grants?.base === WORKSPACE_PLAN_BUSINESS && !grants?.addon) {
      return children;
    }

    return null;
  }

  return null;
};

export const UsageBasedBanner = ({
  reportBannerVisibility,
}: UsageBasedAiTriesBannerProps): JSX.Element | null => {
  const isSharePage = window.location.pathname.includes('share');

  return (
    <Eligibility>
      <UsageBasedAiTriesBanner
        reportBannerVisibility={reportBannerVisibility}
        useSubscription={isSharePage} // Use subscription only on share pages
      />
    </Eligibility>
  );
};

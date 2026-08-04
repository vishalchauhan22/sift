import { RequestPlanUpgradeLocations } from '@js/constants/requestPlanUpgradeLocations';

import { useLoomAiPaywallClickHandler } from '@js/common/use-loom-ai-paywall-click-handler';
import React from 'react';

import {
  Align,
  Arrange,
  Container,
  Icon,
  Logo,
  LogoLoader,
  Text,
} from '@loomhq/lens';

import { SvgChevronRight } from '@loomhq/lens/icons/chevron-right';

import { useHasAIFeatureAccess } from '@js/hooks/useHasAIFeatureAccess';
import { useIsTrialingAIAddOn } from '@js/hooks/useIsTrialingAIAddOn';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';
import {
  AI_AUTO_CHAPTERING_ACCESS,
  AI_AUTO_SUMMARIES_ACCESS,
  AI_AUTO_TITLE_ACCESS,
  AI_FILLER_WORD_REMOVAL,
} from '@loomhq/shared-utilities/constants/scopes';
import { useGetLoomAiPanelBillingDataQuery } from './getLoomAiPanelBillingData.generated';
import $ from './styles.module.css';

export type LoomAiPanelVariant =
  | 'ai-loading'
  | 'ai'
  | 'ai-trial'
  | 'no-ai-access'
  | 'ai-not-available'
  | 'extra-ai-tries';

// This component ensures that we have a consistent height for most of the header options
const GeneralHeaderContainer = ({ children }) => {
  return (
    <Container height={10} paddingX="small">
      <Align alignment="centerLeft">{children}</Align>
    </Container>
  );
};

const AiLoadingContent = () => {
  return (
    <GeneralHeaderContainer>
      <Arrange columns={['1fr', 'auto']} width="100%">
        <Arrange autoFlow="row">
          <Text size="body-lg" fontWeight="bold">
            Loom AI is generating...
          </Text>

          <Text size="body-sm" color="bodyDimmed">
            This usually takes a few seconds
          </Text>
        </Arrange>

        <LogoLoader
          animation="spin 2s infinite steps(43) alternate"
          brand="ai"
        />
      </Arrange>
    </GeneralHeaderContainer>
  );
};

export const AiContentInnerText = (): JSX.Element => {
  return (
    <Arrange gap="xsmall">
      <Text size="body-lg">Powered by</Text>
      <Text size="body-lg" fontWeight="bold">
        {' '}
        Loom AI
      </Text>
      <Align alignment="topCenter">
        <Logo brand="ai" maxWidth={1.5} variant="symbol" />
      </Align>
    </Arrange>
  );
};

const AiContent = () => {
  return (
    <GeneralHeaderContainer>
      <AiContentInnerText />
    </GeneralHeaderContainer>
  );
};

const AiTrialContent = () => {
  const { onClick: upgradeOnClick } = useLoomAiPaywallClickHandler(
    RequestPlanUpgradeLocations.AI_SIDEBAR_CTA
  );
  return (
    <GeneralHeaderContainer>
      <Arrange autoFlow="row">
        <Arrange gap="xsmall">
          <Text size="body-lg">Powered by</Text>
          <Text size="body-lg" fontWeight="bold">
            {' '}
            Loom AI
          </Text>
          <Align alignment="topCenter">
            <Logo brand="ai" maxWidth={1.5} variant="symbol" />
          </Align>
        </Arrange>

        <Text size="body-sm" color="bodyDimmed">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,  @atlassian/a11y/interactive-element-not-keyboard-focusable, jsx-a11y/no-static-element-interactions*/}
          <span className={$.upgradeLink} onClick={upgradeOnClick}>
            Upgrade now
          </span>{' '}
          to keep access to AI and editing features
        </Text>
      </Arrange>
    </GeneralHeaderContainer>
  );
};

// This component is not wrapped in GeneralHeaderContainer because it is a unique and larger button
// children = subtext content
const GetLoomAiUpgradeHeaderButton = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { onClick: upgradeOnClick } = useLoomAiPaywallClickHandler(
    RequestPlanUpgradeLocations.AI_SIDEBAR_CTA
  );
  return (
    <Container paddingY="medium">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,  @atlassian/a11y/interactive-element-not-keyboard-focusable, jsx-a11y/interactive-supports-focus */}
      <div
        className={$.upgradeHeaderButton}
        role="button"
        onClick={upgradeOnClick}
      >
        <Arrange gap="large" justifyContent="space-between">
          <Arrange autoFlow="row" gap="xsmall">
            <Arrange gap="xsmall">
              <Text size="heading-sm" fontWeight="bold">
                Get Loom Business + AI
              </Text>
              <Align alignment="topCenter">
                <Logo brand="ai" maxWidth={1.5} variant="symbol" />
              </Align>
            </Arrange>

            {children}
          </Arrange>
          <Icon icon={<SvgChevronRight />} />
        </Arrange>
      </div>
    </Container>
  );
};

const ExtraAiTriesContent = () => {
  return (
    <GetLoomAiUpgradeHeaderButton>
      <Arrange autoFlow="row">
        <Text size="body-sm" color="bodyDimmed">
          Try out Loom AI on your next few videos.
        </Text>
        <Text size="body-sm" color="primary">
          Upgrade to keep access
        </Text>
      </Arrange>
    </GetLoomAiUpgradeHeaderButton>
  );
};

// This component is not wrapped in GeneralHeaderContainer because it is a unique and larger button
const NoAiAccessContent = () => {
  return (
    <GetLoomAiUpgradeHeaderButton>
      <Text size="body-sm" color="bodyDimmed">
        Create better videos with AI-powered titles, editing, workflows, and
        meeting recaps. <span className={$.upgradeLink}>Upgrade now</span>{' '}
      </Text>
    </GetLoomAiUpgradeHeaderButton>
  );
};

const AiNotAvailableContent = () => {
  return (
    <GeneralHeaderContainer>
      <Arrange autoFlow="row">
        <Text fontWeight="bold">Loom AI not available on this video</Text>

        <Text size="body-sm" color="bodyDimmed">
          Some videos are not eligible for AI features. If you believe this was
          an error, please contact support.
        </Text>
      </Arrange>
    </GeneralHeaderContainer>
  );
};

export const LoomAiPanel = ({
  aiStatus,
}: {
  aiStatus: ReturnType<typeof selectAiStatus>;
}): JSX.Element => {
  const workspace = useGetSelectedWorkspace();
  const { data: billingData, loading: billingDataLoading } =
    useGetLoomAiPanelBillingDataQuery({
      variables: {
        workspaceId: workspace?.id,
      },
      skip: !workspace?.id,
      onError: error => {
        // handled by the feature wrapper
        throw error;
      },
      onCompleted: data => {
        if (data?.getWorkspaceBillingDetails?.__typename !== 'BillingEntity') {
          throw new Error('Billing details not found');
        }
      },
    });

  const isTrialing = React.useMemo(
    () =>
      billingData?.getWorkspaceBillingDetails?.billing_details?.plan
        ?.pure_trial ?? false,
    [billingData]
  );

  const hasAiTitleScope = useHasAIFeatureAccess(AI_AUTO_TITLE_ACCESS);
  const hasAiSummaryScope = useHasAIFeatureAccess(AI_AUTO_SUMMARIES_ACCESS);
  const hasAiChaptersScope = useHasAIFeatureAccess(AI_AUTO_CHAPTERING_ACCESS);
  const hasFillerWordsAndSilenceRemovalScope = useHasAIFeatureAccess(
    AI_FILLER_WORD_REMOVAL
  );
  const hasAnyAutoAppliedAiScope =
    hasAiTitleScope || hasAiSummaryScope || hasAiChaptersScope;
  const hasAnyAiScope =
    hasAnyAutoAppliedAiScope || hasFillerWordsAndSilenceRemovalScope;
  const hasAiTries = useIsTrialingAIAddOn();

  const variant = getLoomAiPanelVariant({
    isTrialing,
    hasAnyAiScope,
    aiStatus,
    hasAiTries,
  });

  const loading = variant === 'ai-loading' || billingDataLoading;

  return (
    <div className={$.headerBackground}>
      {loading && <AiLoadingContent />}
      {variant === 'ai' && <AiContent />}
      {variant === 'ai-trial' && <AiTrialContent />}
      {variant === 'extra-ai-tries' && <ExtraAiTriesContent />}
      {variant === 'no-ai-access' && <NoAiAccessContent />}
      {variant === 'ai-not-available' && <AiNotAvailableContent />}
    </div>
  );
};

type AiStatus = 'loading' | 'success' | 'not-available';

export const selectAiStatus = ({
  isAiGenerating,
  aiHasError,
  transcriptInProgress,
  transcriptUnsuccessful,
  transcriptRegenerating,
}: {
  isAiGenerating: boolean;
  aiHasError: boolean;
  transcriptInProgress: boolean;
  transcriptUnsuccessful: boolean;
  transcriptRegenerating: boolean;
}): AiStatus => {
  const transcriptInitiallyInProgress =
    transcriptInProgress && !transcriptRegenerating;
  const isLoading = isAiGenerating || transcriptInitiallyInProgress;

  if (isLoading) {
    return 'loading';
  }

  const isNotAvailable = aiHasError || transcriptUnsuccessful;

  if (isNotAvailable) {
    return 'not-available';
  }

  return 'success';
};

export const getLoomAiPanelVariant = ({
  isTrialing,
  hasAnyAiScope,
  aiStatus,
  hasAiTries = false,
}: {
  isTrialing: boolean;
  hasAnyAiScope: boolean;
  aiStatus: AiStatus;
  hasAiTries: boolean;
}): LoomAiPanelVariant => {
  if (!hasAnyAiScope && !hasAiTries) {
    return 'no-ai-access';
  }
  if (aiStatus === 'loading') {
    return 'ai-loading';
  }
  if (aiStatus === 'not-available') {
    return 'ai-not-available';
  }
  if (isTrialing) {
    return 'ai-trial';
  }
  if (hasAiTries) {
    return 'extra-ai-tries';
  }
  return 'ai';
};

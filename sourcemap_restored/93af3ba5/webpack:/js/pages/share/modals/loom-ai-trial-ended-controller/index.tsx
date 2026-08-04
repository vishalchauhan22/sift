import { RequestPlanUpgradeLocations } from '@js/constants/requestPlanUpgradeLocations';

import cn from 'classnames';
import { LoomAiAddonPurchaseCta } from '@js/common/loom-ai-add-on-purchase-cta';
import { LoomAiBubble as Bubble } from '@js/common/loom-ai-bubble';
import FtuxWrapper from '@js/components/ftux/ftux-wrapper';
import { useOnDismissFtux } from '@js/hooks/ftux';
import { useHasAIFeatureAccess } from '@js/hooks/useHasAIFeatureAccess';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';
import React, { useEffect, useState } from 'react';
import * as analytics from '@js/utilities/analytics';

import { getProductGrants } from '@loomhq/billing-core/utility';
import {
  Align,
  Arrange,
  Container,
  Logo,
  Modal,
  Text,
  Spacer,
} from '@loomhq/lens';

import { AI } from '@loomhq/shared-utilities/constants/limits';
import {
  ORG_ROLE_CREATOR_LITE,
  ORG_ROLE_ADMIN,
} from '@loomhq/shared-utilities/constants/organizationRoles';
import { SALES_SUPPORT_TYPE_LED } from '@loomhq/shared-utilities/constants/salesSupportTypes';
import { UserPropertyEnum } from '@loomhq/shared-utilities/constants/userProperties';
import {
  WORKSPACE_PLAN_STARTER_FREE,
  WORKSPACE_PLAN_ENTERPRISE,
} from '@loomhq/shared-utilities/constants/workspacePlans';

import { Addon } from '@js/globalTypes.generated';

import styles from './styles.module.css';

import { useGetAiTrialDataQuery } from './GetAiTrialData.generated';

const LOOM_AI_TRIAL_ENDED_FTUX_POPUP_IMPRESSION =
  'loom_ai_trial_ended_popup_impression';
const LOOM_AI_TRIAL_ENDED_FTUX_DISMISS_CLICK =
  'loom_ai_trial_ended_dismiss_click';

interface Props {
  variant: 'ai-limit';
  isOpen: boolean;
  purchaseType:
    | 'sales-led'
    | 'add-on-only'
    | 'with-base-plan'
    | 'has-ai-addon'
    | 'request-ai';
}

const LoomAiTrialEndedModal = ({
  variant = 'ai-limit',
  isOpen: isPopoverOpen,
  purchaseType: purchaseType,
}: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(isPopoverOpen);
  const onDismissFtux = useOnDismissFtux();
  const workspace = useGetSelectedWorkspace();

  useEffect(() => {
    analytics.track(LOOM_AI_TRIAL_ENDED_FTUX_POPUP_IMPRESSION, {
      purchase_type: purchaseType,
      workspace_type: workspace?.type,
    });
  }, [purchaseType, workspace]);

  const onCloseClick = () => {
    setIsOpen(false);
    onDismissFtux(UserPropertyEnum.LOOM_AI_TRIAL_ENDED_FTUX);
    analytics.track(LOOM_AI_TRIAL_ENDED_FTUX_DISMISS_CLICK);
  };

  const title =
    variant === 'ai-limit' ? (
      <Arrange gap="xsmall" justifyContent="center" autoFlow="row">
        <Arrange>
          <Text
            size="heading-md"
            fontWeight="bold"
            alignment="center"
            color="body"
            noWrap
          >
            Your Loom Business + AI
          </Text>
          <Container htmlTag="span" position="relative" top="-5px">
            <Logo brand="ai" maxWidth={2} variant="symbol" />
          </Container>
        </Arrange>

        <Text
          size="heading-md"
          fontWeight="bold"
          alignment="center"
          color="body"
          noWrap
        >
          trial is ending
        </Text>
      </Arrange>
    ) : (
      <Text
        size="heading-md"
        fontWeight="bold"
        alignment="center"
        color="body"
        noWrap
      >
        Your Loom AI access has ended
      </Text>
    );

  const description =
    variant === 'ai-limit'
      ? 'Enjoy Loom Business + AI features for one more time on this video. Upgrade to get unlimited access.'
      : 'Upgrade to get unlimited access to Loom AI.';

  return (
    <Container position="relative" zIndex={1000}>
      <FtuxWrapper name={UserPropertyEnum.LOOM_AI_TRIAL_ENDED_FTUX}>
        <Modal
          isOpen={isOpen}
          onCloseClick={onCloseClick}
          noPadding
          data-lens-theme="dark"
          maxWidth={100}
        >
          <Background>
            <Spacer top="medium" />
            <div>{title}</div>
            <Container width="50%" margin="auto">
              <Text alignment="center" color="body">
                {description}
              </Text>
            </Container>
            <Align alignment="center">
              <LoomAiAddonPurchaseCta
                cta="Upgrade"
                purchaseType={purchaseType}
                buttonVariant="primary"
                onCloseClick={async () => {
                  await onDismissFtux(
                    UserPropertyEnum.LOOM_AI_TRIAL_ENDED_FTUX
                  );
                }}
                source={RequestPlanUpgradeLocations.AI_TRIAL_ENDED_MODAL}
              />
            </Align>
          </Background>
        </Modal>
      </FtuxWrapper>
    </Container>
  );
};

const Background = ({ children }): JSX.Element => (
  <Container
    backgroundColor="#2B1C50"
    padding="xlarge"
    minHeight="375px"
    position="relative"
    overflow="hidden"
  >
    <Container position="absolute" top="0" left="0" right="0" bottom="0">
      <Bubble size={20} position={[-100, 100]} />
      <Bubble size={18} position={[-6, -152]} />
      <Bubble size={6} position={[92, -20]} />
      <Bubble size={2.5} position={[72, 68]} />
    </Container>
    <Align alignment="center">
      <div className={cn(styles.content)}>{children}</div>
    </Align>
  </Container>
);

export const LoomAiTrialEndedController = (): JSX.Element | null => {
  // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
  const hasAIAccess = useHasAIFeatureAccess();
  const workspace = useGetSelectedWorkspace();

  const { data, loading: fetchingBilling } = useGetAiTrialDataQuery({
    variables: {
      workspaceId: workspace?.id,
    },
    skip: !workspace?.id,
  });

  const billing = data?.billing?.billing_details;

  const workspaceType = workspace?.type;
  const pureTrial = Boolean(billing?.plan?.pure_trial);
  const salesLed =
    workspace?.organization_properties?.salesSupportType ===
    SALES_SUPPORT_TYPE_LED;

  const starterFree = workspaceType === WORKSPACE_PLAN_STARTER_FREE;
  const enterprise = workspaceType === WORKSPACE_PLAN_ENTERPRISE;
  const isEnterpriseLike = salesLed || enterprise;
  const addOns = billing?.add_ons ?? [];
  const aiAddOn = addOns
    ? addOns.find(a => getProductGrants(a.price.product).addon === Addon.Ai)
    : undefined;

  const shouldRequestRoleUpgrade =
    aiAddOn && workspace?.memberRole === ORG_ROLE_CREATOR_LITE;
  const shouldRequestPlanUpgrade =
    !aiAddOn && workspace?.memberRole !== ORG_ROLE_ADMIN;
  const shouldRequest = shouldRequestRoleUpgrade || shouldRequestPlanUpgrade;

  let purchaseType;

  switch (true) {
    case shouldRequest:
      purchaseType = 'request-ai';
      break;
    case isEnterpriseLike:
      purchaseType = 'sales-led';
      break;
    case starterFree || pureTrial:
      purchaseType = 'with-base-plan';
      break;
    default:
      purchaseType = 'add-on-only';
      break;
  }

  const memberLimits = workspace?.memberLimits ?? {};
  const storedAiLimit = memberLimits[AI] ?? 0;
  const displayedAiLimit = storedAiLimit - 1;
  const AiLastTry = Boolean(displayedAiLimit === 1);

  const displayAiLimitEnded =
    hasAIAccess &&
    !aiAddOn && // if user's workspace bought AI add-on, don't show this modal
    AiLastTry;

  const displayModal = displayAiLimitEnded || false;

  const loading = !workspace || fetchingBilling;

  if (loading || !displayModal) {
    return null;
  }

  return (
    <LoomAiTrialEndedModal
      variant="ai-limit"
      isOpen={displayModal}
      purchaseType={purchaseType}
    />
  );
};

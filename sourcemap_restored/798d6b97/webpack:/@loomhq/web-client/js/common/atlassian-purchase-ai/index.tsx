import { useCurrentUserSelector } from '@js/common/current-user';

import { hasAnyAiScope } from '@js/common/current-user/schema/getLoomSsrUserCompat/hasAnyAiScope';

import React from 'react';

import {
  Arrange,
  Container,
  Logo,
  Spacer,
  Text,
  TextButton,
} from '@loomhq/lens';

import {
  WORKSPACE_PLAN_BUSINESS,
  WORKSPACE_PLAN_ENTERPRISE,
  WORKSPACE_PLAN_STARTER_FREE,
} from '@loomhq/shared-utilities/constants/workspacePlans';

import { useGetSelectedWorkspace } from '../../hooks/workspace-basic';

interface Props {
  isCollection: boolean;
  onClick: () => void;
}

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const AtlassianPurchaseLoomAI = ({
  isCollection,
  onClick,
}: Props): JSX.Element | null => {
  const workspace = useGetSelectedWorkspace();
  const hasAiAddOn = useCurrentUserSelector(user => hasAnyAiScope(user), false);

  const business = workspace?.type === WORKSPACE_PLAN_BUSINESS;
  const enterprise = workspace?.type === WORKSPACE_PLAN_ENTERPRISE;
  const starterFree = workspace?.type === WORKSPACE_PLAN_STARTER_FREE;

  const showAtlassianPurchaseAiButton =
    !isCollection &&
    ((business && !hasAiAddOn) || (enterprise && !hasAiAddOn) || starterFree);

  return showAtlassianPurchaseAiButton ? (
    <Spacer x="medium" y="medium">
      <Spacer x="small">
        <TextButton type="button" onClick={onClick} offsetSide="left">
          <Arrange gap="xsmall">
            <Text color="blurple" fontWeight="bold">
              Get Loom AI
            </Text>
            <Container position="relative" top="-5px" left="-3px">
              <Logo brand="ai" maxWidth={1.5} variant="symbol" />
            </Container>
          </Arrange>
        </TextButton>
        <Text color="bodyDimmed">
          Create better video messages without lifting a finger
        </Text>
      </Spacer>
    </Spacer>
  ) : null;
};

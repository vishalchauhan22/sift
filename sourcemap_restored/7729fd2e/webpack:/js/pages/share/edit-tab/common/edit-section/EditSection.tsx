import { RequestPlanUpgradeLocations } from '@js/constants/requestPlanUpgradeLocations';

import cn from 'classnames';
import { useLoomAiPaywallClickHandler } from '@js/common/use-loom-ai-paywall-click-handler';
import React from 'react';

import { Arrange, Container, Pill, Text } from '@loomhq/lens';

import $ from './styles.module.css';

const TrialPill = (): JSX.Element => {
  const { onClick: upgradeOnClick } = useLoomAiPaywallClickHandler(
    RequestPlanUpgradeLocations.TRIAL_PILL
  );
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus, @atlassian/a11y/interactive-element-not-keyboard-focusable
    <div className={$.trialPill} role="button" onClick={upgradeOnClick}>
      <Pill color="white" backgroundColor="blurpleStrong">
        Trial
      </Pill>
    </div>
  );
};

type EditSectionProps = {
  title: React.ReactNode;
  showGradientBorderAnimation?: boolean;
};

export const EditSection: React.FC<
  React.PropsWithChildren<EditSectionProps>
> = ({ children, title, showGradientBorderAnimation = false }) => {
  return (
    <div
      className={cn({
        [$.editSectionGradientBorderAnimation]: showGradientBorderAnimation,
      })}
    >
      <Container
        position="relative"
        borderSide="all"
        radius="xlarge"
        paddingY={2.5}
        paddingX="large"
        backgroundColor="background"
        zIndex={1}
      >
        <Arrange gap={1} autoFlow="row" justifyContent="stretch">
          {title}
          {children}
        </Arrange>
      </Container>
    </div>
  );
};

export const EditSectionTitle: React.FC<{
  title: string;
  isTrialing?: boolean;
  topRightOption?: React.ReactNode;
}> = ({ title, isTrialing = false, topRightOption }) => {
  return (
    <Arrange autoFlow="column" justifyContent="space-between">
      <Arrange gap="small">
        {isTrialing && <TrialPill />}
        <Text size="heading-sm" fontWeight="bold">
          {title}
        </Text>
      </Arrange>
      {topRightOption}
    </Arrange>
  );
};

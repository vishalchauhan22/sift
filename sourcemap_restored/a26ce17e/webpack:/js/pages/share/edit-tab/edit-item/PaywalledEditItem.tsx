import { RequestPlanUpgradeLocations } from '@js/constants/requestPlanUpgradeLocations';

import { useLoomAiPaywallClickHandler } from '@js/common/use-loom-ai-paywall-click-handler';
import React from 'react';

import { Container, Icon } from '@loomhq/lens';
import { SvgLock } from '@loomhq/lens/icons/lock';

import { EditItem } from './EditItem';

const LockIcon = () => {
  return (
    <Container
      radius="large"
      paddingX="medium"
      paddingY="6px"
      backgroundColor="disabledBackground"
      borderSide="all"
    >
      <Icon icon={<SvgLock />} size={2} />
    </Container>
  );
};

export const PaywalledEditItem = ({
  icon,
  title,
  popoverContent,
  upgradeSourceLocation,
}: {
  icon: JSX.Element;
  title: string;
  popoverContent?: React.ReactNode;
  upgradeSourceLocation: RequestPlanUpgradeLocations;
}): JSX.Element => {
  const { onClick } = useLoomAiPaywallClickHandler(upgradeSourceLocation);

  return (
    <EditItem
      icon={icon}
      title={title}
      rightOption={<LockIcon />}
      onClick={onClick}
      popoverContent={popoverContent}
    />
  );
};

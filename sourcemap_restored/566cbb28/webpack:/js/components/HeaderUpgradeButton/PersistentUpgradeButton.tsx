import { StarterUpgradeModalButton } from '@js/components/StarterUpgradeModalButton';
import { useMatchLargeTabletOrDesktop } from '@js/hooks/useMatchMedia';
import { useScrollToSearchParam } from '@js/hooks/useScrollToSearchParam';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Button } from '@loomhq/lens';
import { wrapEvent } from '@loomhq/loom-form/helpers/wrapEvent';

import { useMount } from '../../hooks/useMount';
import { incrementMetric } from '../../utilities/metrics';

interface Props {
  onClick?: React.ComponentProps<typeof Button>['onClick'];
  variant?: 'neutral' | 'primary' | 'record' | 'upgrade' | 'danger' | '';
  text?: string;
}

export const PersistentUpgradeButton = ({
  onClick,
}: Props): JSX.Element | null => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const isOnPlanAndBilling =
    location.pathname === '/workspace' && location.hash === '#plans';

  const onLargeTabletOrDesktop = useMatchLargeTabletOrDesktop();

  useMount(() => {
    incrementMetric('billing.persistent-upgrade-button.rendered');
  });

  useScrollToSearchParam({
    preCondition: () => isOnPlanAndBilling,
    delayMs: 200,
  });

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    incrementMetric('billing.persistent-upgrade-button.clicked');
    setIsLoading(true);
    if (onClick) {
      await onClick(e);
    }
    // adding this .5 seconds delay to make the button look like it's loading with proper transition
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <StarterUpgradeModalButton>
      {props => (
        <Button
          id="persistentUpgradeButton"
          data-testid="my-videos-header-upgrade-button"
          type="button"
          variant="primary"
          size={onLargeTabletOrDesktop ? 'medium' : 'small'}
          style={{
            transition: 'all 0.1s ease-in-out',
            opacity: isLoading ? 0.8 : 1,
          }}
          onClick={wrapEvent(props.showModal, handleClick)}
          hasLoader={isLoading}
          isDisabled={isLoading}
        >
          Upgrade
        </Button>
      )}
    </StarterUpgradeModalButton>
  );
};

import { useSendButtonRequestUpgrade } from '@js/common/analytics/atlassian-analytics/use-send-track-event';
import { addOriginTracing } from '@js/common/atlassian-analytics/origin-tracing';
import { MenuItemTooltip } from '@js/common/navigation/MenuItemTooltip';
import React from 'react';

import { useLayer, useHover } from 'react-laag';

import { Button } from '@loomhq/lens';

import { useMatchLargeTabletOrDesktop } from '@js/hooks/useMatchMedia';

import BillingButtonTooltipImg from '@assets/img/billing-button-tooltip.png';

import styles from './styles.module.css';

export const UpgradeButton = ({
  atlassianPlanUrl,
}: {
  atlassianPlanUrl: string;
}): React.ReactElement => {
  const onLargeTabletOrDesktop = useMatchLargeTabletOrDesktop();
  const [isOver, hoverProps] = useHover({ delayEnter: 100 });

  const { triggerProps, layerProps, renderLayer } = useLayer({
    isOpen: isOver,
    placement: 'bottom-center',
    triggerOffset: 8,
    auto: true,
  });

  const sendButtonRequestUpgrade = useSendButtonRequestUpgrade(
    'loom',
    'upgrade_button_clicked',
    'atlassian_header_button'
  );

  const { url } = addOriginTracing(atlassianPlanUrl);

  const handleUpgradeButtonClick = async () => {
    await sendButtonRequestUpgrade();
    window.open(url);
  };

  return (
    <>
      <div {...triggerProps} {...hoverProps}>
        <Button
          id="AtlassianUpgradeButton"
          type="button"
          variant="primary"
          size={onLargeTabletOrDesktop ? 'medium' : 'small'}
          target="_blank"
          onClick={handleUpgradeButtonClick}
        >
          Upgrade
        </Button>
      </div>
      {isOver
        ? renderLayer(
            <div {...layerProps} className={styles.popover}>
              <MenuItemTooltip
                title="Upgrade on Atlassian"
                text="Upgrade your plan for advanced editing and AI features."
                img={BillingButtonTooltipImg}
                altText="Billing tooltip image"
              />
            </div>
          )
        : null}
    </>
  );
};

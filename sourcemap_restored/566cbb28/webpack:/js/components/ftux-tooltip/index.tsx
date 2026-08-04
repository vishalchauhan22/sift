import {
  FTUX_TOOLTIP_DISMISSED,
  FTUX_TOOLTIP_RENDERED,
} from '@js/constants/events';

import React, { useEffect } from 'react';

import { Arrange, Button, IconButton, Pill, Spacer, Text } from '@loomhq/lens';
import { SvgClose } from '@loomhq/lens/icons/close';

import * as analytics from '@js/utilities/analytics';

import styles from './styles.module.less';

export const FTUX_LAAG_OPTIONS = {
  triggerOffset: 12,
  isOpen: true,
  auto: true,
  snap: true,
};

type FTUXTooltipProps = {
  title: string;
  subtitle?: string;
  dismissTooltip: () => void;
  source?: string;
  hasNewPill?: boolean;
  ctaProps?: {
    text: string;
    handleClick: React.MouseEventHandler<HTMLButtonElement>;
  };
};

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const FTUXTooltip = ({
  title,
  subtitle,
  dismissTooltip,
  hasNewPill = false,
  source = '',
  ctaProps,
}: FTUXTooltipProps): JSX.Element => {
  useEffect(() => {
    analytics.track(FTUX_TOOLTIP_RENDERED, { source });
  }, [source]);

  return (
    <div className={styles.expanded}>
      <div className="absolute top:0 right:0 pt:small pr:small">
        {dismissTooltip && (
          <IconButton
            altText="Dismiss"
            icon={<SvgClose />}
            iconColor="bodyDimmed"
            onMouseDown={e => {
              e.preventDefault();
            }}
            onClick={() => {
              dismissTooltip();
              analytics.track(FTUX_TOOLTIP_DISMISSED, { source });
            }}
          />
        )}
      </div>
      <div className="p:medium">
        <Spacer right="large" bottom="small">
          {/* Right spacer so text can never run into dismiss icon */}
          <Arrange gap={1}>
            {hasNewPill ? (
              <Pill backgroundColor="upgradeHover" color="magenta">
                New
              </Pill>
            ) : null}
            <Text fontWeight="bold" size="body-md" color="discoveryTitle">
              {title}
            </Text>
          </Arrange>
        </Spacer>
        <Text color="bodyDimmed">{subtitle}</Text>
      </div>
      <Spacer left={1} bottom={2}>
        {ctaProps ? (
          <Button
            onClick={ctaProps.handleClick}
            onMouseDown={e => e.preventDefault()}
          >
            {ctaProps.text}
          </Button>
        ) : null}
      </Spacer>
    </div>
  );
};

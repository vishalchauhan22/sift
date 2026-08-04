import cn from 'classnames';

import { FTUX_LAAG_OPTIONS } from '@js/components/ftux-tooltip';
import { useHasScope } from '@js/hooks/useHasScopes';
import React from 'react';
import { useLayer } from 'react-laag';

import { IconButton, Tooltip } from '@loomhq/lens';
import { SvgAdd } from '@loomhq/lens/icons/add';
import { VIEW_CREATE_SPACE } from '@loomhq/shared-utilities/constants/scopes';

import styles from '../styles.module.less';

const ExpandedSidebarCreateSpaceButton = ({
  createNewSpace,
  isFtux,
  isOnboarding,
}: {
  createNewSpace: () => void;
  isFtux?: boolean;
  isOnboarding?: boolean;
}): JSX.Element => {
  const hasViewCreateSpaceScope = useHasScope(VIEW_CREATE_SPACE);

  const { layerProps, triggerProps, renderLayer } = useLayer({
    ...FTUX_LAAG_OPTIONS,
    placement: 'center',
    overflowContainer: true,
    auto: false,
  });

  return (
    <div {...triggerProps}>
      {hasViewCreateSpaceScope && (
        <Tooltip
          tabIndex={-1}
          content="Create a Space"
          isInline={false}
          placement="rightCenter"
        >
          <IconButton
            className={cn(isFtux && 'bgc:discoveryBackground radius:100')}
            size="small"
            altText="Create a Space"
            icon={<SvgAdd />}
            onClick={createNewSpace}
          />
        </Tooltip>
      )}

      {renderLayer(
        <div
          {...layerProps}
          className={cn(isOnboarding && styles.onboardingHighlight)}
        >
          {isOnboarding && (
            <div className={styles.onboardingButtonHighlight}>
              <IconButton
                className={cn(isFtux && 'bgc:discoveryBackground radius:100')}
                size="small"
                altText="Create a Space"
                icon={<SvgAdd />}
                onClick={() => {
                  createNewSpace();
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default ExpandedSidebarCreateSpaceButton;

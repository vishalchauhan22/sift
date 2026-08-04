import cn from 'classnames';
import React from 'react';

import { useHover, useLayer } from 'react-laag';

import {
  Arrange,
  Container,
  Icon,
  Split,
  SplitSection,
  Text,
  Tooltip,
} from '@loomhq/lens';

import { SvgChevronRight } from '@loomhq/lens/icons/chevron-right';
import { SvgScissors } from '@loomhq/lens/icons/scissors';

import $ from './styles.module.css';

export const EditPageButton = ({
  onClick,
  mainText,
  subText,
  isDisabled = false,
  tooltipText,
  noAi = false,
  popover,
}: {
  mainText: string;
  subText: string;
  onClick: () => void;
  isDisabled?: boolean;
  tooltipText?: string;
  noAi?: boolean;
  popover?: React.ReactNode;
}): JSX.Element => {
  const [isOver, hoverProps] = useHover({ delayEnter: 100 });

  const isPopoverOpen = popover ? isOver && !isDisabled : false;

  const { triggerProps, layerProps, renderLayer } = useLayer({
    isOpen: isPopoverOpen,
    placement: 'left-center',
    triggerOffset: 12,
  });

  return (
    <>
      <Tooltip
        tabIndex={-1}
        content={tooltipText}
        placement="bottomCenter"
        isDisabled={!tooltipText}
        isInline={false}
      >
        <span {...triggerProps} {...hoverProps}>
          <button
            className={cn({
              [$.editPageButton]: true,
              [$.isDisabled]: isDisabled,
              [$.noAi]: noAi,
            })}
            onClick={onClick}
            disabled={isDisabled}
          >
            <Container
              padding="small"
              backgroundImage={
                !isDisabled ? 'var(--lns-gradient-ai-secondary)' : undefined
              }
              height="100%"
              width="100%"
            >
              <Arrange
                columns={['auto', '1fr', 'auto']}
                gap={1.5}
                justifyContent="stretch"
              >
                <Icon icon={<SvgScissors />} className={$.trimIcon} />
                <Split direction="column" alignItems="flex-start">
                  <SplitSection>
                    <div className={$.mainText}>
                      <Text alignment="left" fontWeight="bold">
                        {mainText}
                      </Text>
                    </div>
                  </SplitSection>
                  <SplitSection>
                    <div className={$.subText}>
                      <Text alignment="left" color="bodyDimmed">
                        {subText}
                      </Text>
                    </div>
                  </SplitSection>
                </Split>

                <Icon icon={<SvgChevronRight />} />
              </Arrange>
            </Container>
          </button>
        </span>
      </Tooltip>
      {isPopoverOpen &&
        renderLayer(
          <div {...layerProps} className={$.popover}>
            {popover}
          </div>
        )}
    </>
  );
};

import { INCENTIVES_PAGE } from '@js/constants/routes';

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import { FTUXTooltip, FTUX_LAAG_OPTIONS } from '@js/components/ftux-tooltip';
import FtuxWrapper from '@js/components/ftux/ftux-wrapper';
import { useOnDismissFtux } from '@js/hooks/ftux';
import React from 'react';

import { useLayer } from 'react-laag';

import { Pill } from '@loomhq/lens';
import { UserPropertyEnum } from '@loomhq/shared-utilities/constants/userProperties';

const LayerWrapper = styled.div`
  z-index: 103;
`;

const FadeInWrapper = styled.div`
  opacity: 0;
  animation: fadeIn 1s ease 200ms forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const FtuxContent = () => {
  const onDismissFtux = useOnDismissFtux();

  const ctaProps = {
    text: 'Teach me how',
    handleClick: () => {
      // [TODO]: add analytics
      onDismissFtux(UserPropertyEnum.INCENTIVES_PAGE_SIDE_NAV_FTUX);

      window.location.href = INCENTIVES_PAGE;
    },
  };

  return (
    <FadeInWrapper>
      <FTUXTooltip
        title="Earn free videos by inviting!"
        subtitle="Get up to 50 videos when you invite teammates to your workspace."
        dismissTooltip={() =>
          onDismissFtux(UserPropertyEnum.INCENTIVES_PAGE_SIDE_NAV_FTUX)
        }
        source={UserPropertyEnum.INCENTIVES_PAGE_SIDE_NAV_FTUX}
        ctaProps={ctaProps}
      />
    </FadeInWrapper>
  );
};

export const IncentivesSideNavFtux = (): JSX.Element | null => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { layerProps, triggerProps, renderLayer } = useLayer({
    ...FTUX_LAAG_OPTIONS,
    placement: 'bottom-start',
    triggerOffset: 10,
    isOpen,
  });

  return (
    <FtuxWrapper name={UserPropertyEnum.INCENTIVES_PAGE_SIDE_NAV_FTUX}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div {...triggerProps} onMouseEnter={() => setIsOpen(true)}>
        <Pill backgroundColor="blurpleLight" color="blurple">
          New
        </Pill>
      </div>
      {isOpen
        ? renderLayer(
            // eslint-disable-next-line styled-components-a11y/click-events-have-key-events, styled-components-a11y/no-static-element-interactions
            <LayerWrapper onClick={e => e.stopPropagation()} {...layerProps}>
              <FtuxContent />
            </LayerWrapper>
          )
        : null}
    </FtuxWrapper>
  );
};

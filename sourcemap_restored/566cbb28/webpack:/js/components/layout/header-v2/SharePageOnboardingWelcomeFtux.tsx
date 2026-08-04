import { LOOMS_PAGE } from '@js/constants/routes';

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import { FTUXTooltip, FTUX_LAAG_OPTIONS } from '@js/components/ftux-tooltip';
import { useOnDismissFtux } from '@js/hooks/ftux';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';
import React from 'react';

import { useLayer } from 'react-laag';

import { UserPropertyEnum } from '@loomhq/shared-utilities/constants/userProperties';

const LayerWrapper = styled.div`
  z-index: 500;
  margin-top: -15px;
`;

const FtuxContent = () => {
  const onDismissFtux = useOnDismissFtux();
  const workspace = useGetSelectedWorkspace();

  const ctaProps = {
    text: 'Take me there',
    handleClick: () => {
      onDismissFtux(UserPropertyEnum.SHARE_PAGE_ONBOARDING_WELCOME_FTUX);

      window.location.href = LOOMS_PAGE;
    },
  };

  if (workspace?.name === undefined) {
    return null;
  }

  return (
    <FTUXTooltip
      title={`Welcome to ${workspace?.name}!`}
      subtitle="Your account has been created! Start recording Looms in your library."
      dismissTooltip={() =>
        onDismissFtux(UserPropertyEnum.SHARE_PAGE_ONBOARDING_WELCOME_FTUX)
      }
      source={UserPropertyEnum.SHARE_PAGE_ONBOARDING_WELCOME_FTUX}
      ctaProps={ctaProps}
    />
  );
};

export const SharePageOnboardingWelcomeFtux = (): JSX.Element => {
  const { layerProps, triggerProps, renderLayer } = useLayer({
    ...FTUX_LAAG_OPTIONS,
    placement: 'right-start',
    overflowContainer: true,
    triggerOffset: -5,
    auto: false,
  });

  return (
    <>
      <div {...triggerProps} />
      {renderLayer(
        // eslint-disable-next-line styled-components-a11y/click-events-have-key-events, styled-components-a11y/no-static-element-interactions
        <LayerWrapper onClick={e => e.stopPropagation()} {...layerProps}>
          <FtuxContent />
        </LayerWrapper>
      )}
    </>
  );
};

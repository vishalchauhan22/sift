// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import { type Cta, useGetCta } from '@js/common/cta-form';
import { useCalendlySegment } from '@js/pages/share/modals/calendly/useCalendlySegmentHook';
import { useDidRequestCalendlyModal } from '@js/pages/share/modals/calendly/useDidRequestCalendlyModal';
import React from 'react';

import { LoomURL } from '@loomhq/enums';
import { Arrange, Icon, TextButton } from '@loomhq/lens';
import { SvgReplay } from '@loomhq/lens/icons/replay';

import { CALENDLY_URL_REGEX } from '@loomhq/shared-utilities/utilities/validateUtils';

import { useVideoContext } from '..';
import { isSuggestionForVideoPreviouslyClicked } from '../common';
import { CtaButton } from '../components/cta-button';
import { PoweredByLoomTitle } from '../components/powered-by-loom-title';
import { useIsLoggedUser, useShowPoweredByLoom } from '../context';
import { usePlayer, usePlayerFromContext } from '../hooks';
import { zIndexes } from '../utils';
import { useViewportContext } from '../viewportContext';

const Wrapper = styled.div<{
  centerContent: boolean;
}>`
  z-index: ${zIndexes.endLayer};
  display: grid;
  pointer-events: none;

  ${props =>
    props.centerContent
      ? `
    place-items: center;
    place-content: center;
  `
      : `
    align-items: start;
    justify-content: center;
    padding-top: 10%;
  `}

  & * {
    pointer-events: initial;
  }
`;

export const EndCtaButton: React.FC<{ cta: Cta }> = ({ cta }) => {
  const player = usePlayerFromContext();
  const { video } = useVideoContext();
  const { width } = useViewportContext();
  const ctaButtonSize = width > 600 ? 'large' : 'medium';
  const url = cta.ctaUrl ?? '';
  const isCalendlyCta = CALENDLY_URL_REGEX.test(url);
  const { setDidRequestCalendlyModal } = useDidRequestCalendlyModal();
  const { isOwnerInCalendlySegment } = useCalendlySegment(
    video.id,
    isCalendlyCta
  );

  const skipModalPopup = url.includes('skip_modal_popup=true');

  const onCtaClick = e => {
    if (!cta || !player) {
      return;
    }

    if (isCalendlyCta && isOwnerInCalendlySegment && !skipModalPopup) {
      e.preventDefault();
      setDidRequestCalendlyModal(true);
    }

    player.ctaClicked(url);
  };

  return (
    <CtaButton
      size={ctaButtonSize}
      href={url}
      borderRadius={cta.ctaMods?.border_radius}
      contentColor={cta.ctaMods?.color}
      backgroundColor={cta.ctaMods?.background_color}
      onClick={onCtaClick}
    >
      {cta.ctaText}
    </CtaButton>
  );
};

export const SimpleEndActions = (): JSX.Element => {
  const { video } = useVideoContext();
  const player = usePlayer(video.id);
  const cta = useGetCta(video.id);
  const { width, height } = useViewportContext();
  const gap = width > 600 ? 'medium' : 'small';
  const centerContent = height > 200;

  const onPlay = () => {
    if (!player) {
      return;
    }

    player.watchAgainClicked();
    player.play();
  };

  const handleWatchAgainClicked = (
    e: React.MouseEvent | React.KeyboardEvent
  ) => {
    e.preventDefault(); // Needed to prevent a page load/reload.
    onPlay();
  };

  const showPoweredByLoom = useShowPoweredByLoom();
  const isLoggedUser = useIsLoggedUser();
  const isSuggestionForThisVideoPreviouslyClicked =
    isSuggestionForVideoPreviouslyClicked(video.id);
  const showSuggestedVideoContainer =
    !isLoggedUser && !isSuggestionForThisVideoPreviouslyClicked;

  const ctaButtonSize = width > 600 ? 'large' : 'medium';

  return (
    <Wrapper centerContent={centerContent}>
      <Arrange autoFlow="row" gap={gap} justifyItems="center">
        {showSuggestedVideoContainer ? (
          <Arrange autoFlow="row" gap={gap} justifyItems="center">
            <div data-lens-theme="dark">
              <CtaButton
                size={ctaButtonSize}
                contentColor="white"
                backgroundColor="rgba(0, 0, 0, 0)"
                onClick={handleWatchAgainClicked}
                borderColor="white"
                href="#"
              >
                <Arrange autoFlow="column" gap="small">
                  <Icon icon={<SvgReplay />} />
                  Watch again
                </Arrange>
              </CtaButton>
            </div>
            {cta && cta.ctaEnabled && <EndCtaButton cta={cta} />}
          </Arrange>
        ) : (
          <>
            {cta && cta.ctaEnabled && <EndCtaButton cta={cta} />}
            <div data-lens-theme="dark">
              <TextButton onClick={onPlay} icon={<SvgReplay />}>
                Watch again
              </TextButton>
            </div>
          </>
        )}
        {showPoweredByLoom && (
          <PoweredByLoomTitle
            onClick={() =>
              window.open(
                `${LoomURL.Production}?utm_source=embed&utm_medium=powered-by`
              )
            }
          />
        )}
      </Arrange>
    </Wrapper>
  );
};

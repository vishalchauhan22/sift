/* eslint-disable @loomhq/loom/limit-parent-import-depth */

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import { useCtaForm, useGetCta } from '@js/common/cta-form';
import { isInSlackVideoBlock } from '@js/common/video-player/utils';
import { useCalendlySegment } from '@js/pages/share/modals/calendly/useCalendlySegmentHook';
import { useDidRequestCalendlyModal } from '@js/pages/share/modals/calendly/useDidRequestCalendlyModal';
import React from 'react';

import { Arrange, Icon, u } from '@loomhq/lens';
import { SvgExternalLink } from '@loomhq/lens/icons/external-link';

import { CALENDLY_URL_REGEX } from '@loomhq/shared-utilities/utilities/validateUtils';

import {
  useCommentsEnabled,
  useHideShare,
  useHideWatchOnLoom,
  useVideoContext,
  useWhiteLabelPlayer,
} from '../../context';
import {
  useContainerBoundary,
  usePlayerFromContext,
  usePlayingStatus,
} from '../../hooks';
import { colors } from '../../variables';

import { CtaButton } from '../cta-button';

import { Show } from '../show';
import { CommentButton } from './comment-button';
import { CopyLinkButton } from './copy-link-button';
import { WatchOnLoomButton } from './watch-on-loom-button';

export const titleCardHeight = u(4.5);

const ButtonsSectionWrapper = styled.div`
  border-radius: var(--lns-radius-medium);
  background: ${colors.videoOverlay};
  height: ${titleCardHeight};
  padding: 0 var(--lns-space-small);
  display: grid;
  place-items: center;
  grid-auto-flow: column;
  gap: var(--lns-space-small);
`;

export const ActionsCta = ({
  ...props
}: {
  [x: string]: any;
}): JSX.Element | null => {
  const player = usePlayerFromContext();
  const { video } = useVideoContext();
  // use video.modelId instead of video.id to get the cta for the model, Embed page video.id returns a wrong value
  const cta = useGetCta(video.modelId);
  const { isEditingCta } = useCtaForm();
  const { status } = usePlayingStatus(video.id);
  const isEnded = status === 'ended';
  const showCta = cta?.ctaEnabled && !isEnded && !isInSlackVideoBlock();
  const isCalendlyCta = CALENDLY_URL_REGEX.test(String(cta?.ctaUrl));
  const { setDidRequestCalendlyModal } = useDidRequestCalendlyModal();
  const { isOwnerInCalendlySegment } = useCalendlySegment(
    video.id,
    isCalendlyCta
  );

  const skipModalPopup = String(cta?.ctaUrl).includes('skip_modal_popup=true');

  const onCtaClick = e => {
    if (!cta || !player) {
      return;
    }

    if (isCalendlyCta && isOwnerInCalendlySegment && !skipModalPopup) {
      e.preventDefault();
      setDidRequestCalendlyModal(true);
    }

    player.ctaClicked(cta.ctaUrl ?? '');
  };

  if (!showCta || isEditingCta) {
    return null;
  }

  // a tag refs treat URLs without a leading schema
  // as relative URLs and will prepend loom domain
  const linkProperties = {
    href:
      cta?.ctaUrl &&
      (cta.ctaUrl.indexOf('http') > -1 ? cta.ctaUrl : `//${cta.ctaUrl}`),
  };

  return (
    <CtaButton
      href={linkProperties.href ?? ''}
      borderRadius={cta.ctaMods?.border_radius}
      contentColor={cta.ctaMods?.color}
      backgroundColor={cta.ctaMods?.background_color}
      onClick={onCtaClick}
      data-name="CTAButton"
      {...props}
    >
      <Arrange gap="xsmall">
        {props.showIcon ? <Icon icon={<SvgExternalLink />} /> : null}
        {cta.ctaText}
      </Arrange>
    </CtaButton>
  );
};

export const ActionsWrapper = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => (
  <div ref={ref}>
    <Arrange gap="small">{children}</Arrange>
  </div>
));

ActionsWrapper.displayName = 'ActionsWrapper';

export const ButtonsSection = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <Show afterWidth={300}>
      <ButtonsSectionWrapper>{children}</ButtonsSectionWrapper>
    </Show>
  );
};

export const ActionsEmbed = (): JSX.Element => {
  const commentsEnabled = useCommentsEnabled();
  const hideShare = useHideShare();
  const hideWatchOnLoom = useHideWatchOnLoom();
  const whiteLabelPlayer = useWhiteLabelPlayer();
  const { ref, boundaryRef } = useContainerBoundary();
  const container = boundaryRef.current as HTMLElement;

  return (
    <ActionsWrapper ref={ref}>
      <ActionsCta />
      {!whiteLabelPlayer && (
        <ButtonsSection>
          {commentsEnabled && <CommentButton container={container} />}
          {!hideShare && <CopyLinkButton container={container} />}
          {!hideWatchOnLoom && <WatchOnLoomButton />}
        </ButtonsSection>
      )}
    </ActionsWrapper>
  );
};

export const ActionsFeed = (): JSX.Element => {
  const hideShare = useHideShare();
  const { ref, boundaryRef } = useContainerBoundary();
  const container = boundaryRef.current as HTMLElement;

  return (
    <ActionsWrapper ref={ref}>
      <ActionsCta />
      <ButtonsSection>
        {!hideShare && <CopyLinkButton container={container} />}
        <WatchOnLoomButton />
      </ButtonsSection>
    </ActionsWrapper>
  );
};

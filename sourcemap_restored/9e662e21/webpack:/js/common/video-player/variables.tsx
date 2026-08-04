import { u } from '@loomhq/lens';

export const colors = {
  captionsBackground: 'hsl(0 0% 13% / 0.9)',
  ctaBackground: '#ff623e',
  ctaContent: 'white',
  ctaContentDimmed: 'var(--lns-color-grey4)',
  ctaContentInactive: 'var(--lns-color-grey5)',
  durationBackground: 'var(--lns-color-backgroundSecondary)',
  playerBackdrop: 'hsl(0 0% 20% / 0.1)',
  playerBackdropDark: 'var(--lns-color-backdropDark)',
  playerBackdropHover: 'hsl(0 0% 20% / 0.23)',
  playerBackdropWhite: 'var(--lns-color-white)',
  progressTrackFill: 'var(--lns-color-backdrop)',
  sliderTrack: 'hsl(0 0% 100% / 0.3)',
  speedSelectorBackground: 'var(--lns-color-background)',
  stylizedCaptionsBackground: 'var(--lns-color-blurple)',

  timelineSliderTrackFill: 'var(--lns-color-orange)',
  videoOverlay: 'hsl(0 0% 20% / 0.9)',
  videoOverlaySoft: 'var(--lns-color-backdropDark)',
};

export const stylizedCaptionsRadius = 'var(--lns-radius-200)';

export const playBarHeight = u(6);
export const playbarDragArea = u(2);
export const emojiReactionSize = u(2);
export const commentReactionSize = u(2.5);
export const reactionsBarHeight = u(2.75);
export const progressHeight = u(0.5);
export const ctaBottomMargin = u(12.5);

export const playOptionsWidth = u(15.25);
export const smallPlayerHeight = 300; // in px

export const videoMouseIsActiveClassName = 'videoMouseIsActive';

export const videoContainerClassName = 'video-container';
export const videoGlobalContainerClassName = 'video-global-container';
export const transportSectionClassName = 'transportSection';
export const transportIsOpenClassName = 'transportIsOpen';

export const xxFastTransition = 50;
export const xFastTransition = 70;
export const fastTransition = 150;
export const defaultTransition = 200;
export const slowTransition = 300;
export const xSlowTransition = 600;

export const tooltipTransitionDuration = fastTransition;
export const tooltipTransitionDelay = xxFastTransition;

export const totalTooltipTransitionDurationAndDelay =
  tooltipTransitionDuration + tooltipTransitionDelay;

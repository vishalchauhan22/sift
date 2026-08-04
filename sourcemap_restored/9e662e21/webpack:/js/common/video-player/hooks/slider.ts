import { SCRUBBER_HOVER, SCRUBBER_CLICK } from '@js/constants/events';

import React, { useCallback } from 'react';

import * as analytics from '@js/utilities/analytics';

import { Player } from '../api';
import { SystemEvents } from '../api/player';
import { formatTime } from '../utils';

import { usePlayer } from '.';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../utilities/analytics/attribute-transformer';

export function useRangeSlider(
  rangeLength = 0,
  step = 1,
  formatter: (value: number) => string
): React.RefObject<HTMLDivElement> {
  const ref = React.useRef<HTMLDivElement>(null);
  const lock = React.useRef(false);
  const tipLock = React.useRef(false);

  React.useEffect(() => {
    if (!ref.current || !rangeLength) {
      return;
    }

    let sliderRect: DOMRect;
    let tipWidth: number;
    const slider = ref.current;
    const tip = slider.querySelector('.progressValueTooltip') as HTMLElement;
    const thumb = slider.querySelector('.seekThumbTooltip') as HTMLElement;

    const percentToValue = (percent: number, fullValue = rangeLength) =>
      (Number(percent) * fullValue) / 100;
    const valueToPercent = (value: number, fullValue = rangeLength) =>
      (value * 100) / fullValue;

    // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
    const getCurrentValueFromDOM = () => {
      const currentProgress = slider.style.getPropertyValue('--progressValue');

      return percentToValue(Number(currentProgress.slice(0, -1)));
    };

    // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
    const setPercentOnDOM = (percent: number) => {
      slider.style.setProperty(
        '--progressValue',
        `${Math.max(0, Math.min(100, percent))}%`
      );
    };

    const tooltipsOpacity = (opacity: string) => {
      slider.style.setProperty('--seekPreviewOpacity', opacity);
    };
    const tooltipsMove = (percent: number) => {
      slider.style.setProperty('--seekPreviewOffset', `${percent}%`);
      tooltipsOpacity('1');
    };

    const updateProgressValue = (value: number) => {
      slider.setAttribute('aria-valuenow', `${value}`);
      slider.dispatchEvent(
        new CustomEvent<number>('progressValue', { detail: value })
      );
    };

    const onEnter = () => {
      sliderRect = slider.getBoundingClientRect();

      if (!tip) {
        return;
      }

      tipLock.current = true;

      tooltipsOpacity('1');

      if (!tip.textContent) {
        // set default value for bounding size
        tip.textContent = '0:00';
      }

      tipWidth = tip.getBoundingClientRect().width;
    };

    const setTooltipValue = (percent: number) => {
      if (!tip) {
        return;
      }

      const value = percentToValue(Number(percent));

      if (percent >= 0 && percent <= 100) {
        tip.textContent = formatter(value);
      }

      const offset = 4;
      const minLeft = `${tipWidth / 2 + offset}px`;
      const maxLeft = `calc(100% - ${tipWidth / 2 + offset}px`;

      // chapters name in 'chapters-bar/index.tsx' relies on the following
      // left value, more specifically, it needs the `percent` value to
      // be able to move along with the time pill
      tip.style.left = `clamp(${minLeft}, ${percent}%, ${maxLeft})`;

      thumb?.setAttribute('data-time', `${value}`);
      tooltipsMove(percent);
    };

    const onLeave = () => {
      if (!tipLock.current) {
        return;
      }

      tipLock.current = false;

      tooltipsOpacity('0');
    };

    const onMouseDown = () => {
      lock.current = true;
      slider.setAttribute('mouse-down', 'true');
    };

    const onMouseUp = () => {
      if (!lock.current) {
        return;
      }

      const value = getCurrentValueFromDOM();

      updateProgressValue(value);

      slider.blur();
      lock.current = false;

      tooltipsOpacity('0');

      // delay this a smidge so enhancer mouseup happens before it
      window.requestAnimationFrame(() => slider.removeAttribute('mouse-down'));
    };

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!lock.current && !tipLock.current) {
        return;
      }

      e.preventDefault();

      let x = 0;

      if ('pageX' in e) {
        x = e.pageX;
      }

      if ('touches' in e && e.touches?.length) {
        x = e.touches[0].pageX;
      }

      // Sometimes sliderRect is null because onEnter has not been called. If that is the case, trigger onEnter to define sliderRect
      if (!sliderRect) {
        onEnter();
      }

      const progressValue = (100 / sliderRect.width) * (x - sliderRect.left);

      if (slider.dataset.continuousUpdates) {
        const value = percentToValue(progressValue);

        updateProgressValue(value);
      }

      setTooltipValue(Number(progressValue));

      if (!lock.current) {
        return;
      }

      setPercentOnDOM(progressValue);
    };

    const onClick = (e: MouseEvent) => {
      // Sometimes sliderRect is null because onEnter has not been called. If that is the case, trigger onEnter to define sliderRect
      if (!sliderRect) {
        onEnter();
      }

      const progressValue =
        (100 / sliderRect.width) * (e.pageX - sliderRect.left);

      setPercentOnDOM(progressValue);

      const value = percentToValue(progressValue);

      updateProgressValue(value);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (
        !['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'].includes(e.key)
      ) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      let value = getCurrentValueFromDOM();

      switch (e.key) {
        case 'ArrowLeft':
          value -= step;
          break;
        case 'ArrowRight':
          value += step;
          break;
        case 'ArrowDown':
          value -= step * 5;
          break;
        case 'ArrowUp':
          value += step * 5;
          break;
        default:
          return;
      }

      value = Math.min(rangeLength, Math.max(0, value));

      const percent = valueToPercent(value);

      setPercentOnDOM(percent);
      updateProgressValue(value);
    };

    slider.addEventListener('mousedown', onMouseDown);
    slider.addEventListener('mouseenter', onEnter);
    slider.addEventListener('mouseleave', onLeave);
    slider.addEventListener('click', onClick);
    slider.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    // touch events
    slider.addEventListener('touchstart', onEnter, { passive: true });
    slider.addEventListener('touchstart', onMouseDown, { passive: true });
    window.addEventListener('touchmove', onMouseMove);
    window.addEventListener('touchend', onMouseUp);
    window.addEventListener('touchend', onLeave);

    return () => {
      slider.removeEventListener('mouseenter', onEnter);
      slider.removeEventListener('mouseleave', onLeave);
      slider.removeEventListener('mousedown', onMouseDown);
      slider.removeEventListener('click', onClick);
      slider.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      // touch events
      slider.removeEventListener('touchstart', onEnter);
      slider.removeEventListener('touchstart', onMouseDown);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
      window.removeEventListener('touchend', onLeave);
    };
  }, [ref, rangeLength, step, formatter]);

  return ref;
}

export function useTimelineSlider(
  videoId: string
): React.RefObject<HTMLDivElement> {
  const player = usePlayer(videoId) as Player;
  const wasPlaying = React.useRef(player?.paused !== false);
  const ref = useRangeSlider(player?.duration, 1, formatTime);
  const [hoverTracked, setHoverTracked] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    const slider = ref.current;

    const onUpdateSliderPosition = () => {
      if (slider.getAttribute('mouse-down')) {
        return;
      }

      const percent = `${(100 * player.currentTime) / player.duration}`;

      slider.style.setProperty('--progressValue', `${percent}%`);
      slider.setAttribute(
        'aria-valuetext',
        `${formatTime(player.currentTime)} of ${formatTime(player.duration)}`
      );
    };

    const onSeek = (e: CustomEvent<number>) => {
      if (!player) {
        return;
      }

      player.currentTime = e.detail;
      slider.setAttribute(
        'aria-valuetext',
        `${formatTime(player.currentTime)} of ${formatTime(player.duration)}`
      );
    };

    const onDown = () => {
      if (!player) {
        return;
      }

      analytics.track(
        SCRUBBER_CLICK,
        withIdentifiers(
          SCRUBBER_CLICK,
          AnalyticsEntityId.video(videoId, 'video_id')
        )
      );

      wasPlaying.current = player.paused === false;

      if (player.paused) {
        return;
      }

      player.pause();
    };

    const onUp = () => {
      if (!player) {
        return;
      }

      if (!wasPlaying.current) {
        return;
      }

      if (!slider.getAttribute('mouse-down')) {
        return;
      }

      player.play();
    };

    const onHover = () => {
      if (!player) {
        return;
      }

      if (!hoverTracked) {
        setHoverTracked(true);
        analytics.track(
          SCRUBBER_HOVER,
          withIdentifiers(
            SCRUBBER_HOVER,
            AnalyticsEntityId.video(videoId, 'video_id')
          )
        );
      }
    };

    slider.addEventListener('mousedown', onDown);
    slider.addEventListener('mouseenter', onHover);
    window.addEventListener('mouseup', onUp);
    slider.addEventListener('progressValue', onSeek as EventListener);

    if (player) {
      player.on([SystemEvents.smoothTime], onUpdateSliderPosition);
    }

    return () => {
      slider.removeEventListener('mousedown', onDown);
      slider.removeEventListener('mouseenter', onHover);
      window.removeEventListener('mouseup', onUp);
      slider.removeEventListener('progressValue', onSeek as EventListener);

      if (player) {
        player.off([SystemEvents.smoothTime], onUpdateSliderPosition);
      }
    };
  }, [ref, player, videoId, hoverTracked]);

  return ref;
}

export function useVolumeSlider(
  videoId: string
): React.RefObject<HTMLDivElement> {
  const player = usePlayer(videoId) as Player;
  const formatter = useCallback((value: any) => `${value}`, []);

  const ref = useRangeSlider(1, 0.1, formatter);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    const slider = ref.current;

    slider.dataset.continuousUpdates = 'true';

    const onUpdateSliderPosition = () => {
      if (slider.getAttribute('mouse-down')) {
        return;
      }

      if (!player) {
        return;
      }

      slider.style.setProperty('--progressValue', `${100 * player.volume}%`);
      slider.setAttribute('aria-valuenow', `${100 * player.volume}`);
    };

    const onSeek = (e: CustomEvent<number>) => {
      if (!player) {
        return;
      }

      const volume = e.detail;

      player.volume = volume;
    };

    slider.addEventListener('progressValue', onSeek as EventListener);

    if (player) {
      player.on([SystemEvents.volume], onUpdateSliderPosition);
    }

    return () => {
      slider.removeEventListener('progressValue', onSeek as EventListener);

      if (player) {
        player.off([SystemEvents.volume], onUpdateSliderPosition);
      }
    };
  }, [ref, player]);

  return ref;
}

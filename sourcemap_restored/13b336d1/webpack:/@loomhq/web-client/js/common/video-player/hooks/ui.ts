import { useAnonUserName } from '@js/common/useAnonUserName';
import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import { useOnClickOutside } from '@loomhq/lens';

import {
  UiEvents,
  useCommentPortal,
  useCommentsEnabled,
  useViewportContext,
  debounce,
} from '..';
import {
  ExtendedReactionType,
  useIsLoggedUser,
  useModelId,
  useVideoContext,
  useVideoPlatform,
} from '../context';
import { usePlayer, usePlayerFromContext, getRectSize } from '../hooks';
import {
  videoGlobalContainerClassName,
  videoMouseIsActiveClassName,
} from '../variables';

const MOUSEOVER_TIMEOUT_MS = 2000;

export const useMouseMovement = (): React.RefObject<HTMLDivElement> => {
  const ref = React.useRef<HTMLDivElement>(null);
  const moveDetection = React.useRef<number>();
  const { toggleIsMouseActive } = useVideoContext();

  React.useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const wrapper = ref.current.closest(
      `.${videoGlobalContainerClassName}`
    ) as Element;

    const onLeave = () => {
      wrapper.classList.remove(videoMouseIsActiveClassName);
      toggleIsMouseActive(false);
      window.clearTimeout(moveDetection.current);
    };

    const onMove = () => {
      window.clearTimeout(moveDetection.current);
      moveDetection.current = window.setTimeout(() => {
        wrapper.classList.remove(videoMouseIsActiveClassName);
      }, MOUSEOVER_TIMEOUT_MS);

      if (wrapper.classList.contains(videoMouseIsActiveClassName)) {
        return;
      }

      wrapper.classList.add(videoMouseIsActiveClassName);
      toggleIsMouseActive(true);
    };

    wrapper.addEventListener('mouseleave', onLeave);
    wrapper.addEventListener('mousemove', onMove);
    wrapper.addEventListener('mousedown', onMove);
    wrapper.addEventListener('touchmove', onMove);

    return () => {
      wrapper.removeEventListener('mouseleave', onLeave);
      wrapper.removeEventListener('mousemove', onMove);
      wrapper.removeEventListener('mousedown', onMove);
      wrapper.removeEventListener('touchmove', onMove);
    };
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [ref]);

  return ref;
};

export function useHandleReaction(): (
  variant: ExtendedReactionType,
  cb?: () => void
) => void {
  const player = usePlayerFromContext();
  const isAnonNameRequired = useAnonNameRequired();
  const videoPlatform = useVideoPlatform();
  const isLoggedUser = useIsLoggedUser();
  const modelId = useModelId();

  return React.useCallback(
    (variant: ExtendedReactionType, cb?: () => void) => {
      if (!player) {
        return;
      }

      // We only want to soft gate embed players, hence excluding the main share page player
      const videoTimestamp = Math.round(player?.currentTime || 0);
      const pathToSharePageWithReaction = `/share/${modelId}?asg_reaction=true&reaction=${variant}&video_time_stamp=${videoTimestamp}`;

      if (!isLoggedUser) {
        window.open(
          pathToSharePageWithReaction,
          '_blank',
          'noopener noreferrer'
        );

        return;
      }

      if (isAnonNameRequired) {
        player.anonNewReaction(variant);

        return;
      }

      player.submitNewReaction(variant, videoPlatform);

      cb && cb();
    },
    [player, isAnonNameRequired, videoPlatform, modelId, isLoggedUser]
  );
}

export function useHandleCommentFormOpen(): void {
  const player = usePlayerFromContext();
  const { isOpen, setOpen } = useCommentPortal();

  const commentsEnabled = useCommentsEnabled();

  const onToggle = React.useCallback(
    () => setOpen(commentsEnabled && !isOpen),
    [setOpen, commentsEnabled, isOpen]
  );

  React.useEffect(() => {
    if (!player) {
      return;
    }

    player.on([UiEvents.commentFormToggle], onToggle);

    return () => {
      player.off([UiEvents.commentFormToggle], onToggle);
    };
  }, [player, onToggle]);
}

export function useAnonNameRequired(): boolean {
  const { anonUserName } = useAnonUserName();
  const anonNameSet = Boolean(anonUserName);
  const isLoggedUser = useIsLoggedUser();

  return !isLoggedUser && !anonNameSet;
}

export function useObserveElementSize(
  variableName: string
): React.RefObject<HTMLDivElement> {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    const el = ref.current.closest(`.${videoGlobalContainerClassName}`);

    const onResize = (entries: ResizeObserverEntry[]) => {
      const [entry] = entries || [];
      const { height } = getRectSize(entry);
      const { style } = el as HTMLElement;

      style.setProperty(`--lvp-${variableName}-height`, `${height}px`);
    };

    const obs = new ResizeObserver(debounce(onResize, 150));

    obs.observe(ref.current);

    return () => {
      obs.disconnect();
    };
  });

  return ref;
}

export const usePopoverHandler = (
  onClose?: () => void
): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.MutableRefObject<null>,
] => {
  const [isOpen, setIsOpen] = React.useState(false);

  const ref = React.useRef(null);

  useOnClickOutside(ref, () => {
    if (onClose) {
      onClose();
    }

    setIsOpen(false);
  });

  return [isOpen, setIsOpen, ref] as [boolean, typeof setIsOpen, typeof ref];
};

export const useReactionsPopover = ({
  videoId,
  disabled,
}: {
  videoId: string;
  disabled: boolean;
}): [boolean, () => void, React.MutableRefObject<null>] => {
  const player = usePlayer(videoId);
  const [isOpen, setIsOpen, ref] = usePopoverHandler();

  const onReactionKey = React.useCallback(() => {
    setIsOpen(o => !o);
  }, [setIsOpen]);

  React.useEffect(() => {
    if (!player) {
      return;
    }

    if (!disabled) {
      player.on([UiEvents.toggleReactionPicker], onReactionKey);

      return () => {
        player.off([UiEvents.toggleReactionPicker], onReactionKey);
      };
    }
  }, [player, isOpen, setIsOpen, onReactionKey, videoId, disabled]);

  React.useEffect(() => {
    if (!player) {
      return;
    }

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const handleEsc = (e: any) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(!isOpen);
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [player, isOpen, setIsOpen]);

  return [isOpen, onReactionKey, ref] as [
    boolean,
    typeof onReactionKey,
    typeof ref,
  ];
};

export const useLvpUnit = (): string => {
  const { width } = useViewportContext();

  const defaultUnitPx = 8;
  const defaultUnit = `${defaultUnitPx}px`;
  const minMidViewSizePx = 600;
  const maxMidViewSizePx = 1200;
  const shrinkProportion = 0.87;
  const growProportion = 1.4;
  const minUnit = `${Math.round(shrinkProportion * defaultUnitPx)}px`;
  const maxUnit = `${Math.round(growProportion * defaultUnitPx)}px`;

  const getLvpUnit = () => {
    const getSlope = (viewWidth: number) => {
      // has to be a round number, decimals conflict tooltip placements
      return `${Math.round(width / (viewWidth / defaultUnitPx))}px`;
    };

    if (width < minMidViewSizePx) {
      return `clamp(${minUnit}, ${getSlope(minMidViewSizePx)}, ${defaultUnit})`;
    }

    if (width > maxMidViewSizePx) {
      return `clamp(${defaultUnit}, ${getSlope(maxMidViewSizePx)}, ${maxUnit})`;
    }

    return '8px';
  };

  const lvpUnit = getLvpUnit();

  return lvpUnit;
};

export const useContainerBoundary = (): {
  ref: React.RefObject<HTMLDivElement>;
  boundaryRef: React.MutableRefObject<Element | undefined>;
} => {
  const ref = React.useRef<HTMLDivElement>(null);
  const boundaryRef = React.useRef<Element>();

  React.useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    boundaryRef.current = ref.current.closest(
      `.${videoGlobalContainerClassName}`
    ) as Element;
  }, [ref]);

  return { ref, boundaryRef };
};

/**
 * When the component mounts it will check whether the video is playing
 * In that case it will pause the video and resume it when the components unmounts.
 * The component mounts on open and unmounts when the comment is submitted/cancelled.
 */
export const usePauseOnComponentOpen = (): void => {
  const player = usePlayerFromContext();
  const shouldPlay = React.useRef(false);

  React.useEffect(() => {
    if (!player) {
      return;
    }

    if (!player.paused) {
      shouldPlay.current = true;
      player.pause();
    }

    return () => {
      if (!shouldPlay.current) {
        return;
      }

      player.safePlay();
    };
  }, [player]);
};

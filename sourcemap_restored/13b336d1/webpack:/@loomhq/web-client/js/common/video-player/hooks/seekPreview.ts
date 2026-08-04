import React from 'react';

import { useVideoSeekPreviewUrl } from '@js/components/video-player-fresh/video-seek-preview/useVideoSeekPreviewUrl';
import { ScrubberThumbnailTimeMapping, parseVtt } from '@js/utilities/captions';
import fetch from '@js/utilities/fetch';
import { throttle } from '..';

export function useSeekPreview(
  playerHasStarted: boolean,
  videoId: string
): React.MutableRefObject<null> {
  const ref = React.useRef(null);
  const { seekPreviewUrls } = useVideoSeekPreviewUrl();
  const [tiles, setTiles] = React.useState<ScrubberThumbnailTimeMapping[]>();
  const url = seekPreviewUrls[videoId];

  React.useEffect(() => {
    if (!url) {
      return;
    }

    fetch(url)
      .then(res => res.text())
      .then(parseVtt)
      .then(data => setTiles(data));
  }, [url, videoId]);

  React.useEffect(() => {
    if (!ref.current || !playerHasStarted) {
      return;
    }

    const element = ref.current as HTMLElement;
    const img = element.querySelector('img') as HTMLImageElement;

    if (!tiles || !img || !url) {
      element.style.visibility = 'hidden';

      return;
    }

    element.style.visibility = 'visible';

    const path = getFullPath(url);

    const src = makeSrc(path, tiles[0].text, url.split('.vtt')[1]);

    if (img) {
      img.src = src;
    }

    const config = { attributes: true, childList: false, subtree: false };

    const findTileCoords = (time: number) => {
      return tiles.find(el => {
        return time >= el.startTime && time <= el.endTime;
      });
    };

    // set thumbnail size
    element.style.setProperty('--seekPreviewW', `${tiles[0].w}px`);
    element.style.setProperty('--seekPreviewH', `${tiles[0].h}px`);

    const callback = throttle(() => {
      const time = element.getAttribute('data-time');

      if (!time) {
        return;
      }

      const tile = findTileCoords(Number(time));

      if (!tile) {
        return;
      }

      // avoid jank
      requestAnimationFrame(() => {
        img.style.top = `${tile.y / -1}px`;
        img.style.left = `${tile.x / -1}px`;
      });
    }, 100);

    const observer = new MutationObserver(callback);

    observer.observe(ref.current, config);

    return () => {
      observer.disconnect();
    };
  }, [tiles, url, playerHasStarted, videoId]);

  return ref;
}

function getFullPath(url?: string) {
  if (!url) {
    return '';
  }

  const parts = url.split('/');

  parts.pop();

  return parts.join('/');
}

function makeSrc(path: string, file: string, cloudfrontParams: string) {
  return `${path}/${file.replace('/', '')}${cloudfrontParams}`;
}

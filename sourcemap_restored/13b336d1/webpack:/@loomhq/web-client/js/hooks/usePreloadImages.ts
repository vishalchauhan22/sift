import { useEffect, useState } from 'react';

function preloadImage(src: string) {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve();
    };
    img.onerror = img.onabort = function () {
      reject();
    };
    img.src = src;
  });
}

/**
 *  Preloads an array of images (once, does not handle dynamic array) such that
 *  when they are rendered in an <img> tag, they have (hopefully) already been
 *  downloaded and cached
 */
export function usePreloadImages(imageSrcs: string[]): {
  imagesPreloaded: boolean;
} {
  const [imagesPreloaded, setImagesPreloaded] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    async function effect() {
      if (isCancelled) {
        return;
      }

      const imagesPromiseList: Promise<void>[] = [];
      for (const i of imageSrcs) {
        imagesPromiseList.push(preloadImage(i));
      }

      await Promise.all(imagesPromiseList);

      if (isCancelled) {
        return;
      }

      setImagesPreloaded(true);
    }

    effect();

    return () => {
      isCancelled = true;
    };
    // We intentionally want to do this once only, with static imageSrcs (but
    // consumers might want to pass an array literal for convenience)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { imagesPreloaded };
}

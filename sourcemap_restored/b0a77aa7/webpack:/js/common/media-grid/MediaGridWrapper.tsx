import React, { useEffect, useState, HTMLProps } from 'react';

import { Arrange } from '@loomhq/lens';

import { useWideMediaGrid } from './useWideMediaGrid';

type MediaGridWrapperProps = HTMLProps<HTMLDivElement> & {
  htmlTag?: 'div' | 'li' | 'ol' | 'ul' | undefined;
  children: React.ReactNode;
  loader?: boolean;
};

export const MediaGridWrapper = ({
  htmlTag = 'ul' /* If you pass something other than ul/ol, please make sure that the VideoCard children are wrapped in a ul/ol to maintain semantics/accessibility. */,
  children,
  loader = false,
}: MediaGridWrapperProps): JSX.Element | null => {
  const [isWideGrid, setIsWideGrid] = useState<boolean | null>(null);

  const showMediaGrid = useWideMediaGrid();

  useEffect(() => {
    if (showMediaGrid) {
      setIsWideGrid(showMediaGrid);
    }
  }, [showMediaGrid]);

  useEffect(() => {
    if (isWideGrid !== null && !loader) {
      if (isWideGrid) {
        document.documentElement.style.setProperty(
          '--mainContentMaxWidth',
          '166.75rem'
        );
      } else {
        // Does this part ever
        document.documentElement.style.setProperty(
          '--mainContentMaxWidth',
          '70rem'
        );
      }
    }
  }, [isWideGrid, loader]);

  useEffect(() => {
    //  Cleanup on mount but only for non-loaders or else there's massive resizing issues
    return () => {
      if (!loader) {
        document.documentElement.style.setProperty(
          '--mainContentMaxWidth',
          '70rem'
        );
      }
    };
  }, [loader]);

  if (isWideGrid === null) {
    null;
  }

  return (
    <Arrange
      htmlTag={htmlTag}
      columns={
        isWideGrid
          ? 'repeat(auto-fill, minmax(clamp(15.5rem, 13vw, 24.25rem), 1fr))'
          : 'repeat(auto-fill, minmax(15.5rem, 1fr))'
      }
      gap="medium"
      aria-live={loader ? 'polite' : undefined}
      role={loader ? 'status' : undefined}
      aria-busy={loader ? 'true' : undefined}
    >
      {children}
    </Arrange>
  );
};

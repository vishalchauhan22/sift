// Indicates whether a use is at the bottom of the transcript container
import React from 'react';
import { Container } from '@loomhq/lens';
import { useBookmarkVisibility } from './useBookmarkVisibility';

type BookmarkProps = {
  onVisibilityChange: (isVisible: boolean) => void;
  id: string;
  initialInView?: boolean;
};

export const Bookmark: React.FC<BookmarkProps> = ({
  onVisibilityChange,
  id,
  initialInView = false,
}) => {
  const bookmarkRef = useBookmarkVisibility({
    onVisibilityChange,
    initialInView,
  });

  return <Container height={1} id={id} refHandler={bookmarkRef}></Container>;
};

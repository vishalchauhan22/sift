import React, { useEffect } from 'react';

import { useCommentPortal } from './commentPortalProvider';

export const CommentPortalSlot: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { setElement } = useCommentPortal();

  useEffect(() => {
    setElement(children);
  }, [children, setElement]);

  return null;
};

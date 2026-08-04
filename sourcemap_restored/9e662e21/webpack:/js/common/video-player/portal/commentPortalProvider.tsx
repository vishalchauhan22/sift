import React, { createContext, useContext, useState } from 'react';

interface CommentPortalContext {
  element?: React.ReactNode;
  setElement: (element: React.ReactNode) => void;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const commentContext = createContext<CommentPortalContext>({
  setElement: () => undefined,
  isOpen: false,
  setOpen: () => undefined,
});

export function CommentPortalProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [element, setElement] = useState<React.ReactNode | null>(null);
  const [isOpen, setOpen] = useState(false);

  return (
    <commentContext.Provider value={{ element, setElement, isOpen, setOpen }}>
      {children}
    </commentContext.Provider>
  );
}

export function useCommentPortal(): CommentPortalContext {
  return useContext(commentContext);
}

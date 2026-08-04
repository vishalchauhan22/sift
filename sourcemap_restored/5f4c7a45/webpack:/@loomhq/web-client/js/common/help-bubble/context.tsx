import React, { useState, useMemo } from 'react';

type HelpBubbleContextType = {
  showBubble: boolean;
  setShowBubble: (show: boolean) => void;
};

const DEFAULT_VALUE: HelpBubbleContextType = {
  showBubble: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setShowBubble: () => {},
};

export const HelpBubbleContext =
  React.createContext<HelpBubbleContextType>(DEFAULT_VALUE);

export const HelpBubbleProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [showBubble, setShowBubble] = useState<boolean>(true);
  const value = useMemo(
    () => ({
      showBubble,
      setShowBubble,
    }),
    [showBubble]
  );

  return (
    <HelpBubbleContext.Provider value={value}>
      {children}
    </HelpBubbleContext.Provider>
  );
};

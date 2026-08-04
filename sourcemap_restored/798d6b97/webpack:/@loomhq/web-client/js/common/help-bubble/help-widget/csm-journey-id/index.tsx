import React, { createContext, useContext, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

const CsmJourneyIdContext = createContext<string | null>(null);

export const CsmJourneyIdProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [uuid] = useState<string | null>(() => uuidv4());

  return (
    <CsmJourneyIdContext.Provider value={uuid}>
      {children}
    </CsmJourneyIdContext.Provider>
  );
};

export const useCsmJourneyId = (): string => {
  const csmJourneyId = useContext(CsmJourneyIdContext);

  if (!csmJourneyId) {
    throw new Error('CsmJourneyIdProvider not found');
  }

  return csmJourneyId;
};

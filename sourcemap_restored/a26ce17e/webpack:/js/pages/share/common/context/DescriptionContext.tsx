import { SUMMARY_EDIT_FIELD_ACTIVATED } from '@js/constants/events';

import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import * as analytics from '@js/utilities/analytics';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

type DescriptionContextType = {
  isDescriptionInputVisible: boolean;
  setIsDescriptionInputVisible: (value: boolean) => void;
  focusDescriptionInput: (
    videoId: string,
    source: 'description_area' | 'sidebar'
  ) => void;
};

const DescriptionContext = createContext<DescriptionContextType | null>(null);

export const DescriptionContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [isDescriptionInputVisible, setIsDescriptionInputVisible] =
    useState(false);

  const focusDescriptionInput = useCallback((videoId: any, source: any) => {
    setIsDescriptionInputVisible(true);
    analytics.track(SUMMARY_EDIT_FIELD_ACTIVATED, {
      ...withIdentifiers(
        SUMMARY_EDIT_FIELD_ACTIVATED,
        AnalyticsEntityId.video(videoId, 'video_id')
      ),
      source,
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      isDescriptionInputVisible,
      setIsDescriptionInputVisible,
      focusDescriptionInput,
    }),
    [focusDescriptionInput, isDescriptionInputVisible]
  );

  return (
    <DescriptionContext.Provider value={contextValue}>
      {children}
    </DescriptionContext.Provider>
  );
};

export const useDescriptionContext = function (): DescriptionContextType {
  const context = useContext(DescriptionContext);

  if (!context) {
    throw new Error(
      'useDescriptionContext must be used within a DescriptionContextProvider'
    );
  }

  return context;
};

import {
  useCurrentUserSelector,
  useIsCurrentUserLoggedIn,
} from '@js/common/current-user';
import { useUpdateUserPropertyMutation } from '@js/hooks/user/UpdateUserProperty.generated';
import noop from 'lodash/noop';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { incrementMetric } from '@js/utilities/metrics';
import { getPathnameForMetrics } from '@js/utilities/url';

type ShouldShowFtuxArgs = {
  ftuxKey: string;
  otherFtuxKeysToPrefer?: string[];
};

type ConsolidatedEditFtuxContextType = {
  /** Returns whether the given FTUX should be displayed. If there are any
   * otherFtuxToPrefer in the user's available (i.e not-yet-seen) FTUX, this
   * will return false */
  shouldShowFtux: (args: ShouldShowFtuxArgs) => boolean;

  /** Dismisses a given ftux. Will emit the analytics event, as well as retain local
   * state to prevent the ftux from being shown again in the same session */
  onDismissFtux: (ftuxKey: string) => void;

  /** Emits the analytics event for the given ftux being shown. */
  onFtuxShown: (ftuxKey: string) => void;
};

const ConsolidatedEditFtuxContext =
  createContext<ConsolidatedEditFtuxContextType>({
    shouldShowFtux: () => false,
    onDismissFtux: noop,
    onFtuxShown: noop,
  });

export const ConsolidatedEditFtuxProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const availableFtux = useCurrentUserSelector(user => user.availableFtux, []);
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const [dismissedFtuxKeys, setDismissedFtuxKeys] = useState<string[]>([]);
  const [updateUserProperty] = useUpdateUserPropertyMutation();

  const shouldShowFtux = useCallback(
    ({ ftuxKey, otherFtuxKeysToPrefer = [] }: ShouldShowFtuxArgs) => {
      const isInAvailableFtux = availableFtux.some(
        ftux => ftux.name === ftuxKey
      );
      const isOtherFtuxToPreferInAvailableFtux = availableFtux.some(
        ftux => ftux.name && otherFtuxKeysToPrefer.includes(ftux.name)
      );

      // Ftux is not in the availableFtux for the user (i.e they have dismissed it in another session)
      if (!isInAvailableFtux) {
        return false;
      }

      // Suppress this FTUX as there's another ftux that should be preferred this session
      if (isOtherFtuxToPreferInAvailableFtux) {
        return false;
      }

      // Ftux has been dismissed in this session
      if (dismissedFtuxKeys.includes(ftuxKey)) {
        return false;
      }

      return true;
    },
    [availableFtux, dismissedFtuxKeys]
  );

  const onFtuxShown = useCallback(
    (ftuxKey: string) => {
      const ftux = availableFtux.find(ftux => ftux.name === ftuxKey);
      const isAlreadyDismissed = dismissedFtuxKeys.includes(ftuxKey);

      if (!ftux || isAlreadyDismissed) {
        return;
      }

      incrementMetric('ftux.visible', {
        name: ftuxKey,
        path: getPathnameForMetrics(),
        priority: ftux.priority,
        isLoggedIn,
      });
    },
    [availableFtux, dismissedFtuxKeys, isLoggedIn]
  );

  const onDismissFtux = useCallback(
    (ftuxKey: string) => {
      const ftux = availableFtux.find(ftux => ftux.name === ftuxKey);
      const isAlreadyDismissed = dismissedFtuxKeys.includes(ftuxKey);

      if (!ftux || isAlreadyDismissed) {
        return;
      }

      setDismissedFtuxKeys(prevDismissedFtuxKeys => [
        ...prevDismissedFtuxKeys,
        ftuxKey,
      ]);

      updateUserProperty({
        variables: {
          name: ftuxKey,
          value: true,
        },
      });

      incrementMetric('ftux.dismissed', {
        name: ftuxKey,
        path: getPathnameForMetrics(),
        priority: ftux.priority,
        isLoggedIn,
      });
    },
    [availableFtux, dismissedFtuxKeys, isLoggedIn, updateUserProperty]
  );

  return (
    <ConsolidatedEditFtuxContext.Provider
      value={{
        onFtuxShown,
        shouldShowFtux,
        onDismissFtux,
      }}
    >
      {children}
    </ConsolidatedEditFtuxContext.Provider>
  );
};

export const useConsolidatedEditFtuxContext =
  (): ConsolidatedEditFtuxContextType => {
    return useContext(ConsolidatedEditFtuxContext);
  };

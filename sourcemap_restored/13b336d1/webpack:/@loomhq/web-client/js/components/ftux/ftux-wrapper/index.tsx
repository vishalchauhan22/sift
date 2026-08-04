import cn from 'classnames';
import {
  useIsCurrentUserLoggedIn,
  useCurrentUserSelector,
} from '@js/common/current-user';
import { LegacyErrorBoundary } from '@js/common/error-management';
import { useOnDismissFtux } from '@js/hooks/ftux';
import { useMount } from '@js/hooks/useMount';
import React, { ReactElement, ReactNode, useEffect, useRef } from 'react';

import { incrementMetric } from '@js/utilities/metrics';

import { getPathnameForMetrics } from '@js/utilities/url';

import {
  ALL_FTUX,
  FTUX_NOTIFICATIONS,
} from '@loomhq/shared-utilities/constants/ftux';
import { Feature } from '@loomhq/shared-utilities/constants/product';

import { getLocalStorageKey } from '@js/utilities/localStorage';

import { useFtuxStore } from '@js/common/ftux/ftuxStore';

import styles from './styles.module.less';
import { AvailableFtux } from '@js/globalTypes.generated';
import { withChoreographedRender } from '@js/utilities/choreography';

function FtuxBaseWrapper({
  hasTransition,
  childComponent,
}: {
  hasTransition: boolean;
  childComponent:
    | (
        | string
        | number
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
      )[]
    | null
    | undefined;
}): ReactElement {
  return (
    <>
      <LegacyErrorBoundary feature={Feature.FTUX}>
        <div className={cn(hasTransition && styles.fadeInTooltip)}>
          {childComponent}
        </div>
      </LegacyErrorBoundary>
    </>
  );
}

const ChoreographedFtux =
  withChoreographedRender<React.ComponentProps<typeof FtuxBaseWrapper>>(
    FtuxBaseWrapper
  );

type FtuxWrapperProps = {
  children: ReactNode;
  ignoreOnDismissProp?: boolean;
  name: string;
  hasTransition?: boolean;
};

// eslint-disable-next-line import/no-default-export
export default function FtuxWrapper({
  children,
  name,
  ignoreOnDismissProp = false,
  hasTransition = true,
}: FtuxWrapperProps): ReactElement | null {
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const onDismissFtux = useOnDismissFtux();
  const {
    setAvailableFtuxAnonymous,
    setTriggeredFtux,
    availableFtuxAnonymous,
    visibleFtux,
  } = useFtuxStore();
  const availableFtuxFromServer = useCurrentUserSelector(
    user => user.availableFtux || null,
    null
  );

  const visibleFtuxRef = useRef<AvailableFtux[] | null>(null);

  useEffect(() => {
    // if user isn't logged in, check local storage for undismissed ftux
    if (!isLoggedIn) {
      const availableFtux: object[] = [];

      ALL_FTUX.forEach(ftux => {
        const anonFtux = getLocalStorageKey(ftux);

        if (anonFtux === null || (anonFtux && anonFtux.show === true)) {
          availableFtux.push({ name: ftux, ...FTUX_NOTIFICATIONS[ftux] });
        }
      });

      setAvailableFtuxAnonymous(availableFtux);
    }
  }, [setAvailableFtuxAnonymous, isLoggedIn]);

  useEffect(() => {
    const availableFtux = isLoggedIn
      ? availableFtuxFromServer
      : availableFtuxAnonymous;
    const ftuxComponent = availableFtux?.find(ftux => ftux.name === name);

    if (ftuxComponent) {
      setTriggeredFtux(ftuxComponent);
    }
  }, [
    setTriggeredFtux,
    availableFtuxAnonymous,
    availableFtuxFromServer,
    isLoggedIn,
    name,
    visibleFtux,
  ]);

  useMount(() => {
    // increment metrics
    const metricsSetTimeout = setTimeout(() => {
      const ftuxInVisible = visibleFtuxRef.current?.find(
        ftux => ftux.name === name
      );

      if (ftuxInVisible) {
        incrementMetric('ftux.visible', {
          name,
          path: getPathnameForMetrics(),
          priority: ftuxInVisible?.priority,
          isLoggedIn,
          totalVisibleFtux: visibleFtuxRef.current?.length,
        });
      }

      clearTimeout(metricsSetTimeout);
    }, 2000);
  });

  useEffect(() => {
    visibleFtuxRef.current = visibleFtux;
  }, [visibleFtux]);

  // if name doesn't match anything in available ftux, return early
  if (!visibleFtux.find(ftux => ftux.name === name)) {
    return null;
  }

  const onDismiss = () => {
    onDismissFtux(name);
  };

  type ChildComponent = React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >;
  const isOnDismissSupported = (
    component: ChildComponent
  ): component is ChildComponent & { onDismiss: () => void } => {
    return 'onDismiss' in component.props;
  };
  const childComponent = React.Children.map(children, child => {
    if (
      React.isValidElement(child) &&
      !ignoreOnDismissProp &&
      isOnDismissSupported(child)
    ) {
      return React.cloneElement(child, {
        onDismiss,
      });
    }

    incrementMetric('ftux.error', {
      name,
      path: getPathnameForMetrics(),
      isLoggedIn,
    });

    return child;
  });

  return (
    <ChoreographedFtux
      messageId={name}
      hasTransition={hasTransition}
      childComponent={childComponent}
    />
  );
}

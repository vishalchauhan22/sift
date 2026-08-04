import { ErrorSeverities } from '@js/constants/error-severities';

import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import { useOnDismissFtux } from '@js/hooks/ftux';
import React, { useEffect, useState } from 'react';

import { Link, Toast, NotificationBar } from '@loomhq/lens';

import { CREATOR_LITE_LIMIT_BANNER_ID } from '@loomhq/shared-utilities/constants/limits';
import { UserPropertyEnum } from '@loomhq/shared-utilities/constants/userProperties';

type ErrorBarProps = {
  onCloseCallback?: () => void;
  onPrimaryAction?: () => void;
  inline?: boolean;
  bannerId?: string;
};

const ErrorBar = ({ onCloseCallback }: ErrorBarProps): JSX.Element => {
  // TODO: remove after we get rid of error bar reducer
  const onDismissFtux = useOnDismissFtux();
  const {
    errorBar: {
      actionHref,
      actionHrefLabel,
      autoCloseTimer,
      bannerId,
      message,
      severity,
      showing,
    },
    closeErrorBar,
  } = useErrorBar();

  const [isVisible, setIsVisible] = useState(false);

  // Remaps success to info for bar as we've deprecated SUCCESS-specific colour for NotificationBar
  // TODO: clean up this deprecated logic when migrating instances of Redux error bar calls
  const lensSeverity =
    severity === ErrorSeverities.SUCCESS ? ErrorSeverities.INFO : severity;

  const showToast =
    severity === ErrorSeverities.SUCCESS || severity === ErrorSeverities.INFO;

  useEffect(() => {
    if (showing && severity) {
      setIsVisible(true);
    }
  }, [showing, severity]);

  useEffect(() => {
    if (autoCloseTimer && autoCloseTimer > 0) {
      const timeoutId = setTimeout(() => {
        closeErrorBar();
      }, autoCloseTimer);
      return () => clearTimeout(timeoutId);
    }
  }, [autoCloseTimer, closeErrorBar]);

  const closeHandler = () => {
    if (onCloseCallback) {
      onCloseCallback();
    }

    if (bannerId === CREATOR_LITE_LIMIT_BANNER_ID) {
      onDismissFtux(UserPropertyEnum.CREATOR_LITE_MEMBER_LIMIT_GLOBAL_BANNER);
    }

    closeErrorBar();
  };

  return (
    <>
      {isVisible && !showToast && (
        <NotificationBar
          onCloseClick={closeHandler}
          severity={lensSeverity}
          isOpen={showing}
          id={bannerId}
        >
          <>{String(message)}</>
          {actionHref && actionHrefLabel ? (
            <Link variant="neutral" target="_blank" href={actionHref}>
              {actionHrefLabel}
            </Link>
          ) : null}
        </NotificationBar>
      )}
      {isVisible && showToast && (
        <Toast isOpen={showing} onCloseClick={closeHandler}>
          <>{String(message)}</>
        </Toast>
      )}
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default ErrorBar;

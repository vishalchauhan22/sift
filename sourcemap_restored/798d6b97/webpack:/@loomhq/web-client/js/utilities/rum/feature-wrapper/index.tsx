import {
  ErrorBoundary,
  SilentErrorBoundary,
} from '@js/common/error-management';
import React, { ReactNode } from 'react';

import { FeatureInfo } from '@loomhq/shared-utilities/constants/product';

import { reportFeatureEvent } from '../reporting';
import { ErrorBoundaryTypes, FeatureEvents } from './constants';
import { FeatureLoadContextProvider } from './context';

type BaseFeatureWrapperProps = {
  children: ReactNode;
  feature: FeatureInfo;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  additionalLoggingValues?: Record<string, any>;
};

type FeatureWrapperWithStandardErrorBoundaryProps = BaseFeatureWrapperProps & {
  errorType?: ErrorBoundaryTypes.DEFAULT | ErrorBoundaryTypes.SILENT;
};

type FeatureWrapperWithCustomErrorBoundaryProps<T> = BaseFeatureWrapperProps & {
  errorType: ErrorBoundaryTypes.CUSTOM;
  customErrorBoundary: JSX.Element;
} & T;

type FeatureWrapperProps<T = Record<string, unknown>> =
  | FeatureWrapperWithStandardErrorBoundaryProps
  | FeatureWrapperWithCustomErrorBoundaryProps<T>;

function hasCustomErrorBoundary<T>(
  props: FeatureWrapperProps<T>
): props is FeatureWrapperWithCustomErrorBoundaryProps<T> {
  return props.errorType === ErrorBoundaryTypes.CUSTOM;
}

export const FeatureWrapper = <T,>(
  props: FeatureWrapperProps<T>
): JSX.Element => {
  const {
    children,
    feature,
    errorType = ErrorBoundaryTypes.DEFAULT,
    additionalLoggingValues,
  } = props;

  const handleError = error => {
    reportFeatureEvent(FeatureEvents.ERRORED, feature, { error });
  };

  let ErrorWrapper;

  switch (errorType) {
    case ErrorBoundaryTypes.SILENT:
      ErrorWrapper = SilentErrorBoundary;
      break;

    case ErrorBoundaryTypes.CUSTOM:
      if (hasCustomErrorBoundary<T>(props)) {
        return (
          <FeatureLoadContextProvider feature={feature}>
            {props.customErrorBoundary}
          </FeatureLoadContextProvider>
        );
      }

      throw new Error(
        'Custom error boundary type requires a customErrorBoundary prop'
      );

    default:
      ErrorWrapper = ErrorBoundary;
  }

  return (
    <ErrorWrapper feature={feature} onError={handleError}>
      <FeatureLoadContextProvider
        feature={feature}
        additionalLoggingValues={additionalLoggingValues}
      >
        {children}
      </FeatureLoadContextProvider>
    </ErrorWrapper>
  );
};

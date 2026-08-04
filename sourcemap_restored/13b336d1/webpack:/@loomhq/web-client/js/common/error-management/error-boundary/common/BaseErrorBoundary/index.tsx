import React, { ErrorInfo, PropsWithChildren, ReactNode } from 'react';

import * as logger from '@js/utilities/loggerx';

import { FeatureInfo } from '@loomhq/shared-utilities/constants/product';

import { registerErrorBoundary, unregisterErrorBoundary } from '../dev-console';
import { supportedBrowsersRegex } from '../supportedBrowsersRegex';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BaseProps
  extends PropsWithChildren<{
    feature: FeatureInfo;
    onError?: (error: Error) => void;
    renderError?: ({ error }: { error: Error }) => ReactNode;
    name?: string;
  }> {}

interface FeatureProps extends BaseProps {
  feature: FeatureInfo;
}

export type BaseErrorBoundaryProps = FeatureProps;

interface BaseErrorBoundaryState {
  error: null | Error;
  rerouting: boolean;
}

export class BaseErrorBoundary extends React.Component<
  BaseErrorBoundaryProps,
  BaseErrorBoundaryState
> {
  state: BaseErrorBoundaryState = {
    error: null,
    rerouting: false,
  };

  componentDidMount(): void {
    if (this.props.name) {
      registerErrorBoundary(this.props.name, this.componentDidCatch.bind(this));
    }
  }

  componentDidUpdate(prevProps: Readonly<BaseErrorBoundaryProps>): void {
    if (prevProps.name && prevProps.name !== this.props.name) {
      unregisterErrorBoundary(prevProps.name);
    }

    if (this.props.name && this.props.name !== prevProps.name) {
      registerErrorBoundary(this.props.name, this.componentDidCatch.bind(this));
    }
  }

  componentWillUnmount(): void {
    if (this.props.name) {
      unregisterErrorBoundary(this.props.name);
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (
      !supportedBrowsersRegex.test(navigator.userAgent) &&
      !window.location.href.includes('/upgrade-browser')
    ) {
      window.location.href = '/upgrade-browser';
      this.setState({ rerouting: true, error: null });

      return;
    }

    if (this.props.onError) {
      this.props.onError(error);
    }

    logger.error(
      error,
      { ...errorInfo },
      {
        componentDidCatch: true,
        feature: this.props.feature,
        supportedBrowser: supportedBrowsersRegex.test(navigator.userAgent),
      }
    );

    this.setState({ error, rerouting: false });
  }

  render(): ReactNode {
    if (this.state.rerouting) {
      return null;
    }

    if (this.state.error) {
      if (this.props.renderError) {
        return this.props.renderError({ error: this.state.error });
      }

      return null;
    }

    return this.props.children;
  }
}

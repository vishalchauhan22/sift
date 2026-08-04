'use es6';

import { PageErrorBoundary } from '@js/common/error-management';
import React, { Component, ReactNode } from 'react';

import { TeamInfo } from '@loomhq/shared-utilities/constants/product';

import { fatal } from '../loggerx';
import { RUMProvider } from './RUMProvider';
import {
  DefaultReportingContext,
  ReportingContextProvider,
} from './ReportingContextProvider';
import { RUMReportingContext } from './reporting';

interface RUMWrapperProps<T extends RUMReportingContext> {
  children: ReactNode;
  pageName: string;
  expectedMarkers: string[];
  optionalMarkers?: string[];
  ReportingContext: ReportingContextProvider<T>;
  timeoutMs: number;
  team: TeamInfo;
}

interface RUMWrapperState {
  criticalError: boolean;
}

export class RUMWrapper<T extends RUMReportingContext> extends Component<
  RUMWrapperProps<T>,
  RUMWrapperState
> {
  state = {
    criticalError: false,
  };

  static defaultProps = {
    ReportingContext: DefaultReportingContext,
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    const wrapped = new Error('RUMWrapper caught critical error');

    wrapped.cause = error;
    fatal(wrapped, { error, errorInfo }, { team: this.props.team });
    this.setState({ criticalError: true });
  }

  render(): ReactNode {
    const {
      children,
      pageName,
      expectedMarkers,
      optionalMarkers,
      timeoutMs,
      ReportingContext,
      team,
    } = this.props;
    const { criticalError } = this.state;

    if (criticalError) {
      // Attempt to circumvent the rum provider if any errors occur
      return children;
    }

    return (
      <ReportingContext
        render={extraReportingContext => (
          <RUMProvider<T>
            pageName={pageName}
            expectedMarkers={expectedMarkers}
            optionalMarkers={optionalMarkers}
            timeoutMs={timeoutMs}
            extraReportingContext={extraReportingContext}
          >
            <PageErrorBoundary team={team} pageName={pageName}>
              {children}
            </PageErrorBoundary>
          </RUMProvider>
        )}
      />
    );
  }
}

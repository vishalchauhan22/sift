// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import cn from 'classnames';
import NavigationBar from '@js/components/navigation-bar';
import React, { ReactNode } from 'react';

import * as logger from '@js/utilities/loggerx';

import { ErrorMarkers } from '@js/utilities/rum/constants';

import { ErrorMarker } from '@js/utilities/rum/markers';

import { Button, Spacer, Text } from '@loomhq/lens';
import {
  TeamInfo,
  FeatureInfo,
} from '@loomhq/shared-utilities/constants/product';

import InternetDisconnect from '@assets/img/internet-disconnect.png';

import {
  registerErrorBoundary,
  unregisterErrorBoundary,
} from './common/dev-console';
import { supportedBrowsersRegex } from './common/supportedBrowsersRegex';
import { setUfoInteractionError } from '@js/utilities/analytics/react-ufo/helpers';

const FullPageStyles = styled.div`
  height: 100vh;
  max-height: 100vh;
`;

interface BaseProps {
  children: React.ReactNode;
  pageName: string;
  team?: TeamInfo;
  feature?: FeatureInfo;
}

interface FeatureProps extends BaseProps {
  feature: FeatureInfo;
}

interface TeamProps extends BaseProps {
  team: TeamInfo;
}

type ErrorBoundaryProps = FeatureProps | TeamProps;

type State =
  | {
      hasError: true;
      error: Error;
      rerouting: false;
    }
  | {
      hasError: false;
      error: null;
      rerouting: boolean;
    };

/**
 * IMPORTANT: This error boundary is meant for top-level (root) use. It's purpose to catch and report errors when the experience is the entire app or page is completely broken.
 * Errors caught here are reported to Sentry under a custom, PageErrorBoundaryReached, error type.
 * We can then configure a Sentry rule to page incident services like PagerDuty.
 */
export class PageErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  State
> {
  state: State = {
    error: null,
    hasError: false,
    rerouting: false,
  };

  componentDidMount(): void {
    if (this.props.pageName) {
      registerErrorBoundary(
        this.props.pageName,
        this.componentDidCatch.bind(this)
      );
    }
  }

  componentDidUpdate(prevProps: Readonly<ErrorBoundaryProps>): void {
    if (prevProps.pageName && prevProps.pageName !== this.props.pageName) {
      unregisterErrorBoundary(prevProps.pageName);
    }

    if (this.props.pageName && this.props.pageName !== prevProps.pageName) {
      registerErrorBoundary(
        this.props.pageName,
        this.componentDidCatch.bind(this)
      );
    }
  }

  componentWillUnmount(): void {
    if (this.props.pageName) {
      unregisterErrorBoundary(this.props.pageName);
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    if (
      !supportedBrowsersRegex.test(navigator.userAgent) &&
      !window.location.href.includes('/upgrade-browser')
    ) {
      window.location.href = '/upgrade-browser';

      this.setState({
        rerouting: true,
        error: null,
        hasError: false,
      });

      return;
    }

    const url = new URL(window.location.toString());

    setUfoInteractionError(error);

    logger.error(
      error,
      {
        componentStack: errorInfo?.componentStack,
        url: url.toString(),
      },
      {
        pageErrorBoundary: true,
        componentDidCatch: true,
        team: this.props.team,
        feature: this.props.feature,
        supportedBrowser: supportedBrowsersRegex.test(navigator.userAgent),
      }
    );

    this.setState({ error, hasError: true, rerouting: false });
  }

  render(): ReactNode {
    if (this.state.rerouting) {
      return null;
    }

    if (this.state.hasError) {
      return (
        <FullPageStyles>
          <NavigationBar variant="empty" />
          <ErrorMarker
            name={ErrorMarkers.PageErrorBoundary}
            error={this.state.error}
          />

          <div
            style={{ maxWidth: '400px' }}
            className={cn(
              'flex',
              'flexDirection:column',
              'items:center',
              'pt:xlarge',
              'md-pt:xxlarge',
              'px:small',
              'md-px:0',
              'mr:auto',
              'ml:auto'
            )}
          >
            {/* TODO(next author): Add meaningful alt text for below img if it provides visual context and is not purely decorative. Otherwise, if the image is purely decorative, remove this todo as alt="" will suffice. Please also add an explicit height and width for performance/accessibility. */}
            <img
              alt=""
              aria-hidden={true}
              src={InternetDisconnect}
              height="250"
              width="250"
            />

            <Spacer top="small" />
            <Text size="heading-md" fontWeight="bold" alignment="center">
              Sorry! Something went wrong on our end.
            </Text>
            <Spacer top="medium" />
            <Text size="body-md" fontWeight="book" alignment="center">
              We should have a fix soon. Please try refreshing.
            </Text>
            <Spacer top="30px" />
            <Button
              variant="primary"
              type="button"
              onClick={() => {
                window.location.reload();
              }}
            >
              Refresh
            </Button>
          </div>
        </FullPageStyles>
      );
    }

    return this.props.children;
  }
}

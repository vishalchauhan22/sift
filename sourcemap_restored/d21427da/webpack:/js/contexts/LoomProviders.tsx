import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useSendUiViewEvent } from '@js/common/analytics';
import { PostOfficeBaseProvider } from '@js/common/atlassian-post-office/PostOfficeBaseProvider';
import { DevTools } from '@js/common/dev-tools';
import { PageErrorBoundary } from '@js/common/error-management';
import { HelpBubbleProvider } from '@js/common/help-bubble/context';
import { usePageInitializationContext } from '@js/common/page-initialization-provider';

import { ErrorStoreProvider } from '@js/components/video-player-fresh/error-layer/ErrorStoreProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import {
  TeamInfo,
  FeatureInfo,
  Page,
} from '@loomhq/shared-utilities/constants/product';

import { createRootReducer } from '@js/reducers';

import { CreatorLiteLimitSessionBannerWrapper } from '../components/CreatorLiteLimitSessionBannerWrapper';

import { SDKSupportProvider } from './SDKContext';
import { UfoTransitionListener } from '@js/utilities/analytics/react-ufo/UfoTransitionListener';
import UFOSegment from '@atlaskit/react-ufo/segment';
import { normalizePageName } from '@js/utilities/analytics/react-ufo/helpers';
import { ScreenSpaceFlagsPlacement } from '@js/common/atlassian-post-office/ScreenSpaceFlagsPlacement';

interface BaseProps {
  pageName: Page;
  team?: TeamInfo;
  feature?: FeatureInfo;
}

interface FeatureProps extends BaseProps {
  feature: FeatureInfo;
}

interface TeamProps extends BaseProps {
  team: TeamInfo;
}

type Props = FeatureProps | TeamProps;

export const LoomProviders: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  ...errorBoundaryProps
}) => {
  const { store } = usePageInitializationContext();

  const feature =
    'feature' in errorBoundaryProps ? errorBoundaryProps.feature : undefined;

  useSendUiViewEvent({ feature });

  return (
    <UFOSegment name={normalizePageName(errorBoundaryProps.pageName)}>
      <Provider
        store={
          store ||
          configureStore({
            reducer: createRootReducer(),
            middleware: getDefaultMiddleware({ serializableCheck: false }),
          })
        }
      >
        <SDKSupportProvider>
          <BrowserRouter>
            <UfoTransitionListener>
              <ErrorStoreProvider>
                <CreatorLiteLimitSessionBannerWrapper />
                <PageErrorBoundary {...errorBoundaryProps}>
                  <DevTools />
                  <PostOfficeBaseProvider>
                    <ScreenSpaceFlagsPlacement />
                    <HelpBubbleProvider>{children}</HelpBubbleProvider>
                  </PostOfficeBaseProvider>
                </PageErrorBoundary>
              </ErrorStoreProvider>
            </UfoTransitionListener>
          </BrowserRouter>
        </SDKSupportProvider>
      </Provider>
    </UFOSegment>
  );
};

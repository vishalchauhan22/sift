import { uid } from '@js/common/video-player';
import React, { useEffect } from 'react';

import createContext from 'zustand/context';

import { CommentPortalProvider } from '../portal/commentPortalProvider';
import { createStore } from './store';

import type { VideoContext, VideoContextProps } from './types';

const { Provider, useStore } = createContext<VideoContext>();

// Update attributes susceptible to change after the store creation.
const ProviderCustomizationUpgrader = (props: any) => {
  const {
    setShowLoomWatermark,
    setShowPoweredByLoom,
    setEnforcedPlaybar,
    setShowPauseOverlay,
    setHideBackgroundPreview,
  } = useStore();

  useEffect(() => {
    setShowLoomWatermark(
      Boolean(props.contextValue.customization.showLoomWatermark)
    );
    setShowPoweredByLoom(
      Boolean(props.contextValue.customization.showPoweredByLoom)
    );
    setEnforcedPlaybar(props.contextValue.customization.enforcedPlaybar);
    setShowPauseOverlay(props.contextValue.customization.showPauseOverlay);
    setHideBackgroundPreview(
      props.contextValue.customization.hideBackgroundPreview
    );
  }, [
    props.contextValue.customization.showLoomWatermark,
    props.contextValue.customization.showPoweredByLoom,
    props.contextValue.customization.enforcedPlaybar,
    props.contextValue.customization.showPauseOverlay,
    props.contextValue.customization,
    setShowLoomWatermark,
    setShowPoweredByLoom,
    setEnforcedPlaybar,
    setShowPauseOverlay,
    setHideBackgroundPreview,
  ]);

  return props.children;
};

export function VideoContextProvider({
  children,
  video,
  comments = [],
  userContext = {},
  customization = {},
}: VideoContextProps): JSX.Element {
  const { current: generatedUid } = React.useRef(uid());
  const uniqueId = userContext.uid || generatedUid;

  if (video.owner && !video.owner.displayName) {
    video.owner.displayName = video.owner.name;
  }

  const contextValue = {
    video: { ...video, modelId: video.id, id: uniqueId },
    comments,
    reactions: video.reactions || [],
    userContext,
    customization,
  };

  return (
    <Provider createStore={createStore(contextValue)}>
      <ProviderCustomizationUpgrader contextValue={contextValue}>
        <CommentPortalProvider>{children}</CommentPortalProvider>
      </ProviderCustomizationUpgrader>
    </Provider>
  );
}

export function useVideoContext(): VideoContext {
  const context = useStore() as VideoContext;

  if (context === undefined) {
    throw new Error(
      'useVideoContext must be used within a VideoContextProvider'
    );
  }

  return context;
}

export const useVideoStore = useStore;

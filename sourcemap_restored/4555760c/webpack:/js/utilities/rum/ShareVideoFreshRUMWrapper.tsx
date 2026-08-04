import { useVideoPasswordContext } from '@js/common/video-password';
import { usePlayer, useVideoContext } from '@js/common/video-player';
import { differenceInDays } from 'date-fns';

import pick from 'lodash/pick';
import React, { FC, useCallback, useMemo, useRef } from 'react';

import { Team, Page } from '@loomhq/shared-utilities/constants/product';

import { RUMWrapper } from './RUMWrapper';
import { ReportingContextProvider } from './ReportingContextProvider';
import {
  SuccessMarkers,
  TrackedVideoProperties,
  AiFeatureMarkers,
} from './constants';
import { RUMReportingContext } from './reporting';
import { ViewType } from './types';
import { useViewType } from './useViewType';
import { useFeatureFlagStore } from '@js/hooks/featureFlag/useFeatureFlagStore';

interface SharePageRUMContext extends RUMReportingContext {
  videoWasComplete: boolean;
  viewType: ViewType;
  featureFlags: Record<string, unknown>;
  trackedVideoProperties: Record<string, unknown>;
  shakaStats: () => null | Record<string, any>;
}

function useGetShakaStats(videoId: string): () => null | Record<string, any> {
  const player = usePlayer(videoId);

  const getShakaStats = useCallback(
    () => player?.mseTech?.getStats() ?? null,
    [player?.mseTech]
  );

  return getShakaStats;
}

function useGetIsSplitSegment(videoId: string): () => undefined | boolean {
  const player = usePlayer(videoId);

  const getIsSplitSegment = useCallback(
    () => player?.isSplitSegment,
    [player?.isSplitSegment]
  );

  return getIsSplitSegment;
}

function useGetVideoMimeType(videoId: string): () => undefined | string {
  const player = usePlayer(videoId);

  const getVideoMimeType = useCallback(
    () => (player?.mime ? player.mime : 'unknown'),
    [player?.mime]
  );

  return getVideoMimeType;
}

const useExtractVideoData = () => {
  const { video } = useVideoContext();
  const { isProtected, needsPassword } = useVideoPasswordContext();

  const getTrackedVideoProperties = React.useCallback((): {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  } => {
    return {
      ...pick(video, TrackedVideoProperties),
      isProtected,
      needsPassword,
    };
  }, [isProtected, needsPassword, video]);

  // For missing pieces of video info not supplied by existing fields
  // such as TrackedVideoProperties and ShakaStats
  const getExtraVideoProperties = React.useCallback((): {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  } => {
    if (!video) {
      return {};
    }

    let ageInDays;

    if (video.createdAt) {
      ageInDays = differenceInDays(new Date(), new Date(video.createdAt));
    }

    let isSplitSegment = false;

    // splitSegmentTtl is a date field set to (video.createdDate + a defined TTL)
    // Set when a shortened first video segment is first generated.
    if (
      video.processingInformation?.splitSegmentTtl &&
      // If today is before the TTL expiration, a split segment will be served.
      new Date(video.processingInformation?.splitSegmentTtl) > new Date()
    ) {
      isSplitSegment = true;
    }

    return {
      ...(ageInDays && { ageInDays }),
      isSplitSegment,
    };
  }, [video]);

  return {
    getTrackedVideoProperties,
    getExtraVideoProperties,
  };
};

const useFeatureFlags = () => {
  const featureFlagsFromState = useFeatureFlagStore(
    state => state.featureFlags
  );
  const {
    video: { videoFeatureFlags },
  } = useVideoContext();

  return useMemo(
    () => ({
      ...featureFlagsFromState,
      ...(videoFeatureFlags ?? {}),
    }),
    [featureFlagsFromState, videoFeatureFlags]
  );
};

export const useSharePageRumContext = (): SharePageRUMContext => {
  const {
    video: { complete: videoIsComplete, id },
  } = useVideoContext();
  const { getTrackedVideoProperties, getExtraVideoProperties } =
    useExtractVideoData();

  const videoIsCompleteRef = useRef<boolean>(Boolean(videoIsComplete));
  const viewType = useViewType();
  const featureFlags = useFeatureFlags();
  const trackedVideoProperties = useMemo(getTrackedVideoProperties, [
    getTrackedVideoProperties,
  ]);
  const getShakaStats = useGetShakaStats(id);
  const getIsSplitSegment = useGetIsSplitSegment(id);
  const getVideoMimeType = useGetVideoMimeType(id);
  const extraVideoProperties = useMemo(getExtraVideoProperties, [
    getExtraVideoProperties,
  ]);
  const context = useMemo(
    () => ({
      videoWasComplete: videoIsCompleteRef.current,
      viewType,
      featureFlags,
      trackedVideoProperties,
      extraVideoProperties,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      shakaStats: getShakaStats,
      splitSegment: getIsSplitSegment,
      mimeType: getVideoMimeType,
    }),
    [
      viewType,
      featureFlags,
      trackedVideoProperties,
      extraVideoProperties,
      getShakaStats,
      getIsSplitSegment,
      getVideoMimeType,
    ]
  );

  return context;
};

export const SharePageReportingContextProvider: ReportingContextProvider<
  SharePageRUMContext
> = ({ render }) => {
  const context = useSharePageRumContext();

  return render(context);
};

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const ShareVideoFreshRUMWrapper: FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  return (
    <RUMWrapper<SharePageRUMContext>
      pageName={Page.Share}
      timeoutMs={30000}
      expectedMarkers={[
        SuccessMarkers.VideoCanPlay,
        SuccessMarkers.Navigation,
        SuccessMarkers.VideoMetadata,
        SuccessMarkers.VideoSourceFetchStart,
        SuccessMarkers.VideoSourceFetched,
        SuccessMarkers.VideoSourceParsed,
        SuccessMarkers.ShakaPlayerInit,
        SuccessMarkers.VideoPlayerReady,
        SuccessMarkers.VideoPlayer,
      ]}
      optionalMarkers={[
        AiFeatureMarkers.AutoTitle,
        AiFeatureMarkers.AutoTitleLoading,
        AiFeatureMarkers.AutoSummary,
        AiFeatureMarkers.AutoSummaryLoading,
        AiFeatureMarkers.AutoChapters,
        AiFeatureMarkers.AutoChaptersLoading,
        SuccessMarkers.Streaming,
        SuccessMarkers.FirstSegmentDownloadFinished,
      ]}
      ReportingContext={SharePageReportingContextProvider}
      team={Team.CorePlatform}
    >
      {children}
    </RUMWrapper>
  );
};

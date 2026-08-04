import { isDev } from '@js/constants/environment';

import {
  HIGHLIGHT_LOOM_SUGGESTED_VIDEO_CLICKED,
  HIGHLIGHT_LOOM_SUGGESTED_VIDEO_SHOWN,
} from '@js/constants/events';

import cx from 'classnames';
import { useAsgCommentModalIsVisible } from '@js/common/modal-container/UseAsgCommentModalIsVisible';
import { VIDEO_IDS_WHERE_SUGGESTION_WAS_CLICKED } from '@js/common/video-player/common';
import { useGetVideoSuggestionQuery } from '@js/common/video-player/components/video-player/end-of-video-suggested-video/GetVideoSuggestion.generated';
import { SimpleEndActions } from '@js/common/video-player/layers';
import React, { useEffect, useState } from 'react';

import { getCloudfrontURI } from '@js/utilities/avatar';

import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';

import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';

import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { Text } from '@loomhq/lens';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import * as analytics from '@js/utilities/analytics';

import {
  getLocalStorageKey,
  setLocalStorageKey,
} from '@js/utilities/localStorage';

import styles from './styles.module.css';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../../../utilities/analytics/attribute-transformer';

export const VIDEO_SUGGESTION_DISMISSED = 'video_suggestion_dismissed';

export type VideoSuggestion = {
  url: string;
  title: string;
  thumbnail: string;
  length: number;
  id: string;
};

type SuggestedVideoProps = {
  videoId: string;
  disableThumbnailPreload?: boolean;
};

const SuggestedVideoWithoutFeatureWrapper = ({
  videoId,
  disableThumbnailPreload = false,
}: SuggestedVideoProps): JSX.Element | null => {
  const [thumbnailHasLoaded, setThumbnailHasLoaded] = useState<boolean>(
    disableThumbnailPreload
  );
  const { asgCommentModalIsVisible } = useAsgCommentModalIsVisible();
  const { featureLoadedRef } = useFeatureWrapper();

  // Make a query to get the suggested video (this gets cached by Apollo, so it should only make a backend call once per page load).
  const { data, loading, error } = useGetVideoSuggestionQuery({
    variables: { videoId },
  });

  // From the query response, extract the video url, title, thumbnail, and length.
  const videoSuggestion: VideoSuggestion | undefined =
    data?.getVideoSuggestion?.__typename === 'VideoSuggestionPayload'
      ? data?.getVideoSuggestion
      : undefined;
  const url = videoSuggestion?.url;
  const title = videoSuggestion?.title;
  const thumbnail = videoSuggestion?.thumbnail;
  const videoSuggestionId = videoSuggestion?.id;

  let thumbnailUrl;
  if (thumbnail) {
    // If in the dev environment, use the prod CDN URL to get the thumbnail image (since the marketing looms are likely not in dev envs).
    thumbnailUrl = isDev
      ? `https://cdn.loom.com/${thumbnail}`
      : getCloudfrontURI(thumbnail);
  }

  useEffect(() => {
    // Load the thumbnail image and set the state when it has loaded, so that the suggestion only shows when the image has fully loaded.
    if (thumbnailUrl) {
      const img = new Image();
      img.src = thumbnailUrl;
      img.onload = () => setThumbnailHasLoaded(true);
    }
  }, [thumbnailUrl]);

  const logSuggestedVideo = !loading && !error && thumbnailHasLoaded;

  // Only log the analytics event the first time the suggestion is rendered.
  useEffect(() => {
    if (logSuggestedVideo) {
      analytics.track(HIGHLIGHT_LOOM_SUGGESTED_VIDEO_SHOWN, {
        ...withIdentifiers(
          HIGHLIGHT_LOOM_SUGGESTED_VIDEO_SHOWN,
          AnalyticsEntityId.videoSuggestion(
            videoSuggestionId,
            'videoSuggestionId'
          )
        ),
        videoIdWhereSuggestionWasShown: videoId,
      });
    }
  }, [logSuggestedVideo, videoId, videoSuggestionId]);

  const handleSuggestionClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Save the video ID where the suggestion was clicked in localStorage, so that it does not appear again on this video.
    const videoIdsWhereSuggestionWasClicked =
      getLocalStorageKey(VIDEO_IDS_WHERE_SUGGESTION_WAS_CLICKED) || [];
    if (!videoIdsWhereSuggestionWasClicked.includes(videoId)) {
      // If the array is too long, remove the oldest element so that local storage usage is limited.
      if (videoIdsWhereSuggestionWasClicked.length >= 10000) {
        videoIdsWhereSuggestionWasClicked.splice(0, 1);
      }
      videoIdsWhereSuggestionWasClicked.push(videoId);
      setLocalStorageKey(
        VIDEO_IDS_WHERE_SUGGESTION_WAS_CLICKED,
        videoIdsWhereSuggestionWasClicked
      );
    }

    analytics.track(HIGHLIGHT_LOOM_SUGGESTED_VIDEO_CLICKED, {
      ...withIdentifiers(
        HIGHLIGHT_LOOM_SUGGESTED_VIDEO_CLICKED,
        AnalyticsEntityId.videoSuggestion(
          videoSuggestionId,
          'videoSuggestionId'
        )
      ),
      videoIdWhereSuggestionWasShown: videoId,
    });

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const showSuggestedVideo =
    !loading && !error && thumbnailHasLoaded && !asgCommentModalIsVisible;

  return (
    <div ref={featureLoadedRef}>
      {showSuggestedVideo ? (
        <div className={cx(styles.suggestedVideoContainer, 'relative')}>
          <div className={styles.textItem}>
            <Text size="body-md" hasEllipsis ellipsisLines={1} alignment="left">
              Watch next...
            </Text>
          </div>
          <button
            onClick={handleSuggestionClicked}
            className={cx(
              styles.buttonInvisible,
              styles.thumbnailContainer,
              'p:0 m:0'
            )}
            role="link"
            aria-label="Watch suggested video"
            data-testid="suggestion-wrapper"
          >
            <img
              src={thumbnailUrl}
              alt="Suggested video thumbnail"
              className="radius:medium height:full"
              data-testid="suggested-video-thumbnail"
            />
          </button>

          <button
            onClick={handleSuggestionClicked}
            className={cx(styles.buttonInvisible, 'p:0 m:0')}
            role="link"
            aria-label="Watch suggested video"
          >
            <Text
              size="body-lg"
              hasEllipsis
              ellipsisLines={1}
              fontWeight="bold"
              alignment="left"
            >
              {title}
            </Text>
          </button>
          <div className={styles.textItem}>
            <SimpleEndActions />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export const SuggestedVideo = (props: SuggestedVideoProps): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.HighlightValueOfLoomToAnonUsers}
      errorType={ErrorBoundaryTypes.SILENT}
    >
      <SuggestedVideoWithoutFeatureWrapper {...props} />
    </FeatureWrapper>
  );
};

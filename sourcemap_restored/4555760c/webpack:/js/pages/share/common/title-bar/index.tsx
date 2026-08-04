import {
  VIDEO_TITLE_UPDATED,
  TITLE_EDIT_FIELD_SAVED,
} from '@js/constants/events';

import { AutoTitleAnimations } from '@js/common/ai/ai-title-bar';
import { useVideoPasswordContext } from '@js/common/video-password';
import { useVideoContext } from '@js/common/video-player';
import { useSaveVideoTitle } from '@js/common/video-title/useSaveVideoTitle';
import { useHasPersonalizedAudio } from '@js/components/video-personalization/hooks';
import { useAnonCreatorMode } from '@js/hooks/useAnonCreatorMode';
import { useIsOwnerAfterRecording } from '@js/hooks/useIsOwnerAfterRecording';
import {
  useHideInformationDueToPassword,
  useTitleBar,
  TitleFieldFocusSource,
} from '@js/pages/share/common';
import React, { useCallback, useEffect } from 'react';
import { track } from '@js/utilities/analytics';
import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { INTELLIGENCE_CONTENT } from '@loomhq/shared-utilities/constants/intelligence';
import { Feature } from '@loomhq/shared-utilities/constants/product';

import { VideoPersonalizationType } from '@js/globalTypes.generated';

import { InitialLoadingState } from './InitialLoadingState';
import {
  GetVideoTitleQuery,
  useGetVideoTitleQuery,
} from './common/GetVideoTitle.generated';
import { useAutoTitle } from './common/useAutoTitle';
import { StaticTitle } from './static-title';
import { TitleInput } from './title-input';

const selectVideoTitle = (
  data: GetVideoTitleQuery | undefined,
  loading: boolean,
  error: Error | undefined
) => {
  if (
    loading ||
    error ||
    !data ||
    !data.getVideo ||
    data.getVideo.__typename !== 'RegularUserVideo'
  ) {
    return '';
  }

  return data.getVideo.name;
};

const RichTitleBarWithoutFeatureWrapper = (): JSX.Element | null => {
  const { featureLoadedRef } = useFeatureWrapper();

  const { isInEditMode, enterEditMode } = useTitleBar();

  const {
    isAutoTitleExpected,
    autoTitle,
    shouldShowAutoTitleAnimations,
    setIsAutoTitleAnimationsCompleted,
    isAutoTitleGenerated,
    isUserEditedTitle,
  } = useAutoTitle();

  const hasVariablesAccess = useHasPersonalizedAudio();

  const {
    video: {
      currentUserCanEdit,
      id: videoId,
      isParentOfPersonalizedCopies,
      personalizationType,
    },
  } = useVideoContext();

  const { password } = useVideoPasswordContext();

  const { data, loading, error } = useGetVideoTitleQuery({
    variables: {
      videoId,
      password,
    },
  });

  const videoTitle = selectVideoTitle(data, loading, error);

  const doesVideoHavePersonalizedTitle =
    isParentOfPersonalizedCopies &&
    personalizationType === VideoPersonalizationType.Title;

  const anonCreatorMode = useAnonCreatorMode(videoId);

  const isOwnerAfterRecording = useIsOwnerAfterRecording({ videoId });

  const isEditable = currentUserCanEdit || anonCreatorMode;
  const isAutoTitleDisplayed = autoTitle === videoTitle;

  // This function handles saving the title on frontend and backend
  // Since TitleInput is immediately closed after saving,
  // we need to keep this hook in the parent component
  const saveVideoTitle = useSaveVideoTitle();

  const trackSaveTitleEvent = () => {
    // if the user hasn't edited the title yet,
    // we want to track if they've edited the auto-generated title or default title
    if (!isUserEditedTitle) {
      track(VIDEO_TITLE_UPDATED, {
        title_content: isAutoTitleGenerated
          ? INTELLIGENCE_CONTENT.USER_EDITED_AUTO_GENERATED
          : INTELLIGENCE_CONTENT.USER_EDITED_DEFAULT,
        video_id: videoId,
      });
    }

    track(TITLE_EDIT_FIELD_SAVED, {
      video_id: videoId,
    });
  };

  const enterEditModeFromTitleBar = useCallback(() => {
    if (isEditable) {
      enterEditMode(TitleFieldFocusSource.TitleBar, videoId);
    }
  }, [enterEditMode, isEditable, videoId]);

  // focus title bar when auto title is not expected
  // to encourage user to edit the default title
  useEffect(() => {
    if (isOwnerAfterRecording && !isAutoTitleExpected) {
      enterEditModeFromTitleBar();
      track(VIDEO_TITLE_UPDATED, {
        title_content: INTELLIGENCE_CONTENT.DEFAULT,
        video_id: videoId,
      });
    }
  }, [
    isOwnerAfterRecording,
    isAutoTitleExpected,
    enterEditModeFromTitleBar,
    videoId,
  ]);

  const hideInformationDueToPassword = useHideInformationDueToPassword();

  const renderFeature = () => {
    if (hideInformationDueToPassword) {
      return null;
    }

    if (isOwnerAfterRecording === undefined || loading) {
      return <InitialLoadingState />;
    }

    if (isInEditMode) {
      return (
        <TitleInput
          initialValue={videoTitle}
          saveVideoTitle={saveVideoTitle}
          trackSaveTitleEvent={trackSaveTitleEvent}
          hasVariablesAccess={hasVariablesAccess}
        />
      );
    }

    if (shouldShowAutoTitleAnimations) {
      return (
        <AutoTitleAnimations
          setIsCompleted={setIsAutoTitleAnimationsCompleted}
          autoTitle={autoTitle}
          isAutoTitleGenerated={isAutoTitleGenerated}
          onClick={enterEditModeFromTitleBar}
        />
      );
    }

    return (
      <StaticTitle
        title={videoTitle}
        isEditable={isEditable}
        isAutoTitleDisplayed={isAutoTitleDisplayed}
        doesVideoHavePersonalizedTitle={doesVideoHavePersonalizedTitle}
        onClick={enterEditModeFromTitleBar}
      />
    );
  };

  return (
    <div style={{ display: 'contents' }} ref={featureLoadedRef}>
      {renderFeature()}
    </div>
  );
};

export const RichTitleBar = (): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.TitleBar}
      errorType={ErrorBoundaryTypes.SILENT}
    >
      <RichTitleBarWithoutFeatureWrapper />
    </FeatureWrapper>
  );
};

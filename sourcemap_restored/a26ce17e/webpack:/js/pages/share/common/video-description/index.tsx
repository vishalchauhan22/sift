import cx from 'classnames';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useHover } from 'react-laag';

import { Container, Tooltip, Text, IconButton } from '@loomhq/lens';
import { SvgTrash } from '@loomhq/lens/icons/trash';
import { timeUtils } from '@loomhq/shared-utilities';
import { INTELLIGENCE_CONTENT } from '@loomhq/shared-utilities/constants/intelligence';
import { Feature } from '@loomhq/shared-utilities/constants/product';

import { isUnsuccessfulTranscriptionStatus } from '@loomhq/shared-utilities/utilities/transcriptionUtils';
import { useAutoSummaryAi } from '@js/common/intelligence';
import { useVideoPasswordContext } from '@js/common/video-password/useVideoPasswordContext';
import { useCurrentTime, useVideoContext } from '@js/common/video-player';
import {
  VIDEO_SUMMARY_UPDATED,
  AUTO_SUMMARY_GLYPH_HOVER,
} from '@js/constants/events';
import { CEE, ENTER, ESCAPE } from '@js/constants/keyCodes';
import { SUMMARY } from '@js/constants/sharePage';

import { IntelligenceStatusType } from '@js/globalTypes.generated';
import { useIsOwnerAfterRecording } from '@js/hooks/useIsOwnerAfterRecording';
import {
  useOpenRightPanelAndSwitchToTab,
  TAB_LIST,
} from '@js/pages/share/common';
import { AutoContextPopover } from '@js/pages/share/common/auto-context-popover';
import { AutoresizeTextarea } from '@js/pages/share/common/autoresize-textarea';
import { useDescriptionContext } from '@js/pages/share/common/context';
import { GeneratedByLoom } from '@js/pages/share/common/generated-by-loom';
import { useDefaultSettings } from '@js/pages/share/common/settings/useDefaultSettingsStore';

import { track } from '@js/utilities/analytics';
import * as analytics from '@js/utilities/analytics';
import { AiFeatureMarkers } from '@js/utilities/rum/constants';
import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';
import { SuccessMarker } from '@js/utilities/rum/markers';

import { useGetVideoCurrentUserCanEditQuery } from './GetVideoCurrentUserCanEdit.generated';
import { useGetVideoDescriptionQuery } from './GetVideoDescription.generated';
import { LinkedDescription } from './linked-description';
import styles from './styles.module.css';
import { useUpdateVideoDescription } from './useUpdateVideoDescription';
import { useTranscript } from '@js/common/transcripts';

const { secondsToVideoTS } = timeUtils;

const ADD_DESCRIPTION_MESSAGE = 'Add a summary...';
const REMOVE_DESCRIPTION_MESSAGE = 'Remove summary';
const AUTO_SUMMARY_TIMEOUT_MS = 35 * 1000;
const WORDS_CUTOFF = 50;
const EMPTY_DESCRIPTION = '';

type StoredDescription = string | null | undefined;
const protect = (description: StoredDescription): string => description || '';
const isFirstUpdate = (storedDescription: StoredDescription): boolean =>
  storedDescription == null;

export const useCurrentUserCanEditVideo: (
  videoId: string
) => boolean = videoId => {
  const { password } = useVideoPasswordContext();
  const { data } = useGetVideoCurrentUserCanEditQuery({
    variables: { videoId, password },
  });

  // Handle any backend errors etc, anything that produces a response which is not a well formed video
  if (data?.getVideo?.__typename !== 'RegularUserVideo') {
    return false;
  }

  return data.getVideo.currentUserCanEdit;
};

const VideoDescriptionWithoutFeatureWrapper = (): JSX.Element => {
  const [isHover, hoverProps] = useHover();

  const {
    video: {
      id: videoId,
      videoProperties: { playableDuration },
    },
  } = useVideoContext();

  const { password } = useVideoPasswordContext();

  const { data, loading } = useGetVideoDescriptionQuery({
    variables: { videoId, password },
    notifyOnNetworkStatusChange: true,
  });

  const [tempDescription, setTempDescription] = useState<string | null>(null);
  const [storedDescription, setStoredDescription] = useState<string | null>(
    null
  );

  // Once we get the first resolved value of GetVideo, set tempDescription to that
  // After that point, just use tempDescription for what we show in the UI
  // Keep it in sync manually
  // It would be nice to simplify all of this
  useEffect(() => {
    if (loading === false && tempDescription === null) {
      if (data?.getVideo?.__typename === 'RegularUserVideo') {
        setTempDescription(protect(data?.getVideo?.description));
        setStoredDescription(protect(data?.getVideo?.description));
      }
    }
  }, [data, loading, tempDescription]);

  const { updateDescription, isUpdatingDescription } =
    useUpdateVideoDescription();
  const { featureLoadedRef } = useFeatureWrapper();

  const openRightPanelAndSwitchToTab = useOpenRightPanelAndSwitchToTab();
  const { setShowDefaultSettings } = useDefaultSettings();

  const { currentTime } = useCurrentTime(videoId);

  const isOwnerAfterRecording = useIsOwnerAfterRecording({ videoId });
  const autoSummaryAi = useAutoSummaryAi({
    isOwnerAfterRecording,
  });

  const { transcriptStatus } = useTranscript();

  const ref = useRef<HTMLTextAreaElement>(null);
  const {
    isDescriptionInputVisible,
    setIsDescriptionInputVisible,
    focusDescriptionInput,
  } = useDescriptionContext();

  const [seeMore, setSeeMore] = useState(true);

  const [treatSummaryAsUserEntered, setTreatSummaryAsUserEntered] =
    useState(false);

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  // TODO: we need to implement a rich text editor as the meeting summaries
  //       have rich formatting, in the meantime we're just gonna disable editing
  const _currentUserCanEditVideo = useCurrentUserCanEditVideo(videoId);
  const userCanEditVideo = _currentUserCanEditVideo;

  useEffect(() => {
    const initialPopoverOpenValue =
      isHover &&
      autoSummaryAi.autoSummaryStatus === IntelligenceStatusType.Auto &&
      userCanEditVideo;

    setIsPopoverOpen(initialPopoverOpenValue);
  }, [
    isHover,
    autoSummaryAi.autoSummaryStatus,
    userCanEditVideo,
    setIsPopoverOpen,
  ]);

  const handleTogglePopover = () => {
    setIsPopoverOpen(false);
    triggerDefaultSettingsModal();
  };

  const saveDescription = useCallback(
    (newDescription: string) => {
      if (
        newDescription !== storedDescription?.trim() &&
        !isUpdatingDescription
      ) {
        setTempDescription(newDescription);
        updateDescription(
          videoId,
          storedDescription,
          newDescription,
          playableDuration,
          isFirstUpdate(storedDescription)
        );
      }
    },
    [
      isUpdatingDescription,
      setTempDescription,
      storedDescription,
      videoId,
      playableDuration,
      updateDescription,
    ]
  );

  useEffect(() => {
    if (!autoSummaryAi.isExpected && isOwnerAfterRecording) {
      track(VIDEO_SUMMARY_UPDATED, {
        summary_content: INTELLIGENCE_CONTENT.DEFAULT,
        video_id: videoId,
      });
    }
  }, [autoSummaryAi.isExpected, videoId, isOwnerAfterRecording]);

  useEffect(() => {
    if (!autoSummaryAi.hasAccess) {
      return;
    }

    if (autoSummaryAi.autoSummaryStatus === IntelligenceStatusType.Auto) {
      track(VIDEO_SUMMARY_UPDATED, {
        summary_content: INTELLIGENCE_CONTENT.AUTO_GENERATED,
        video_id: videoId,
      });
    }

    if (autoSummaryAi.autoSummaryStatus) {
      setTreatSummaryAsUserEntered(
        autoSummaryAi.autoSummaryStatus === IntelligenceStatusType.User
      );
    }
  }, [
    setTreatSummaryAsUserEntered,
    autoSummaryAi.hasAccess,
    autoSummaryAi.autoSummaryStatus,
    videoId,
    playableDuration,
  ]);

  const acceptUserInput = () => {
    const trimmedDescription = tempDescription?.trim();

    // when the new description contains spaces, such as '  test  ',
    // we need to trim it to 'test'. We don't need to run the save
    // function here tho since the summary hasn't been changed
    if (
      trimmedDescription === storedDescription?.trim() &&
      tempDescription?.length !== storedDescription?.length
    ) {
      setTempDescription(protect(trimmedDescription));
    }

    if (trimmedDescription !== storedDescription?.trim()) {
      saveDescription(trimmedDescription ?? '');

      if (autoSummaryAi.isExpected) {
        // If a user overrides the auto generated description
        if (autoSummaryAi.autoSummaryStatus === IntelligenceStatusType.Auto) {
          track(VIDEO_SUMMARY_UPDATED, {
            summary_content: INTELLIGENCE_CONTENT.USER_EDITED_AUTO_GENERATED,
            video_id: videoId,
          });
        } else {
          track(VIDEO_SUMMARY_UPDATED, {
            summary_content: INTELLIGENCE_CONTENT.USER_EDITED_DEFAULT,
            video_id: videoId,
          });
        }
      }

      // If the user changes the summary, we assume they are no longer
      // using the generated auto summary
      setTreatSummaryAsUserEntered(true);
    }

    setIsDescriptionInputVisible(false);
  };

  const onDescriptionBlur = () => {
    // accept user input only if the description has been changed
    if (tempDescription !== storedDescription) {
      acceptUserInput();
    } else {
      setIsDescriptionInputVisible(false);
    }
  };

  const onDescriptionKeyDown = e => {
    if (e.keyCode === CEE && e.ctrlKey && e.shiftKey) {
      const hasNoDescription = !tempDescription;
      const chapter = `${hasNoDescription ? '' : '\n'}${secondsToVideoTS(
        Math.round(currentTime)
      )} - `;

      setTempDescription(tempDescription + chapter);
    }

    if (e.keyCode === ESCAPE) {
      setTempDescription(protect(storedDescription));
      setIsDescriptionInputVisible(false);
    } else if (e.keyCode === ENTER && !e.shiftKey) {
      acceptUserInput();
    }
  };

  const onClear = useCallback(() => {
    setTempDescription(EMPTY_DESCRIPTION);
  }, []);

  useEffect(() => {
    if (ref && ref.current && isDescriptionInputVisible) {
      const ele = ref.current;

      // focus the text area
      ele.focus();

      const end = ele.value.length;

      // place cursor at the end
      ele.setSelectionRange(end, end);

      ele.scrollIntoView({ block: 'center' });
    }
  }, [isDescriptionInputVisible]);

  useEffect(() => {
    if (isHover && userCanEditVideo && autoSummaryAi.isExpected) {
      analytics.track(AUTO_SUMMARY_GLYPH_HOVER);
    }
  }, [isHover, userCanEditVideo, autoSummaryAi.isExpected]);

  useEffect(() => {
    if (isDescriptionInputVisible) {
      return;
    }

    if (isUnsuccessfulTranscriptionStatus(transcriptStatus)) {
      setTreatSummaryAsUserEntered(true);
    }
  }, [
    transcriptStatus,
    setTreatSummaryAsUserEntered,
    isDescriptionInputVisible,
  ]);

  useEffect(() => {
    if (!userCanEditVideo || isUpdatingDescription) {
      return;
    }

    // if current summary is already considered permanent
    if (treatSummaryAsUserEntered) {
      return;
    }

    if (!isDescriptionInputVisible) {
      // If no summary status is set, ignore
      if (!autoSummaryAi.autoSummaryStatus) {
        return;
      }

      if (autoSummaryAi.autoSummaryStatus === IntelligenceStatusType.Invalid) {
        setTreatSummaryAsUserEntered(true);
        track(VIDEO_SUMMARY_UPDATED, {
          summary_content: INTELLIGENCE_CONTENT.ATTEMPTED_AUTO_GENERATION,
          video_id: videoId,
        });

        return;
      }

      if (
        autoSummaryAi.autoSummaryStatus === IntelligenceStatusType.Auto &&
        autoSummaryAi.autoSummary
      ) {
        saveDescription(autoSummaryAi.autoSummary);
      }

      setTreatSummaryAsUserEntered(
        autoSummaryAi.autoSummaryStatus === IntelligenceStatusType.User
      );
    }
  }, [
    autoSummaryAi.autoSummary,
    autoSummaryAi.autoSummaryStatus,
    userCanEditVideo,
    isUpdatingDescription,
    isDescriptionInputVisible,
    treatSummaryAsUserEntered,
    setTreatSummaryAsUserEntered,
    saveDescription,
    videoId,
  ]);

  // Set the status to User if no intelligence is generated on first load.
  // If the status is still pending after first load, we treat the description
  // as user edited as we don't have a status of the summary stored for the video.
  useEffect(() => {
    const timeout = isOwnerAfterRecording ? AUTO_SUMMARY_TIMEOUT_MS : 0;

    const timeoutFn = setTimeout(() => {
      const stillWaiting =
        !autoSummaryAi.autoSummaryStatus ||
        autoSummaryAi.autoSummaryStatus === IntelligenceStatusType.Pending;

      if (stillWaiting) {
        if (autoSummaryAi.isExpected && isOwnerAfterRecording) {
          track(VIDEO_SUMMARY_UPDATED, {
            summary_content: INTELLIGENCE_CONTENT.ATTEMPTED_AUTO_GENERATION,
            video_id: videoId,
          });
        }

        setTreatSummaryAsUserEntered(true);
      }
    }, timeout);

    return () => {
      clearTimeout(timeoutFn);
    };
  }, [
    videoId,
    autoSummaryAi.isExpected,
    autoSummaryAi.autoSummaryStatus,
    setTreatSummaryAsUserEntered,
    isOwnerAfterRecording,
  ]);

  const triggerDefaultSettingsModal = () => {
    openRightPanelAndSwitchToTab(TAB_LIST.Edit);
    setShowDefaultSettings(true);
  };

  const showGeneratedByLoom =
    autoSummaryAi.autoSummaryStatus ===
    (IntelligenceStatusType.Auto && tempDescription);

  const descriptionBlock = (
    <LinkedDescription
      canEdit={userCanEditVideo}
      onClick={() => focusDescriptionInput(videoId, 'description_area')}
      defaultText={ADD_DESCRIPTION_MESSAGE}
      description={tempDescription ?? ''}
      wordsCutoff={WORDS_CUTOFF}
      seeMore={seeMore && !userCanEditVideo}
      setSeeMore={setSeeMore}
    />
  );

  return (
    <div ref={featureLoadedRef}>
      <Text
        fontWeight="bold"
        size="large"
        htmlTag="h2"
        style={{ width: 'fit-content' }}
      >
        {SUMMARY}
      </Text>

      {showGeneratedByLoom && <GeneratedByLoom />}

      {isDescriptionInputVisible && userCanEditVideo ? (
        <div className={styles.inputContainer}>
          <AutoresizeTextarea
            textRef={ref}
            className={cx(
              styles.autoHeight,
              styles.input,
              styles.backgroundColor
            )}
            value={tempDescription ?? ''}
            placeholder={ADD_DESCRIPTION_MESSAGE}
            onChange={e => setTempDescription(e.target.value)}
            onKeyDown={onDescriptionKeyDown}
            onBlur={onDescriptionBlur}
            shouldHighlight
          />

          <Container className={styles.removeDescriptionButton}>
            <Tooltip tabIndex={-1} content={REMOVE_DESCRIPTION_MESSAGE}>
              <IconButton
                altText={REMOVE_DESCRIPTION_MESSAGE}
                icon={<SvgTrash />}
                isDisabled={!tempDescription}
                onMouseDown={onClear}
              />
            </Tooltip>
          </Container>
        </div>
      ) : (
        <>
          <div {...hoverProps}>
            {(tempDescription || userCanEditVideo) &&
              (autoSummaryAi.isWaiting && !treatSummaryAsUserEntered ? (
                <>
                  <Tooltip
                    isInline={false}
                    content="We are using AI to create a summary tailored to your Loom."
                    placement="topLeft"
                    isDisabled={
                      !autoSummaryAi.isExpected ||
                      autoSummaryAi.autoSummaryStatus !==
                        IntelligenceStatusType.Pending
                    }
                  >
                    <Container
                      className={styles.assistant}
                      onMouseEnter={() =>
                        analytics.track(AUTO_SUMMARY_GLYPH_HOVER)
                      }
                    >
                      <Container className={styles.gradient} />
                      <Container className={styles.mask} />
                      <Container position="relative" zIndex={2}>
                        {descriptionBlock}
                      </Container>
                    </Container>
                  </Tooltip>
                  <SuccessMarker name={AiFeatureMarkers.AutoSummaryLoading} />
                </>
              ) : (
                <>
                  <AutoContextPopover
                    isOpen={isPopoverOpen}
                    onPrimaryClick={handleTogglePopover}
                    title="Loom AI generated summary"
                    subtitle="We've automatically created a summary of the content of your video."
                    placement="topLeft"
                  />

                  {descriptionBlock}
                  {autoSummaryAi.isExpected && isOwnerAfterRecording && (
                    <SuccessMarker name={AiFeatureMarkers.AutoSummary} />
                  )}
                </>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export const VideoDescription = (): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.VideoPackaging}
      errorType={ErrorBoundaryTypes.DEFAULT}
      additionalLoggingValues={{ version: 'video description' }}
    >
      <VideoDescriptionWithoutFeatureWrapper />
    </FeatureWrapper>
  );
};

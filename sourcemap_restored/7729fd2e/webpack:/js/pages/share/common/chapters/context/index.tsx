import {
  CHAPTERS_DELETE_CLICKED,
  CHAPTERS_UPDATED,
} from '@js/constants/events';

import { isTerminalStatus, resolveChapterStatus } from '@js/common/ai/utils';
import { useCurrentUserSelector } from '@js/common/current-user';
import { useVideoPasswordContext } from '@js/common/video-password';
import { useVideoContext } from '@js/common/video-player';
import { validateChapters } from '@js/common/video-player/components/chapters-bar/utils';
import { useIsOwnerAfterRecording } from '@js/hooks/useIsOwnerAfterRecording';
import isEqual from 'lodash/isEqual';

import { CHAPTERS_TEXT_AREA } from '@js/pages/share/common/chapters';
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
  useRef,
  RefObject,
} from 'react';

import { CHAPTER_GENERATION_METHOD } from '@loomhq/shared-utilities/constants/intelligence';

import { AutoChapterStatusesType } from '@js/globalTypes.generated';
import * as analytics from '@js/utilities/analytics';

import { isChaptersEmpty } from '../isChaptersEmpty';

import {
  AutoChaptersStatusChangedDocument,
  AutoChaptersStatusChangedSubscription,
} from './AutoChaptersStatusChanged.generated';
import {
  FetchChaptersQuery,
  useFetchChaptersQuery,
} from './FetchChapters.generated';
import { useGetAutoChaptersStatusQuery } from './GetAutoChaptersStatus.generated';
import { useUpdateChaptersMutation } from './UpdateChapters.generated';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

const AUTO_CHAPTERS_TIMEOUT_MS = 35 * 1000; // 35 seconds

const CHAPTERS_WONT_SHOW = 'Chapters will not display on the video timeline.';

const selectChaptersAndStatus = (
  data: FetchChaptersQuery | undefined,
  loading: boolean,
  error: Error | undefined,
  hasTimedOut: boolean
): {
  chapters: string | null;
  userEdited: boolean;
  autoChapterStatus: AutoChapterStatusesType | null;
} => {
  if (
    !data ||
    loading ||
    error ||
    data?.fetchVideoChapters?.__typename !== 'VideoChapters'
  ) {
    return {
      chapters: null,
      userEdited: false,
      autoChapterStatus: null,
    };
  }

  const { content, auto_chapter_status, edited_at } = data.fetchVideoChapters;
  return {
    chapters: content || '',
    userEdited: Boolean(edited_at),
    autoChapterStatus: resolveChapterStatus(
      auto_chapter_status,
      hasTimedOut,
      AutoChapterStatusesType.Failure
    ),
  };
};

type ChaptersContextType = {
  canEditChapters: boolean;
  userEdited: boolean;
  autoChapterStatus: string | null;
  errorMsg: string | null;
  chapters: string;
  fetchingChapters: boolean;
  draftChapters: string;
  setDraftChapters: (chapters: string) => void;
  editChapters: ({
    analyticsEventName,
    scrollIntoView,
  }: {
    analyticsEventName: string;
    scrollIntoView?: boolean;
  }) => void;
  isAutoChaptersExpected: boolean;
  saveChapters: () => void;
  cancelEditChapters: () => void;
  clearChapters: () => void;
  chaptersAvailable: boolean;
  waitingForAi: boolean;
  showInput: boolean;
  chaptersInputWrapperRef: RefObject<HTMLTextAreaElement>;
};

const ChaptersContext = createContext<ChaptersContextType | null>(null);

export const ChaptersContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const chaptersInputWrapperRef = useRef<HTMLTextAreaElement>(null);
  const {
    video: {
      currentUserCanEdit = false,
      id: videoId,
      videoProperties: { playableDuration },
    },
    setChapters: setChaptersInVideoContext,
  } = useVideoContext();
  const { password } = useVideoPasswordContext();

  const [draftChapters, setDraftChapters] = useState('');

  const [errorMsg, setErrorMsg] = useState<null | string>(null);

  const isAutoChaptersSettingEnabled = useCurrentUserSelector(
    user => user.videoSettings?.auto_chapters !== false,
    false
  );

  const userCanEdit = currentUserCanEdit;
  const canEditChapters = userCanEdit;

  const isOwnerAfterRecording = useIsOwnerAfterRecording({ videoId });

  const aiAccess = useCurrentUserSelector(user => user.aiAccess, null);
  const hasAutoChaptersAccess = Boolean(aiAccess?.autoChapters);

  const [showInput, setShowInput] = useState(false);
  const [shouldScrollIntoView, setShouldScrollIntoView] = useState(false);

  const [hasTimedOut, setHasTimedOut] = useState(false);

  const isAutoChaptersExpected = Boolean(
    isAutoChaptersSettingEnabled && hasAutoChaptersAccess
  );

  const unsubscribeRef = useRef<() => void>();

  const {
    data: chapterData,
    loading: fetchingChapters,
    error: chaptersError,
    refetch: refetchChapters,
  } = useFetchChaptersQuery({
    variables: { videoId, password },
    skip: !videoId,
    onCompleted: data => {
      if (data?.fetchVideoChapters?.__typename !== 'VideoChapters') {
        return;
      }
      const { auto_chapter_status } = data?.fetchVideoChapters;
      if (isTerminalStatus(auto_chapter_status)) {
        // if we receive a terminal status, then we no longer have an active subscription
        // so we mark this as undefined to avoid marking a timeout later
        unsubscribeRef.current = undefined;
      }
    },
  });

  const { subscribeToMore } = useGetAutoChaptersStatusQuery({
    variables: { videoId, password },
    skip: !videoId,
    onCompleted: data => {
      if (data?.getAutoFeatureStatuses?.__typename !== 'AutoFeatureStatuses') {
        return;
      }
      const { autoChaptersStatus } = data?.getAutoFeatureStatuses;
      if (isTerminalStatus(autoChaptersStatus)) {
        // if we receive a terminal status, then we no longer have an active subscription
        // so we mark this as undefined to avoid marking a timeout later
        unsubscribeRef.current = undefined;
      }
    },
  });

  useEffect(() => {
    unsubscribeRef.current =
      subscribeToMore<AutoChaptersStatusChangedSubscription>({
        document: AutoChaptersStatusChangedDocument,
        variables: { videoId },
        updateQuery: (prev, { subscriptionData }) => {
          const autoChaptersStatus =
            subscriptionData.data?.autoFeatureStatusChanged?.autoFeatureStatuses
              ?.autoChaptersStatus;
          if (
            prev?.getAutoFeatureStatuses?.__typename !==
              'AutoFeatureStatuses' ||
            !autoChaptersStatus
          ) {
            return prev;
          }

          if (isTerminalStatus(autoChaptersStatus)) {
            // if we receive a terminal status, then we no longer have an active subscription
            // so we mark this as undefined to avoid marking a timeout later
            unsubscribeRef.current = undefined;
          }

          refetchChapters();

          return Object.assign({}, prev, {
            getAutoFeatureStatuses: {
              ...prev.getAutoFeatureStatuses,
              autoChaptersStatus,
            },
          });
        },
      });
  }, [subscribeToMore, videoId, refetchChapters]);

  const {
    chapters: chaptersContent,
    userEdited,
    autoChapterStatus,
  } = selectChaptersAndStatus(
    chapterData,
    fetchingChapters,
    chaptersError,
    hasTimedOut
  );

  const waitingForAi =
    canEditChapters &&
    isAutoChaptersExpected &&
    isOwnerAfterRecording &&
    (autoChapterStatus === AutoChapterStatusesType.NotStarted ||
      autoChapterStatus === AutoChapterStatusesType.InProgress);

  // unsubscribe if it takes too long to receive data
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (unsubscribeRef.current) {
        setHasTimedOut(true);
        unsubscribeRef.current();
      }
    }, AUTO_CHAPTERS_TIMEOUT_MS);

    return () => clearTimeout(timeout);
  }, []);

  const [updateVideoChapters] = useUpdateChaptersMutation({
    variables: {
      videoId,
      content: draftChapters,
      password,
    },
  });

  const updateChaptersState = useCallback(
    (chapters: string) => {
      setDraftChapters(chapters);
      setChaptersInVideoContext(chapters);
    },
    [setChaptersInVideoContext]
  );

  useEffect(() => {
    if (showInput) {
      const ele = document.getElementById(
        CHAPTERS_TEXT_AREA
      ) as HTMLInputElement;

      ele?.focus();
      const end = ele?.value?.length;

      ele?.setSelectionRange(end, end);
    }
  }, [showInput]);

  useEffect(() => {
    if (shouldScrollIntoView && showInput) {
      chaptersInputWrapperRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

      setShouldScrollIntoView(false);
    }
  }, [showInput, shouldScrollIntoView]);

  const trackChaptersUpdated = useCallback(
    (chapters: any) => {
      const previousValidatedChapters = validateChapters(
        chaptersContent,
        playableDuration
      ).chapters;
      const newValidatedChapters = validateChapters(
        chapters,
        playableDuration
      ).chapters;

      // Only track if the validated chapters have changed
      const validatedChaptersChanged = !isEqual(
        previousValidatedChapters,
        newValidatedChapters
      );

      if (validatedChaptersChanged) {
        analytics.track(CHAPTERS_UPDATED, {
          ...withIdentifiers(
            CHAPTERS_UPDATED,
            AnalyticsEntityId.video(videoId, 'video_id')
          ),
          old_chapters_string: chaptersContent,
          new_chapters_string: draftChapters,
          old_validated_chapters: previousValidatedChapters,
          new_validated_chapters: newValidatedChapters,
          old_validated_chapters_count: previousValidatedChapters?.length || 0,
          new_validated_chapters_count: newValidatedChapters?.length || 0,
          chapter_generation_method: CHAPTER_GENERATION_METHOD.USER_EDITED,
          chapter_generation_failure_reason: null,
        });
      }
    },
    [chaptersContent, videoId, playableDuration, draftChapters]
  );

  const updateChapters = useCallback(
    (chapters: string) => {
      updateChaptersState(chapters);
      trackChaptersUpdated(chapters);
    },
    [trackChaptersUpdated, updateChaptersState]
  );

  const clearChapters = useCallback(() => {
    updateChapters('');
    setShowInput(false);
    updateVideoChapters({ variables: { content: '', videoId, password } });
    analytics.track(
      CHAPTERS_DELETE_CLICKED,
      withIdentifiers(
        CHAPTERS_DELETE_CLICKED,
        AnalyticsEntityId.video(videoId, 'video_id')
      )
    );
  }, [updateChapters, updateVideoChapters, videoId, password]);

  useEffect(() => {
    if (!draftChapters || draftChapters.length === 0) {
      // clear out error if the input is empty
      setErrorMsg(null);

      return;
    }

    const validation = validateChapters(draftChapters, playableDuration);

    setErrorMsg(
      validation.error ? `${validation.error} ${CHAPTERS_WONT_SHOW}` : null
    );
  }, [draftChapters, playableDuration]);

  // Convert to useCallback to avoid unnecessary re-renders

  const saveChapters = useCallback(() => {
    updateChapters(draftChapters);
    updateVideoChapters();
    setShowInput(false);
  }, [draftChapters, updateChapters, updateVideoChapters]);

  const cancelEditChapters = useCallback(() => {
    setDraftChapters(chaptersContent || '');
    setShowInput(false);
  }, [chaptersContent]);

  const editChapters = useCallback(
    ({
      analyticsEventName,
      scrollIntoView,
    }: {
      analyticsEventName: string;
      scrollIntoView?: boolean;
    }) => {
      setDraftChapters(chaptersContent || '');
      setShowInput(true);

      setShouldScrollIntoView(Boolean(scrollIntoView));

      analytics.track(
        analyticsEventName,
        withIdentifiers(
          analyticsEventName,
          AnalyticsEntityId.video(videoId, 'video_id')
        )
      );
    },
    [videoId, chaptersContent]
  );

  const chaptersAvailable = !isChaptersEmpty(chaptersContent || '');

  const contextValue = useMemo(
    () => ({
      autoChapterStatus,
      canEditChapters,
      cancelEditChapters,
      chapters: chaptersContent || '',
      chaptersAvailable,
      chaptersInputWrapperRef,
      clearChapters,
      draftChapters,
      editChapters,
      errorMsg,
      fetchingChapters,
      isAutoChaptersExpected,
      saveChapters,
      setDraftChapters,
      showInput,
      userEdited,
      waitingForAi,
    }),
    [
      autoChapterStatus,
      canEditChapters,
      chaptersContent,
      draftChapters,
      setDraftChapters,
      fetchingChapters,
      chaptersAvailable,
      errorMsg,
      clearChapters,
      cancelEditChapters,
      editChapters,
      isAutoChaptersExpected,
      saveChapters,
      showInput,
      userEdited,
      waitingForAi,
    ]
  );

  return (
    <ChaptersContext.Provider value={contextValue}>
      {children}
    </ChaptersContext.Provider>
  );
};

export const useChaptersContext = (): ChaptersContextType => {
  const context = useContext(ChaptersContext);

  if (!context) {
    throw new Error(
      'useChaptersContext must be used within a ChaptersContextProvider'
    );
  }

  return context;
};

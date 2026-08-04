import { LOOM_URI } from '@js/constants/routes';

import { useWorkspaceAllowsAi } from '@js/hooks/useWorkspaceAllowsAi';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { EDIT_PAGE_VARIABLES_MODE } from '@loomhq/shared-utilities/constants/urlParams';

import { useGetUserHasAccessToPersonalizedAudioQuery } from './GetUserHasAccessToPersonalizedAudio.generated';
import { useGetRemainingPersonalizedVideosQuery } from './getCount.generated';

import type { Video } from '../../utilities/menuOptions/types';

import { CurrentFolderType } from '@js/components/looms/folder-grid/hooks';

const REFETCH_LOOMS_DEBOUNCE_MS = 1000;

export function useHasPersonalizedAudio(): boolean {
  const workspaceAllowsAi = useWorkspaceAllowsAi();
  const { data, loading } = useGetUserHasAccessToPersonalizedAudioQuery({
    skip: !workspaceAllowsAi,
  });

  if (!workspaceAllowsAi) {
    return false;
  }

  if (loading) {
    return false;
  }

  const hasAccess =
    data?.getUserHasAccessToPersonalizedAudio?.__typename ===
    'GetUserHasAccessToPersonalizedAudioPayload'
      ? data.getUserHasAccessToPersonalizedAudio.hasAccess
      : false;

  return Boolean(hasAccess);
}

type FolderHasPersonalizedVideoUtils = {
  needsRefetch: boolean;
  onRefetchTriggered: () => void;
  totalVideosMissing: number | null;
  setUserClosedVariablesVideosLoading: (value: boolean) => void;
  setShowVariablesVideosLoading: (value: boolean) => void;
  showVariablesVideosLoading: boolean;
  remainingVideosFailedToGenerate: boolean;
};

export function useFolderHasPersonalizedVideo({
  folder,
}: {
  folder: CurrentFolderType | null;
}): FolderHasPersonalizedVideoUtils {
  const [showVariablesVideosLoading, setShowVariablesVideosLoading] =
    useState(false);
  const [
    userClosedVariablesVideosLoading,
    setUserClosedVariablesVideosLoading,
  ] = useState(false);
  const [prevTotalVideosMissing, setPrevTotalVideosMissing] = useState<
    null | number
  >(null);
  const [needsRefetch, setNeedsRefetch] = useState(false);
  const hasRefetchedOnce = useRef(false);
  const folderHasPersonalizedVideo = Boolean(folder?.personalizedVideo);
  const folderId = folder?.id;

  const setNeedsRefetchDebounced = useDebouncedCallback(
    (needsRefetch: boolean) => setNeedsRefetch(needsRefetch),
    REFETCH_LOOMS_DEBOUNCE_MS
  );

  const {
    data: personalizedVideosCountData,
    startPolling,
    stopPolling,
  } = useGetRemainingPersonalizedVideosQuery({
    ...(folderHasPersonalizedVideo &&
      folderId && {
        variables: { folderId },
      }),
    skip: !folderHasPersonalizedVideo,
  });

  let totalVideosMissing: number | null = null;
  let hasFailed = false;

  if (
    personalizedVideosCountData?.personalizedVideosInProgress &&
    personalizedVideosCountData.personalizedVideosInProgress.__typename ===
      'CountPayload'
  ) {
    totalVideosMissing =
      personalizedVideosCountData?.personalizedVideosInProgress.count;
    hasFailed =
      personalizedVideosCountData?.personalizedVideosInProgress.hasFailed ??
      false;
  }

  useEffect(() => {
    if (
      totalVideosMissing &&
      totalVideosMissing > 0 &&
      !showVariablesVideosLoading &&
      !userClosedVariablesVideosLoading
    ) {
      setShowVariablesVideosLoading(true);
      startPolling(1000);
      hasRefetchedOnce.current = true;
    }

    if (totalVideosMissing === 0) {
      setShowVariablesVideosLoading(false);
      stopPolling();

      if (!hasRefetchedOnce.current) {
        // If the user has not yet refetched, we need to refetch once to make sure the count is accurate.
        // This is to account for a race condition where we enter the page when only some of the videos have
        // been generated, and then the rest are generated while we're on the page. But then when we
        // do the getCount query, it returns zero because we've just finished generating the rest of the videos.
        setNeedsRefetch(true);
        hasRefetchedOnce.current = true;
      }
    }
  }, [
    totalVideosMissing,
    startPolling,
    stopPolling,
    showVariablesVideosLoading,
    userClosedVariablesVideosLoading,
  ]);

  useEffect(() => {
    if (prevTotalVideosMissing !== totalVideosMissing) {
      setPrevTotalVideosMissing(totalVideosMissing);
      setNeedsRefetchDebounced(true);
    }
  }, [setNeedsRefetchDebounced, totalVideosMissing, prevTotalVideosMissing]);
  const remainingVideosFailedToGenerate = hasFailed;

  return {
    needsRefetch,
    onRefetchTriggered: useCallback(() => setNeedsRefetch(false), []),
    totalVideosMissing,
    setUserClosedVariablesVideosLoading,
    showVariablesVideosLoading,
    setShowVariablesVideosLoading,
    remainingVideosFailedToGenerate,
  };
}

export const redirectToCreateMoreCopiesForVideo = (
  personalizedVideoId: Video['id']
): void => {
  window.location.href = `${LOOM_URI}/edit/${personalizedVideoId}?${EDIT_PAGE_VARIABLES_MODE}=true`;
};

import {
  FetchGettingStartedChecklistQuery,
  useFetchGettingStartedChecklistQuery,
} from '@js/common/ExpChecklistV2/FetchGettingStartedChecklist.generated';
import {
  useCurrentUserSelector,
  useIsCurrentUserLoggedIn,
} from '@js/common/current-user';

import {
  ADD_TEAMMATE,
  CREATE_ACCOUNT,
  DOWNLOAD_RECORDER,
  FIRST_VIDEO_RECORDING,
  FIRST_VIDEO_VIEWED,
  MEETING_RECORDING,
  SHARE_VIDEO,
} from '@loomhq/shared-utilities/constants/checklist';

import { useExtensionInstalled } from './devices';

import { useGetLatestVideo } from './onboarding/checklist/hooks';

export interface ChecklistStatus {
  [CREATE_ACCOUNT]: boolean;
  [DOWNLOAD_RECORDER]: boolean;
  [FIRST_VIDEO_RECORDING]: boolean;
  [SHARE_VIDEO]: boolean;
  [FIRST_VIDEO_VIEWED]: boolean;
  [ADD_TEAMMATE]: boolean;
  [MEETING_RECORDING]: boolean;
}

const parseFetchGettingStartedChecklistQuery = (
  data: FetchGettingStartedChecklistQuery | undefined,
  defaults: ChecklistStatus
): ChecklistStatus => {
  if (
    data?.fetchGettingStartedChecklist?.__typename ===
    'GettingStartedChecklistPayload'
  ) {
    return {
      [CREATE_ACCOUNT]: true,
      [DOWNLOAD_RECORDER]: Boolean(
        data.fetchGettingStartedChecklist.download_recorder
      ),
      [FIRST_VIDEO_RECORDING]: Boolean(
        data.fetchGettingStartedChecklist.first_video_recording
      ),
      [SHARE_VIDEO]: Boolean(data.fetchGettingStartedChecklist.share_video),
      [FIRST_VIDEO_VIEWED]: Boolean(
        data.fetchGettingStartedChecklist.first_video_viewed
      ),
      [ADD_TEAMMATE]: Boolean(data.fetchGettingStartedChecklist.add_teammate),
      [MEETING_RECORDING]: Boolean(
        data.fetchGettingStartedChecklist.meeting_recording
      ),
    };
  }

  return {
    [CREATE_ACCOUNT]: true,
    [DOWNLOAD_RECORDER]: defaults[DOWNLOAD_RECORDER],
    [FIRST_VIDEO_RECORDING]: defaults[FIRST_VIDEO_RECORDING],
    [SHARE_VIDEO]: defaults[SHARE_VIDEO],
    [FIRST_VIDEO_VIEWED]: defaults[FIRST_VIDEO_VIEWED],
    [ADD_TEAMMATE]: defaults[ADD_TEAMMATE],
    [MEETING_RECORDING]: defaults[MEETING_RECORDING],
  };
};

export const useGetCheckListStatus = (): ChecklistStatus => {
  const userIsLoggedIn = useIsCurrentUserLoggedIn();

  const { latestVideo } = useGetLatestVideo();

  const { data } = useFetchGettingStartedChecklistQuery({
    skip: !userIsLoggedIn,
  });

  const hasDownloadedRecorder = useCurrentUserSelector(
    user => user?.checklist?.download_recorder,
    null
  );
  const hasFirstVideoRecording = useCurrentUserSelector(
    user => user?.checklist?.first_video_recording,
    null
  );
  const hasSharedVideo = useCurrentUserSelector(
    user => user?.checklist?.share_video,
    null
  );
  const hasFirstVideoViewed = useCurrentUserSelector(
    user => user?.checklist?.first_video_viewed,
    null
  );
  const hasAddedTeammate = useCurrentUserSelector(
    user => user?.checklist?.add_teammate,
    null
  );
  const hasMeetingRecording = useCurrentUserSelector(
    user => user?.checklist?.meeting_recording,
    null
  );

  const selected = parseFetchGettingStartedChecklistQuery(data, {
    [CREATE_ACCOUNT]: true,
    [DOWNLOAD_RECORDER]: Boolean(hasDownloadedRecorder),
    [FIRST_VIDEO_RECORDING]: Boolean(latestVideo || hasFirstVideoRecording),
    [SHARE_VIDEO]: Boolean(hasSharedVideo),
    [FIRST_VIDEO_VIEWED]: Boolean(hasFirstVideoViewed),
    [ADD_TEAMMATE]: Boolean(hasAddedTeammate),
    [MEETING_RECORDING]: Boolean(hasMeetingRecording),
  });

  const hasUsedDesktopApp = useCurrentUserSelector(
    user => user.hasActivatedDesktopApp,
    null
  );
  const hasUsedExtension = useCurrentUserSelector(
    user => user.hasActivatedChromeExtension,
    null
  );

  const isChromeExtensionInstalled = useExtensionInstalled();

  const downloadRecorderComplete =
    (selected[DOWNLOAD_RECORDER] ?? hasDownloadedRecorder) ||
    hasUsedDesktopApp ||
    hasUsedExtension ||
    isChromeExtensionInstalled;

  const result = {
    ...selected,
    [DOWNLOAD_RECORDER]: downloadRecorderComplete,
  };

  return result;
};

import {
  GET_STARTED_CHECKLIST_COPY_LAST_VIDEO_LINK_CLICKED,
  GET_STARTED_CHECKLIST_DEMO_CLICKED,
  GET_STARTED_CHECKLIST_SHARE_VIDEO_CLICKED,
} from '@js/constants/events';
import { LOOM_URI } from '@js/constants/routes';

import { ChecklistV2DisplayContext } from '@js/common/ExpChecklistV2';
import { useGetMostRecentVideoV2Query } from '@js/common/ExpChecklistV2/GetMostRecentVideoV2.generated';
import {
  useCurrentUserSelector,
  useIsCurrentUserLoggedIn,
} from '@js/common/current-user';
import { SHARE_UI_MODAL } from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import { ShareModalSource } from '@js/common/share-video/share-modal/enums';
import {
  ONBOARDING_CHECKLIST,
  RecordButton,
} from '@js/components/record-button';
import { CHROME_EXTENSION } from '@js/components/record-button/constants';
import { useCompleteChecklistItem } from '@js/hooks/checklist';
import { useExtensionInstalled } from '@js/hooks/devices';
import { useGetCheckListStatus } from '@js/hooks/getStartedChecklist';
import useBooleanTimeoutState from '@js/hooks/useBooleanTimeoutState';
import { useRecordLoom } from '@js/hooks/useRecordLoom';
import React from 'react';
import * as analytics from '@js/utilities/analytics';
import { copyVideoUrlWithShareId } from '@js/utilities/url';

import { Align, Button, Spacer } from '@loomhq/lens';

import { DOWNLOAD_RECORDER } from '@loomhq/shared-utilities/constants/checklist';

import { ChecklistItem } from '@js/globalTypes.generated';

import { endDate } from './date';

/*
full left side: only one button do not render this
full right side: copy button and share button

sidebar incomplete: render record a loom
sidebar complete: render upload a video
 */

const LINK_COPIED_TIMEOUT = 10_000;
export function CopyLinkOrRecordButtons({
  includeUploadButton,
  includeShareButton,
  displayContext,
}: {
  includeUploadButton: boolean;
  includeShareButton: boolean;
  displayContext: ChecklistV2DisplayContext;
}): JSX.Element {
  const { openModal } = useModals();
  const { recorder } = useRecordLoom();
  const checklistStatus = useGetCheckListStatus();
  const hasRecorder = recorder.chrome || recorder.desktop;
  const isDisabled = !hasRecorder && !checklistStatus[DOWNLOAD_RECORDER];

  const isLoggedIn = useIsCurrentUserLoggedIn();
  const userCreatedAt = useCurrentUserSelector(
    user => user.createdAt,
    new Date()
  ).toISOString();

  const extensionInstalled = useExtensionInstalled();

  const { error, loading, data } = useGetMostRecentVideoV2Query({
    variables: {
      startDate: userCreatedAt,
      endDate: endDate.toISOString(),
      limit: 1,
      offset: 0,
    },
    skip: !isLoggedIn,
  });

  const [copied, toggleCopied] = useBooleanTimeoutState(LINK_COPIED_TIMEOUT);

  const { completeChecklistItem: completeShareVideoCheckListItem } =
    useCompleteChecklistItem(ChecklistItem.ShareVideo);

  const mostRecentVideo = data?.recentUserVideos
    ? data?.recentUserVideos[0]
    : undefined;
  const shareLink = `${LOOM_URI}/share/${mostRecentVideo?.id}`;
  const shouldShowMostRecentVideo = !loading && !error && mostRecentVideo;

  const handleShareButtonClick = () => {
    openModal({
      modalType: SHARE_UI_MODAL,
      options: {
        source: ShareModalSource.TipsAndTricksShareButton,
        videoId: mostRecentVideo?.id,
      },
    });

    analytics.track(GET_STARTED_CHECKLIST_SHARE_VIDEO_CLICKED, {
      displayContext: ChecklistV2DisplayContext.Full,
    });
  };

  const handleCopyButtonClick = e => {
    e.stopPropagation();

    const [, _] = copyVideoUrlWithShareId({
      videoUrl: shareLink,
    });

    toggleCopied();

    completeShareVideoCheckListItem();

    analytics.track(GET_STARTED_CHECKLIST_COPY_LAST_VIDEO_LINK_CLICKED, {
      displayContext: ChecklistV2DisplayContext.Full,
    });
  };
  const demoOrUploadButton = extensionInstalled ? (
    <RecordButton
      priorityList={[CHROME_EXTENSION]}
      shouldLaunchExtensionTutorial={true}
      source={ONBOARDING_CHECKLIST}
    >
      <Button
        hasFullWidth={true}
        variant="neutral"
        onClick={() =>
          analytics.track(GET_STARTED_CHECKLIST_DEMO_CLICKED, {
            displayContext: ChecklistV2DisplayContext.Full,
          })
        }
      >
        Watch demo
      </Button>
    </RecordButton>
  ) : null;

  let copyButtonText = 'Copy last video link';
  if (copied) {
    copyButtonText = 'Link copied!';
  } else if (displayContext !== ChecklistV2DisplayContext.Full) {
    copyButtonText = 'Copy link';
  }
  const copyButtonVariant =
    displayContext === ChecklistV2DisplayContext.Full ? 'neutral' : 'primary';

  const buttonSize =
    displayContext === ChecklistV2DisplayContext.Full ? 'medium' : 'small';

  return shouldShowMostRecentVideo ? (
    <Align>
      <>
        {displayContext === ChecklistV2DisplayContext.Full ? (
          <Button
            size={buttonSize}
            hasFullWidth={true}
            variant={copyButtonVariant}
            href={shareLink}
            target="_blank"
            htmlTag="a"
            onClick={() => null}
          >
            Edit video
          </Button>
        ) : (
          <Button
            size={buttonSize}
            hasFullWidth={true}
            variant={copyButtonVariant}
            onClick={handleCopyButtonClick}
          >
            {copyButtonText}
          </Button>
        )}
        <Spacer top="medium" />
      </>
      {includeShareButton && (
        <Button
          hasFullWidth={true}
          variant="primary"
          onClick={handleShareButtonClick}
        >
          Share video
        </Button>
      )}
    </Align>
  ) : (
    <Align>
      {includeUploadButton && (
        <>
          {demoOrUploadButton}
          <Spacer top="medium" />
        </>
      )}
      <RecordButton source={ONBOARDING_CHECKLIST}>
        <Button
          isDisabled={isDisabled}
          size={buttonSize}
          hasFullWidth={true}
          variant="primary"
        >
          Record a Loom
        </Button>
      </RecordButton>
    </Align>
  );
}

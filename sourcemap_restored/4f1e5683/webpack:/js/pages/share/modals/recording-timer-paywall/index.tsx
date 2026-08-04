import React, { useEffect, useState } from 'react';

import {
  Arrange,
  Modal as LensModal,
  Split,
  SplitSection,
  Text,
  TextButton,
  Toast as LensToast,
} from '@loomhq/lens';
import { VIDEO_DURATION } from '@loomhq/shared-utilities/constants/limits';
import { ORG_ROLE_ADMIN } from '@loomhq/shared-utilities/constants/organizationRoles';

import {
  RECORDING_TIMER_PAYWALL,
  RECORDING_TIMER_PAYWALL_LITE,
} from '@loomhq/shared-utilities/constants/scopes';
import { useCurrentUserSelector } from '@js/common/current-user';
import { UpgradeButton } from '@js/common/upgrade';
import {
  RECORDING_LIMIT_MODAL_CLICKED,
  RECORDING_LIMIT_MODAL_DISMISSED,
  RECORDING_LIMIT_MODAL_SHOWN,
  RECORDING_LIMIT_TOAST_CLICKED,
} from '@js/constants/events';
import { useHasSomeScopes } from '@js/hooks/useHasScopes';
import { useRoleLimit } from '@js/hooks/useRoleLimit';
import { useWorkspaceLimit } from '@js/hooks/useWorkspaceLimit';
import { useGetUserRoleForSelectedWorkspace } from '@js/hooks/workspace';
import OutageSrc from '@assets/img/video-player/outage.png';
import { track } from '@js/utilities/analytics';
import * as logger from '@js/utilities/loggerx';

import { useUpdateUserReachedRecordingLimitChecklistItemMutation } from './updateUserReachedRecordingLimitChecklistItem.generated';

type ModalProps = {
  videoDurationLimitToString: string;
  showModal: boolean;
};

type ToastProps = {
  videoDurationLimitToString: string;
  showToast: boolean;
};

const Toast = ({ videoDurationLimitToString, showToast }: ToastProps) => {
  const userRole = useGetUserRoleForSelectedWorkspace();
  const upgradeText =
    userRole !== ORG_ROLE_ADMIN
      ? 'send a request to your admin to upgrade'
      : 'upgrade';

  const textId = 'unlimited-recording-description';

  return (
    <LensToast isOpen={showToast}>
      <Split gap="medium">
        <SplitSection basis={35}>
          <Text fontWeight="bold">
            You&apos;ve hit the {videoDurationLimitToString} recording limit.
          </Text>
          <Text size="body-sm" id={textId}>
            Create videos with unlimited recording time on the{' '}
            <strong>Business plan</strong> or above. Click to {upgradeText}.
          </Text>
        </SplitSection>
        <SplitSection grow={1}>
          <UpgradeButton
            analyticsEvent={RECORDING_LIMIT_TOAST_CLICKED}
            hideTooltip
          />
        </SplitSection>
      </Split>
    </LensToast>
  );
};

const Modal = ({
  videoDurationLimitToString,
  showModal,
}: ModalProps): JSX.Element | null => {
  const [_, setShowModal] = useState(showModal);

  const onClose = () => {
    track(RECORDING_LIMIT_MODAL_DISMISSED);
    setShowModal(false);
  };

  const textId = 'recording-limit-description';

  return (
    <LensModal
      isOpen={showModal}
      onCloseClick={onClose}
      onBackgroundClick={onClose}
      maxWidth={55}
    >
      <Arrange gap={2} autoFlow="row" justifyItems="center">
        <img
          alt="Person standing in arched doorway with speech bubbles, illustrated"
          src={OutageSrc}
          height="88"
          width="77"
        />
        <Text htmlTag="h1" variant="mainTitle" alignment="center">
          You&apos;ve got a lot to say!
        </Text>
        <Text id={textId} alignment="center" color="bodyDimmed">
          You&apos;ve hit the {videoDurationLimitToString} recording limit. If
          you have more to add, upgrade for unlimited recording time.
        </Text>
        <UpgradeButton
          analyticsEvent={RECORDING_LIMIT_MODAL_CLICKED}
          ariaLabelledBy={textId}
          defaultButtonText="Upgrade for unlimited recordings"
          hideTooltip={true}
        />

        <TextButton onClick={onClose}>Go to my video</TextButton>
      </Arrange>
    </LensModal>
  );
};

type RecordingTimerPaywallGateProps = {
  fromRecorderParam: boolean;
  recordingLimitParam: boolean;
};

// Handles the gating and determines whether the user should see a modal (first time) or toast
export const RecordingTimerPaywallGate = ({
  fromRecorderParam,
  recordingLimitParam,
}: RecordingTimerPaywallGateProps): JSX.Element | null => {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const workspaceVideoDurationLimit = useWorkspaceLimit(VIDEO_DURATION);

  const memberVideoDurationLimit = useRoleLimit(VIDEO_DURATION);
  const videoDurationLimit =
    workspaceVideoDurationLimit || memberVideoDurationLimit;

  const videoDurationLimitToString = videoDurationLimit
    ? videoDurationLimit < 60
      ? `${videoDurationLimit} second`
      : `${videoDurationLimit / 60} minute`
    : '';

  const userId = useCurrentUserSelector(user => user.id, NaN);

  const showRecordingTimerPaywall = useHasSomeScopes([
    RECORDING_TIMER_PAYWALL,
    RECORDING_TIMER_PAYWALL_LITE,
  ]);

  // If we're coming from a location that's not the recorder (e.g. library, don't show paywalls)
  const meetsPaywallConditions =
    showRecordingTimerPaywall &&
    videoDurationLimit &&
    recordingLimitParam &&
    fromRecorderParam;

  const [updateUserReachedRecordingLimitChecklistItemMutation, { loading }] =
    useUpdateUserReachedRecordingLimitChecklistItemMutation({
      variables: {
        userId,
      },
      onCompleted: data => {
        if (meetsPaywallConditions) {
          // Successful data means the user has already seen the modal and their checklist is updated, show toast instead
          if (data.successful) {
            setShowModal(false);
            setShowToast(true);
          } else {
            // the user has not seen the modal, show it, then update checklist
            setShowModal(true);
            track(RECORDING_LIMIT_MODAL_SHOWN);
          }
        }
      },
      onError: err => {
        logger.warning(err, { userId });
      },
    });

  // Ideally we should not have to run this mutation on mount
  // Instead, this checklist update should happen in the backend
  // when the user has hit their recording limit and
  // the frontend should check the query for the checklist status
  // to determine what to display
  useEffect(() => {
    updateUserReachedRecordingLimitChecklistItemMutation({
      variables: { userId },
    });

    // On mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetsPaywallConditions]);

  if (!meetsPaywallConditions || loading) {
    return null;
  }

  return (
    <>
      <Toast
        videoDurationLimitToString={videoDurationLimitToString}
        showToast={showToast}
      />

      <Modal
        videoDurationLimitToString={videoDurationLimitToString}
        showModal={showModal}
      />
    </>
  );
};

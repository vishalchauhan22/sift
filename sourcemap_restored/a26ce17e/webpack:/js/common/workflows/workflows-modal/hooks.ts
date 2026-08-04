import { useVideoContext } from '@js/common/video-player';
import { useFeatureFlagValue } from '@js/hooks/featureFlag';

import { VARIANT } from '@loomhq/shared-utilities/constants/featureFlag';
import { CAM as CAM_RECORDING_TYPE } from '@loomhq/shared-utilities/constants/recordingTypes';

import {
  V3,
  V4,
  V5,
  V6,
  V7,
} from '@loomhq/shared-utilities/constants/recordingVersions';

import {
  ControlType,
  EXPERIMENTS,
} from '@loomhq/shared-utilities/constants/statsig';

import { ArtifactType } from '../common/types';
import { useModalStore } from '../common/useModalStore';

export const useShouldShowPictureInScripture = (): boolean => {
  const { video } = useVideoContext();
  const recordingType = video.videoProperties.recordingType;
  const isCamOnlyRecoding = recordingType === CAM_RECORDING_TYPE;
  const { activeArtifactType } = useModalStore();
  const pictureInScriptureFlagValue = useFeatureFlagValue(
    EXPERIMENTS.EXP_PICTURE_IN_SCRIPTURE,
    ControlType.STATSIG_EXPERIMENT
  );

  const isInPictureInScriptureExperiment =
    pictureInScriptureFlagValue === 'variant-excluded' ||
    pictureInScriptureFlagValue == 'variant';

  const supportedVersions = [V3, V4, V5, V6, V7];

  let isSupportedRecordingVersion = false;

  if (video.videoProperties.recordingVersion) {
    isSupportedRecordingVersion = supportedVersions.includes(
      video.videoProperties
        .recordingVersion as (typeof supportedVersions)[number]
    );
  }
  const supportedDocuments = [
    ArtifactType.Sop,
    ArtifactType.StepByStep,
    ArtifactType.PrDescription,
    ArtifactType.CodeDocs,
    ArtifactType.QaSteps,
  ];
  const isSupportedDocument =
    (activeArtifactType && supportedDocuments.includes(activeArtifactType)) ||
    false;

  return (
    isInPictureInScriptureExperiment &&
    !isCamOnlyRecoding &&
    isSupportedRecordingVersion &&
    isSupportedDocument
  );
};

export const useWorkflowHeaderFlagValue = (): boolean => {
  const value = useFeatureFlagValue(
    EXPERIMENTS.EXP_WORKFLOW_NEW_HEADER,
    ControlType.STATSIG_EXPERIMENT
  );

  return value === VARIANT;
};

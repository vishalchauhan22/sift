import {
  EDIT_AND_TRIM_VIDEO_CLICKED,
  EDIT_TOGGLE_ADD_STYLIZED_CAPTIONS,
} from '@js/constants/events';

import { RequestPlanUpgradeLocations } from '@js/constants/requestPlanUpgradeLocations';

import { useAutoStatusesForEditTab } from '@js/common/ai/use-auto-statuses/useAutoStatusesForEditTab';
import { useConfirmationToast } from '@js/common/confirmation-toast/useConfirmationToast';
import { useGetCta } from '@js/common/cta-form';
import { useCurrentUserSelector } from '@js/common/current-user';
import { useIsMeetingRecording } from '@js/common/meeting-recordings';
import { WORKFLOWS_MODAL } from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import { useVideoPasswordContext } from '@js/common/video-password';
import { useToggleCaptions, useVideoContext } from '@js/common/video-player';
import {
  BUTTON_IDX_TO_ACTIVE_ARTIFACT_TYPE,
  LoomCategory,
  WorkflowType,
} from '@js/common/workflows/common/types';
import { useGeneratedLoomCategorizationQuery } from '@js/common/workflows/common/useGenerateLoomCategorization/GeneratedLoomCategorization.generated';
import { useModalStore } from '@js/common/workflows/common/useModalStore';
import {
  AiCreateModalOpenedSource,
  useWorkflowsAnalytics,
} from '@js/common/workflows/common/useWorkflowsAnalytics';
import { workflowsTypeMapper } from '@js/common/workflows/workflows-modal/create-document/types';
import { useWorkflowHeaderFlagValue } from '@js/common/workflows/workflows-modal/hooks';
import { useHasPersonalizedAudio } from '@js/components/video-personalization/hooks';
import { useHasAIFeatureAccess } from '@js/hooks/useHasAIFeatureAccess';
import { useHasScope } from '@js/hooks/useHasScopes';
import { useIsOwnerAfterRecording } from '@js/hooks/useIsOwnerAfterRecording';
import { useIsTrialingAIAddOn } from '@js/hooks/useIsTrialingAIAddOn';
import { useWorkspaceAllowsAi } from '@js/hooks/useWorkspaceAllowsAi';
import { useGetSelectedWorkspace } from '@js/hooks/workspace';
import {
  useLastTrimId,
  useShouldAllowTrimmingIfAudioVariablesVideo,
} from '@js/pages/share/common';

import React, { useEffect, useMemo } from 'react';

import { useUpdateUserVideoSettingsMutation } from '@js/utilities/UpdateUserVideoSettings.generated';
import { useUpdateVideoSettingsMutation } from '@js/utilities/UpdateVideoSettings.generated';
import * as analytics from '@js/utilities/analytics';
import * as loggerx from '@js/utilities/loggerx';

import {
  Arrange,
  Container,
  Icon,
  Loader,
  SkeletonText,
  Spacer,
  Switch,
} from '@loomhq/lens';
import { SvgAutoDraft } from '@loomhq/lens/icons/auto-draft';
import { SvgAutoTitles } from '@loomhq/lens/icons/auto-titles';
import { SvgCaptions } from '@loomhq/lens/icons/captions';
import { SvgFillerWordRemoval } from '@loomhq/lens/icons/filler-word-removal';
import { SvgScissors } from '@loomhq/lens/icons/scissors';
import { SvgConfluence } from '@loomhq/lens/icons/confluence';
import { SvgWriteDocument } from '@loomhq/lens/icons/write-document';

import { SMART_PROMPT_CATEGORIES } from '@loomhq/shared-utilities/constants/intelligence';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import {
  AI_AUTO_CHAPTERING_ACCESS,
  AI_AUTO_SUMMARIES_ACCESS,
  AI_AUTO_TITLE_ACCESS,
  AI_FILLER_WORD_REMOVAL,
  AI_VARIABLES,
  STYLIZED_CAPTIONS,
  VIDEO_CTA_ACCESS,
  VIDEO_EDIT_BY_TRANSCRIPT_ACCESS,
  VIDEO_OVERLAYS_ACCESS,
  VIDEO_TRIM_ACCESS,
} from '@loomhq/shared-utilities/constants/scopes';

import { AddLinkButton } from './AddLinkButton';
import { BulkTrimButtons } from './BulkTrimButtons';
import {
  GetDismissWorkflowSneakpeekStatusDocument,
  useGetDismissWorkflowSneakpeekStatusQuery,
} from './GetDismissWorkflowSneakpeekStatus.generated';
import { useUpdateDismissWorkflowSneakpeekMutation } from './UpdateDismissWorkflowSneakpeek.generated';
import { VariablesEditItem } from './VariablesEditItem';
import { VariablesPaywalledEditItem } from './VariablesPaywalledEditItem';
import { useOnRecordingCompletedSubscription } from '../common/chapters/linked-chapters/OnRecordingCompleted.generated';
import { LoomAiPanel, selectAiStatus } from '../common/loom-ai-panel';
import {
  AutoContextPopover,
  ConsolidatedEditPopover,
  FillerWordSilenceRemovalPopover,
  PaywalledEditToolsPopover,
  WorkflowsPopover,
} from './common/popovers';
import { EditItem, PaywalledEditItem } from './edit-item';
import { EditPageButton } from './edit-page-button';
import { EditSection, EditSectionTitle } from './common/edit-section';
import { GenerateDocOrPageButton } from './generateDocOrPageButton';
import { useGetEditTabVideoDetailsQuery } from './getEditTabVideoDetails.generated';
import { useGetEditTabWorkspaceBillingDetailsQuery } from './getEditTabWorkspaceBillingDetails.generated';
import { useConfluenceUserPermissionsQuery } from '@js/common/workflows/workflows-modal/ConfluenceUserPermissions.generated';
import { selectVideoData } from './selectVideoData';
import { SvgAiGradientDef } from './svg-ai-gradient-def';
import { usePreloadHoverImages } from './usePreloadHoverImages';
import { SuggestedWorkflowSneakPeek, Workflows } from './workflows';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';
import { useEditZoomInstructions } from '@js/common/edit-zoom-instructions';
import { useAutoGenInfo } from '@js/pages/share/edit-tab/useAutoGetInfo';
import { ZoomCreatedBy } from '@js/globalTypes.generated';
import { useResetDraftToReadyToEditMutation } from '@js/pages/share/edit-tab/ResetDraftToReadyToEdit.generated';
import { AutoAppliedPopoverButton } from './auto-applied';

export const UNAVAILABLE_TOOLTIP_TEXT = 'Feature unavailable on this video';
const CATEGORIZATION_CONFIDENCE_THRESHOLD = 0.66;

const LoadingEditTab = (): React.ReactElement => {
  return (
    <Container padding={3}>
      <Spacer bottom={1}>
        <Container width={20}>
          <SkeletonText size="heading-md" lines={1} />
        </Container>
      </Spacer>
      <SkeletonText size="heading-lg" lines={1} />
      <SkeletonText size="heading-lg" lines={1} />
      <Spacer top={2} bottom={1}>
        <Container width={20}>
          <SkeletonText size="heading-md" lines={1} />
        </Container>
      </Spacer>
      <SkeletonText size="heading-lg" lines={1} />
      <SkeletonText size="heading-lg" lines={1} />
      <SkeletonText size="heading-lg" lines={1} />
      <SkeletonText size="heading-lg" lines={1} />
      <SkeletonText size="heading-lg" lines={1} />
      <SkeletonText size="heading-lg" lines={1} />
    </Container>
  );
};

export const EditTabController = ({
  onAddLinkClick,
}: {
  onAddLinkClick: () => void;
}): JSX.Element => {
  const { openModal } = useModals();
  const { video, setVideo } = useVideoContext();
  const { modelId: videoId } = video;
  const cta = useGetCta(videoId);
  const { password } = useVideoPasswordContext();
  const { lastTrimId } = useLastTrimId();
  const { setShowConfirmationToast } = useConfirmationToast();
  const workspaceAllowsAiAccess = useWorkspaceAllowsAi();
  const workspace = useGetSelectedWorkspace();
  const isMeetingRecording = useIsMeetingRecording(videoId);
  const workflowHeaderFlagValue = useWorkflowHeaderFlagValue();
  const { isLoomZoomToClickEnabled, zooms } = useEditZoomInstructions(videoId);

  // Preload all the images used for the hover-popovers so they don't "flash" on hover
  usePreloadHoverImages();

  const hasCta = cta?.ctaEnabled ?? false;

  const isOwnerAfterRecording = useIsOwnerAfterRecording({ videoId });

  const hasStylizedCaptionsScope = useHasScope(STYLIZED_CAPTIONS);

  const shouldSeeCaptionsToggle = Boolean(hasStylizedCaptionsScope);

  const hasCreatorEnabledCaptions = Boolean(video?.viewerCaptionsOn);
  const stylizedCaptionsEnabled = Boolean(video?.stylizedCaptions);

  const stylizedCaptionsActive = Boolean(
    hasCreatorEnabledCaptions && stylizedCaptionsEnabled
  );

  const stylizedCaptionsTooltipText = 'Feature unavailable on this video';

  const { captionsActive, onToggle: toggleCaptions } = useToggleCaptions(
    video.id
  );

  const {
    isAiGenerating,
    isStatusesFetching: isAutoStatusesFetching,
    hasError: aiHasError,
    autoTitleGenerated,
    autoSummaryGenerated,
    autoChaptersGenerated,
    hasUserEditedTitle,
    hasUserEditedSummary,
    hasUserEditedChapters,
    transcriptAvailable,
    transcriptInProgress,
    transcriptUnsuccessful,
    transcriptRegenerating,
  } = useAutoStatusesForEditTab({ videoId });

  const {
    loomCategory,
    categorizationConfidence,
    setLoomCategory,
    setIsLoomCategorizationInProgress,
    setCategorizationConfidence,
    setEnteredWorkflowModalFromSneakpeekCTA,
  } = useModalStore();

  const { data: dismissSneakPeekData } =
    useGetDismissWorkflowSneakpeekStatusQuery({
      variables: { videoId },
      skip: !videoId,
    });

  const isSneakPeekDismissed =
    dismissSneakPeekData?.result?.__typename ===
    'DismissWorkflowSneakpeekProperty'
      ? (dismissSneakPeekData.result.dismissWorkflowSneakpeek ?? false)
      : false;

  const transcriptInitiallyInProgress =
    transcriptInProgress && !transcriptRegenerating;

  const acceptableCategories = new Set<SMART_PROMPT_CATEGORIES>([
    SMART_PROMPT_CATEGORIES.BUG_REPORT,
    SMART_PROMPT_CATEGORIES.PR_DESCRIPTION,
    SMART_PROMPT_CATEGORIES.PROCESS_WALKTHROUGH,
    SMART_PROMPT_CATEGORIES.CODE_DOCS,
    SMART_PROMPT_CATEGORIES.QA_STEPS,
    SMART_PROMPT_CATEGORIES.STEP_BY_STEP,
  ]);

  const hasAccessToSneakPeek = workspaceAllowsAiAccess && !isSneakPeekDismissed;
  const isSneakPeekAvailableToGenerate =
    transcriptAvailable &&
    !isMeetingRecording &&
    loomCategory !== null &&
    acceptableCategories.has(loomCategory as SMART_PROMPT_CATEGORIES) &&
    categorizationConfidence !== null &&
    categorizationConfidence >= CATEGORIZATION_CONFIDENCE_THRESHOLD;
  const showGenerateDocOrPageButton =
    (hasAccessToSneakPeek && isSneakPeekAvailableToGenerate) ||
    isSneakPeekDismissed;

  // If the User is opted-into the AI-Powered Document Generation integration with Confluence
  // show a Connie icon and the text "Generate a page" to be consistent with Confluence wording.
  const { data, loading: hasConfluencePermissionsLoading } =
    useConfluenceUserPermissionsQuery();

  const hasConfluencePermissions =
    !hasConfluencePermissionsLoading &&
    data?.confluenceUserPermissions?.__typename ===
      'ConfluenceUserPermissionsPayload'
      ? data.confluenceUserPermissions.hasPermission
      : false;

  const generateWorkflowButtonTitle = hasConfluencePermissions
    ? 'Generate a page'
    : 'Generate a document';

  const generateWorkflowButtonIcon = hasConfluencePermissions ? (
    <SvgConfluence />
  ) : (
    <SvgWriteDocument />
  );

  const stylizedCaptionsDisabled = !transcriptAvailable;

  const { data: billingDetailsData, loading: billingDetailsLoading } =
    useGetEditTabWorkspaceBillingDetailsQuery({
      variables: {
        workspaceId: workspace?.id,
      },
      skip: !workspace?.id,
      onError: error => {
        // handled by the feature wrapper
        throw error;
      },
      onCompleted: data => {
        if (data?.getWorkspaceBillingDetails?.__typename !== 'BillingEntity') {
          throw new Error('Billing details not found');
        }
      },
    });

  const {
    data: videoData,
    loading: videoDataLoading,
    refetch: refetchVideoDetails,
  } = useGetEditTabVideoDetailsQuery({
    variables: { videoId, password },
    onError: error => {
      // handled by the feature wrapper
      throw error;
    },
    onCompleted: data => {
      if (data?.getVideo?.__typename !== 'RegularUserVideo') {
        throw new Error(data?.getVideo?.message ?? 'Video data not found');
      }
    },
  });

  const { videoIsComplete, isAutoLinkDetected, autoLinkTitle } =
    selectVideoData(videoData);

  const { data: subscriptionData, error } = useOnRecordingCompletedSubscription(
    {
      variables: { videoId },
      // do not start the subscription if the video is already complete
      skip: Boolean(videoIsComplete) || !videoId,
    }
  );

  const workspaceIsBusinessOrEnterpriseWithAi =
    (workspace.type === 'enterprise' || workspace.type === 'business') &&
    workspaceAllowsAiAccess;

  const skipCategorizationQuery =
    isMeetingRecording ||
    !workspaceIsBusinessOrEnterpriseWithAi ||
    !transcriptAvailable;
  const { loading: generatingLoomCategory } =
    useGeneratedLoomCategorizationQuery({
      variables: {
        videoId,
      },
      skip: skipCategorizationQuery,
      onCompleted: data => {
        if (
          data?.generatedLoomCategorization?.__typename ===
          'GeneratedLoomCategorizationPayload'
        ) {
          const { assignedCategory, confidence } =
            data.generatedLoomCategorization.generatedCategory;

          setLoomCategory(assignedCategory as LoomCategory);
          setCategorizationConfidence(confidence);
        }
      },
    });

  useEffect(() => {
    if (generatingLoomCategory) {
      setIsLoomCategorizationInProgress(true);
    } else {
      setIsLoomCategorizationInProgress(false);
    }
  }, [generatingLoomCategory, setIsLoomCategorizationInProgress]);

  useEffect(() => {
    if (
      subscriptionData?.recordingCompleted ||
      error?.message === 'Video already completed'
    ) {
      refetchVideoDetails();
    }
  }, [subscriptionData, error, refetchVideoDetails]);

  const [
    updateUserVideoSettingsMutation,
    { loading: isUpdatingUserVideoSettings },
  ] = useUpdateUserVideoSettingsMutation();

  const [updateVideoSettingsMutation, { loading: isUpdatingVideoSettings }] =
    useUpdateVideoSettingsMutation();

  const updateVideoAndDefaultVideoSettings = () => {
    const updatedStylizedCaptionsActiveValue = !stylizedCaptionsActive;

    // Update Video Settings on Current Video with the new values for stylized captions and viewer captions on
    updateVideoSettingsMutation({
      variables: {
        videoId,
        settings: {
          stylizedCaptions: updatedStylizedCaptionsActiveValue,
          viewerCaptionsOn: updatedStylizedCaptionsActiveValue,
        },
        password,
      },

      onError: err => {
        loggerx.error(
          err,
          {
            message: `Failed to update stylized captions enabled`,
            videoId,
            settings: {
              stylized_captions: updatedStylizedCaptionsActiveValue,
              viewer_captions_on: updatedStylizedCaptionsActiveValue,
            },
          },
          { feature: Feature.StylizedCaptions }
        );
        setShowConfirmationToast(
          'Failed to update stylized captions. Please try again'
        );
      },
      onCompleted: data => {
        if (
          data.updateVideoSettings?.__typename !== 'UpdateVideoSettingsPayload'
        ) {
          setShowConfirmationToast(
            'Failed to update stylized captions. Please try again'
          );
          return;
        }

        const stylizedCaptionsData =
          data?.updateVideoSettings?.video?.stylizedCaptions;
        const captionsViewerOnData =
          data?.updateVideoSettings?.video?.viewerCaptionsOn;

        if (
          stylizedCaptionsData === undefined ||
          stylizedCaptionsData === null ||
          captionsViewerOnData === undefined ||
          captionsViewerOnData === null
        ) {
          setShowConfirmationToast(
            'Failed to set stylized captions. Please try again'
          );
          return;
        }

        setVideo({
          stylizedCaptions: stylizedCaptionsData,
          viewerCaptionsOn: captionsViewerOnData,
        });

        // Toggle Captions button on the video player
        if (captionsActive !== captionsViewerOnData) {
          toggleCaptions();
        }

        analytics.track(EDIT_TOGGLE_ADD_STYLIZED_CAPTIONS, {
          ...withIdentifiers(
            EDIT_TOGGLE_ADD_STYLIZED_CAPTIONS,
            AnalyticsEntityId.video(videoId, 'video_id')
          ),
          source: 'EDIT',
          enabled: stylizedCaptionsData,
        });
      },
    });

    // Update Default Video Settings on User with the new values for stylized captions and viewer captions on
    updateUserVideoSettingsMutation({
      variables: {
        videoSettings: {
          stylizedCaptions: updatedStylizedCaptionsActiveValue,
          viewerCaptionsOn: updatedStylizedCaptionsActiveValue,
        },
      },
      onError: err => {
        loggerx.error(
          err,
          {
            message: `Failed to update default stylized captions`,
            videoId,
            settings: {
              stylized_captions: updatedStylizedCaptionsActiveValue,
              viewer_captions_on: updatedStylizedCaptionsActiveValue,
            },
          },
          { feature: Feature.StylizedCaptions }
        );
        setShowConfirmationToast(
          'Failed to update default stylized captions. Please try again'
        );
      },
      onCompleted: data => {
        if (
          data.updateUserVideoSettings?.__typename !==
          'UpdateUserVideoSettingsPayload'
        ) {
          setShowConfirmationToast(
            'Failed to update default stylized captions. Please try again'
          );
          return;
        }
      },
    });
  };

  const { isAutoGenerated: isVideoAutoGenerated, draftId: videoDraftId } =
    useAutoGenInfo({
      videoId: video.id,
      password,
    });

  const isTrialing = useMemo(
    () =>
      billingDetailsData?.getWorkspaceBillingDetails?.billing_details?.plan
        ?.pure_trial ?? false,
    [billingDetailsData]
  );

  const workspaceAllowsAi = useWorkspaceAllowsAi();

  const isAiRemoved = !workspaceAllowsAi;

  const hasEditScope = useHasScope(VIDEO_TRIM_ACCESS);
  const hasAddLinkScope = useHasScope(VIDEO_CTA_ACCESS);
  const hasEditByTranscriptScope = useHasScope(VIDEO_EDIT_BY_TRANSCRIPT_ACCESS);
  /// useHasAIFeatureAccess includes check for AI tries
  const hasVideoOverlaysScope = useHasAIFeatureAccess(VIDEO_OVERLAYS_ACCESS);
  const hasAiTitleScope = useHasAIFeatureAccess(AI_AUTO_TITLE_ACCESS);
  const hasAiSummaryScope = useHasAIFeatureAccess(AI_AUTO_SUMMARIES_ACCESS);
  const hasAiChaptersScope = useHasAIFeatureAccess(AI_AUTO_CHAPTERING_ACCESS);
  const hasFillerWordsAndSilenceRemovalScope = useHasAIFeatureAccess(
    AI_FILLER_WORD_REMOVAL
  );

  // TODO CRX-4845: current workflows scope is under the general AI scope
  const hasWorkflowsScope = useHasAIFeatureAccess(AI_AUTO_TITLE_ACCESS);

  const hasVariablesAccess = useHasPersonalizedAudio();
  const userHasVariablesScope = useHasScope(AI_VARIABLES);

  const hasAnyAutoAppliedAiScope =
    hasAiTitleScope || hasAiSummaryScope || hasAiChaptersScope;
  const hasAnyAiScope =
    hasAnyAutoAppliedAiScope || hasFillerWordsAndSilenceRemovalScope;

  const hasAiTries = useIsTrialingAIAddOn();

  const aiStatus = selectAiStatus({
    isAiGenerating,
    aiHasError,
    transcriptInProgress,
    transcriptUnsuccessful,
    transcriptRegenerating,
  });

  const isAiZoomApplied = zooms.some(
    zoom => zoom.zoomCreatedBy === ZoomCreatedBy.Auto
  );
  const isAiTitleApplied =
    hasAiTitleScope && autoTitleGenerated && !hasUserEditedTitle;
  const isAiSummaryApplied =
    hasAiSummaryScope && autoSummaryGenerated && !hasUserEditedSummary;
  const isAiChaptersApplied =
    hasAiChaptersScope && autoChaptersGenerated && !hasUserEditedChapters;

  const noAiFeaturesWereAutoApplied =
    !isAiTitleApplied && !isAiSummaryApplied && !isAiChaptersApplied;

  // If the default setting is undefined, it is defaulted to true
  const isAutoTitleDefaultSettingEnabled = useCurrentUserSelector(
    user => user.videoSettings?.auto_title ?? true,
    false
  );
  const isAutoSummaryDefaultSettingEnabled = useCurrentUserSelector(
    user => user.videoSettings?.auto_summary ?? true,
    false
  );
  const isAutoChaptersDefaultSettingEnabled = useCurrentUserSelector(
    user => user.videoSettings?.auto_chapters ?? true,
    false
  );

  const allDefaultSettingsAreDisabled =
    !isAutoTitleDefaultSettingEnabled &&
    !isAutoSummaryDefaultSettingEnabled &&
    !isAutoChaptersDefaultSettingEnabled;

  const isAutoTitleNotAppliedAndDefaultSettingDisabled =
    !isAiTitleApplied && !isAutoTitleDefaultSettingEnabled;
  const isAutoSummaryNotAppliedAndDefaultSettingDisabled =
    !isAiSummaryApplied && !isAutoSummaryDefaultSettingEnabled;
  const isAutoChaptersNotAppliedAndDefaultSettingDisabled =
    !isAiChaptersApplied && !isAutoChaptersDefaultSettingEnabled;

  const anyDefaultSettingIsNotAppliedAndDisabled =
    isAutoTitleNotAppliedAndDefaultSettingDisabled ||
    isAutoSummaryNotAppliedAndDefaultSettingDisabled ||
    isAutoChaptersNotAppliedAndDefaultSettingDisabled;

  const isAiFeaturesButtonDisabled =
    aiStatus !== 'success' || noAiFeaturesWereAutoApplied;

  const autoAppliedTooltipText =
    aiStatus === 'loading'
      ? 'Loom AI is still generating'
      : allDefaultSettingsAreDisabled && noAiFeaturesWereAutoApplied
        ? 'Your AI features are turned off in default settings'
        : aiStatus === 'not-available' || noAiFeaturesWereAutoApplied
          ? 'Auto titles, chapters, and summary are unavailable on this video'
          : undefined;

  const editSectionTitle = hasAnyAiScope ? 'Make edits' : 'Edit and enhance';

  const shouldAllowTrimmingIfAudioVariablesVideo =
    useShouldAllowTrimmingIfAudioVariablesVideo();
  const isEditVideoButtonDisabled =
    !videoIsComplete || !shouldAllowTrimmingIfAudioVariablesVideo;

  const editVideoButtonTooltipText = isEditVideoButtonDisabled
    ? UNAVAILABLE_TOOLTIP_TEXT
    : undefined;

  const editPageButtonMainText = isVideoAutoGenerated
    ? 'Edit video clips'
    : hasVideoOverlaysScope
      ? 'Edit and enhance video'
      : 'Edit and trim video';

  const editPageButtonSubText = isVideoAutoGenerated
    ? 'Changes will generate a new video'
    : hasVideoOverlaysScope
      ? 'Trim, add clips, overlay text & more'
      : hasEditByTranscriptScope
        ? 'Edit using transcript & add clips'
        : 'Trim mistakes & add clips';

  const editPagePaywalledButtonTitle = isAiRemoved
    ? 'Edit and trim video'
    : 'Edit and trim video, add clips, links, and text overlays';

  const fwsRemovalDisabledTooltipText = transcriptInitiallyInProgress
    ? 'Transcript is generating'
    : transcriptUnsuccessful || !shouldAllowTrimmingIfAudioVariablesVideo
      ? UNAVAILABLE_TOOLTIP_TEXT
      : undefined;

  const isWorkflowsDisabled = !transcriptAvailable;
  const workflowsTooltipText = transcriptInProgress
    ? 'Transcript is generating'
    : transcriptUnsuccessful
      ? UNAVAILABLE_TOOLTIP_TEXT
      : undefined;

  const hasAiInitiallyGenerated =
    !isAiFeaturesButtonDisabled && isOwnerAfterRecording;

  const isAddingStylizedCaptionsInProgress =
    isUpdatingUserVideoSettings || isUpdatingVideoSettings;

  const [resetDraftToReadyToEdit] = useResetDraftToReadyToEditMutation({
    variables: {
      videoDraftId: videoDraftId || '',
    },
  });

  const redirectToDraftEditPage = () => {
    resetDraftToReadyToEdit().then(result => {
      const response = result.data?.resetDraftToReadyToEdit;
      if (
        response?.__typename == 'ResetDraftToReadyToEditPayload' &&
        response.success &&
        videoDraftId != null
      ) {
        window.location.href = `/generate-video/${videoDraftId}`;
      }
    });
  };

  const handleEditPageClick = () => {
    if (isVideoAutoGenerated) {
      redirectToDraftEditPage();
    } else {
      window.location.href = window.location.href.replace('/share/', '/edit/');
    }

    analytics.track(
      EDIT_AND_TRIM_VIDEO_CLICKED,
      withIdentifiers(
        EDIT_AND_TRIM_VIDEO_CLICKED,
        AnalyticsEntityId.video(videoId, 'id')
      )
    );
  };

  const workflowAnalytics = useWorkflowsAnalytics();
  const handleWorkflowsClick = (workflowType: WorkflowType) => {
    let workflowTypeSelectedIndex = 0;

    const isStepByStep =
      loomCategory !== null &&
      workflowType === 'document' &&
      loomCategory === SMART_PROMPT_CATEGORIES.PROCESS_WALKTHROUGH;

    openModal({
      modalType: WORKFLOWS_MODAL,
      options: {
        workflowTypeOnOpen: workflowType,
        hasConfluencePermissions,
        workflowHeaderFlagValue,
      },
    });

    if (isStepByStep) {
      // If smart prompt showed SOP, then how-to guide will be generated instead
      workflowTypeSelectedIndex = workflowsTypeMapper(
        SMART_PROMPT_CATEGORIES.STEP_BY_STEP
      ).tabIndex;
    } else if (
      loomCategory !== null &&
      loomCategory !== SMART_PROMPT_CATEGORIES.BUG_REPORT &&
      loomCategory !== SMART_PROMPT_CATEGORIES.OTHER
    ) {
      workflowTypeSelectedIndex = workflowsTypeMapper(loomCategory).tabIndex;
    }

    workflowAnalytics.createModalOpened(
      AiCreateModalOpenedSource.NEW_ENTRY_POINT
    );
    workflowAnalytics.workflowSelected(
      BUTTON_IDX_TO_ACTIVE_ARTIFACT_TYPE[workflowType][
        workflowTypeSelectedIndex
      ],
      workflowType,
      'share_page_right_sidebar'
    );
  };

  const handleWorkflowsDocumentClick = () => {
    handleWorkflowsClick('document');
  };

  const handleWorkflowsBugReportClick = () => {
    handleWorkflowsClick('ticket');
  };

  const handleWorkflowsMessageClick = () => {
    handleWorkflowsClick('message');
  };

  const handleGenerateDocClick = () => {
    handleWorkflowsDocumentClick();
    setEnteredWorkflowModalFromSneakpeekCTA(false);
  };

  const [updateDismissWorkflowSneakpeek] =
    useUpdateDismissWorkflowSneakpeekMutation({
      variables: {
        videoId,
        dismissWorkflowSneakpeek: true,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        result: {
          __typename: 'UpdateDismissWorkflowSneakpeekPayload',
          success: true,
        },
      },
      update: cache => {
        cache.writeQuery({
          query: GetDismissWorkflowSneakpeekStatusDocument,
          variables: { videoId },
          data: {
            result: {
              __typename: 'DismissWorkflowSneakpeekProperty',
              dismissWorkflowSneakpeek: true,
            },
          },
        });
      },
    });

  const handleDismissSneakPeek = () => {
    updateDismissWorkflowSneakpeek();
  };

  if (isAutoStatusesFetching || billingDetailsLoading || videoDataLoading) {
    return <LoadingEditTab />;
  }

  const editPageButton = (
    <>
      {hasEditScope ? (
        <Container paddingY="xsmall">
          <EditPageButton
            onClick={handleEditPageClick}
            isDisabled={isEditVideoButtonDisabled}
            tooltipText={editVideoButtonTooltipText}
            mainText={editPageButtonMainText}
            subText={editPageButtonSubText}
            noAi={isAiRemoved}
            popover={
              isVideoAutoGenerated ? undefined : <ConsolidatedEditPopover />
            }
          />
        </Container>
      ) : (
        <PaywalledEditItem
          icon={<SvgScissors />}
          title={editPagePaywalledButtonTitle}
          upgradeSourceLocation={
            RequestPlanUpgradeLocations.EDIT_AND_TRIM_LOCKED_BUTTON
          }
          popoverContent={<PaywalledEditToolsPopover />}
        />
      )}
    </>
  );

  const stylizedCaptionsButton = shouldSeeCaptionsToggle ? (
    <EditItem
      icon={<SvgCaptions />}
      title={'Add stylized captions'}
      onClick={updateVideoAndDefaultVideoSettings}
      rightOption={
        isAddingStylizedCaptionsInProgress ? (
          <Loader />
        ) : (
          <Switch
            isActive={stylizedCaptionsActive}
            isDisabled={stylizedCaptionsDisabled}
            readOnly
          />
        )
      }
      isDisabled={stylizedCaptionsDisabled}
      disabledTooltipText={stylizedCaptionsTooltipText}
    />
  ) : null;

  if (isAiRemoved) {
    return (
      <Container padding="large">
        <EditSection title={<EditSectionTitle title="Make edits" />}>
          {editPageButton}
          {hasFillerWordsAndSilenceRemovalScope ? (
            <BulkTrimButtons
              videoId={videoId}
              password={password}
              lastTrimId={lastTrimId}
              isUnavailable={
                !videoIsComplete ||
                isAiGenerating ||
                !transcriptAvailable ||
                !shouldAllowTrimmingIfAudioVariablesVideo
              }
              disabledTooltipText={fwsRemovalDisabledTooltipText}
            />
          ) : null}
          {stylizedCaptionsButton}
          <AddLinkButton
            onClick={onAddLinkClick}
            disabledTooltipText={UNAVAILABLE_TOOLTIP_TEXT}
            isTrialing={isTrialing}
            hasExistingLink={hasCta}
            hasScope={hasAddLinkScope}
          />
        </EditSection>
      </Container>
    );
  }

  const removePaywalledFeaturesToShowPaidFeatures =
    !hasAnyAiScope && hasEditScope;

  return (
    <>
      <Container paddingX="large">
        <LoomAiPanel aiStatus={aiStatus} />
        <Container position="relative">
          <Arrange autoFlow="row" gap="medium" justifyContent="stretch">
            <EditSection
              title={
                <EditSectionTitle
                  title={editSectionTitle}
                  isTrialing={isTrialing}
                  topRightOption={
                    hasAnyAutoAppliedAiScope ? (
                      <AutoAppliedPopoverButton
                        videoId={videoId}
                        isAiZoomApplied={
                          isLoomZoomToClickEnabled && isAiZoomApplied
                        }
                        isAiTitleApplied={isAiTitleApplied}
                        isAiSummaryApplied={isAiSummaryApplied}
                        isAiChaptersApplied={isAiChaptersApplied}
                        isDisabled={isAiFeaturesButtonDisabled}
                        tooltipText={autoAppliedTooltipText}
                        displayDefaultSettingsCallout={
                          anyDefaultSettingIsNotAppliedAndDisabled
                        }
                        hasAiInitiallyGenerated={hasAiInitiallyGenerated}
                      />
                    ) : null
                  }
                />
              }
              showGradientBorderAnimation={hasAiInitiallyGenerated}
            >
              {editPageButton}
              {removePaywalledFeaturesToShowPaidFeatures ? (
                <>
                  {stylizedCaptionsButton}
                  <AddLinkButton
                    onClick={onAddLinkClick}
                    disabledTooltipText={UNAVAILABLE_TOOLTIP_TEXT}
                    isTrialing={isTrialing}
                    hasExistingLink={hasCta}
                    isAutoLinkDetected={isAutoLinkDetected}
                    autoLinkTitle={autoLinkTitle}
                    hasScope={hasAddLinkScope}
                  />
                </>
              ) : (
                <>
                  {hasFillerWordsAndSilenceRemovalScope ? (
                    <BulkTrimButtons
                      videoId={videoId}
                      password={password}
                      lastTrimId={lastTrimId}
                      isUnavailable={
                        !videoIsComplete ||
                        isAiGenerating ||
                        !transcriptAvailable ||
                        !shouldAllowTrimmingIfAudioVariablesVideo
                      }
                      disabledTooltipText={fwsRemovalDisabledTooltipText}
                    />
                  ) : (
                    <PaywalledEditItem
                      icon={<SvgFillerWordRemoval />}
                      title="Remove silences & filler words"
                      upgradeSourceLocation={
                        RequestPlanUpgradeLocations.REMOVE_SILENCE_FILLER_WORDS_LOCKED_BUTTON
                      }
                      popoverContent={<FillerWordSilenceRemovalPopover />}
                    />
                  )}
                  {!hasAnyAutoAppliedAiScope ? (
                    <PaywalledEditItem
                      icon={<SvgAutoTitles />}
                      title="Auto-title, chapters, and summary"
                      upgradeSourceLocation={
                        RequestPlanUpgradeLocations.AUTO_CONTEXT_LOCKED_BUTTON
                      }
                      popoverContent={<AutoContextPopover />}
                    />
                  ) : null}
                  {stylizedCaptionsButton}
                </>
              )}
            </EditSection>
            {hasAnyAiScope ? (
              <EditSection
                title={
                  <EditSectionTitle
                    title="Take action"
                    isTrialing={isTrialing}
                  />
                }
                showGradientBorderAnimation={hasAiInitiallyGenerated}
              >
                {hasWorkflowsScope ? (
                  <Container paddingBottom="xsmall">
                    {hasAccessToSneakPeek ? (
                      <SuggestedWorkflowSneakPeek
                        isSneakPeekAvailableToGenerate={
                          isSneakPeekAvailableToGenerate
                        }
                        isTranscriptInProgress={
                          !transcriptAvailable ||
                          transcriptInProgress ||
                          transcriptRegenerating
                        }
                        category={loomCategory}
                        isDisabled={isWorkflowsDisabled}
                        tooltipText={workflowsTooltipText}
                        onDocumentClick={() => {
                          handleWorkflowsDocumentClick();
                          setEnteredWorkflowModalFromSneakpeekCTA(true);
                        }}
                        onBugReportClick={() => {
                          handleWorkflowsBugReportClick();
                          setEnteredWorkflowModalFromSneakpeekCTA(true);
                        }}
                        onMessageClick={handleWorkflowsMessageClick}
                        onCloseClick={handleDismissSneakPeek}
                        hasConfluencePermissions={hasConfluencePermissions}
                      />
                    ) : isSneakPeekDismissed ? null : (
                      <Workflows
                        isDisabled={isWorkflowsDisabled}
                        tooltipText={workflowsTooltipText}
                        onDocumentClick={() => {
                          handleWorkflowsDocumentClick();
                          setEnteredWorkflowModalFromSneakpeekCTA(false);
                        }}
                        onBugReportClick={() => {
                          handleWorkflowsBugReportClick;
                          setEnteredWorkflowModalFromSneakpeekCTA(false);
                        }}
                        onMessageClick={handleWorkflowsMessageClick}
                        hasConfluencePermissions={hasConfluencePermissions}
                      />
                    )}
                  </Container>
                ) : (
                  <PaywalledEditItem
                    icon={<Icon icon={<SvgAutoDraft />} size={2.8} />}
                    title="Use AI to generate documents from your video"
                    upgradeSourceLocation={
                      RequestPlanUpgradeLocations.WORKFLOWS_LOCKED_BUTTON
                    }
                    popoverContent={<WorkflowsPopover />}
                  />
                )}
                {/* Show Connie branding when Create in Connie button is available */}
                {showGenerateDocOrPageButton &&
                !hasConfluencePermissionsLoading ? (
                  <GenerateDocOrPageButton
                    onClick={handleGenerateDocClick}
                    title={generateWorkflowButtonTitle}
                    icon={generateWorkflowButtonIcon}
                  />
                ) : null}
                {hasVariablesAccess ? (
                  <VariablesEditItem
                    videoId={video.id}
                    unavailableTooltipText={UNAVAILABLE_TOOLTIP_TEXT}
                  />
                ) : userHasVariablesScope || hasAiTries ? null : (
                  <VariablesPaywalledEditItem />
                )}
                {!hasAddLinkScope && hasAiTries ? null : (
                  <AddLinkButton
                    onClick={onAddLinkClick}
                    disabledTooltipText={UNAVAILABLE_TOOLTIP_TEXT}
                    isTrialing={isTrialing}
                    hasExistingLink={hasCta}
                    isAutoLinkDetected={isAutoLinkDetected}
                    autoLinkTitle={autoLinkTitle}
                    hasScope={hasAddLinkScope}
                  />
                )}
              </EditSection>
            ) : null}
          </Arrange>
        </Container>
      </Container>
      <SvgAiGradientDef />
    </>
  );
};

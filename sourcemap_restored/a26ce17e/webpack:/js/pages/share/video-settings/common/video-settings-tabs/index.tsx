import {
  AUTO_CHAPTERS_TOGGLE,
  AUTO_SUMMARY_TOGGLE,
  AUTO_TITLE_TOGGLE,
  EDIT_TOGGLE_ADD_STYLIZED_CAPTIONS,
  EDIT_TOGGLE_TURN_ON_CAPTIONS,
  SHARE_VIDEO_SETTINGS_DEFAULT_TAB_CLICKED,
  SHARE_VIDEO_SETTINGS_TAB_CLICKED,
  SHARE_VIDEO_SETTINGS_UPDATED,
  USER_CHANGED_NOISE_SUPPRESSION,
} from '@js/constants/events';
import { SALESFORCE_TRACKING_LINK_CLICKED } from '@js/constants/localStorage';

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import { useConfirmationToast } from '@js/common/confirmation-toast/useConfirmationToast';
import { VIDEO_THUMBNAIL_MODAL } from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import { useThumbnailFlow } from '@js/common/thumbnail-flow';
import { useVideoPasswordContext } from '@js/common/video-password';
import { useToggleCaptions, useVideoContext } from '@js/common/video-player';
import { useUpdateVideoPlayerSourceHook } from '@js/common/video/useUpdateVideoPlayerSourceHook';
import { useDownloadDisabledForVideo } from '@js/common/workspace-settings/useDownloadDisabledForVideo';
import { ContentContainer } from '@js/components/share-video-fresh/right-panel/ContentContainer';
import { Footer } from '@js/components/share-video-fresh/right-panel/editor-tools/Footer';
import { Page } from '@js/components/share-video-fresh/right-panel/editor-tools/Page';
import { useRemoveVideoThumbnail } from '@js/components/share-video-fresh/right-panel/editor-tools/common/useRemoveVideoThumbnail';
import { useHasAIFeatureAccess } from '@js/hooks/useHasAIFeatureAccess';
import { useHasScope } from '@js/hooks/useHasScopes';
import { useGetSelectedWorkspace } from '@js/hooks/workspace';
import _isEmpty from 'lodash/isEmpty';
import { EDIT_TOOLS_LIST } from '@js/pages/share/common';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useUpdateUserVideoSettingsMutation } from '@js/utilities/UpdateUserVideoSettings.generated';
import { useUpdateVideoSettingsMutation } from '@js/utilities/UpdateVideoSettings.generated';
import * as loggerx from '@js/utilities/loggerx';
import { convertSuggestedPlaybackRateFromEnumToNumber } from '@js/utilities/playbackRate';

import {
  Arrange,
  Button,
  Select,
  Spacer,
  Switch,
  Tab,
  Tabs,
  Text,
  TextButton,
} from '@loomhq/lens';
import { SvgChevronDown } from '@loomhq/lens/icons/chevron-down';
import { SvgPlusCircle } from '@loomhq/lens/icons/plus-circle';
import { SvgTrash } from '@loomhq/lens/icons/trash';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import {
  CUSTOM_BRANDING_ACCESS,
  STYLIZED_CAPTIONS,
  VIDEO_THUMBNAIL_ACCESS,
} from '@loomhq/shared-utilities/constants/scopes';
import {
  SUGGESTED_PLAYBACK_RATES,
  SUGGESTED_PLAYBACK_RATE_NONE,
  THUMB_FULL,
} from '@loomhq/shared-utilities/constants/video';
import {
  IN_PROGRESS as TRANSCRIPTION_STATUS_IN_PROGRESS,
  READY_TO_TRANSCRIBE as TRANSCRIPTION_STATUS_READY_TO_TRANSCRIBE,
  STARTED as TRANSCRIPTION_STATUS_STARTED,
  TRIMMING as TRANSCRIPTION_STATUS_TRIMMING,
} from '@loomhq/shared-utilities/constants/videoTranscript';
import {
  WORKSPACE_PLAN_BUSINESS,
  WORKSPACE_PLAN_ENTERPRISE,
} from '@loomhq/shared-utilities/constants/workspacePlans';
import { VideoSettingsInput } from '@js/globalTypes.generated';
import * as analytics from '@js/utilities/analytics';
import {
  clearLocalStorageKey,
  getLocalStorageKey,
} from '@js/utilities/localStorage';

import { VideoSetting } from '../video-setting';
import { VideoDefaultSettingsTabs } from './VideoDefaultSettingsTabs';
import { EmailGatingSetting } from './emailGating';
import { SalesforceTrackingSettings } from './salesforceSetting';
import { useTranscriptStatus } from '@js/common/transcripts';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

const ENHANCEMENTS_TAB_TITLE = 'Enhancements';
const AUDIENCE_TAB_TITLE = 'Audience';
const INTEGRATIONS_TAB_TITLE = 'Integrations';

const TitleWrapper = styled.div`
  border-top-left-radius: var(--lns-radius-xlarge);
  margin-bottom: calc(var(--lns-space-small) + var(--lns-space-medium));
`;

const VideoSettingsWrapper = styled.div`
  overflow: auto;
  max-height: 100%;
`;

const VideoSettingsList = styled.div`
  & div + div {
    border-top: solid var(--lns-color-border) 1px;
  }
`;

const TabContentWrapper = styled.div`
  overflow: hidden;
`;

// to keep the height of an option using text button same with those
// without using text button
const TextButtonWrapper = styled.div`
  & button {
    padding: 0 var(--lns-space-small);
    height: var(--lns-lineHeight-medium);
    border-radius: var(--lns-radius-100);
  }
`;

const ButtonSetWrapper = styled.div`
  height: calc(var(--lns-space-xxlarge) + var(--lns-space-small));
  min-height: calc(var(--lns-space-xxlarge) + var(--lns-space-small));

  background-color: var(--lns-color-overlay);
  & > div {
    height: 100%;
    padding: 0 var(--lns-space-xlarge);
    & > div {
      height: 100%;
    }
  }
`;

const ButtonWrapper = styled.div`
  background-color: var(--lns-color-backgroundSecondary);
`;

const ContentWrapper = styled.div<{
  isInVideoSetting: boolean;
}>`
  ${props =>
    !props.isInVideoSetting &&
    `padding-left: var(--lns-space-medium);
   padding-right: var(--lns-space-medium);`}
`;

const formatPlaybackRate = rateAsEnum => {
  if (!rateAsEnum || rateAsEnum === SUGGESTED_PLAYBACK_RATE_NONE) {
    return 'None';
  }

  // 'x170' => '1.7x'
  return `${convertSuggestedPlaybackRateFromEnumToNumber(
    rateAsEnum
  ).toString()}x`;
};

const getSuggestedPlaybackRatesOptions = () => {
  return SUGGESTED_PLAYBACK_RATES.map(option => {
    // we display formattedRate, eg '1.2', to users
    // but save what option is, eg. 'x120', on the backend
    const formattedRate = formatPlaybackRate(option);

    return {
      value: option,
      title: <Text fontWeight="bold">{formattedRate}</Text>,
    };
  });
};

const getTranscriptSubtext = (
  willHaveTranscript,
  isTranscriptWIP,
  isInVideoSetting
) => {
  // in defaults modal
  if (!isInVideoSetting) {
    return 'Allow viewers to access the transcript';
  }

  // in video settings drawer
  if (willHaveTranscript) {
    if (isTranscriptWIP) {
      return 'Transcript processing';
    }

    return 'Allow viewers to access the transcript';
  }

  // no transcript available
  return 'Transcript unavailable for this video';
};

type VideoSettingsTabsProps = {
  videoId: string;
  options: any;
  setOptions: (options: any) => void;
  originalOptions: any;
  onOpenDefaultsModal: () => void;
  isInVideoSetting: boolean;
  onCloseVideoSettingsDrawer?: () => void;
  onCloseDefaultsModal?: () => void;
  currentSettings: any;
  updateCurrentSettings: (settings: any) => void;
};

export const SettingsTabs = ({
  videoId,
  options,
  setOptions,
  originalOptions,
  onOpenDefaultsModal,
  isInVideoSetting,
  onCloseVideoSettingsDrawer = () => {
    return;
  },
  onCloseDefaultsModal = () => {
    return;
  },
  currentSettings,
  updateCurrentSettings,
}: VideoSettingsTabsProps): JSX.Element => {
  const { openModal } = useModals();
  const { setLocalThumbnail } = useThumbnailFlow();
  const { setShowConfirmationToast } = useConfirmationToast();

  const {
    video: { thumbnails },
    setVideo,
  } = useVideoContext();

  const { captionsActive, onToggle: toggleCaptions } =
    useToggleCaptions(videoId);

  const { password } = useVideoPasswordContext();
  const { updateVideoPlayerSourceHook } = useUpdateVideoPlayerSourceHook();

  const [updateVideoSettingsMutation] = useUpdateVideoSettingsMutation();

  const emailGatingSettingRef = useRef<HTMLDivElement | null>(null);
  const salesforceTrackingSettingRef = useRef<HTMLDivElement | null>(null);

  const [shouldAnimateEmailGating, setShouldAnimateEmailGating] =
    useState(false);

  const { type: workspaceType } = useGetSelectedWorkspace();
  const isEnterprise = workspaceType === WORKSPACE_PLAN_ENTERPRISE;
  const isBusiness = workspaceType === WORKSPACE_PLAN_BUSINESS;

  const showEmailGatingSetting = isEnterprise || isBusiness;

  const salesforceTrackingLinkClicked = getLocalStorageKey(
    SALESFORCE_TRACKING_LINK_CLICKED
  );

  // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
  const hasAIAccess = useHasAIFeatureAccess();
  const { transcriptStatus, transcriptUnsuccessful } = useTranscriptStatus();
  const willHaveTranscript = !transcriptUnsuccessful;
  const transcriptIsInProgress =
    transcriptStatus &&
    [
      TRANSCRIPTION_STATUS_STARTED,
      TRANSCRIPTION_STATUS_READY_TO_TRANSCRIBE,
      TRANSCRIPTION_STATUS_IN_PROGRESS,
      TRANSCRIPTION_STATUS_TRIMMING,
    ].includes(transcriptStatus);
  const [activeTab, setActiveTab] = useState(ENHANCEMENTS_TAB_TITLE);
  const [toggleComments, setToggleComments] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

  const hasThumbnail = (thumbnails || {})[THUMB_FULL];
  const { removeVideoThumbnail } = useRemoveVideoThumbnail();

  const handleDeleteThumbnail = () => {
    removeVideoThumbnail();
    setLocalThumbnail(null);
  };

  const hasThumbnailScope = useHasScope(VIDEO_THUMBNAIL_ACCESS);

  const { areDownloadsDisabled: areDownloadsDisabledForWorkspace } =
    useDownloadDisabledForVideo(videoId);

  /*
  for the following options:
    - loom branded player: depends on if user has access to CUSTOM_BRANDING_ACCESS
    - transcript:
      - in video settings, depends on if it will have transcript;
      - in defaults modal, always show it
  */
  const isLoomBrandedPlayerActive = useHasScope(CUSTOM_BRANDING_ACCESS);
  const isTranscriptActive = isInVideoSetting ? willHaveTranscript : true;

  // when video settings drawer is open, we set the first focusable element - the
  // close button, focused
  useEffect(() => {
    if (isInVideoSetting) {
      const btn = document.getElementById('video-settings-close-btn');

      if (btn) {
        btn.focus();
      }
    }
  }, [isInVideoSetting]);

  // if comments_enabled is turned on/off, comments_email_enabled and
  // record_reply_enabled should change accordingly
  useEffect(() => {
    if (!toggleComments) {
      return;
    }

    const { comments_enabled: newValue } = options;

    // since we have a timeout of 200ms, we need to temporarily disable the save
    // button so that there's no way to click save during the timeout
    setIsSaveDisabled(true);

    const timeoutId = window.setTimeout(() => {
      setOptions({
        ...options,
        comments_email_enabled: newValue,
        record_reply_enabled: newValue,
      });

      setToggleComments(false);
      setIsSaveDisabled(false);
    }, 200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [options, setOptions, toggleComments]);

  const isTabActive = tabName => tabName === activeTab;

  const switchTab = useCallback(
    (tabName: any) => {
      setActiveTab(tabName);
      analytics.track(
        isInVideoSetting
          ? SHARE_VIDEO_SETTINGS_TAB_CLICKED
          : SHARE_VIDEO_SETTINGS_DEFAULT_TAB_CLICKED,
        {
          tab: tabName,
        }
      );
    },
    [isInVideoSetting]
  );

  useEffect(() => {
    if (salesforceTrackingLinkClicked) {
      switchTab(INTEGRATIONS_TAB_TITLE);
      salesforceTrackingSettingRef?.current &&
        salesforceTrackingSettingRef.current.scrollIntoView({
          behavior: 'instant',
          block: 'start',
        });
    }

    clearLocalStorageKey(SALESFORCE_TRACKING_LINK_CLICKED);
  }, [salesforceTrackingLinkClicked, switchTab]);

  const handleNoiseSuppressionTracking = useCallback(
    (noiseSuppressionChanged: any) => {
      if (noiseSuppressionChanged) {
        analytics.track(USER_CHANGED_NOISE_SUPPRESSION, {
          ...withIdentifiers(
            USER_CHANGED_NOISE_SUPPRESSION,
            AnalyticsEntityId.video(videoId, 'video_id')
          ),
          noise_suppression: options.noise_suppression,
        });
      }
    },
    [options.noise_suppression, videoId]
  );

  const handleSaveCurrentSettings = useCallback(
    (shouldSaveDefaults: any) => {
      const updatedOptions = {
        ...options,
        noise_cancellation_type: options.noise_suppression,
      };

      // map the options to the settings that are only for the video, no user defaults
      const newSettings: VideoSettingsInput = {
        comments_email_enabled: updatedOptions.comments_email_enabled,
        comments_enabled: updatedOptions.comments_enabled,
        download_enabled: updatedOptions.download_enabled,
        email_gate_video_type: updatedOptions.email_gate_video_type,
        loom_branded_player: updatedOptions.loom_branded_player,
        noise_cancellation_type: updatedOptions.noise_cancellation_type,
        record_reply_enabled: updatedOptions.record_reply_enabled,
        salesforce_engagement_tracking:
          updatedOptions.salesforce_engagement_tracking,
        show_analytics_to_viewer: updatedOptions.show_analytics_to_viewer,
        show_transcript_to_viewer: updatedOptions.show_transcript_to_viewer,
        stylizedCaptions: updatedOptions.stylized_captions,
        suggested_playback_rate: updatedOptions.suggested_playback_rate,
        use_emojis: updatedOptions.use_emojis,
        use_gif: updatedOptions.use_gif,
        viewerCaptionsOn: updatedOptions.viewer_captions_on,
        viewers_can_weave: updatedOptions.viewers_can_weave,
      };

      updateVideoSettingsMutation({
        variables: {
          videoId,
          settings: newSettings,
          password,
        },
        onError: err => {
          loggerx.error(
            err,
            {
              message: `Failed to update video settings`,
              videoId,
              newSettings,
              isDefault: false,
            },
            { feature: Feature.VideoSettings }
          );
          setShowConfirmationToast('Please reload and try again');
        },
        onCompleted: data => {
          if (
            data.updateVideoSettings?.__typename !==
            'UpdateVideoSettingsPayload'
          ) {
            loggerx.warning(
              `Failed to update video settings`,
              { videoId, newSettings },
              { feature: Feature.VideoSettings }
            );
            setShowConfirmationToast('Please reload and try again');
            return;
          }

          updateVideoPlayerSourceHook({ videoId });

          const stylizedCaptionsData =
            data?.updateVideoSettings?.video?.stylizedCaptions;
          const captionsViewerOnData =
            data?.updateVideoSettings?.video?.viewerCaptionsOn;

          if (
            stylizedCaptionsData !== undefined &&
            stylizedCaptionsData !== null
          ) {
            setVideo({
              stylizedCaptions: stylizedCaptionsData,
            });
          }

          if (
            captionsViewerOnData !== undefined &&
            captionsViewerOnData !== null
          ) {
            setVideo({
              viewerCaptionsOn: captionsViewerOnData,
            });
          }

          if (captionsActive !== captionsViewerOnData) {
            toggleCaptions();
          }

          analytics.track(SHARE_VIDEO_SETTINGS_UPDATED, {
            // the current (or will be old after save is clicked) specific video's settings:
            // - in default modal, it is represented by currentSettings;
            // - in video settings drawer, it is represented by originalOptions
            ...withIdentifiers(
              SHARE_VIDEO_SETTINGS_UPDATED,
              AnalyticsEntityId.video(videoId, 'video_id')
            ),
            old_state: currentSettings || originalOptions,
            new_state: newSettings,
            is_default: false,
          });

          if (!shouldSaveDefaults) {
            setShowConfirmationToast('Video settings saved');
            onCloseVideoSettingsDrawer();
          }
        },
      });
    },
    [
      options,
      updateVideoSettingsMutation,
      videoId,
      password,
      setShowConfirmationToast,
      updateVideoPlayerSourceHook,
      captionsActive,
      currentSettings,
      originalOptions,
      setVideo,
      toggleCaptions,
      onCloseVideoSettingsDrawer,
    ]
  );

  const [updateUserVideoSettings] = useUpdateUserVideoSettingsMutation();

  const handleSaveDefaultSettings = useCallback(
    (shouldSaveDefaults: any) => {
      if (!shouldSaveDefaults) {
        return;
      }

      analytics.track(AUTO_TITLE_TOGGLE, {
        isEnabled: options.auto_title,
      });

      analytics.track(AUTO_SUMMARY_TOGGLE, {
        isEnabled: options.auto_summary,
      });

      analytics.track(AUTO_CHAPTERS_TOGGLE, {
        isEnabled: options.auto_chapters,
      });

      const optionsToSave = {
        ...options,
        viewers_can_weave_default: options.viewers_can_weave,
        stylizedCaptions: options.stylized_captions,
        viewerCaptionsOn: options.viewer_captions_on,
      };

      delete optionsToSave.viewers_can_weave;
      delete optionsToSave.stylized_captions;
      delete optionsToSave.viewer_captions_on;

      updateUserVideoSettings({
        variables: {
          videoSettings: optionsToSave,
        },
        onError: err => {
          loggerx.error(
            err,
            {
              message: 'error in handleSaveDefaultSettings',
              isDefault: true,
            },
            { feature: Feature.VideoSettings }
          );

          setShowConfirmationToast('Please reload and try again');
        },
        onCompleted: data => {
          if (
            data.updateUserVideoSettings?.__typename !==
            'UpdateUserVideoSettingsPayload'
          ) {
            loggerx.error(
              new Error('Error in handleSaveDefaultSettings'),
              {
                message: 'error in handleSaveDefaultSettings',
                isDefault: true,
              },
              { feature: Feature.VideoSettings }
            );

            setShowConfirmationToast('Please reload and try again');
            return;
          }

          analytics.track(SHARE_VIDEO_SETTINGS_UPDATED, {
            ...withIdentifiers(
              SHARE_VIDEO_SETTINGS_UPDATED,
              AnalyticsEntityId.video(videoId, 'video_id')
            ),
            old_state: originalOptions,
            new_state: optionsToSave,
            is_default: true,
          });

          updateCurrentSettings(
            willHaveTranscript
              ? options
              : {
                  ...options,
                  show_transcript_to_viewer:
                    currentSettings.show_transcript_to_viewer,
                }
          );

          setShowConfirmationToast('Default video settings saved');
          onCloseDefaultsModal();
        },
      });
    },

    [
      videoId,
      currentSettings,
      onCloseDefaultsModal,
      setShowConfirmationToast,
      options,
      originalOptions,
      updateCurrentSettings,
      willHaveTranscript,
      updateUserVideoSettings,
    ]
  );

  const onSave = shouldSaveDefaults => {
    if (isSaveDisabled || _isEmpty(options)) {
      return;
    }

    const noiseSuppressionChanged =
      options.noise_suppression !== originalOptions.noise_suppression;

    // 1. handle noise suppression tracking event
    handleNoiseSuppressionTracking(noiseSuppressionChanged);

    // 2. update current video's settings
    handleSaveCurrentSettings(shouldSaveDefaults);

    // 3. update default video settings
    handleSaveDefaultSettings(shouldSaveDefaults);
  };

  const toggleProp = useCallback(
    (prop: any) => setOptions({ ...options, [prop]: !options[prop] }),
    [options, setOptions]
  );

  const toggleCommentsEmailEnabled = useCallback(() => {
    const { comments_enabled, comments_email_enabled } = options;

    if (!comments_enabled && !comments_email_enabled) {
      return;
    }

    toggleProp('comments_email_enabled');
  }, [options, toggleProp]);

  const toggleRecordReplyEnabled = useCallback(() => {
    const { comments_enabled, record_reply_enabled } = options;

    if (!comments_enabled && !record_reply_enabled) {
      return;
    }

    toggleProp('record_reply_enabled');
  }, [options, toggleProp]);

  const onOptionSelect = useCallback(
    (optionName: any, option: any) => {
      setOptions({
        ...options,
        [optionName]: option,
      });
    },
    [options, setOptions]
  );

  const ENHANCEMENTS_OPTIONS = useMemo(() => {
    return [
      !isInVideoSetting && {
        settingName: 'Auto chapters',
        subtext: 'AI generated chapters for your videos',
        key: 'auto_chapters',
        onChange: () => toggleProp('auto_chapters'),
        isActive: true,
      },
      {
        settingName: 'Background noise filter',
        subtext: 'Filter out unwanted noise',
        key: 'noise_suppression',
        onChange: () => toggleProp('noise_suppression'),
        isActive: true,
      },
      !isInVideoSetting && {
        settingName: 'Auto title',
        subtext: 'AI generated titles for your videos',
        key: 'auto_title',
        onChange: () => toggleProp('auto_title'),
        isActive: true,
      },
      !isInVideoSetting && {
        settingName: 'Auto summary',
        subtext: 'AI generated summaries for your videos',
        key: 'auto_summary',
        onChange: () => toggleProp('auto_summary'),
        isActive: true,
      },
      !isInVideoSetting && {
        settingName: 'Auto tasks',
        subtext: 'AI generated tasks for your videos',
        key: 'auto_tasks',
        onChange: () => toggleProp('auto_tasks'),
        isActive: true,
      },
      {
        settingName: 'Loom branded player',
        subtext: isLoomBrandedPlayerActive
          ? 'Prompt viewers to log in or sign-up'
          : '',
        key: 'loom_branded_player',
        onChange: () => toggleProp('loom_branded_player'),
        isActive: isLoomBrandedPlayerActive,
        useUpgradeLink: !isLoomBrandedPlayerActive,
        upgradeText: 'customize player',
      },
      {
        settingName: 'Animated thumbnail',
        subtext: 'Automatic gif thumbnail when you share',
        key: 'use_gif',
        onChange: () => toggleProp('use_gif'),
        isActive: true,
      },
    ].filter(Boolean);
  }, [isInVideoSetting, isLoomBrandedPlayerActive, toggleProp]);

  const AUDIENCE_OPTIONS = useMemo(() => {
    return [
      {
        settingName: 'Comments',
        subtext: 'Allow viewers to add comments',
        key: 'comments_enabled',
        onChange: () => {
          toggleProp('comments_enabled');
          // set this to true so that comments_email_enabled and
          // record_reply_enabled can be turned on/off accordingly
          setToggleComments(true);
        },
        isActive: true,
      },
      {
        settingName: 'Comment notification',
        subtext: options.comments_enabled
          ? 'Get an email when someone comments'
          : 'Inactive when comments are turned off',
        key: 'comments_email_enabled',
        onChange: () => toggleCommentsEmailEnabled(),
        isActive: options.comments_enabled,
      },
      {
        settingName: 'Record a reply',
        subtext: options.comments_enabled
          ? 'Allow viewers to comment with a Loom'
          : 'Inactive when comments are turned off',
        key: 'record_reply_enabled',
        onChange: () => toggleRecordReplyEnabled(),
        isActive: options.comments_enabled,
      },
      {
        settingName: 'Emoji reactions',
        subtext: 'Allow viewers to add reactions',
        key: 'use_emojis',
        onChange: () => toggleProp('use_emojis'),
        isActive: true,
      },
      // don't show the download toggle if the video is downloadable by no one
      'download_enabled' in originalOptions && {
        settingName: 'Download',
        subtext: 'Allow viewers to download your video',
        key: 'download_enabled',
        onChange: () => toggleProp('download_enabled'),
        isActive: true,
        isHidden: areDownloadsDisabledForWorkspace,
      },
      {
        settingName: 'Stitch',
        subtext: 'Allow viewers to stitch this video',
        key: 'viewers_can_weave',
        onChange: () => toggleProp('viewers_can_weave'),
        isActive: true,
      },
      {
        settingName: 'Analytics',
        subtext: 'Allow viewers to see video analytics',
        key: 'show_analytics_to_viewer',
        onChange: () => toggleProp('show_analytics_to_viewer'),
        isActive: true,
      },
      {
        settingName: 'Transcript',
        subtext: getTranscriptSubtext(
          willHaveTranscript,
          transcriptIsInProgress,
          isInVideoSetting
        ),
        key: 'show_transcript_to_viewer',
        onChange: () => toggleProp('show_transcript_to_viewer'),
        isActive: isTranscriptActive,
      },
    ];
  }, [
    options.comments_enabled,
    originalOptions,
    areDownloadsDisabledForWorkspace,
    willHaveTranscript,
    transcriptIsInProgress,
    isInVideoSetting,
    isTranscriptActive,
    toggleProp,
    toggleCommentsEmailEnabled,
    toggleRecordReplyEnabled,
  ]);

  const hasStylizedCaptionsScope = useHasScope(STYLIZED_CAPTIONS);

  const shouldSeeCaptionsToggles = Boolean(hasStylizedCaptionsScope);

  // TODO: Please refactor this to not be a nested component
  // eslint-disable-next-line react/no-unstable-nested-components
  const ButtonSet = () => {
    return isInVideoSetting ? (
      <Footer>
        <Button variant="neutral" onClick={onOpenDefaultsModal} hasFullWidth>
          Set defaults…
        </Button>
        <Button variant="primary" onClick={() => onSave(false)} hasFullWidth>
          Save
        </Button>
      </Footer>
    ) : (
      <ButtonSetWrapper>
        <ButtonWrapper>
          <Arrange columns={['1fr']}>
            <Button variant="primary" onClick={() => onSave(true)} hasFullWidth>
              Save defaults
            </Button>
          </Arrange>
        </ButtonWrapper>
      </ButtonSetWrapper>
    );
  };

  // TODO: Please refactor this to not be a nested component
  // eslint-disable-next-line react/no-unstable-nested-components
  const DefaultModalTitleComponent = () => {
    return (
      <TitleWrapper>
        <Spacer left="xlarge" right="xlarge">
          <Spacer top="xlarge" bottom="medium">
            <Text size="body-lg" fontWeight="bold">
              Default video settings
            </Text>
          </Spacer>
          <Text>Modify default settings for this video and future videos</Text>
        </Spacer>
      </TitleWrapper>
    );
  };

  // check if the thumbnail flow is on
  // if so render the thumbnail instead of the video-settings-tabs
  const { isInThumbnailFlow, startThumbnailFlow } = useThumbnailFlow();

  // end thumbnail flow
  if (isInThumbnailFlow) {
    return (
      <Page
        currentPage={EDIT_TOOLS_LIST.Thumbnail}
        onClose={onCloseVideoSettingsDrawer}
        pageTitle={'Change Thumbnail'}
      />
    );
  }

  return (
    <ContentContainer
      footer={<ButtonSet />}
      goBackToEditPage={onCloseVideoSettingsDrawer}
      backupTitleComponent={
        !isInVideoSetting ? <DefaultModalTitleComponent /> : undefined
      }
      settingsIsInEditTab={isInVideoSetting}
    >
      <ContentWrapper isInVideoSetting={isInVideoSetting}>
        <VideoSettingsWrapper>
          {!isInVideoSetting ? (
            <VideoDefaultSettingsTabs
              options={options}
              hasAIAccess={hasAIAccess}
              suggestedPlaybackOptions={getSuggestedPlaybackRatesOptions()}
              setOptions={setOptions}
              setToggleComments={setToggleComments}
              videoId={videoId}
            />
          ) : (
            <>
              <Tabs
                isPilledDesign={isInVideoSetting}
                hasFullTabs={!isInVideoSetting}
              >
                <Tab
                  isActive={isTabActive(ENHANCEMENTS_TAB_TITLE)}
                  onClick={() => switchTab(ENHANCEMENTS_TAB_TITLE)}
                >
                  {ENHANCEMENTS_TAB_TITLE}
                </Tab>
                <Tab
                  isActive={isTabActive(AUDIENCE_TAB_TITLE)}
                  onClick={() => switchTab(AUDIENCE_TAB_TITLE)}
                >
                  {AUDIENCE_TAB_TITLE}
                </Tab>
                {isEnterprise ? (
                  <Tab
                    isActive={isTabActive(INTEGRATIONS_TAB_TITLE)}
                    onClick={() => switchTab(INTEGRATIONS_TAB_TITLE)}
                  >
                    {INTEGRATIONS_TAB_TITLE}
                  </Tab>
                ) : null}
              </Tabs>

              <TabContentWrapper>
                {activeTab === ENHANCEMENTS_TAB_TITLE && (
                  <VideoSettingsList>
                    {/* Hide thumbnail option for default settings */}
                    {isInVideoSetting ? (
                      <VideoSetting
                        key="thumbnail"
                        settingName="Video thumbnail"
                        subtext="Add a custom video thumbnail for your audience"
                        useUpgradeLink={!hasThumbnailScope}
                        upgradeText="add video thumbnail"
                      >
                        {!hasThumbnailScope ? null : hasThumbnail ? (
                          <TextButton
                            icon={<SvgTrash />}
                            iconPosition="right"
                            onClick={handleDeleteThumbnail}
                          >
                            Remove
                          </TextButton>
                        ) : (
                          <TextButton
                            icon={<SvgPlusCircle />}
                            iconPosition="left"
                            size="small"
                            onClick={() => {
                              openModal({
                                modalType: VIDEO_THUMBNAIL_MODAL,
                              });
                              startThumbnailFlow();
                            }}
                          >
                            Add
                          </TextButton>
                        )}
                      </VideoSetting>
                    ) : null}
                    {ENHANCEMENTS_OPTIONS.map(o =>
                      o ? (
                        <VideoSetting
                          key={o.key}
                          settingName={o.settingName}
                          subtext={o.subtext}
                          useUpgradeLink={o.useUpgradeLink}
                          upgradeText={o.upgradeText}
                        >
                          <Switch
                            isActive={options[o.key]}
                            onChange={o.onChange}
                            isDisabled={!o.isActive}
                            ariaLabel={o.settingName}
                          />
                        </VideoSetting>
                      ) : null
                    )}
                  </VideoSettingsList>
                )}

                {activeTab === AUDIENCE_TAB_TITLE && (
                  <VideoSettingsList>
                    {shouldSeeCaptionsToggles ? (
                      <>
                        <VideoSetting
                          key="viewer_captions_on"
                          settingName="Turn on captions"
                          subtext={'Turn on closed captions for viewers'}
                        >
                          <Switch
                            isActive={options['viewer_captions_on']}
                            onChange={() => {
                              analytics.track(EDIT_TOGGLE_TURN_ON_CAPTIONS, {
                                ...withIdentifiers(
                                  EDIT_TOGGLE_TURN_ON_CAPTIONS,
                                  AnalyticsEntityId.video(videoId, 'video_id')
                                ),
                                source: 'SETTINGS',
                                enabled: !options['viewer_captions_on'],
                              });
                              return toggleProp('viewer_captions_on');
                            }}
                            isDisabled={false}
                            ariaLabel={'Turn on captions'}
                          />
                        </VideoSetting>

                        <VideoSetting
                          key="stylized_captions"
                          settingName="Add stylized captions"
                          subtext={'Apply designed styling to your captions'}
                        >
                          <Switch
                            isActive={options['stylized_captions']}
                            onChange={() => {
                              analytics.track(
                                EDIT_TOGGLE_ADD_STYLIZED_CAPTIONS,
                                {
                                  ...withIdentifiers(
                                    EDIT_TOGGLE_ADD_STYLIZED_CAPTIONS,
                                    AnalyticsEntityId.video(videoId, 'video_id')
                                  ),
                                  source: 'SETTINGS',
                                  enabled: !options['stylized_captions'],
                                }
                              );

                              return toggleProp('stylized_captions');
                            }}
                            isDisabled={false}
                            ariaLabel={'Add stylized captions'}
                          />
                        </VideoSetting>
                      </>
                    ) : null}
                    <VideoSetting
                      key="suggested_playback_rate"
                      settingName="Recommend a playback speed"
                      subtext="Suggest a viewing speed for your audience"
                    >
                      <Select
                        trigger={(triggerContent, buttonProps) => (
                          <TextButtonWrapper>
                            <TextButton
                              size="medium"
                              iconPosition="right"
                              icon={<SvgChevronDown />}
                              {...buttonProps}
                            >
                              <Text fontWeight="bold">
                                {triggerContent.title}
                              </Text>
                            </TextButton>
                          </TextButtonWrapper>
                        )}
                        selectedOptionValue={options.suggested_playback_rate}
                        menuMaxHeight={44}
                        menuMaxWidth={30}
                        menuMinWidth={25}
                        menuPosition="right"
                        options={getSuggestedPlaybackRatesOptions()}
                        onChange={option =>
                          onOptionSelect(
                            'suggested_playback_rate',
                            option.value
                          )
                        }
                      />
                    </VideoSetting>
                    {showEmailGatingSetting ? (
                      <div ref={emailGatingSettingRef}>
                        <EmailGatingSetting
                          options={options}
                          onOptionSelect={onOptionSelect}
                          shouldAnimate={shouldAnimateEmailGating}
                          setShouldAnimate={setShouldAnimateEmailGating}
                        />
                      </div>
                    ) : null}

                    {AUDIENCE_OPTIONS.filter(o => o).map(o =>
                      o && !o.isHidden ? (
                        <VideoSetting
                          key={o.key}
                          settingName={o.settingName}
                          subtext={o.subtext}
                        >
                          <Switch
                            isActive={options[o.key]}
                            onChange={o.onChange}
                            isDisabled={!o.isActive}
                            ariaLabel={o.settingName}
                          />
                        </VideoSetting>
                      ) : null
                    )}
                  </VideoSettingsList>
                )}

                {activeTab === INTEGRATIONS_TAB_TITLE && (
                  <VideoSettingsList>
                    <div ref={salesforceTrackingSettingRef}>
                      <SalesforceTrackingSettings
                        isFromDefaultSettings={false}
                        options={options}
                        toggleProp={toggleProp}
                        handleRelatedSettingsEditClick={() => {
                          // 1. Switch to Audience tab
                          switchTab(AUDIENCE_TAB_TITLE);

                          // 2. Scroll to email gating
                          emailGatingSettingRef?.current &&
                            emailGatingSettingRef.current.scrollIntoView({
                              behavior: 'instant',
                              block: 'start',
                            });

                          // 3. Highlight email gating
                          setShouldAnimateEmailGating(true);
                        }}
                      />
                    </div>
                  </VideoSettingsList>
                )}
              </TabContentWrapper>
            </>
          )}
        </VideoSettingsWrapper>
      </ContentWrapper>
    </ContentContainer>
  );
};

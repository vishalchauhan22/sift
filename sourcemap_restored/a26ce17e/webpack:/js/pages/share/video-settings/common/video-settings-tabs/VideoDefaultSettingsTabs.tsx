import {
  EDIT_TOGGLE_ADD_STYLIZED_CAPTIONS,
  EDIT_TOGGLE_TURN_ON_CAPTIONS,
  SHARE_VIDEO_SETTINGS_DEFAULT_TAB_CLICKED,
} from '@js/constants/events';

import { AI_FEEDBACK_URI, LOOM_AI_URI } from '@js/constants/routes';

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';

import { useDownloadDisabledForVideo } from '@js/common/workspace-settings/useDownloadDisabledForVideo';
import { useOnBusinessTrial } from '@js/hooks/eligibility/useOnBusinessTrial';
import { useFlagIsActivated } from '@js/hooks/featureFlag';
import { useHasScope } from '@js/hooks/useHasScopes';
import { useGetSelectedWorkspace } from '@js/hooks/workspace';
import React, { useState } from 'react';

import {
  Select,
  Switch,
  Tab,
  Text,
  TextButton,
  Tabs,
  Spacer,
  Link,
} from '@loomhq/lens';
import { SvgChevronDown } from '@loomhq/lens/icons/chevron-down';

import { EXPERIMENT_DEFAULT_SILENCE_AND_FILLER_WORD_TRIMMING } from '@loomhq/shared-utilities/constants/featureFlag';
import {
  CUSTOM_BRANDING_ACCESS,
  STYLIZED_CAPTIONS,
} from '@loomhq/shared-utilities/constants/scopes';
import {
  WORKSPACE_PLAN_BUSINESS,
  WORKSPACE_PLAN_ENTERPRISE,
} from '@loomhq/shared-utilities/constants/workspacePlans';

import * as analytics from '@js/utilities/analytics';

import { VideoSetting } from '../video-setting';
import { EmailGatingSetting } from './emailGating';
import { SalesforceTrackingSettings } from './salesforceSetting';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

const VideoSettingsList = styled.div`
  & div + div {
    border-top: solid var(--lns-color-border) 1px;
  }
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

const AUDIENCE_TAB_TITLE = 'Audience';
const ENHANCEMENTS_TAB_TITLE = 'Enhancements';
const INTEGRATIONS_TAB_TITLE = 'Integrations';
const LOOM_AI_TAB_TITLE = 'Loom AI';

export const VideoDefaultSettingsTabs = ({
  options,
  hasAIAccess,
  suggestedPlaybackOptions,
  setOptions,
  setToggleComments,
  videoId,
}: {
  options: any;
  hasAIAccess: boolean;
  suggestedPlaybackOptions: { value: string; title: JSX.Element }[];

  setOptions: (value: any) => void;
  setToggleComments: (value: boolean) => void;
  videoId: string;
}): JSX.Element => {
  const [activeTab, setActiveTab] = useState(
    hasAIAccess ? LOOM_AI_TAB_TITLE : ENHANCEMENTS_TAB_TITLE
  );

  const hasCustomBrandingScope = useHasScope(CUSTOM_BRANDING_ACCESS);

  const { type: workspaceType } = useGetSelectedWorkspace();
  const isEnterprise = workspaceType === WORKSPACE_PLAN_ENTERPRISE;
  const isNonTrialBusiness =
    !useOnBusinessTrial() && workspaceType === WORKSPACE_PLAN_BUSINESS;

  const { areDownloadsDisabled: areDownloadsDisabledForWorkspace } =
    useDownloadDisabledForVideo(videoId);
  const showEmailGatingSetting = isEnterprise || isNonTrialBusiness;
  const isAutoFillerWordTrimmingEnabled = useFlagIsActivated({
    flag: EXPERIMENT_DEFAULT_SILENCE_AND_FILLER_WORD_TRIMMING,
    activationValues: ['filler_words', 'filler_words_and_silences'],
  });

  const isAutoSilenceTrimmingEnabled = useFlagIsActivated({
    flag: EXPERIMENT_DEFAULT_SILENCE_AND_FILLER_WORD_TRIMMING,
    activationValues: ['filler_words_and_silences'],
  });

  const isTabActive = tabName => tabName === activeTab;

  const switchTab = tabName => {
    setActiveTab(tabName);
    analytics.track(SHARE_VIDEO_SETTINGS_DEFAULT_TAB_CLICKED, {
      tab: tabName,
    });
  };

  const toggleProp = prop => setOptions({ ...options, [prop]: !options[prop] });

  const toggleRecordReplyEnabled = () => {
    const { comments_enabled, record_reply_enabled } = options;

    if (!comments_enabled && !record_reply_enabled) {
      return;
    }

    toggleProp('record_reply_enabled');
  };

  const toggleCommentsEmailEnabled = () => {
    const { comments_enabled, comments_email_enabled } = options;

    if (!comments_enabled && !comments_email_enabled) {
      return;
    }

    toggleProp('comments_email_enabled');
  };

  const onOptionSelect = (optionName, option) => {
    setOptions({
      ...options,
      [optionName]: option,
    });
  };

  type Option = {
    settingName: string;
    subtext: string;
    key: string;
    onChange: () => void;
    isActive: boolean;
    isHidden?: boolean;
  };

  const AI_OPTIONS = [
    isAutoFillerWordTrimmingEnabled && {
      settingName: 'Auto filler word removal',
      subtext: 'Automatically remove filler words from your videos',
      key: 'auto_filler_word_removal',
      onChange: () => toggleProp('auto_filler_word_removal'),
      isActive: true,
    },
    isAutoSilenceTrimmingEnabled && {
      settingName: 'Auto silence removal',
      subtext: 'Automatically remove silences from your videos',
      key: 'auto_silence_removal',
      onChange: () => toggleProp('auto_silence_removal'),
      isActive: true,
    },
    {
      settingName: 'Auto title',
      subtext: 'AI generated titles for your videos',
      key: 'auto_title',
      onChange: () => toggleProp('auto_title'),
      isActive: true,
    },
    {
      settingName: 'Auto summary',
      subtext: 'AI generated summaries for your videos',
      key: 'auto_summary',
      onChange: () => toggleProp('auto_summary'),
      isActive: true,
    },
    {
      settingName: 'Auto chapters',
      subtext: 'AI generated chapters for your videos',
      key: 'auto_chapters',
      onChange: () => toggleProp('auto_chapters'),
      isActive: true,
    },
    {
      settingName: 'Auto tasks',
      subtext: 'AI generated tasks for your videos',
      key: 'auto_tasks',
      onChange: () => toggleProp('auto_tasks'),
      isActive: true,
    },
    {
      settingName: 'Auto CTA',
      subtext: 'Automatically detect the link you are sharing',
      key: 'auto_cta',
      onChange: () => toggleProp('auto_cta'),
      isActive: true,
    },
  ].filter((option): option is Option => Boolean(option));

  const ENHANCEMENTS_OPTIONS = [
    {
      settingName: 'Background noise filter',
      subtext: 'Filter out unwanted noise',
      key: 'noise_suppression',
      onChange: () => toggleProp('noise_suppression'),
      isActive: true,
    },
    {
      settingName: 'Loom branded player',
      subtext: 'Prompt viewers to log in or sign-up',
      key: 'loom_branded_player',
      onChange: () => toggleProp('loom_branded_player'),
      isActive: hasCustomBrandingScope,
      useUpgradeLink: !hasCustomBrandingScope,
      upgradeText: 'customize player',
    },
    {
      settingName: 'Animated thumbnail',
      subtext: 'Automatic gif thumbnail when you share',
      key: 'use_gif',
      onChange: () => toggleProp('use_gif'),
      isActive: true,
    },
  ];

  const AUDIENCE_OPTIONS = [
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
    // don't show the download toggle if the video is downloadable by no one similar to video settings
    'download_enabled' in options && {
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
      subtext: 'Allow viewers to access the transcript',
      key: 'show_transcript_to_viewer',
      onChange: () => toggleProp('show_transcript_to_viewer'),
      isActive: true,
    },
  ];

  const hasStylizedCaptionsScope = useHasScope(STYLIZED_CAPTIONS);

  const shouldSeeCaptionsToggles = Boolean(hasStylizedCaptionsScope);

  return (
    <>
      <Tabs hasFullTabs={true}>
        {hasAIAccess && (
          <Tab
            isActive={isTabActive(LOOM_AI_TAB_TITLE)}
            onClick={() => switchTab(LOOM_AI_TAB_TITLE)}
          >
            {LOOM_AI_TAB_TITLE}
          </Tab>
        )}

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
      <div className="overflow:hidden;">
        {activeTab === LOOM_AI_TAB_TITLE && (
          <VideoSettingsList>
            <Spacer y="medium">
              <Text>
                Modify the default Loom AI settings for this video and future
                videos. Learn more about <Link href={LOOM_AI_URI}>Loom AI</Link>{' '}
                or <Link href={AI_FEEDBACK_URI}>give feedback</Link>.
              </Text>
            </Spacer>
            {AI_OPTIONS.map(o => (
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
            ))}
          </VideoSettingsList>
        )}

        {activeTab === ENHANCEMENTS_TAB_TITLE && (
          <VideoSettingsList>
            {ENHANCEMENTS_OPTIONS.map(o => (
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
            ))}
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
                        source: 'DEFAULT-SETTINGS',
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
                      analytics.track(EDIT_TOGGLE_ADD_STYLIZED_CAPTIONS, {
                        ...withIdentifiers(
                          EDIT_TOGGLE_ADD_STYLIZED_CAPTIONS,
                          AnalyticsEntityId.video(videoId, 'video_id')
                        ),
                        source: 'DEFAULT-SETTINGS',
                        enabled: !options['stylized_captions'],
                      });
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
                      <Text fontWeight="bold">{triggerContent.title}</Text>
                    </TextButton>
                  </TextButtonWrapper>
                )}
                selectedOptionValue={options.suggested_playback_rate}
                menuMaxHeight={44}
                menuMaxWidth={30}
                menuMinWidth={25}
                menuPosition="right"
                options={suggestedPlaybackOptions}
                onChange={option =>
                  onOptionSelect('suggested_playback_rate', option.value)
                }
              />
            </VideoSetting>
            {showEmailGatingSetting ? (
              <EmailGatingSetting
                options={options}
                onOptionSelect={onOptionSelect}
              />
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
            <SalesforceTrackingSettings
              isFromDefaultSettings
              options={options}
              toggleProp={toggleProp}
            />
          </VideoSettingsList>
        )}
      </div>
    </>
  );
};

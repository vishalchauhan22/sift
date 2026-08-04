import { Feature } from '@js/common/seasonal-launch-modal/feature';
import { PlanUpgradeCta } from '@js/common/seasonal-launch-modal/featureCta';
import { VideoAsset } from '@js/common/seasonal-launch-modal/get-content/VideoAsset';
import {
  TitleSlot,
  SubtitleSlot,
  LogoText,
} from '@js/common/seasonal-launch-modal/get-content/modalSlots';
import React from 'react';

import { Button } from '@loomhq/lens';
import { SvgQuickEdit } from '@loomhq/lens/icons/quick-edit';
import { SvgVideoLibrary } from '@loomhq/lens/icons/video-library';
import { SvgWriteDocument } from '@loomhq/lens/icons/write-document';
import { SvgZapOutline } from '@loomhq/lens/icons/zap-outline';

import { SeasonContent, Variant } from '../types';

export const winter25Content: SeasonContent = {
  [Variant.WINTER_LAUNCH_25_AI_TRIAL]: {
    modal: {
      maxWidth: 147,
    },
    titleSlot: <TitleSlot>Loom AI is free on your next 5 videos</TitleSlot>,
    belowSubtitleSlot: (
      <SubtitleSlot>
        You can now use Loom AI to automatically record meetings, take notes,
        and send recaps with action items. Try it out!
      </SubtitleSlot>
    ),
    featuresSlot: [
      {
        feature: props => (
          <Feature
            {...props}
            featureId="winter-launch-25-ai-powered-meeting-notes"
            title="AI-powered meeting notes "
            description="Loom AI magically writes a meeting recap that includes a summary and action items."
            icon={<SvgWriteDocument />}
            isBeta={false}
            variant="borderless"
            newFeature
          />
        ),
        asset: (
          <VideoAsset
            variant="border"
            src="https://cdn.loom.com/assets/video/winter-launch-25-ftux-asset.mp4"
            height="400px"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="winter-launch-25-ai-meeting-recaps"
            title="Automatic meeting recap emails "
            description="Move work forward whether you attended the meeting or not with recaps sent to your inbox."
            icon={<SvgZapOutline />}
            isBeta={false}
            variant="borderless"
            newFeature
          />
        ),
        asset: (
          <VideoAsset
            variant="border"
            src="https://cdn.loom.com/assets/video/winter-launch-25-ftux-asset.mp4"
            height="400px"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="winter-launch-25-auto-titles-summaries-chapters"
            title="Auto-titles, summaries, and chapters"
            description="Entice your viewers to click play."
            icon={<SvgQuickEdit />}
            isBeta={false}
            variant="borderless"
          />
        ),
        asset: (
          <VideoAsset
            variant="border"
            src="https://cdn.loom.com/assets/video/winter-launch-25-ftux-asset.mp4"
            height="400px"
          />
        ),
      },
    ],
    upgradeCtaSlot: props => (
      <PlanUpgradeCta {...props}>Upgrade now</PlanUpgradeCta>
    ),
    myLibraryCtaSlot: props => (
      <Button {...props} type="button" variant="neutral" size="large">
        Get started
      </Button>
    ),
  },
  [Variant.WINTER_LAUNCH_25_AI_TRIAL_CALENDAR_CONNECT]: {
    modal: {
      maxWidth: 147,
    },
    titleSlot: <TitleSlot>Record your meetings with Loom AI</TitleSlot>,
    belowSubtitleSlot: (
      <SubtitleSlot>
        You&apos;ve unlocked 5 free tries of Loom AI. Connect your calendar to
        get meeting notes and action items without typing a thing.
      </SubtitleSlot>
    ),
    featuresSlot: [
      {
        feature: props => (
          <Feature
            {...props}
            featureId="winter-launch-25-ai-powered-meeting-notes"
            title="AI-powered meeting notes "
            description="Loom AI magically writes a meeting recap that includes a summary and action items."
            icon={<SvgWriteDocument />}
            isBeta={false}
            variant="borderless"
            newFeature
          />
        ),
        asset: (
          <VideoAsset
            variant="border"
            src="https://cdn.loom.com/assets/video/winter-launch-25-ftux-asset.mp4"
            height="400px"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="winter-launch-25-ai-meeting-recaps"
            title="Automatic meeting recap emails "
            description="Move work forward whether you attended the meeting or not with recaps sent to your inbox."
            icon={<SvgZapOutline />}
            isBeta={false}
            variant="borderless"
            newFeature
          />
        ),
        asset: (
          <VideoAsset
            variant="border"
            src="https://cdn.loom.com/assets/video/winter-launch-25-ftux-asset.mp4"
            height="400px"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="winter-launch-25-auto-titles-summaries-chapters"
            title="Auto-titles, summaries, and chapters"
            description="Entice your viewers to click play."
            icon={<SvgQuickEdit />}
            isBeta={false}
            variant="borderless"
          />
        ),
        asset: (
          <VideoAsset
            variant="border"
            src="https://cdn.loom.com/assets/video/winter-launch-25-ftux-asset.mp4"
            height="400px"
          />
        ),
      },
    ],
    upgradeCtaSlot: props => (
      <PlanUpgradeCta {...props}>Upgrade now</PlanUpgradeCta>
    ),
    connectCalendarCtaSlot: props => (
      <Button {...props} type="button" variant="neutral" size="large">
        Get started
      </Button>
    ),
  },
  [Variant.WINTER_LAUNCH_25_PROMO]: {
    modal: {
      maxWidth: 147,
    },
    titleSlot: (
      <TitleSlot>
        Record your meetings with Loom <LogoText>AI</LogoText>
      </TitleSlot>
    ),
    belowSubtitleSlot: (
      <SubtitleSlot>
        Connect your calendar to get meeting notes and action items without
        typing a thing.
      </SubtitleSlot>
    ),
    featuresSlot: [
      {
        feature: props => (
          <Feature
            {...props}
            featureId="winter-launch-25-ai-auto-record"
            title="AI-powered meeting notes "
            description="Focus on the conversation, not taking notes."
            icon={<SvgWriteDocument />}
            isBeta={false}
            variant="borderless"
          />
        ),
        asset: (
          <VideoAsset
            variant="border"
            src="https://cdn.loom.com/assets/video/winter-launch-25-ftux-asset.mp4"
            height="400px"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="winter-launch-25-ai-meeting-recaps"
            title="Automatic meeting recap emails "
            description="Easily keep everyone in the loop."
            icon={<SvgZapOutline />}
            isBeta={false}
            variant="borderless"
          />
        ),
        asset: (
          <VideoAsset
            variant="border"
            src="https://cdn.loom.com/assets/video/winter-launch-25-ftux-asset.mp4"
            height="400px"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="winter-launch-25-video-library"
            title="One home for video"
            description="Meetings are searchable alongside your Loom video messages."
            icon={<SvgVideoLibrary />}
            isBeta={false}
            variant="borderless"
          />
        ),
        asset: (
          <VideoAsset
            variant="border"
            src="https://cdn.loom.com/assets/video/winter-launch-25-ftux-asset.mp4"
            height="400px"
          />
        ),
      },
    ],
    connectCalendarCtaSlot: props => (
      <Button
        {...props}
        type="button"
        variant="primary"
        size="large"
        style={{ minWidth: '300px' }}
      >
        Get Started
      </Button>
    ),
  },
};

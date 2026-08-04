import { Feature } from '@js/common/seasonal-launch-modal/feature';
import { PlanUpgradeCta } from '@js/common/seasonal-launch-modal/featureCta';
import { ImageAsset } from '@js/common/seasonal-launch-modal/get-content/ImageAsset';
import { VideoAsset } from '@js/common/seasonal-launch-modal/get-content/VideoAsset';
import {
  LogoText,
  SubtitleSlot,
  TitleSlot,
} from '@js/common/seasonal-launch-modal/get-content/modalSlots';

import React from 'react';

import { Arrange, Button } from '@loomhq/lens';
import { SvgAutoDraft } from '@loomhq/lens/icons/auto-draft';
import { SvgQuickEdit } from '@loomhq/lens/icons/quick-edit';
import { SvgSilenceRemoval } from '@loomhq/lens/icons/silence-removal';

import { SvgVariables } from '@loomhq/lens/icons/variables';

import { SeasonContent, Variant } from '../types';

export const fall24Content: SeasonContent = {
  [Variant.FALL_24_New_User]: {
    titleSlot: (
      <Arrange gap="2px">
        <TitleSlot>
          14 days of better communication with <LogoText>AI</LogoText>
        </TitleSlot>
      </Arrange>
    ),
    belowSubtitleSlot: (
      <SubtitleSlot>
        Communicate your best with videos auto-enhanced by AI and intuitive
        editing
      </SubtitleSlot>
    ),
    featuresSlot: [
      {
        feature: props => (
          <Feature
            {...props}
            featureId="fall-24-auto-context"
            title="Auto-Titles, Summaries, and Chapters"
            description="Entice your viewers to click play"
            icon={<SvgQuickEdit />}
            isBeta={false}
          />
        ),
        asset: (
          <VideoAsset src="https://cdn.loom.com/assets/img/seasonal-launch/fall-24-auto-context.webm" />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="fall-24-quick-edit"
            title="Easy and Intuitive Editor"
            description="Trim and transcript editing in one place"
            icon={<SvgSilenceRemoval />}
            isBeta={false}
          />
        ),
        asset: (
          <VideoAsset src="https://cdn.loom.com/assets/img/seasonal-launch/fall-24-quick-edit.webm" />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="fall-24-write-doc"
            title="Auto-Draft Docs, Bug Reports, and Messages"
            description="Turn your video into a doc to work faster"
            icon={<SvgAutoDraft />}
            isBeta={false}
          />
        ),
        asset: (
          <VideoAsset src="https://cdn.loom.com/assets/img/seasonal-launch/fall-24-write-doc.webm" />
        ),
      },
    ],
    upgradeCtaSlot: props => <PlanUpgradeCta {...props} />,
    featureTourCtaSlot: props => (
      <Button {...props} type="button" variant="neutral" size="large" />
    ),
  },
  [Variant.FALL_24_EXISTING_WORKSPACE_AI_TRIAL]: {
    titleSlot: (
      <Arrange gap="2px">
        <TitleSlot>
          Your chance to experience the best of <LogoText>Loom</LogoText>
        </TitleSlot>
      </Arrange>
    ),
    belowSubtitleSlot: (
      <SubtitleSlot>
        Your 14-day trial of better editing and AI starts now
      </SubtitleSlot>
    ),
    featuresSlot: [
      {
        feature: props => (
          <Feature
            {...props}
            featureId="fall-24-auto-context"
            title="Auto-Titles, Summaries, and Chapters"
            description="Entice your viewers to click play"
            icon={<SvgQuickEdit />}
            isBeta={false}
          />
        ),
        asset: (
          <VideoAsset src="https://cdn.loom.com/assets/img/seasonal-launch/fall-24-auto-context.webm" />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="fall-24-quick-edit"
            title="Easy and Intuitive Editor"
            description="Trim and transcript editing in one place"
            icon={<SvgSilenceRemoval />}
            isBeta={false}
          />
        ),
        asset: (
          <VideoAsset src="https://cdn.loom.com/assets/img/seasonal-launch/fall-24-quick-edit.webm" />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="fall-24-write-doc"
            title="Auto-Draft Docs, Bug Reports, and Messages"
            description="Turn your video into a doc to work faster"
            icon={<SvgAutoDraft />}
            isBeta={false}
          />
        ),
        asset: (
          <VideoAsset src="https://cdn.loom.com/assets/img/seasonal-launch/fall-24-write-doc.webm" />
        ),
      },
    ],
    upgradeCtaSlot: props => <PlanUpgradeCta {...props} />,
    featureTourCtaSlot: props => (
      <Button {...props} type="button" variant="neutral" size="large" />
    ),
  },
  [Variant.FALL_24_HARD_UPSELL]: {
    titleSlot: (
      <Arrange gap="2px">
        <TitleSlot>
          Get the best of Loom with Loom <LogoText>AI</LogoText>
        </TitleSlot>
      </Arrange>
    ),
    belowSubtitleSlot: (
      <SubtitleSlot>
        Communicate your best with videos auto-enhanced by AI and intuitive
        editing
      </SubtitleSlot>
    ),
    featuresSlot: [
      {
        feature: props => (
          <Feature
            {...props}
            featureId="fall-24-auto-context"
            title="Auto-Titles, Summaries, and Chapters"
            description="Entice your viewers to click play"
            icon={<SvgQuickEdit />}
            isBeta={false}
          />
        ),
        asset: (
          <VideoAsset src="https://cdn.loom.com/assets/img/seasonal-launch/fall-24-auto-context.webm" />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="fall-24-quick-edit"
            title="Easy and Intuitive Editor"
            description="Trim and transcript editing in one place"
            icon={<SvgSilenceRemoval />}
            isBeta={false}
          />
        ),
        asset: (
          <VideoAsset src="https://cdn.loom.com/assets/img/seasonal-launch/fall-24-quick-edit.webm" />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="fall-24-write-doc"
            title="Auto-Draft Docs, Bug Reports, and Messages"
            description="Turn your video into a doc to work faster"
            icon={<SvgAutoDraft />}
            isBeta={false}
          />
        ),
        asset: (
          <VideoAsset src="https://cdn.loom.com/assets/img/seasonal-launch/fall-24-write-doc.webm" />
        ),
      },
    ],
    upgradeCtaSlot: props => <PlanUpgradeCta {...props} />,
    featureTourCtaSlot: props => (
      <Button {...props} type="button" variant="neutral" size="large" />
    ),
  },
  [Variant.FALL_24_BIZ_ENT_PREV_AI]: {
    titleSlot: (
      <Arrange gap="2px">
        <TitleSlot>
          What&apos;s new with Loom <LogoText>AI</LogoText>
        </TitleSlot>
      </Arrange>
    ),
    belowSubtitleSlot: (
      <SubtitleSlot>
        Say goodbye to re-recording with easy editing and customization
      </SubtitleSlot>
    ),
    featuresSlot: [
      {
        feature: props => (
          <Feature
            {...props}
            featureId="fall-24-trim-transcript-editing"
            title="A New Home for Trim and Transcript Editing"
            icon={<SvgSilenceRemoval />}
            description="Our most intuitive, most powerful editor yet"
            isBeta={false}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/fall-24-trim-transcript-editing.jpg"
            alt="A New Home for Trim and Transcript Editing"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="fall-24-workflows"
            title="AI Workflows in 50+ Languages"
            icon={<SvgAutoDraft />}
            description="Auto-draft docs or bug reports in your preferred language"
            isBeta={false}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/fall-24-workflows.jpg"
            alt="AI Workflows in 50+ Languages"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="fall-24-variables"
            title="Personalize with Audio Variables"
            icon={<SvgVariables />}
            description="AI-generated names in your voice, so you can personalize your video without re-recording"
            isBeta={true}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/fall-24-variables.jpg"
            alt="Personalize with Audio Variables"
          />
        ),
      },
    ],
    featureTourCtaSlot: props => (
      <Button {...props} type="button" variant="primary" size="large" />
    ),
  },
};

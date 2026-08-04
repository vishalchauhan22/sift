import { Feature } from '@js/common/seasonal-launch-modal/feature';
import { PlanUpgradeCta } from '@js/common/seasonal-launch-modal/featureCta';
import { ImageAsset } from '@js/common/seasonal-launch-modal/get-content/ImageAsset';
import {
  TitleSlot,
  CenteredSubtitleSlot,
} from '@js/common/seasonal-launch-modal/get-content/modalSlots';
import React from 'react';

import { Button } from '@loomhq/lens';

import { SvgFillerWordRemoval } from '@loomhq/lens/icons/filler-word-removal';
import { SvgOverlays } from '@loomhq/lens/icons/overlays';
import { SvgTranscript } from '@loomhq/lens/icons/transcript';

import { SeasonContent, Variant } from '../types';
import { SvgImage1 } from '@loomhq/lens/icons/image1';

export const spring25Content: SeasonContent = {
  [Variant.SPRING_LAUNCH_25_EXISTING_FREE_TRIAL]: {
    modal: {
      maxWidth: 110,
    },
    titleSlot: <TitleSlot>Fast, simple editing to boost engagement</TitleSlot>,
    belowSubtitleSlot: (
      <CenteredSubtitleSlot>
        From quick fixes to complete transformations—premium editing
        capabilities are unlocked on your next 5 videos
      </CenteredSubtitleSlot>
    ),
    featuresSlot: [
      {
        feature: props => (
          <Feature
            {...props}
            featureId="spring-launch-25-overlays"
            title="Highlight content with overlays"
            description="Engage your audience with eye-catching shapes, arrows, and text"
            icon={<SvgOverlays />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/spring-25-overlays.jpg"
            alt="Highlight content with overlays"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="spring-launch-25-auto-shorten"
            title="Remove rambles and repetition"
            description="Automatic speech cleanup helps you get straight to the point"
            icon={<SvgFillerWordRemoval />}
            isBeta={true}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/spring-25-auto-shorten.jpg"
            alt="Remove rambles and repetition"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="spring-launch-25-ebt"
            title="Easily edit your video using the transcript"
            description="Highlight & delete sections of your transcript and see your video update in real-time"
            icon={<SvgTranscript />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/spring-25-ebt.jpg"
            alt="Easily edit your video using the transcript"
          />
        ),
      },
    ],
    upgradeCtaSlot: props => (
      <PlanUpgradeCta {...props}>Upgrade</PlanUpgradeCta>
    ),
    featureTourCtaSlot: props => (
      <Button {...props} type="button" variant="neutral" size="large" />
    ),
  },
  [Variant.SPRING_LAUNCH_25_EXISTING_BUSINESS_TRIAL]: {
    modal: {
      maxWidth: 110,
    },
    titleSlot: (
      <TitleSlot>Loom Business + AI is free on your next 5 videos</TitleSlot>
    ),
    belowSubtitleSlot: (
      <CenteredSubtitleSlot>
        From quick fixes to complete transformations—premium editing
        capabilities are unlocked on your next 5 videos
      </CenteredSubtitleSlot>
    ),
    featuresSlot: [
      {
        feature: props => (
          <Feature
            {...props}
            featureId="spring-launch-25-overlays"
            title="Highlight content with overlays"
            description="Engage your audience with eye-catching shapes, arrows, and text"
            icon={<SvgOverlays />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/spring-25-overlays.jpg"
            alt="Highlight content with overlays"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="spring-launch-25-auto-shorten"
            title="Remove rambles and repetition"
            description="Automatic speech cleanup helps you get straight to the point"
            icon={<SvgFillerWordRemoval />}
            isBeta={true}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/spring-25-auto-shorten.jpg"
            alt="Remove rambles and repetition"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="spring-launch-25-ebt"
            title="Easily edit your video using the transcript"
            description="Highlight & delete sections of your transcript and see your video update in real-time"
            icon={<SvgTranscript />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/spring-25-ebt.jpg"
            alt="Easily edit your video using the transcript"
          />
        ),
      },
    ],
    upgradeCtaSlot: props => (
      <PlanUpgradeCta {...props}>Upgrade</PlanUpgradeCta>
    ),
    featureTourCtaSlot: props => (
      <Button {...props} type="button" variant="neutral" size="large" />
    ),
  },
  [Variant.SPRING_LAUNCH_25_NO_TRIAL]: {
    modal: {
      maxWidth: 110,
    },
    titleSlot: <TitleSlot>Fast, simple editing to boost engagement</TitleSlot>,
    belowSubtitleSlot: (
      <CenteredSubtitleSlot>
        Say goodbye to re-recording with easy editing and customization
      </CenteredSubtitleSlot>
    ),
    featuresSlot: [
      {
        feature: props => (
          <Feature
            {...props}
            featureId="spring-launch-25-overlays"
            title="Highlight content with overlays"
            description="Engage your audience with eye-catching shapes, arrows, and text"
            icon={<SvgOverlays />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/spring-25-overlays.jpg"
            alt="Highlight content with overlays"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="spring-launch-25-auto-shorten"
            title="Remove rambles and repetition"
            description="Automatic speech cleanup helps you get straight to the point"
            icon={<SvgFillerWordRemoval />}
            isBeta={true}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/spring-25-auto-shorten.jpg"
            alt="Remove rambles and repetition"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="spring-launch-25-ebt"
            title="Easily edit your video using the transcript"
            description="Highlight & delete sections of your transcript and see your video update in real-time"
            icon={<SvgTranscript />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/spring-25-ebt.jpg"
            alt="Easily edit your video using the transcript"
          />
        ),
      },
    ],
    upgradeCtaSlot: props => (
      <PlanUpgradeCta {...props}>Upgrade</PlanUpgradeCta>
    ),
    featureTourCtaSlot: props => (
      <Button {...props} type="button" variant="neutral" size="large" />
    ),
  },
  [Variant.SPRING_LAUNCH_25_BUSINESS_AI_14_DAY_TRIAL]: {
    modal: {
      maxWidth: 110,
    },
    titleSlot: (
      <TitleSlot>14 days of fast editing to boost engagement</TitleSlot>
    ),
    belowSubtitleSlot: (
      <CenteredSubtitleSlot>
        Say goodbye to re-recording with easy editing and customization
      </CenteredSubtitleSlot>
    ),
    featuresSlot: [
      {
        feature: props => (
          <Feature
            {...props}
            featureId="spring-launch-25-overlays"
            title="Highlight content with overlays"
            description="Engage your audience with eye-catching shapes, arrows, and text"
            icon={<SvgOverlays />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/spring-25-overlays.jpg"
            alt="Highlight content with overlays"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="spring-launch-25-auto-shorten"
            title="Remove rambles and repetition"
            description="Automatic speech cleanup helps you get straight to the point"
            icon={<SvgFillerWordRemoval />}
            isBeta={true}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/spring-25-auto-shorten.jpg"
            alt="Remove rambles and repetition"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="spring-launch-25-ebt"
            title="Easily edit your video using the transcript"
            description="Highlight & delete sections of your transcript and see your video update in real-time"
            icon={<SvgTranscript />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/spring-25-ebt.jpg"
            alt="Easily edit your video using the transcript"
          />
        ),
      },
    ],
    upgradeCtaSlot: props => (
      <PlanUpgradeCta {...props}>Upgrade</PlanUpgradeCta>
    ),
    featureTourCtaSlot: props => (
      <Button {...props} type="button" variant="neutral" size="large" />
    ),
  },
  [Variant.SPRING_LAUNCH_25_BUSINESS_AI]: {
    modal: {
      maxWidth: 110,
    },
    titleSlot: <TitleSlot>What’s new with Loom editing</TitleSlot>,
    belowSubtitleSlot: (
      <CenteredSubtitleSlot>
        Say goodbye to re-recording with easy editing and customization
      </CenteredSubtitleSlot>
    ),
    featuresSlot: [
      {
        feature: props => (
          <Feature
            {...props}
            featureId="spring-launch-25-overlays"
            title="Highlight content with overlays"
            description="Engage your audience with eye-catching shapes, arrows, and text"
            icon={<SvgOverlays />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/spring-25-overlays.jpg"
            alt="Highlight content with overlays"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="spring-launch-25-auto-shorten"
            title="Remove rambles and repetition"
            description="Automatic speech cleanup helps you get straight to the point"
            icon={<SvgFillerWordRemoval />}
            isBeta={true}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/spring-25-auto-shorten.jpg"
            alt="Remove rambles and repetition"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="spring-launch-25-background"
            title="Add polish with backgrounds"
            description="Make your video pop with beautiful backgrounds"
            icon={<SvgImage1 />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/spring-25-background.jpg"
            alt="Add polish with backgrounds"
          />
        ),
      },
    ],
    featureTourCtaSlot: props => (
      <Button {...props} type="button" variant="primary" size="large" />
    ),
  },
  [Variant.SPRING_LAUNCH_25_ENTERPRISE]: {
    modal: {
      maxWidth: 110,
    },
    titleSlot: <TitleSlot>What’s new with Loom editing</TitleSlot>,
    belowSubtitleSlot: (
      <CenteredSubtitleSlot>
        Say goodbye to re-recording with easy editing and customization
      </CenteredSubtitleSlot>
    ),
    featuresSlot: [
      {
        feature: props => (
          <Feature
            {...props}
            featureId="spring-launch-25-overlays"
            title="Highlight content with overlays"
            description="Engage your audience with eye-catching shapes, arrows, and text"
            icon={<SvgOverlays />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/spring-25-overlays.jpg"
            alt="Highlight content with overlays"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="spring-launch-25-auto-shorten"
            title="Remove rambles and repetition"
            description="Automatic speech cleanup helps you get straight to the point"
            icon={<SvgFillerWordRemoval />}
            isBeta={true}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/spring-25-auto-shorten.jpg"
            alt="Remove rambles and repetition"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="spring-launch-25-background"
            title="Add polish with backgrounds"
            description="Make your video pop with beautiful backgrounds"
            icon={<SvgImage1 />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/spring-25-background.jpg"
            alt="Add polish with backgrounds"
          />
        ),
      },
    ],
    featureTourCtaSlot: props => (
      <Button {...props} type="button" variant="primary" size="large" />
    ),
  },
  [Variant.SPRING_LAUNCH_25_ATLASSIAN]: {
    modal: {
      maxWidth: 110,
    },
    titleSlot: <TitleSlot>Fast, simple editing to boost engagement</TitleSlot>,
    belowSubtitleSlot: (
      <CenteredSubtitleSlot>
        From quick fixes to complete transformations—premium editing
        capabilities are unlocked on your next 5 videos
      </CenteredSubtitleSlot>
    ),
    featuresSlot: [
      {
        feature: props => (
          <Feature
            {...props}
            featureId="spring-launch-25-overlays"
            title="Highlight content with overlays"
            description="Engage your audience with eye-catching shapes, arrows, and text"
            icon={<SvgOverlays />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/spring-25-overlays.jpg"
            alt="Highlight content with overlays"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="spring-launch-25-auto-shorten"
            title="Remove rambles and repetition"
            description="Automatic speech cleanup helps you get straight to the point"
            icon={<SvgFillerWordRemoval />}
            isBeta={true}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/spring-25-auto-shorten.jpg"
            alt="Remove rambles and repetition"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="spring-launch-25-ebt"
            title="Easily edit your video using the transcript"
            description="Highlight & delete sections of your transcript and see your video update in real-time"
            icon={<SvgTranscript />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/spring-25-ebt.jpg"
            alt="Easily edit your video using the transcript"
          />
        ),
      },
    ],
    upgradeCtaSlot: props => (
      <PlanUpgradeCta {...props}>Upgrade</PlanUpgradeCta>
    ),
    featureTourCtaSlot: props => (
      <Button {...props} type="button" variant="neutral" size="large" />
    ),
  },
};

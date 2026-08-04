import React from 'react';

import { Arrange, Button } from '@loomhq/lens';
import { SvgAutoDraft } from '@loomhq/lens/icons/auto-draft';
import { SvgSilenceRemoval } from '@loomhq/lens/icons/silence-removal';
import { SvgVariables } from '@loomhq/lens/icons/variables';

import { Variant } from '../common/types';
import { Feature } from '../feature';
import { ImageAsset } from './ImageAsset';

import { LogoText, SubtitleSlot, TitleSlot } from './modalSlots';

import { fall24Content } from '../common/seasonal-content/fall24';
import { spring25Content } from '../common/seasonal-content/spring25';
import { winter25Content } from '../common/seasonal-content/winter25';
import { summer25Content } from '../common/seasonal-content/summer25';

import type { SeasonalModalSlots, SeasonMap } from '../common/types';

interface ContentArgs {
  variant: Variant;
  hasAiAddOn: boolean;
}

const seasonalContent: SeasonMap = {
  fall: fall24Content,
  winter: winter25Content,
  spring: spring25Content,
  summer: summer25Content,
};

const getSeasonFromVariant = (
  variant: Variant
): keyof SeasonMap | undefined => {
  if (variant.startsWith('fall')) {
    return 'fall';
  }
  if (variant.startsWith('winter')) {
    return 'winter';
  }
  if (variant.startsWith('spring')) {
    return 'spring';
  }
  if (variant.startsWith('summer')) {
    return 'summer';
  }
  return undefined;
};

export const getVariantContentSlots = (
  args: ContentArgs
): SeasonalModalSlots => {
  const { variant } = args;
  const season = getSeasonFromVariant(variant);
  if (season) {
    const seasonContent = seasonalContent[season][variant];
    if (seasonContent) {
      return seasonContent;
    }
  }

  return {
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
  };
};

import React from 'react';

import { Button } from '@loomhq/lens';

import { Feature } from '../feature';
import { PlanUpgradeCta } from '../featureCta';

export enum Variant {
  FALL_24_New_User = 'fall-24-new-user',
  FALL_24_EXISTING_WORKSPACE_AI_TRIAL = 'fall-24-existing-workspace-ai-trial',
  FALL_24_BIZ_ENT_PREV_AI = 'fall-24-biz-ent-prev-ai',
  FALL_24_HARD_UPSELL = 'fall-24-hard-upsell',
  Disabled = 'disabled',

  WINTER_LAUNCH_25_CONTROL = 'winter-launch-25-control',
  WINTER_LAUNCH_25_AI_TRIAL = 'winter-launch-25-ai-trial',
  WINTER_LAUNCH_25_AI_TRIAL_CALENDAR_CONNECT = 'winter-launch-25-ai-trial-calendar-connect',
  WINTER_LAUNCH_25_PROMO = 'winter-launch-25-promo',

  SPRING_LAUNCH_25_CONTROL = 'spring-launch-25-control',
  SPRING_LAUNCH_25_EXISTING_FREE_TRIAL = 'spring-launch-25-existing-free-trial',
  SPRING_LAUNCH_25_EXISTING_BUSINESS_TRIAL = 'spring-launch-25-existing-business-trial',
  SPRING_LAUNCH_25_NO_TRIAL = 'spring-launch-25-no-trial',
  SPRING_LAUNCH_25_BUSINESS_AI_14_DAY_TRIAL = 'spring-launch-25-business-ai-14-day-trial',
  SPRING_LAUNCH_25_BUSINESS_AI = 'spring-launch-25-business-ai',
  SPRING_LAUNCH_25_ENTERPRISE = 'spring-launch-25-enterprise',
  SPRING_LAUNCH_25_ATLASSIAN = 'spring-launch-25-atlassian',

  SUMMER_LAUNCH_25_BUSINESS_ATLASSIAN = 'summer-launch-25-business-atlassian',
  SUMMER_LAUNCH_25_BUSINESS = 'summer-launch-25-business',
  SUMMER_LAUNCH_25_BUSINESS_AI_ENTERPRISE = 'summer-launch-25-business-ai-enterprise',
  SUMMER_LAUNCH_25_BUSINESS_AI_ENTERPRISE_ATLASSIAN = 'summer-launch-25-business-ai-enterprise-atlassian',
  SUMMER_LAUNCH_25_STARTER_FREE = 'summer-launch-25-starter-free',
}
export const FtuxEnabledVariants = [
  Variant.FALL_24_New_User,
  Variant.FALL_24_EXISTING_WORKSPACE_AI_TRIAL,
  Variant.FALL_24_BIZ_ENT_PREV_AI,
  Variant.FALL_24_HARD_UPSELL,
  Variant.WINTER_LAUNCH_25_AI_TRIAL,
  Variant.WINTER_LAUNCH_25_AI_TRIAL_CALENDAR_CONNECT,
  Variant.WINTER_LAUNCH_25_PROMO,
  Variant.SPRING_LAUNCH_25_CONTROL,
  Variant.SPRING_LAUNCH_25_EXISTING_FREE_TRIAL,
  Variant.SPRING_LAUNCH_25_EXISTING_BUSINESS_TRIAL,
  Variant.SPRING_LAUNCH_25_NO_TRIAL,
  Variant.SPRING_LAUNCH_25_BUSINESS_AI_14_DAY_TRIAL,
  Variant.SPRING_LAUNCH_25_BUSINESS_AI,
  Variant.SPRING_LAUNCH_25_ENTERPRISE,
  Variant.SPRING_LAUNCH_25_ATLASSIAN,
  Variant.SUMMER_LAUNCH_25_BUSINESS_ATLASSIAN,
  Variant.SUMMER_LAUNCH_25_BUSINESS,
  Variant.SUMMER_LAUNCH_25_BUSINESS_AI_ENTERPRISE,
  Variant.SUMMER_LAUNCH_25_BUSINESS_AI_ENTERPRISE_ATLASSIAN,
  Variant.SUMMER_LAUNCH_25_STARTER_FREE,
];

export interface EventProps {
  ai_addOn: boolean;
  role: string;
  persona: string;
  workspace_type: string;
  tour_is_enabled: boolean;
  variant: Variant;
}

interface FeatureSlotItem {
  feature: (
    props: Omit<
      React.ComponentProps<typeof Feature>,
      'title' | 'description' | 'icon' | 'featureId' | 'isBeta'
    >
  ) => React.ReactNode;
  asset: React.ReactNode;
}

type GenericOnClick = () => void;

export type SeasonalModalSlots = Partial<{
  modal: {
    maxWidth: number;
  };
  aboveSubtitleSlot: React.ReactNode;
  titleSlot: React.ReactNode;
  belowSubtitleSlot: React.ReactNode;
  featuresSlot: FeatureSlotItem[];
  featuresSlotWidth: string;
  featuresSlotHeight: string;
  upgradeCtaSlot: (
    props: React.ComponentProps<typeof PlanUpgradeCta>
  ) => React.ReactNode;
  featureTourCtaSlot: (
    props: React.ComponentProps<typeof Button>
  ) => React.ReactNode;
  connectCalendarCtaSlot: (
    props: React.ComponentProps<typeof Button>
  ) => React.ReactNode;
  myLibraryCtaSlot: (
    props: React.ComponentProps<typeof Button>
  ) => React.ReactNode;
  closeCtaSlot: (props: React.ComponentProps<typeof Button>) => React.ReactNode;
  footerSlot: (props: { onClick: GenericOnClick }) => React.ReactNode;
}>;

export enum LaunchType {
  WINTER = 'WINTER',
  SPRING = 'SPRING',
  SUMMER = 'SUMMER',
}

export type ResponsiveGridSections =
  | { [key: string]: string | (string | number)[] }
  | (string | number)[];

export type SeasonContent = {
  [key in Variant]?: SeasonalModalSlots;
};

export type SeasonMap = {
  fall: SeasonContent;
  winter: SeasonContent;
  spring: SeasonContent;
  summer: SeasonContent;
};

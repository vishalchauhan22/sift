import {
  SEASONAL_LAUNCH_FTUX_MODAL_DISMISSED,
  SEASONAL_LAUNCH_FTUX_MODAL_NEXT_CLICKED,
} from '@js/constants/events';

import { useCurrentUserSelector } from '@js/common/current-user';

import { useVideoContext } from '@js/common/video-player';
import { useFeatureFlagValue, useFlagIsActivated } from '@js/hooks/featureFlag';
import { useOnDismissFtux } from '@js/hooks/ftux';

import { useMatchLargeTabletOrDesktop } from '@js/hooks/useMatchMedia';
import { useWorkspaceSetting } from '@js/hooks/workspaceSettings';
import { useSeasonalLaunchSharePageTourContext } from '@js/pages/share/common/context/seasonal-launch-tour-context';

import React, { useEffect, useMemo, useState } from 'react';

import { useHistory } from 'react-router-dom';
import * as analytics from '@js/utilities/analytics';
import { incrementMetric } from '@js/utilities/metrics';

import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';

import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import {
  Arrange,
  Backdrop,
  Container,
  ResponsiveGridSections,
} from '@loomhq/lens';

import { SEASONAL_LAUNCH_MODAL_VARIANTS } from '@loomhq/shared-utilities/constants/featureFlag';
import { Feature as FeaturesEnum } from '@loomhq/shared-utilities/constants/product';
import { WorkspaceSetting } from '@loomhq/shared-utilities/constants/settings';
import { UserPropertyEnum } from '@loomhq/shared-utilities/constants/userProperties';

import {
  EventProps,
  FtuxEnabledVariants,
  LaunchType,
  Variant,
} from './common/types';
import { getVariantContentSlots } from './get-content';
import styles from './styles.module.css';
import { MEETINGS_PAGE } from '../../constants/routes';
import { DesktopModalCard } from './DesktopModalCard';
import { MobileModalCard } from './MobileModalCard';
import {
  ORG_ROLE_ADMIN,
  ORG_ROLE_CREATOR,
} from '@loomhq/shared-utilities/constants/organizationRoles';
import { useSearchParams } from '@js/hooks/useSearchParams';
import { useUserProperty } from '@js/hooks/user/useUserProperty';

interface LaunchConfig {
  variants: Variant[];
  footerClassName?: string;
  ContentContainer?: typeof Container | typeof Arrange;
  backdropColor?: 'backdropTwilight' | 'backdropDark';
  columnLayout?: {
    gap: number;
    columns: Array<string | number>;
  };
  footerBtnsGap?: number;
  featureSlotGap?: number;
  featuresSlotWidth?: string;
  featuresSlotHeight?: string;
}

const DEFAULT_CONFIG = {
  ContentContainer: Arrange,
  footerClassName: styles.footer,
  backdropColor: 'backdropDark',
  columnLayout: {
    gap: 5,
    columns: ['1fr', 'auto'] as ResponsiveGridSections,
  },
  footerBtnsGap: 1,
  featureSlotGap: 3,
  featuresSlotWidth: '400px',
  featuresSlotHeight: '400px',
} as const;

const LAUNCH_CONFIG: Record<LaunchType, LaunchConfig> = {
  [LaunchType.SPRING]: {
    variants: [
      Variant.SPRING_LAUNCH_25_EXISTING_FREE_TRIAL,
      Variant.SPRING_LAUNCH_25_EXISTING_BUSINESS_TRIAL,
      Variant.SPRING_LAUNCH_25_NO_TRIAL,
      Variant.SPRING_LAUNCH_25_BUSINESS_AI_14_DAY_TRIAL,
      Variant.SPRING_LAUNCH_25_BUSINESS_AI,
      Variant.SPRING_LAUNCH_25_ENTERPRISE,
      Variant.SPRING_LAUNCH_25_ATLASSIAN,
      Variant.SPRING_LAUNCH_25_CONTROL,
    ],
    footerClassName: styles.footerWithBorder,
    footerBtnsGap: 2,
    backdropColor: 'backdropTwilight',
    featureSlotGap: 2,
  },
  [LaunchType.WINTER]: {
    variants: [
      Variant.WINTER_LAUNCH_25_AI_TRIAL_CALENDAR_CONNECT,
      Variant.WINTER_LAUNCH_25_AI_TRIAL,
      Variant.WINTER_LAUNCH_25_PROMO,
    ],
    ContentContainer: Container,
    columnLayout: {
      gap: 3,
      columns: ['1fr', '2fr'],
    },
    featuresSlotWidth: 'auto',
  },
  [LaunchType.SUMMER]: {
    variants: [
      Variant.SUMMER_LAUNCH_25_STARTER_FREE,
      Variant.SUMMER_LAUNCH_25_BUSINESS,
      Variant.SUMMER_LAUNCH_25_BUSINESS_AI_ENTERPRISE,
      Variant.SUMMER_LAUNCH_25_BUSINESS_ATLASSIAN,
      Variant.SUMMER_LAUNCH_25_BUSINESS_AI_ENTERPRISE_ATLASSIAN,
    ],
    footerClassName: styles.footerWithBorder,
    footerBtnsGap: 2,
    backdropColor: 'backdropTwilight',
    featureSlotGap: 2,
  },
};

const getLaunchConfig = (variant: Variant) => {
  const launchType = Object.entries(LAUNCH_CONFIG).find(([_, config]) =>
    config.variants.includes(variant)
  );
  if (!launchType) {
    return DEFAULT_CONFIG;
  }

  return {
    ...DEFAULT_CONFIG,
    ...LAUNCH_CONFIG[launchType[0] as LaunchType],
  };
};

// Handles launching the seasonal launch modal from the share page
export const SeasonalLaunchSharePageModal = ({
  workspace,
  skipModal,
}: {
  workspace: any;
  skipModal: boolean;
}): React.ReactElement | null => {
  const {
    startSeasonalLaunchTour,
    isActive,
    shouldShowTour,
    setShouldShowTour,
  } = useSeasonalLaunchSharePageTourContext();
  const { setHideBackgroundPreview } = useVideoContext();

  return (
    <SeasonalLaunchModal
      setHideBackgroundPreview={setHideBackgroundPreview}
      startSeasonalLaunchTour={startSeasonalLaunchTour}
      isActive={isActive}
      workspace={workspace}
      skipModal={skipModal}
      shouldShowTour={shouldShowTour}
      setShouldShowTour={setShouldShowTour}
    />
  );
};

// Handles launching the seasonal launch modal from the library/looms page
export const SeasonalLaunchModal = ({
  setHideBackgroundPreview,
  startSeasonalLaunchTour,
  isActive = false,
  workspace,
  shouldShowTour,
  setShouldShowTour,
  skipModal = false,
}: {
  setHideBackgroundPreview?: any;
  startSeasonalLaunchTour?: any;
  isActive?: boolean;
  workspace: any;
  shouldShowTour?: boolean;
  setShouldShowTour?: (shouldShowTour: boolean) => void;
  skipModal?: boolean;
}): React.ReactElement | null => {
  return (
    <FeatureWrapper
      feature={FeaturesEnum.SeasonalLaunch}
      errorType={ErrorBoundaryTypes.SILENT}
    >
      <SeasonalLaunchModalWithoutFeatureWrapper
        setHideBackgroundPreview={setHideBackgroundPreview}
        startSeasonalLaunchTour={startSeasonalLaunchTour}
        isActive={isActive}
        workspace={workspace}
        shouldShowTour={shouldShowTour}
        setShouldShowTour={setShouldShowTour}
        skipModal={skipModal}
      />
    </FeatureWrapper>
  );
};

const SeasonalLaunchModalWithoutFeatureWrapper = ({
  setHideBackgroundPreview,
  startSeasonalLaunchTour,
  isActive,
  workspace,
  shouldShowTour,
  setShouldShowTour,
  skipModal,
}: {
  setHideBackgroundPreview: any;
  startSeasonalLaunchTour: any;
  isActive: boolean;
  workspace: any;
  shouldShowTour?: boolean;
  setShouldShowTour?: (shouldShowTour: boolean) => void;
  skipModal: boolean;
}): React.ReactElement | null => {
  const { value: hasAiAddOn } = useWorkspaceSetting(WorkspaceSetting.ALLOWS_AI);
  const { featureLoadedRef } = useFeatureWrapper();
  const isLargeTabletOrDesktop = useMatchLargeTabletOrDesktop();
  const seasonalLaunchModalVariantsFeatureFlagValue: Variant =
    useFeatureFlagValue(SEASONAL_LAUNCH_MODAL_VARIANTS);

  const isSpring25Control =
    seasonalLaunchModalVariantsFeatureFlagValue ===
    Variant.SPRING_LAUNCH_25_CONTROL;

  const launchConfig = getLaunchConfig(
    seasonalLaunchModalVariantsFeatureFlagValue
  );

  // personaRole is JSON typed and therefore unknown, so we have to assert the type here until we can fix the typing
  const personaRole = useCurrentUserSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user => (user.persona as any)?.persona_v1?.role,
    null
  ) as string;

  const [isOpen, setIsOpen] = useState(
    !isActive && !(skipModal || isSpring25Control)
  );
  // For the purposes we want to treat sales-led (business and enterprise) and enterprise (regardless of
  // sales-led property) the same

  const tourIsEnabled = false;

  const eventProps: EventProps = useMemo(() => {
    return {
      ai_addOn: hasAiAddOn,
      role: workspace?.memberRole,
      persona: personaRole,
      workspace_type: workspace?.type,
      tour_is_enabled: tourIsEnabled,
      variant: seasonalLaunchModalVariantsFeatureFlagValue,
    };
  }, [
    hasAiAddOn,
    workspace?.memberRole,
    workspace?.type,
    personaRole,
    tourIsEnabled,
    seasonalLaunchModalVariantsFeatureFlagValue,
  ]);

  const {
    titleSlot,
    aboveSubtitleSlot,
    belowSubtitleSlot,
    featuresSlot,
    upgradeCtaSlot,
    connectCalendarCtaSlot,
    myLibraryCtaSlot,
    featureTourCtaSlot,
    closeCtaSlot,
    footerSlot,
    modal,
  } = getVariantContentSlots({
    variant: seasonalLaunchModalVariantsFeatureFlagValue,
    hasAiAddOn,
  });

  const history = useHistory();

  useEffect(() => {
    if (setHideBackgroundPreview) {
      setHideBackgroundPreview(true);
    }
  }, [setHideBackgroundPreview, isActive]);

  const onDismissFtux = useOnDismissFtux();
  const [currentStep, setCurrentStep] = useState(0);

  const done = currentStep === (featuresSlot?.length || 1) - 1;

  const [hasChangedSteps, setHasChangedSteps] = useState(false);

  const showFeature = (index: number) => {
    setHasChangedSteps(true);
    setCurrentStep(index);

    analytics.track(SEASONAL_LAUNCH_FTUX_MODAL_NEXT_CLICKED, {
      ...eventProps,
    });
  };

  const dismissModal = (source?: string): Promise<void> => {
    return new Promise<void>(resolve => {
      analytics.track(
        SEASONAL_LAUNCH_FTUX_MODAL_DISMISSED,
        {
          ...eventProps,
          source,
        },
        async () => {
          incrementMetric('seasonal.launch.ftux.modal.closed', {
            source,
          });

          await onDismissFtux(UserPropertyEnum.SEASONAL_LAUNCH_MODAL_VARIANTS);

          if (setHideBackgroundPreview) {
            setHideBackgroundPreview(false);
          }

          setIsOpen(false);
          setShouldShowTour && setShouldShowTour(false);

          resolve();
        }
      );
    });
  };

  const onConnectCalendarClick = async () => {
    await dismissModal('connect-calendar');
    const url = new URL(MEETINGS_PAGE, window.location.origin);
    window.location.href = url.toString();
  };

  const handleTakeTour = async () => {
    await dismissModal();

    if (tourIsEnabled) {
      startSeasonalLaunchTour();
    } else {
      const url = new URL('/meetings', window.location.origin);
      window.location.href = url.toString();
    }
  };

  const onMyLibraryClick = async () => {
    await dismissModal('my-library');
    const url = new URL('/looms/videos', window.location.origin);
    window.location.href = url.toString();
  };

  // skip the modal and show the tour
  useEffect(() => {
    if (skipModal && tourIsEnabled && shouldShowTour) {
      if (setHideBackgroundPreview) {
        setHideBackgroundPreview(false);
      }

      setIsOpen(false);
      startSeasonalLaunchTour();
    }
  }, [
    shouldShowTour,
    setHideBackgroundPreview,
    skipModal,
    startSeasonalLaunchTour,
    tourIsEnabled,
  ]);

  useEffect(() => {
    if (!isOpen) {
      setHideBackgroundPreview && setHideBackgroundPreview(false);
    }
  }, [isOpen, setHideBackgroundPreview]);

  const searchParams = useSearchParams();

  const { loading: workspaceAllowsAiLoading, value: workspaceAllowsAi } =
    useWorkspaceSetting(WorkspaceSetting.ALLOWS_AI);

  const userManuallyOptOutOfAi = !workspaceAllowsAi;

  const { value: hasSeenSeasonalFtux, loading: loadingSeasonalModalFtux } =
    useUserProperty(UserPropertyEnum.SEASONAL_LAUNCH_MODAL_VARIANTS);

  const seasonalLaunchVariantsFlagIsEnabled = useFlagIsActivated({
    flag: SEASONAL_LAUNCH_MODAL_VARIANTS,
    activationValues: FtuxEnabledVariants,
  });

  const userIsAdminOrCreator = Boolean(
    workspace?.memberRole === ORG_ROLE_ADMIN ||
      workspace?.memberRole === ORG_ROLE_CREATOR
  );

  const hasAiAddonUpgradeParam =
    Boolean(searchParams.get('request_ai_addon')) ||
    Boolean(searchParams.get('ai_addon_upgrade'));

  const isSeasonalVariantsLaunchEnabled =
    !hasAiAddonUpgradeParam &&
    workspace !== undefined &&
    userIsAdminOrCreator &&
    !workspaceAllowsAiLoading &&
    !userManuallyOptOutOfAi;

  const showSeasonalLaunchVariantsFtuxModal =
    seasonalLaunchVariantsFlagIsEnabled &&
    !hasSeenSeasonalFtux &&
    !loadingSeasonalModalFtux &&
    isSeasonalVariantsLaunchEnabled;

  if (!workspace || isSpring25Control || !showSeasonalLaunchVariantsFtuxModal) {
    return null;
  }

  return (
    <div ref={featureLoadedRef}>
      <Backdrop isOpen={isOpen} backgroundColor={launchConfig.backdropColor}>
        {isLargeTabletOrDesktop ? (
          <DesktopModalCard
            modal={modal}
            isOpen={isOpen}
            dismissModal={dismissModal}
            titleSlot={titleSlot}
            aboveSubtitleSlot={aboveSubtitleSlot}
            belowSubtitleSlot={belowSubtitleSlot}
            featuresSlot={featuresSlot}
            launchConfig={launchConfig}
            hasAiAddOn={hasAiAddOn}
            hasChangedSteps={hasChangedSteps}
            currentStep={currentStep}
            workspace={workspace}
            personaRole={personaRole}
            showFeature={showFeature}
            tourIsEnabled={tourIsEnabled}
            upgradeCtaSlot={upgradeCtaSlot}
            eventProps={eventProps}
            connectCalendarCtaSlot={connectCalendarCtaSlot}
            onConnectCalendarClick={onConnectCalendarClick}
            myLibraryCtaSlot={myLibraryCtaSlot}
            onMyLibraryClick={onMyLibraryClick}
            featureTourCtaSlot={featureTourCtaSlot}
            done={done}
            handleTakeTour={handleTakeTour}
            closeCtaSlot={closeCtaSlot}
            footerSlot={footerSlot}
          />
        ) : (
          <MobileModalCard
            isOpen={isOpen}
            dismissModal={dismissModal}
            titleSlot={titleSlot}
            aboveSubtitleSlot={aboveSubtitleSlot}
            belowSubtitleSlot={belowSubtitleSlot}
            featuresSlot={featuresSlot}
            launchConfig={launchConfig}
            hasAiAddOn={hasAiAddOn}
            hasChangedSteps={hasChangedSteps}
            currentStep={currentStep}
            workspace={workspace}
            personaRole={personaRole}
            showFeature={showFeature}
            tourIsEnabled={tourIsEnabled}
            upgradeCtaSlot={upgradeCtaSlot}
            eventProps={eventProps}
            connectCalendarCtaSlot={connectCalendarCtaSlot}
            onConnectCalendarClick={onConnectCalendarClick}
            myLibraryCtaSlot={myLibraryCtaSlot}
            onMyLibraryClick={onMyLibraryClick}
            featureTourCtaSlot={featureTourCtaSlot}
            done={done}
            handleTakeTour={handleTakeTour}
            closeCtaSlot={closeCtaSlot}
          />
        )}
      </Backdrop>
    </div>
  );
};

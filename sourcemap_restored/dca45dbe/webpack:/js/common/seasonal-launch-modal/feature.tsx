import { SEASONAL_LAUNCH_FTUX_MODAL_FEATURE_SHOWN } from '@js/constants/events';

import cn from 'classnames';
import { useFeatureFlagValue } from '@js/hooks/featureFlag';
import React, { useEffect, useRef } from 'react';
import * as analytics from '@js/utilities/analytics';
import { incrementMetric } from '@js/utilities/metrics';

import {
  Arrange,
  Container,
  Icon,
  Pill,
  Spacer,
  Split,
  Text,
} from '@loomhq/lens';
import { SvgChevronUp } from '@loomhq/lens/icons/chevron-up';
import { SEASONAL_LAUNCH_MODAL_VARIANTS } from '@loomhq/shared-utilities/constants/featureFlag';

import { Variant } from './common/types';
import styles from './styles.module.css';

import type { EventProps } from './common/types';

interface FeatureProps {
  variant?: 'border' | 'borderless';
  description: string;
  featureId: string;
  hasAiAddOn: boolean;
  hasChangedSteps: boolean;
  icon: JSX.Element;
  index: number;
  isActive: boolean;
  collapsible: boolean;
  memberRole: string;
  personaRole: string;
  showFeature: (index: number) => void;
  title: string;
  tourIsEnabled: boolean;
  workspaceType: string;
  isBeta?: boolean;
  isAi?: boolean;
  comingSoon?: boolean;
  newFeature?: boolean;
}

const useScrollIntoView = (
  ref: React.RefObject<HTMLDivElement>,
  isActive: boolean
) => {
  const footerEl = document.getElementById('seasonal-launch-modal-footer');

  const bottomLine = footerEl?.getBoundingClientRect().top;

  useEffect(() => {
    const { bottom: featureBottom } =
      ref.current?.getBoundingClientRect() || {};

    if (isActive && featureBottom && bottomLine && featureBottom > bottomLine) {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
    // disabled the rule here as the addition of ref as a dep isn't necessary
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);
};

export const Feature = ({
  description,
  featureId,
  hasAiAddOn,
  hasChangedSteps,
  icon,
  index,
  isActive,
  collapsible = true,
  memberRole,
  personaRole,
  showFeature,
  title,
  tourIsEnabled,
  workspaceType,
  isBeta = false,
  isAi = false,
  variant = 'border',
  comingSoon,
  newFeature,
}: FeatureProps): React.ReactElement => {
  const seasonalLaunchModalVariantsFeatureFlagValue: Variant =
    useFeatureFlagValue(SEASONAL_LAUNCH_MODAL_VARIANTS);

  useEffect(() => {
    if (isActive) {
      const eventProps: EventProps = {
        ai_addOn: hasAiAddOn,
        role: memberRole,
        persona: personaRole,
        workspace_type: workspaceType,
        tour_is_enabled: tourIsEnabled,
        variant: seasonalLaunchModalVariantsFeatureFlagValue,
      };

      analytics.track(SEASONAL_LAUNCH_FTUX_MODAL_FEATURE_SHOWN, {
        ...eventProps,
        feature: featureId,
      });

      incrementMetric('seasonal.launch.ftux.feature.shown', {
        feature: featureId,
      });
    }
  }, [
    isActive,
    featureId,
    memberRole,
    personaRole,
    workspaceType,
    tourIsEnabled,
    hasAiAddOn,
    seasonalLaunchModalVariantsFeatureFlagValue,
  ]);

  const ref = useRef<HTMLDivElement>(null);

  useScrollIntoView(ref, isActive);

  const textStyles = collapsible
    ? cn(
        'text:left',
        hasChangedSteps && styles.animateVisibility,
        styles.text,
        isActive && styles.isActive,
        isActive ? styles.visible : styles.invisible
      )
    : 'text:left';

  return (
    <div ref={ref}>
      <Container
        as="button"
        onClick={() => showFeature(index)}
        className={cn(styles.featureContainer)}
      >
        {/* Gradient border */}
        {variant === 'border' && (
          <div
            className={cn(
              styles.border,
              styles.activeBorder,
              isActive && styles.visible
            )}
          />
        )}

        {/* Gray border */}
        {variant === 'border' && (
          <div
            className={cn(
              styles.border,
              styles.inactiveBorder,
              !isActive && styles.visible
            )}
          />
        )}

        <Container
          className={cn(
            styles.featureContent,
            collapsible && isActive && styles.expandedContent,
            collapsible && !isActive && styles.collapsedContent,
            hasChangedSteps && styles.animateHeight
          )}
          padding={variant === 'border' ? 'medium' : null}
        >
          <Arrange gap={1} alignItems="start">
            <Icon icon={icon} color="body" />
            <Split direction="row" gap="xsmall">
              <Arrange justifyContent="space-between">
                <Arrange gap={1} alignItems="center">
                  <Text size="body-md" fontWeight="bold" alignment="left">
                    {title}
                  </Text>
                  {isAi ? (
                    <Pill color="body" backgroundColor="blurpleMedium">
                      AI
                    </Pill>
                  ) : null}
                  {isBeta ? (
                    <Pill color="blurple" backgroundColor="blurpleLight">
                      Beta
                    </Pill>
                  ) : null}
                  {newFeature ? (
                    <Pill color="blurple" backgroundColor="blurpleLight">
                      New
                    </Pill>
                  ) : null}
                  {comingSoon ? (
                    <Pill color="blurple" backgroundColor="blurpleLight">
                      Coming soon
                    </Pill>
                  ) : null}
                </Arrange>
                {collapsible && (
                  <Icon
                    icon={<SvgChevronUp />}
                    color="bodyDimmed"
                    className={cn(
                      styles.openCloseIcon,
                      isActive && styles.open
                    )}
                  />
                )}
              </Arrange>
              <div className={textStyles}>
                <Spacer top={variant === 'borderless' ? 0 : 1} bottom={0}>
                  <Text size="body-md" fontWeight="book">
                    {description}
                  </Text>
                </Spacer>
              </div>
            </Split>
          </Arrange>
        </Container>
      </Container>
    </div>
  );
};

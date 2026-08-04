import {
  type EligibilityPreCheck,
  useFlagIsActivated,
} from '@js/hooks/featureFlag';

/**
 * Conditionally displays the children, only if the feature flag `flag` value
 * is one of the values in `activationValues`
 */
export function FeatureFlaggedComponent(props: {
  children: React.ReactNode;
  flag: string;
  activationValues: any[];
  eligibilityPreCheckFunction?: EligibilityPreCheck;
  extraProperties?: Record<string, unknown>;
  logEligibilityPreCheckToSegment?: boolean;
}): React.ReactNode {
  const {
    children,
    flag,
    activationValues,
    eligibilityPreCheckFunction,
    extraProperties,
    logEligibilityPreCheckToSegment,
  } = props;
  const showComponent = useFlagIsActivated({
    flag,
    activationValues,
    eligibilityPreCheckFunction,
    extraProperties,
    logEligibilityPreCheckToSegment,
  });

  return showComponent && children ? children : null;
}

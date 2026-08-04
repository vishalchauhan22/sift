/* eslint-disable @loomhq/loom/no-js-extension */
import { useFlagIsActivated } from '@js/hooks/featureFlag';

/**
 * Conditionally displays the children, only if the feature flag `flag` value
 * is one of the values in `activationValues`
 */
// eslint-disable-next-line import/no-default-export
export default function FeatureFlaggedComponent(props) {
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

// Google One Tap allows users to sign up for Loom
// by just clicking one button. Note:
// The feature is kept behind a feature flag
// only because signups dropped while outside of it
// likely this is due to some cookie exception the
// flag offers to the component.
// Google One Tap is also blocked fairly consistently
// across browsers, so its usage is limited.
import React from 'react';
import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { Feature } from '@loomhq/shared-utilities/constants/product';

import { GoogleIdentity } from '../common/google-identity';

const GoogleOneTapWithoutFeatureWrapper = () => {
  const { featureLoadedRef } = useFeatureWrapper();

  return (
    <div ref={featureLoadedRef}>
      <GoogleIdentity />
    </div>
  );
};

export const GoogleOneTap = (): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.GoogleOneTap}
      errorType={ErrorBoundaryTypes.SILENT}
    >
      <GoogleOneTapWithoutFeatureWrapper />
    </FeatureWrapper>
  );
};

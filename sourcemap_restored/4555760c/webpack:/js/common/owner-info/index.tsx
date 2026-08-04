import React from 'react';

import { Arrange } from '@loomhq/lens';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import { LoggedInOnly } from '@js/common/current-user';
import { useVideoContext } from '@js/common/video-player';

import { SalesforceEngagementTrackingIndicator } from '@js/components/salesforce-engagement-tracking-indicator';
import { useHideInformationDueToPassword } from '@js/pages/share/common';

import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';

import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { OwnerInfoText } from './OwnerInfoText';

export const OwnerInfoWithoutFeatureWrapper = (): JSX.Element | null => {
  const {
    video: {
      createdAt,
      owner: { id: ownerId, name: ownerName },
    },
  } = useVideoContext();

  const hideInformationDueToPassword = useHideInformationDueToPassword();

  const { featureLoadedRef } = useFeatureWrapper();

  const createdAtDate = new Date(createdAt);

  if (hideInformationDueToPassword) {
    return null;
  }

  return (
    <div ref={featureLoadedRef}>
      <Arrange gap="small">
        <OwnerInfoText
          name={ownerName}
          date={createdAtDate}
          ownerId={ownerId}
          profileCardPlacement="bottom-center"
        />
        <LoggedInOnly>
          <SalesforceEngagementTrackingIndicator />
        </LoggedInOnly>
      </Arrange>
    </div>
  );
};

export const OwnerInfo = (): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.Profile}
      errorType={ErrorBoundaryTypes.SILENT}
      additionalLoggingValues={{ version: 'owner info' }}
    >
      <OwnerInfoWithoutFeatureWrapper />
    </FeatureWrapper>
  );
};

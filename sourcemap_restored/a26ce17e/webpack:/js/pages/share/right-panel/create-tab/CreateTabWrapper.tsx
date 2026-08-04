import React from 'react';

import { Feature } from '@loomhq/shared-utilities/constants/product';
import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { CreateTabController } from './CreateTabController';

const CreateTabWrapperWithoutFeatureWrapper: React.FC = () => {
  const { featureLoadedRef } = useFeatureWrapper();

  return (
    <div ref={featureLoadedRef}>
      <CreateTabController />
    </div>
  );
};

export const CreateTabWithErrorBoundary = (): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.AiWorkflowsTabV2}
      errorType={ErrorBoundaryTypes.DEFAULT}
    >
      <CreateTabWrapperWithoutFeatureWrapper />
    </FeatureWrapper>
  );
};

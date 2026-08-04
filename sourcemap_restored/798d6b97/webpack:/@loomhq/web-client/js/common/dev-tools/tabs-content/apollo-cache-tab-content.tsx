import { ApolloConsumer } from '@apollo/client';
import React from 'react';
import ReactJson from 'react-json-view';

import { jsonParse } from '@js/utilities/json/safe-json-parse';
import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { Container } from '@loomhq/lens';
import { Feature } from '@loomhq/shared-utilities/constants/product';

export const ApolloCacheTabContentWithoutFeatureWrapper = (): JSX.Element => {
  const { featureLoadedRef } = useFeatureWrapper();

  const refHandler = newRef => {
    featureLoadedRef(newRef);
  };

  return (
    <Container refHandler={refHandler} width="100%">
      <ApolloConsumer>
        {(client: any) => {
          return (
            <ReactJson
              collapsed={2}
              sortKeys
              // ReactJson doesn't automatically remove the [[Prototype]]
              src={jsonParse(JSON.stringify(client.cache?.data?.data))}
            />
          );
        }}
      </ApolloConsumer>
    </Container>
  );
};

export const ApolloCacheTabContent = (): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.DevToolsApolloCache}
      errorType={ErrorBoundaryTypes.DEFAULT}
    >
      <ApolloCacheTabContentWithoutFeatureWrapper />
    </FeatureWrapper>
  );
};

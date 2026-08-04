import React from 'react';
import ReactJson from 'react-json-view';

import { jsonParse } from '@js/utilities/json/safe-json-parse';
import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { Container, List, ListRow, Loader } from '@loomhq/lens';
import { Feature } from '@loomhq/shared-utilities/constants/product';

import { useGetEnvVarsQuery } from '../GetEnvVars.generated';

export const EnvVarsTabContentWithoutFeatureWrapper = (): JSX.Element => {
  const { featureLoadedRef } = useFeatureWrapper();
  const refHandler = newRef => {
    featureLoadedRef(newRef);
  };

  const { loading, error, data } = useGetEnvVarsQuery();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading environment variables: {error.message}</div>;
  }

  const envVars =
    data?.getEnvVars?.__typename === 'GetEnvVarsPayload'
      ? jsonParse(data.getEnvVars.envVars as string) || {}
      : {};

  return (
    <Container refHandler={refHandler} width="100%">
      <List columns={['auto', '1fr', 'auto']} gap="small">
        <ListRow paddingX="medium" paddingY="small">
          <ReactJson collapsed={2} sortKeys src={envVars} />
        </ListRow>
      </List>
    </Container>
  );
};

export const EnvVarsTabContent = (): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.DevToolsEnvVars}
      errorType={ErrorBoundaryTypes.DEFAULT}
    >
      <EnvVarsTabContentWithoutFeatureWrapper />
    </FeatureWrapper>
  );
};

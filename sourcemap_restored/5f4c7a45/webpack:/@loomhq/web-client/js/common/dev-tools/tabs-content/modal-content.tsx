import React from 'react';
import { useHistory } from 'react-router';

import {
  Container,
  IconButton,
  List,
  ListRow,
  Split,
  Text,
} from '@loomhq/lens';
import { SvgExternalLink } from '@loomhq/lens/icons/external-link';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import { ErrorBoundary, StandardError } from '@js/common/error-management';
import { ModalTypeKeys, ModalTypes } from '@js/common/modal-container';
import { appendParamsAndReload } from '@js/utilities/devtools';
import { ErrorMarkers } from '@js/utilities/rum/constants';
import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

const feature = Feature.DevToolsApolloCache;

const ModalContentWithoutFeatureWrapper = (): JSX.Element => {
  const { featureLoadedRef } = useFeatureWrapper();

  const refHandler = newRef => {
    featureLoadedRef(newRef);
  };

  const modalTypesArray: ModalTypeKeys[] = Object.keys(
    ModalTypes
  ) as ModalTypeKeys[];

  const handleIconClick = modal => {
    appendParamsAndReload({ modal });
  };

  const formatKeyToSentenceCase = modalKey => {
    const sentence = modalKey.toLowerCase().replace(/_/g, ' ');
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  };

  return (
    <Container refHandler={refHandler} marginY={1}>
      <Split direction="column" gap={3} alignItems="stretch">
        <Text size="body-md">
          Trigger open any modal managed by our{' '}
          <pre className="inline c:orange">ModalContainer</pre>. Modals
          controlled elsewhere may clash with other modals. Consider moving your
          modal. Some modals will either fail to load or be incomplete due to
          missing data.{' '}
        </Text>
        <List columns={['auto', '1fr', 'auto']} gap="small">
          {modalTypesArray.map((m, i) => {
            return (
              <ListRow key={i} paddingX="medium" paddingY="small">
                <IconButton
                  altText={`Open ${m}`}
                  icon={<SvgExternalLink />}
                  onClick={() => handleIconClick(m)}
                />
                <Text fontWeight="bold" size="body-md">
                  {formatKeyToSentenceCase(m)}
                </Text>

                <Text size="body-sm" color="bodyDimmed">
                  {m}
                </Text>
              </ListRow>
            );
          })}
        </List>
      </Split>
    </Container>
  );
};

export const ModalContent = (): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.ShareModalShareTab}
      errorType={ErrorBoundaryTypes.CUSTOM}
      customErrorBoundary={<ModalContentErrorBoundary />}
    >
      <ModalContentWithoutFeatureWrapper />
    </FeatureWrapper>
  );
};

const ModalContentErrorBoundary = (): JSX.Element => {
  const history = useHistory();
  const { reportError } = useFeatureWrapper();

  const handleRefreshButtonClick = () => {
    history.go(0);
  };

  return (
    <ErrorBoundary
      feature={feature}
      name={ErrorMarkers.ModalDevToolsError}
      onError={error => reportError(feature, error)}
      renderError={() => (
        <Container paddingY="20vh">
          <StandardError
            text="Modal could not be loaded. Some modals may require data you do not have access to."
            CTAText="Refresh page"
            handleCTAClick={handleRefreshButtonClick}
            showWarningIcon={true}
            isInternalError={true}
          />
        </Container>
      )}
    >
      <ModalContentWithoutFeatureWrapper />
    </ErrorBoundary>
  );
};

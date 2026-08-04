import {
  ErrorBoundary,
  ErrorBoundaryProps,
  StandardError,
} from '@js/common/error-management';
import React, { FC, useCallback, useState } from 'react';
import { ErrorMarkers } from '@js/utilities/rum/constants';
import { OmitUnion } from '@js/utilities/typescript/omit-union';

import { Align, Container } from '@loomhq/lens';

type ShareVideoPlayerErrorBoundaryProps = OmitUnion<
  ErrorBoundaryProps,
  'renderError'
>;

export const ShareVideoPlayerErrorBoundary: FC<
  React.PropsWithChildren<ShareVideoPlayerErrorBoundaryProps>
> = props => {
  // updating the key causes all child components to re-render which acts as a "refresh"
  const [key, setKey] = useState<number>(0);

  const incrementKey = useCallback(() => {
    setKey(currentValue => currentValue + 1);
  }, []);

  return (
    <ErrorBoundary
      key={key}
      name={ErrorMarkers.ShareVideoPlayerErrorBoundary}
      {...props}
      renderError={() => (
        <Container
          backgroundColor="grey8"
          height="100%"
          width="100%"
          radius="medium"
          data-lens-theme="dark"
        >
          <Align alignment="center">
            <StandardError
              text={`The video player failed to load.`}
              CTAText={`Refresh Player`}
              handleCTAClick={incrementKey}
              showWarningIcon={false}
            />
          </Align>
        </Container>
      )}
    />
  );
};

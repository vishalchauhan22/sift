import {
  ErrorBoundary,
  ErrorBoundaryProps,
  StandardError,
} from '@js/common/error-management';
import React, { FC, useCallback, useState } from 'react';
import { ErrorMarkers } from '@js/utilities/rum/constants';

import { OmitUnion } from '@js/utilities/typescript/omit-union';

import { Container } from '@loomhq/lens';

type SidebarTabErrorBoundaryProps = OmitUnion<
  ErrorBoundaryProps,
  'renderError'
> & {
  tabName: string; // human readable tab name, should be capitalized e.g. "Views"
};

export const SidebarTabErrorBoundary: FC<
  React.PropsWithChildren<SidebarTabErrorBoundaryProps>
> = props => {
  const [key, setKey] = useState<number>(0);

  const incrementKey = useCallback(() => {
    setKey(currentValue => currentValue + 1);
  }, []);

  return (
    <ErrorBoundary
      key={key}
      name={`[${props.tabName}]${ErrorMarkers.SidebarTabErrorBoundary}`} // ex. [Transcript] Sidebar Tab Error Boundary
      {...props}
      renderError={() => (
        <Container paddingY="20vh">
          <StandardError
            text={`${props.tabName} not available`}
            CTAText={`Refresh ${props.tabName}`}
            handleCTAClick={incrementKey}
            showWarningIcon={true}
          />
        </Container>
      )}
    />
  );
};

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React, { FC, ReactNode } from 'react';

import { OmitUnion } from '@js/utilities/typescript/omit-union';

import { ErrorMarker } from '../../../utilities/rum/markers';
import {
  BaseErrorBoundary,
  BaseErrorBoundaryProps,
} from './common/BaseErrorBoundary';

const LegacyErrorBoundaryWrapper = styled.div`
  padding: 64px 0 0; // assume error is hidden by header, so push it down

  text-align: center;
`;

const LegacyError: FC<
  React.PropsWithChildren<{ error: Error; name?: string }>
> = ({ error, name }) => (
  <LegacyErrorBoundaryWrapper>
    An error occurred on the page: {error.toString()}
    {name && <ErrorMarker name={name} error={error} />}
  </LegacyErrorBoundaryWrapper>
);

type LegacyProps = OmitUnion<BaseErrorBoundaryProps, 'renderError'> & {
  name?: string;
  errorComponent?: ReactNode;
};

/**
 * @deprecated Please use an error boundary more specific to your needs
 */
export const LegacyErrorBoundary: FC<React.PropsWithChildren<LegacyProps>> = ({
  name,
  errorComponent,
  ...rest
}: LegacyProps) => {
  return (
    <BaseErrorBoundary
      {...rest}
      name={name}
      renderError={({ error }) =>
        errorComponent ? (
          errorComponent
        ) : (
          <LegacyError error={error} name={name} />
        )
      }
    />
  );
};

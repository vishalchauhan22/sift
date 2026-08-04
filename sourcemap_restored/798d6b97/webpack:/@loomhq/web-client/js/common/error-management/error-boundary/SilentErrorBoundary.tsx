import React, { FC } from 'react';

import { OmitUnion } from '@js/utilities/typescript/omit-union';

import {
  BaseErrorBoundary,
  BaseErrorBoundaryProps,
} from './common/BaseErrorBoundary';

/**
 * Use this component to render nothing if an error occurs
 */
export const SilentErrorBoundary: FC<
  React.PropsWithChildren<OmitUnion<BaseErrorBoundaryProps, 'renderError'>>
> = props => {
  return <BaseErrorBoundary {...props} />;
};

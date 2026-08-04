import React from 'react';

import { WORKSPACE_DATA_RETENTION_READ } from '@loomhq/shared-utilities/constants/scopes';
import Scopes from '@js/components/scopes';

type SpacesDataRetentionReadWrapperProps = {
  children: JSX.Element;
};

export const SpacesDataRetentionReadWrapper = ({
  children,
}: SpacesDataRetentionReadWrapperProps): JSX.Element | null => {
  return <Scopes name={WORKSPACE_DATA_RETENTION_READ}>{children}</Scopes>;
};

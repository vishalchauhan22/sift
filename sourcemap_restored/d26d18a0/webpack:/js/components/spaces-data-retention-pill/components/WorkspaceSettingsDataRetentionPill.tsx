import React from 'react';

import { formatDataAgeLimit } from '../helpers/formatDataAgeLimit';

import { DataRetentionPill } from './DataRetentionPill';
import { SpacesDataRetentionReadWrapper } from './SpacesDataRetentionReadWrapper';

type WorkspaceSettingsDataRetentionPillProps = {
  dataAgeLimit: number;
};

export const WorkspaceSettingsDataRetentionPill = ({
  dataAgeLimit,
}: WorkspaceSettingsDataRetentionPillProps): JSX.Element | null => {
  const dataAgeLimitFormatted = formatDataAgeLimit(dataAgeLimit);

  if (dataAgeLimitFormatted == null) {
    return null;
  }

  return (
    <SpacesDataRetentionReadWrapper>
      <DataRetentionPill
        dataAgeLimitFormatted={dataAgeLimitFormatted.compact}
      />
    </SpacesDataRetentionReadWrapper>
  );
};

import React from 'react';

import { Button } from '@loomhq/lens';

export const ShareSpacesButton = ({
  areSpacesRemoved,
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
  areSpacesRemoved?: boolean;
}): JSX.Element => (
  <Button variant="primary" disabled={disabled} onClick={onClick}>
    {areSpacesRemoved ? 'Update' : 'Share'}
  </Button>
);

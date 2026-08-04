import React from 'react';

import { Arrange, Loader } from '@loomhq/lens';

export const WidgetSpinner = (): React.ReactNode => {
  return (
    <Arrange
      role="progressbar"
      aria-label="Loading chat..."
      justifyContent="center"
      height="100%"
      width="100%"
      rows={['minmax(0, 1fr)', '84px']}
    >
      <Arrange height="100%" width="100%" alignItems="center">
        <Loader size="large" color="primary" />
      </Arrange>
    </Arrange>
  );
};

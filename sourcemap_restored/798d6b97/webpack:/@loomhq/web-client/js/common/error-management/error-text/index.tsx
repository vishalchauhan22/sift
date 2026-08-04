/**
 * Use for displaying in-line error messages, such as below forms. For individual form input errors, please utilise the specific Lens utility.
 */
import React from 'react';

import { Container, Text } from '@loomhq/lens';

type ErrorTextProps = {
  error: string | React.ReactNode | null;
  // TODO(Lens): Expose lens types for spacing
  marginTop?: number | string;
  marginLeft?: number | string;
  marginBottom?: number | string;
};

export const ErrorText = ({
  error,
  marginTop,
  marginLeft,
  marginBottom,
}: ErrorTextProps): JSX.Element | null => {
  if (!error) {
    return null;
  }
  return (
    <Container
      marginTop={marginTop ?? undefined}
      marginLeft={marginLeft ?? undefined}
      marginBottom={marginBottom ?? undefined}
    >
      <Text color="danger">{error}</Text>
    </Container>
  );
};

import React from 'react';

import { Container, Text, Icon, Arrange } from '@loomhq/lens';
import { SvgTrash } from '@loomhq/lens/icons/trash';

export const FullyDeletedCommentPlaceholder = (): JSX.Element | null => {
  return (
    <Container paddingBottom="small">
      <Container
        padding="medium"
        radius="medium"
        backgroundColor="backgroundSecondary"
        maxWidth={72}
      >
        <Arrange gap="small">
          <Icon icon={<SvgTrash />} color="bodyDimmed" />
          <Text color="bodyDimmed">This comment was deleted.</Text>
        </Arrange>
      </Container>
    </Container>
  );
};

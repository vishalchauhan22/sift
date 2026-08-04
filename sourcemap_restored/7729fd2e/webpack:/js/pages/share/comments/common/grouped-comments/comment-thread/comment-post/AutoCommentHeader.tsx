import React from 'react';

import { Arrange, Icon, Text } from '@loomhq/lens';
import { SvgEye } from '@loomhq/lens/icons/eye';

export const AutoCommentHeader = (): JSX.Element => {
  return (
    <Arrange gap="xsmall" alignContent="space-between">
      <Icon size="1rem" color="bodyDimmed" icon={<SvgEye />} />
      <Text size="body-sm" color="bodyDimmed">
        Only you can see this
      </Text>
    </Arrange>
  );
};

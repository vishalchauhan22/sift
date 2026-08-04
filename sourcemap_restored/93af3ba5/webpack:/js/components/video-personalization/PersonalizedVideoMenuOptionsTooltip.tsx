import React from 'react';

import { Tooltip, Text } from '@loomhq/lens';

export const PersonalizedVideoMenuOptionsTooltip = ({
  title,
  content,
}: {
  title: string;
  content: string;
}): JSX.Element => {
  return (
    <Tooltip placement="rightCenter" content={content}>
      <Text color="disabledContent">{title}</Text>
    </Tooltip>
  );
};

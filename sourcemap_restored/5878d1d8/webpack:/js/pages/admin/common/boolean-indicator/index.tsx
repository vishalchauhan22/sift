import React from 'react';

import { Text } from '@loomhq/lens';

type BooleanIndicatorProps = {
  condition: boolean;
  trueText?: string;
  falseText?: string;
};

/** *
 * A component that displays a boolean value as a checkmark or red x with custom text. Primarily used for tabulated formats (hence `pre` formatting)
 */

export const BooleanIndicator = ({
  condition,
  trueText = 'Yes',
  falseText = 'No',
}: BooleanIndicatorProps): JSX.Element => (
  <Text isInline>
    <span role="img" aria-label={condition ? 'checkmark' : 'red x'}>
      {condition ? '✅' : '❌'}
    </span>{' '}
    <pre className="inline ml:small">{condition ? trueText : falseText}</pre>
  </Text>
);

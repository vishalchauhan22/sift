import React, { forwardRef } from 'react';

import { TextInput } from '@loomhq/lens';

type TextInputBoxProps = React.ComponentProps<typeof TextInput> & {
  autofocus?: boolean;
};

export const TextInputBox = forwardRef<HTMLInputElement, TextInputBoxProps>(
  (props, ref) => {
    return <TextInput size="large" type="text" ref={ref} {...props} />;
  }
);

TextInputBox.displayName = 'TextInputBox';

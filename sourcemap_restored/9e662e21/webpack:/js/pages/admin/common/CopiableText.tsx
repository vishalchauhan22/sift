import copy from 'copy-to-clipboard';
import React, { ReactChildren, ReactElement } from 'react';

import { Arrange, IconButton, Text } from '@loomhq/lens';
import { SvgCheckCircle } from '@loomhq/lens/icons/check-circle';
import { SvgCopy } from '@loomhq/lens/icons/copy';

type Props = {
  children?: string | ReactChildren | ReactElement;
  value?: string;
  gap?: 'xsmall' | 'small';
} & React.ComponentProps<typeof Text>;

export const CopiableText: (props: Props) => JSX.Element | null = ({
  value,
  children,
  gap = 'small',
  ...textProps
}) => {
  const [copied, setCopied] = React.useState(false);

  let copyValue: string | null = null;

  if (value) {
    copyValue = value;
  } else if (children) {
    copyValue = children.toString();
  }

  if (copyValue === undefined || copyValue === null) {
    return null;
  }

  const onCopy = (ev: React.SyntheticEvent<HTMLInputElement>) => {
    ev.stopPropagation();

    if (copyValue) {
      const copied = copy(copyValue, { format: 'text/plain' });

      if (copied) {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
    }
  };

  return children ? (
    <Arrange gap={gap}>
      {/* textProps is typechecked to be correct for the Text component. */}
      <Text {...textProps}>{children}</Text>
      <IconButton
        size="small"
        altText="copy"
        onClick={event => onCopy(event)}
        icon={copied ? <SvgCheckCircle /> : <SvgCopy />}
      />
    </Arrange>
  ) : (
    <IconButton
      size="small"
      altText="copy"
      onClick={event => onCopy(event)}
      icon={copied ? <SvgCheckCircle /> : <SvgCopy />}
    />
  );
};

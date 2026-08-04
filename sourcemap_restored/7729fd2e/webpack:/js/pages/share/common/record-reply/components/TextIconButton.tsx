import React from 'react';

import { IconButton, TextButton, useMedia } from '@loomhq/lens';
import { SvgVideoCam } from '@loomhq/lens/icons/video-cam';

type TextIconButtonProps = {
  isDisabled: boolean;
  compact: boolean;
  buttonText?: string;
  iconColor?: string;
};

export const TextIconButton = ({
  isDisabled,
  compact,
  buttonText,
  iconColor,
}: TextIconButtonProps): JSX.Element => {
  const fullSize = useMedia(['(min-width: 560px)'], [true], false);
  const textButtonSize = fullSize ? 'medium' : 'small';

  return compact ? (
    <>
      {/* @ts-expect-error FIXME: This should provide alt text */}
      <IconButton
        isDisabled={isDisabled}
        icon={<SvgVideoCam />}
        iconColor={iconColor}
      />
    </>
  ) : (
    <TextButton
      isDisabled={isDisabled}
      icon={<SvgVideoCam />}
      size={textButtonSize}
    >
      {buttonText}
    </TextButton>
  );
};

import React, { FC } from 'react';

import { Avatar } from '@loomhq/lens';

const DefaultAvatar = ({ color = 'currentColor', ...props }) => (
  <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" {...props}>
    <circle opacity={0.2} cx={20} cy={20} r={20} fill={color} />
    <path d="M10.476 29.889a9.524 9.524 0 0119.047 0H10.476z" fill={color} />
    <circle
      cx={20.001}
      cy={13.222}
      transform="rotate(-90 20 13.222)"
      fill={color}
      r={5.556}
    />
  </svg>
);

interface Props extends Record<string, any> {
  name?: string;
  avatarSrc?: string;
  avatarSize?: React.ComponentProps<typeof Avatar>['size'];
  isDecorativeImage?: boolean;
}

const UserAvatar: FC<React.PropsWithChildren<Props>> = ({
  name,
  avatarSrc,
  avatarSize,
  isDecorativeImage = false,
  ...props
}: Props): JSX.Element => {
  const shouldShowAltText = !isDecorativeImage;

  if (avatarSrc) {
    return (
      <Avatar
        altText={shouldShowAltText ? name : ''}
        size={avatarSize}
        imageSrc={avatarSrc}
        {...props}
      />
    );
  }

  if (name) {
    const avatarLetter = name.charAt(0);

    return (
      <Avatar
        altText={shouldShowAltText ? name : ''}
        size={avatarSize}
        letter={avatarLetter}
        {...props}
      />
    );
  }

  return (
    <Avatar altText="" size={avatarSize} {...props}>
      <DefaultAvatar />
    </Avatar>
  );
};

// eslint-disable-next-line import/no-default-export
export default UserAvatar;

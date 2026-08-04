import classnames from 'classnames';
import React from 'react';

import { Arrange, Container, Text } from '@loomhq/lens';
import { SvgLockFill } from '@loomhq/lens/icons/lock-fill';

import styles from './styles.module.css';
import { getAvatarText, pickContainerColor, pickTextColor } from './utilities';

const SIZES = {
  small: { length: '24px', fontSize: 'medium' },
  large: { length: '40px', fontSize: 'large' },
} as const;

export function SpacesAvatar({
  spaceName = '',
  size = 'small',
  isDisabled = false,
  role = 'none',
}: {
  spaceName: string;
  size?: 'small' | 'large';
  isDisabled?: boolean;
  role?: string;
}): JSX.Element {
  const avatarText = getAvatarText(spaceName);
  const containerColor = pickContainerColor(spaceName);
  const textColor = pickTextColor(spaceName);

  const { length, fontSize } = SIZES[size];

  return (
    <Container
      width={length}
      height={length}
      backgroundColor={containerColor}
      className={classnames(
        'flex items:center justify:center',
        styles.spacesAvatar,
        isDisabled && styles.disabledAvatar
      )}
      paddingTop="1px"
      aria-hidden="true"
      role={role}
    >
      <Arrange justifyContent="center" alignItems="center">
        <Text fontWeight="bold" color={textColor} size={fontSize}>
          {avatarText}
        </Text>
      </Arrange>
    </Container>
  );
}

type AvatarSpace = {
  name: string;
  isArchived: boolean | null;
  privacy?: string | null;
};

export function SpacesAvatarWithName({
  space,
}: {
  space: AvatarSpace;
}): JSX.Element {
  return (
    <>
      <Arrange>
        <Arrange gap="small">
          <SpacesAvatar spaceName={space.name} />
          <Text fontWeight="bold">
            {space.name} {space.isArchived && '(Archived)'}
          </Text>
        </Arrange>
        {!space.privacy && (
          <Container
            width="16px"
            height="16px"
            marginLeft="6px"
            marginBottom="2px"
          >
            <SvgLockFill />
          </Container>
        )}
      </Arrange>
    </>
  );
}

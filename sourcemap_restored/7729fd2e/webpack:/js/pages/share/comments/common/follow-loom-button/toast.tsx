import React from 'react';

import { Text, Arrange, Icon, Toast, Link } from '@loomhq/lens';
import { SvgBell } from '@loomhq/lens/icons/bell';

import { ToastCopy } from './constants';

type FollowLoomToastProps = {
  isOpen: boolean;
  onCloseClick: () => void;
  onClick: () => void;
};

export const FollowLoomToast = ({
  isOpen,
  onCloseClick,
  onClick,
}: FollowLoomToastProps): JSX.Element => {
  return (
    <Toast duration="long" isOpen={isOpen} onCloseClick={onCloseClick}>
      <Arrange alignItems="start" gap="small">
        <Icon icon={<SvgBell />} color="bodyInverse" />
        <div>
          <Text fontWeight="bold">{ToastCopy.heading}</Text>{' '}
          <Text fontWeight="book" isInline={true}>
            {ToastCopy.subhead}
          </Text>{' '}
          <Text fontWeight="bold" isInline={true}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link htmlTag="button" variant="neutral" onClick={onClick}>
              {ToastCopy.link}
            </Link>
          </Text>
        </div>
      </Arrange>
    </Toast>
  );
};

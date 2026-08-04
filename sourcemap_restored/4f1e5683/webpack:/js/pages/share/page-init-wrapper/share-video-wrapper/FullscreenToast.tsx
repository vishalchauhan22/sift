import React from 'react';
import { Toast, Text, Icon, Arrange } from '@loomhq/lens';
import { SvgMaximize } from '@loomhq/lens/icons/maximize';
import { isMobile } from '@js/utilities/device';

type FullscreenToastProps = {
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
};

export const FullscreenToast: React.FC<FullscreenToastProps> = ({
  isOpen,
  onClick,
  onClose,
}) => {
  // Only render on mobile devices
  if (!isMobile) {
    return null;
  }

  return (
    <Toast
      isOpen={isOpen}
      onCloseClick={onClose}
      duration="long"
      platform="chrome-extension"
    >
      <Arrange alignItems="start" gap="small">
        <Icon icon={<SvgMaximize />} color="bodyInverse" />
        <Text fontWeight="bold" style={{ cursor: 'pointer' }} onClick={onClick}>
          Enter Full Screen
        </Text>
      </Arrange>
    </Toast>
  );
};

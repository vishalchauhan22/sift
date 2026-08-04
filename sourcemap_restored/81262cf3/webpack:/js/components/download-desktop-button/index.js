/* eslint-disable @loomhq/loom/no-js-extension */
import React, { useEffect, useState } from 'react';

import { Button, TextButton } from '@loomhq/lens';
import { SvgDownload } from '@loomhq/lens/icons/download';

import { isMac, isWindows } from '@js/utilities/device';
import {
  WIN_SUPPORT,
  fetchLinkByPlatform,
} from '@js/utilities/download-desktop';

import DownloadDesktopDropdown from '../download-desktop-dropdown';

export const BUTTON_TYPE_TEXT = 'textButton';

const DownloadButtonBase = ({ buttonType, ...props }) => {
  if (buttonType === BUTTON_TYPE_TEXT) {
    return <TextButton {...props} />;
  }

  return <Button buttonType={undefined} {...props} />;
};

const DownloadDesktopButton = props => {
  const {
    buttonType,
    buttonText = 'Download Desktop App',
    variant = 'primary',
    size = 'medium',
    afterOnClick = () => {},
    hasFullWidth = false,
    hideIcon = false,
  } = props;
  const [downloadLinks, setDownloadLinks] = useState([]);

  useEffect(() => {
    if (isWindows) {
      fetchLinkByPlatform(WIN_SUPPORT).then(setDownloadLinks);
    }
  }, []);

  if (isMac) {
    return (
      <DownloadDesktopDropdown
        hasFullWidth={hasFullWidth}
        afterOnClick={afterOnClick}
        trigger={
          <DownloadButtonBase
            buttonType={buttonType}
            size={size}
            hasFullWidth={hasFullWidth}
            icon={hideIcon ? null : <SvgDownload />}
            variant={variant}
            // A11y Refactor: Below should be button instead (and combined with its parent, which currently has role="button"). We must refactor the Lens Dropdown (https://lens.loom.dev/components/dropdown) component to behave this way before we can make this upgrade.
            htmlTag={'a'}
            tabIndex={0}
          >
            {buttonText}
          </DownloadButtonBase>
        }
      />
    );
  }

  return (
    <DownloadButtonBase
      buttonType={buttonType}
      hasFullWidth={hasFullWidth}
      icon={hideIcon ? null : <SvgDownload />}
      variant={variant}
      href={downloadLinks[0]}
      // A11y Refactor: Below should be button instead (and combined with its parent, which currently has role="button"). We must refactor the Lens Dropdown (https://lens.loom.dev/components/dropdown) component to behave this way before we can make this upgrade.
      htmlTag={'a'}
      size={size}
      isDisabled={!downloadLinks || !downloadLinks.length || !downloadLinks[0]}
      onClick={() => {
        afterOnClick(downloadLinks[0]);
      }}
    >
      {buttonText}
    </DownloadButtonBase>
  );
};

// eslint-disable-next-line import/no-default-export
export default DownloadDesktopButton;

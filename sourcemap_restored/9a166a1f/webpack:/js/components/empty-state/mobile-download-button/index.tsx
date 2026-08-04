import {
  MOBILE_ANDROID_APP,
  MOBILE_IOS_APP,
  MOBILE_WEB,
} from '@js/constants/routes';

import React from 'react';
import { isAndroid, isIOS } from '@js/utilities/device';

import { Button } from '@loomhq/lens';

const downloadAppHref = () => {
  if (isIOS) {
    return MOBILE_IOS_APP;
  } else if (isAndroid) {
    return MOBILE_ANDROID_APP;
  }

  return MOBILE_WEB;
};

export interface MobileDownloadButtonProps {
  buttonText: string | undefined;
}

export const MobileDownloadButton = ({
  buttonText,
}: MobileDownloadButtonProps): JSX.Element => {
  const downloadLink = downloadAppHref();

  return (
    <Button variant="primary" htmlTag="a" href={downloadLink}>
      {buttonText ? buttonText : 'Download the App'}
    </Button>
  );
};

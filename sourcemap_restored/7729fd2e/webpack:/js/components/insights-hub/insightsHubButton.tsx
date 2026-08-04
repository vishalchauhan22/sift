import { INSIGHTS_HUB_ENTRYPOINT_CLICKED } from '@js/constants/events';

import React from 'react';

import { Button, Link } from '@loomhq/lens';
import * as analytics from '@js/utilities/analytics';

import { useProfileMenu } from '../../contexts/ProfileMenuContext';

const InsightsHubButton = ({
  buttonText = 'View your insights',
  buttonSize = 'small',
  source,
  useLinkStyle = false,
}: {
  buttonText?: string;
  buttonSize?: 'small' | 'medium' | 'large';
  source?: string;
  useLinkStyle?: boolean;
}): JSX.Element | null => {
  const { setIsProfileMenuOpen, isProfileMenuOpen } = useProfileMenu();
  const onClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;

    analytics.track(INSIGHTS_HUB_ENTRYPOINT_CLICKED, {
      source,
    });

    if (!isProfileMenuOpen) {
      if (setIsProfileMenuOpen) {
        setIsProfileMenuOpen(true, target?.className, true);
      }
    }
  };

  return (
    <>
      {useLinkStyle ? (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link htmlTag="button" onClick={onClick}>
          {' '}
          {buttonText}
        </Link>
      ) : (
        <Button onClick={onClick} size={buttonSize}>
          {buttonText}
        </Button>
      )}
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default InsightsHubButton;

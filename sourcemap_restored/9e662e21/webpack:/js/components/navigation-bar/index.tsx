import { HEADER_NAV_LINK_CLICKED } from '@js/constants/events';

import { ROOT_PAGE } from '@js/constants/routes';

import classnames from 'classnames';

import { LoggedInOnly, useCurrentUserSelector } from '@js/common/current-user';
import { HelpBubble } from '@js/common/help-bubble';
import { DownloadProgressAsync as DownloadProgress } from '@js/components/download-progress/async';

import { NavigationSidebar } from '@js/components/navigation-sidebar';
import { ProfileBubb } from '@js/components/profile-bubble';
import UserAvatar from '@js/components/user-avatar';

import { ProfileMenuProvider } from '@js/contexts/ProfileMenuContext';

import React, { FC, useCallback, useMemo, useState } from 'react';

import { getAvatarThumbForUser } from '@js/utilities/avatar';
import { SignupSuccessMarkers } from '@js/utilities/rum/constants';
import { SuccessMarker } from '@js/utilities/rum/markers';
import { logoutUserWithRedirect } from '@js/utilities/user';

import { Spacer, Text } from '@loomhq/lens';
import { AUTHENTICATED_USER_ACCESS } from '@loomhq/shared-utilities/constants/scopes';

import * as analytics from '@js/utilities/analytics';

import { Logo, DropMenu, handleItems } from './component-types';
import { getItems } from './items';

import './styles.less';

const NavigationBar: FC<
  React.PropsWithChildren<{
    variant?: string;
    hideSignupButtonForGoogleIntegration?: boolean;
    hideSignupButton?: any;
  }>
> = props => {
  const { variant = 'app', hideSignupButtonForGoogleIntegration } = props;

  // Use current user selector for avatars instead of Redux state
  const avatars = useCurrentUserSelector(user => user.avatars, []);
  const avatar = getAvatarThumbForUser(avatars);

  const firstName = useCurrentUserSelector(user => user.firstName, '');
  const hasAuthenticatedAccess = useCurrentUserSelector(
    user => user.scopes.includes(AUTHENTICATED_USER_ACCESS),
    false
  );
  const onboardingCompleted = useCurrentUserSelector(
    user => (user.persona as any)?.persona_v1.complete,
    false
  );

  const [menu, setMenu] = useState(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prevState => !prevState);
  }, []);

  const handleLogoClick = useCallback(() => {
    analytics.track(HEADER_NAV_LINK_CLICKED, {
      name: 'Logo',
    });
  }, []);

  const onMenuToggle = useCallback(
    (toggledMenu: any) => () => {
      if (toggledMenu === menu) {
        setMenu(null);
      } else {
        setMenu(toggledMenu);
      }
    },
    [menu]
  );

  const onCloseMenu = useCallback(() => {
    setMenu(null);
  }, []);

  const passedDownProps = useMemo(
    () => ({
      ...props,
      variant,
      avatar,
      logoutUser: (redirect?: string) => logoutUserWithRedirect(redirect),
      toggleSidebar,
      onMenuToggle,
      menu,
    }),
    [menu, onMenuToggle, props, toggleSidebar, variant, avatar]
  );

  return (
    <header
      // FIXME: props.variant is possibly undefined and not the default of 'app' when
      // accessed in this way
      className={classnames('non__sticky__navigationBar', props.variant, {
        loggedout: !hasAuthenticatedAccess,
      })}
    >
      <div className="workify__navigationBar__wrapper">
        <DownloadProgress />
        <Logo href={ROOT_PAGE} onClick={handleLogoClick} />

        <div>
          {variant !== 'empty' && (
            <button
              aria-label="Primary navigation"
              className="navigationBar__navItem navigationBar__hamburger"
              onClick={toggleSidebar}
            />
          )}

          <ul className="navigationBar__nav">
            {hideSignupButtonForGoogleIntegration
              ? null
              : handleItems(getItems(variant), passedDownProps)}
            {hasAuthenticatedAccess && !onboardingCompleted && (
              <li className="navigationBar__navItem">
                <div className="navigationBar__navItem__welcomeAvatar">
                  {firstName && <Text>Welcome, {firstName}!</Text>}
                  <Spacer left={2} />
                  <UserAvatar />
                </div>
              </li>
            )}

            {hasAuthenticatedAccess && onboardingCompleted && (
              <li className="navigationBar__navItem">
                <div className="navigationBar__navItem__welcomeAvatar">
                  <Spacer left={2} />
                  <ProfileMenuProvider>
                    <ProfileBubb />
                  </ProfileMenuProvider>
                </div>
              </li>
            )}
          </ul>
        </div>
        <DropMenu
          items={getItems('account')}
          onClose={onCloseMenu}
          stateProps={passedDownProps}
          open={menu === 'account'}
        />
      </div>
      <NavigationSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      >
        {handleItems(getItems('mobile'), passedDownProps)}
      </NavigationSidebar>
      {hasAuthenticatedAccess && onboardingCompleted && (
        <LoggedInOnly>
          <HelpBubble />
        </LoggedInOnly>
      )}
      <SuccessMarker name={SignupSuccessMarkers.Navigation} />
    </header>
  );
};

// eslint-disable-next-line import/no-default-export
export default NavigationBar;

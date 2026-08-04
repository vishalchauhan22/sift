import {
  ANON_NAV_LOGIN_PAGE_CLICKED,
  GET_LOOM_CTA_CLICK,
} from '@js/constants/events';

import SignupButton from '@js/common/signup-button';
import LoginButton from '@js/components/login-button';
import React from 'react';

import { Arrange, IconButton, Spacer } from '@loomhq/lens';
import { SvgMenu } from '@loomhq/lens/icons/menu';

import HeaderPortalDestination from '@js/components/layout/header/portal-destination';

import styles from './styles.module.less';

type AnonymousHeaderProps = {
  setNavBarIsOpenMobile: () => void;
};

export const AnonymousHeader = ({
  setNavBarIsOpenMobile,
}: AnonymousHeaderProps): JSX.Element => {
  return (
    <header className={styles.header}>
      <div className={styles.mobileMenu}>
        <Spacer right="medium">
          <IconButton
            altText="Toggle library navigation"
            icon={<SvgMenu />}
            onClick={() => setNavBarIsOpenMobile()}
          />
        </Spacer>
      </div>
      <div className="md:hidden">
        <HeaderPortalDestination />
      </div>
      <Spacer right="medium" />
      <Arrange justifyContent="space-between" gap="medium">
        <LoginButton
          size="medium"
          redirect={window.location.href}
          tracking={{
            eventName: ANON_NAV_LOGIN_PAGE_CLICKED,
            properties: {
              source: 'layout-header',
            },
          }}
        />
        <SignupButton
          size="medium"
          tracking={{
            eventName: GET_LOOM_CTA_CLICK,
            properties: {
              source: 'layout-header',
            },
          }}
        />
      </Arrange>
    </header>
  );
};

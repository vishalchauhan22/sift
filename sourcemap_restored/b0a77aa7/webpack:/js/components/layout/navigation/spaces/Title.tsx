import cn from 'classnames';

import React from 'react';

import { Arrange, Icon, Text } from '@loomhq/lens';
import { SvgAdd } from '@loomhq/lens/icons/add';

import MenuLink from '../MenuLink';
import styles from '../styles.module.less';
import ExpandedSidebarCreateSpaceButton from './ExpandedSidebarCreateSpaceButton';

const SidebarTitle = ({
  isCollapsed,
  isMobile,
  navBarIsOpenMobile,
  createNewSpace,
  isFtux,
}: {
  isCollapsed: boolean;
  isMobile: boolean;
  navBarIsOpenMobile: boolean;
  createNewSpace: () => void;
  isFtux?: boolean;
}): JSX.Element => {
  if (isCollapsed) {
    return (
      <MenuLink
        icon={
          <div className="px:xsmall">
            <Icon size="medium" icon={<SvgAdd />} color="currentColor" />
          </div>
        }
        title="Create a Space"
        collapsed={isCollapsed}
        isMobileCollapsedNav={isMobile && !navBarIsOpenMobile}
        isReactRouterLink
        shouldDim={true}
        onClick={createNewSpace}
      />
    );
  }

  return (
    <div
      className={cn(styles.librariesHeading, 'pb:small pl:xsmall pr:xsmall')}
    >
      <Arrange justifyContent="space-between">
        <Arrange gap="xsmall" alignItems="baseline">
          <Text htmlTag="h2" fontWeight="bold" color="bodyDimmed">
            Spaces
          </Text>
        </Arrange>
        <ExpandedSidebarCreateSpaceButton
          createNewSpace={createNewSpace}
          isFtux={isFtux}
        />
      </Arrange>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default SidebarTitle;

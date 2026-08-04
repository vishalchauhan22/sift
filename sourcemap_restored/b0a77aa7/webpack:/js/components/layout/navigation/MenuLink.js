/* eslint-disable @loomhq/loom/no-js-extension */
import { INCENTIVES_PAGE } from '@js/constants/routes';

import cn from 'classnames';
import { DestinationContext } from '@js/common/context';
import React, { forwardRef, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  Align,
  Arrange,
  Container,
  Icon,
  Spacer,
  Pill,
  Text,
  Tooltip,
} from '@loomhq/lens';

import { FadeRoot, FadeText } from './FadeText';

import styles from './styles.module.less';

const MenuIcon = ({ collapsed, icon, count, showNotificationDot }) => {
  return (
    <>
      {collapsed && count > 0 && showNotificationDot && (
        <div className={styles.bubble}>
          <Container backgroundColor="record" height="small" width="small" />
        </div>
      )}
      <Icon icon={icon} color="currentColor" />
    </>
  );
};

const MenuItem = ({
  title,
  icon,
  collapsed,
  count,
  countColorScheme,
  showNotificationDot,
  actionElement,
  rightIcon,
  isBeta,
  isNew,
  ftuxComponent = null,
}) => (
  <Arrange justifyContent="space-between">
    <FadeRoot className={styles.menuItemInner}>
      {icon && (
        <MenuIcon
          icon={icon}
          count={count}
          collapsed={collapsed}
          showNotificationDot={showNotificationDot}
        />
      )}
      <Spacer right="small" />
      <FadeText visible={!collapsed}>
        <Text className={styles.linkTitle} hasEllipsis>
          {title}
        </Text>
      </FadeText>
      {rightIcon && (
        <Container
          width="18px"
          height="18px"
          paddingLeft="4px"
          paddingBottom="2px"
        >
          {rightIcon}
        </Container>
      )}
    </FadeRoot>

    {!collapsed && isBeta && (
      <Pill color="blurple" backgroundColor="highlight">
        Beta
      </Pill>
    )}

    {!collapsed && isNew && (
      <Pill color="blurple" backgroundColor="blurpleLight">
        New
      </Pill>
    )}

    {!collapsed && count > 0 && (
      <div className={styles.count}>
        <Container
          backgroundColor={countColorScheme?.containerColor || 'record'}
          minWidth="large"
          height="large"
          paddingX="small"
        >
          <Align alignment="center">
            <Text
              color={countColorScheme?.textColor || 'white'}
              fontWeight="bold"
            >
              {count >= 99 ? '99+' : count}
            </Text>
          </Align>
        </Container>
      </div>
    )}
    {ftuxComponent && !collapsed && ftuxComponent}
    {!collapsed && actionElement}
  </Arrange>
);

const MenuContent = props => {
  const {
    url,
    isParent,
    isReactRouterLink,
    ref,
    shouldShowFTUXTooltip,
    shouldDim,
    className,
    onClick,
    openNewTab,
  } = props;
  const isInDestinationRoute = useContext(DestinationContext);
  const location = useLocation();

  const linkProps = (url, isParent) => {
    const isActive = !isParent
      ? (location.pathname + '/').startsWith(url + '/')
      : false;

    return {
      ref,
      className: cn(
        styles.menuItem,
        shouldShowFTUXTooltip && styles.hasFTUXTooltip,
        shouldDim && styles.shouldDim,
        className,
        url === INCENTIVES_PAGE && styles.incentivesLink
      ),
      'aria-current': isActive ? 'page' : undefined,
      onClick,
      target: openNewTab === true ? '_blank' : null,
    };
  };

  if (!url) {
    return (
      <div {...linkProps(url, isParent)}>
        <MenuItem {...props} />
      </div>
    );
  }

  return isReactRouterLink && isInDestinationRoute ? (
    <Link {...linkProps(url, isParent)} to={url}>
      <MenuItem {...props} />
    </Link>
  ) : (
    <a {...linkProps(url, isParent)} href={url}>
      <MenuItem {...props} />
    </a>
  );
};

/**
 * TODO: Convert this file to TypeScript to add better types.
 * @type {React.FC<any>}
 */
const MenuLink = forwardRef((props, ref) => {
  const { menuChildItems, url, title, collapsed } = props;
  const location = useLocation();
  const isParent = Boolean(menuChildItems && menuChildItems.length);
  const showMenuChildItems = (location.pathname + '/').startsWith(url + '/');

  return (
    <>
      <Tooltip
        content={collapsed ? title : null}
        isInline={false}
        placement="rightCenter"
        tabIndex={-1}
      >
        <MenuContent isParent={isParent} ref={ref} {...props} />
      </Tooltip>
      {showMenuChildItems &&
        menuChildItems &&
        menuChildItems.map(item => (
          <Tooltip
            content={collapsed ? item.title : null}
            isInline={false}
            placement="rightCenter"
            key={`submenu-${item.title}`}
            tabIndex={-1}
          >
            <MenuContent
              {...props}
              url={item.url}
              title={item.title}
              onClick={item.onClick}
              isParent={false}
              icon={<div className={cn(styles.vl)}></div>}
            />
          </Tooltip>
        ))}
    </>
  );
});

MenuLink.displayName = 'MenuLink';

// eslint-disable-next-line import/no-default-export
export default MenuLink;

/* eslint-disable @loomhq/loom/no-js-extension */
import classnames from 'classnames';
import React, { useRef } from 'react';

import {
  Button as LensButton,
  Icon,
  Logo as LoomLogo,
  Spacer,
  useOnClickOutside,
} from '@loomhq/lens';
import { SvgSearch } from '@loomhq/lens/icons/search';

import HeaderPortalDestination from '@js/components/layout/header/portal-destination';

import { getItems } from './items';

import { useBrandColor } from '@js/hooks/experiments/useBrandColor';

const Cta = props => (
  <a href={props.href}>
    <span className="gradient-text">{props.title}</span>
  </a>
);

const Link = ({ item, onClick }) => {
  const isActive = window.location.pathname.includes(item.href);
  const className = isActive ? 'is-active' : '';

  return (
    <a
      href={item.href}
      title={item.title}
      className={className}
      onClick={onClick}
    >
      {item.title}
    </a>
  );
};

const Jobs = ({ item }) => {
  const isActive = window.location.pathname.includes('careers');
  const className = isActive ? 'is-active' : '';

  return (
    <a href={item.href} title={item.title} className={className}>
      {item.title}
    </a>
  );
};

const Button = ({ item, onClick }) => {
  const useMarketingBrand = useBrandColor();

  return (
    <LensButton
      htmlTag="a"
      href={item.href}
      onClick={onClick}
      variant="primary"
      size={useMarketingBrand ? 'large' : 'medium'}
    >
      {item.title}
    </LensButton>
  );
};

export const Logo = props => {
  return (
    <a href={props.href} onClick={props.onClick} id="loggedOutSharePageLogo">
      <LoomLogo maxWidth={props.maxWidth} brand={props.brand} />
      <p className="srOnly">Loom</p>
    </a>
  );
};

const More = props => {
  const name = (props.item && props.item.name) || 'more';

  return (
    <React.Fragment>
      {/* TODO(next author): Either convert anchor into <button> if the onClick is an action or appropriately map a href and add text between the anchor tags if it's a link so that we are following semantic, accessible practices. */}
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <a className="navigationBar__more" onClick={props.onMenuToggle(name)}>
        More
      </a>
      {
        <DropMenu
          className="contained"
          items={getItems(name)}
          stateProps={props}
          onClose={props.onMenuToggle(null)}
          open={props.menu === name}
        />
      }
    </React.Fragment>
  );
};

const Avatar = props => (
  <React.Fragment>
    {/* TODO(next author): Either convert anchor into <button> if the onClick is an action or appropriately map a href if it's a link so that we are following semantic, accessible practices. */}
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
    <a onClick={props.onMenuToggle('account')}>
      &nbsp;
      {/* // eslint-disable-next-line jsx-a11y/alt-text */}
      <img src={props.avatar} alt="" className="navigationBar__avatar" />
    </a>
  </React.Fragment>
);

const SignOut = props => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <a onClick={props.onSignOut} className="alert">
    Sign out
  </a>
);

const WithCallBack = ({ item, onClick }) => (
  /* TODO(next author): TODO(next author): Either convert anchor into <button> if the onClick is an action or appropriately map a href and add text between the anchor tags if it's a link so that we are following semantic, accessible practices. */
  /* eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
  <a onClick={onClick}>{item.title}</a>
);

const Search = ({ onClick }) => (
  /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable */
  <div className="navigationBar__navItem__search" onClick={onClick}>
    <Icon icon={<SvgSearch />} />
    <Spacer left={1}>Search</Spacer>
  </div>
);

// targets with this classes own the menu
// dismiss clicks coming from these elements
const MENU_TRIGGER_CLASSES = ['navigationBar__avatar', 'navigationBar__more'];

export const DropMenu = props => {
  const { className, onClose, open, items, stateProps } = props;
  const classNames = classnames('navigationBar__menu', className, { open });
  const menuRef = useRef();

  const handleClickOutside = e => {
    if (!open || MENU_TRIGGER_CLASSES.includes(e.target.className)) {
      return;
    }

    onClose();
  };

  useOnClickOutside(menuRef, handleClickOutside);

  return (
    <ul ref={menuRef} className={classNames}>
      {handleItems(items, stateProps, null)}
    </ul>
  );
};

export const handleItems = (
  items,
  stateProps,
  className = 'navigationBar__navItem'
) => {
  return items
    .map(item => {
      const isValid = !item.validate || item.validate(stateProps);
      const Item = componentTypes(item.type);
      const key = item.name;
      const props = item.additionalProps
        ? item.additionalProps(stateProps)
        : {};
      const classNames = item.classNames
        ? item.classNames(stateProps)
        : undefined;

      if (!Item || !isValid) {
        return;
      }

      return (
        <li
          className={classnames(className, classNames)}
          key={key}
          id={item.id}
        >
          <Item item={item} {...props} />
        </li>
      );
    })
    .filter(Boolean);
};

const TYPES = {
  cta: Cta,
  link: Link,
  signout: SignOut,
  jobs: Jobs,
  button: Button,
  more: More,
  avatar: Avatar,
  help: WithCallBack,
  search: Search,
  portal: HeaderPortalDestination,
};

const componentTypes = type => TYPES[type] || Link;

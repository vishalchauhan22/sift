/* eslint-disable @loomhq/loom/no-js-extension */
import {
  GET_LOOM_CTA_CLICK,
  NAV_LINK_ABOUT_US_CLICKED,
  NAV_LINK_PRICING_CLICKED,
  NAV_LINK_WAYS_TO_USE_LOOM_CLICKED,
} from '@js/constants/events';
import {
  ACCOUNT_SETTINGS,
  BLOG_URI,
  CAREERS,
  COMPANY,
  DESKTOP,
  LOGIN_PAGE,
  MOBILE_PAGE_URI,
  MY_VIDEOS_PAGE,
  PRICING,
  SIGNUP_PAGE,
  USE_CASES,
} from '@js/constants/routes';

import * as analytics from '@js/utilities/analytics';

import { getUserAuthentication } from './getUserAuthentication';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';

const isAppVariant = variant => variant === 'app';
const isNotLoggedInAppVariant = (variant, hasAuthenticatedAccess) =>
  (isAppVariant(variant) && !hasAuthenticatedAccess) || !isAppVariant(variant);

const NAVIGATION_ITEM_TYPES = [
  {
    name: 'use-cases',
    type: 'link',
    title: 'Ways to use Loom',
    href: USE_CASES,
    validate: props =>
      isNotLoggedInAppVariant(props.variant, props.hasAuthenticatedAccess),
    additionalProps() {
      return {
        onClick: e => {
          e.preventDefault();
          analytics.track(NAV_LINK_WAYS_TO_USE_LOOM_CLICKED);

          document.location.href = USE_CASES;
        },
      };
    },
  },
  {
    name: 'mobile',
    type: 'link',
    title: 'iOS App',
    href: MOBILE_PAGE_URI,
    validate: props => !props.hasAuthenticatedAccess,
  },
  {
    name: 'pricing',
    type: 'link',
    title: 'Pricing',
    href: PRICING,
    dropdown: false,
    validate: props =>
      isNotLoggedInAppVariant(props.variant, props.hasAuthenticatedAccess),
    additionalProps() {
      return {
        onClick: e => {
          e.preventDefault();
          analytics.track(NAV_LINK_PRICING_CLICKED);

          document.location.href = PRICING;
        },
      };
    },
  },
  {
    name: 'my-videos',
    type: 'link',
    title: 'Personal Library',
    href: MY_VIDEOS_PAGE,
    dropdown: false,
    validate: props => props.hasAuthenticatedAccess,
  },
  {
    name: 'blog',
    type: 'link',
    title: 'Loom Blog',
    href: BLOG_URI,
    dropdown: true,
    validate: props =>
      !isAppVariant(props.variant) || props.hasAuthenticatedAccess,
  },
  {
    name: 'desktop',
    type: 'link',
    title: 'Desktop App',
    href: DESKTOP,
    dropdown: true,
    validate: props =>
      !isAppVariant(props.variant) || props.hasAuthenticatedAccess,
  },
  {
    name: 'jobs',
    type: 'jobs',
    title: 'Careers',
    counter: 4,
    href: CAREERS,
    validate: props =>
      !isAppVariant(props.variant) || props.hasAuthenticatedAccess,
  },
  {
    name: 'sign-in',
    type: 'link',
    title: 'Sign in',
    href: LOGIN_PAGE,
    dropdown: false,
    validate: props => !props.hasAuthenticatedAccess,
  },
  {
    name: 'portal',
    type: 'portal',
    dropdown: false,
    validate: props => !props.hasAuthenticatedAccess,
    classNames() {
      return 'portal-destination-container';
    },
  },
  {
    name: 'get-loom',
    type: 'button',
    title: 'Get Loom for Free',
    href: SIGNUP_PAGE,
    dropdown: false,
    validate: props => !props.hasAuthenticatedAccess,
    id: 'signedOutGetLoomForFree',
    classNames() {
      return 'with-button';
    },
    additionalProps({ video }) {
      return {
        onClick: e => {
          e.preventDefault();

          analytics.track(GET_LOOM_CTA_CLICK, {
            source: 'Signed out nav header',
            ...withIdentifiers(
              GET_LOOM_CTA_CLICK,
              AnalyticsEntityId.video(video?.id, 'videoId')
            ),
          });

          document.location.href = SIGNUP_PAGE;
        },
      };
    },
  },
  {
    name: 'sign-up',
    type: 'button',
    title: 'Sign up for free',
    href: SIGNUP_PAGE + window.location.search,
    dropdown: false,
    validate: props => !props.hasAuthenticatedAccess,
    classNames() {
      return 'with-button';
    },
  },
  {
    name: 'get-loom-mobile',
    type: 'cta',
    validate: props => !props.hasAuthenticatedAccess,
    classNames() {
      return 'with-button';
    },
    additionalProps() {
      return { href: SIGNUP_PAGE, title: 'Get Loom for Free' };
    },
  },
  {
    name: 'loom-pro',
    type: 'cta',
    title: 'Get Loom for Free',
    href: '#',
    dropdown: false,
    validate(props) {
      return props.hasAuthenticatedAccess;
    },
    additionalProps(props) {
      const { isTrialUser, isFreeUser } = props;
      const href = PRICING;
      const title = isTrialUser ? 'Upgrade to Pro' : 'Explore Loom Pro';

      return { isFreeUser, isTrialUser, href, title };
    },
  },
  {
    name: 'more',
    type: 'more',
    title: 'More',
    validate(props) {
      return props.hasAuthenticatedAccess;
    },
    additionalProps(props) {
      const { menu, onMenuToggle, stateProps } = props;

      return { menu, onMenuToggle, stateProps };
    },
  },
  {
    name: 'more_dash_nav_test',
    type: 'more',
    title: 'More',
    validate(props) {
      return props.hasAuthenticatedAccess;
    },
    additionalProps(props) {
      const { menu, onMenuToggle, stateProps } = props;

      return { menu, onMenuToggle, stateProps };
    },
  },
  {
    name: 'account-settings',
    title: 'Account Settings',
    href: ACCOUNT_SETTINGS,
    validate(props) {
      return props.hasAuthenticatedAccess;
    },
  },
  {
    name: 'help',
    type: 'help',
    title: 'Help',
    dropdown: true,
    validate: props =>
      window['_elev'] &&
      (!isAppVariant(props.variant) || props.hasAuthenticatedAccess),
    additionalProps(props) {
      return {
        onClick: () => {
          props.onMenuToggle('more')();
        },
      };
    },
  },
  {
    name: 'tour',
    type: 'tour',
    validate(props) {
      return props.hasAuthenticatedAccess && props.showQuickStartButton;
    },
    classNames() {
      return 'with-narrow-spacing';
    },
  },
  {
    name: 'avatar',
    type: 'avatar',
    validate(props) {
      return props.hasAuthenticatedAccess;
    },
    additionalProps(props) {
      const { onMenuToggle, avatar } = props;

      return { onMenuToggle, avatar };
    },
    classNames() {
      return 'with-avatar';
    },
  },
  {
    name: 'sign-out',
    type: 'signout',
    title: 'Sign out',
    validate(props) {
      return props.hasAuthenticatedAccess;
    },
    additionalProps(props) {
      return { onSignOut: props.logoutUser };
    },
  },
  {
    name: 'about-us',
    type: 'link',
    title: 'About us',
    href: COMPANY,
    validate: props =>
      isNotLoggedInAppVariant(props.variant, props.hasAuthenticatedAccess),
    additionalProps() {
      return {
        onClick: e => {
          e.preventDefault();
          analytics.track(NAV_LINK_ABOUT_US_CLICKED);

          document.location.href = COMPANY;
        },
      };
    },
  },
];

const userAuthentication = getUserAuthentication();

const NAVIGATION_ITEMS = {
  marketing: [
    userAuthentication && 'use-cases',
    userAuthentication && 'pricing',
    'my-videos',
    'jobs',
    'mobile',
    'login',
    'avatar',
    'get-loom',
  ],
  app: [
    'portal',
    userAuthentication && 'use-cases',
    userAuthentication && 'about-us',
    userAuthentication && 'pricing',
    'my-videos',
    'more',
    'tour',
    'avatar',
    'login',
    userAuthentication && 'get-loom',
  ],
  app_dash_nav_test: [
    'pricing',
    'my-videos',
    'more_dash_nav_test',
    'tour',
    'avatar',
    userAuthentication && 'login',
    userAuthentication && 'get-loom',
  ],
  account: ['loom-pro', 'account-settings', 'sign-out'],
  mobile: [
    'loom-pro',
    userAuthentication && 'get-loom-mobile',
    'my-videos',
    'account-settings',
    userAuthentication && 'use-cases',
    userAuthentication && 'about-us',
    userAuthentication && 'pricing',
    'blog',
    'desktop',
    'jobs',
    'sign-out',
    userAuthentication && 'login',
  ],
  more: ['use-cases', 'blog', 'jobs', 'desktop', 'help'],
  more_dash_nav_test: ['blog', 'jobs', 'desktop', 'help'],
  welcome: ['avatar'],
  empty: [],
  signup: ['sign-up'],
  admin: ['avatar'],
};

const findByName = type =>
  NAVIGATION_ITEM_TYPES.find(item => item.name === type);

export const getItems = type => {
  const items = NAVIGATION_ITEMS[type] || NAVIGATION_ITEMS.app;

  return items.map(findByName).filter(Boolean);
};

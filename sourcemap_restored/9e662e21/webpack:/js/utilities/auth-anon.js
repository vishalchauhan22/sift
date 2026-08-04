/* eslint-disable @loomhq/loom/no-js-extension */

import cookie from 'cookie';

import {
  KEY_ANON_COMMENT,
  KEY_ANON_COMMENT_NAME,
} from '@loomhq/shared-utilities/constants/cookie';

import { getCookie } from './cookieUtils';

export const getAnonUserNameFromCookie = () => {
  const anonCommentNameCookie = getCookie(KEY_ANON_COMMENT_NAME);

  return anonCommentNameCookie || '';
};

export const getAnonUserId = () => {
  const anonCommentCookie = getCookie(KEY_ANON_COMMENT);

  return anonCommentCookie || '';
};

export const setAnonUserNameInCookie = value => {
  const anonCommentName = cookie.serialize(KEY_ANON_COMMENT_NAME, value);

  document.cookie = anonCommentName;
};

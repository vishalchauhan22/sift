import { LibraryType } from '@loomhq/shared-utilities/constants/loomsPage';
import {
  QUERY_ALL,
  QUERY_COMMENT,
  QUERY_SHARED,
} from '@loomhq/shared-utilities/constants/notifications';
type NotificationConfig = {
  text: string;
  path: string;
  type: string;
  libraryType: LibraryType;
  primary_nav_item: string;
  secondary_nav_item: string;
};

export const ALL_NOTIFICATIONS = {
  text: 'Overview',
  path: 'all',
  type: QUERY_ALL,
  libraryType: LibraryType.NOTIFICATIONS_ALL,
  primary_nav_item: 'notifications',
  secondary_nav_item: 'overview',
};

export const COMMENTS_NOTIFICATIONS = {
  text: 'Comments',
  path: 'comments',
  type: QUERY_COMMENT,
  libraryType: LibraryType.NOTIFICATIONS_COMMENT,
  primary_nav_item: 'notifications',
  secondary_nav_item: 'comments',
};

export const SHARED_WITH_ME_NOTIFICATIONS = {
  text: 'Shared with me',
  path: 'shared',
  type: QUERY_SHARED,
  libraryType: LibraryType.NOTIFICATIONS_SHARED,
  primary_nav_item: 'notifications',
  secondary_nav_item: 'shared_with_me',
};

export const NOTIFICATIONS_CONFIG: NotificationConfig[] = [
  ALL_NOTIFICATIONS,
  SHARED_WITH_ME_NOTIFICATIONS,
  COMMENTS_NOTIFICATIONS,
];

export const SETTINGS = {
  text: 'Settings',
  path: 'settings',
  primary_nav_item: 'notifications',
  secondary_nav_item: 'settings',
};

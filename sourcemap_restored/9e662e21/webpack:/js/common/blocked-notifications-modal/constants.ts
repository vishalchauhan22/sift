import chromeBlockedNotificationsImgSrc from '@assets/img/notifications/chrome-notifications-blocked.png';
import edgeBlockedNotificationsImgSrc from '@assets/img/notifications/edge-notifications-blocked.png';
import firefoxBlockedNotificationsImgSrc from '@assets/img/notifications/firefox-notifications-blocked.png';
import safariBlockedNotificationsImgSrc from '@assets/img/notifications/safari-notifications-blocked.png';

// Events
export const BLOCKED_NOTIFICATIONS_PROMPT_SHOWN =
  'Blocked Notifications Prompt Shown';
export const BLOCKED_NOTIFICATIONS_PROMPT_DISMISSED =
  'Blocked Notifications Prompt Dismissed';

export const BLOCKED_MODAL_ID = 'block-noties-modal';

type CopyAndImages = {
  [key: string]: {
    content: string;
    alt?: string;
    imgSrc?: string;
  };
};

// Copy and images
export const COPY_AND_IMAGES: CopyAndImages = {
  Chrome: {
    content: `Click on the settings icon to the left of the address bar. Under Notifications, select “Allow” in the dropdown.`,
    alt: 'Chrome blocked notifications prompt showing the dropdown for notifications with Ask, Allow, and Block options. Block options is checked',
    imgSrc: chromeBlockedNotificationsImgSrc,
  },
  Firefox: {
    content: `Click on the lock to the left of the address bar. In the drop down, click X to the right of Send Notifications “Blocked”.`,
    alt: 'Firefox site information for security and permissions showing Send Notifications marked as Blocked with an X to its right.',
    imgSrc: firefoxBlockedNotificationsImgSrc,
  },
  Edge: {
    content: `Click on the lock to the left of the address bar. Select “Allow” in the Notifications dropdown.`,
    alt: 'Edge site connection and tracking information with Notifications set to Blocked',
    imgSrc: edgeBlockedNotificationsImgSrc,
  },
  Safari: {
    content: `Open Safari browser preferences. Navigate to Websites in the top bar menu. Select “Allow” in the "www.loom.com" dropdown.`,
    alt: 'Safari Websites settings with www.loom.com and Deny checked under dropdown',
    imgSrc: safariBlockedNotificationsImgSrc,
  },
  default: {
    content:
      'Please update your browser permissions to allow push notifications for the domain "www.loom.com"',
  },
};

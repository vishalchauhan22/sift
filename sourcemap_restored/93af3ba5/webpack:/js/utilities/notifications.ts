import { LOOM_URI } from '@js/constants/routes';
import { PUSH_SERVER_PUBLIC_KEY } from '@js/constants/runtimeConfig';

import { isPushable } from '@js/utilities/device';
import fetch from '@js/utilities/fetch';

import {
  INVALID_SUBSCRIPTION_ERROR,
  PERMISSION_DENIED,
  READ,
} from '@loomhq/shared-utilities/constants/notifications';
import * as analytics from '@js/utilities/analytics';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from './analytics/attribute-transformer';

// register and install the service worker onto the client
// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const registerSW = async (): Promise<boolean> => {
  // register service worker for push notifications
  if (isPushable) {
    // we need to scope it to the root directory sincen that way the sw
    // can listen to events sent down by the server to any route
    // /sw.js maps to assets/js/ServiceWorker.js, tnx kraken

    await navigator.serviceWorker.register('/sw.js', { scope: '/' });
  } else {
    return Promise.resolve(false);
  }

  return Promise.resolve(true);
};

// subscribe user to 3rd party push service
export const subscribePush = async (): Promise<PushSubscription | null> => {
  const registration = await navigator.serviceWorker.ready;
  const subscribeOptions = {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUSH_SERVER_PUBLIC_KEY),
  };

  let pushSubscription: PushSubscription | null = null;

  try {
    pushSubscription =
      await registration.pushManager.subscribe(subscribeOptions);
  } catch (err) {
    if (err.name === INVALID_SUBSCRIPTION_ERROR) {
      const curr = await registration.pushManager.getSubscription();

      await curr?.unsubscribe();
      pushSubscription =
        await registration.pushManager.subscribe(subscribeOptions);
    } else {
      throw err;
    }
  }

  return pushSubscription;
};

const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    // eslint-disable-next-line no-useless-escape
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};

/**
 * Asking for push permissions from user
 * Note on janky code: The permissions api was recently changed froma  callback
 * based request to a Promise based api. Since it's hard to know which one the
 * browser is using we account for both.
 * Refer: https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission
 */
export const askPermission = (): Promise<NotificationPermission> => {
  return new Promise<NotificationPermission>((resolve, reject) => {
    const permissionResult = Notification.requestPermission(result => {
      resolve(result);
    });

    if (permissionResult && permissionResult.then) {
      permissionResult.then(resolve).catch(reject);
    }
  }).then(permissionResult => {
    return permissionResult;
  });
};

export const getNotificationPermissionState = (): Promise<PermissionState> => {
  if (!window.Notification) {
    return Promise.resolve(PERMISSION_DENIED);
  }

  if (navigator.permissions) {
    return navigator.permissions
      .query({ name: 'notifications' })
      .then(result => {
        return result.state;
      });
  }

  return new Promise(resolve => {
    resolve(Notification.permission as PermissionState);
  });
};

export const removeNonRootScopedServiceWorkers = async (): Promise<void> => {
  if (isPushable) {
    const registrations = await navigator.serviceWorker.getRegistrations();

    registrations.forEach(registration => {
      if (registration.scope !== `${LOOM_URI}/`) {
        registration.unregister();
      }
    });
  }

  return;
};

export const processPushEventData = (data: {
  event: string;
  notif_id: string;
}): void => {
  analytics.track(data.event, {
    ...data,
    ...withIdentifiers(
      'processPushEventData',
      AnalyticsEntityId.notification(data.notif_id, 'string', 'notif_id')
    ),
  });

  if (data.notif_id) {
    fetch(`/v1/notifications/${data.notif_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: READ }),
    });
  }
};

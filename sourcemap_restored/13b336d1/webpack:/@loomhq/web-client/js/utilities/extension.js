/* eslint-disable @loomhq/loom/no-js-extension */

import { EXTENSION_INSTALL_CLICKED } from '@js/constants/events';
import * as ids from '@js/constants/ids';
import * as routes from '@js/constants/routes';

import _defer from 'lodash/defer';
import _each from 'lodash/each';

import * as device from '@js/utilities/device';

import { DOMHooks } from '@loomhq/enums';
import * as analytics from '@js/utilities/analytics';

export const canRunExtension = !device.isMobile && device.isChrome;

const INITIATE_LOOM_RECORDER_FROM_SCRIPT = 'initiate-loom-recorder-from-script';
const USER_LOGIN = 'user-login';

function _loadInstallImage(extID, success, err) {
  const img = new Image();

  img.onerror = err;
  img.onload = success;
  img.src = `chrome-extension://${extID}/img/installed.jpg`;
}

export const isInstalled = (function () {
  let installed = null;

  const cbs = [];

  function _sendCbs() {
    _each(cbs, cb => {
      cb(installed);
    });
  }

  function _success() {
    installed = true;
    _sendCbs();
  }

  function _fail() {
    installed = false;
    _sendCbs();
  }

  function checkIfInstalled() {
    if (!canRunExtension) {
      return _fail();
    }

    _loadInstallImage(ids.CHROME_EXTENSION_ID, _success, _fail);
  }

  checkIfInstalled();

  return cb => {
    checkIfInstalled();

    if (installed == null) {
      return cbs.push(cb);
    }

    cb(installed);
  };
})();

let installedInterval = null;

const clearInstalledInterval = () => {
  clearInterval(installedInterval);
};

export const inlineInstall = (source = 'source-missing', callback) => {
  window.open(routes.CHROME_EXT_WEBSTORE_URL, '_blank');

  analytics.track(EXTENSION_INSTALL_CLICKED, {
    source,
    url: window.location.href,
  });

  const onSuccessInstall = didInstall => {
    if (!didInstall) {
      return;
    }

    clearInstalledInterval();
    callback && callback();
  };

  if (callback) {
    installedInterval = setInterval(() => {
      isInstalled(onSuccessInstall);
    }, 3000);
  }
};

export const signalExtensionLogin = cb => {
  if (!device.isChrome) {
    return cb && cb();
  }

  isInstalled(installed => {
    _defer(cb);

    if (!installed) {
      return;
    }

    chrome.runtime.sendMessage(ids.CHROME_EXTENSION_ID, {
      type: USER_LOGIN,
    });
  });
};

export const isAlreadyLaunched = cb => {
  const findOverlay = () =>
    document
      .querySelector(`#${DOMHooks.ContentContainer} ${DOMHooks.Shadow}`)
      ?.shadowRoot?.querySelector(`.${DOMHooks.PreRecordingOverlay}`);

  const observer = new MutationObserver(() => {
    const result = findOverlay();

    if (result) {
      cb && cb(true);
    }
  });

  observer.observe(document, {
    subtree: true,
    childList: true,
  });

  setTimeout(() => {
    const result = findOverlay();

    cb && cb(Boolean(result));
  }, 500);
};

// cb should deal with success/failure
export const requestExtensionOpenIfInstalled = (source, cb) => {
  if (!device.isChrome) {
    return cb(false);
  }

  isInstalled(installed => {
    if (!installed) {
      return cb && cb(false);
    }

    isAlreadyLaunched(isLaunched => {
      if (!isLaunched) {
        chrome.runtime.sendMessage(ids.CHROME_EXTENSION_ID, {
          type: INITIATE_LOOM_RECORDER_FROM_SCRIPT,
          source,
        });
      }

      cb && cb(true);
    });
  });
};

export const openExtensionIfInstalled = (source, shouldLaunchTutorial, cb) => {
  if (!device.isChrome) {
    return cb(false);
  }

  isInstalled(installed => {
    if (!installed) {
      return cb && cb(false);
    }

    chrome.runtime.sendMessage(ids.CHROME_EXTENSION_ID, {
      type: INITIATE_LOOM_RECORDER_FROM_SCRIPT,
      source,
      shouldLaunchTutorial,
    });

    return cb && cb(true);
  });
};

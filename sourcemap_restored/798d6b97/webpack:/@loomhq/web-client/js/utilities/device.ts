import Bowser from 'bowser';

import { validateUtils } from '@loomhq/shared-utilities';

import { APP_SOURCE_MAP } from '@loomhq/shared-utilities/constants/analytics';

const { validateIsSlackDesktop } = validateUtils;

const isChromium = Boolean((window as any).chrome);

const isSafari = Boolean((window as any).safari);

const winNav = window.navigator;

const platform = winNav.platform;

const vendorName = winNav.vendor;

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
const isFirefoxIOS = winNav.userAgent.match(/FxiOS/i);

const isFirefox =
  winNav.userAgent.toLowerCase().indexOf('firefox') > -1 || isFirefoxIOS; // firefox iOS

const isOpera = winNav.userAgent.indexOf('OPR') > -1;

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
const isIEedge = winNav.userAgent.indexOf('Edge') > -1;

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
const isIE =
  winNav.userAgent.indexOf('Trident') > -1 || // IE 8-11
  winNav.userAgent.indexOf('MSIE') > -1; // IE < 8

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
const isEdgeIOS = Boolean(winNav.userAgent.match('EdgiOS'));

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
const isIOSChrome = Boolean(winNav.userAgent.match('CriOS'));

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
const isIOS = winNav.userAgent.match(/ipad|ipod|iphone/i);

const isWebkit = winNav.userAgent.match(/WebKit/i);

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
const isIOSWebkit = isIOS && isWebkit;

const isLinux = platform.toLowerCase().indexOf('linux') > -1;

const isMac = platform.toLowerCase().indexOf('mac') > -1;

const isWindows = platform.toLowerCase().indexOf('win') > -1;

const isAndroid = winNav.userAgent.match(/android/i);

const isElectron = window.navigator.userAgent
  .toLowerCase()
  .includes('electron/');

// https://stackoverflow.com/a/13348618
const isChrome =
  isIOSChrome ||
  (isChromium !== null &&
    typeof isChromium !== 'undefined' &&
    vendorName === 'Google Inc.' &&
    isOpera === false &&
    isIEedge === false);

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
const isIEorEdge = isIE || isIEedge;
// The existing window.safari check defined in isSafari doesn't work inside iframes, so instead we have a more robust check here.
// See https://github.com/loomhq/loom/pull/21758 for more context.
// TODO (COR-1425): Decide if this is worth replacing the existing isSafari check with, and replace it
const iframeSafeIsSafari =
  isSafari || (isWebkit && !isChrome && !isIEedge && !isOpera);
const isPushable = 'serviceWorker' in winNav && 'PushManager' in window;
const isMobile = (function () {
  let check = false;

  /* eslint-disable */
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || (window as any).opera);
  /* eslint-disable */

  return Boolean(check || isIOSChrome);
})();

const ua = navigator.userAgent || navigator.vendor || (window as any).opera;

const isMobileAdBrowser = Boolean(
  ua.indexOf('FBAN') > -1 ||
    ua.indexOf('FBAV') > -1 ||
    ua.indexOf('LinkedIn') > -1 ||
    ua.indexOf('Twitter') > -1 ||
    ua.indexOf('Instagram') > -1 ||
    ua.indexOf('Bytedance') > -1 ||
    ua.indexOf('Bytelo') > -1
);

function slackOverrideParam() {
  const urlParams = new URLSearchParams(window.location.search);

  return urlParams.has('forceSlackDesktop');
}

function isSlackDesktopApp() {
  if (slackOverrideParam()) {
    return true;
  }

  return validateIsSlackDesktop(window.navigator.userAgent);
}

// https://www.npmjs.com/package/bowser#browser-props-detection
const deviceDetails = Bowser.parse(winNav.userAgent);
const browserDetails = deviceDetails.browser;
const osDetails = deviceDetails.os;
const platformDetails = deviceDetails.platform;
const browserEngineDetails = deviceDetails.engine;
const isSlackDesktop = isSlackDesktopApp();

export function getAppSource() {
  let appSource = ['web', platformDetails?.type].join(':');

  if (isSlackDesktop) {
    appSource = 'slack:desktop';
  }

  return getAppSourceKeyByValue(appSource);
}

function getAppSourceKeyByValue(value) {
  return Object.keys(APP_SOURCE_MAP).find(key => APP_SOURCE_MAP[key] === value);
}

export {
  isChrome,
  isElectron,
  isIE,
  isIEedge,
  isIEorEdge,
  isPushable,
  isFirefox,
  isIOS,
  isSafari,
  iframeSafeIsSafari,
  isIOSWebkit,
  isLinux,
  isMac,
  isWebkit,
  isWindows,
  isMobile,
  browserDetails,
  osDetails,
  platformDetails,
  browserEngineDetails,
  deviceDetails,
  isAndroid,
  isSlackDesktop,
  isChromium,
  isIOSChrome,
  isMobileAdBrowser,
  isFirefoxIOS,
  isEdgeIOS,
};

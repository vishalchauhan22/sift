/* eslint-disable @loomhq/loom/no-js-extension */
let blocked = false;

// See HTML specification for details about beforeunload event
// https://html.spec.whatwg.org/multipage/browsing-the-web.html#the-beforeunloadevent-interface
function listener(event) {
  event.preventDefault();
  event.returnValue = '';

  return '';
}

export function blockUnload() {
  if (!blocked) {
    blocked = true;
    window.addEventListener('beforeunload', listener);
  }
}

export function unblockUnload() {
  if (blocked) {
    blocked = false;
    window.removeEventListener('beforeunload', listener);
  }
}

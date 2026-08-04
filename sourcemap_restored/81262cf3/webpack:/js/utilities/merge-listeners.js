/* eslint-disable @loomhq/loom/no-js-extension */
export function mergeListeners(...listeners) {
  return (...args) => {
    listeners.forEach(fn => fn?.(...args));
  };
}

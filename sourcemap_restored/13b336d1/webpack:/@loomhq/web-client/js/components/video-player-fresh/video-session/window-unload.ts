import noop from 'lodash/noop';

import { isMobile } from '../../../utilities/device';
import {
  documentOnVisibilityChange,
  documentRemoveVisibilityChange,
} from '../../../utilities/dom';

type RemoveWindowEventListener = () => void;

export function addWindowUnloadEvent(
  onUnload: () => void
): RemoveWindowEventListener {
  let visibilityChangeListener = noop;

  const onVisibilityChange = (visible: boolean) => {
    if (!visible) {
      onUnload();
    }
  };

  window.addEventListener('beforeunload', onUnload);
  window.addEventListener('unload', onUnload);

  if (isMobile) {
    // https://stackoverflow.com/a/31039609/696130
    document.addEventListener('pagehide', onUnload);

    visibilityChangeListener = documentOnVisibilityChange(onVisibilityChange);
  }

  function removeEventListener() {
    window.removeEventListener('beforeunload', onUnload);
    window.removeEventListener('unload', onUnload);

    if (isMobile) {
      documentRemoveVisibilityChange(visibilityChangeListener);
    }
  }

  return removeEventListener;
}

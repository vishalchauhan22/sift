/* eslint-disable @loomhq/loom/no-js-extension */
import _noop from 'lodash/noop';

const VISIBILITY_CHANGE = [
  'visibilitychange',
  'webkitvisibilitychange',
  'mozvisibilitychange',
  'msvisibilitychange',
];

export const documentHidden = () => {
  return (
    document.hidden ||
    document.mozHidden ||
    document.msHidden ||
    document.webkitHidden
  );
};

export const documentOnVisibilityChange = (cb = _noop) => {
  function internalCb() {
    cb(!documentHidden());
  }

  VISIBILITY_CHANGE.forEach(visibilityChange => {
    document.addEventListener(visibilityChange, internalCb, false);
  });

  return internalCb;
};

export const documentRemoveVisibilityChange = cb => {
  VISIBILITY_CHANGE.forEach(visibilityChange => {
    document.removeEventListener(visibilityChange, cb, false);
  });
};

// https://stackoverflow.com/a/9678166/696130
export const requestAnimationFrame = (
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  (cb => {
    window.setTimeout(cb, 0);
  })
) // mimic the function
  .bind(window);

export const getFullScreenElement = () => {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullScreenElement
  );
};

export const requestFullScreen = elem => {
  try {
    return (
      elem.requestFullScreen ||
      elem.webkitRequestFullscreen ||
      elem.mozRequestFullScreen ||
      elem.msRequestFullscreen ||
      (() => {})
    ).bind(elem)();
  } catch (e) {
    return false;
  }
};

export const exitFullScreen = () => {
  return (
    document.exitFullScreen ||
    document.webkitExitFullscreen ||
    document.mozCancelFullScreen ||
    document.msExitFullscreen ||
    (() => {})
  ).bind(document)();
};

export const listenForFullscreen = handler => {
  document.addEventListener('fullscreenchange', handler, false);
  document.addEventListener('webkitfullscreenchange', handler, false);
  document.addEventListener('mozfullscreenchange', handler, false);
  document.addEventListener('MSFullscreenChange', handler, false);
};

export const stopListeningForFullscreen = handler => {
  document.removeEventListener('fullscreenchange', handler, false);
  document.removeEventListener('webkitfullscreenchange', handler, false);
  document.removeEventListener('mozfullscreenchange', handler, false);
  document.removeEventListener('MSFullscreenChange', handler, false);
};

// offset left
// getBoundingClientRect technique from
// John Resig http://ejohn.org/blog/getboundingclientrect-is-awesome/
export const findElPosition = elem => {
  let box;

  if (elem.getBoundingClientRect && elem.parentNode) {
    box = elem.getBoundingClientRect();
  }

  if (!box) {
    return {
      left: 0,
      top: 0,
    };
  }

  const docEl = document.documentElement;
  const body = document.body;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;
  const scrollLeft = window.pageXOffset || body.scrollLeft;
  const clientTop = docEl.clientTop || body.clientTop || 0;
  const scrollTop = window.pageYOffset || body.scrollTop;

  const left = box.left + scrollLeft - clientLeft;
  const top = box.top + scrollTop - clientTop;

  // Android sometimes returns slightly off decimal values, so need to round
  return {
    left: Math.round(left),
    top: Math.round(top),
  };
};

// Get dimensions of an element and take into account the scroll position,
// respective to where the element is, inspired by jQuery
export function getDimensions(elementOrSelector) {
  let element = elementOrSelector;

  if (typeof elementOrSelector == 'string') {
    element = document.querySelector(elementOrSelector);
  }

  if (element == null) {
    return null;
  }

  const rect = element.getBoundingClientRect();
  const scrollTop = element.ownerDocument.body.scrollTop;

  const { top, left, width, height } = rect;

  return { top: top + scrollTop, left, width, height };
}

// get pointer position in element
// returns an object with x and y coordinates
// the base on the coordinates are the bottom left of the element
export const getPointerPosition = (elem, event) => {
  const position = {};
  const box = findElPosition(elem);
  const boxW = elem.offsetWidth;
  const boxH = elem.offsetHeight;
  const boxY = box.top;
  const boxX = box.left;

  let { pageX, pageY } = event;

  if (event.changedTouches) {
    pageX = event.changedTouches[0].pageX;
    pageY = event.changedTouches[0].pageY;
  }

  position.y = Math.max(0, Math.min(1, (boxY - pageY + boxH) / boxH));
  position.x = Math.max(0, Math.min(1, (pageX - boxX) / boxW));

  return position;
};

// `steps` is the number of nested levels to traverse up to check if this is a
// child of the `parentClass` node
export const isChildOfParentClass = (target, parentClass, steps = 1) => {
  if (target == null) {
    return false;
  }

  let numTraversals = 0;

  let currentTarget = target;

  while (numTraversals < steps) {
    currentTarget = currentTarget.parentNode;

    if (currentTarget == null || currentTarget.className == null) {
      return false;
    }

    if (currentTarget.className?.includes?.(parentClass)) {
      return true;
    }

    numTraversals += 1;
  }

  return false;
};

export const pasteHtmlAtCaret = html => {
  let sel;
  let range;

  if (window.getSelection) {
    // IE9 and non-IE
    sel = window.getSelection();

    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();

      // Range.createContextualFragment() would be useful here but is
      // non-standard and not supported in all browsers (IE9, for one)
      const el = document.createElement('div');

      el.innerHTML = html;
      const frag = document.createDocumentFragment();
      let node;
      let lastNode;

      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);

      // Preserve the selection
      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  } else if (document.selection && document.selection.type != 'Control') {
    // IE < 9
    document.selection.createRange().pasteHTML(html);
  }
};

export const placeCaretAtEnd = el => {
  el.focus();

  let selection = null;

  if (window.getSelection) {
    selection = window.getSelection();
  } else if (document.selection && document.selection.type !== 'Control') {
    selection = document.selection;
  }

  if (window.getSelection && document.createRange) {
    const range = document.createRange();

    range.selectNodeContents(el);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);
  } else if (document.body.createTextRange) {
    const textRange = document.body.createTextRange();

    textRange.moveToElementText(el);
    textRange.collapse(false);
    textRange.select();
  }
};

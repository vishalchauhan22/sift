const selectNodeText = el => {
  if (el.select) {
    el.select();
    // @ts-expect-error createTextRange is specific to older IE versions
  } else if (document.body.createTextRange) {
    // @ts-expect-error createTextRange is specific to older IE versions
    const range = document.body.createTextRange();

    range.moveToElementText(el);
    range.select();
  } else if (window.getSelection) {
    const range = document.createRange();

    range.selectNodeContents(el);

    const selection = window.getSelection();

    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
};

export const copy = (
  el: HTMLElement | HTMLInputElement | HTMLSpanElement | string
): boolean => {
  try {
    selectNodeText(el);
    window.document.execCommand('copy');

    // the following is needed for on-page-load copying in new chrome versions,
    // and does not break on-click copying:
    let text;

    if (typeof el === 'string') {
      text = el;
    } else if (el.textContent) {
      text = el.textContent;
    } else {
      text = (el as HTMLInputElement).value;
    }

    if (text) {
      navigator?.clipboard?.writeText(text);
    }

    return true;
  } catch (e) {
    return false;
  }
};

export const copyText = (text: string): boolean => {
  try {
    const prevFocusedEl = window.document.activeElement;

    const el = window.document.createElement('textarea');

    el.value = text;
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    window.document.body.appendChild(el);
    el.select();
    window.document.execCommand('copy');
    window.document.body.removeChild(el);

    // Chrome-specific copying
    navigator?.clipboard?.writeText(text);

    if (prevFocusedEl) {
      (prevFocusedEl as HTMLElement).focus();
    }

    return true;
  } catch (e) {
    return false;
  }
};

function createMarkElForHtml(html) {
  const mark = document.createElement('div');

  mark.innerHTML = html;

  return mark;
}

export function copyHtml(node: HTMLElement): boolean {
  let success = true;
  const mark = createMarkElForHtml(node.innerHTML);

  try {
    const range = document.createRange();
    const selection = document.getSelection();

    document.body.appendChild(mark);

    range.selectNode(mark);

    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }

    document.execCommand('copy');
  } catch (err) {
    success = false;
  }

  if (mark) {
    document.body.removeChild(mark);
  }

  return success;
}

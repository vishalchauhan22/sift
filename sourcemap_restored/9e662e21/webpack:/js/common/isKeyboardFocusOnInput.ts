export const isKeyboardFocusOnInput = (): boolean => {
  return (
    window.document.querySelector(
      'input:focus, select:focus, textarea:focus, [contenteditable]:focus'
    ) !== null
  );
};

function copyTextViaInput(text: string) {
  const node = document.createElement('input');

  node.value = text;
  document.body.appendChild(node);
  node.select();
  node.focus();
  document.execCommand('copy');
  document.body.removeChild(node);
}

/**
 * Iframe by default blocks clipboard api
 * https://web.dev/async-clipboard/
 * */
async function checkClipboardPermissions() {
  if (!navigator.clipboard) {
    return false;
  }

  try {
    const permissionStatus = await navigator.permissions.query({
      name: 'clipboard-write',
      allowWithoutGesture: false,
    } as any);

    return permissionStatus.state === 'granted';
  } catch (error) {
    // Handle Firefox and other browsers that don't support 'clipboard-write' permission
    return false;
  }
}

export async function copyToClipBoard(text: string): Promise<void> {
  const hasPermission = await checkClipboardPermissions();

  if (hasPermission) {
    navigator.clipboard.writeText(text);
  } else {
    copyTextViaInput(text);
  }
}

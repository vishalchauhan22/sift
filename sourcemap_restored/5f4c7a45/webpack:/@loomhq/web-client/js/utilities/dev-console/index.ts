type DevConsole = Record<string, unknown>;

function getOrCreateDevConsole(): DevConsole {
  if (!window['devConsole']) {
    window['devConsole'] = {};
  }

  return window['devConsole'];
}

export function getOrCreateNamespace<T extends Record<string, unknown>>(
  namespace: string
): T {
  const devConsole = getOrCreateDevConsole();

  devConsole[namespace] ??= {};

  return devConsole[namespace] as T;
}

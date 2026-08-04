import { DevToolSearchParams } from '@js/constants/devtools-params';

export function appendParamsAndReload(newParams: DevToolSearchParams): void {
  const params = new URLSearchParams(window.location.search);

  Object.keys(newParams).forEach(key => {
    params.set(key, newParams[key]);
  });

  // This line works on Chrome without converting params to a string, but
  // adding #toString to satisfy TypeScript type error
  window.location.search = params.toString();
}

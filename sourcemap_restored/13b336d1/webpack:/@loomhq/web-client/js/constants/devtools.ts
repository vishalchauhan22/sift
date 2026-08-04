import { isProduction, isTest } from './environment';

export const searchParams = new URLSearchParams(window.location.search);

export const devToolsAllowed = !isProduction && !isTest;

export const devToolsEnabled =
  devToolsAllowed && searchParams.get('devtools') === 'true';

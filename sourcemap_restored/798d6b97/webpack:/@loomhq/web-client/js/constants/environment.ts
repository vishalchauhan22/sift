import { NODE_ENV } from '@js/constants/runtimeConfig';

// Core environments
export const isTest = NODE_ENV === 'test';
export const isDev = NODE_ENV === 'development';
export const isProduction = NODE_ENV === 'production';
export const isLocal = window.location.href.includes('loomlocal.com');
export const isStaging = window.location.href.includes('stage.loom.com');
export const isDevOrTest = isTest || isDev;

// Specific configs
export const SENTRY_ENABLED = !isDevOrTest;

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const RETRY_SCHEDULE_IN_MS = [
  300, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 10000, 15000,
];

declare global {
  interface Window {
    analytics: {
      page: (pageName: string, props: Record<string, any>) => void;
      track: (
        pageName: string,
        props: Record<string, any>,
        callback?: () => void
      ) => void;
      identify: (
        id: string,
        props: Record<string, any>,
        ctx: Record<string, any>
      ) => void;
      reset?: () => void;
      ready?: (callback: () => void) => void;
      // TODO: Update this type once we have a better type for the user object
      user: any;
    };
    dataLayer?: any[]; // Google Tag Manager
  }
}

export const delayAnalyticsEvent = (evt, id, opts?, ctx?) => {
  let retryEvent = true;

  for (const retry of RETRY_SCHEDULE_IN_MS) {
    setTimeout(() => {
      if (retryEvent && window?.analytics !== undefined) {
        evt(id, opts, ctx);
        retryEvent = false;
      }
    }, retry);
  }
};

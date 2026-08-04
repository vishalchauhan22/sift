// Sets global stylesheets for Lens
import { buildGlobalStylesheet } from '@loomhq/lens';
import * as logger from '@js/utilities/loggerx';

const style = document.createElement('style');

style.setAttribute('type', 'text/css');
style.innerHTML = buildGlobalStylesheet();
document.head.appendChild(style);

// Hide reCAPTCHA badge on mobile devices for ASG modal -> product request https://useloom.atlassian.net/browse/ACT-608
const recaptchaStyle = document.createElement('style');
recaptchaStyle.setAttribute('type', 'text/css');
recaptchaStyle.innerHTML = `
    .grecaptcha-badge {
      visibility: hidden;
    }
`;
document.head.appendChild(recaptchaStyle);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).donut = () => {
  logger.debug(`
    🍩
    🍩 🍩🍩🍩 🍩🍩🍩 🍩🍩🍩🍩
    🍩 🍩   🍩🍩   🍩 🍩 🍩 🍩
    🍩 🍩🍩🍩 🍩🍩🍩 🍩 🍩 🍩
  `);
};

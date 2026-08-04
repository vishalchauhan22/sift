// Sets global stylesheets for Lens
import { buildGlobalStylesheet } from '@loomhq/lens';

const style = document.createElement('style');

style.setAttribute('type', 'text/css');
style.innerHTML = buildGlobalStylesheet();
document.head.appendChild(style);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).donut = () => {
  // eslint-disable-next-line no-console
  console.log(`
    🍩
    🍩 🍩🍩🍩 🍩🍩🍩 🍩🍩🍩🍩
    🍩 🍩   🍩🍩   🍩 🍩 🍩 🍩
    🍩 🍩🍩🍩 🍩🍩🍩 🍩 🍩 🍩
  `);
};

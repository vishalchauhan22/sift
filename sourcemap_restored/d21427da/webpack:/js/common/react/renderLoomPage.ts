import traceUFOPageLoad from '@atlaskit/react-ufo/trace-pageload';
import { type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { normalizePathname } from '@js/utilities/analytics/react-ufo/helpers';
import { initUFO } from '@js/utilities/analytics/react-ufo/initUfo';

export const renderLoomPage = (
  children: ReactNode,
  config?: Parameters<typeof initUFO>[0]
): void => {
  const container = document.getElementById('container');

  if (!container) {
    throw new Error('Unable to find #container to render app');
  }

  initUFO(config);
  traceUFOPageLoad(normalizePathname(location.pathname));

  const root = createRoot(container);

  root.render(children);
};
